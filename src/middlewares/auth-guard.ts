import { RequestHandler } from 'express';
import asyncWrap from '../utils/modules/async-wrap.module';

export const loginAuthGuard = (): RequestHandler => {
  return asyncWrap(async (req, res, next) => {
    return next();
  });
};
