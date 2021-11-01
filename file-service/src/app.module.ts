import { Module } from '@nestjs/common';
import { EnvConfigModule } from './env-config/env-config.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [EnvConfigModule, FileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
