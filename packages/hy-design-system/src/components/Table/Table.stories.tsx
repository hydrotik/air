import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  TableWrapper,
  Table,
  TableCaption,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
} from './Table';
import { Badge } from '../Badge/Badge';

const meta = {
  title: 'Components/Table',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const invoices = [
  { id: 'INV-001', status: 'paid', method: 'Credit Card', amount: '$250.00' },
  { id: 'INV-002', status: 'pending', method: 'Bank Transfer', amount: '$150.00' },
  { id: 'INV-003', status: 'overdue', method: 'PayPal', amount: '$350.00' },
  { id: 'INV-004', status: 'paid', method: 'Credit Card', amount: '$450.00' },
  { id: 'INV-005', status: 'paid', method: 'Wire', amount: '$550.00' },
];

const statusVariant: Record<string, 'success' | 'warning' | 'destructive'> = {
  paid: 'success',
  pending: 'warning',
  overdue: 'destructive',
};

export const Default: Story = {
  render: () => (
    <TableWrapper style={{ maxWidth: '640px' }}>
      <Table>
        <TableCaption>Recent invoice transactions</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead data-align="right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((inv) => (
            <TableRow key={inv.id}>
              <TableCell>{inv.id}</TableCell>
              <TableCell>
                <Badge variant={statusVariant[inv.status]}>{inv.status}</Badge>
              </TableCell>
              <TableCell>{inv.method}</TableCell>
              <TableCell data-align="right">{inv.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell data-align="right">$1,750.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableWrapper>
  ),
};
