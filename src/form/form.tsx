import { CssBaseline, Typography, TextField } from '@mui/material';
import Container from '@mui/material/Container';

export function Form() {
  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Typography component="h1">Create Product</Typography>
      <TextField label="name" />
      <TextField label="size" />
    </Container>
  );
}
