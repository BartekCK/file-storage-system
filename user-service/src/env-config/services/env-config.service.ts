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
}
