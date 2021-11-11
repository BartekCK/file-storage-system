import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, IsString } from 'class-validator';
import { EnvTypeEnum } from '../types/env-type.enum';

export class ConfigEnvModel {
  @IsEnum(EnvTypeEnum)
  NODE_ENV: EnvTypeEnum;

  @IsInt()
  @Type(() => Number)
  APP_PORT: number;

  @IsString()
  APP_URL: string;

  @IsString()
  RABBIT_MQ_URL: string;

  @IsString()
  RABBIT_MQ_QUEUE_FILE: string;

  @IsString()
  RABBIT_MQ_QUEUE_FILE_PROCESS: string;

  @IsString()
  MONGO_DB_URI: string;

  @IsInt()
  @Type(() => Number)
  REDIS_PORT: number;

  @IsString()
  REDIS_HOST: string;

  @IsInt()
  @Type(() => Number)
  REDIS_EX: number;
}
