import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DataGrid } from './DataGrid';
import type { ColumnDef } from './types';

interface Person {
  id: number;
  name: string;
  role: string;
  volume: string;
  status: string;
}

const sampleData: Person[] = [
  { id: 1, name: 'Aldric Ashworth', role: 'Principal', volume: '$785.4M', status: 'Flagged' },
  { id: 2, name: 'Belen Blackstone', role: 'Associate', volume: '$507.9M', status: 'Flagged' },
  { id: 3, name: 'Cassian Carrington', role: 'Operator', volume: '$385.4M', status: 'Flagged' },
  { id: 4, name: 'Delphine Drexel', role: 'Principal', volume: '$328.5M', status: 'Cleared' },
  { id: 5, name: 'Emeric Enright', role: 'Operator', volume: '$250.8M', status: 'Pending' },
  { id: 6, name: 'Fionnuala Fairclough', role: 'Associate', volume: '$44.2M', status: 'Cleared' },
  { id: 7, name: 'Gareth Graystone', role: 'Operator', volume: '$30.8M', status: 'Cleared' },
  { id: 8, name: 'Heloise Hargrove', role: 'Principal', volume: '$4.5M', status: 'Flagged' },
];

const columns: ColumnDef<Person>[] = [
  { id: 'name', header: 'Name', accessorKey: 'name', sortable: true },
  { id: 'role', header: 'Role', accessorKey: 'role', sortable: true },
  { id: 'volume', header: 'Volume', accessorKey: 'volume', sortable: true },
  { id: 'status', header: 'Status', accessorKey: 'status', sortable: true },
];

const meta = {
  title: 'Components/DataGrid',
  component: DataGrid,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof DataGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Default ── */
export const Default: Story = {
  args: {
    data: sampleData,
    columns,
    getRowId: (row: Person) => String(row.id),
  },
};

/* ── Compact density ── */
export const Compact: Story = {
  args: {
    data: sampleData,
    columns,
    getRowId: (row: Person) => String(row.id),
    density: 'compact',
  },
};

/* ── Editorial density ── */
export const Editorial: Story = {
  args: {
    data: sampleData,
    columns,
    getRowId: (row: Person) => String(row.id),
    density: 'editorial',
    borderless: true,
    transparent: true,
    headerBorder: 'thick',
    rowSeparator: 'subtle',
    showToolbar: false,
  },
  name: 'Editorial Density',
};

/* ── Borderless + Transparent ── */
export const Borderless: Story = {
  args: {
    data: sampleData,
    columns,
    getRowId: (row: Person) => String(row.id),
    borderless: true,
    transparent: true,
  },
};

/* ── Header border variants ── */
export const HeaderBorders: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {(['thin', 'thick', 'none'] as const).map((variant) => (
        <div key={variant}>
          <p style={{ fontFamily: 'monospace', fontSize: '11px', marginBottom: '8px', color: '#888' }}>
            headerBorder="{variant}"
          </p>
          <DataGrid
            data={sampleData.slice(0, 3)}
            columns={columns}
            getRowId={(row: Person) => String(row.id)}
            headerBorder={variant}
            showPagination={false}
            showToolbar={false}
          />
        </div>
      ))}
    </div>
  ),
  name: 'Header Border Variants',
};

/* ── Row separator variants ── */
export const RowSeparators: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {(['full', 'subtle', 'none'] as const).map((variant) => (
        <div key={variant}>
          <p style={{ fontFamily: 'monospace', fontSize: '11px', marginBottom: '8px', color: '#888' }}>
            rowSeparator="{variant}"
          </p>
          <DataGrid
            data={sampleData.slice(0, 4)}
            columns={columns}
            getRowId={(row: Person) => String(row.id)}
            rowSeparator={variant}
            showPagination={false}
            showToolbar={false}
          />
        </div>
      ))}
    </div>
  ),
  name: 'Row Separator Variants',
};

/* ── Loading state ── */
export const Loading: Story = {
  args: {
    data: [],
    columns,
    loading: true,
  },
};

/* ── Empty state ── */
export const Empty: Story = {
  args: {
    data: [],
    columns,
    emptyMessage: 'No records found.',
  },
};

/* ── With pagination ── */
export const WithPagination: Story = {
  args: {
    data: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `Entity ${i + 1}`,
      role: ['Principal', 'Operator', 'Associate'][i % 3],
      volume: `$${(Math.random() * 100).toFixed(1)}M`,
      status: i % 3 === 0 ? 'Flagged' : 'Cleared',
    })),
    columns,
    getRowId: (row: Person) => String(row.id),
    initialPageSize: 10,
    pageSizeOptions: [10, 25, 50],
  },
  name: 'With Pagination',
};

/* ── Row selection ── */
export const RowSelection: Story = {
  args: {
    data: sampleData,
    columns,
    getRowId: (row: Person) => String(row.id),
    enableRowSelection: true,
  },
  name: 'Row Selection',
};

/* ── All density variants side by side ── */
export const DensityComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      {(['default', 'compact', 'editorial'] as const).map((density) => (
        <div key={density}>
          <p style={{ fontFamily: 'monospace', fontSize: '11px', marginBottom: '8px', color: '#888' }}>
            density="{density}"
          </p>
          <DataGrid
            data={sampleData.slice(0, 4)}
            columns={columns}
            getRowId={(row: Person) => String(row.id)}
            density={density}
            borderless={density === 'editorial'}
            transparent={density === 'editorial'}
            headerBorder={density === 'editorial' ? 'thick' : 'thin'}
            rowSeparator={density === 'editorial' ? 'subtle' : 'full'}
            showPagination={false}
            showToolbar={false}
          />
        </div>
      ))}
    </div>
  ),
  name: 'Density Comparison',
};
