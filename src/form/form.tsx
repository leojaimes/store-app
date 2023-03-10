import {
  CssBaseline,
  Typography,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  FormHelperText,
  SelectChangeEvent,
} from '@mui/material';
import Container from '@mui/material/Container';
import { ChangeEventHandler, useState } from 'react';

interface FormFields {
  name: string;
  size: string;
  type: string;
}
export function Form() {
  const [typeValue, setTypeValue] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormFields>({
    name: '',
    size: '',
    type: '',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    const formElement = event.currentTarget;
    const formElements = formElement.elements as typeof formElement.elements & {
      name: { value: string };
      size: { value: string };
      type: { value: string };
    };
    const { name, size, type } = formElements;
    if (!name.value) {
      setFormErrors((prevFormErros) => ({
        ...prevFormErros,
        name: 'the name is required',
      }));
    }

    if (!size.value) {
      setFormErrors((prevFormErros) => ({
        ...prevFormErros,
        size: 'the size is required',
      }));
    }

    if (!type.value) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        type: 'the type is required',
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const { name, value } = e.target;

    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      [name]: value.length > 0 ? '' : `the ${name} is required`,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTypeValue(e.target.value);
  };

  const handleOnClose = (e: React.SyntheticEvent<Element, Event>) => {};
  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Typography component="h1">Create Product</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="name"
          id="name"
          name="name"
          helperText={formErrors.name}
          onBlur={handleBlur}
        />
        <TextField
          label="size"
          id="size"
          name="size"
          helperText={formErrors.size}
          onBlur={handleBlur}
        />

        {/* <FormControl fullWidth>
          <InputLabel id="type">type</InputLabel>
          <Select
            data-testid="type"
            id="type"
            name="type"
            labelId="type"
            displayEmpty
            label="Select Type"
            value={typeValue}
            onClose={handleOnClose}
            onChange={handleChange}
          >
            <MenuItem value="electronic">Electronic</MenuItem>
            <MenuItem value="furniture">Furniture</MenuItem>
            <MenuItem value="clothing">Clothing</MenuItem>
          </Select>
          <FormHelperText>{formErrors.type}</FormHelperText>
        </FormControl> */}

        <TextField
          id="type"
          select
          label="type"
          name="type"
          defaultValue=""
          helperText={formErrors.type}
          fullWidth
          value={typeValue}
          onBlur={handleBlur}
          onChange={handleChange}
        >
          <MenuItem value="electronic">Electronic</MenuItem>
          <MenuItem value="furniture">Furniture</MenuItem>
          <MenuItem value="clothing">Clothing</MenuItem>
        </TextField>

        <Button disabled={isSaving} type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
}
