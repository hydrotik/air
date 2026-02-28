/* ─── DataGrid Styles — vanilla-extract + design tokens ────────────────────── */

import { globalStyle, style, keyframes } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

// ─── Grid Container ────────────────────────────────────────────────────────

export const gridContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.lg,
  backgroundColor: vars.color.surface,
  overflow: 'hidden',
  fontSize: vars.font.size.sm,
  fontFamily: vars.font.family.sans,
  color: vars.color.text,
});

// ─── Toolbar ────────────────────────────────────────────────────────────────

export const toolbar = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['2'],
  padding: `${vars.space['2']} ${vars.space['3']}`,
  borderBottom: `1px solid ${vars.color.border}`,
  flexWrap: 'wrap',
});

export const toolbarLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['2'],
  flex: 1,
  minWidth: 0,
});

export const toolbarRight = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['2'],
});

export const searchInput = style({
  height: '32px',
  minWidth: '180px',
  maxWidth: '300px',
  padding: `0 ${vars.space['3']}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.md,
  backgroundColor: vars.color.input,
  color: vars.color.text,
  fontSize: vars.font.size.sm,
  outline: 'none',
  transition: `border-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  '::placeholder': {
    color: vars.color.placeholder,
  },
  ':focus': {
    borderColor: vars.color.focusRing,
    boxShadow: `0 0 0 1px ${vars.color.focusRing}`,
  },
});

export const toolbarButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space['1'],
  height: '32px',
  padding: `0 ${vars.space['2_5']}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.md,
  backgroundColor: 'transparent',
  color: vars.color.text,
  fontSize: vars.font.size.sm,
  fontFamily: vars.font.family.sans,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  transition: `all ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  ':hover': {
    backgroundColor: vars.color.ghostHover,
  },
  ':active': {
    transform: 'scale(0.97)',
  },
});

export const selectionInfo = style({
  fontSize: vars.font.size.xs,
  color: vars.color.textMuted,
  whiteSpace: 'nowrap',
});

// ─── Table Scroll Area ──────────────────────────────────────────────────────

export const tableScrollArea = style({
  overflow: 'auto',
  position: 'relative',
});

// ─── Table ──────────────────────────────────────────────────────────────────

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
  tableLayout: 'fixed',
});

// ─── Header ─────────────────────────────────────────────────────────────────

export const thead = style({
  position: 'sticky',
  top: 0,
  zIndex: 2,
  backgroundColor: vars.color.surface,
});

export const headerRow = style({
  borderBottom: `1px solid ${vars.color.border}`,
});

export const headerCell = style({
  position: 'relative',
  height: '40px',
  padding: `0 ${vars.space['3']}`,
  textAlign: 'left',
  verticalAlign: 'middle',
  fontWeight: vars.font.weight.medium,
  color: vars.color.text,
  fontSize: vars.font.size.sm,
  whiteSpace: 'nowrap',
  userSelect: 'none',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  backgroundColor: vars.color.surface,
});

export const headerCellSortable = style({
  cursor: 'pointer',
  ':hover': {
    backgroundColor: vars.color.ghostHover,
  },
});

export const headerCellContent = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['1'],
  overflow: 'hidden',
});

export const headerCellText = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  flex: 1,
});

export const sortIcon = style({
  flexShrink: 0,
  opacity: 0.5,
  transition: `opacity ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
});

export const sortIconActive = style({
  opacity: 1,
  color: vars.color.primary,
});

export const sortIndex = style({
  fontSize: '10px',
  color: vars.color.textMuted,
  marginLeft: '-2px',
});

// ─── Resize Handle ──────────────────────────────────────────────────────────

export const resizeHandle = style({
  position: 'absolute',
  top: 0,
  right: 0,
  width: '6px',
  height: '100%',
  cursor: 'col-resize',
  zIndex: 1,
  touchAction: 'none',
  '::after': {
    content: '""',
    position: 'absolute',
    top: '25%',
    right: '2px',
    width: '2px',
    height: '50%',
    borderRadius: '1px',
    backgroundColor: vars.color.border,
    transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  },
  ':hover::after': {
    backgroundColor: vars.color.primary,
  },
  selectors: {
    '&[data-resizing="true"]::after': {
      backgroundColor: vars.color.primary,
    },
  },
});

// ─── Column Filter ──────────────────────────────────────────────────────────

export const columnFilterRow = style({
  borderBottom: `1px solid ${vars.color.border}`,
});

export const columnFilterCell = style({
  padding: `${vars.space['1']} ${vars.space['2']}`,
});

export const columnFilterInput = style({
  width: '100%',
  height: '28px',
  padding: `0 ${vars.space['2']}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.sm,
  backgroundColor: vars.color.input,
  color: vars.color.text,
  fontSize: vars.font.size.xs,
  outline: 'none',
  '::placeholder': {
    color: vars.color.placeholder,
  },
  ':focus': {
    borderColor: vars.color.focusRing,
  },
});

