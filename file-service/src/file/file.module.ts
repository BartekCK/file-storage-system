import { Module } from '@nestjs/common';
import { FileMessageController } from './controllers/file-message.controller';
import { FileController } from './controllers/file.controller';
import { FileProcessModule } from '../file-process/file-process.module';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FileSchema } from './schemas/file.schema';
import { AuthModule } from '../auth/auth.module';
import { FileService } from './services/file.service';
import { LoggerModule } from '../logger/logger.module';
import { EnvConfigModule } from '../env-config/env-config.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [
    RedisModule,
    EnvConfigModule,
    LoggerModule,
    AuthModule,
    FileProcessModule,
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
  ],
  controllers: [FileMessageController, FileController],
  providers: [FileService],
})
export class FileModule {}
