import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvConfigService } from './env-config/services/env-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<EnvConfigService>(EnvConfigService);

  await app.listen(configService.getAppConfig().APP_PORT);
}
bootstrap();
