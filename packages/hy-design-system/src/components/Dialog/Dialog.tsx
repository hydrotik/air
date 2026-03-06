import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { IconX } from '@tabler/icons-react';
import {
  dialogOverlay,
  dialogContent,
  dialogHeader,
  dialogFooter,
  dialogTitle,
  dialogDescription,
  dialogClose,
} from './Dialog.css';

export const Dialog: typeof DialogPrimitive.Root = DialogPrimitive.Root;
export const DialogTrigger: typeof DialogPrimitive.Trigger = DialogPrimitive.Trigger;
export const DialogPortal: typeof DialogPrimitive.Portal = DialogPrimitive.Portal;
export const DialogClose: typeof DialogPrimitive.Close = DialogPrimitive.Close;

export const DialogOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={[dialogOverlay, className].filter(Boolean).join(' ')}
    {...props}
  />
));
DialogOverlay.displayName = 'DialogOverlay';

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  showCloseButton?: boolean;
}

export const DialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, showCloseButton = true, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={[dialogContent, className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close className={dialogClose} aria-label="Close dialog">
          <IconX size={16} />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = 'DialogContent';

export const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={[dialogHeader, className].filter(Boolean).join(' ')} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

export const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={[dialogFooter, className].filter(Boolean).join(' ')} {...props} />
);
DialogFooter.displayName = 'DialogFooter';

export const DialogTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={[dialogTitle, className].filter(Boolean).join(' ')}
    {...props}
  />
));
DialogTitle.displayName = 'DialogTitle';

export const DialogDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={[dialogDescription, className].filter(Boolean).join(' ')}
    {...props}
  />
));
DialogDescription.displayName = 'DialogDescription';
