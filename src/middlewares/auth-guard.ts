import { RequestHandler } from 'express';
import asyncWrap from '../utils/modules/async-wrap.module';
import { ForbiddenException, UnauthorizedException } from '../utils/modules/custom-error.module';
import { Role } from '../interface/IRole';

export const loginAuthGuard = (role: Role = Role.STUDENT): RequestHandler => {
  return asyncWrap(async (req, res, next) => {
    console.log(req.session);
    if (!req.session || !req.session.role || !req.session.userId) {
      throw new UnauthorizedException('로그인 후 이용가능합니다');
    }

    if (req.session.role > role) {
      throw new ForbiddenException('권한이 거부되었습니다');
    }

    return next();
  });
};
