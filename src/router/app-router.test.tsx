import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { setupServer } from 'msw/node';
import { AppRouter } from './app-router';
import { renderWithRouter } from '../utils/tests';
import { handlers } from '../mocks/handlers';
import App from '../App';

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

const fillSignInForm = ({
  email = 'valid@gmail.com',
  password = 'Aa123456789!@#',
}) => {
  const emailTextField = EmailInput();
  const passwordTextField = PasswordInput();
  const validEmail = email;
  const validPassword = password;
  fireEvent.change(emailTextField, { target: { value: validEmail } });
  fireEvent.change(passwordTextField, {
    target: { value: validPassword },
  });
};

describe('when the user is not authenticated and enters on admin page', () => {
  it('must redirect to login page', async () => {
    const url = '/admin';
    renderWithRouter(<AppRouter />, { url });

    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });
});

describe('when the user is not authenticated and enters on employee page', () => {
  it('must redirect to login page', () => {
    const url = '/employee';
    renderWithRouter(<AppRouter />, { url });

    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });
});

describe('when the user is authenticated and enters on admin page', () => {
  it('must show admin page', () => {
    const url = '/admin';
    // TODO
    // renderWithRouter(<AppRouter />, { url });

    // expect(screen.getByText(/admin/i)).toBeInTheDocument();
  });
});

describe('when admin is authenticated in login page', () => {
  it('must be redirected to admin page', async () => {
    render(<App />);

    fillSignInForm({ email: 'admin@gmail.com', password: 'Aa123456789!@#' });
    fireEvent.click(SendButton());

    expect(await screen.findByText(/admin/i)).toBeInTheDocument();
  });
});
