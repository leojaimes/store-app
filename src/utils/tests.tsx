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
import { AuthContext } from '../contexts/auth/auth-context';
import { IUser } from '../common/entities';
import { AuthState } from '../contexts/auth/auth-state';

export const renderWithRouter = (ui: JSX.Element, { url = '/' } = {}) => {
  window.history.pushState({}, 'title', url);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Router }),
  };
};

export const renderWithAuthProvider = (ui: JSX.Element, state: AuthState) => {
  return {
    user: userEvent.setup(),
    ...render(
      <AuthContext.Provider
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        value={{ ...state, onSuccessLogin: () => {} }}
      >
        {ui}
      </AuthContext.Provider>
    ),
  };
};

export const renderWithAuthProviderRouter = (
  ui: JSX.Element,
  state: AuthState,
  { url = '/' } = {}
) => {
  window.history.pushState({}, 'title', url);

  return {
    user: userEvent.setup(),
    ...render(
      <AuthContext.Provider
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        value={{ ...state, onSuccessLogin: () => {} }}
      >
        {ui}
      </AuthContext.Provider>,
      { wrapper: Router }
    ),
  };
};
