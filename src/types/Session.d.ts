import { IAccount } from '../interface/IAccount';

declare module 'express-session' {
  export interface CustomSessionData {
    userId: IAccount['id'];
  }

  interface SessionData extends CustomSessionData {}
}
