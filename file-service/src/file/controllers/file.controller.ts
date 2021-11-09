import { Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ReadFileDto } from '../dto/read-file.dto';
import { Authorized } from '../../auth/decorators/authorized.decorator';
import { UserRequest } from '../../common/interfaces/user-req.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from '../services/file.service';

@Controller('/files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @Authorized()
  @UseInterceptors(FileInterceptor('file'))
  async uploadUserFile(@Req() req: UserRequest, @UploadedFile() file: Express.Multer.File): Promise<ReadFileDto> {
    const fileDocument = await this.fileService.saveFile(req.user, file);

    return ReadFileDto.createFromDoc(fileDocument);
  }
}
