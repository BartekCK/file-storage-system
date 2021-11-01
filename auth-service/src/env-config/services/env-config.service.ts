import { Injectable } from '@nestjs/common';
import { ConfigEnvModel } from '../models/config-env.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService extends ConfigService {
  public getAppConfig(): Pick<ConfigEnvModel, 'APP_PORT' | 'APP_HOST'> {
    return {
      APP_PORT: this.get('APP_PORT'),
      APP_HOST: this.get('APP_HOST'),
    };
  }

  public getRabbitMqConfig(): Pick<ConfigEnvModel, 'RABBIT_MQ_URL'> {
    return {
      RABBIT_MQ_URL: this.get('RABBIT_MQ_URL'),
    };
  }

  public getQueueAuthName(): string {
    return this.get('RABBIT_MQ_QUEUE_AUTH');
  }

  public getAuthSecretKey(): string {
    return this.get('AUTH_SECRET_KEY');
  }
}
