import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

describe('when the component works without errors', () => {
  render(<ErrorBoundary />);
  it('must render the component content', () => {});
});

describe('when the component throws errors', () => {
  render(<ErrorBoundary />);
  it('must render the message "There is an unexpeded error" and a reload button', () => {});
});

describe('when the user clicks on reload button', () => {
  render(<ErrorBoundary />);
  it('must reload the app', () => {});
});
