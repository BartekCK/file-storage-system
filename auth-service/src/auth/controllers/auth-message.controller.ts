import { Controller, UseFilters } from '@nestjs/common';
import { Ctx, Payload, RmqContext } from '@nestjs/microservices';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { RpcPatternFilter } from '../../common/filters/rpc-pattern.filter';
import { LoggerService } from '../../logger/services/logger.service';
import { UserAuth } from '../../common/types/user-auth.type';
import { MsgPatternLog } from '../../logger/decorators/msg-pattern-log.decorator';

@Controller()
@UseFilters(RpcPatternFilter)
export class AuthMessageController {
  constructor(private readonly authService: AuthService, private readonly loggerService: LoggerService) {
    this.loggerService.setContext(AuthMessageController.name);
  }

  @MsgPatternLog('token-verify')
  findUser(@Payload() token: string, @Ctx() context: RmqContext): Observable<UserAuth> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    channel.ack(originalMsg);
    return this.authService.verifyToken(token);
  }
}
