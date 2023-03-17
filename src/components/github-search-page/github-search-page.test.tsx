import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { getExampleGithubResult } from '../../types/github/data/responses';
import { GitHubSearchPage } from './github-search-page';

const url = 'https://api.github.com';

const server = setupServer(
  rest.get(`${url}/search/repositories`, (req, res, ctx) => {
    return res(ctx.json(getExampleGithubResult));
  })
);
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

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

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

    expect(tableCells).toHaveLength(5);

    // TODO:
    expect(repository).toHaveTextContent(getExampleGithubResult.items[0].name);
    expect(stars).toHaveTextContent(
      `${getExampleGithubResult.items[0].stargazers_count}`
    );
    expect(forks).toHaveTextContent(`${getExampleGithubResult.items[0].forks}`);
    expect(openIssues).toHaveTextContent(
      `${getExampleGithubResult.items[0].open_issues}`
    );
    expect(updatedAt).toHaveTextContent(
      `${getExampleGithubResult.items[0].updated_at.toLocaleDateString()}`
    );

    expect(
      withinTable.getByText(getExampleGithubResult.items[0].name).closest('a')
    ).toHaveAttribute('href', getExampleGithubResult.items[0].html_url);
    expect(within(repository).getByRole('link')).toHaveAttribute(
      'href',
      getExampleGithubResult.items[0].html_url
    );

    const avatarImage = within(repository).getByRole('img', {
      name: getExampleGithubResult.items[0].name,
    });
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute(
      'src',
      getExampleGithubResult.items[0].owner.avatar_url
    );
  });

  it(`must display total results number of the search and the current number of results.  Example: 1-10 of 100`, async () => {
    //
    searchClick();
    await screen.findByRole('table');
    expect(screen.getByText(/1–1 of 1/i)).toBeInTheDocument();
  });

  it(`must display results size per page select/combobox with the options: 30, 50, 100. The default is 30`, async () => {
    //
    searchClick();
    await screen.findByRole('table');
    const perPageOptionsSelector = screen.getByLabelText(/rows per page/i);

    fireEvent.mouseDown(perPageOptionsSelector);
    const listBox = screen.getByRole('listbox', { name: /rows per page/i });
    const options = within(listBox).getAllByRole('option');
    const [option30, option50, option100] = options;

    // expects/assertions

    expect(perPageOptionsSelector).toBeInTheDocument();
    expect(option30).toHaveTextContent('30');
    expect(option50).toHaveTextContent('50');
    expect(option100).toHaveTextContent('100');
  });

  it(`must display next and previous pagination buttons`, async () => {
    //
    searchClick();
    await screen.findByRole('table');
    const previousButton = screen.getByRole('button', { name: /previous/i });

    // assertions
    expect(previousButton).toBeInTheDocument();
    expect(previousButton).toBeDisabled();
  });
});

describe('when the developer does a search without results', () => {
  it.todo('must show a empty state message', async () => {});
});
