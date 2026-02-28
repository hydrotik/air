/* ─── DataGrid Core Engine (headless) ─────────────────────────────────────── */
/* Inspired by TanStack Table's architecture + AG Grid's feature depth.       */

import type {
  DataGridOptions,
  DataGridInstance,
  DataGridState,
  ColumnDef,
  ResolvedColumn,
  Row,
  RowModel,
  HeaderGroup,
  SortingState,
  ColumnFiltersState,
  PaginationState,
  RowSelectionState,
  ColumnVisibilityState,
  ColumnSizingState,
  ColumnSizingInfoState,
  ColumnOrderState,
  ExpandedState,
  EditingState,
  GroupingState,
  GlobalFilterState,
  Updater,
  SortDirection,
  CellContext,
  HeaderContext,
  SortingFn,
  FilterFn,
} from './types';

// ─── Utility ────────────────────────────────────────────────────────────────

function functionalUpdate<T>(updater: Updater<T>, old: T): T {
  return typeof updater === 'function'
    ? (updater as (old: T) => T)(old)
    : updater;
}

function getDeepValue(obj: any, path: string): any {
  return path.split('.').reduce((acc, part) => acc?.[part], obj);
}

// ─── Built-in Sorting Functions ─────────────────────────────────────────────

const sortingFns: Record<string, SortingFn> = {
  alphanumeric: (rowA, rowB, columnId) => {
    const a = String(rowA.getValue(columnId) ?? '').toLowerCase();
    const b = String(rowB.getValue(columnId) ?? '').toLowerCase();
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
  },
  text: (rowA, rowB, columnId) => {
    const a = String(rowA.getValue(columnId) ?? '').toLowerCase();
    const b = String(rowB.getValue(columnId) ?? '').toLowerCase();
    return a < b ? -1 : a > b ? 1 : 0;
  },
  datetime: (rowA, rowB, columnId) => {
    const a = rowA.getValue(columnId);
    const b = rowB.getValue(columnId);
    return (a instanceof Date ? a.getTime() : Number(a) || 0) -
      (b instanceof Date ? b.getTime() : Number(b) || 0);
  },
  basic: (rowA, rowB, columnId) => {
    const a = rowA.getValue(columnId);
    const b = rowB.getValue(columnId);
    return a < b ? -1 : a > b ? 1 : 0;
  },
};

// ─── Built-in Filter Functions ──────────────────────────────────────────────

const filterFns: Record<string, FilterFn> = {
  includesString: (row, columnId, filterValue) => {
    const val = String(row.getValue(columnId) ?? '').toLowerCase();
    return val.includes(String(filterValue).toLowerCase());
  },
  equalsString: (row, columnId, filterValue) => {
    const val = String(row.getValue(columnId) ?? '').toLowerCase();
    return val === String(filterValue).toLowerCase();
  },
  inNumberRange: (row, columnId, filterValue) => {
    const val = Number(row.getValue(columnId));
    const [min, max] = filterValue as [number, number];
    return (min === undefined || val >= min) && (max === undefined || val <= max);
  },
  equals: (row, columnId, filterValue) => {
    return row.getValue(columnId) === filterValue;
  },
  arrIncludes: (row, columnId, filterValue) => {
    const val = row.getValue(columnId);
    return Array.isArray(val) && val.includes(filterValue);
  },
};

// ─── Default State ──────────────────────────────────────────────────────────

function getDefaultState(): DataGridState {
  return {
    sorting: [],
    columnFilters: [],
    globalFilter: '',
    pagination: { pageIndex: 0, pageSize: 10 },
    rowSelection: {},
    columnVisibility: {},
    columnSizing: {},
    columnSizingInfo: {
      isResizingColumn: false,
      startOffset: null,
      startSize: null,
      deltaOffset: null,
      columnSizingStart: [],
    },
    columnOrder: [],
    expanded: {},
    editing: { rowId: null, columnId: null },
    grouping: [],
  };
}

// ─── Default Column ─────────────────────────────────────────────────────────

const DEFAULT_COLUMN_SIZE = 150;
const DEFAULT_MIN_SIZE = 40;
const DEFAULT_MAX_SIZE = Number.MAX_SAFE_INTEGER;

