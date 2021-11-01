import { Module } from '@nestjs/common';
import { EnvConfigModule } from './env-config/env-config.module';
import { HealthModule } from './health/health.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfigService } from './env-config/services/env-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvConfigModule],
      inject: [EnvConfigService],
      useFactory: async (configService: EnvConfigService) => {
        return configService.databaseConfig();
      },
    }),
    EnvConfigModule,
    HealthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
