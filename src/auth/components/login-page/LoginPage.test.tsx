import { render, screen, fireEvent } from '@testing-library/react';
import { LoginPage } from './LoginPage';

beforeEach(() => {
  render(<LoginPage />);
});
describe('when loging page is mounted', () => {
  it('must display login title', () => {
    expect(
      screen.getByRole('heading', { name: /login page/i })
    ).toBeInTheDocument();
  });

  it('must have a form with the following fields: email, password and a submit button', () => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });
});

describe('user leaves empty fields and clicks the submit button', () => {
  it('should display the format: "The [field name] is required" aside of the proper field', () => {
    expect(
      screen.queryByText(/the email is required/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/the password is required/i)
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    expect(screen.getByText(/the email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/the password is required/i)).toBeInTheDocument();
  });
});

describe('when user fills the  fields and clicks the submit button', () => {
  it('must not display required messages', () => {
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'leo@gmail.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'pass123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    expect(
      screen.queryByText(/the email is required/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/the password is required/i)
    ).not.toBeInTheDocument();
  });
});

describe('when user fills and blur the email input with invalid email', () => {
  it('must not display a validation message the email is invalid. Example: leo@gmail.com', () => {
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalid.email' },
    });
    fireEvent.blur(screen.getByLabelText(/email/i));

    expect(screen.queryByText(/the email is invalid/i)).toBeInTheDocument();
  });
});
