import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { tooltipContent, tooltipArrow } from './Tooltip.css';

export const TooltipProvider: typeof TooltipPrimitive.Provider = TooltipPrimitive.Provider;
export const Tooltip: typeof TooltipPrimitive.Root = TooltipPrimitive.Root;
export const TooltipTrigger: typeof TooltipPrimitive.Trigger = TooltipPrimitive.Trigger;

export const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & { showArrow?: boolean }
>(({ className, sideOffset = 6, showArrow = true, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={[tooltipContent, className].filter(Boolean).join(' ')}
      {...props}
    >
      {props.children}
      {showArrow && <TooltipPrimitive.Arrow className={tooltipArrow} />}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = 'TooltipContent';
