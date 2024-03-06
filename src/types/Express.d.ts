import { CustomSessionData, Session, SessionData } from 'express-session';

declare global {
  namespace Express {
    interface Request {
      /**
       * 1. req.user = req.session 을 위해 타입 정의
       * 2. req.user의 타입을 일치시켜주기 위해 타입 정의
       * req.user = {
       *  cookie,
       *  userId
       * }
       */
      // user: (Session & Partial<CustomSessionData>) | SessionData;
      // user: {
      //   id: CustomSessionData['userId'];
      // };
    }
  }
}

export {};
