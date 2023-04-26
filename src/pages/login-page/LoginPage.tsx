import { TextField, Typography } from '@mui/material';
import React from 'react';

export function LoginPage() {
  return (
    <>
      <Typography component="h1" variant="h5">
        Login Page
      </Typography>
      <TextField id="email" name="email" label="email" />
      <TextField id="password" name="password" label="password" />
    </>
  );
}
