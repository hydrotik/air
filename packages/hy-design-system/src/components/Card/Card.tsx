import React from 'react';
import { cardRecipe, cardHeader, cardTitle, cardDescription, cardFooter } from './Card.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: 'flat' | 'raised' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ elevation = 'raised', padding = 'md', className, ...props }, ref) => (
    <div
      ref={ref}
      className={[cardRecipe({ elevation, padding }), className].filter(Boolean).join(' ')}
      {...props}
    />
  ),
);
Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={[cardHeader, className].filter(Boolean).join(' ')} {...props} />
  ),
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={[cardTitle, className].filter(Boolean).join(' ')} {...props} />
  ),
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={[cardDescription, className].filter(Boolean).join(' ')} {...props} />
  ),
);
CardDescription.displayName = 'CardDescription';

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={[cardFooter, className].filter(Boolean).join(' ')} {...props} />
  ),
);
CardFooter.displayName = 'CardFooter';

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => <div ref={ref} {...props} />,
);
CardContent.displayName = 'CardContent';
