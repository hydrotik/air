/* ─── DataGrid Types ──────────────────────────────────────────────────────── */

import React from 'react';

// ─── Utility types ─────────────────────────────────────────────────────────

export type Updater<T> = T | ((old: T) => T);
export type OnChangeFn<T> = (updaterOrValue: Updater<T>) => void;
export type SortDirection = 'asc' | 'desc';

// ─── Column Definition ─────────────────────────────────────────────────────

export interface ColumnDef<TData = any> {
  /** Unique column identifier */
  id: string;
  /** Header text or render function */
  header?: string | ((ctx: HeaderContext<TData>) => React.ReactNode);
  /** Accessor key (dot-notation supported for nested objects) */
  accessorKey?: string;
  /** Accessor function for computed values */
  accessorFn?: (row: TData, index: number) => any;
  /** Custom cell renderer */
  cell?: (ctx: CellContext<TData>) => React.ReactNode;
  /** Footer renderer */
  footer?: string | ((ctx: HeaderContext<TData>) => React.ReactNode);
  /** Enable/disable sorting for this column. Default: true */
  enableSorting?: boolean;
  /** Enable/disable filtering for this column. Default: true */
  enableFiltering?: boolean;
  /** Enable/disable resizing for this column. Default: true */
  enableResizing?: boolean;
  /** Enable/disable hiding for this column. Default: true */
  enableHiding?: boolean;
  /** Custom filter function */
  filterFn?: FilterFn<TData>;
  /** Custom sorting function */
  sortingFn?: SortingFn<TData>;
  /** Sort descending first. Default: false */
  sortDescFirst?: boolean;
  /** Default column width in px */
  size?: number;
  /** Min column width in px */
  minSize?: number;
  /** Max column width in px */
  maxSize?: number;
  /** Pin column to 'left' or 'right' */
  pin?: 'left' | 'right';
  /** Horizontal alignment */
  align?: 'left' | 'center' | 'right';
  /** Child columns for grouped headers */
  columns?: ColumnDef<TData>[];
  /** Aggregate function for grouped rows */
  aggregateFn?: AggregateFn;
  /** Custom CSS class for cells in this column */
  cellClassName?: string;
  /** Custom CSS class for the header */
  headerClassName?: string;
  /** Whether this column is editable */
  editable?: boolean;
  /** Editor component for inline editing */
  editor?: (ctx: CellContext<TData>) => React.ReactNode;
}

// ─── Contexts ───────────────────────────────────────────────────────────────

export interface HeaderContext<TData = any> {
  column: ResolvedColumn<TData>;
  table: DataGridInstance<TData>;
}

export interface CellContext<TData = any> {
  row: Row<TData>;
  column: ResolvedColumn<TData>;
  value: any;
  table: DataGridInstance<TData>;
  getValue: () => any;
  renderValue: () => any;
}

// ─── Resolved Column (runtime) ──────────────────────────────────────────────

export interface ResolvedColumn<TData = any> extends ColumnDef<TData> {
  /** Resolved accessor function */
  getAccessorFn: () => ((row: TData, index: number) => any) | undefined;
  /** Get current column size */
  getSize: () => number;
  /** Get current sort direction or false */
  getIsSorted: () => false | SortDirection;
  /** Get sort index in multi-sort */
  getSortIndex: () => number;
  /** Toggle sorting */
  toggleSorting: (desc?: boolean, multi?: boolean) => void;
  /** Whether column can be sorted */
  getCanSort: () => boolean;
  /** Whether column can be resized */
  getCanResize: () => boolean;
  /** Whether column can be filtered */
  getCanFilter: () => boolean;
  /** Whether column is visible */
  getIsVisible: () => boolean;
  /** Toggle column visibility */
  toggleVisibility: (value?: boolean) => void;
  /** Get current filter value */
  getFilterValue: () => any;
  /** Set filter value */
  setFilterValue: (value: any) => void;
  /** Column depth (for grouped headers) */
  depth: number;
  /** Parent column (if grouped) */
  parent?: ResolvedColumn<TData>;
  /** Child columns (if grouped) */
  childColumns: ResolvedColumn<TData>[];
  /** Leaf columns (flattened) */
  getLeafColumns: () => ResolvedColumn<TData>[];
}

// ─── Row ────────────────────────────────────────────────────────────────────

export interface Row<TData = any> {
  /** Unique row id */
  id: string;
  /** Row index in current view */
  index: number;
  /** Original data */
  original: TData;
  /** Get value for column */
  getValue: (columnId: string) => any;
  /** Get render value (with fallback) */
  renderValue: (columnId: string) => any;
  /** Whether row is selected */
  getIsSelected: () => boolean;
  /** Toggle selection */
  toggleSelected: (value?: boolean) => void;
  /** Whether row is expanded */
  getIsExpanded: () => boolean;
  /** Toggle expansion */
  toggleExpanded: (value?: boolean) => void;
  /** Sub-rows (for tree/grouping) */
  subRows: Row<TData>[];
  /** Depth for nested rows */
  depth: number;
  /** Parent row */
  parentRow?: Row<TData>;
  /** Whether this row can be selected */
  getCanSelect: () => boolean;
  /** Whether row is being edited */
  getIsEditing: () => boolean;
}

