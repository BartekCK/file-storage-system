import { Controller, Get } from '@nestjs/common';

@Controller('/health')
export class HealthController {
  @Get('/')
  getHealthInfo() {
    return `Simple health response`;
  }
}
