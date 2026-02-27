import React from 'react';
import { skeleton } from './Skeleton.css';

export const Skeleton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={[skeleton, className].filter(Boolean).join(' ')}
      {...props}
    />
  ),
);
Skeleton.displayName = 'Skeleton';