// ─── Body ───────────────────────────────────────────────────────────────────

export const tbody = style({});

export const bodyRow = style({
  borderBottom: `1px solid ${vars.color.borderSubtle}`,
  transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  ':hover': {
    backgroundColor: vars.color.ghostHover,
  },
  selectors: {
    '&[data-selected="true"]': {
      backgroundColor: `color-mix(in srgb, ${vars.color.primary} 8%, transparent)`,
    },
    '&[data-selected="true"]:hover': {
      backgroundColor: `color-mix(in srgb, ${vars.color.primary} 12%, transparent)`,
    },
    '&:last-child': {
      borderBottom: 'none',
    },
  },
});

export const bodyCell = style({
  padding: `${vars.space['2']} ${vars.space['3']}`,
  verticalAlign: 'middle',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const bodyCellEditing = style({
  padding: `${vars.space['1']} ${vars.space['2']}`,
});

export const cellAlignLeft = style({ textAlign: 'left' });
export const cellAlignCenter = style({ textAlign: 'center' });
export const cellAlignRight = style({ textAlign: 'right' });

// ─── Checkbox ───────────────────────────────────────────────────────────────

export const checkboxCell = style({
  width: '40px',
  maxWidth: '40px',
  padding: `0 ${vars.space['2']}`,
  textAlign: 'center',
});

export const checkbox = style({
  width: '16px',
  height: '16px',
  appearance: 'none',
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.sm,
  backgroundColor: 'transparent',
  cursor: 'pointer',
  position: 'relative',
  transition: `all ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  ':checked': {
    backgroundColor: vars.color.primary,
    borderColor: vars.color.primary,
  },
  ':focus-visible': {
    outline: `2px solid ${vars.color.focusRing}`,
    outlineOffset: '2px',
  },
  selectors: {
    '&:checked::after': {
      content: '""',
      position: 'absolute',
      left: '4px',
      top: '1px',
      width: '6px',
      height: '10px',
      border: `solid ${vars.color.primaryForeground}`,
      borderWidth: '0 2px 2px 0',
      transform: 'rotate(45deg)',
    },
    '&[data-indeterminate="true"]': {
      backgroundColor: vars.color.primary,
      borderColor: vars.color.primary,
    },
    '&[data-indeterminate="true"]::after': {
      content: '""',
      position: 'absolute',
      left: '3px',
      top: '6px',
      width: '8px',
      height: '2px',
      backgroundColor: vars.color.primaryForeground,
    },
  },
});

// ─── Expander ───────────────────────────────────────────────────────────────

export const expanderButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '20px',
  height: '20px',
  border: 'none',
  borderRadius: vars.radii.sm,
  backgroundColor: 'transparent',
  color: vars.color.textMuted,
  cursor: 'pointer',
  padding: 0,
  transition: `all ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  ':hover': {
    backgroundColor: vars.color.ghostHover,
    color: vars.color.text,
  },
});

export const expanderIcon = style({
  transition: `transform ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  selectors: {
    '&[data-expanded="true"]': {
      transform: 'rotate(90deg)',
    },
  },
});

// ─── Pinned Columns ─────────────────────────────────────────────────────────

export const pinnedLeft = style({
  position: 'sticky',
  left: 0,
  zIndex: 1,
  backgroundColor: vars.color.surface,
  '::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: '-4px',
    width: '4px',
    height: '100%',
    background: `linear-gradient(to right, ${vars.color.border}, transparent)`,
  },
});

export const pinnedRight = style({
  position: 'sticky',
  right: 0,
  zIndex: 1,
  backgroundColor: vars.color.surface,
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-4px',
    width: '4px',
    height: '100%',
    background: `linear-gradient(to left, ${vars.color.border}, transparent)`,
  },
});

// ─── Empty State ────────────────────────────────────────────────────────────

export const emptyState = style({
  padding: `${vars.space['12']} ${vars.space['4']}`,
  textAlign: 'center',
  color: vars.color.textMuted,
  fontSize: vars.font.size.sm,
});

// ─── Loading ────────────────────────────────────────────────────────────────

const shimmer = keyframes({
  '0%': { backgroundPosition: '-200% 0' },
  '100%': { backgroundPosition: '200% 0' },
});

export const loadingRow = style({
  height: '41px',
  borderBottom: `1px solid ${vars.color.borderSubtle}`,
});

export const loadingCell = style({
  padding: `${vars.space['2']} ${vars.space['3']}`,
});

export const loadingSkeleton = style({
  height: '16px',
  borderRadius: vars.radii.sm,
  background: `linear-gradient(90deg, ${vars.color.ghostHover} 25%, color-mix(in srgb, ${vars.color.ghostHover} 50%, transparent) 50%, ${vars.color.ghostHover} 75%)`,
  backgroundSize: '200% 100%',
  animation: `${shimmer} 1.5s infinite`,
});

// ─── Footer / Pagination ────────────────────────────────────────────────────

export const footer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${vars.space['2']} ${vars.space['3']}`,
  borderTop: `1px solid ${vars.color.border}`,
  gap: vars.space['3'],
  flexWrap: 'wrap',
});

export const footerLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['2'],
  fontSize: vars.font.size.xs,
  color: vars.color.textMuted,
});

