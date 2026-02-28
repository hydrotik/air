import React from 'react';
import { DataGrid, Badge } from '@hydrotik/design-system';
import type { ColumnDef } from '@hydrotik/design-system';
import * as s from './DataGridPage.css';

// ─── Sample Data ────────────────────────────────────────────────────────────

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
  salary: number;
  status: 'active' | 'inactive' | 'on-leave';
  startDate: string;
  performance: number;
  location: string;
}

const DEPARTMENTS = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Support'];
const ROLES = ['Manager', 'Senior', 'Lead', 'Junior', 'Intern', 'Director', 'VP', 'IC'];
const LOCATIONS = ['New York', 'San Francisco', 'London', 'Berlin', 'Tokyo', 'Sydney', 'Toronto', 'Remote'];
const STATUSES: Employee['status'][] = ['active', 'inactive', 'on-leave'];
const FIRST_NAMES = ['James', 'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'William', 'Sophia', 'Oliver', 'Isabella', 'Elijah', 'Mia', 'Lucas', 'Charlotte', 'Mason', 'Amelia', 'Logan', 'Harper', 'Alexander', 'Evelyn', 'Ethan', 'Abigail', 'Jacob', 'Emily', 'Michael', 'Elizabeth', 'Daniel', 'Sofia', 'Henry', 'Avery', 'Sebastian', 'Ella', 'Jack', 'Scarlett', 'Aiden', 'Grace', 'Owen', 'Chloe', 'Samuel', 'Victoria'];
const LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];

