import React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { switchRoot, switchThumb } from './Switch.css';

export const Switch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={[switchRoot, className].filter(Boolean).join(' ')}
    {...props}
  >
    <SwitchPrimitive.Thumb className={switchThumb} />
  </SwitchPrimitive.Root>
));
Switch.displayName = 'Switch';
