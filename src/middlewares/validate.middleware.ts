import express from 'express';
import { validationResult, ContextRunner } from 'express-validator';
import { BadRequestException } from '../utils/modules/custom-error.module';
import asyncWrap from '../utils/modules/async-wrap.module';
// can be reused by many routes

// sequential processing, stops running validations chain if the previous one fails.
export const validate = (validations: ContextRunner[]) => {
  return asyncWrap(
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      for (let validation of validations) {
        const result = await validation.run(req);

        // 첫번째 에러만 보여주고 싶으면 요렇게
        // if (!result.isEmpty()) break;
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const reason = errors
          .array()
          .map((error) => `[${error['location']}]${error['path']}: ${error['msg']}`);
        throw new BadRequestException('validation error', reason);
      }
      return next();
    },
  );
};
