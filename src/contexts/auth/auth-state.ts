import { IUser } from '../../common/entities';

export interface AuthState {
  isUserAuth: boolean;
  user?: IUser;
}
