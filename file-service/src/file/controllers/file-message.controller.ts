import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { FileProcessProxyService } from '../../file-process/services/file-process-proxy.service';

@Controller()
export class FileMessageController {
  constructor(private readonly fileProcessProxyService: FileProcessProxyService) {}

  @MessagePattern('get-user-file')
  async addSubscriber(@Payload() data: string, @Ctx() context: RmqContext) {
    console.log('I GET A MESSAGE');
    return 'USER FILE URL';
  }

  @MessagePattern('file-processed')
  async deleteFile(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    console.log(data);

    console.log('File processed');
    console.log('Save in database');
    console.log('Send msg to remove old file');
    this.fileProcessProxyService.emit('delete-file', 'fileLocation');

    channel.ack(originalMsg);
  }
}
