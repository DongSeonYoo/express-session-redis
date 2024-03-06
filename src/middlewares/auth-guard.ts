import { RequestHandler } from 'express';
import asyncWrap from '../utils/modules/async-wrap.module';
import { UnauthorizedException } from '../utils/modules/custom-error.module';

export const loginAuthGuard = (): RequestHandler => {
  return asyncWrap(async (req, res, next) => {
    if (!req.session || !req.session.userId) {
      throw new UnauthorizedException('로그인 후 이용가능합니다');
    }

    return next();
  });
};
