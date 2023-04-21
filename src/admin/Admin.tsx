import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ButtonAppBar from '../common/components/ButtonAppBar';

export function Admin() {
  // const { user } = useContext(AuthContext);
  return (
    <>
      <ButtonAppBar />
      <Typography component="h1" variant="h5">
        Admin Page
      </Typography>
      <Link to="/employee">Employees</Link>
    </>
  );
}