// ─── Column Resolution ─────────────────────────────────────────────────────

function resolveColumns<TData>(
  columnDefs: ColumnDef<TData>[],
  table: DataGridInstance<TData>,
  depth = 0,
  parent?: ResolvedColumn<TData>,
): ResolvedColumn<TData>[] {
  const defaultColumn = table.options.defaultColumn ?? {};

  return columnDefs.map((def) => {
    const merged = { ...defaultColumn, ...def };

    // Build accessor function
    let accessorFn: ((row: TData, index: number) => any) | undefined;
    if (merged.accessorFn) {
      accessorFn = merged.accessorFn;
    } else if (merged.accessorKey) {
      const key = merged.accessorKey;
      accessorFn = key.includes('.')
        ? (row) => getDeepValue(row, key)
        : (row) => (row as any)[key];
    }

    const column: ResolvedColumn<TData> = {
      ...merged,
      depth,
      parent,
      childColumns: [],

      getAccessorFn: () => accessorFn,

      getSize: () => {
        const sizing = table.getState().columnSizing;
        return Math.min(
          Math.max(
            merged.minSize ?? DEFAULT_MIN_SIZE,
            sizing[merged.id] ?? merged.size ?? DEFAULT_COLUMN_SIZE,
          ),
          merged.maxSize ?? DEFAULT_MAX_SIZE,
        );
      },

      getIsSorted: () => {
        const sort = table.getState().sorting.find((s) => s.id === merged.id);
        return sort ? (sort.desc ? 'desc' : 'asc') : false;
      },

      getSortIndex: () =>
        table.getState().sorting.findIndex((s) => s.id === merged.id),

      toggleSorting: (desc, multi) => {
        const enableSorting = merged.enableSorting ?? table.options.enableSorting ?? true;
        if (!enableSorting || !accessorFn) return;

        table.setSorting((old) => {
          const existingIdx = old.findIndex((s) => s.id === merged.id);
          const existing = existingIdx >= 0 ? old[existingIdx] : null;
          const nextDesc = desc ?? (existing ? !existing.desc : (merged.sortDescFirst ?? false));

          if (multi && (table.options.enableMultiSort ?? true)) {
            if (existing) {
              // If already sorted, toggle direction, or remove if cycling back
              if (desc === undefined && existing.desc === nextDesc) {
                return old.filter((s) => s.id !== merged.id);
              }
              return old.map((s) => s.id === merged.id ? { ...s, desc: nextDesc } : s);
            }
            const newSorting = [...old, { id: merged.id, desc: nextDesc }];
            const maxCols = table.options.maxMultiSortColCount ?? Infinity;
            return newSorting.slice(-maxCols);
          }
          // Single sort
          if (existing && desc === undefined) {
            // cycle: asc -> desc -> none
            if (existing.desc) {
              return [];
            }
            return [{ id: merged.id, desc: true }];
          }
          return [{ id: merged.id, desc: nextDesc }];
        });
      },

      getCanSort: () =>
        (merged.enableSorting ?? true) &&
        (table.options.enableSorting ?? true) &&
        !!accessorFn,

      getCanResize: () =>
        (merged.enableResizing ?? true) &&
        (table.options.enableColumnResizing ?? true),

      getCanFilter: () =>
        (merged.enableFiltering ?? true) &&
        (table.options.enableColumnFilters ?? true) &&
        !!accessorFn,

      getIsVisible: () => {
        const visibility = table.getState().columnVisibility;
        return visibility[merged.id] !== false;
      },

      toggleVisibility: (value) => {
        table.setColumnVisibility((old) => ({
          ...old,
          [merged.id]: value ?? !column.getIsVisible(),
        }));
      },

      getFilterValue: () =>
        table.getState().columnFilters.find((f) => f.id === merged.id)?.value,

      setFilterValue: (value) => {
        table.setColumnFilters((old) => {
          const existing = old.find((f) => f.id === merged.id);
          if (value === undefined || value === '' || value === null) {
            return old.filter((f) => f.id !== merged.id);
          }
          if (existing) {
            return old.map((f) => f.id === merged.id ? { ...f, value } : f);
          }
          return [...old, { id: merged.id, value }];
        });
      },

      getLeafColumns: () => {
        if (column.childColumns.length) {
          return column.childColumns.flatMap((c) => c.getLeafColumns());
        }
        return [column];
      },
    };

    // Resolve child columns (grouped headers)
    if (merged.columns?.length) {
      column.childColumns = resolveColumns(merged.columns, table, depth + 1, column);
    }

    return column;
  });
}

