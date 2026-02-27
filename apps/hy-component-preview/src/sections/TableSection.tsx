import React from 'react';
import {
  Badge,
  Table,
  TableWrapper,
  THead,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@hydrotik/design-system';

const users = [
  { name: 'Jane Smith', role: 'Admin', status: 'active', joined: 'Jan 2024' },
  { name: 'Bob Lee', role: 'Editor', status: 'inactive', joined: 'Mar 2024' },
  { name: 'Alice Chen', role: 'Viewer', status: 'active', joined: 'Jun 2024' },
] as const;

export function TableSection() {
  return (
    <TableWrapper>
      <Table>
        <THead>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead data-align="right">Joined</TableHead>
          </TableRow>
        </THead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.name}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Badge variant={user.status === 'active' ? 'success' : 'default'}>
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell data-align="right">{user.joined}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableWrapper>
  );
}
