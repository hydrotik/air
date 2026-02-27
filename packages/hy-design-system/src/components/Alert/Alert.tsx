import React from 'react';
import { alertRecipe, alertWithIcon, alertTitle, alertDescription, alertIcon } from './Alert.css';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive';
  /** Pass a lucide-react icon component to render in the icon slot */
  icon?: React.ReactNode;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'default', icon, className, children, ...props }, ref) => {
    const classes = [
      alertRecipe({ variant }),
      icon ? alertWithIcon : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} role="alert" className={classes} {...props}>
        {icon && <div className={alertIcon}>{icon}</div>}
        {children}
      </div>
    );
  },
);
Alert.displayName = 'Alert';

export const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={[alertTitle, className].filter(Boolean).join(' ')}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

export const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={[alertDescription, className].filter(Boolean).join(' ')}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';
