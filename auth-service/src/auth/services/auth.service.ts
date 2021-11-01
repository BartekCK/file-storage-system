import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthTokenConst } from '../constants/auth-token.const';
import { UserCredentialsDto } from '../dto/user-credentials.dto';
import { User } from '../models/user.model';
import { hash } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(@Inject(AuthTokenConst) private client: ClientProxy) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  async createUser({ email, password }: UserCredentialsDto): Promise<void> {
    const hashPassword = await hash(password, 10);

    await this.client.send('create-user', new User(email, hashPassword)).toPromise();
  }
}
