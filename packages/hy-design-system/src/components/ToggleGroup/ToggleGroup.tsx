import React from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { toggleGroupRoot, toggleGroupItem } from './ToggleGroup.css';

export const ToggleGroup = React.forwardRef<
  React.ComponentRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={[toggleGroupRoot, className].filter(Boolean).join(' ')}
    {...props}
  />
));
ToggleGroup.displayName = 'ToggleGroup';

export const ToggleGroupItem = React.forwardRef<
  React.ComponentRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <ToggleGroupPrimitive.Item
    ref={ref}
    className={[toggleGroupItem, className].filter(Boolean).join(' ')}
    {...props}
  />
));
ToggleGroupItem.displayName = 'ToggleGroupItem';
