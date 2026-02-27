import React from 'react';
import { spinnerRecipe } from './Spinner.css';

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ size = 'md', className, ...props }, ref) => (
    <span
      ref={ref}
      role="status"
      aria-label="Loading"
      className={[spinnerRecipe({ size }), className].filter(Boolean).join(' ')}
      {...props}
    />
  ),
);
Spinner.displayName = 'Spinner';
