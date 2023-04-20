import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { AuthContext } from '../contexts/auth/auth-context';
import { Role } from '../const/roles';

export function Employee() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <h1>Employee</h1>
      <div>{user?.name}</div>
      {user?.role === Role.Admin && <Button>Delete</Button>}
    </>
  );
}