// ─── Row Creation ───────────────────────────────────────────────────────────

function createRow<TData>(
  table: DataGridInstance<TData>,
  original: TData,
  index: number,
  id: string,
  depth: number,
  parentRow?: Row<TData>,
  subRows: Row<TData>[] = [],
): Row<TData> {
  const columns = table.getAllFlatColumns();
  const valueCache: Record<string, any> = {};

  const row: Row<TData> = {
    id,
    index,
    original,
    depth,
    parentRow,
    subRows,

    getValue: (columnId) => {
      if (columnId in valueCache) return valueCache[columnId];
      const col = columns.find((c) => c.id === columnId);
      const accessor = col?.getAccessorFn();
      const value = accessor ? accessor(original, index) : undefined;
      valueCache[columnId] = value;
      return value;
    },

    renderValue: (columnId) => {
      const value = row.getValue(columnId);
      return value ?? table.options.renderFallbackValue ?? null;
    },

    getIsSelected: () => {
      return table.getState().rowSelection[id] ?? false;
    },

    toggleSelected: (value) => {
      const enableSelection = table.options.enableRowSelection;
      if (enableSelection === false) return;
      if (typeof enableSelection === 'function' && !enableSelection(row)) return;

      table.setRowSelection((old) => {
        const newValue = value ?? !old[id];
        if (newValue) {
          if (table.options.enableMultiRowSelection === false) {
            return { [id]: true };
          }
          return { ...old, [id]: true };
        }
        const { [id]: _, ...rest } = old;
        return rest;
      });
    },

    getIsExpanded: () => {
      const expanded = table.getState().expanded;
      if (expanded === true) return true;
      return (expanded as Record<string, boolean>)[id] ?? false;
    },

    toggleExpanded: (value) => {
      table.setExpanded((old) => {
        if (old === true) {
          // All expanded; toggling one off means all-but-this
          return { [id]: value ?? false };
        }
        const newValue = value ?? !old[id];
        if (newValue) {
          return { ...old, [id]: true };
        }
        const { [id]: _, ...rest } = old;
        return rest;
      });
    },

    getCanSelect: () => {
      const opt = table.options.enableRowSelection;
      if (opt === false) return false;
      if (typeof opt === 'function') return opt(row);
      return true;
    },

    getIsEditing: () => {
      const editing = table.getState().editing;
      return editing.rowId === id;
    },
  };

  return row;
}

// ─── Row Model Pipeline ─────────────────────────────────────────────────────

function buildCoreRowModel<TData>(table: DataGridInstance<TData>): RowModel<TData> {
  const data = table.options.data;
  const getRowId = table.options.getRowId;
  const getSubRows = table.options.getSubRows;

  const rows: Row<TData>[] = [];
  const flatRows: Row<TData>[] = [];
  const rowsById: Record<string, Row<TData>> = {};

  const buildRows = (data: TData[], depth: number, parentRow?: Row<TData>) => {
    return data.map((original, index) => {
      const id = getRowId
        ? getRowId(original, index, parentRow)
        : parentRow
        ? `${parentRow.id}.${index}`
        : String(index);

      const row = createRow(table, original, index, id, depth, parentRow);
      flatRows.push(row);
      rowsById[id] = row;

      // Sub-rows
      const subData = getSubRows?.(original);
      if (subData?.length) {
        row.subRows = buildRows(subData, depth + 1, row);
      }

      return row;
    });
  };

  const builtRows = buildRows(data, 0);
  rows.push(...builtRows);

  return { rows, flatRows, rowsById };
}

