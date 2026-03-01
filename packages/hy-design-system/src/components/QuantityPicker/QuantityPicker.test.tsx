import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { QuantityPicker } from './QuantityPicker';

expect.extend(toHaveNoViolations);

const defaultProps = {
  quantity: 3,
  onIncrease: jest.fn(),
  onDecrease: jest.fn(),
};

describe('QuantityPicker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with quantity display', () => {
    render(<QuantityPicker {...defaultProps} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('has a group role', () => {
    render(<QuantityPicker {...defaultProps} />);
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  it('calls onIncrease when + button is clicked', async () => {
    const user = userEvent.setup();
    const onIncrease = jest.fn();
    render(<QuantityPicker {...defaultProps} onIncrease={onIncrease} />);
    await user.click(screen.getByRole('button', { name: /increase/i }));
    expect(onIncrease).toHaveBeenCalledTimes(1);
  });

  it('calls onDecrease when − button is clicked', async () => {
    const user = userEvent.setup();
    const onDecrease = jest.fn();
    render(<QuantityPicker {...defaultProps} onDecrease={onDecrease} />);
    await user.click(screen.getByRole('button', { name: /decrease/i }));
    expect(onDecrease).toHaveBeenCalledTimes(1);
  });

  it('disables decrease button at min', () => {
    render(<QuantityPicker {...defaultProps} quantity={1} min={1} />);
    expect(screen.getByRole('button', { name: /decrease/i })).toBeDisabled();
  });

  it('disables increase button at max', () => {
    render(<QuantityPicker {...defaultProps} quantity={10} max={10} />);
    expect(screen.getByRole('button', { name: /increase/i })).toBeDisabled();
  });

  it('enables both buttons when within range', () => {
    render(<QuantityPicker {...defaultProps} quantity={5} min={1} max={10} />);
    expect(screen.getByRole('button', { name: /decrease/i })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: /increase/i })).not.toBeDisabled();
  });

  it.each(['sm', 'md', 'lg'] as const)('renders size=%s', (size) => {
    render(<QuantityPicker {...defaultProps} size={size} />);
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  it('forwards className', () => {
    render(<QuantityPicker {...defaultProps} className="custom" />);
    expect(screen.getByRole('group')).toHaveClass('custom');
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <QuantityPicker {...defaultProps} quantity={2} min={1} max={10} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
