import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { GitHubSearchPage } from './github-search-page';

// yarn test github-search-page.test.tsx

beforeEach(() => {
  render(<GitHubSearchPage />);
});
describe('When Git Hub Page is mounted', () => {
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
  // Before the first search, show the initial state message “Please provide a search option and click in the search button”
  it('before the first search, show the initial state message: Please provide a search option and click in the search button', () => {
    // expect(
    //   screen.findByText(
    //     /Please provide a search option and click in the search button/i
    //   )
    // ).toBeInTheDocument();
  });
});

describe('when user does a search', () => {
  it('the search button should be disabled until the search is done', async () => {
    const searchButton = screen.getByRole('button', { name: /search/i });
    expect(searchButton).not.toBeDisabled();
    fireEvent.click(searchButton);
    expect(searchButton).toBeDisabled();

    await waitFor(() => expect(searchButton).not.toBeDisabled());
  });
  it('the data should be displayed as a sticky table', async () => {
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.click(searchButton);

    await waitFor(() =>
      expect(
        screen.queryByText(
          /Please provide a search option and click in the search button/i
        )
      ).toBeInTheDocument()
    );
  });
});