function buildFilteredRowModel<TData>(table: DataGridInstance<TData>): RowModel<TData> {
  if (table.options.manualFiltering) return table.getCoreRowModel();

  const coreModel = table.getCoreRowModel();
  const columnFilters = table.getState().columnFilters;
  const globalFilter = table.getState().globalFilter;
  const columns = table.getAllFlatColumns();

  if (!columnFilters.length && !globalFilter) {
    return coreModel;
  }

  // Build resolved filter functions
  const resolvedFilters = columnFilters
    .map((filter) => {
      const col = columns.find((c) => c.id === filter.id);
      if (!col) return null;
      const fn = col.filterFn ?? filterFns.includesString;
      return { column: col, filterFn: fn, value: filter.value };
    })
    .filter(Boolean) as { column: ResolvedColumn<TData>; filterFn: FilterFn<TData>; value: any }[];

  const globalFilterFn = table.options.globalFilterFn ?? filterFns.includesString;

  const filterRow = (row: Row<TData>): boolean => {
    // Column filters
    for (const f of resolvedFilters) {
      if (!f.filterFn(row, f.column.id, f.value)) return false;
    }
    // Global filter
    if (globalFilter) {
      const matchesGlobal = columns.some((col) => {
        if (!col.getAccessorFn()) return false;
        return globalFilterFn(row, col.id, globalFilter);
      });
      if (!matchesGlobal) return false;
    }
    return true;
  };

  const filteredRows: Row<TData>[] = [];
  const filteredFlatRows: Row<TData>[] = [];
  const filteredById: Record<string, Row<TData>> = {};

  const recurse = (rows: Row<TData>[]): Row<TData>[] => {
    return rows.filter((row) => {
      // Check sub-rows first (keep parent if any child passes)
      let subRowsPass = false;
      if (row.subRows.length) {
        const filteredSubs = recurse(row.subRows);
        if (filteredSubs.length) {
          subRowsPass = true;
          row = { ...row, subRows: filteredSubs };
        }
      }

      const passes = subRowsPass || filterRow(row);
      if (passes) {
        filteredFlatRows.push(row);
        filteredById[row.id] = row;
      }
      return passes;
    });
  };

  filteredRows.push(...recurse(coreModel.rows));

  return { rows: filteredRows, flatRows: filteredFlatRows, rowsById: filteredById };
}

function buildSortedRowModel<TData>(table: DataGridInstance<TData>): RowModel<TData> {
  if (table.options.manualSorting) return table.getFilteredRowModel();

  const filteredModel = table.getFilteredRowModel();
  const sorting = table.getState().sorting;

  if (!sorting.length) return filteredModel;

  const columns = table.getAllFlatColumns();

  const sortRow = (rowA: Row<TData>, rowB: Row<TData>): number => {
    for (const sort of sorting) {
      const col = columns.find((c) => c.id === sort.id);
      if (!col) continue;

      const sortFn = col.sortingFn ?? sortingFns.basic;
      const result = sortFn(rowA, rowB, sort.id);
      if (result !== 0) {
        return sort.desc ? -result : result;
      }
    }
    return 0;
  };

  const sortRows = (rows: Row<TData>[]): Row<TData>[] => {
    const sorted = [...rows].sort(sortRow);
    return sorted.map((row) => {
      if (row.subRows.length) {
        return { ...row, subRows: sortRows(row.subRows) };
      }
      return row;
    });
  };

  const sortedRows = sortRows(filteredModel.rows);
  const flatRows = flattenRows(sortedRows);
  const rowsById = Object.fromEntries(flatRows.map((r) => [r.id, r]));

  return { rows: sortedRows, flatRows, rowsById };
}

function buildPaginatedRowModel<TData>(table: DataGridInstance<TData>): RowModel<TData> {
  if (table.options.manualPagination || table.options.enablePagination === false) {
    return table.getSortedRowModel();
  }

  const sortedModel = table.getSortedRowModel();
  const { pageIndex, pageSize } = table.getState().pagination;
  const start = pageIndex * pageSize;
  const end = start + pageSize;

  const paginatedRows = sortedModel.rows.slice(start, end);
  const flatRows = flattenRows(paginatedRows);
  const rowsById = Object.fromEntries(flatRows.map((r) => [r.id, r]));

  return { rows: paginatedRows, flatRows, rowsById };
}

