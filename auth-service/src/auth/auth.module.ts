import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { EnvConfigModule } from '../env-config/env-config.module';
import { EnvConfigService } from '../env-config/services/env-config.service';
import { AuthTokenConst } from './constants/auth-token.const';
import { AuthService } from './services/auth.service';

@Module({
  imports: [EnvConfigModule],
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
  ],
})
export class AuthModule {}
