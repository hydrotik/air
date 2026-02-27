import React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { radioGroupRoot, radioGroupItem, radioGroupIndicator } from './RadioGroup.css';

export const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={[radioGroupRoot, className].filter(Boolean).join(' ')}
    {...props}
  />
));
RadioGroup.displayName = 'RadioGroup';

export const RadioGroupItem = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={[radioGroupItem, className].filter(Boolean).join(' ')}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className={radioGroupIndicator} />
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = 'RadioGroupItem';
