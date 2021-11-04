import { UserAuth } from '../../user/types/user-auth.type';
import { Request } from 'express';

export interface UserRequest extends Request {
  user: UserAuth;
}
