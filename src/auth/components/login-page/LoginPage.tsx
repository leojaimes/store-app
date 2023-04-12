import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { form } from '../../../form/form';

interface FormValueFields {
  email: string;
  password: string;
}
export function LoginPage() {
  const [emailHelperText, setEmailHelperText] = useState<string | null>(null);

  const [passwordHelperText, setPasswordHelperText] = useState<string | null>(
    null
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElement = event.currentTarget;
    const formElements = formElement.elements as typeof formElement.elements &
      FormValueFields;
    const { email, password } = formElements;

    console.log(`email ${email}`);
    if (email.trim().length === 0) {
      setEmailHelperText('The email is required');
    }
    if (password.trim().length === 0) {
      setPasswordHelperText('The password is required');
    }

    // setEmailHelperText(null);
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
        />
        <TextField
          id="password"
          label="password"
          name="password"
          type="password"
          helperText={passwordHelperText}
        />
        <Button type="submit">Send</Button>
      </form>
    </>
  );
}
