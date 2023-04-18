import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import App from '../App';
import { AppRouter } from './app-router';

const renderWithRouter = (ui: JSX.Element, { url = '/' } = {}) => {
  window.history.pushState({}, 'title', url);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Router }),
  };
};

describe('when the user is not authenticated and enters on admin page', () => {
  it('must redirect to login page', async () => {
    const url = '/admin';
    renderWithRouter(<AppRouter />, { url });
    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });
});

describe('when the user is not authenticated and enters on employee page', () => {
  it('must redirect to login page', () => {});
});
