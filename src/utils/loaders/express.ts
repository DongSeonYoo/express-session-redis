import { Application, json } from 'express';
import cookieParser from 'cookie-parser';
import authRouter from '../../routes/auth.routes';

export default function (app: Application) {
  app.use(json());
  app.use(cookieParser());
  app.use('/auth', authRouter);
}
