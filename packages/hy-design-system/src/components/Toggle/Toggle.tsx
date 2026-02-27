import React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { toggleRecipe } from './Toggle.css';

export interface ToggleProps extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> {
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Toggle = React.forwardRef<
  React.ComponentRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(({ variant = 'default', size = 'md', className, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={[toggleRecipe({ variant, size }), className].filter(Boolean).join(' ')}
    {...props}
  />
));
Toggle.displayName = 'Toggle';
