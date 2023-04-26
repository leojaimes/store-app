import { screen, render } from '@testing-library/react';
import { LoginPage } from './LoginPage';

const getEmailTextField = () => screen.getByRole('textbox', { name: /email/i });
const getPasswordTextField = () =>
  screen.getByRole('textbox', { name: /password/i });

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

    const emailTextField = getEmailTextField();
    const passwordTextField = getPasswordTextField();
    expect(emailTextField).toBeInTheDocument();
    expect(passwordTextField).toBeInTheDocument();
  });
});
