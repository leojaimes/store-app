import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { GitHubSearchPage } from './github-search-page';

describe('Git Hub Page', () => {
  beforeEach(() => {
    render(<GitHubSearchPage />);
  });
  it('should display title', () => {
    expect(
      screen.getByRole('heading', { name: /github repositories list/i })
    ).toBeInTheDocument();
  });

  it('should show a input text with label "filter by"', () => {
    expect(screen.getByLabelText(/filter by/)).toBeInTheDocument();
  });
  it('should show a button called search', () => {
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });
});
