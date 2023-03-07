import {
  CssBaseline,
  Typography,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
} from '@mui/material';
import Container from '@mui/material/Container';

export function Form() {
  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Typography component="h1">Create Product</Typography>
      <TextField label="name" id="name" name="name" />
      <TextField label="size" id="size" name="size" />

      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="type">
          Type
        </InputLabel>
        <NativeSelect
          inputProps={{
            name: 'type',
            id: 'type',
          }}
        >
          <option aria-label="None" value="" />
          <option value="electronic">Electronic</option>
          <option value="furniture">Furniture</option>
          <option value="clothing">Clothing</option>
        </NativeSelect>
      </FormControl>
    </Container>
  );
}
