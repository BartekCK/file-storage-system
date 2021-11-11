import { Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis/dist/lib/client';
import { RedisModules, RedisScripts } from 'redis/dist/lib/commands';

@Injectable()
export class RedisService {
  private readonly client: RedisClientType<RedisModules, RedisScripts>;
  private readonly expirationTime: number;

  constructor(client, expirationTime: number) {
    this.client = client;
    this.expirationTime = expirationTime;
  }

  public async set(key: string, value: string) {
    await this.client.set(key, value, { EX: this.expirationTime, NX: true });
  }

  public async get(key: string) {
    await this.client.get(key);
  }
}
