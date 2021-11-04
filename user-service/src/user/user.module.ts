import { Module } from '@nestjs/common';
import { UserMessageController } from './controllers/user-message.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { EnvConfigModule } from '../env-config/env-config.module';
import { EnvConfigService } from '../env-config/services/env-config.service';
import { FileTokenConst } from './constants/file-token.const';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './controllers/user.controller';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([User]), EnvConfigModule, AuthModule],
  controllers: [UserMessageController, UserController],
  providers: [
    {
      provide: FileTokenConst,
      useFactory: (configService: EnvConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getRabbitMqConfig().RABBIT_MQ_URL],
            queue: configService.getQueueFileName(),
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [EnvConfigService],
    },
    UserService,
  ],
})
export class UserModule {}
