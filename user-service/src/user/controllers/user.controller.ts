import { BadRequestException, Controller, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { User } from '../entities/user.entity';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  public async getAllUsers() {
    await this.userService.getUserImage();

    return ['User 1 '];
  }

  @MessagePattern('create-user')
  async addSubscriber(@Payload() user: User, @Ctx() context: RmqContext): Promise<any> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    const isDuplicated = await this.userService.isEmailDuplicated(user.email);
    if (isDuplicated) {
      return new BadRequestException(`User with email '${user.email}' already exist`);
    }

    await this.userService.saveUser(user);
    channel.ack(originalMsg);
  }
}
