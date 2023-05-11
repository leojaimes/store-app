import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RenderReactQueryWrapper } from './mocks/render-with-provider';
import { LoginPage } from './pages/login-page/LoginPage';
import App from './App';

describe('App', () => {
  it('it should render the login page', () => {
    RenderReactQueryWrapper({ children: <App /> });
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /login page/i
    );
  });
  it('Renders not found if invalid path', () => {
    // render(
    //     <MemoryRouter initialEntries={['/this-route-does-not-exist']}>
    //         <App />
    //     </MemoryRouter>
    // );
    // expect(
    //     screen.getByRole('heading', {
    //         level: 1,
    //     })
    // ).toHaveTextContent('Not Found');
  });
});
