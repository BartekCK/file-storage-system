import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvConfigService } from './env-config/services/env-config.service';
import { Transport } from '@nestjs/microservices';
import { RmqOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<EnvConfigService>(EnvConfigService);

  const microservice = await app.connectMicroservice<RmqOptions>({
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

  await microservice.listen();
  await app.listen(configService.getAppConfig().APP_PORT);
}
bootstrap();
