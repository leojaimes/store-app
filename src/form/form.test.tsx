import { describe, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Form } from './form';

describe('when the form is mounted ', () => {
  it('here must be a create product form page', () => {
    ///
    render(<Form />);
    // screen.debug();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Create Product'
    );
  });
  it('The form must have the following fields: name, size, type (electronic, furniture, clothing) and a submit button.', async () => {
    render(<Form />);
    const nameTexField = screen.getByLabelText(/name/i);
    expect(nameTexField).toBeInTheDocument();

    const sizeTexField = screen.getByLabelText(/size/i);
    expect(sizeTexField).toBeInTheDocument();

    const typeSelect = screen.getByLabelText(/type/i);
    expect(typeSelect).toBeInTheDocument();

    expect(screen.getByText(/electronic/i)).toBeInTheDocument();
    expect(screen.getByText(/furniture/i)).toBeInTheDocument();
    expect(screen.getByText(/clothing/i)).toBeInTheDocument();
    screen.debug();
    // const typeButtonSelect = screen.getByRole('button', { name: /type/i });
    // expect(typeButtonSelect).toBeInTheDocument();
    // fireEvent.click(typeButtonSelect);

    // expect(await screen.findByText(/electronic/i)).toBeInTheDocument();
    // screen.debug();
  });
});
