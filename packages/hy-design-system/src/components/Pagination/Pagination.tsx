import React from 'react';
import { IconChevronLeft, IconChevronRight, IconDots } from '@tabler/icons-react';
import {
  paginationNav,
  paginationContent,
  paginationItem,
  paginationLink,
  paginationEllipsis,
} from './Pagination.css';

export const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={[paginationNav, className].filter(Boolean).join(' ')}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

export const PaginationContent = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={[paginationContent, className].filter(Boolean).join(' ')} {...props} />
  ),
);
PaginationContent.displayName = 'PaginationContent';

export const PaginationItem = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={[paginationItem, className].filter(Boolean).join(' ')} {...props} />
  ),
);
PaginationItem.displayName = 'PaginationItem';

export interface PaginationLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean;
}

export const PaginationLink = ({ isActive = false, className, ...props }: PaginationLinkProps) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    className={[paginationLink({ isActive }), className].filter(Boolean).join(' ')}
    {...props}
  />
);
PaginationLink.displayName = 'PaginationLink';

export const PaginationPrevious = ({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <PaginationLink aria-label="Go to previous page" className={className} {...props}>
    <IconChevronLeft size={16} />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

export const PaginationNext = ({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <PaginationLink aria-label="Go to next page" className={className} {...props}>
    <span>Next</span>
    <IconChevronRight size={16} />
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

export const PaginationEllipsis = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span aria-hidden className={[paginationEllipsis, className].filter(Boolean).join(' ')} {...props}>
    <IconDots size={16} />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';
