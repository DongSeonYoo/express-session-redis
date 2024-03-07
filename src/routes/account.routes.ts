import { Router } from 'express';
import asyncWrap from '../utils/modules/async-wrap.module';
import { loginAuthGuard } from '../middlewares/auth-guard';
import { accountService, authService } from '../services';
import { ResponseEntity } from '../utils/modules/response-entity.module';

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
    // load loggedIn userIdx for redis
    const userIdList = await authService.getLoggedInUserListInRedis();

    // load userInformation for postgres
    const result = await accountService.getLoggedInUserInfo(userIdList.map((e) => e.userId));

    // send data for redis & data for postgres
    return res.send(
      ResponseEntity.SUCCESS_WITH(
        result.map((e, i) => ({
          id: e.id,
          name: e.name,
          email: e.email,
          loggedInAt: userIdList[i].loggedInAt,
          createdAt: e.createdAt,
        })),
      ),
    );
  }),
);

export default accountRouter;
