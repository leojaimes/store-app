import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

export function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [emailHelperText, setEmailHelperText] = useState<string | null>(null);

  const [password, setPassword] = useState<string>('');
  const [passwordHelperText, setPasswordHelperText] = useState<string | null>(
    null
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`email: ${email}`);
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          helperText={emailHelperText}
        />
        <TextField
          id="password"
          label="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          helperText={passwordHelperText}
        />
        <Button type="submit">Send</Button>
      </form>
    </>
  );
}
