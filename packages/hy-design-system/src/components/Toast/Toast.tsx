import React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import {
  toastViewport,
  toast as toastRecipe,
  toastTitle,
  toastDescription,
  toastAction,
  toastClose,
} from './Toast.css';

export const ToastProvider: typeof ToastPrimitive.Provider = ToastPrimitive.Provider;

export const ToastViewport = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={[toastViewport, className].filter(Boolean).join(' ')}
    {...props}
  />
));
ToastViewport.displayName = 'ToastViewport';

export interface ToastProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> {
  variant?: 'default' | 'success' | 'destructive' | 'warning';
}

export const Toast = React.forwardRef<React.ComponentRef<typeof ToastPrimitive.Root>, ToastProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <ToastPrimitive.Root
      ref={ref}
      className={[toastRecipe({ variant }), className].filter(Boolean).join(' ')}
      {...props}
    />
  ),
);
Toast.displayName = 'Toast';

export const ToastAction = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    className={[toastAction, className].filter(Boolean).join(' ')}
    {...props}
  />
));
ToastAction.displayName = 'ToastAction';

export const ToastClose = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    className={[toastClose, className].filter(Boolean).join(' ')}
    aria-label="Dismiss notification"
    {...props}
  >
    <svg width="14" height="14" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path
        d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
        fill="currentColor"
      />
    </svg>
  </ToastPrimitive.Close>
));
ToastClose.displayName = 'ToastClose';

export const ToastTitle = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    className={[toastTitle, className].filter(Boolean).join(' ')}
    {...props}
  />
));
ToastTitle.displayName = 'ToastTitle';

export const ToastDescription = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    className={[toastDescription, className].filter(Boolean).join(' ')}
    {...props}
  />
));
ToastDescription.displayName = 'ToastDescription';
