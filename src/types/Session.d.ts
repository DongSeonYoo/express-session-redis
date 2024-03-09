import { IAccount } from '../interface/IAccount';
import { Role } from '../interface/IRole';

declare module 'express-session' {
  export interface CustomSessionData {
    userId: IAccount['id'];
    role: Role;
    loggedInAt: Date;
  }

  interface SessionData extends CustomSessionData {}
}
