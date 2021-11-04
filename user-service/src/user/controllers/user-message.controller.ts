import { Controller, UseFilters } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Ctx, Payload, RmqContext, RpcException } from '@nestjs/microservices';
import { User } from '../entities/user.entity';
import { LoggerService } from '../../logger/services/logger.service';
import { defer, map, Observable, switchMap } from 'rxjs';
import { MsgPatternLog } from '../../logger/decorators/msg-pattern-log.decorator';
import { RpcPatternFilter } from '../../common/filters/rpc-pattern.filter';

@Controller()
@UseFilters(RpcPatternFilter)
export class UserMessageController {
  constructor(private readonly userService: UserService, private readonly loggerService: LoggerService) {
    this.loggerService.setContext(UserMessageController.name);
  }

  @MsgPatternLog('create-user')
  createUser(@Payload() user: User, @Ctx() context: RmqContext): Observable<User> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    channel.ack(originalMsg);
    return defer(() => this.userService.isEmailDuplicated(user.email)).pipe(
      map((val) => {
        if (val) {
          throw new RpcException(`User with email '${user.email}' already exist`);
        }
      }),
      switchMap(() => defer(() => this.userService.saveUser(user))),
    );
  }

  @MsgPatternLog('find-user')
  findUser(@Payload() email: string, @Ctx() context: RmqContext): Observable<User> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    channel.ack(originalMsg);
    return defer(() => this.userService.findUserByEmail(email));
  }
}
