import React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import {
  alertDialogOverlay,
  alertDialogContent,
  alertDialogHeader,
  alertDialogFooter,
  alertDialogTitle,
  alertDialogDescription,
} from './AlertDialog.css';

export const AlertDialog: typeof AlertDialogPrimitive.Root = AlertDialogPrimitive.Root;
export const AlertDialogTrigger: typeof AlertDialogPrimitive.Trigger = AlertDialogPrimitive.Trigger;
export const AlertDialogPortal: typeof AlertDialogPrimitive.Portal = AlertDialogPrimitive.Portal;
export const AlertDialogAction: typeof AlertDialogPrimitive.Action = AlertDialogPrimitive.Action;
export const AlertDialogCancel: typeof AlertDialogPrimitive.Cancel = AlertDialogPrimitive.Cancel;

export const AlertDialogOverlay = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    className={[alertDialogOverlay, className].filter(Boolean).join(' ')}
    {...props}
  />
));
AlertDialogOverlay.displayName = 'AlertDialogOverlay';

export const AlertDialogContent = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={[alertDialogContent, className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </AlertDialogPrimitive.Content>
  </AlertDialogPortal>
));
AlertDialogContent.displayName = 'AlertDialogContent';

export const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={[alertDialogHeader, className].filter(Boolean).join(' ')} {...props} />
);
AlertDialogHeader.displayName = 'AlertDialogHeader';

export const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={[alertDialogFooter, className].filter(Boolean).join(' ')} {...props} />
);
AlertDialogFooter.displayName = 'AlertDialogFooter';

export const AlertDialogTitle = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={[alertDialogTitle, className].filter(Boolean).join(' ')}
    {...props}
  />
));
AlertDialogTitle.displayName = 'AlertDialogTitle';

export const AlertDialogDescription = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={[alertDialogDescription, className].filter(Boolean).join(' ')}
    {...props}
  />
));
AlertDialogDescription.displayName = 'AlertDialogDescription';
