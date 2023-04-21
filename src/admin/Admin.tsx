import { Typography, Button, Link as MaterialLink } from '@mui/material';
import { Navigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import ButtonAppBar from '../common/components/ButtonAppBar';
import { Role } from '../const/roles';
import { AuthContext } from '../contexts/auth/auth-context';

export function Admin() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" replace />;
  }
  if (user?.role && user.role === Role.Employee) {
    console.log('navigate to employee');
    return <Navigate to="/employee" replace />;
  }

  return (
    <>
      <ButtonAppBar />
      <Typography component="h1" variant="h5">
        Admin Page
      </Typography>
    </>
  );
}
