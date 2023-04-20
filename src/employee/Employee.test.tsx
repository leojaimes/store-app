import { render, screen, fireEvent } from '@testing-library/react';
import { Employee } from './Employee';
import {
  renderWithAuthProvider,
  renderWithAuthProviderRouter,
} from '../utils/tests';
import { AppRouter } from '../router/app-router';
import { AuthState } from '../contexts/auth/auth-state';
import { Role } from '../const/roles';

describe('when the admin page is mounted ', () => {
  it('must display the admin user name', async () => {
    const state: AuthState = {
      isUserAuth: true,
      user: {
        email: 'admin@gmail.com',
        role: Role.Employee,
        name: 'User Name Test',
      },
    };

    renderWithAuthProvider(<Employee />, state);
    expect(screen.getByText(/User Name Test/i)).toBeInTheDocument();
  });
});
