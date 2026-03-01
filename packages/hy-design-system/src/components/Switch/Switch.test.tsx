import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Switch } from './Switch';

expect.extend(toHaveNoViolations);

describe('Switch', () => {
  it('renders as a switch role', () => {
    render(<Switch aria-label="Toggle" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('toggles on click', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Switch aria-label="Toggle" onCheckedChange={onChange} />);
    await user.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('respects disabled state', () => {
    render(<Switch aria-label="Toggle" disabled />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('respects defaultChecked', () => {
    render(<Switch aria-label="Toggle" defaultChecked />);
    expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'checked');
  });

  it('has no a11y violations', async () => {
    const { container } = render(<Switch aria-label="Dark mode" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
