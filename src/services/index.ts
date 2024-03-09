import Container from 'typedi';
import { AuthService } from './auth.service';
import { AccountService } from './account.service';
import { RedisService } from '../database/redis.database';

export const authService = Container.get(AuthService);
export const accountService = Container.get(AccountService);
export const redisService = Container.get(RedisService);
