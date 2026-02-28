/* ─── DataGrid — Fully styled, feature-rich data grid component ───────────── */
/* Comparable to AG Grid: sorting, filtering, pagination, selection,           */
/* column resizing, column visibility, inline editing, row expansion,          */
/* pinned columns, status bar, and more. All styled with design tokens.        */

import React from 'react';
import { useDataGrid } from './useDataGrid';
import type {
  DataGridOptions,
  DataGridInstance,
  ResolvedColumn,
  Row,
  CellContext,
  HeaderContext,
  ColumnDef,
} from './types';
import * as s from './DataGrid.css';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../Select/Select';

// ─── Sub-Components ─────────────────────────────────────────────────────────

interface DataGridProps<TData = any> extends DataGridOptions<TData> {
  /** Maximum height of the grid body (enables scroll) */
  height?: string | number;
  /** Show the toolbar with search and controls. Default: true */
  showToolbar?: boolean;
  /** Show the status bar at the bottom. Default: false */
  showStatusBar?: boolean;
  /** Show the footer with pagination. Default: true when pagination enabled */
  showFooter?: boolean;
  /** Show column filter row. Default: false */
  showColumnFilters?: boolean;
  /** Custom empty state message */
  emptyMessage?: string;
  /** Show loading skeleton rows */
  loading?: boolean;
  /** Number of skeleton rows to show */
  loadingRows?: number;
  /** Custom class for container */
  className?: string;
  /** Custom toolbar content (left side) */
  toolbarLeft?: React.ReactNode;
  /** Custom toolbar content (right side) */
  toolbarRight?: React.ReactNode;
  /** CSS inline styles */
  style?: React.CSSProperties;
  /** Use external table instance instead of creating one */
  table?: DataGridInstance<TData>;
  /** Callback when a row is clicked */
  onRowClick?: (row: Row<TData>) => void;
  /** Callback when a row is double-clicked */
  onRowDoubleClick?: (row: Row<TData>) => void;

  /* ── Visual configuration ─────────────────────────────────── */

  /** Remove outer border and border-radius. Default: false */
  borderless?: boolean;
  /** Density: 'default' (standard), 'compact' (tighter rows/fonts), 'editorial' (high-density data journalism) */
  density?: 'default' | 'compact' | 'editorial';
  /** Header border style: 'thin' (1px), 'thick' (2px), 'none' */
  headerBorder?: 'thin' | 'thick' | 'none';
  /** Row separator style: 'full' (default), 'subtle' (barely visible), 'none' */
  rowSeparator?: 'full' | 'subtle' | 'none';
  /** Remove background fill from container (transparent). Default: false */
  transparent?: boolean;
  /** Disable hover highlight on rows. Default: false */
  noRowHover?: boolean;
}

// ─── Sort Icon ──────────────────────────────────────────────────────────────

function SortIndicator({ direction, index, showIndex }: {
  direction: false | 'asc' | 'desc';
  index: number;
  showIndex: boolean;
}) {
  if (!direction) {
    return (
      <svg className={s.sortIcon} width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 3L10 6.5H4L7 3Z" fill="currentColor" opacity="0.4" />
        <path d="M7 11L4 7.5H10L7 11Z" fill="currentColor" opacity="0.4" />
      </svg>
    );
  }

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      <svg
        className={`${s.sortIcon} ${s.sortIconActive}`}
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
      >
        {direction === 'asc' ? (
          <path d="M7 3L10 7.5H4L7 3Z" fill="currentColor" />
        ) : (
          <path d="M7 11L4 6.5H10L7 11Z" fill="currentColor" />
        )}
      </svg>
      {showIndex && index >= 0 && (
        <span className={s.sortIndex}>{index + 1}</span>
      )}
    </span>
  );
}

// ─── Resize Handle ──────────────────────────────────────────────────────────

function ResizeHandle({ column, table }: {
  column: ResolvedColumn;
  table: DataGridInstance;
}) {
  const isResizing = table.getState().columnSizingInfo.isResizingColumn === column.id;

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startSize = column.getSize();

    const onMouseMove = (e: MouseEvent) => {
      const delta = e.clientX - startX;
      table.setColumnSizing((old) => ({
        ...old,
        [column.id]: Math.max(column.minSize ?? 40, startSize + delta),
      }));
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      table.setColumnSizingInfo((old) => ({
        ...old,
        isResizingColumn: false,
      }));
    };

    table.setColumnSizingInfo((old) => ({
      ...old,
      isResizingColumn: column.id,
      startOffset: startX,
      startSize,
    }));

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      className={s.resizeHandle}
      data-resizing={isResizing}
      onMouseDown={onMouseDown}
    />
  );
}

