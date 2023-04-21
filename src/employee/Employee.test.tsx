import { render, screen, fireEvent } from '@testing-library/react';
import { Employee } from './Employee';
import {
  renderWithAuthProvider,
  renderWithAuthProviderRouter,
} from '../utils/tests';
import { AppRouter } from '../router/app-router';
import { AuthState } from '../contexts/auth/auth-state';
import { Role } from '../const/roles';

describe('when the admin access to employee page is mounted ', () => {
  it('must have to access to delete the employee button', async () => {
    const state: AuthState = {
      isUserAuth: true,
      user: {
        email: 'admin@gmail.com',
        role: Role.Admin,
        name: 'Admin Name Test',
      },
    };

    renderWithAuthProviderRouter(<Employee />, state);
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });
});

describe('when the Employee access to employee page ', () => {
  it('must not have to access to delete the employee button', async () => {
    const state: AuthState = {
      isUserAuth: true,
      user: {
        email: 'admin@gmail.com',
        role: Role.Employee,
        name: 'Admin Name Test',
      },
    };

    renderWithAuthProvider(<Employee />, state);
    expect(
      screen.queryByRole('button', { name: /delete/i })
    ).not.toBeInTheDocument();
  });
});
