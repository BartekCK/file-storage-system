import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { EnvConfigModule } from '../env-config/env-config.module';
import { EnvConfigService } from '../env-config/services/env-config.service';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthMessageController } from './controllers/auth-message.controller';
import { UserModule } from '../user/user.module';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    LoggerModule,
    UserModule,
    EnvConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvConfigModule],
      inject: [EnvConfigService],
      useFactory: (env: EnvConfigService) => ({
        secret: env.getAuthSecretKey(),
        signOptions: { algorithm: 'HS512', expiresIn: 7200 },
      }),
    }),
  ],
  controllers: [AuthController, AuthMessageController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
