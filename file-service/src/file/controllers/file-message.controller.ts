import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class FileMessageController {
  @MessagePattern('get-user-file')
  async addSubscriber(@Payload() data: string, @Ctx() context: RmqContext) {
    console.log('I GET A MESSAGE');
    return 'USER FILE URL';
  }

  @MessagePattern('delete-file')
  async deleteFile(@Payload() data: string, @Ctx() context: RmqContext) {
    console.log('I SHOULD DELETE FILE');
    return 'USER FILE URL';
  }
}
