import React from 'react';
import { badgeRecipe } from './Badge.css';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', className, ...props }, ref) => (
    <span
      ref={ref}
      className={[badgeRecipe({ variant }), className].filter(Boolean).join(' ')}
      {...props}
    />
  ),
);
Badge.displayName = 'Badge';
