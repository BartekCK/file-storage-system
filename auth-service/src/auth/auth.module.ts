import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { EnvConfigModule } from '../env-config/env-config.module';
import { EnvConfigService } from '../env-config/services/env-config.service';
import { AuthTokenConst } from './constants/auth-token.const';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
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
  controllers: [AuthController],
  providers: [
    {
      provide: AuthTokenConst,
      useFactory: (configService: EnvConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getRabbitMqConfig().RABBIT_MQ_URL],
            queue: configService.getQueueAuthName(),
            noAck: false,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [EnvConfigService],
    },
    AuthService,
    LocalStrategy,
  ],
})
export class AuthModule {}
