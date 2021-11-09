import { User } from '../../user/models/user.model';

export type UserAuth = Omit<User, 'password'>;
