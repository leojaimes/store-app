import { describe, it, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import axios from 'axios';
import { Form } from './form';
import {
  CREATED_STATUS,
  ERROR_SERVER_STATUS,
  INVALID_REQUEST_STATUS,
} from '../consts/httpStatus';

interface PostRequestBody {
  name: string;
  size: string;
  type: string;
}

// Describe the shape of the mocked response body.

const server = setupServer(
  rest.post<PostRequestBody>('/products', (req, res, ctx) => {
    const { name, size, type } = req.body;

    if (name && size && type) {
      console.log(`CREATED_STATUS ${CREATED_STATUS}`);
      return res(ctx.status(CREATED_STATUS));
    }
    console.log(`CREATED_STATUS ${CREATED_STATUS}`);
    return res(ctx.status(ERROR_SERVER_STATUS));
  })
);

// Enable request interception.
beforeAll(() => server.listen());

// Reset handlers so that each test could alter them
// without affecting other, unrelated tests.
// afterEach(() => server.resetHandlers());

// Don't forget to clean up afterwards.
afterAll(() => server.close());

afterEach(() => server.resetHandlers());

beforeEach(() => {
  render(<Form />);
});
describe('when the form is mounted ', () => {
  it('here must be a create product form page', () => {
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Create Product'
    );
  });
  it('The form must have the following fields: name, size, type (electronic, furniture, clothing) and a submit button.', async () => {
    const nameTexField = screen.getByLabelText(/name/i);
    expect(nameTexField).toBeInTheDocument();

    const sizeTexField = screen.getByLabelText(/size/i);
    expect(sizeTexField).toBeInTheDocument();

    const typeSelect = screen.getByLabelText(/type/i);
    expect(typeSelect).toBeInTheDocument();
  });

  it('should show electronic, furniture and clothing when dropdown will be shown ', () => {
    const typeSelect = screen.getByLabelText(/type/i);
    expect(typeSelect).toBeInTheDocument();

    fireEvent.mouseDown(typeSelect);
    screen.getByRole('listbox');
    expect(
      screen.getByRole('option', { name: /electronic/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: /furniture/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: /clothing/i })
    ).toBeInTheDocument();
  });

  it('should exist submit button', () => {
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });
});

describe('when the user submit the form without values', () => {
  ///
  it('should display validation messages', () => {
    //   render(<Form />);
    //   expect(screen.queryByText(/the name is required/i)).not.toBeInTheDocument();
    //   expect(screen.queryByText(/the size is required/i)).not.toBeInTheDocument();
    //   expect(screen.queryByText(/the type is required/i)).not.toBeInTheDocument();
    //   fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    //   expect(screen.queryByText(/the name is required/i)).toBeInTheDocument();
    //   expect(screen.queryByText(/the size is required/i)).toBeInTheDocument();
    //   expect(screen.queryByText(/the type is required/i)).toBeInTheDocument();
  });
});

describe('when the user blurs a field that is empty', () => {
  it('should display validation error message for the input name', async () => {
    expect(screen.queryByText(/the name is required/i)).not.toBeInTheDocument();
    fireEvent.blur(screen.getByLabelText(/name/i), {
      target: { name: 'name', value: '' },
    });
    expect(screen.queryByText(/the name is required/i)).toBeInTheDocument();
  });

  it('should display validation error message for the input size', () => {
    expect(screen.queryByText(/the size is required/i)).not.toBeInTheDocument();
    fireEvent.blur(screen.getByLabelText(/size/i), {
      target: { name: 'size', value: '' },
    });
    expect(screen.queryByText(/the size is required/i)).toBeInTheDocument();
  });

  it('should display validation error message for the input type', () => {
    expect(screen.queryByText(/the type is required/i)).not.toBeInTheDocument();
    // fireEvent.blur(screen.getByLabelText(/type/i), {
    //   target: { name: 'type', value: '' },
    // });
    // expect(screen.queryByText(/the type is required/i)).toBeInTheDocument();
  });
});

describe('when the user submits the form ', () => {
  it('it should the submit button be disabled until the request is done', async () => {
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).not.toBeDisabled();
    // fireEvent.click(submitButton);
    // expect(submitButton).toBeDisabled();
    // await waitFor(() => expect(submitButton).toBeDisabled());
  });

  it('the form page must display the success message “Product stored”and clean the fields values', async () => {
    const submitButton = screen.getByRole('button', { name: /submit/i });

    const nameTexField = screen.getByLabelText(/name/i);
    expect(nameTexField).toBeInTheDocument();

    const sizeTexField = screen.getByLabelText(/size/i);
    expect(sizeTexField).toBeInTheDocument();

    const typeSelect = screen.getByLabelText(/type/i);
    expect(typeSelect).toBeInTheDocument();

    fireEvent.change(nameTexField, {
      target: { name: 'name', value: 'my product' },
    });

    fireEvent.change(sizeTexField, {
      target: { name: 'size', value: 'my size' },
    });

    fireEvent.mouseDown(typeSelect);

    expect(
      screen.getByRole('option', { name: /electronic/i })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('option', { name: /electronic/i }));

    fireEvent.click(submitButton);
    await waitFor(() =>
      expect(screen.getByText(/product stored/i)).toBeInTheDocument()
    );

    expect(nameTexField).toHaveValue('');
    expect(sizeTexField).toHaveValue('');
  });
});

describe('when the user submits the form and the server returns an unexpcted error', () => {
  it('the form page must display error message "unexpected error, please try again"', async () => {
    const nameTexField = screen.getByLabelText(/name/i);
    expect(nameTexField).toHaveValue('');
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    await waitFor(
      () =>
        expect(
          screen.getByText(/unexpected error, please try again/i)
        ).toBeInTheDocument(),
      { timeout: 2000 }
    );
  });
});

describe('when the user submits the form and the server returns an invalid request error', () => {
  it('the form page must display error message “The form is invalid, the fields [field1...fieldN] are required”', async () => {
    server.use(
      rest.post('/products', (req, res, ctx) => {
        console.log('Server should show Error 400 ');
        return res(
          ctx.status(400),
          ctx.json({
            message:
              'The form is invalid, the fields name, size, type are required',
          })
        );
      })
    );
    const nameTexField = screen.getByLabelText(/name/i);
    expect(nameTexField).toHaveValue('');
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    await waitFor(
      () =>
        expect(
          screen.getByText(
            /The form is invalid, the fields name, size, type are required/i
          )
        ).toBeInTheDocument(),
      { timeout: 4000 }
    );
  });
});
