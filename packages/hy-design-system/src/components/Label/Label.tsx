import React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { label } from './Label.css';

export interface LabelProps extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  disabled?: boolean;
}

export const Label = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, disabled, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={[label, className].filter(Boolean).join(' ')}
    data-disabled={disabled ? '' : undefined}
    {...props}
  />
));

Label.displayName = 'Label';
