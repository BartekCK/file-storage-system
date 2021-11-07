import { Module, Provider } from '@nestjs/common';
import { FileProcessProxyService } from './services/file-process-proxy.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { EnvConfigService } from '../env-config/services/env-config.service';
import { EnvConfigModule } from '../env-config/env-config.module';

const provider: Provider = {
  provide: FileProcessProxyService,
  useFactory: (configService: EnvConfigService) => {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [configService.getRabbitMqConfig().RABBIT_MQ_URL],
        queue: configService.getQueueFileProcessName(),
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
export class FileProcessModule {}
