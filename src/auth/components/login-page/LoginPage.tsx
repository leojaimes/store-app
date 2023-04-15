import {
  Button,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { sign } from 'crypto';
import axios, { AxiosError } from 'axios';
import { passwordValidationMessage } from '../../../messages';
import { signin } from '../../../api/request';

interface FormFields {
  email: string;
  password: string;
}

interface FormValueFields {
  email: { value: string };
  password: { value: string };
}
const isValidEmail = (evaluateValue: string): boolean => {
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gm;

  if (!regex.test(evaluateValue)) {
    return false;
  }
  return true;
};

const isValidPassword = (password: string): boolean => {
  const passwordRulesRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/; // /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  return passwordRulesRegex.test(password);
};
export function LoginPage() {
  const [emailHelperText, setEmailHelperText] = useState<string | null>(null);

  const [passwordHelperText, setPasswordHelperText] = useState<string | null>(
    null
  );
  const [formValues, setFormValues] = useState<FormFields>({
    email: '',
    password: '',
  });
  const [isSigning, setIsSigning] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isValidForm = (): boolean => {
    const { email, password } = formValues;
    const isEmailEmpty = !email;
    const isPasswordEmpty = !password;
    if (isEmailEmpty) {
      setEmailHelperText('The email is required');
    }
    if (isPasswordEmpty) {
      setPasswordHelperText('The password is required');
    }

    return !isEmailEmpty && !isPasswordEmpty;
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const formElement = event.currentTarget;
    // const formElements = formElement.elements as typeof formElement.elements &
    //   FormValueFields;
    const { email, password } = formValues;
    // if is a invalid form return;
    if (!isValidForm()) return;
    function timeout(ms: number) {
      // eslint-disable-next-line no-promise-executor-return
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    setIsSigning(true);

    // await timeout(2000);
    try {
      const res = await signin({ email, password });
      console.log(`res ${JSON.stringify(res.data)}`);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const data = error.response.data as { message: string };
        setErrorMessage(data.message);
        setIsOpen(true);
      }
    } finally {
      setIsSigning(false);
    }

    // setEmailHelperText(null);
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    ///
    const {
      target: { value, name },
    } = event;

    setFormValues({ ...formValues, [name]: value });

    if (isValidEmail(formValues.email)) {
      setEmailHelperText(null);
    }
  };
  const handleBlurEmail = () => {
    if (!isValidEmail(formValues.email)) {
      setEmailHelperText('the email is invalid');
      return;
    }

    setEmailHelperText(null);
  };

  const handleBlurPassword = () => {
    if (!isValidPassword(formValues.password)) {
      setPasswordHelperText(passwordValidationMessage);
      return;
    }
    setPasswordHelperText(null);
  };

  return (
    <>
      {isSigning && <CircularProgress data-testid="loading-indicator" />}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        message={errorMessage}
        autoHideDuration={6000}
      />
      <Typography variant="h1">Login Page</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="email"
          label="email"
          name="email"
          helperText={emailHelperText}
          onChange={handleChange}
          value={formValues.email}
          onBlur={handleBlurEmail}
        />
        <TextField
          id="password"
          label="password"
          name="password"
          type="password"
          helperText={passwordHelperText}
          onChange={handleChange}
          onBlur={handleBlurPassword}
          value={formValues.password}
        />
        <Button type="submit" disabled={isSigning}>
          Send
        </Button>
      </form>
    </>
  );
}
