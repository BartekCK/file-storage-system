import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoggerService } from '../services/logger.service';

@Injectable()
export class MsgLoggerInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: LoggerService) {
    this.loggerService.setContext(MsgLoggerInterceptor.name);
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const pattern = context.switchToRpc().getContext().args[2];
    this.loggerService.debug(`Receive message from pattern "${pattern}"`);
    return next.handle();
  }
}
