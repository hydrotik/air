import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ColorSwatch } from './ColorSwatch';

expect.extend(toHaveNoViolations);

describe('ColorSwatch', () => {
  it('renders a button with the color as background', () => {
    render(<ColorSwatch hex="#ff0000" name="Red" />);
    const button = screen.getByRole('button', { name: /red/i });
    expect(button).toBeInTheDocument();
  });

  it('shows selected state via aria-pressed', () => {
    render(<ColorSwatch hex="#0000ff" name="Blue" isSelected />);
    expect(screen.getByRole('button', { name: /blue/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('shows unselected state via aria-pressed', () => {
    render(<ColorSwatch hex="#0000ff" name="Blue" isSelected={false} />);
    expect(screen.getByRole('button', { name: /blue/i })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('fires onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<ColorSwatch hex="#00ff00" name="Green" onClick={onClick} />);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire onClick when disabled', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<ColorSwatch hex="#000" name="Black" disabled onClick={onClick} />);
    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders disabled state', () => {
    render(<ColorSwatch hex="#000" name="Black" disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it.each(['sm', 'md', 'lg'] as const)('renders size=%s', (size) => {
    render(<ColorSwatch hex="#fff" name="White" size={size} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it.each(['square', 'circle'] as const)('renders shape=%s', (shape) => {
    render(<ColorSwatch hex="#fff" name="White" shape={shape} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('forwards className', () => {
    render(<ColorSwatch hex="#fff" name="White" className="custom" />);
    expect(screen.getByRole('button')).toHaveClass('custom');
  });

  it('has no a11y violations', async () => {
    const { container } = render(<ColorSwatch hex="#ff0000" name="Red" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
