import React from 'react';
import {
  Badge,
  Table,
  TableWrapper,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Avatar,
  AvatarFallback,
} from '@hydrotik/design-system';

const invoices = [
  { id: 'INV-001', status: 'Paid', method: 'Credit Card', amount: '$250.00', initials: 'JD' },
  { id: 'INV-002', status: 'Pending', method: 'PayPal', amount: '$150.00', initials: 'AS' },
  { id: 'INV-003', status: 'Unpaid', method: 'Bank Transfer', amount: '$350.00', initials: 'MK' },
  { id: 'INV-004', status: 'Paid', method: 'Credit Card', amount: '$450.00', initials: 'RL' },
  { id: 'INV-005', status: 'Paid', method: 'PayPal', amount: '$550.00', initials: 'EP' },
];

function statusBadge(status: string) {
  const variant = status === 'Paid' ? 'success' : status === 'Pending' ? 'warning' : 'destructive';
  return <Badge variant={variant}>{status}</Badge>;
}

export function TableSection() {
  return (
    <TableWrapper>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead style={{ width: '60px' }}></TableHead>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead data-align="right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((inv) => (
            <TableRow key={inv.id}>
              <TableCell>
                <Avatar size="sm">
                  <AvatarFallback>{inv.initials}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell style={{ fontWeight: 500 }}>{inv.id}</TableCell>
              <TableCell>{statusBadge(inv.status)}</TableCell>
              <TableCell>{inv.method}</TableCell>
              <TableCell data-align="right">{inv.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableWrapper>
  );
}