// ─── Checkbox Cell ──────────────────────────────────────────────────────────

function SelectAllCheckbox({ table }: { table: DataGridInstance }) {
  const isAll = table.getIsAllPageRowsSelected();
  const isSome = table.getIsSomePageRowsSelected();

  return (
    <input
      type="checkbox"
      className={s.checkbox}
      checked={isAll}
      data-indeterminate={isSome && !isAll ? 'true' : undefined}
      onChange={() => table.toggleAllPageRowsSelected()}
      aria-label="Select all rows"
    />
  );
}

function RowCheckbox({ row }: { row: Row }) {
  if (!row.getCanSelect()) return null;
  return (
    <input
      type="checkbox"
      className={s.checkbox}
      checked={row.getIsSelected()}
      onChange={() => row.toggleSelected()}
      aria-label={`Select row ${row.id}`}
    />
  );
}

// ─── Column Visibility Dropdown ─────────────────────────────────────────────

function ColumnVisibilityToggle({ table }: { table: DataGridInstance }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        className={s.toolbarButton}
        onClick={() => setOpen(!open)}
        aria-label="Toggle column visibility"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M1 3.5h12M1 7h12M1 10.5h12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        Columns
      </button>
      {open && (
        <div className={s.visibilityPanel}>
          {table.getAllLeafColumns().map((col) => (
            <label key={col.id} className={s.visibilityItem}>
              <input
                type="checkbox"
                className={s.checkbox}
                checked={col.getIsVisible()}
                onChange={() => col.toggleVisibility()}
              />
              {typeof col.header === 'string' ? col.header : col.id}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Header Cell ────────────────────────────────────────────────────────────

function HeaderCell({ column, table, showMultiSortIndex }: {
  column: ResolvedColumn;
  table: DataGridInstance;
  showMultiSortIndex: boolean;
}) {
  const canSort = column.getCanSort();
  const isSorted = column.getIsSorted();
  const canResize = column.getCanResize();
  const align = column.align ?? 'left';

  const headerContent = typeof column.header === 'function'
    ? column.header({ column, table })
    : column.header ?? column.id;

  const alignClass = align === 'center'
    ? s.cellAlignCenter
    : align === 'right'
    ? s.cellAlignRight
    : s.cellAlignLeft;

  const pinClass = column.pin === 'left'
    ? s.pinnedLeft
    : column.pin === 'right'
    ? s.pinnedRight
    : '';

  return (
    <th
      className={[
        s.headerCell,
        canSort ? s.headerCellSortable : '',
        alignClass,
        pinClass,
        column.headerClassName ?? '',
      ].filter(Boolean).join(' ')}
      style={{ width: column.getSize() }}
      onClick={canSort ? (e) => {
        column.toggleSorting(undefined, e.shiftKey);
      } : undefined}
      role={canSort ? 'button' : undefined}
      aria-sort={isSorted === 'asc' ? 'ascending' : isSorted === 'desc' ? 'descending' : 'none'}
    >
      <div className={s.headerCellContent}>
        <span className={s.headerCellText}>{headerContent}</span>
        {canSort && (
          <SortIndicator
            direction={isSorted}
            index={column.getSortIndex()}
            showIndex={showMultiSortIndex}
          />
        )}
      </div>
      {canResize && <ResizeHandle column={column} table={table} />}
    </th>
  );
}

// ─── Body Cell ──────────────────────────────────────────────────────────────

function BodyCell({ row, column, table }: {
  row: Row;
  column: ResolvedColumn;
  table: DataGridInstance;
}) {
  const value = row.getValue(column.id);
  const isEditing = table.getState().editing.rowId === row.id
    && table.getState().editing.columnId === column.id;

  const cellCtx: CellContext = {
    row,
    column,
    value,
    table,
    getValue: () => value,
    renderValue: () => row.renderValue(column.id),
  };

  const align = column.align ?? 'left';
  const alignClass = align === 'center'
    ? s.cellAlignCenter
    : align === 'right'
    ? s.cellAlignRight
    : s.cellAlignLeft;

  const pinClass = column.pin === 'left'
    ? s.pinnedLeft
    : column.pin === 'right'
    ? s.pinnedRight
    : '';

  let content: React.ReactNode;

  if (isEditing && column.editable) {
    if (column.editor) {
      content = column.editor(cellCtx);
    } else {
      content = (
        <DefaultCellEditor
          value={value}
          onSave={(newValue) => {
            table.options.onCellEdit?.(row.id, column.id, newValue);
            table.stopEditing();
          }}
          onCancel={() => table.stopEditing()}
        />
      );
    }
  } else if (column.cell) {
    content = column.cell(cellCtx);
  } else {
    content = row.renderValue(column.id)?.toString() ?? '';
  }

  return (
    <td
      className={[
        isEditing ? s.bodyCellEditing : s.bodyCell,
        alignClass,
        pinClass,
        column.cellClassName ?? '',
      ].filter(Boolean).join(' ')}
      style={{ width: column.getSize() }}
      onDoubleClick={
        column.editable && table.options.enableEditing
          ? () => table.startEditing(row.id, column.id)
          : undefined
      }
    >
      {content}
    </td>
  );
}

// ─── Default Cell Editor ────────────────────────────────────────────────────

function DefaultCellEditor({ value, onSave, onCancel }: {
  value: any;
  onSave: (value: any) => void;
  onCancel: () => void;
}) {
  const [editValue, setEditValue] = React.useState(String(value ?? ''));
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  return (
    <input
      ref={inputRef}
      className={s.editInput}
      value={editValue}
      onChange={(e) => setEditValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onSave(editValue);
        if (e.key === 'Escape') onCancel();
      }}
      onBlur={() => onSave(editValue)}
    />
  );
}

// ─── Expander Cell ──────────────────────────────────────────────────────────

function ExpanderCell({ row }: { row: Row }) {
  if (!row.subRows.length) return null;
  return (
    <button
      type="button"
      className={s.expanderButton}
      onClick={(e) => {
        e.stopPropagation();
        row.toggleExpanded();
      }}
      aria-label={row.getIsExpanded() ? 'Collapse row' : 'Expand row'}
    >
      <svg
        className={s.expanderIcon}
        data-expanded={row.getIsExpanded()}
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  );
}

// ─── Loading Skeleton ───────────────────────────────────────────────────────

function LoadingRows({ columnCount, rowCount }: { columnCount: number; rowCount: number }) {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, rowIdx) => (
        <tr key={rowIdx} className={s.loadingRow}>
          {Array.from({ length: columnCount }).map((_, colIdx) => (
            <td key={colIdx} className={s.loadingCell}>
              <div
                className={s.loadingSkeleton}
                style={{ width: `${40 + Math.random() * 40}%` }}
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

// ─── Status Bar ─────────────────────────────────────────────────────────────

function StatusBar({ table }: { table: DataGridInstance }) {
  const total = table.getPrePaginationRowModel().rows.length;
  const filtered = table.getFilteredRowModel().rows.length;
  const selected = Object.keys(table.getState().rowSelection).length;
  const { pageSize } = table.getState().pagination;

  return (
    <div className={s.statusBar}>
      <div className={s.statusBarItem}>
        <span className={s.statusBarLabel}>Rows:</span> {total}
      </div>
      {filtered !== total && (
        <div className={s.statusBarItem}>
          <span className={s.statusBarLabel}>Filtered:</span> {filtered}
        </div>
      )}
      {selected > 0 && (
        <div className={s.statusBarItem}>
          <span className={s.statusBarLabel}>Selected:</span> {selected}
        </div>
      )}
      <div className={s.statusBarItem}>
        <span className={s.statusBarLabel}>Page Size:</span> {pageSize}
      </div>
    </div>
  );
}

// ─── Pagination Footer ─────────────────────────────────────────────────────

function PaginationFooter({ table }: { table: DataGridInstance }) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const pageCount = table.getPageCount();
  const totalRows = table.getPrePaginationRowModel().rows.length;
  const selected = Object.keys(table.getState().rowSelection).length;
  const pageSizeOptions = table.options.pageSizeOptions ?? [10, 20, 50, 100];

  // Page numbers to display
  const maxButtons = 5;
  let startPage = Math.max(0, pageIndex - Math.floor(maxButtons / 2));
  const endPage = Math.min(pageCount, startPage + maxButtons);
  startPage = Math.max(0, endPage - maxButtons);

  return (
    <div className={s.footer}>
      <div className={s.footerLeft}>
        {selected > 0 && (
          <span>{selected} of {totalRows} row(s) selected</span>
        )}
        {selected === 0 && (
          <span>{totalRows} row(s)</span>
        )}
      </div>

      <div className={s.footerRight}>
        <span className={s.paginationInfo}>
          Rows per page:
        </span>
        <Select
          value={String(pageSize)}
          onValueChange={(val) => table.setPageSize(() => Number(val))}
        >
          <SelectTrigger className={s.pageSizeSelect}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((size) => (
              <SelectItem key={size} value={String(size)}>{size}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <span className={s.paginationInfo}>
          Page {pageIndex + 1} of {pageCount}
        </span>

        <button
          className={s.paginationButton}
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label="First page"
        >
          ⟨⟨
        </button>
        <button
          className={s.paginationButton}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label="Previous page"
        >
          ⟨
        </button>

        {Array.from({ length: endPage - startPage }).map((_, i) => {
          const page = startPage + i;
          return (
            <button
              key={page}
              className={s.paginationButton}
              data-active={page === pageIndex}
              onClick={() => table.setPageIndex(() => page)}
            >
              {page + 1}
            </button>
          );
        })}

        <button
          className={s.paginationButton}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          aria-label="Next page"
        >
          ⟩
        </button>
        <button
          className={s.paginationButton}
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
          aria-label="Last page"
        >
          ⟩⟩
        </button>
      </div>
    </div>
  );
}

// ─── Main DataGrid Component ────────────────────────────────────────────────

export function DataGrid<TData = any>({
  height,
  showToolbar = true,
  showStatusBar = false,
  showFooter,
  showColumnFilters = false,
  emptyMessage = 'No data available',
  loading = false,
  loadingRows: loadingRowCount = 5,
  className,
  toolbarLeft: customToolbarLeft,
  toolbarRight: customToolbarRight,
  style: containerStyle,
  table: externalTable,
  onRowClick,
  onRowDoubleClick,
  // Visual configuration
  borderless = false,
  density = 'default',
  headerBorder = 'thin',
  rowSeparator = 'full',
  transparent = false,
  noRowHover = false,
  ...options
}: DataGridProps<TData>) {
  // Use external table or create internal one
  const internalTable = useDataGrid(options);
  const table = externalTable ?? internalTable;

  const enableSelection = options.enableRowSelection !== false && options.enableRowSelection !== undefined;
  const enablePagination = options.enablePagination ?? true;
  const enableGlobalFilter = options.enableGlobalFilter ?? true;
  const enableColumnVisibility = options.enableColumnVisibility ?? true;
  const enableExpanding = options.enableExpanding ?? false;

  const visibleColumns = table.getVisibleLeafColumns();
  const headerGroups = table.getHeaderGroups();
  const rowModel = table.getRowModel();
  const hasMultiSort = table.getState().sorting.length > 1;

  const showPaginationFooter = showFooter ?? enablePagination;
  const totalColumnCount = visibleColumns.length + (enableSelection ? 1 : 0);

  return (
    <div
      className={[s.gridContainer, className].filter(Boolean).join(' ')}
      style={containerStyle}
      data-borderless={borderless || undefined}
      data-density={density !== 'default' ? density : undefined}
      data-header-border={headerBorder !== 'thin' ? headerBorder : undefined}
      data-row-separator={rowSeparator !== 'full' ? rowSeparator : undefined}
      data-transparent={transparent || undefined}
      data-no-row-hover={noRowHover || undefined}
    >
      {/* ─── Toolbar ─── */}
      {showToolbar && (
        <div className={s.toolbar}>
          <div className={s.toolbarLeft}>
            {customToolbarLeft}
            {enableGlobalFilter && (
              <input
                className={s.searchInput}
                placeholder="Search all columns…"
                value={table.getState().globalFilter ?? ''}
                onChange={(e) => table.setGlobalFilter(e.target.value)}
              />
            )}
            {enableSelection && Object.keys(table.getState().rowSelection).length > 0 && (
              <span className={s.selectionInfo}>
                {Object.keys(table.getState().rowSelection).length} selected
              </span>
            )}
          </div>
          <div className={s.toolbarRight}>
            {customToolbarRight}
            {enableColumnVisibility && (
              <ColumnVisibilityToggle table={table} />
            )}
          </div>
        </div>
      )}

      {/* ─── Table ─── */}
      <div
        className={s.tableScrollArea}
        style={height ? { maxHeight: height } : undefined}
      >
        <table className={s.table} role="grid">
          {/* ─── Headers ─── */}
          <thead className={s.thead}>
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} className={s.headerRow}>
                {enableSelection && (
                  <th className={`${s.headerCell} ${s.checkboxCell}`}>
                    <SelectAllCheckbox table={table} />
                  </th>
                )}
                {headerGroup.headers
                  .filter((col) => col.getIsVisible())
                  .map((column) => (
                    <HeaderCell
                      key={column.id}
                      column={column}
                      table={table}
                      showMultiSortIndex={hasMultiSort}
                    />
                  ))}
              </tr>
            ))}
            {/* ─── Column Filters ─── */}
            {showColumnFilters && (
              <tr className={s.columnFilterRow}>
                {enableSelection && <th className={s.checkboxCell} />}
                {visibleColumns.map((column) => (
                  <th key={column.id} className={s.columnFilterCell}>
                    {column.getCanFilter() ? (
                      <input
                        className={s.columnFilterInput}
                        placeholder={`Filter ${typeof column.header === 'string' ? column.header : column.id}…`}
                        value={String(column.getFilterValue() ?? '')}
                        onChange={(e) => column.setFilterValue(e.target.value || undefined)}
                      />
                    ) : null}
                  </th>
                ))}
              </tr>
            )}
          </thead>

          {/* ─── Body ─── */}
          <tbody className={s.tbody}>
            {loading ? (
              <LoadingRows columnCount={totalColumnCount} rowCount={loadingRowCount} />
            ) : rowModel.rows.length === 0 ? (
              <tr>
                <td className={s.emptyState} colSpan={totalColumnCount}>
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              <RenderRows
                rows={rowModel.rows}
                visibleColumns={visibleColumns}
                table={table}
                enableSelection={enableSelection}
                enableExpanding={enableExpanding}
                onRowClick={onRowClick}
                onRowDoubleClick={onRowDoubleClick}
              />
            )}
          </tbody>
        </table>
      </div>

      {/* ─── Status Bar ─── */}
      {showStatusBar && <StatusBar table={table} />}

      {/* ─── Pagination Footer ─── */}
      {showPaginationFooter && <PaginationFooter table={table} />}
    </div>
  );
}

// ─── Recursive Row Renderer ─────────────────────────────────────────────────

function RenderRows({
  rows,
  visibleColumns,
  table,
  enableSelection,
  enableExpanding,
  onRowClick,
  onRowDoubleClick,
  depth = 0,
}: {
  rows: Row[];
  visibleColumns: ResolvedColumn[];
  table: DataGridInstance;
  enableSelection: boolean;
  enableExpanding: boolean;
  onRowClick?: (row: Row) => void;
  onRowDoubleClick?: (row: Row) => void;
  depth?: number;
}) {
  return (
    <>
      {rows.map((row) => (
        <React.Fragment key={row.id}>
          <tr
            className={s.bodyRow}
            data-selected={row.getIsSelected()}
            onClick={onRowClick ? () => onRowClick(row) : undefined}
            onDoubleClick={onRowDoubleClick ? () => onRowDoubleClick(row) : undefined}
            style={onRowClick || onRowDoubleClick ? { cursor: 'pointer' } : undefined}
          >
            {enableSelection && (
              <td className={`${s.bodyCell} ${s.checkboxCell}`}>
                <RowCheckbox row={row} />
              </td>
            )}
            {visibleColumns.map((column, colIdx) => {
              // Show expander in first column
              const isFirstCol = colIdx === 0;
              if (isFirstCol && enableExpanding) {
                return (
                  <td
                    key={column.id}
                    className={[
                      s.bodyCell,
                      column.cellClassName ?? '',
                    ].filter(Boolean).join(' ')}
                    style={{ width: column.getSize() }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span
                        className={s.depthIndent}
                        style={{ width: depth * 20 }}
                      />
                      <ExpanderCell row={row} />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {column.cell
                          ? column.cell({
                              row,
                              column,
                              value: row.getValue(column.id),
                              table,
                              getValue: () => row.getValue(column.id),
                              renderValue: () => row.renderValue(column.id),
                            })
                          : row.renderValue(column.id)?.toString() ?? ''
                        }
                      </span>
                    </div>
                  </td>
                );
              }
              return <BodyCell key={column.id} row={row} column={column} table={table} />;
            })}
          </tr>
          {/* Render expanded sub-rows */}
          {enableExpanding && row.getIsExpanded() && row.subRows.length > 0 && (
            <RenderRows
              rows={row.subRows}
              visibleColumns={visibleColumns}
              table={table}
              enableSelection={enableSelection}
              enableExpanding={enableExpanding}
              onRowClick={onRowClick}
              onRowDoubleClick={onRowDoubleClick}
              depth={depth + 1}
            />
          )}
        </React.Fragment>
      ))}
    </>
  );
}

DataGrid.displayName = 'DataGrid';
