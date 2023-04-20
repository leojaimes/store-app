import React, { useContext } from 'react';
import { AuthContext } from '../contexts/auth/auth-context';

export function Employee() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <h1>Employee</h1>
      <div>{user?.name}</div>
    </>
  );
}
