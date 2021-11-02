import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { Request } from 'express';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  public async getLoggedUserInf(@Req() req: Request): Promise<any> {
    return 'ala ma kota';
  }
}
