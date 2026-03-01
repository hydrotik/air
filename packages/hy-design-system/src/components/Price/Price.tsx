import React from 'react';
import { priceRoot, priceAmount } from './Price.css';

export interface PriceProps {
  /** Price amount in minor or major currency units */
  amount: number;
  /** ISO 4217 currency code */
  currency?: string;
  /** BCP 47 locale string */
  locale?: string;
  /** Show cents/decimal portion */
  showCents?: boolean;
  /** Original price before discount (shows struck-through) */
  originalAmount?: number;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

function formatPrice(
  amount: number,
  currency: string,
  showCents: boolean,
  locale: string
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: showCents ? 2 : 0,
    maximumFractionDigits: showCents ? 2 : 0,
  }).format(amount);
}

const Price = React.forwardRef<HTMLDivElement, PriceProps>(
  (
    {
      amount,
      currency = 'USD',
      locale = 'en-US',
      showCents = true,
      originalAmount,
      size = 'md',
      className,
    },
    ref
  ) => {
    const hasDiscount = originalAmount != null && originalAmount > amount;
    const formattedAmount = formatPrice(amount, currency, showCents, locale);
    const formattedOriginal = hasDiscount
      ? formatPrice(originalAmount, currency, showCents, locale)
      : null;

    return (
      <div ref={ref} className={`${priceRoot} ${className ?? ''}`}>
        {hasDiscount && formattedOriginal && (
          <span className={priceAmount({ variant: 'original', size })}>
            {formattedOriginal}
          </span>
        )}
        <span
          className={priceAmount({
            variant: hasDiscount ? 'discount' : 'current',
            size,
          })}
        >
          {formattedAmount}
        </span>
      </div>
    );
  }
);

Price.displayName = 'Price';

export { Price };
export default Price;
