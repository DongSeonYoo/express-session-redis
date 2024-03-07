import session from 'express-session';
import env from './env';
import Container from 'typedi';
import { RedisService } from '../database/redis.database';

const redisService = Container.get(RedisService);

export const sessionConfig = () =>
  session({
    store: redisService.store,
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
