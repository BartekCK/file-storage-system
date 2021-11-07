import { NestFactory } from '@nestjs/core';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { EnvConfigService } from './env-config/services/env-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<EnvConfigService>(EnvConfigService);

  const microservice = await app.connectMicroservice<RmqOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getRabbitMqConfig().RABBIT_MQ_URL],
      queue: configService.getQueueFileName(),
      noAck: false,
      queueOptions: {
        durable: true,
      },
    },
  });

  await microservice.listen();
  await app.listen(configService.getAppConfig().APP_PORT);
}
bootstrap();
