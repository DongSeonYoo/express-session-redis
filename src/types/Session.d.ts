import { IAccount } from '../interface/IAccount';

declare module 'express-session' {
  interface CustomSessionData {
    userId: IAccount['id'];
  }

  interface SessionData extends CustomSessionData {}
  // interface SessionData {
  //   userId: IAccount['id']
  // }
}
