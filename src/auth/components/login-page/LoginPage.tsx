import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { passwordValidationMessage } from '../../../messages';

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElement = event.currentTarget;
    const formElements = formElement.elements as typeof formElement.elements &
      FormValueFields;
    const { email, password } = formElements;

    if (email.value.trim().length === 0) {
      setEmailHelperText('The email is required');
    }
    if (password.value.trim().length === 0) {
      setPasswordHelperText('The password is required');
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
      console.log('pase por aki 1');
      setEmailHelperText(null);
    }
  };
  const handleBlurEmail = () => {
    console.log(
      `${formValues.email} invalid: ${!isValidEmail(formValues.email)}`
    );
    if (!isValidEmail(formValues.email)) {
      setEmailHelperText('the email is invalid');
      return;
    }

    setEmailHelperText(null);
  };

  const handleBlurPassword = () => {
    console.log(`${formValues.password}`);
    if (!isValidPassword(formValues.password)) {
      setPasswordHelperText(passwordValidationMessage);
      return;
    }
    setPasswordHelperText(null);
  };

  return (
    <>
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
        <Button type="submit">Send</Button>
      </form>
    </>
  );
}
