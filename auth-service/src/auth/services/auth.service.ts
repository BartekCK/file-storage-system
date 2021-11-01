import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthTokenConst } from '../constants/auth-token.const';
import { UserCredentialsDto } from '../dto/user-credentials.dto';
import { User, UserAuth } from '../models/user.model';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@Inject(AuthTokenConst) private client: ClientProxy, private jwtService: JwtService) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  public async createUser({ email, password }: UserCredentialsDto): Promise<void> {
    const hashPassword = await hash(password, 10);

    const res = await this.client.send('create-user', new User(email, hashPassword)).toPromise();

    if (res?.status === 400) {
      throw new BadRequestException(res.message);
    }

    /**
     * Log unknown error
     */
  }

  public async validateUser(email: string, password: string): Promise<UserAuth | null> {
    const user = await this.client.send<User>('find-user', email).toPromise();

    if (user && (await compare(password, user.password))) {
      const { password, ...userData } = user;
      return userData;
    }

    return null;
  }

  public getAccessToken(user: UserAuth): string {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
