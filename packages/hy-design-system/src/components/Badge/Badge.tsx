import React from 'react';
import { badgeRecipe } from './Badge.css';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'destructive' | 'success' | 'warning' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', className, ...props }, ref) => (
    <span
      ref={ref}
      className={[badgeRecipe({ variant, size }), className].filter(Boolean).join(' ')}
      {...props}
    />
  ),
);
Badge.displayName = 'Badge';
