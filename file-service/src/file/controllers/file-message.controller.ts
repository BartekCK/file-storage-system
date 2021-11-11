import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { FileProcessProxyService } from '../../file-process/services/file-process-proxy.service';
import { FileService } from '../services/file.service';

@Controller()
export class FileMessageController {
  constructor(
    private readonly fileProcessProxyService: FileProcessProxyService,
    private readonly fileService: FileService,
  ) {}

  @MessagePattern('file-processed')
  async deleteFile(@Payload() key: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    const fileDoc = await this.fileService.getFileByKey(key);
    await this.fileService.markAsProcessed(fileDoc);

    setTimeout(() => {
      this.fileProcessProxyService.emit('delete-file', key);
    }, 10000);

    channel.ack(originalMsg);
  }
}
