import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { GitHubSearchPage } from './github-search-page';

describe('Git Hub Page', () => {
  it.only('should display title', () => {
    render(<GitHubSearchPage />);
    expect(
      screen.getByRole('heading', { name: /github repositories list/i })
    ).toBeInTheDocument();
  });
});
