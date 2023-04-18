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

export const renderWithRouter = (ui: JSX.Element, { url = '/' } = {}) => {
  window.history.pushState({}, 'title', url);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Router }),
  };
};
