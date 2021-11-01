import { Module } from '@nestjs/common';
import { EnvConfigModule } from './env-config/env-config.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [EnvConfigModule, HealthModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
