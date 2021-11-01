import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { EnvConfigService } from './env-config/services/env-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<EnvConfigService>(EnvConfigService);

  const microservice = await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getRabbitMqConfig().RABBIT_MQ_URL],
      queue: configService.getQueueFileName(),
      noAck: true,
      queueOptions: {
        durable: true,
      },
    },
  });

  await microservice.listenAsync();
  await app.listen(configService.getAppConfig().APP_PORT);
}
bootstrap();
