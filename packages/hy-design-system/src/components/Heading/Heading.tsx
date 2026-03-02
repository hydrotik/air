import React from 'react';
import { headingRoot, headingTitle, headingDescription, headingSizeStyles } from './Heading.css';

export interface HeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Page or section title */
  title: string;
  /** Supporting description text */
  description?: string;
  /** Title size */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** HTML heading level for the title */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Heading = React.forwardRef<HTMLDivElement, HeadingProps>(
  ({ title, description, size = 'lg', as: Tag = 'h2', className, ...props }, ref) => (
    <div
      ref={ref}
      className={[headingRoot, className].filter(Boolean).join(' ')}
      {...props}
    >
      <Tag className={[headingTitle, headingSizeStyles[size]].join(' ')}>
        {title}
      </Tag>
      {description && (
        <p className={headingDescription}>{description}</p>
      )}
    </div>
  ),
);
Heading.displayName = 'Heading';
