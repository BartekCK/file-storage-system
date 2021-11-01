import { Module } from '@nestjs/common';
import { EnvConfigModule } from './env-config/env-config.module';
import { HealthModule } from './health/health.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [EnvConfigModule, HealthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
