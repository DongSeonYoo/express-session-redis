import { Session, SessionData } from 'express-session';

declare global {
  namespace Express {
    interface Request {
      user: Session & Partial<SessionData>;
    }
  }
}

export {};
