import React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { separatorRecipe } from './Separator.css';

export interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {}

export const Separator = React.forwardRef<
  React.ComponentRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(({ orientation = 'horizontal', decorative = true, className, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    orientation={orientation}
    decorative={decorative}
    className={[separatorRecipe({ orientation }), className].filter(Boolean).join(' ')}
    {...props}
  />
));
Separator.displayName = 'Separator';
