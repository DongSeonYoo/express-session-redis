import { Application } from 'express';
import expressLoader from './express';
import errorHandling from '../../middlewares/error-handling';
import { NotFoundException } from '../modules/custom-error.module';
import { sessionConfig } from '../../configs/session.config';

export default function (app: Application) {
  // load global middleware of express
  expressLoader(app);

  // another loader... (ex: database loader..)
  app.use(sessionConfig());

  // throw NotFoundException
  app.use((req, res) => {
    throw new NotFoundException('해당하는 api가 존재하지 않습니다');
  });

  // load global error handling (must be completed at the end of file)
  app.use(errorHandling());
}
