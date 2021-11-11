import { Controller, Get, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ReadFileDto } from '../dto/read-file.dto';
import { Authorized } from '../../auth/decorators/authorized.decorator';
import { UserRequest } from '../../common/interfaces/user-req.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from '../services/file.service';

@Controller('/files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/')
  @Authorized()
  @UseInterceptors(FileInterceptor('file'))
  async uploadUserFile(@Req() req: UserRequest, @UploadedFile() file: Express.Multer.File): Promise<ReadFileDto> {
    const { user } = req;

    const fileDocument = await this.fileService.saveFile(user, file);
    const fileUrl = await this.fileService.createUrl(fileDocument, user);

    return ReadFileDto.createFromDoc(fileDocument, fileUrl);
  }

  @Get('/')
  @Authorized()
  @UseInterceptors(FileInterceptor('file'))
  async getAllUserFiles(@Req() req: UserRequest): Promise<ReadFileDto[]> {
    const { user } = req;

    const fileDocuments = await this.fileService.findFilesByUserId(user.id);

    return await Promise.all(
      fileDocuments.map(async (fileDoc) => {
        const fileUrl = await this.fileService.createUrl(fileDoc, user);
        return ReadFileDto.createFromDoc(fileDoc, fileUrl);
      }),
    );
  }
}
