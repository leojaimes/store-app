/* eslint-disable import/no-extraneous-dependencies */

import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from './contexts/auth-context';

export const renderWithRouter = (ui: JSX.Element, { url = '/' } = {}) => {
  window.history.pushState({}, 'title', url);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Router }),
  };
};

export const renderWithAuthProvider = (
  ui: JSX.Element,
  { url = '/' } = {},
  auth = false
) => {
  window.history.pushState({}, 'title', url);

  return {
    user: userEvent.setup(),
    ...render(
      <AuthContext.Provider
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        value={{ isUserAuth: auth, onSuccessLogin: () => {} }}
      >
        {ui}
      </AuthContext.Provider>,
      { wrapper: Router }
    ),
  };
};
