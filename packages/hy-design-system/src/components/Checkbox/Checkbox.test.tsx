import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Checkbox } from './Checkbox';

expect.extend(toHaveNoViolations);

describe('Checkbox', () => {
  it('renders as a checkbox role', () => {
    render(<Checkbox aria-label="Accept" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('toggles on click', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Checkbox aria-label="Accept" onCheckedChange={onChange} />);
    await user.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('respects disabled state', () => {
    render(<Checkbox aria-label="Accept" disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('has no a11y violations', async () => {
    const { container } = render(<Checkbox aria-label="Accept terms" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
