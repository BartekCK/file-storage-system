import { Controller, Get, Req } from '@nestjs/common';
import { UserRequest } from '../../common/interfaces/user-req.interface';
import { Authorized } from '../../auth/decorators/authorized.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserAuth } from '../../common/types/user-auth.type';

@Controller('/users')
@ApiTags('users')
@ApiBearerAuth()
export class UserController {
  @Get('/')
  @Authorized()
  public async getLoggedUserInf(@Req() req: UserRequest): Promise<UserAuth> {
    return req.user;
  }
}
