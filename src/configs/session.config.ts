import RedisStore from 'connect-redis';
import { redisClient } from '../database/redis.database';
import session from 'express-session';
import env from './env';

const redisStore = new RedisStore({ client: redisClient, prefix: 'session:', ttl: 1000 * 60 * 5 });

export const sessionConfig = () =>
  session({
    store: redisStore,
    secret: env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 5, // 5분,
    },
  });
