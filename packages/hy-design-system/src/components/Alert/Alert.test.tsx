import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Alert, AlertTitle, AlertDescription } from './Alert';

expect.extend(toHaveNoViolations);

describe('Alert', () => {
  it('renders with role="alert"', () => {
    render(<Alert>Message</Alert>);
    expect(screen.getByRole('alert')).toHaveTextContent('Message');
  });

  it.each(['default', 'destructive'] as const)('renders variant=%s', (variant) => {
    render(<Alert variant={variant}>Text</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(<Alert icon={<span data-testid="icon">!</span>}>With icon</Alert>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders title and description', () => {
    render(
      <Alert>
        <AlertTitle>Title</AlertTitle>
        <AlertDescription>Description</AlertDescription>
      </Alert>,
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <Alert>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Something happened.</AlertDescription>
      </Alert>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
