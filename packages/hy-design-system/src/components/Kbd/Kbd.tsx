import React from 'react';
import { kbdRecipe } from './Kbd.css';

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  size?: 'sm' | 'md';
}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ size = 'md', className, ...props }, ref) => (
    <kbd
      ref={ref}
      className={[kbdRecipe({ size }), className].filter(Boolean).join(' ')}
      {...props}
    />
  ),
);
Kbd.displayName = 'Kbd';
