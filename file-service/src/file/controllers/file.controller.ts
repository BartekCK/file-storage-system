import { Controller, Get } from '@nestjs/common';
import { FileProcessProxyService } from '../../file-process/services/file-process-proxy.service';

@Controller('/')
export class FileController {
  constructor(private readonly fileProcessProxyService: FileProcessProxyService) {}

  @Get()
  public async getMethod() {
    console.log('Save new file in system');
    console.log('Emit message to process file');
    this.fileProcessProxyService.emit('process-file', 'fileLocation');
    return 'Hello from file controller';
  }
}
