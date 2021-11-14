import { Controller, Get, Req } from '@nestjs/common';
import { UserRequest } from '../../common/interfaces/user-req.interface';
import { Authorized } from '../../auth/decorators/authorized.decorator';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ReadUserDto } from '../dto/read-user.dto';
import { UserService } from '../services/user.service';

@Controller('/users')
@ApiTags('users')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @Authorized()
  @ApiOkResponse({ type: ReadUserDto })
  public async getLoggedUserInf(@Req() req: UserRequest): Promise<ReadUserDto> {
    const user = await this.userService.getUserById(req.user.id);
    return ReadUserDto.mapToEntity(user);
  }
}
