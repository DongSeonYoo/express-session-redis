import asyncWrap from '../utils/modules/async-wrap.module';
import { validate } from '../middlewares/validate.middleware';
import { body } from 'express-validator';
import { Router } from 'express';
import { ResponseEntity } from '../utils/modules/response-entity.module';
import { authService } from '../services';
import { IAccount } from '../interface/IAccount';
import { loginAuthGuard } from '../middlewares/auth-guard';
import { Role } from '../interface/IRole';

const authRouter = Router();

/**
 * POST /auth/login
 * @Body email
 * @Body password
 * login & create session in redis
 */
authRouter.post(
  '/login',
  validate([body('email').notEmpty(), body('password').notEmpty()]),
  asyncWrap(async (req, res, next) => {
    const loginInput: IAccount.ILogin = req.body;

    const loginUserResult = await authService.verifyAccount(loginInput);

    // TODO
    // 중복 로그인 방지 하는 기능

    req.session.userId = loginUserResult.userId;
    req.session.role = loginUserResult.role;
    req.session.loggedInAt = new Date();

    return res.send(ResponseEntity.SUCCESS('로그인 성공'));
  }),
);

/**
 * POST /auth/signup
 * @Body email
 * @Body password
 * @Body name
 */
authRouter.post(
  '/signup',
  validate([
    body('email').notEmpty(),
    body('password').notEmpty(),
    body('name').notEmpty(),
    body('role').notEmpty().isIn([Role.ADMIN, Role.TEACHER, Role.STUDENT]),
  ]),
  asyncWrap(async (req, res, next) => {
    const signupInput: IAccount.ISignup = req.body;

    const createdUserIdx = await authService.registerAccount(signupInput);

    return res.send(ResponseEntity.SUCCESS_WITH(createdUserIdx));
  }),
);

/**
 * DELETE /auth/logout
 * logout & destroy session (cookie)
 */
authRouter.delete(
  '/logout',
  loginAuthGuard(),
  asyncWrap((req, res, next) => {
    // delete session in redis
    req.session.destroy((e) => e);

    return res.send(ResponseEntity.SUCCESS('로그아웃 성공'));
  }),
);

/**
 * GET /auth/role-guard
 * Check Role
 */
authRouter.get(
  '/role-guard',
  loginAuthGuard(Role.TEACHER),
  asyncWrap(async (req, res, next) => {
    return res.send(ResponseEntity.SUCCESS_WITH('Success'));
  }),
);

export default authRouter;
