import { Module, Provider } from '@nestjs/common';
import { EnvConfigService } from '../env-config/services/env-config.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { EnvConfigModule } from '../env-config/env-config.module';
import { UserProxy } from './services/user.proxy';

const provider: Provider = {
  provide: UserProxy,
  useFactory: (configService: EnvConfigService) => {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [configService.getRabbitMqConfig().RABBIT_MQ_URL],
        queue: configService.getQueueUserName(),
        noAck: false,
        queueOptions: {
          durable: true,
        },
      },
    });
  },
  inject: [EnvConfigService],
};

@Module({ imports: [EnvConfigModule], providers: [provider], exports: [provider] })
export class UserModule {}
