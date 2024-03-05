import IORedis from 'ioredis';
import env from '../configs/env';

export const redisClient = new IORedis(env.REDIS_URL || 'redis://127.0.0.1:6379');

redisClient.on('ready', () => {
  console.log('redis initialize');
});

redisClient.on('error', (err) => {
  console.log(`redis error: ${err}}`);
});
