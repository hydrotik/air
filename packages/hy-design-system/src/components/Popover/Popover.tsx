import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { IconX } from '@tabler/icons-react';
import { popoverContent, popoverArrow, popoverClose } from './Popover.css';

export const Popover: typeof PopoverPrimitive.Root = PopoverPrimitive.Root;
export const PopoverTrigger: typeof PopoverPrimitive.Trigger = PopoverPrimitive.Trigger;
export const PopoverAnchor: typeof PopoverPrimitive.Anchor = PopoverPrimitive.Anchor;

export const PopoverContent = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & { showArrow?: boolean }
>(({ className, align = 'center', sideOffset = 4, showArrow = false, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={[popoverContent, className].filter(Boolean).join(' ')}
      {...props}
    >
      {props.children}
      {showArrow && <PopoverPrimitive.Arrow className={popoverArrow} />}
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = 'PopoverContent';

export const PopoverClose = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Close>
>(({ className, children, ...props }, ref) => (
  <PopoverPrimitive.Close
    ref={ref}
    className={[popoverClose, className].filter(Boolean).join(' ')}
    aria-label="Close"
    {...props}
  >
    {children ?? <IconX size={14} />}
  </PopoverPrimitive.Close>
));
PopoverClose.displayName = 'PopoverClose';