// ─── Sorting ────────────────────────────────────────────────────────────────

export interface ColumnSort {
  id: string;
  desc: boolean;
}

export type SortingState = ColumnSort[];

export type SortingFn<TData = any> = (
  rowA: Row<TData>,
  rowB: Row<TData>,
  columnId: string,
) => number;

// ─── Filtering ──────────────────────────────────────────────────────────────

export interface ColumnFilter {
  id: string;
  value: any;
}

export type ColumnFiltersState = ColumnFilter[];

export type FilterFn<TData = any> = (
  row: Row<TData>,
  columnId: string,
  filterValue: any,
) => boolean;

// ─── Pagination ─────────────────────────────────────────────────────────────

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

// ─── Selection ──────────────────────────────────────────────────────────────

export type RowSelectionState = Record<string, boolean>;

// ─── Column Visibility ──────────────────────────────────────────────────────

export type ColumnVisibilityState = Record<string, boolean>;

// ─── Column Sizing ──────────────────────────────────────────────────────────

export type ColumnSizingState = Record<string, number>;

export interface ColumnSizingInfoState {
  isResizingColumn: false | string;
  startOffset: number | null;
  startSize: number | null;
  deltaOffset: number | null;
  columnSizingStart: [string, number][];
}

// ─── Column Ordering ────────────────────────────────────────────────────────

export type ColumnOrderState = string[];

// ─── Expanded ───────────────────────────────────────────────────────────────

export type ExpandedState = Record<string, boolean> | true;

// ─── Editing ────────────────────────────────────────────────────────────────

export interface EditingState {
  rowId: string | null;
  columnId: string | null;
}

// ─── Grouping ───────────────────────────────────────────────────────────────

export type GroupingState = string[];

export type AggregateFn = (
  columnId: string,
  leafRows: Row[],
  childRows: Row[],
) => any;

// ─── Global Filter ──────────────────────────────────────────────────────────

export type GlobalFilterState = string;

// ─── Combined State ─────────────────────────────────────────────────────────

export interface DataGridState {
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  globalFilter: GlobalFilterState;
  pagination: PaginationState;
  rowSelection: RowSelectionState;
  columnVisibility: ColumnVisibilityState;
  columnSizing: ColumnSizingState;
  columnSizingInfo: ColumnSizingInfoState;
  columnOrder: ColumnOrderState;
  expanded: ExpandedState;
  editing: EditingState;
  grouping: GroupingState;
}

// ─── Row Model ──────────────────────────────────────────────────────────────

export interface RowModel<TData = any> {
  rows: Row<TData>[];
  flatRows: Row<TData>[];
  rowsById: Record<string, Row<TData>>;
}

// ─── DataGrid Options ───────────────────────────────────────────────────────

export interface DataGridOptions<TData = any> {
  /** Column definitions */
  columns: ColumnDef<TData>[];
  /** Data array */
  data: TData[];
  /** Derive row ID from data */
  getRowId?: (row: TData, index: number, parent?: Row<TData>) => string;
  /** Get sub-rows for tree data */
  getSubRows?: (row: TData) => TData[] | undefined;
  /** Initial state */
  initialState?: Partial<DataGridState>;

  // ─── Sorting ────────────────────────────────────────────────
  enableSorting?: boolean;
  enableMultiSort?: boolean;
  manualSorting?: boolean;
  onSortingChange?: OnChangeFn<SortingState>;
  sortDescFirst?: boolean;
  maxMultiSortColCount?: number;

  // ─── Filtering ──────────────────────────────────────────────
  enableColumnFilters?: boolean;
  enableGlobalFilter?: boolean;
  manualFiltering?: boolean;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
  onGlobalFilterChange?: OnChangeFn<GlobalFilterState>;
  globalFilterFn?: FilterFn<TData>;

  // ─── Pagination ─────────────────────────────────────────────
  enablePagination?: boolean;
  manualPagination?: boolean;
  onPaginationChange?: OnChangeFn<PaginationState>;
  pageCount?: number;
  rowCount?: number;
  pageSizeOptions?: number[];

  // ─── Selection ──────────────────────────────────────────────
  enableRowSelection?: boolean | ((row: Row<TData>) => boolean);
  enableMultiRowSelection?: boolean;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;

  // ─── Column Visibility ──────────────────────────────────────
  enableColumnVisibility?: boolean;
  onColumnVisibilityChange?: OnChangeFn<ColumnVisibilityState>;

  // ─── Column Sizing ──────────────────────────────────────────
  enableColumnResizing?: boolean;
  columnResizeMode?: 'onChange' | 'onEnd';
  onColumnSizingChange?: OnChangeFn<ColumnSizingState>;
  onColumnSizingInfoChange?: OnChangeFn<ColumnSizingInfoState>;

  // ─── Column Ordering ────────────────────────────────────────
  enableColumnOrdering?: boolean;
  onColumnOrderChange?: OnChangeFn<ColumnOrderState>;

  // ─── Expansion ──────────────────────────────────────────────
  enableExpanding?: boolean;
  onExpandedChange?: OnChangeFn<ExpandedState>;

