import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { AuthContext } from '../contexts/auth/auth-context';
import { Role } from '../const/roles';
import ButtonAppBar from '../common/components/ButtonAppBar';

export function Employee() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <ButtonAppBar />
      <h1>Employees Page</h1>
      {user?.role === Role.Admin && <Button>Delete</Button>}
    </>
  );
}
