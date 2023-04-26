import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

export function LoginPage() {
  const [emailHelperText, setEmailHelperText] = useState<string>('');
  const [passwordHelperText, setPasswordHelperText] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formElement = e?.currentTarget;
    const formElements = formElement.elements as typeof formElement.elements & {
      email: { value: string };
      password: { value: string };
    };
    const { email, password } = formElements;
    e.preventDefault();
    if (!email.value) {
      setEmailHelperText('email is required');
    }
    if (!password.value) {
      setPasswordHelperText('password is required');
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      id="loginForm"
      name="loginForm"
      className="loginForm"
    >
      <Typography component="h1" variant="h5">
        Login Page
      </Typography>
      <TextField
        id="email"
        name="email"
        label="email"
        helperText={emailHelperText}
      />
      <TextField
        id="password"
        name="password"
        label="password"
        helperText={passwordHelperText}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
