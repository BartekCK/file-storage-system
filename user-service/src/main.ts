import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvConfigService } from './env-config/services/env-config.service';
import { Transport } from '@nestjs/microservices';
import { RmqOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

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

  const config = new DocumentBuilder()
    .setTitle('User service')
    .setDescription('The "user service" for store app users')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }));

  await microservice.listen();
  await app.listen(configService.getAppConfig().APP_PORT);
}
bootstrap();
