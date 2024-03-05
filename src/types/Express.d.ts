import { SessionData } from 'express-session';

declare global {
  namespace Express {
    interface Request {
      user: SessionData;
    }
  }
}

export {};
