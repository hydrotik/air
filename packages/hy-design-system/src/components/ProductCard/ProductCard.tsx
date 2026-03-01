'use client';

import React, { useState } from 'react';
import {
  productCardRoot,
  productCardImageWrapper,
  productCardImage,
  productCardOverlay,
  productCardWishlist,
  productCardWishlistFilled,
  productCardInfo,
  productCardName,
  productCardMeta,
  productCardSwatches,
  productCardActions,
  productCardSkeleton,
} from './ProductCard.css';
import { Heart } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ProductCardColor {
  name: string;
  hex: string;
}

export interface ProductCardProduct {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  thumbnailSrc: string;
  alternateSrc?: string;
  colors?: ProductCardColor[];
  href?: string;
}

export interface ProductCardProps {
  /** Product data */
  product: ProductCardProduct;
  /** Whether the product is in the user's wishlist */
  isWishlisted?: boolean;
  /** Toggle wishlist callback */
  onWishlistToggle?: (product: ProductCardProduct) => void;
  /** Render prop for custom actions (e.g., AddToCartButton) */
  renderActions?: (product: ProductCardProduct) => React.ReactNode;
  /** Render prop for price display */
  renderPrice?: (product: ProductCardProduct) => React.ReactNode;
  /** Render prop for color swatches */
  renderSwatches?: (product: ProductCardProduct) => React.ReactNode;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      product,
      isWishlisted = false,
      onWishlistToggle,
      renderActions,
      renderPrice,
      renderSwatches,
      className,
    },
    ref
  ) => {
    const [hovered, setHovered] = useState(false);

    return (
      <div ref={ref} className={`${productCardRoot} ${className ?? ''}`}>
        {/* Image area */}
        <div
          className={productCardImageWrapper}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {product.href ? (
            <a href={product.href} aria-label={product.name}>
              <img
                src={hovered && product.alternateSrc ? product.alternateSrc : product.thumbnailSrc}
                alt={product.name}
                className={productCardImage({ visible: true })}
                loading="lazy"
              />
            </a>
          ) : (
            <img
              src={hovered && product.alternateSrc ? product.alternateSrc : product.thumbnailSrc}
              alt={product.name}
              className={productCardImage({ visible: true })}
              loading="lazy"
            />
          )}

          {/* Wishlist + overlays */}
          <div className={productCardOverlay}>
            {onWishlistToggle && (
              <button
                type="button"
                className={`${productCardWishlist} ${isWishlisted ? productCardWishlistFilled : ''}`}
                onClick={() => onWishlistToggle(product)}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Product info */}
        <div className={productCardInfo}>
          <h3 className={productCardName}>
            {product.href ? (
              <a href={product.href}>{product.name}</a>
            ) : (
              product.name
            )}
          </h3>

          <div className={productCardMeta}>
            {renderPrice ? renderPrice(product) : null}
            {renderSwatches ? (
              <div className={productCardSwatches}>
                {renderSwatches(product)}
              </div>
            ) : null}
          </div>
        </div>

        {/* Actions */}
        {renderActions && (
          <div className={productCardActions}>
            {renderActions(product)}
          </div>
        )}
      </div>
    );
  }
);

ProductCard.displayName = 'ProductCard';

/* ------------------------------------------------------------------ */
/*  Skeleton                                                           */
/* ------------------------------------------------------------------ */

export interface ProductCardSkeletonProps {
  className?: string;
}

const ProductCardSkeleton = React.forwardRef<HTMLDivElement, ProductCardSkeletonProps>(
  ({ className }, ref) => {
    return (
      <div ref={ref} className={`${productCardRoot} ${className ?? ''}`}>
        <div className={productCardSkeleton} style={{ aspectRatio: '1' }} />
        <div className={productCardInfo}>
          <div className={productCardSkeleton} style={{ height: '14px', width: '75%' }} />
          <div className={productCardSkeleton} style={{ height: '14px', width: '40%' }} />
        </div>
        <div className={productCardActions}>
          <div className={productCardSkeleton} style={{ height: '36px', width: '100%' }} />
        </div>
      </div>
    );
  }
);

ProductCardSkeleton.displayName = 'ProductCardSkeleton';

export { ProductCard, ProductCardSkeleton };
export default ProductCard;
