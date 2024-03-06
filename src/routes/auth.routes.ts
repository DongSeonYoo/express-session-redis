import asyncWrap from '../utils/modules/async-wrap.module';
import { validate } from '../middlewares/validate.middleware';
import { body } from 'express-validator';
import { Router } from 'express';
import { IAccount } from '../interface/IAccount';
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
    return ResponseEntity.SUCCESS_WITH('');
  }),
);

export default authRouter;
