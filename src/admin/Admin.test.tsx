import { render, screen, fireEvent } from '@testing-library/react';
import { Admin } from './Admin';
import { renderWithAuthProvider } from '../utils/tests';
import { AppRouter } from '../router/app-router';

describe('when the admin page is mounted ', () => {
  it('must display the admin user name', async () => {
    // render(<Admin />);
    // expect(screen.getByText(/user name/i)).toBeInTheDocument();
    // const url = '/admin';
    // renderWithAuthProvider(<AppRouter />, { url }, true);
    // expect(screen.getByText(/admin/i)).toBeInTheDocument();
  });
});
