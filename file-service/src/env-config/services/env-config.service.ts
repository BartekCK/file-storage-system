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

  public getQueueFileName(): string {
    return this.get('RABBIT_MQ_QUEUE_FILE');
  }

  public getQueueFileProcessName(): string {
    return this.get('RABBIT_MQ_QUEUE_FILE_PROCESS');
  }
}
