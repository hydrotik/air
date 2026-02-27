import React from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { hoverCardContent } from './HoverCard.css';

export const HoverCard: typeof HoverCardPrimitive.Root = HoverCardPrimitive.Root;
export const HoverCardTrigger: typeof HoverCardPrimitive.Trigger = HoverCardPrimitive.Trigger;

export const HoverCardContent = React.forwardRef<
  React.ComponentRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={[hoverCardContent, className].filter(Boolean).join(' ')}
    {...props}
  />
));
HoverCardContent.displayName = 'HoverCardContent';
