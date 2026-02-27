import React from 'react';
import {
  tableWrapper,
  table,
  tableCaption,
  tableHeader,
  tableBody,
  tableFooter,
  tableRow,
  tableHead,
  tableCell,
} from './Table.css';

export const TableWrapper = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={[tableWrapper, className].filter(Boolean).join(' ')} {...props} />
);
TableWrapper.displayName = 'TableWrapper';

export const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <table ref={ref} className={[table, className].filter(Boolean).join(' ')} {...props} />
));
Table.displayName = 'Table';

export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption ref={ref} className={[tableCaption, className].filter(Boolean).join(' ')} {...props} />
));
TableCaption.displayName = 'TableCaption';

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={[tableHeader, className].filter(Boolean).join(' ')} {...props} />
));
TableHeader.displayName = 'TableHeader';

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={[tableBody, className].filter(Boolean).join(' ')} {...props} />
));
TableBody.displayName = 'TableBody';

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot ref={ref} className={[tableFooter, className].filter(Boolean).join(' ')} {...props} />
));
TableFooter.displayName = 'TableFooter';

export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr ref={ref} className={[tableRow, className].filter(Boolean).join(' ')} {...props} />
));
TableRow.displayName = 'TableRow';

export const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th ref={ref} className={[tableHead, className].filter(Boolean).join(' ')} {...props} />
));
TableHead.displayName = 'TableHead';

export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td ref={ref} className={[tableCell, className].filter(Boolean).join(' ')} {...props} />
));
TableCell.displayName = 'TableCell';
