import { Controller, Get } from '@nestjs/common';
import { FileProcessProxyService } from '../../file-process/services/file-process-proxy.service';

@Controller('/')
export class FileController {
  constructor(private readonly fileProcessProxyService: FileProcessProxyService) {}

  @Get()
  public async getMethod() {
    this.fileProcessProxyService.emit('TO-PATTEN', { name: 'Artur' });
    console.log('Message was sent');
    return 'Hello from file controller';
  }
}
