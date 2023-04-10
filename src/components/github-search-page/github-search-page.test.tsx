import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { OK_STATUS } from '../../consts/httpStatus';
import { getExampleGithubResult } from '../../types/github/data/responses';
import { GitHubSearchPage } from './github-search-page';
import { handlerPaginated } from '../../__fixtures__/handlers';
import {
  makeFakeResponse,
  getReposListBy,
  getReposPerPage,
} from '../../__fixtures__/repos';

const url = '';
const fakeRepo = getExampleGithubResult.items[0];
const server = setupServer(
  rest.get(`${url}/search/repositories`, (req, res, ctx) => {
    return res(ctx.status(OK_STATUS), ctx.json(getExampleGithubResult));
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
const searchClick = () => {
  const searchButton = screen.getByRole('button', { name: /search/i });
  fireEvent.click(searchButton);
};
describe('when user does a search', () => {
  it('the search button should be disabled until the search is done', async () => {
    const searchButton = screen.getByRole('button', { name: /search/i });
    const input = screen.getByLabelText(/filter by/i);
    fireEvent.change(input, { target: { value: 'test' } });

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
    expect(repository).toHaveTextContent(fakeRepo.name);

    const avatarImage = within(repository).getByRole('img', {
      name: fakeRepo.name,
    });
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute('src', fakeRepo.owner.avatar_url);
    expect(stars).toHaveTextContent(`${fakeRepo.stargazers_count}`);
    expect(forks).toHaveTextContent(`${fakeRepo.forks}`);
    expect(openIssues).toHaveTextContent(`${fakeRepo.open_issues}`);
    expect(updatedAt).toHaveTextContent(
      `${fakeRepo.updated_at.toLocaleDateString()}`
    );

    expect(withinTable.getByText(fakeRepo.name).closest('a')).toHaveAttribute(
      'href',
      fakeRepo.html_url
    );
    expect(within(repository).getByRole('link')).toHaveAttribute(
      'href',
      fakeRepo.html_url
    );
  });

  it(`must display total results number of the search and the current number of results.  Example: 1-10 of 100`, async () => {
    //
    searchClick();
    await screen.findByRole('table');
    // expect(screen.getByText(/1–30 of 1000/i)).toBeInTheDocument(); // REVISAR
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
  it('must show a empty state message: Your search has no results', async () => {
    // set the mock ser no items
    server.use(
      rest.get(`${url}/search/repositories`, (req, res, ctx) => {
        return res(
          ctx.status(OK_STATUS),
          ctx.json({
            total_count: 0,
            incomplete_results: false,
            items: [],
          })
        );
      })
    );
    // click on search
    searchClick();
    // expect not table
    // expect message no results

    await waitFor(() =>
      expect(
        screen.getByText(/Your search has no results/i)
      ).toBeInTheDocument()
    );
    expect(screen.queryByRole('table')).not.toBeInTheDocument(); // query si no encuentra el elemento no va a hacer que el query se detenga
  });
});

describe('when the developer types or filter by and does a search', () => {
  it('must display the related repos', async () => {
    const searchBy = 'laravel';
    const expectedData = getReposListBy({ name: searchBy })[0];

    // setup mock server
    server.use(
      rest.get(`/search/repositories`, (req, res, ctx) => {
        const fakeResponse = makeFakeResponse();
        const q = req.url.searchParams.get('q');
        const items = getReposListBy({ name: q });
        const newResponse = { ...fakeResponse, items };

        return res(ctx.status(OK_STATUS), ctx.json(newResponse));
      })
    );
    // type for a word in filter by input
    fireEvent.change(screen.getByLabelText(/filter by/i), {
      target: { value: searchBy },
    });
    // click on search
    searchClick();
    // expect the table content
    const table = await screen.findByRole('table');
    expect(table).toBeInTheDocument();

    const withinTable = within(table);
    const tableCells = withinTable.getAllByRole('cell');

    const [repository] = tableCells;

    expect(tableCells).toHaveLength(5);
    expect(repository).toHaveTextContent(expectedData.name);
  });
});

describe('when the developer does a search and select 50 rows per page', () => {
  it('must fetch a new search and display 50 rows results on the table', async () => {
    // config mock server response

    server.use(rest.get(`/search/repositories`, handlerPaginated));

    // click search
    searchClick();

    const table = await screen.findByRole('table');
    expect(table).toBeInTheDocument();
    // expect 30 per page
    expect(await screen.findAllByRole('row')).toHaveLength(31);
    fireEvent.mouseDown(screen.getByLabelText(/rows per page/i));
    // // select 50 per page
    fireEvent.click(screen.getByRole('option', { name: '50' }));
    await waitFor(
      () =>
        expect(
          screen.getByRole('button', { name: /search/i })
        ).not.toBeDisabled(),
      { timeout: 3000 }
    );
    // expect 50 rows lenght
    expect(screen.getAllByRole('row')).toHaveLength(51);
  });
});

describe('when the developer does a search and then on next page button', () => {
  it('must display the next repositories page', async () => {
    server.use(rest.get(`/search/repositories`, handlerPaginated));

    searchClick();

    const table = await screen.findByRole('table');
    expect(table).toBeInTheDocument();

    expect(screen.getByRole('cell', { name: /1-0/i })).toBeInTheDocument();

    const nextButton = screen.getByRole('button', { name: /next page/i });

    expect(nextButton).not.toBeDisabled();

    fireEvent.click(nextButton);

    const searchButton = screen.getByRole('button', { name: /search/i });

    expect(searchButton).toBeDisabled();

    await waitFor(
      () =>
        expect(
          screen.getByRole('button', { name: /search/i })
        ).not.toBeDisabled(),
      { timeout: 3000 }
    );

    expect(screen.getByRole('cell', { name: /2-0/i })).toBeInTheDocument();
  });
});

describe('when the developer does a search and then on next page button and then on previous page button', () => {
  it('must display the previous repositories page', async () => {
    server.use(rest.get(`/search/repositories`, handlerPaginated));

    searchClick();

    const table = await screen.findByRole('table');
    expect(table).toBeInTheDocument();

    expect(screen.getByRole('cell', { name: /1-0/i })).toBeInTheDocument();

    const nextButton = screen.getByRole('button', { name: /next page/i });

    expect(nextButton).not.toBeDisabled();

    fireEvent.click(nextButton);

    const searchButton = screen.getByRole('button', { name: /search/i });

    expect(searchButton).toBeDisabled();

    await waitFor(
      () =>
        expect(
          screen.getByRole('button', { name: /search/i })
        ).not.toBeDisabled(),
      { timeout: 3000 }
    );

    expect(screen.getByRole('cell', { name: /2-0/i })).toBeInTheDocument();

    const previousButton = screen.getByRole('button', {
      name: /previous page/i,
    });

    expect(previousButton).not.toBeDisabled();
    fireEvent.click(previousButton);

    await waitFor(
      () =>
        expect(
          screen.getByRole('button', { name: /search/i })
        ).not.toBeDisabled(),
      { timeout: 3000 }
    );

    expect(screen.getByRole('cell', { name: /1-0/i })).toBeInTheDocument();

    // expect(previousButton).not.toBeDisabled();
  });
});
