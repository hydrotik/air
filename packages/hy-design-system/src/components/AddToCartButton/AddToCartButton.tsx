import React from 'react';
import { addToCartRoot, addToCartIcon, addToCartBadge } from './AddToCartButton.css';
import { IconCheck, IconPlus } from '@tabler/icons-react';

export interface AddToCartButtonProps {
  /** Click handler to add item to cart */
  onAddToCart: () => void;
  /** Current quantity in cart (0 = not added) */
  quantity?: number;
  /** Button variant */
  variant?: 'default' | 'primary';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state */
  disabled?: boolean;
  /** Button label */
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const AddToCartButton = React.forwardRef<HTMLButtonElement, AddToCartButtonProps>(
  (
    {
      onAddToCart,
      quantity = 0,
      variant = 'default',
      size = 'md',
      disabled = false,
      children,
      className,
      style,
    },
    ref
  ) => {
    const isAdded = quantity > 0;

    return (
      <button
        ref={ref}
        type="button"
        className={`${addToCartRoot({ variant, size, added: isAdded, disabled })} ${className ?? ''}`}
        style={style}
        onClick={onAddToCart}
        disabled={disabled || isAdded}
        aria-label={isAdded ? `Added to cart (${quantity})` : 'Add to cart'}
      >
        <span className={addToCartIcon}>
          {isAdded ? (
            <IconCheck size={14} />
          ) : (
            <IconPlus size={14} />
          )}
        </span>
        <span>{children ?? (isAdded ? 'Added' : 'Add to Cart')}</span>
        {isAdded && quantity > 0 && (
          <span className={addToCartBadge}>{quantity}</span>
        )}
      </button>
    );
  }
);

AddToCartButton.displayName = 'AddToCartButton';

export { AddToCartButton };
export default AddToCartButton;
