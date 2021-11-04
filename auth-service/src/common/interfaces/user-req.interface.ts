import { UserAuth } from '../types/user-auth.type';

export interface UserRequest extends Request {
  user: UserAuth;
}
