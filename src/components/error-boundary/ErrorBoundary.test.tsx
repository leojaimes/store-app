import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';
import { vitest } from 'vitest';
import { ErrorBoundary } from './ErrorBoundary';

vitest.spyOn(console, 'error');

describe('when the component works without errors', () => {
  it('must render the component content', () => {
    render(
      <ErrorBoundary>
        <h1>Test Pass </h1>
      </ErrorBoundary>
    );
    expect(screen.getByText(/test pass/i)).toBeInTheDocument();
  });
});

describe('when the component throws errors', () => {
  it('must render the message "There is an unexpeded error" and a reload button', () => {
    function ThrowError() {
      throw new Error('ups');
      return (
        <>
          <div />
          <div />
        </>
      );
    }
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(
      screen.getByText(/There is an unexpected error/)
    ).toBeInTheDocument();
  });
});

describe('when the user clicks on reload button', () => {
  it('must reload the app', () => {});
});
