import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';

@Injectable()
export class AuthFileMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { token } = req.params;
    console.log(token);
    throw new ForbiddenException();
    next();
  }
}
