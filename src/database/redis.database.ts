import IORedis from 'ioredis';
import env from '../configs/env';
import { Service } from 'typedi';
import RedisStore from 'connect-redis';

@Service()
export class RedisService {
  readonly client: IORedis;
  readonly store: RedisStore;

  constructor() {
    this.client = new IORedis(env.REDIS_URL || 'redis://127.0.0.1:6379');
    this.store = new RedisStore({ client: this.client, prefix: 'session:', ttl: 1000 * 60 * 5 });

    this.client.on('ready', () => {
      console.log('Redis is init');
    });

    this.client.on('error', (err) => {
      console.error(`Redis error: ${err}`);
    });
  }
}