function generateEmployees(count: number): Employee[] {
  return Array.from({ length: count }, (_, i) => {
    const first = FIRST_NAMES[i % FIRST_NAMES.length];
    const last = LAST_NAMES[i % LAST_NAMES.length];
    return {
      id: i + 1,
      name: `${first} ${last}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}@example.com`,
      department: DEPARTMENTS[i % DEPARTMENTS.length],
      role: ROLES[i % ROLES.length],
      salary: 45000 + Math.floor(Math.random() * 120000),
      status: STATUSES[i % STATUSES.length],
      startDate: `${2018 + (i % 7)}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
      performance: Math.floor(Math.random() * 100),
      location: LOCATIONS[i % LOCATIONS.length],
    };
  });
}

const DATA = generateEmployees(200);

// ─── Column Definitions ────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: Employee['status'] }) => {
  const cls = status === 'active' ? s.badgeActive
    : status === 'inactive' ? s.badgeInactive
    : s.badge;
  return <span className={`${s.badge} ${cls}`}>{status}</span>;
};

const AvatarCell = ({ name }: { name: string }) => {
  const initials = name.split(' ').map((n) => n[0]).join('').toUpperCase();
  return (
    <div className={s.avatarCell}>
      <div className={s.avatar}>{initials}</div>
      <span>{name}</span>
    </div>
  );
};

const PerformanceBar = ({ value }: { value: number }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <div className={s.progressBar}>
      <div className={s.progressFill} style={{ width: `${value}%` }} />
    </div>
    <span style={{ fontSize: '12px', minWidth: '30px' }}>{value}%</span>
  </div>
);

const columns: ColumnDef<Employee>[] = [
  {
    id: 'name',
    header: 'Employee',
    accessorKey: 'name',
    size: 220,
    pin: 'left',
    cell: ({ value }) => <AvatarCell name={value} />,
  },
  {
    id: 'email',
    header: 'Email',
    accessorKey: 'email',
    size: 260,
  },
  {
    id: 'department',
    header: 'Department',
    accessorKey: 'department',
    size: 140,
  },
  {
    id: 'role',
    header: 'Role',
    accessorKey: 'role',
    size: 120,
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    size: 110,
    cell: ({ value }) => <StatusBadge status={value} />,
  },
  {
    id: 'salary',
    header: 'Salary',
    accessorKey: 'salary',
    size: 120,
    align: 'right',
    cell: ({ value }) => `$${Number(value).toLocaleString()}`,
    sortingFn: (rowA, rowB, columnId) => {
      return Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId));
    },
  },
  {
    id: 'performance',
    header: 'Performance',
    accessorKey: 'performance',
    size: 180,
    cell: ({ value }) => <PerformanceBar value={value} />,
    sortingFn: (rowA, rowB, columnId) => {
      return Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId));
    },
  },
  {
    id: 'location',
    header: 'Location',
    accessorKey: 'location',
    size: 140,
  },
  {
    id: 'startDate',
    header: 'Start Date',
    accessorKey: 'startDate',
    size: 120,
    align: 'right',
  },
];

// ─── Minimal Example Columns ───────────────────────────────────────────────

const minimalColumns: ColumnDef<Employee>[] = [
  { id: 'name', header: 'Name', accessorKey: 'name', size: 200 },
  { id: 'department', header: 'Department', accessorKey: 'department' },
  { id: 'role', header: 'Role', accessorKey: 'role' },
  {
    id: 'salary',
    header: 'Salary',
    accessorKey: 'salary',
    align: 'right',
    cell: ({ value }) => `$${Number(value).toLocaleString()}`,
  },
];

// ─── Tree Data ──────────────────────────────────────────────────────────────

interface TreeItem {
  id: number;
  name: string;
  type: string;
  size: string;
  children?: TreeItem[];
}

const treeData: TreeItem[] = [
  {
    id: 1, name: 'src', type: 'folder', size: '—', children: [
      {
        id: 2, name: 'components', type: 'folder', size: '—', children: [
          { id: 3, name: 'DataGrid.tsx', type: 'file', size: '25 KB' },
          { id: 4, name: 'DataGrid.css.ts', type: 'file', size: '15 KB' },
          { id: 5, name: 'types.ts', type: 'file', size: '12 KB' },
        ],
      },
      {
        id: 6, name: 'hooks', type: 'folder', size: '—', children: [
          { id: 7, name: 'useDataGrid.ts', type: 'file', size: '5 KB' },
        ],
      },
      { id: 8, name: 'index.ts', type: 'file', size: '1 KB' },
    ],
  },
  {
    id: 9, name: 'package.json', type: 'file', size: '2 KB',
  },
  {
    id: 10, name: 'tsconfig.json', type: 'file', size: '1 KB',
  },
];

const treeColumns: ColumnDef<TreeItem>[] = [
  { id: 'name', header: 'Name', accessorKey: 'name', size: 300 },
  { id: 'type', header: 'Type', accessorKey: 'type', size: 100 },
  { id: 'size', header: 'Size', accessorKey: 'size', size: 100, align: 'right' },
];

// ─── Page Component ─────────────────────────────────────────────────────────

export function DataGridPage() {
  return (
    <div className={s.page}>
      <h1 className={s.title}>DataGrid</h1>
      <p className={s.subtitle}>
        Enterprise-grade data grid with sorting, filtering, pagination, selection,
        column resizing, inline editing, tree data, and more.
      </p>

      {/* ─── Full Featured ─── */}
      <section className={s.section}>
        <h2 className={s.sectionTitle}>Full Featured</h2>
        <p className={s.sectionDesc}>
          200 rows with sorting (click header, shift-click for multi-sort), global search,
          column filters, row selection, column resizing (drag header edge), column visibility toggle,
          pagination, and pinned first column.
        </p>
        <DataGrid<Employee>
          data={DATA}
          columns={columns}
          enableSorting
          enableMultiSort
          enablePagination
          enableRowSelection
          enableColumnResizing
          enableColumnVisibility
          enableGlobalFilter
          showColumnFilters
          showStatusBar
          height={520}
          pageSizeOptions={[10, 25, 50, 100]}
          initialState={{
            pagination: { pageIndex: 0, pageSize: 25 },
          }}
        />
      </section>

      {/* ─── Minimal ─── */}
      <section className={s.section}>
        <h2 className={s.sectionTitle}>Minimal</h2>
        <p className={s.sectionDesc}>
          Simple table with sorting only — no toolbar, no pagination, no selection.
        </p>
        <DataGrid<Employee>
          data={DATA.slice(0, 8)}
          columns={minimalColumns}
          enableSorting
          enablePagination={false}
          showToolbar={false}
        />
      </section>

      {/* ─── Tree Data ─── */}
      <section className={s.section}>
        <h2 className={s.sectionTitle}>Tree Data</h2>
        <p className={s.sectionDesc}>
          Hierarchical data with expandable rows. Click the chevron to expand/collapse.
        </p>
        <DataGrid<TreeItem>
          data={treeData}
          columns={treeColumns}
          enableExpanding
          enablePagination={false}
          enableSorting={false}
          showToolbar={false}
          getSubRows={(row) => row.children}
          getRowId={(row) => String(row.id)}
          initialState={{ expanded: { '0': true, '0.0': true } }}
        />
      </section>

      {/* ─── Loading State ─── */}
      <section className={s.section}>
        <h2 className={s.sectionTitle}>Loading State</h2>
        <p className={s.sectionDesc}>
          Skeleton loading animation while data is being fetched.
        </p>
        <DataGrid<Employee>
          data={[]}
          columns={minimalColumns}
          loading
          loadingRows={5}
          enablePagination={false}
          showToolbar={false}
        />
      </section>

      {/* ─── Empty State ─── */}
      <section className={s.section}>
        <h2 className={s.sectionTitle}>Empty State</h2>
        <p className={s.sectionDesc}>
          Custom empty message when no data matches filters.
        </p>
        <DataGrid<Employee>
          data={[]}
          columns={minimalColumns}
          enablePagination={false}
          emptyMessage="No employees found. Try adjusting your filters."
        />
      </section>
    </div>
  );
}
