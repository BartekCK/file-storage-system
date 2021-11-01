import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsString } from 'class-validator';
import { EnvTypeEnum } from '../types/env-type.enum';

export class ConfigEnvModel {
  @IsEnum(EnvTypeEnum)
  NODE_ENV: EnvTypeEnum;

  @IsInt()
  @Type(() => Number)
  APP_PORT: number;

  @IsString()
  APP_HOST: string;

  @IsString()
  RABBIT_MQ_URL: string;

  @IsString()
  RABBIT_MQ_QUEUE_AUTH: string;

  @IsString()
  AUTH_SECRET_KEY: string;
}
