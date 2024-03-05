import { ResponseEntity } from '../utils/modules/response-entity.module';
import { CustomError } from '../utils/modules/custom-error.module';
import { HttpStatus } from '../utils/modules/http-status.module';
import { Request, Response, NextFunction } from 'express';

export default function () {
  return (error: CustomError | Error, req: Request, res: Response, next: NextFunction) => {
    // 개발환경 전용
    console.error(error);

    if (error instanceof SyntaxError) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(ResponseEntity.ERROR_WITH(400, '잘못된 Json 형태임미다'));
    }

    if (error instanceof Error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(ResponseEntity.ERROR());
    }

    return res
      .status(error.statusCode)
      .send(ResponseEntity.ERROR_WITH(error.statusCode, error.message, error.reason));
  };
}
