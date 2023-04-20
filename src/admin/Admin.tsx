import React, { useContext } from 'react';
import { AuthContext } from '../contexts/auth/auth-context';

export function Admin() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <h1>Admin Page</h1>
      <p>{user?.name}</p>
    </>
  );
}
