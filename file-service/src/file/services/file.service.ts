import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { File, FileDocument } from '../schemas/file.schema';
import { Model } from 'mongoose';
import { User } from '../../user/models/user.model';
import { FileProcessProxyService } from '../../file-process/services/file-process-proxy.service';
import { uuid } from 'uuidv4';
import { createWriteStream } from 'fs';
import { LoggerService } from '../../logger/services/logger.service';
@Injectable()
export class FileService {
  constructor(
    private readonly fileProcessProxyService: FileProcessProxyService,
    private readonly loggerService: LoggerService,
    @InjectModel(File.name) private fileModel: Model<FileDocument>,
  ) {}

  public async saveFile(user: User, file: Express.Multer.File): Promise<FileDocument> {
    this.loggerService.log(`User ${user.email} add new file ${file}`);

    const extension = file.originalname.split('.').pop();
    const key = `${uuid()}.${extension}`;

    const ws = createWriteStream(`../files/unprocessed/${key}`);
    ws.write(file.buffer);

    const fileDoc = new this.fileModel({
      userId: user.id,
      key,
      fileName: file.originalname,
      size: file.size,
      isProcessed: null,
    });

    this.fileProcessProxyService.emit('process-file', `unprocessed/${key}`);

    return fileDoc.save();
  }
}
