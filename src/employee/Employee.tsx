import React, { useContext } from 'react';
import { Button, Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/auth/auth-context';
import { Role } from '../const/roles';
import ButtonAppBar from '../common/components/ButtonAppBar';

export function Employee() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <ButtonAppBar />
      <Typography component="h1" variant="h5">
        Employees Page
      </Typography>
      {user?.role === Role.Admin && <Button>Delete</Button>}
    </>
  );
}
