import asyncWrap from '../utils/modules/async-wrap.module';
import { validate } from '../middlewares/validate.middleware';
import { body } from 'express-validator';
import { Router } from 'express';
import { IAccount } from '../interface/IAccount';
import { authService } from '../services';
import { ResponseEntity } from '../utils/modules/response-entity.module';

const authRouter = Router();

/**
 * POST /auth/login
 * @Body email
 * @Body pw
 * login & create session in redis
 */
authRouter.post(
  '/login',
  validate([body('loginId').notEmpty(), body('password').notEmpty()]),
  asyncWrap(async (req, res, next) => {
    const loginInput: IAccount.ILogin = req.body;

    const userIdx = await authService.login(loginInput);
    console.log(req.user.idx);

    return res.send(ResponseEntity.SUCCESS_WITH(userIdx));
  }),
);

export default authRouter;
