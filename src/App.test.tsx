import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RenderReactQueryWrapper } from './mocks/render-with-provider';

import App from './App';

describe('App', () => {
  it('it should render the login page', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /login page/i
    );
  });
});
