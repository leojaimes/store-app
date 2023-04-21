import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Link as MaterialLink,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth/auth-context';
import { Role } from '../../const/roles';

export default function ButtonAppBar() {
  const { user } = useContext(AuthContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}

          {user?.role === Role.Admin && (
            <Button
              component={Link}
              to="/employee"
              variant="contained"
              color="primary"
            >
              Employees
            </Button>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {user?.name}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
