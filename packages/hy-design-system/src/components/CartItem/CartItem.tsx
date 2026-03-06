import React from 'react';
import {
  cartItemRoot,
  cartItemImage,
  cartItemImg,
  cartItemContent,
  cartItemHeader,
  cartItemName,
  cartItemNameLink,
  cartItemVariant,
  cartItemPrice,
  cartItemFooter,
  cartItemControls,
  cartItemRemove,
  cartItemSkeleton,
} from './CartItem.css';
import { IconTrash } from '@tabler/icons-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface CartItemData {
  id: number;
  name: string;
  price: number;
  quantity: number;
  color?: string;
  size?: string;
  image?: string;
  href?: string;
}

export interface CartItemProps {
  /** Cart item data */
  item: CartItemData;
  /** Called when quantity changes */
  onUpdateQuantity?: (quantity: number) => void;
  /** Called to remove item */
  onRemove: () => void;
  /** Render prop for quantity picker */
  renderQuantityPicker?: (item: CartItemData) => React.ReactNode;
  /** Render prop for price */
  renderPrice?: (item: CartItemData) => React.ReactNode;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const CartItem = React.forwardRef<HTMLDivElement, CartItemProps>(
  (
    {
      item,
      onRemove,
      renderQuantityPicker,
      renderPrice,
      className,
    },
    ref
  ) => {
    return (
      <div ref={ref} className={`${cartItemRoot} ${className ?? ''}`}>
        {/* Product image */}
        {item.image && (
          <div className={cartItemImage}>
            <img src={item.image} alt={item.name} className={cartItemImg} loading="lazy" />
          </div>
        )}

        {/* Content */}
        <div className={cartItemContent}>
          <div className={cartItemHeader}>
            <h4 className={cartItemName}>
              {item.href ? (
                <a href={item.href} className={cartItemNameLink}>
                  {item.name}
                </a>
              ) : (
                item.name
              )}
              {item.color && <span className={cartItemVariant}>({item.color})</span>}
              {item.size && <span className={cartItemVariant}>({item.size})</span>}
            </h4>
            <div className={cartItemPrice}>
              {renderPrice ? renderPrice(item) : `$${item.price.toFixed(2)}`}
            </div>
          </div>

          <div className={cartItemFooter}>
            <div className={cartItemControls}>
              {renderQuantityPicker ? renderQuantityPicker(item) : null}
            </div>

            <button
              type="button"
              className={cartItemRemove}
              onClick={onRemove}
              aria-label={`Remove ${item.name} from cart`}
            >
              <IconTrash size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  }
);

CartItem.displayName = 'CartItem';

/* ------------------------------------------------------------------ */
/*  Skeleton                                                           */
/* ------------------------------------------------------------------ */

export interface CartItemSkeletonProps {
  className?: string;
}

const CartItemSkeleton = React.forwardRef<HTMLDivElement, CartItemSkeletonProps>(
  ({ className }, ref) => {
    return (
      <div ref={ref} className={`${cartItemRoot} ${className ?? ''}`}>
        <div className={cartItemImage}>
          <div className={cartItemSkeleton} style={{ width: '100%', height: '100%' }} />
        </div>
        <div className={cartItemContent}>
          <div className={cartItemHeader}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div className={cartItemSkeleton} style={{ height: '14px', width: '80%' }} />
              <div className={cartItemSkeleton} style={{ height: '12px', width: '40%' }} />
            </div>
            <div className={cartItemSkeleton} style={{ height: '14px', width: '60px' }} />
          </div>
          <div className={cartItemFooter}>
            <div className={cartItemSkeleton} style={{ height: '28px', width: '80px' }} />
            <div className={cartItemSkeleton} style={{ height: '28px', width: '28px' }} />
          </div>
        </div>
      </div>
    );
  }
);

CartItemSkeleton.displayName = 'CartItemSkeleton';

export { CartItem, CartItemSkeleton };
export default CartItem;
