import { Router } from 'express';
import asyncWrap from '../utils/modules/async-wrap.module';
import { loginAuthGuard } from '../middlewares/auth-guard';
import { accountService } from '../services';
import { ResponseEntity } from '../utils/modules/response-entity.module';
import { redisClient } from '../database/redis.database';
import { SessionData } from 'express-session';
import { BadRequestException } from '../utils/modules/custom-error.module';

const accountRouter = Router();

/**
 * GET /account/profile
 * View my profile
 * Available only to logged-in users
 */
accountRouter.get(
  '/profile',
  loginAuthGuard(),
  asyncWrap(async (req, res, next) => {
    const userId = req.session.userId;
    const profile = await accountService.getAccountProfileDetail(userId!);

    return res.send(ResponseEntity.SUCCESS_WITH(profile));
  }),
);

/**
 * GET /account/logged-in/list
 */
accountRouter.get(
  '/logged-in/list',
  asyncWrap(async (req, res, next) => {
    const getLoggedInUserListInRedis = await redisClient.keys('session:*');
    const sessionDataList = await Promise.all(
      getLoggedInUserListInRedis.map((key) => redisClient.get(key)),
    );

    const userIdList: SessionData[] = sessionDataList.map((data) => {
      if (data) {
        return JSON.parse(data);
      }
    });

    const userIdx = userIdList.map((e) => e.userId);
    const result = await accountService.getLoggedInUserInfo(userIdx);

    return res.send(ResponseEntity.SUCCESS_WITH(result));
  }),
);

export default accountRouter;
