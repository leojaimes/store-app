import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { setupServer } from 'msw/node';
import { AppRouter } from './app-router';
import {
  renderWithAuthProvider,
  renderWithAuthProviderRouter,
  renderWithRouter,
} from '../utils/tests';
import { handlers } from '../mocks/handlers';
import App from '../App';
import { AuthState } from '../contexts/auth/auth-state';
import { Role } from '../const/roles';
import { Employee } from '../employee/Employee';

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
    const state: AuthState = {
      isUserAuth: true,
      user: {
        email: 'admin@gmail.com',
        role: Role.Admin,
        name: 'User Name Test',
      },
    };
    const url = '/admin';
    renderWithAuthProviderRouter(<AppRouter />, state, { url });
    expect(screen.getByText(/admin/i)).toBeInTheDocument();
  });
});

describe('when admin is authenticated in login page', () => {
  it('must be redirected to admin page', async () => {
    render(<App />);

    fillSignInForm({ email: 'admin@gmail.com', password: 'Aa123456789!@#' });
    fireEvent.click(SendButton());

    expect(
      await screen.findByRole('heading', { name: /^admin page/i })
    ).toBeInTheDocument();
    expect(await screen.findByText(/my admin name/i)).toBeInTheDocument();
  });
});

describe('when admin goes to employees page', () => {
  it('must have access', async () => {
    const state: AuthState = {
      isUserAuth: true,
      user: {
        email: 'admin@gmail.com',
        role: Role.Admin,
        name: 'User Name Test',
      },
    };
    const adminUrl = '/admin';
    renderWithAuthProviderRouter(<AppRouter />, state, { url: adminUrl });
    expect(screen.getByText(/employees/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('link', { name: /employees/i }));
    expect(
      await screen.findByRole('heading', { name: /^employees page/i })
    ).toBeInTheDocument();
  });
});

describe('when employee is authenticated in login page', () => {
  it('must be redirected to employee page', async () => {
    render(<App />);

    fillSignInForm({ email: 'employee@gmail.com', password: 'Aa123456789!@#' });
    fireEvent.click(SendButton());

    expect(
      await screen.findByRole('heading', { name: /^employees page/i })
    ).toBeInTheDocument();
  });
});

describe('when employee goes is authenticated in login page', () => {
  it('must be redirected to employee page', async () => {
    const state: AuthState = {
      isUserAuth: true,
      user: {
        email: 'employee@gmail.com',
        role: Role.Employee,
        name: 'User Name Test',
      },
    };
    const adminUrl = '/admin';
    renderWithAuthProviderRouter(<AppRouter />, state, { url: adminUrl });

    expect(
      await screen.findByRole('heading', { name: /^employees page/i })
    ).toBeInTheDocument();
  });
});

describe('when employee goes is authenticated in login page', () => {
  it('must be redirected to employee page', async () => {
    const state: AuthState = {
      isUserAuth: true,
      user: {
        email: 'employee@gmail.com',
        role: Role.Employee,
        name: 'User Name Test',
      },
    };
    const adminUrl = '/admin';
    renderWithAuthProviderRouter(<AppRouter />, state, { url: adminUrl });

    expect(
      await screen.findByRole('heading', { name: /^employees page/i })
    ).toBeInTheDocument();
  });
});

describe('when employee goes to admin page', () => {
  it.only('must be redirected to employee page', async () => {
    const state: AuthState = {
      isUserAuth: true,
      user: {
        email: 'employee@gmail.com',
        role: Role.Employee,
        name: 'User Name Test',
      },
    };
    const adminUrl = '/admin';
    renderWithAuthProviderRouter(<AppRouter />, state, { url: adminUrl });

    expect(
      await screen.findByRole('heading', { name: /^employees page/i })
    ).toBeInTheDocument();
  });
});
