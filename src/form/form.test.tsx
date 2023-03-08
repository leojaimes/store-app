import { describe, it } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  getByRole,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Form } from './form';

describe('when the form is mounted ', () => {
  beforeEach(() => {
    render(<Form />);
  });
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
    fireEvent.mouseDown(getByRole(screen.getByTestId('type'), 'button'));
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
  it.only('should display validation messages', () => {
    render(<Form />);
    expect(screen.queryByText(/the name is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/the size is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/the type is required/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(screen.queryByText(/the name is required/i)).toBeInTheDocument();
    expect(screen.queryByText(/the size is required/i)).toBeInTheDocument();
    expect(screen.queryByText(/the type is required/i)).toBeInTheDocument();
  });
});
