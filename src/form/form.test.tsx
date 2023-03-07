import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Form } from './form';

describe('when the form is mounted ', () => {
  it('here must be a create product form page', () => {
    ///
    render(<Form />);
    screen.debug();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});
