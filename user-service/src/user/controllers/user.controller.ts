import { Controller, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  public async getAllUsers() {
    await this.userService.getUserImage();

    return ['User 1 '];
  }

  @MessagePattern('create-user')
  async addSubscriber(@Payload() message: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);

    return 'USER FILE URL';
  }
}
