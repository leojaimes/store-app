import { render, screen } from '@testing-library/react';
import { LoginPage } from './LoginPage';

describe('when loging page is mounted', () => {
  it('must display login title', () => {
    ///
    render(<LoginPage />);
    expect(
      screen.getByRole('heading', { name: /login page/i })
    ).toBeInTheDocument();
  });
});
