import { render, screen, fireEvent, within } from '@testing-library/react';
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
        email: 'employee@gmail.com',
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

describe('when the Employee access to employee page ', () => {
  it('the employee user name should be displayed on the common navbar', async () => {
    const employeeName = 'Employee Name Test';
    const state: AuthState = {
      isUserAuth: true,
      user: {
        email: 'employee@gmail.com',
        role: Role.Employee,
        name: employeeName,
      },
    };

    renderWithAuthProviderRouter(<Employee />, state);
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();

    const {
      getByText: getByTextWithinHeader,
      getByRole: getByRoleWithinHeader,
    } = within(headerElement);

    // Utilizar los alias para seleccionar elementos dentro del headerElement
    expect(getByTextWithinHeader(employeeName)).toBeInTheDocument();

    screen.debug();
  });
});
