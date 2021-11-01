import { UserAuth } from '../models/user.model';

export interface UserRequest extends Request {
  user: UserAuth;
}
