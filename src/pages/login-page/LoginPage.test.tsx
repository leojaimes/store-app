import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { setupServer } from 'msw/node';

import { LoginPage } from './LoginPage';
import { handlers } from '../../mocks/handlers';
import { RenderReactQueryWrapper } from '../../mocks/render-with-provider';

const EmailTextField = () => screen.getByRole('textbox', { name: /email/i });
const PasswordTextField = () =>
  screen.getByRole('textbox', { name: /password/i });

const SubmitButton = () => screen.getByRole('button', { name: /submit/i });

describe('when login page is mounted', () => {
  it('should be show login title', () => {
    RenderReactQueryWrapper({ children: <LoginPage /> });

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /login page/i
    );
  });
});

describe('when login page is mounted', () => {
  it('should be show email text field', () => {
    RenderReactQueryWrapper({ children: <LoginPage /> });
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
    RenderReactQueryWrapper({ children: <LoginPage /> });
    expect(screen.queryByText(/email is required/)).not.toBeInTheDocument();
    expect(screen.queryByText(/password is required/)).not.toBeInTheDocument();

    await userEvent.click(SubmitButton());
    expect(screen.getByText(/email is required/)).toBeInTheDocument();
    expect(screen.getByText(/password is required/)).toBeInTheDocument();
  });
});

describe('when user onblur email text field and it has an invalid email value', () => {
  it('should show this email is invalid', async () => {
    RenderReactQueryWrapper({ children: <LoginPage /> });
    expect(screen.queryByText(/email is invalid/)).not.toBeInTheDocument();
    const emailTextField = EmailTextField();

    await userEvent.type(emailTextField, 'error.email');
    expect(emailTextField).toHaveValue('error.email');
    await userEvent.tab();

    expect(screen.getByText(/email is invalid/)).toBeInTheDocument();

    await userEvent.type(emailTextField, 'valid@email.com');
    await userEvent.tab();
    expect(screen.queryByText(/email is invalid/)).not.toBeInTheDocument();
  });
});

describe('when user submit button', () => {
  it('the submit button should be disable while fetching data', async () => {
    RenderReactQueryWrapper({ children: <LoginPage /> });
    expect(screen.queryByText(/email is invalid/)).not.toBeInTheDocument();
    const emailTextField = EmailTextField();
    const passwordTextField = PasswordTextField();
    const submitButton = SubmitButton();
    await userEvent.type(emailTextField, 'valid@email.com');
    await userEvent.type(passwordTextField, 'validpassword');
    await userEvent.click(submitButton);
    await waitFor(() => expect(submitButton).toBeDisabled());
    await waitFor(() => expect(submitButton).not.toBeDisabled());
  });
});

describe('when user submit button', () => {
  it('it should show a loading indicator while is fetching the login', async () => {
    RenderReactQueryWrapper({ children: <LoginPage /> });
    expect(
      screen.queryByRole('progressbar', { name: /loading/i })
    ).not.toBeInTheDocument();

    const emailTextField = EmailTextField();
    const passwordTextField = PasswordTextField();
    const submitButton = SubmitButton();
    await userEvent.type(emailTextField, 'valid@email.com');
    await userEvent.type(passwordTextField, 'validpassword');
    await userEvent.click(submitButton);
    const circularProgress = screen.findByRole('progressbar', {
      name: /loading/i,
    });

    expect(await circularProgress);
  });
});
