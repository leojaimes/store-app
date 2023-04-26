import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LoginPage } from './LoginPage';

const EmailTextField = () => screen.getByRole('textbox', { name: /email/i });
const PasswordTextField = () =>
  screen.getByRole('textbox', { name: /password/i });

const SubmitButton = () => screen.getByRole('button', { name: /submit/i });

describe('when login page is mounted', () => {
  it('should be show login title', () => {
    render(<LoginPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /login page/i
    );
  });
});

describe('when login page is mounted', () => {
  it('should be show email text field', () => {
    render(<LoginPage />);

    const emailTextField = EmailTextField();
    const passwordTextField = PasswordTextField();
    const submitButton = SubmitButton();

    expect(emailTextField).toBeInTheDocument();
    expect(passwordTextField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
describe('when user click submit', () => {
  it('should show this field is required', async () => {
    render(<LoginPage />);

    expect(screen.queryByText(/email is required/)).not.toBeInTheDocument();
    expect(screen.queryByText(/password is required/)).not.toBeInTheDocument();

    await userEvent.click(SubmitButton());
    expect(screen.getByText(/email is required/)).toBeInTheDocument();
    expect(screen.getByText(/password is required/)).toBeInTheDocument();
  });
});
