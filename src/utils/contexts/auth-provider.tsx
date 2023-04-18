import React, { useMemo, useReducer } from 'react';
import { AuthState } from './auth-state';
import { AuthContext } from './auth-context';
import { authReducer } from './authReducer';

const AUTH_INITIAL_STATE: AuthState = { isUserAuth: false };

interface Props {
  children: React.ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const onSuccessLogin = () => {
    dispatch({ type: '[Auth] - SignIn', payload: true });
  };

  const memoizedContextValue = useMemo(() => {
    const contextValue = { ...state, onSuccessLogin };
    return contextValue;
  }, [state]);

  return (
    <AuthContext.Provider value={memoizedContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
