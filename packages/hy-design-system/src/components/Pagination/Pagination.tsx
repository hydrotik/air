import React from 'react';
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
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z" fill="currentColor" />
    </svg>
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

export const PaginationNext = ({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <PaginationLink aria-label="Go to next page" className={className} {...props}>
    <span>Next</span>
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" />
    </svg>
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

export const PaginationEllipsis = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span aria-hidden className={[paginationEllipsis, className].filter(Boolean).join(' ')} {...props}>
    ···
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';
