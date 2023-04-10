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

const original = window.location;

const reloadFn = () => {
  window.location.reload();
};

beforeAll(() => {
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: { reload: vitest.fn() },
  });
});

afterAll(() => {
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: original,
  });
});

function ThrowError() {
  throw new Error('ups');
  return (
    <>
      <div />
      <div />
    </>
  );
}

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
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(
      screen.getByText(/There is an unexpected error/)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reload/i })).toBeInTheDocument();
  });
});

describe('when the user clicks on reload button', () => {
  it('must reload the app', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByRole('button', { name: /reload/i }));
    // expect(vitest.isMockFunction(window.location.reload)).toBe(true);
    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });
});
