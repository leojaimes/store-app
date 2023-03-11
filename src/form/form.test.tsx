import { describe, it } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Form } from './form';

const server = setupServer(
  rest.post('/products', (req, res, ctx) => {
    return res(ctx.status(201));
  })
);

// Enable request interception.
beforeAll(() => server.listen());

// Reset handlers so that each test could alter them
// without affecting other, unrelated tests.
// afterEach(() => server.resetHandlers());

// Don't forget to clean up afterwards.
afterAll(() => server.close());

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

    // expect(screen.getByText(/electronic/i)).toBeInTheDocument();
    // expect(screen.getByText(/furniture/i)).toBeInTheDocument();
    // expect(screen.getByText(/clothing/i)).toBeInTheDocument();
  });

  it('should show electronic, furniture and clothing when dropdown will be shown ', () => {
    // fireEvent.mouseDown(getByRole(screen.getByTestId('type'), 'button'));
    // screen.getByRole('listbox');
    // expect(
    //   screen.getByRole('option', { name: /electronic/i })
    // ).toBeInTheDocument();
    // expect(
    //   screen.getByRole('option', { name: /furniture/i })
    // ).toBeInTheDocument();
    // expect(
    //   screen.getByRole('option', { name: /clothing/i })
    // ).toBeInTheDocument();
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
  it.only('it should the submit button be disabled until the request is done', async () => {
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).not.toBeDisabled();
    fireEvent.click(submitButton);
    expect(submitButton).toBeDisabled();
    await waitFor(() => expect(submitButton).not.toBeDisabled());
  });
});
