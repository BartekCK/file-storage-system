import { Controller, UseFilters } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext, Transport } from '@nestjs/microservices';
import { AuthService } from '../services/auth.service';
import { UserAuth } from '../models/user.model';
import { Observable } from 'rxjs';
import { RpcPatternFilter } from '../filters/rpc-pattern.filter';

@Controller()
@UseFilters(RpcPatternFilter)
export class AuthMessageController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('token-verify', Transport.RMQ)
  findUser(@Payload() token: string, @Ctx() context: RmqContext): Observable<UserAuth> {
    console.log('AuthService get message from "token-verify"');
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    const observable = this.authService.verifyToken(token);
    channel.ack(originalMsg);

    return observable;
  }
}
