import { User } from '../../user/entities/user.entity';

export type UserAuth = Omit<User, 'password'>;
