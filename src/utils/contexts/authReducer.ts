import { AuthState } from './auth-state';

type AuthActionType =
  | { type: '[Auth] - SignIn'; payload: boolean }
  | { type: '[Auth] - LogOut' };

export const authReducer = (
  state: AuthState,
  action: AuthActionType
): AuthState => {
  switch (action.type) {
    case '[Auth] - SignIn':
      return {
        ...state,
      };

    case '[Auth] - LogOut':
      return {
        ...state,
      };

    default:
      return state;
  }
};
