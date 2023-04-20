import { createContext } from 'react';
import { IUser } from '../../common/entities';

export interface AuthContextProps {
  isUserAuth: boolean;
  user?: IUser;
  onSuccessLogin: (user: IUser) => void;
}
export const AuthContext = createContext<AuthContextProps>({
  isUserAuth: false,
  onSuccessLogin: () => {},
});