function flattenRows<TData>(rows: Row<TData>[]): Row<TData>[] {
  const result: Row<TData>[] = [];
  const recurse = (rows: Row<TData>[]) => {
    rows.forEach((row) => {
      result.push(row);
      if (row.subRows?.length && row.getIsExpanded()) {
        recurse(row.subRows);
      }
    });
  };
  recurse(rows);
  return result;
}

// ─── Create DataGrid Instance ───────────────────────────────────────────────

export function createDataGrid<TData>(
  options: DataGridOptions<TData>,
): DataGridInstance<TData> {
  // ─── State ────────────────────────────────────────────────
  const defaultState = getDefaultState();
  const initialState: DataGridState = {
    ...defaultState,
    ...options.initialState,
    pagination: {
      ...defaultState.pagination,
      ...options.initialState?.pagination,
    },
    columnSizingInfo: {
      ...defaultState.columnSizingInfo,
      ...options.initialState?.columnSizingInfo,
    },
    editing: {
      ...defaultState.editing,
      ...options.initialState?.editing,
    },
  };

  let _state = { ...initialState };

  // Merge external state
  const getState = (): DataGridState => ({
    ..._state,
    ...options.state,
  });

  const setState = (updater: Updater<DataGridState>) => {
    _state = functionalUpdate(updater, _state);
    options.onStateChange?.(updater);
  };

  // State helpers
  const makeUpdater = <K extends keyof DataGridState>(
    key: K,
    onChange?: (updater: Updater<DataGridState[K]>) => void,
  ) => {
    return (updater: Updater<DataGridState[K]>) => {
      if (onChange) {
        onChange(updater);
      } else {
        setState((old) => ({
          ...old,
          [key]: functionalUpdate(updater, old[key]),
        }));
      }
    };
  };

  // ─── Column caches ──────────────────────────────────────────
  let _allColumns: ResolvedColumn<TData>[] | null = null;
  let _flatColumns: ResolvedColumn<TData>[] | null = null;
  let _coreRowModel: RowModel<TData> | null = null;
  let _filteredRowModel: RowModel<TData> | null = null;
  let _sortedRowModel: RowModel<TData> | null = null;
  let _paginatedRowModel: RowModel<TData> | null = null;

  // ─── Build Instance ─────────────────────────────────────────
  const table: DataGridInstance<TData> = {
    options,
    initialState,
    getState,
    setState,
    reset: () => { _state = { ...initialState }; },

    // ── Columns ──
    getAllColumns: () => {
      if (!_allColumns) {
        _allColumns = resolveColumns(options.columns, table);
      }
      return _allColumns;
    },

    getAllFlatColumns: () => {
      if (!_flatColumns) {
        _flatColumns = table.getAllColumns().flatMap((c) => c.getLeafColumns());
      }
      return _flatColumns;
    },

    getAllLeafColumns: () => table.getAllFlatColumns(),

    getVisibleLeafColumns: () => {
      const order = getState().columnOrder;
      let cols = table.getAllLeafColumns().filter((c) => c.getIsVisible());
      if (order.length) {
        const ordered = order
          .map((id) => cols.find((c) => c.id === id))
          .filter(Boolean) as ResolvedColumn<TData>[];
        const remaining = cols.filter((c) => !order.includes(c.id));
        cols = [...ordered, ...remaining];
      }
      return cols;
    },

    getColumn: (id) => table.getAllFlatColumns().find((c) => c.id === id),

    getHeaderGroups: () => {
      const allColumns = table.getAllColumns();
      const maxDepth = Math.max(0, ...allColumns.map(getMaxDepth));

      const groups: HeaderGroup<TData>[] = [];
      for (let depth = 0; depth <= maxDepth; depth++) {
        const headers = getColumnsAtDepth(allColumns, depth, maxDepth);
        groups.push({ id: `header-${depth}`, depth, headers });
      }
      return groups;
    },

    // ── Row Models ──
    getCoreRowModel: () => {
      if (!_coreRowModel) {
        _coreRowModel = buildCoreRowModel(table);
      }
      return _coreRowModel;
    },

    getFilteredRowModel: () => {
      if (!_filteredRowModel) {
        _filteredRowModel = buildFilteredRowModel(table);
      }
      return _filteredRowModel;
    },

    getSortedRowModel: () => {
      if (!_sortedRowModel) {
        _sortedRowModel = buildSortedRowModel(table);
      }
      return _sortedRowModel;
    },

    getPaginatedRowModel: () => {
      if (!_paginatedRowModel) {
        _paginatedRowModel = buildPaginatedRowModel(table);
      }
      return _paginatedRowModel;
    },

    getRowModel: () => table.getPaginatedRowModel(),

    getPrePaginationRowModel: () => table.getSortedRowModel(),

    getRow: (id) => {
      const row = table.getRowModel().rowsById[id]
        ?? table.getCoreRowModel().rowsById[id];
      if (!row) throw new Error(`Row with id "${id}" not found`);
      return row;
    },

    // ── Sorting ──
    setSorting: makeUpdater('sorting', options.onSortingChange),
    resetSorting: () => table.setSorting(initialState.sorting),

    // ── Filtering ──
    setColumnFilters: makeUpdater('columnFilters', options.onColumnFiltersChange),
    resetColumnFilters: () => table.setColumnFilters([]),
    setGlobalFilter: (value) => {
      if (options.onGlobalFilterChange) {
        options.onGlobalFilterChange(() => value);
      } else {
        setState((old) => ({ ...old, globalFilter: value }));
      }
    },
    resetGlobalFilter: () => table.setGlobalFilter(''),

    // ── Pagination ──
    setPagination: makeUpdater('pagination', options.onPaginationChange),
    setPageIndex: (updater) => {
      table.setPagination((old) => {
        const newIndex = functionalUpdate(updater, old.pageIndex);
        const maxPage = Math.max(0, table.getPageCount() - 1);
        return { ...old, pageIndex: Math.max(0, Math.min(newIndex, maxPage)) };
      });
    },
    setPageSize: (updater) => {
      table.setPagination((old) => {
        const newSize = Math.max(1, functionalUpdate(updater, old.pageSize));
        const topRow = old.pageIndex * old.pageSize;
        return { ...old, pageSize: newSize, pageIndex: Math.floor(topRow / newSize) };
      });
    },
    getPageCount: () => {
      if (options.pageCount !== undefined) return options.pageCount;
      const totalRows = options.rowCount ?? table.getPrePaginationRowModel().rows.length;
      return Math.ceil(totalRows / getState().pagination.pageSize);
    },
    getCanPreviousPage: () => getState().pagination.pageIndex > 0,
    getCanNextPage: () => {
      const pc = table.getPageCount();
      return pc === -1 || getState().pagination.pageIndex < pc - 1;
    },
    previousPage: () => table.setPageIndex((old) => old - 1),
    nextPage: () => table.setPageIndex((old) => old + 1),
    firstPage: () => table.setPageIndex(0),
    lastPage: () => table.setPageIndex(table.getPageCount() - 1),
    resetPagination: () => table.setPagination(initialState.pagination),

    // ── Selection ──
    setRowSelection: makeUpdater('rowSelection', options.onRowSelectionChange),
    resetRowSelection: () => table.setRowSelection({}),

    getIsAllRowsSelected: () => {
      const rows = table.getFilteredRowModel().flatRows.filter((r) => r.getCanSelect());
      const selection = getState().rowSelection;
      return rows.length > 0 && rows.every((r) => selection[r.id]);
    },

    getIsAllPageRowsSelected: () => {
      const rows = table.getRowModel().flatRows.filter((r) => r.getCanSelect());
      const selection = getState().rowSelection;
      return rows.length > 0 && rows.every((r) => selection[r.id]);
    },

    getIsSomeRowsSelected: () => {
      const selection = getState().rowSelection;
      const count = Object.keys(selection).length;
      return count > 0 && !table.getIsAllRowsSelected();
    },

    getIsSomePageRowsSelected: () => {
      return !table.getIsAllPageRowsSelected() &&
        table.getRowModel().flatRows.some((r) => r.getIsSelected());
    },

    toggleAllRowsSelected: (value) => {
      const newValue = value ?? !table.getIsAllRowsSelected();
      table.setRowSelection(() => {
        if (!newValue) return {};
        const selection: RowSelectionState = {};
        table.getFilteredRowModel().flatRows.forEach((row) => {
          if (row.getCanSelect()) selection[row.id] = true;
        });
        return selection;
      });
    },

    toggleAllPageRowsSelected: (value) => {
      const newValue = value ?? !table.getIsAllPageRowsSelected();
      table.setRowSelection((old) => {
        const selection = { ...old };
        table.getRowModel().rows.forEach((row) => {
          if (row.getCanSelect()) {
            if (newValue) {
              selection[row.id] = true;
            } else {
              delete selection[row.id];
            }
          }
        });
        return selection;
      });
    },

    getSelectedRowModel: () => {
      const selection = getState().rowSelection;
      const coreModel = table.getCoreRowModel();
      const selectedRows = coreModel.flatRows.filter((r) => selection[r.id]);
      return {
        rows: selectedRows,
        flatRows: selectedRows,
        rowsById: Object.fromEntries(selectedRows.map((r) => [r.id, r])),
      };
    },

    // ── Column Visibility ──
    setColumnVisibility: makeUpdater('columnVisibility', options.onColumnVisibilityChange),
    resetColumnVisibility: () => table.setColumnVisibility({}),

    // ── Column Sizing ──
    setColumnSizing: makeUpdater('columnSizing', options.onColumnSizingChange),
    setColumnSizingInfo: makeUpdater('columnSizingInfo', options.onColumnSizingInfoChange),
    resetColumnSizing: () => table.setColumnSizing({}),
    getTotalSize: () =>
      table.getVisibleLeafColumns().reduce((sum, col) => sum + col.getSize(), 0),

    // ── Column Ordering ──
    setColumnOrder: makeUpdater('columnOrder', options.onColumnOrderChange),
    resetColumnOrder: () => table.setColumnOrder([]),

    // ── Expansion ──
    setExpanded: makeUpdater('expanded', options.onExpandedChange),
    resetExpanded: () => table.setExpanded({}),
    toggleAllRowsExpanded: (value) => {
      const newValue = value ?? !table.getIsAllRowsExpanded();
      if (newValue) {
        table.setExpanded(true);
      } else {
        table.setExpanded({});
      }
    },
    getIsAllRowsExpanded: () => {
      return table.getState().expanded === true;
    },
    getExpandedDepth: () => {
      const expanded = getState().expanded;
      if (expanded === true) return Infinity;
      return Object.keys(expanded).length ? 1 : 0;
    },

    // ── Editing ──
    setEditing: makeUpdater('editing', options.onEditingChange),
    startEditing: (rowId, columnId) => {
      table.setEditing(() => ({ rowId, columnId }));
    },
    stopEditing: () => {
      table.setEditing(() => ({ rowId: null, columnId: null }));
    },

    // ── Grouping ──
    setGrouping: makeUpdater('grouping', options.onGroupingChange),
    resetGrouping: () => table.setGrouping([]),
  };

  return table;
}

// ─── Header Group Helpers ───────────────────────────────────────────────────

function getMaxDepth<TData>(col: ResolvedColumn<TData>): number {
  if (!col.childColumns.length) return col.depth;
  return Math.max(...col.childColumns.map(getMaxDepth));
}

function getColumnsAtDepth<TData>(
  columns: ResolvedColumn<TData>[],
  targetDepth: number,
  maxDepth: number,
): ResolvedColumn<TData>[] {
  const result: ResolvedColumn<TData>[] = [];
  for (const col of columns) {
    if (col.depth === targetDepth) {
      result.push(col);
    } else if (col.childColumns.length) {
      result.push(...getColumnsAtDepth(col.childColumns, targetDepth, maxDepth));
    } else if (col.depth < targetDepth) {
      // Leaf column at lower depth: span it down
      result.push(col);
    }
  }
  return result;
}
