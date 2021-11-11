import { Controller } from '@nestjs/common';
import { Ctx, Payload, RmqContext } from '@nestjs/microservices';
import { FileProcessProxyService } from '../../file-process/services/file-process-proxy.service';
import { FileService } from '../services/file.service';
import { MsgPatternLog } from '../../logger/decorators/msg-pattern-log.decorator';

@Controller()
export class FileMessageController {
  constructor(
    private readonly fileProcessProxyService: FileProcessProxyService,
    private readonly fileService: FileService,
  ) {}

  @MsgPatternLog('file-processed')
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
