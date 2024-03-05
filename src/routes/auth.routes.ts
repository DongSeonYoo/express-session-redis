import asyncWrap from '../utils/modules/async-wrap.module';
import { validate } from '../middlewares/validate.middleware';
import { param } from 'express-validator';
import { Router } from 'express';

const authRouter = Router();

authRouter.get(
  '/:accountIdx',
  validate([param('accountIdx').notEmpty().isInt().withMessage('정수가 아닙니다').toInt()]),
  asyncWrap(async (req, res, next) => {}),
);

export default authRouter;