export const footerRight = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['1'],
});

export const paginationButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.md,
  backgroundColor: 'transparent',
  color: vars.color.text,
  cursor: 'pointer',
  fontSize: vars.font.size.sm,
  fontFamily: vars.font.family.sans,
  transition: `all ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  ':hover': {
    backgroundColor: vars.color.ghostHover,
  },
  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
  selectors: {
    '&[data-active="true"]': {
      backgroundColor: vars.color.primary,
      color: vars.color.primaryForeground,
      borderColor: vars.color.primary,
    },
  },
});

export const pageSizeSelect = style({
  height: '32px',
  width: 'auto',
  minWidth: '64px',
  fontSize: vars.font.size.sm,
});

export const paginationInfo = style({
  fontSize: vars.font.size.sm,
  color: vars.color.textMuted,
  whiteSpace: 'nowrap',
  padding: `0 ${vars.space['2']}`,
});

// ─── Edit Cell ──────────────────────────────────────────────────────────────

export const editInput = style({
  width: '100%',
  height: '28px',
  padding: `0 ${vars.space['2']}`,
  border: `1px solid ${vars.color.focusRing}`,
  borderRadius: vars.radii.sm,
  backgroundColor: vars.color.input,
  color: vars.color.text,
  fontSize: vars.font.size.sm,
  outline: 'none',
  boxShadow: `0 0 0 1px ${vars.color.focusRing}`,
});

// ─── Column Visibility Panel ────────────────────────────────────────────────

export const visibilityPanel = style({
  position: 'absolute',
  top: '100%',
  right: 0,
  zIndex: 10,
  minWidth: '180px',
  padding: vars.space['2'],
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.lg,
  backgroundColor: vars.color.surfaceElevated,
  boxShadow: vars.shadow.lg,
  marginTop: vars.space['1'],
});

export const visibilityItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['2'],
  padding: `${vars.space['1_5']} ${vars.space['2']}`,
  borderRadius: vars.radii.sm,
  fontSize: vars.font.size.sm,
  cursor: 'pointer',
  ':hover': {
    backgroundColor: vars.color.ghostHover,
  },
});

// ─── Grouped Row ────────────────────────────────────────────────────────────

export const groupedRow = style({
  fontWeight: vars.font.weight.medium,
  backgroundColor: `color-mix(in srgb, ${vars.color.secondary} 30%, transparent)`,
});

export const depthIndent = style({
  display: 'inline-block',
});

// ─── Status Bar ─────────────────────────────────────────────────────────────

export const statusBar = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['4'],
  padding: `${vars.space['1_5']} ${vars.space['3']}`,
  borderTop: `1px solid ${vars.color.border}`,
  fontSize: vars.font.size.xs,
  color: vars.color.textMuted,
  backgroundColor: `color-mix(in srgb, ${vars.color.secondary} 20%, transparent)`,
});

export const statusBarItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['1'],
});

export const statusBarLabel = style({
  fontWeight: vars.font.weight.medium,
});
