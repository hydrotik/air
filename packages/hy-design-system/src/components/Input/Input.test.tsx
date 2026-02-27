import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Input } from './Input';

expect.extend(toHaveNoViolations);

describe('Input', () => {
  it('renders an input element', () => {
    render(<Input placeholder="Enter value" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders a label when provided', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('renders helper message', () => {
    render(<Input message="Must be a valid email" />);
    expect(screen.getByText('Must be a valid email')).toBeInTheDocument();
  });

  it('marks input as invalid on error', () => {
    render(<Input error message="Required" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  it('is disabled when disabled prop is set', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('has no a11y violations', async () => {
    const { container } = render(<Input label="Name" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
