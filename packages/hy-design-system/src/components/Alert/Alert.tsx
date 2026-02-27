import React from 'react';
import { alertRecipe, alertTitle, alertDescription, alertIcon } from './Alert.css';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'success' | 'warning';
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'default', className, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={[alertRecipe({ variant }), className].filter(Boolean).join(' ')}
      {...props}
    />
  ),
);
Alert.displayName = 'Alert';

export const AlertIcon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={[alertIcon, className].filter(Boolean).join(' ')} {...props} />
  ),
);
AlertIcon.displayName = 'AlertIcon';

export const AlertTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={[alertTitle, className].filter(Boolean).join(' ')} {...props} />
  ),
);
AlertTitle.displayName = 'AlertTitle';

export const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={[alertDescription, className].filter(Boolean).join(' ')} {...props} />
  ),
);
AlertDescription.displayName = 'AlertDescription';
