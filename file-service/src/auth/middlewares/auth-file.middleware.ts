import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { RedisService } from '../../redis/services/redis.service';

@Injectable()
export class AuthFileMiddleware implements NestMiddleware {
  constructor(private readonly redisService: RedisService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { token } = req.params;

    const fileId = await this.redisService.get(token);
    if (!fileId) {
      throw new ForbiddenException();
    }

    next();
  }
}
