import { Injectable } from '@nestjs/common';
import { ConfigEnvModel } from '../models/config-env.model';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

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

  public getQueueFileName(): string {
    return this.get('RABBIT_MQ_QUEUE_FILE');
  }

  public databaseConfig(): TypeOrmModuleOptions {
    return {
      name: 'default',
      type: 'postgres',
      host: this.get<string>('DB_HOST'),
      port: this.get<number>('DB_PORT'),
      username: this.get<string>('DB_USERNAME'),
      password: this.get<string>('DB_PASSWORD'),
      database: this.get<string>('DB_DATABASE_NAME'),
      entities: ['**/*.entity{ .ts,.js}'],
      migrations: ['**/database/migrations/*.js'],
      subscribers: ['**/*.subscriber{ .ts,.js }'],
      synchronize: false,
      migrationsRun: true,
    };
  }
}
