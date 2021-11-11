import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { File, FileDocument } from '../schemas/file.schema';
import { Model } from 'mongoose';
import { User } from '../../user/models/user.model';
import { FileProcessProxyService } from '../../file-process/services/file-process-proxy.service';
import { uuid } from 'uuidv4';
import { createWriteStream } from 'fs';
import { LoggerService } from '../../logger/services/logger.service';
import { EnvConfigService } from '../../env-config/services/env-config.service';
import { RedisService } from '../../redis/services/redis.service';
@Injectable()
export class FileService {
  constructor(
    private readonly fileProcessProxyService: FileProcessProxyService,
    private readonly loggerService: LoggerService,
    private readonly envConfigService: EnvConfigService,
    private readonly redisService: RedisService,
    @InjectModel(File.name) private fileModel: Model<FileDocument>,
  ) {}

  public async saveFile(user: User, file: Express.Multer.File): Promise<FileDocument> {
    this.loggerService.log(`User ${user.email} add new file ${file}`);

    const extension = file.originalname.split('.').pop();
    const key = `${uuid()}.${extension}`;

    const ws = createWriteStream(`../files/unprocessed/${key}`);
    await this.writeToDisc(ws, file.buffer);
    ws.close();

    const fileDoc = new this.fileModel({
      userId: user.id,
      key,
      fileName: file.originalname,
      size: file.size,
      isProcessed: null,
    });

    const savedFileDoc = await fileDoc.save();
    await this.fileProcessProxyService.emit('process-file', `${key}`);

    return savedFileDoc;
  }

  public async createUrl(fileDoc: FileDocument, user?: User): Promise<string | undefined> {
    const url = this.envConfigService.getAppConfig().APP_URL;

    if (fileDoc.isProcessed) {
      return `${url}/files/for-share/${fileDoc.key}`;
    }

    if (!user) {
      return undefined;
    }

    const token = uuid();
    await this.redisService.set(token, fileDoc.key);

    return `${url}/files/unprocessed/${token}/${fileDoc.key}`;
  }

  public getFileByKey(key: string): Promise<FileDocument> {
    return this.fileModel.findOne({ key }).exec();
  }

  public async markAsProcessed(fileDoc: FileDocument): Promise<FileDocument> {
    fileDoc.isProcessed = new Date();
    return fileDoc.save();
  }

  public async findFilesByUserId(userId: string): Promise<FileDocument[]> {
    return this.fileModel.find({ userId }).exec();
  }

  private async writeToDisc(ws, buffer: Buffer): Promise<void> {
    return new Promise((resolve) => {
      ws.write(buffer, resolve);
    });
  }
}
