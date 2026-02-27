import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
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
  showClose?: boolean;
}

export const SheetContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ side = 'right', showClose = true, className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={[sheetContent({ side }), className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
      {showClose && (
        <DialogPrimitive.Close className={sheetClose} aria-label="Close">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
            <path
              d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
              fill="currentColor"
            />
          </svg>
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
