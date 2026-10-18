import type React from 'react';

/**
 * Minimal stand-in for the design-system DataGrid. It honours the parts of the real
 * contract the dashboard relies on: `columns[].header`, `accessorKey`, and
 * `cell({ value, row: { original } })`. Everything else is ignored.
 */
export interface ColumnDef<TData = any> {
  id: string;
  header?: string;
  accessorKey?: string;
  cell?: (ctx: { value: any; row: { original: TData; index: number } }) => React.ReactNode;
  [key: string]: unknown;
}

interface DataGridProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  [key: string]: unknown;
}

export function DataGrid<TData>({ data, columns }: DataGridProps<TData>): React.ReactElement {
  return (
    <table data-testid="data-grid">
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c.id}>{c.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((c) => {
              const value = c.accessorKey ? (row as any)[c.accessorKey] : undefined;
              return (
                <td key={c.id}>
                  {c.cell ? c.cell({ value, row: { original: row, index } }) : String(value ?? '')}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
