import { User } from '../entities/user.entity';

export type UserAuth = Omit<User, 'password'>;
