import { ArgumentsHost, Catch, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { LoggerService } from '../../logger/services/logger.service';

@Catch(RpcException)
export class RpcPatternFilter implements RpcExceptionFilter<RpcException> {
  constructor(private readonly loggerService: LoggerService) {
    loggerService.setContext(RpcPatternFilter.name);
  }

  catch(exception: RpcException, host: ArgumentsHost): Observable<string> {
    this.loggerService.warn(`Caught: [${exception.message}]`);

    throw new Error(exception.message);
  }
}
