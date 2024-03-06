import { Application, json } from 'express';
import cookieParser from 'cookie-parser';
import authRouter from '../../routes/auth.routes';
import { sessionConfig } from '../../configs/session.config';

export default function (app: Application) {
  app.use(json());
  app.use(cookieParser());
  app.use(sessionConfig());
  app.use('/auth', authRouter);
}
