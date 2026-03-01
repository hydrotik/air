import React from 'react';
import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders with status role', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has accessible label', () => {
    render(<Spinner />);
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });

  it.each(['sm', 'md', 'lg'] as const)('renders size=%s', (size) => {
    render(<Spinner size={size} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
