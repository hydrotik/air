import React from 'react';
import { colorSwatchStyle } from './ColorSwatch.css';

export interface ColorSwatchProps {
  /** CSS hex color value */
  hex: string;
  /** Color name for accessibility */
  name?: string;
  /** Whether this swatch is currently selected */
  isSelected?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Shape variant */
  shape?: 'square' | 'circle';
  /** Disabled state */
  disabled?: boolean;
  /** Click handler */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Optional link (renders as anchor) */
  href?: string;
  className?: string;
}

const ColorSwatch = React.forwardRef<HTMLButtonElement, ColorSwatchProps>(
  (
    {
      hex,
      name,
      isSelected = false,
      size = 'md',
      shape = 'square',
      disabled = false,
      onClick,
      href,
      className,
    },
    ref
  ) => {
    const classes = `${colorSwatchStyle({ selected: isSelected, size, shape, disabled })} ${className ?? ''}`;

    if (href) {
      return (
        <a
          href={href}
          className={classes}
          aria-label={name}
          title={name}
          style={{ backgroundColor: hex }}
        />
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={classes}
        aria-label={name}
        aria-pressed={isSelected}
        title={name}
        style={{ backgroundColor: hex }}
      />
    );
  }
);

ColorSwatch.displayName = 'ColorSwatch';

export { ColorSwatch };
export default ColorSwatch;
