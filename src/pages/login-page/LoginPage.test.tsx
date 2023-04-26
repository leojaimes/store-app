import { screen, render } from '@testing-library/react';
import { LoginPage } from './LoginPage';

describe('when login page is mounted', () => {
  it('should be show login title', () => {
    render(<LoginPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /login page/i
    );
  });
});
