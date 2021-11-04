import { Injectable, BadRequestException } from '@nestjs/common';
import { UserCredentialsDto } from '../dto/user-credentials.dto';
import { User } from '../../user/models/user.model';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { EnvConfigService } from '../../env-config/services/env-config.service';
import { UserProxyService } from '../../user/services/user-proxy.service';
import { Observable, map, defer, lastValueFrom, catchError, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { UserAuth } from '../../common/types/user-auth.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly client: UserProxyService,
    private readonly jwtService: JwtService,
    private readonly envConfigService: EnvConfigService,
  ) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  public async createUser({ email, password }: UserCredentialsDto): Promise<void> {
    const hashPassword = await hash(password, 10);
    try {
      await lastValueFrom(this.client.send('create-user', new User(email, hashPassword)));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  public async validateUser(email: string, password: string): Promise<UserAuth | null> {
    const user = await lastValueFrom(this.client.send<User>('find-user', email));

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

  public verifyToken = (token: string): Observable<UserAuth> =>
    defer(() => this.jwtService.verifyAsync(token, { secret: this.envConfigService.getAuthSecretKey() })).pipe(
      map((obj: any) => ({ id: obj.sub, email: obj.email })),
      catchError((err) => {
        throw new RpcException(err.message);
      }),
    );
}
