import { BadRequestException, Controller } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { User } from '../entities/user.entity';

@Controller()
export class UserMessageController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('create-user')
  async createUser(@Payload() user: User, @Ctx() context: RmqContext): Promise<any> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    const isDuplicated = await this.userService.isEmailDuplicated(user.email);
    if (isDuplicated) {
      return new BadRequestException(`User with email '${user.email}' already exist`);
    }

    await this.userService.saveUser(user);
    channel.ack(originalMsg);
  }

  @MessagePattern('find-user')
  async findUser(@Payload() email: string, @Ctx() context: RmqContext): Promise<User> {
    console.log('UserService get message from "find-user"');
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    const user = await this.userService.findUserByEmail(email);
    channel.ack(originalMsg);

    return user;
  }
}
