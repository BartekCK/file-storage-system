import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserRequest } from '../../auth/interfaces/user-req.interface';
import { Authorized } from '../../auth/decorators/authorized.decorator';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @Authorized()
  public async getLoggedUserInf(@Req() req: UserRequest): Promise<any> {
    return req.user;
  }
}
