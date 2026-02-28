/* ─── useDataGrid — React hook for the DataGrid core engine ────────────────── */

import React from 'react';
import { createDataGrid } from './core';
import type {
  DataGridOptions,
  DataGridInstance,
  DataGridState,
  Updater,
} from './types';

/**
 * React hook that creates and manages a DataGrid instance.
 *
 * Inspired by TanStack Table's `useReactTable` — provides a headless,
 * fully typed table instance with automatic React state management.
 *
 * @example
 * ```tsx
 * const table = useDataGrid({
 *   data: myData,
 *   columns: myColumns,
 *   enableSorting: true,
 *   enablePagination: true,
 * });
 * ```
 */
export function useDataGrid<TData>(
  options: DataGridOptions<TData>,
): DataGridInstance<TData> {
  // Create the table instance once
  const [tableRef] = React.useState(() => ({
    current: createDataGrid<TData>({
      ...options,
      state: {},
      onStateChange: () => {},
    }),
  }));

  // Manage internal state via React's useState
  const [state, setState] = React.useState<DataGridState>(
    () => tableRef.current.initialState,
  );

  // Re-create the instance on every render with latest options + state
  // This is the same pattern as TanStack Table's useReactTable
  const table = React.useMemo(() => {
    const instance = createDataGrid<TData>({
      ...options,
      state: {
        ...state,
        ...options.state,
      },
      onStateChange: (updater: Updater<DataGridState>) => {
        setState((old) => {
          const newState = typeof updater === 'function'
            ? (updater as (old: DataGridState) => DataGridState)(old)
            : updater;
          return newState;
        });
        options.onStateChange?.(updater);
      },
      // Wire up individual state change handlers to update internal state
      onSortingChange: (updater) => {
        setState((old) => ({
          ...old,
          sorting: typeof updater === 'function' ? updater(old.sorting) : updater,
        }));
        options.onSortingChange?.(updater);
      },
      onColumnFiltersChange: (updater) => {
        setState((old) => ({
          ...old,
          columnFilters: typeof updater === 'function' ? updater(old.columnFilters) : updater,
          // Reset page to 0 when filter changes
          pagination: { ...old.pagination, pageIndex: 0 },
        }));
        options.onColumnFiltersChange?.(updater);
      },
      onGlobalFilterChange: (updater) => {
        setState((old) => ({
          ...old,
          globalFilter: typeof updater === 'function' ? updater(old.globalFilter) : updater,
          pagination: { ...old.pagination, pageIndex: 0 },
        }));
        options.onGlobalFilterChange?.(updater);
      },
      onPaginationChange: (updater) => {
        setState((old) => ({
          ...old,
          pagination: typeof updater === 'function' ? updater(old.pagination) : updater,
        }));
        options.onPaginationChange?.(updater);
      },
      onRowSelectionChange: (updater) => {
        setState((old) => ({
          ...old,
          rowSelection: typeof updater === 'function' ? updater(old.rowSelection) : updater,
        }));
        options.onRowSelectionChange?.(updater);
      },
      onColumnVisibilityChange: (updater) => {
        setState((old) => ({
          ...old,
          columnVisibility: typeof updater === 'function' ? updater(old.columnVisibility) : updater,
        }));
        options.onColumnVisibilityChange?.(updater);
      },
      onColumnSizingChange: (updater) => {
        setState((old) => ({
          ...old,
          columnSizing: typeof updater === 'function' ? updater(old.columnSizing) : updater,
        }));
        options.onColumnSizingChange?.(updater);
      },
      onColumnSizingInfoChange: (updater) => {
        setState((old) => ({
          ...old,
          columnSizingInfo: typeof updater === 'function' ? updater(old.columnSizingInfo) : updater,
        }));
        options.onColumnSizingInfoChange?.(updater);
      },
      onColumnOrderChange: (updater) => {
        setState((old) => ({
          ...old,
          columnOrder: typeof updater === 'function' ? updater(old.columnOrder) : updater,
        }));
        options.onColumnOrderChange?.(updater);
      },
      onExpandedChange: (updater) => {
        setState((old) => ({
          ...old,
          expanded: typeof updater === 'function' ? updater(old.expanded) : updater,
        }));
        options.onExpandedChange?.(updater);
      },
      onEditingChange: (updater) => {
        setState((old) => ({
          ...old,
          editing: typeof updater === 'function' ? updater(old.editing) : updater,
        }));
        options.onEditingChange?.(updater);
      },
      onGroupingChange: (updater) => {
        setState((old) => ({
          ...old,
          grouping: typeof updater === 'function' ? updater(old.grouping) : updater,
        }));
        options.onGroupingChange?.(updater);
      },
    });

    return instance;
  }, [options.columns, options.data, state, options.state]);

  return table;
}
