declare module 'express-session' {
  interface CustomSessionData {
    userIdx: number;
  }

  interface SessionData extends CustomSessionData {}
}