  // ─── Editing ────────────────────────────────────────────────
  enableEditing?: boolean;
  onEditingChange?: OnChangeFn<EditingState>;
  onCellEdit?: (rowId: string, columnId: string, value: any) => void;

  // ─── Grouping ───────────────────────────────────────────────
  enableGrouping?: boolean;
  onGroupingChange?: OnChangeFn<GroupingState>;

  // ─── State management ───────────────────────────────────────
  state?: Partial<DataGridState>;
  onStateChange?: (updater: Updater<DataGridState>) => void;

  // ─── Rendering ──────────────────────────────────────────────
  renderFallbackValue?: any;
  defaultColumn?: Partial<ColumnDef<TData>>;
  meta?: Record<string, any>;
}

// ─── DataGrid Instance ──────────────────────────────────────────────────────

export interface DataGridInstance<TData = any> {
  // ─── Options ────────────────────────────────────────────────
  options: DataGridOptions<TData>;

  // ─── State ──────────────────────────────────────────────────
  getState: () => DataGridState;
  setState: (updater: Updater<DataGridState>) => void;
  initialState: DataGridState;
  reset: () => void;

  // ─── Columns ────────────────────────────────────────────────
  getAllColumns: () => ResolvedColumn<TData>[];
  getAllFlatColumns: () => ResolvedColumn<TData>[];
  getAllLeafColumns: () => ResolvedColumn<TData>[];
  getVisibleLeafColumns: () => ResolvedColumn<TData>[];
  getColumn: (id: string) => ResolvedColumn<TData> | undefined;
  getHeaderGroups: () => HeaderGroup<TData>[];

  // ─── Rows ───────────────────────────────────────────────────
  getCoreRowModel: () => RowModel<TData>;
  getRowModel: () => RowModel<TData>;
  getFilteredRowModel: () => RowModel<TData>;
  getSortedRowModel: () => RowModel<TData>;
  getPaginatedRowModel: () => RowModel<TData>;
  getRow: (id: string) => Row<TData>;
  getPrePaginationRowModel: () => RowModel<TData>;

  // ─── Sorting ────────────────────────────────────────────────
  setSorting: (updater: Updater<SortingState>) => void;
  resetSorting: () => void;

  // ─── Filtering ──────────────────────────────────────────────
  setColumnFilters: (updater: Updater<ColumnFiltersState>) => void;
  resetColumnFilters: () => void;
  setGlobalFilter: (value: string) => void;
  resetGlobalFilter: () => void;

  // ─── Pagination ─────────────────────────────────────────────
  setPagination: (updater: Updater<PaginationState>) => void;
  setPageIndex: (updater: Updater<number>) => void;
  setPageSize: (updater: Updater<number>) => void;
  getPageCount: () => number;
  getCanPreviousPage: () => boolean;
  getCanNextPage: () => boolean;
  previousPage: () => void;
  nextPage: () => void;
  firstPage: () => void;
  lastPage: () => void;
  resetPagination: () => void;

  // ─── Selection ──────────────────────────────────────────────
  setRowSelection: (updater: Updater<RowSelectionState>) => void;
  resetRowSelection: () => void;
  getIsAllRowsSelected: () => boolean;
  getIsAllPageRowsSelected: () => boolean;
  getIsSomeRowsSelected: () => boolean;
  getIsSomePageRowsSelected: () => boolean;
  toggleAllRowsSelected: (value?: boolean) => void;
  toggleAllPageRowsSelected: (value?: boolean) => void;
  getSelectedRowModel: () => RowModel<TData>;

  // ─── Column Visibility ──────────────────────────────────────
  setColumnVisibility: (updater: Updater<ColumnVisibilityState>) => void;
  resetColumnVisibility: () => void;

  // ─── Column Sizing ──────────────────────────────────────────
  setColumnSizing: (updater: Updater<ColumnSizingState>) => void;
  setColumnSizingInfo: (updater: Updater<ColumnSizingInfoState>) => void;
  resetColumnSizing: () => void;
  getTotalSize: () => number;

  // ─── Column Ordering ────────────────────────────────────────
  setColumnOrder: (updater: Updater<ColumnOrderState>) => void;
  resetColumnOrder: () => void;

  // ─── Expansion ──────────────────────────────────────────────
  setExpanded: (updater: Updater<ExpandedState>) => void;
  resetExpanded: () => void;
  toggleAllRowsExpanded: (value?: boolean) => void;
  getIsAllRowsExpanded: () => boolean;
  getExpandedDepth: () => number;

  // ─── Editing ────────────────────────────────────────────────
  setEditing: (updater: Updater<EditingState>) => void;
  startEditing: (rowId: string, columnId: string) => void;
  stopEditing: () => void;

  // ─── Grouping ───────────────────────────────────────────────
  setGrouping: (updater: Updater<GroupingState>) => void;
  resetGrouping: () => void;
}

// ─── Header Groups ──────────────────────────────────────────────────────────

export interface HeaderGroup<TData = any> {
  id: string;
  depth: number;
  headers: ResolvedColumn<TData>[];
}
