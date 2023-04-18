import { createContext } from 'react';

export interface AuthContextProps {
  isUserAuth: boolean;
  onSuccessLogin: () => void;
}
export const AuthContext = createContext<AuthContextProps>({
  isUserAuth: false,
  onSuccessLogin: () => {},
});
