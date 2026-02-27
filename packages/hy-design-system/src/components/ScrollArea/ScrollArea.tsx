import React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import {
  scrollAreaRoot,
  scrollAreaViewport,
  scrollAreaScrollbar,
  scrollAreaThumb,
  scrollAreaCorner,
} from './ScrollArea.css';

export const ScrollArea = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={[scrollAreaRoot, className].filter(Boolean).join(' ')}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className={scrollAreaViewport}>
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner className={scrollAreaCorner} />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = 'ScrollArea';

export const ScrollBar = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={[scrollAreaScrollbar, className].filter(Boolean).join(' ')}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className={scrollAreaThumb} />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = 'ScrollBar';
