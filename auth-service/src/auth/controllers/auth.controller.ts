import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserCredentialsDto } from '../dto/user-credentials.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { UserRequest } from '../../common/interfaces/user-req.interface';
import { ReadAccessTokenDto } from '../dto/read-access-token.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('/auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/')
  public async createUser(@Body() createUserDto: UserCredentialsDto): Promise<void> {
    await this.authService.createUser(createUserDto);
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: UserCredentialsDto })
  public async login(@Req() req: UserRequest): Promise<ReadAccessTokenDto> {
    const token = this.authService.getAccessToken(req.user);
    return ReadAccessTokenDto.toDto(token);
  }
}
