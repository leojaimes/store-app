import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { AppRouter } from './app-router';
import { renderWithRouter } from '../utils/tests';

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
    screen.debug();
    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });
});
