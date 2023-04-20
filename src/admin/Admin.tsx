import { Typography } from '@mui/material';
import ButtonAppBar from '../common/components/ButtonAppBar';

export function Admin() {
  // const { user } = useContext(AuthContext);
  return (
    <>
      <ButtonAppBar />
      <Typography component="h1" variant="h5">
        Admin Page
      </Typography>
    </>
  );
}
