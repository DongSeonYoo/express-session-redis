import jwt from 'jsonwebtoken';

declare module 'jsonwebtoken' {
  export interface LoginTokenPayload {
    userIdx: number;
  }
  export interface JwtPayload extends jwt.LoginTokenPayload {}
}
