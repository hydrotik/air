import React from 'react';
import {
  quantityPickerRoot,
  quantityButton,
  quantityDisplay,
} from './QuantityPicker.css';

export interface QuantityPickerProps {
  /** Current quantity value */
  quantity: number;
  /** Called when increase button is clicked */
  onIncrease: () => void;
  /** Called when decrease button is clicked */
  onDecrease: () => void;
  /** Minimum allowed quantity */
  min?: number;
  /** Maximum allowed quantity */
  max?: number;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const QuantityPicker = React.forwardRef<HTMLDivElement, QuantityPickerProps>(
  (
    {
      quantity,
      onIncrease,
      onDecrease,
      min = 1,
      max = 99,
      size = 'md',
      className,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`${quantityPickerRoot({ size })} ${className ?? ''}`}
        role="group"
        aria-label="Quantity picker"
      >
        <button
          type="button"
          className={quantityButton}
          onClick={onDecrease}
          disabled={quantity <= min}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className={quantityDisplay({ size })} aria-live="polite">
          {quantity}
        </span>
        <button
          type="button"
          className={quantityButton}
          onClick={onIncrease}
          disabled={quantity >= max}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    );
  }
);

QuantityPicker.displayName = 'QuantityPicker';

export { QuantityPicker };
export default QuantityPicker;
