import React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { progressRoot, progressIndicator } from './Progress.css';

export const Progress = React.forwardRef<
  React.ComponentRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={[progressRoot, className].filter(Boolean).join(' ')}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={progressIndicator}
      style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = 'Progress';
