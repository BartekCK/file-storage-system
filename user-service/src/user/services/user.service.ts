import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FileTokenConst } from '../constants/file-token.const';

@Injectable()
export class UserService {
  constructor(@Inject(FileTokenConst) private client: ClientProxy) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  public async getUserImage() {
    console.log('Sending message');
    const message = ':userId:';
    const temp = await this.client.send('get-user-file', message).pipe().toPromise();
    console.log(temp);
  }
}
