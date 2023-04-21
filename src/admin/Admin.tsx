import { Typography, Button, Link as MaterialLink } from '@mui/material';
import { Navigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import ButtonAppBar from '../common/components/ButtonAppBar';
import { Role } from '../const/roles';
import { AuthContext } from '../contexts/auth/auth-context';

export function Admin() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <ButtonAppBar />
      <Typography component="h1" variant="h5">
        Admin Page
      </Typography>
    </>
  );
}
