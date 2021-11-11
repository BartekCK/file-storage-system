import { Module } from '@nestjs/common';
import { RedisService } from './services/redis.service';
import { createClient } from 'redis';
import { EnvConfigModule } from '../env-config/env-config.module';
import { EnvConfigService } from '../env-config/services/env-config.service';

@Module({
  imports: [EnvConfigModule],
  providers: [
    {
      provide: RedisService,
      inject: [EnvConfigService],
      useFactory: async (env: EnvConfigService) => {
        const { REDIS_PORT, REDIS_HOST, REDIS_EX: expirationTime } = env.getRedisConfig();
        const redisClient = createClient({ url: `redis://${REDIS_HOST}:${REDIS_PORT}` });
        await redisClient.connect();
        return new RedisService(redisClient, expirationTime);
      },
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
