import { Injectable, BadRequestException } from '@nestjs/common';
import { UserCredentialsDto } from '../dto/user-credentials.dto';
import { User, UserAuth } from '../models/user.model';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { EnvConfigService } from '../../env-config/services/env-config.service';
import { UserProxy } from '../../user/services/user.proxy';
import { throwError } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly client: UserProxy,
    private readonly jwtService: JwtService,
    private readonly envConfigService: EnvConfigService,
  ) {}

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

  async verifyToken(token: string): Promise<UserAuth> {
    try {
      const result = this.jwtService.verify(token, { secret: this.envConfigService.getAuthSecretKey() });
      console.log(result);
      return result;
    } catch (e) {
      // return throwError(e);
    }
  }
}
