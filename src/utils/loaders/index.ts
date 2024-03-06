import { Application, json } from 'express';
import errorHandling from '../../middlewares/error-handling';
import { NotFoundException } from '../modules/custom-error.module';
import cookieParser from 'cookie-parser';
import { sessionConfig } from '../../configs/session.config';
import authRouter from '../../routes/auth.routes';
import accountRouter from '../../routes/account.routes';

export default function (app: Application) {
  // load global middleware of express
  app.use(json());
  app.use(cookieParser());
  app.use(sessionConfig());
  app.use('/auth', authRouter);
  app.use('/account', accountRouter);

  // another loader... (ex: database loader..)

  // throw NotFoundException
  app.use((req, res) => {
    throw new NotFoundException('해당하는 api가 존재하지 않습니다');
  });

  // load global error handling (must be completed at the end of file)
  app.use(errorHandling());
}
