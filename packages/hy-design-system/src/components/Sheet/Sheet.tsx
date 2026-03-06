import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { IconX } from '@tabler/icons-react';
import {
  sheetOverlay,
  sheetContent,
  sheetHeader,
  sheetFooter,
  sheetBody,
  sheetTitle,
  sheetDescription,
  sheetClose,
} from './Sheet.css';

export const Sheet: typeof DialogPrimitive.Root = DialogPrimitive.Root;
export const SheetTrigger: typeof DialogPrimitive.Trigger = DialogPrimitive.Trigger;
export const SheetClose: typeof DialogPrimitive.Close = DialogPrimitive.Close;
export const SheetPortal: typeof DialogPrimitive.Portal = DialogPrimitive.Portal;

export const SheetOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={[sheetOverlay, className].filter(Boolean).join(' ')}
    {...props}
  />
));
SheetOverlay.displayName = 'SheetOverlay';

export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  side?: 'top' | 'right' | 'bottom' | 'left';
  showCloseButton?: boolean;
}

export const SheetContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ side = 'right', showCloseButton = true, className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={[sheetContent({ side }), className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close className={sheetClose} aria-label="Close">
          <IconX size={16} />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = 'SheetContent';

export const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={[sheetHeader, className].filter(Boolean).join(' ')} {...props} />
);
SheetHeader.displayName = 'SheetHeader';

export const SheetBody = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={[sheetBody, className].filter(Boolean).join(' ')} {...props} />
);
SheetBody.displayName = 'SheetBody';

export const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={[sheetFooter, className].filter(Boolean).join(' ')} {...props} />
);
SheetFooter.displayName = 'SheetFooter';

export const SheetTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={[sheetTitle, className].filter(Boolean).join(' ')}
    {...props}
  />
));
SheetTitle.displayName = 'SheetTitle';

export const SheetDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={[sheetDescription, className].filter(Boolean).join(' ')}
    {...props}
  />
));
SheetDescription.displayName = 'SheetDescription';
