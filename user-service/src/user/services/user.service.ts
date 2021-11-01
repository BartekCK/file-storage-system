import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FileTokenConst } from '../constants/file-token.const';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @Inject(FileTokenConst)
    private readonly client: ClientProxy,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  public async getUserImage() {
    console.log('Sending message');
    const message = ':userId:';
    const temp = await this.client.send('get-user-file', message).toPromise();
    console.log(temp);
  }

  public async saveUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  public async isEmailDuplicated(email: string): Promise<boolean> {
    return Boolean(await this.userRepository.findOne({ where: { email } }));
  }
}
