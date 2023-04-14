import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { LoginPage } from './LoginPage';
import { passwordValidationMessage } from '../../../messages';
import { handlers } from '../../../mocks/handlers';

beforeEach(() => {
  render(<LoginPage />);
});

const server = setupServer(...handlers);
beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

const EmailInput = () => screen.getByLabelText(/email/i);
const PasswordInput = () => screen.getByLabelText(/password/i);
const SendButton = () => screen.getByRole('button', { name: /send/i });

const fillValidSignInForm = () => {
  const emailTextField = EmailInput();
  const passwordTextField = PasswordInput();
  const validEmail = 'valid@gmail.com';
  const validPassword = 'asdfghjA1#';
  fireEvent.change(emailTextField, { target: { value: validEmail } });
  fireEvent.change(passwordTextField, {
    target: { value: validPassword },
  });
};

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

describe('when user fills and blur the email input with invalid email, and then focus and change with a valid email', () => {
  it('must not display a validation message the email is invalid. Example: leo@gmail.com', () => {
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalid.email' },
    });
    fireEvent.blur(screen.getByLabelText(/email/i));

    expect(screen.queryByText(/the email is invalid/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'valid@gmail.com' },
    });
    fireEvent.blur(screen.getByLabelText(/email/i));
    expect(screen.queryByText(/the email is invalid/i)).not.toBeInTheDocument();
  });
});

describe('when the user fills and blur the password input with a value without one upper case character', () => {
  it(`must display the validation message "The password must contain at least 8 characters,
  one upper case letter, one number and one special character"`, () => {
    const passwordSevenLenght = 'asdfghj';
    fireEvent.change(PasswordInput(), {
      target: { value: passwordSevenLenght },
    });

    fireEvent.blur(PasswordInput());
    expect(screen.queryByText(passwordValidationMessage)).toBeInTheDocument();
  });
});

describe('when the user fills and blur the password input with a value without one number', () => {
  it.todo(
    `must display the validation message "The password must contain at least 8 characters,
  one upper case letter, one number and one special character"`,
    () => {
      const passwordWithoutUpperCase = 'asdfghj8';
      fireEvent.change(PasswordInput(), {
        target: { value: passwordWithoutUpperCase },
      });

      fireEvent.blur(PasswordInput());
      expect(screen.queryByText(passwordValidationMessage)).toBeInTheDocument();
    }
  );
});

describe('when the user fills and blur the password input with a value without one special character', () => {
  it(`must display the validation message "The password must contain at least 8 characters,
  one upper case letter, one number and one special character"`, () => {
    const passwordWithoutNumber = 'asdfghjA';
    fireEvent.change(PasswordInput(), {
      target: { value: passwordWithoutNumber },
    });

    fireEvent.blur(PasswordInput());
    expect(screen.queryByText(passwordValidationMessage)).toBeInTheDocument();
  });
});

describe('when the user fills and blur the password input with a value without one special character', () => {
  it(`must display the validation message "The password must contain at least 8 characters,
  one upper case letter, one number and one special character"`, () => {
    const passwordWithoutSpecialCharacter = 'asdfghjA1';
    fireEvent.change(PasswordInput(), {
      target: { value: passwordWithoutSpecialCharacter },
    });

    fireEvent.blur(PasswordInput());
    expect(screen.queryByText(passwordValidationMessage)).toBeInTheDocument();
  });
});

describe('when the user fills and blur the password input with a invalid value and then change with valid value and blur again', () => {
  it(`must display the validation message "The password must contain at least 8 characters,
  one upper case letter, one number and one special character"`, () => {
    const passwordWithoutSpecialCharacter = 'asdfghjA1';
    const validPassword = 'asdfghjA1#';
    fireEvent.change(PasswordInput(), {
      target: { value: passwordWithoutSpecialCharacter },
    });

    fireEvent.blur(PasswordInput());
    expect(screen.queryByText(passwordValidationMessage)).toBeInTheDocument();

    fireEvent.change(PasswordInput(), {
      target: { value: validPassword },
    });

    fireEvent.blur(PasswordInput());
    expect(
      screen.queryByText(passwordValidationMessage)
    ).not.toBeInTheDocument();
  });
});

describe('when the user submit the login form with valid data', () => {
  it('must disable the submit button while the form page is fetching the data', async () => {
    const sendButton = SendButton();
    const emailTextField = EmailInput();
    const passwordTextField = PasswordInput();
    const validEmail = 'valid@gmail.com';
    const validPassword = 'asdfghjA1#';
    fireEvent.change(emailTextField, { target: { value: validEmail } });
    fireEvent.change(passwordTextField, {
      target: { value: validPassword },
    });
    fireEvent.click(sendButton);
    await waitFor(() => expect(sendButton).toBeDisabled());

    expect(sendButton).not.toBeDisabled();
  });
  it('must be a loading indicator at the top of the form while it is fetching', async () => {
    const sendButton = SendButton();
    fillValidSignInForm();
    const loadingIndicator = screen.findByTestId('loading-indicator');
    fireEvent.click(sendButton);
    await waitFor(() => expect(loadingIndicator).toBeInTheDocument());
    // expect(loadingIndicator).toBeInTheDocument();
  });
});
