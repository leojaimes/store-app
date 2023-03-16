import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';
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
  const searchClick = () => {
    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);
  };
  it('the search button should be disabled until the search is done', async () => {
    const searchButton = screen.getByRole('button', { name: /search/i });
    expect(searchButton).not.toBeDisabled();
    searchClick();
    expect(searchButton).toBeDisabled();

    await waitFor(() => expect(searchButton).not.toBeDisabled());
  });
  it('the data should be displayed as a sticky table', async () => {
    searchClick();
    await waitFor(() =>
      expect(
        screen.queryByText(
          /Please provide a search option and click in the search button/i
        )
      ).not.toBeInTheDocument()
    );
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('The header table should contain: Repository, stars, forks, open issues and updated at', async () => {
    searchClick();
    const table = await screen.findByRole('table');
    const tableHeaders = within(table).getAllByRole('columnheader');
    expect(tableHeaders).toHaveLength(5);

    const [repository, stars, forks, openIssues, updatedAt] = tableHeaders;

    expect(repository).toHaveTextContent(/repository/i);
    expect(stars).toHaveTextContent(/stars/i);
    expect(forks).toHaveTextContent(/forks/i);
    expect(openIssues).toHaveTextContent(/open issues/i);
    expect(updatedAt).toHaveTextContent(/updated at/i);
  });

  it(`each table result must containt owner avatar image, name, stars, updated at, forks
    It should have a link that opens in a new tab  
  `, async () => {
    searchClick();
    const table = await screen.findByRole('table');

    const withinTable = within(table);
    const tableCells = withinTable.getAllByRole('cell');

    const [repository, stars, forks, openIssues, updatedAt] = tableCells;

    expect(within(repository).getAllByRole('img', { name: /test/i }));
    expect(tableCells).toHaveLength(5);

    expect(repository).toHaveTextContent(/test/);
    expect(stars).toHaveTextContent(/10/);
    expect(forks).toHaveTextContent(/5/);
    expect(openIssues).toHaveTextContent(/2/);
    expect(updatedAt).toHaveTextContent(/2020-01-01/);

    expect(withinTable.getByText(/test/i).closest('a')).toHaveAttribute(
      'href',
      'http://localhost:3000/test'
    );
    expect(within(repository).getByRole('link')).toHaveAttribute(
      'href',
      'http://localhost:3000/test'
    );
  });
});
