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
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';
import { saveProduct } from '../services/productServices';
import {
  CREATED_STATUS,
  ERROR_SERVER_STATUS,
  INVALID_REQUEST_STATUS,
} from '../consts/httpStatus';
/// import fetch from 'node-fetch';

interface FormFields {
  name: string;
  size: string;
  type: string;
}

interface FormValueFields {
  name: { value: string };
  size: { value: string };
  type: { value: string };
}

export function Form() {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [typeValue, setTypeValue] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormFields>({
    name: '',
    size: '',
    type: '',
  });

  const validateField = (name: string, value: string) => {
    setFormErrors((prevFormErros) => ({
      ...prevFormErros,
      [name]: value.length ? '' : `the ${[name]} is required`,
    }));
  };

  const handleFetchError = (error: unknown) => {
    if (axios.isAxiosError(error) && error.response) {
      console.log(`error.response.status ${error.response.status}`);
      // console.log(error);
      if (error.response.status === INVALID_REQUEST_STATUS) {
        const data = error.response.data as { message: string };
        // 'The form is invalid, the fields name, size, type are required'
        setErrorMessage(data.message);
        return;
      }

      if (error.response.status === ERROR_SERVER_STATUS) {
        setErrorMessage('unexpected error, please try again');
        return;
      }
    }
    setErrorMessage('Connection error, please try later');
  };

  const validateForm = ({ name, size, type }: FormValueFields) => {
    validateField('name', name.value);
    validateField('size', size.value);
    validateField('type', type.value);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    const formElement = event.currentTarget;
    const formElements = formElement.elements as typeof formElement.elements &
      FormValueFields;
    const { name, size, type } = formElements;
    validateForm(formElements);
    function timeout(ms: number) {
      // eslint-disable-next-line no-promise-executor-return
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    await timeout(1000);

    try {
      const res = await saveProduct({
        name: name.value,
        size: size.value,
        type: type.value,
      });

      if (res.status === CREATED_STATUS) {
        setIsSuccess(true);
        formElement.reset();
      }

      console.log(`res.status >>>${res.status}`);
    } catch (error) {
      handleFetchError(error);
    }

    setIsSaving(false);
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const { name, value } = e.target;
    validateField(name, value);
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
      {isSuccess && <p>product stored</p>}
      <p>{errorMessage}</p>
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
