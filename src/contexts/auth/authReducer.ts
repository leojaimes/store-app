import { IUser } from '../../common/entities';
import { AuthState } from './auth-state';

type AuthActionType =
  | { type: '[Auth] - SignIn'; user: IUser }
  | { type: '[Auth] - LogOut' };

export const authReducer = (
  state: AuthState,
  action: AuthActionType
): AuthState => {
  switch (action.type) {
    case '[Auth] - SignIn':
      return {
        ...state,
        isUserAuth: true,
        user: action.user,
      };

    case '[Auth] - LogOut':
      return {
        ...state,
      };

    default:
      return state;
  }
};
