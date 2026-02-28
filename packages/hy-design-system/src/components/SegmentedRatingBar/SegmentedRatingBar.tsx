import React from 'react';
import { segmentedRatingBarRecipe, segmentBase } from './SegmentedRatingBar.css';
import type { SegmentedRatingBarVariants } from './SegmentedRatingBar.css';

export interface SegmentedRatingBarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    NonNullable<SegmentedRatingBarVariants> {
  /**
   * Array of booleans — each entry is one segment.
   * `true` = lit (filled), `false` = dim (background).
   * Length determines total segment count (typically 10).
   */
  sources: boolean[];

  /**
   * Alternatively, pass a numeric value + total to auto-generate.
   * If `sources` is provided, these are ignored.
   */
  value?: number;
  total?: number;
}

/**
 * SegmentedRatingBar — A segmented bar graph showing coverage across data sources.
 *
 * Each segment is either "lit" (present in source) or "dim" (absent).
 * Segments are flush with no gaps, forming a continuous bar.
 *
 * @example
 * ```tsx
 * // Boolean array mode (explicit control per segment)
 * <SegmentedRatingBar sources={[true, true, false, true, false, false, true, false, false, false]} />
 *
 * // Numeric mode (auto-fill left-to-right)
 * <SegmentedRatingBar value={4} total={10} />
 *
 * // Custom color + size
 * <SegmentedRatingBar sources={data} color="primary" size="md" />
 * ```
 */
export const SegmentedRatingBar = React.forwardRef<HTMLDivElement, SegmentedRatingBarProps>(
  (
    {
      sources,
      value,
      total = 10,
      size = 'sm',
      color = 'chart2',
      className,
      ...props
    },
    ref,
  ) => {
    // Build segment array from either sources or value/total
    const segments: boolean[] =
      sources ??
      Array.from({ length: total }, (_, i) => i < (value ?? 0));

    return (
      <div
        ref={ref}
        role="meter"
        aria-label="Source coverage"
        aria-valuenow={segments.filter(Boolean).length}
        aria-valuemin={0}
        aria-valuemax={segments.length}
        data-rating-size={size}
        data-rating-color={color}
        className={[segmentedRatingBarRecipe({ size, color }), className]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {segments.map((lit, i) => (
          <span
            key={i}
            className={segmentBase}
            data-lit={String(lit)}
          />
        ))}
      </div>
    );
  },
);

SegmentedRatingBar.displayName = 'SegmentedRatingBar';
