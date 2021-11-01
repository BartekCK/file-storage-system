import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class FileController {
  @MessagePattern('get-user-file')
  async addSubscriber(@Payload() subscriber: string, @Ctx() context: RmqContext) {
    return 'USER FILE URL';
  }
}
