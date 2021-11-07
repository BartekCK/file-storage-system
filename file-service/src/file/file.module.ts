import { Module } from '@nestjs/common';
import { FileMessageController } from './controllers/file-message.controller';
import { FileController } from './controllers/file.controller';
import { FileProcessModule } from '../file-process/file-process.module';

@Module({ imports: [FileProcessModule], controllers: [FileMessageController, FileController] })
export class FileModule {}
