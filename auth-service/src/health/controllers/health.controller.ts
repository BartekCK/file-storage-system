import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('/health')
@ApiTags('health')
export class HealthController {
  @Get('/')
  getHealthInfo() {
    return `Simple health response`;
  }
}
