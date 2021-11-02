import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { AuthService } from '../services/auth.service';
import { UserAuth } from '../models/user.model';

@Controller()
export class AuthMessageController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('token-verify')
  async findUser(@Payload() token: string, @Ctx() context: RmqContext): Promise<UserAuth> {
    console.log('token-verify GET');
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    const user = await this.authService.verifyToken(token);

    channel.ack(originalMsg);
    return 'user' as any;
  }
}
