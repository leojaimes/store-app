import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

export function LoginPage() {
  const [email, setEmail] = useState<string>('');

  const [password, setPassword] = useState<string>('');

  const [emailHelperText, setEmailHelperText] = useState<string>('');
  const [passwordHelperText, setPasswordHelperText] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setEmailHelperText('email is required');
    }
    if (!password) {
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
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        helperText={emailHelperText}
      />
      <TextField
        id="password"
        name="password"
        label="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        helperText={passwordHelperText}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
