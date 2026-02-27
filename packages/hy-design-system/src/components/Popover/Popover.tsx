import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { popoverContent, popoverArrow, popoverClose } from './Popover.css';

export const Popover: typeof PopoverPrimitive.Root = PopoverPrimitive.Root;
export const PopoverTrigger: typeof PopoverPrimitive.Trigger = PopoverPrimitive.Trigger;
export const PopoverAnchor: typeof PopoverPrimitive.Anchor = PopoverPrimitive.Anchor;

export const PopoverContent = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & { showArrow?: boolean }
>(({ className, align = 'center', sideOffset = 6, showArrow = false, ...props }, ref) => (
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
    {children ?? (
      <svg width="14" height="14" viewBox="0 0 15 15" fill="none" aria-hidden>
        <path
          d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
          fill="currentColor"
        />
      </svg>
    )}
  </PopoverPrimitive.Close>
));
PopoverClose.displayName = 'PopoverClose';
