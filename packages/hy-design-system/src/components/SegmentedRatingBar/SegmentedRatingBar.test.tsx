import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { SegmentedRatingBar } from './SegmentedRatingBar';

expect.extend(toHaveNoViolations);

describe('SegmentedRatingBar', () => {
  it('renders with boolean array sources', () => {
    render(<SegmentedRatingBar sources={[true, true, false, false, false]} />);
    const meter = screen.getByRole('meter');
    expect(meter).toBeInTheDocument();
    expect(meter.children).toHaveLength(5);
  });

  it('renders with value/total numeric mode', () => {
    render(<SegmentedRatingBar value={3} total={10} sources={undefined as any} />);
    const meter = screen.getByRole('meter');
    expect(meter.children).toHaveLength(10);
  });

  it('sets aria-valuenow to lit segment count', () => {
    render(<SegmentedRatingBar sources={[true, true, true, false, false]} />);
    const meter = screen.getByRole('meter');
    expect(meter).toHaveAttribute('aria-valuenow', '3');
    expect(meter).toHaveAttribute('aria-valuemin', '0');
    expect(meter).toHaveAttribute('aria-valuemax', '5');
  });

  it('marks lit segments with data-lit="true"', () => {
    render(<SegmentedRatingBar sources={[true, false, true]} />);
    const segments = screen.getByRole('meter').children;
    expect(segments[0]).toHaveAttribute('data-lit', 'true');
    expect(segments[1]).toHaveAttribute('data-lit', 'false');
    expect(segments[2]).toHaveAttribute('data-lit', 'true');
  });

  it('sets data-rating-size and data-rating-color', () => {
    render(<SegmentedRatingBar sources={[true]} size="md" color="primary" />);
    const meter = screen.getByRole('meter');
    expect(meter).toHaveAttribute('data-rating-size', 'md');
    expect(meter).toHaveAttribute('data-rating-color', 'primary');
  });

  it.each(['xs', 'sm', 'md', 'lg'] as const)('renders size=%s', (size) => {
    render(<SegmentedRatingBar sources={[true, false]} size={size} />);
    expect(screen.getByRole('meter')).toHaveAttribute('data-rating-size', size);
  });

  it.each(['primary', 'chart1', 'chart2', 'destructive', 'success', 'warning'] as const)(
    'renders color=%s',
    (color) => {
      render(<SegmentedRatingBar sources={[true]} color={color} />);
      expect(screen.getByRole('meter')).toHaveAttribute('data-rating-color', color);
    },
  );

  it('defaults to total=10 in numeric mode', () => {
    render(<SegmentedRatingBar value={5} sources={undefined as any} />);
    expect(screen.getByRole('meter').children).toHaveLength(10);
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <SegmentedRatingBar sources={[true, true, false, false, false]} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
