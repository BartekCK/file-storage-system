import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserCredentialsDto } from '../dto/user-credentials.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/')
  public async getAllUsers(@Body() createUserDto: UserCredentialsDto): Promise<void> {
    await this.authService.createUser(createUserDto);
  }

  @Get('/')
  public async login(@Body() userCredentialsDto: UserCredentialsDto) {}
}
