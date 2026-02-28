import React from 'react';
import { flagTagRecipe, flagTagIcon, flagTagLabel } from './FlagTag.css';
import type { FlagTagVariants } from './FlagTag.css';

export interface FlagTagProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>,
    NonNullable<FlagTagVariants> {
  /**
   * Icon element or string (emoji). Defaults to "⚠".
   * Can also pass a Lucide icon: `<Icons.AlertTriangle size={14} />`
   */
  icon?: React.ReactNode;

  /**
   * Label text. Defaults to "FLAG".
   */
  label?: string;

  /**
   * Left margin from preceding content. Useful when placed inline
   * after names or values. Defaults to '8px'.
   */
  marginLeft?: string | number;
}

/**
 * FlagTag — Minimal inline status flag for forensic/editorial contexts.
 *
 * Renders an icon + label in a status color with no background or border.
 * Monospace font with letter-spacing for data-dense environments.
 *
 * @example
 * ```tsx
 * // Default destructive flag
 * <FlagTag />
 *
 * // Custom label + warning variant
 * <FlagTag variant="warning" label="REVIEW" icon="🔍" />
 *
 * // With Lucide icon
 * <FlagTag icon={<Icons.AlertTriangle size={14} />} label="FLAGGED" />
 *
 * // Inline after a name
 * <span>Belen Blackstone <FlagTag marginLeft="8px" /></span>
 * ```
 */
export const FlagTag = React.forwardRef<HTMLSpanElement, FlagTagProps>(
  (
    {
      variant = 'destructive',
      size = 'sm',
      icon = '⚠',
      label = 'FLAG',
      marginLeft = '8px',
      className,
      style,
      ...props
    },
    ref,
  ) => (
    <span
      ref={ref}
      data-flag-size={size}
      className={[flagTagRecipe({ variant, size }), className]
        .filter(Boolean)
        .join(' ')}
      style={{ marginLeft, ...style }}
      {...props}
    >
      <span className={flagTagIcon}>{icon}</span>
      <span className={flagTagLabel}>{label}</span>
    </span>
  ),
);

FlagTag.displayName = 'FlagTag';
