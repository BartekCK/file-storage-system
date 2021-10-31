import { Module } from '@nestjs/common';
import { EnvConfigService } from './services/env-config.service';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { configEnvValidator } from './utils/config-env.validator';

@Module({
  imports: [NestConfigModule.forRoot({ validate: configEnvValidator })],
  providers: [EnvConfigService],
  exports: [EnvConfigService],
})
export class EnvConfigModule {}
