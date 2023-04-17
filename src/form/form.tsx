import { CssBaseline, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import React from 'react';

export function Form() {
  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Typography>Create Product </Typography>
    </Container>
  );
}

export const form = () => {
  return <div>form </div>;
};
