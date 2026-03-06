import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

/* ─── Global reset ───────────────────────────────────────────────────────── */

globalStyle('html, body, #root', {
  height: '100%',
  background: vars.color.background,
  color: vars.color.text,
});

/* ─── Layout ─────────────────────────────────────────────────────────────── */

export const appShell = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  overflow: 'hidden',
});

export const topBar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 48,
  padding: '0 16px',
  borderBottom: `1px solid ${vars.color.border}`,
  flexShrink: 0,
});

export const topBarLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
});

export const appTitle = style({
  fontSize: 15,
  fontWeight: 700,
  letterSpacing: '-0.01em',
  color: vars.color.text,
});

export const yearBadge = style({
  fontSize: 12,
  fontWeight: 500,
  opacity: 0.4,
});

export const bodyLayout = style({
  display: 'flex',
  flex: 1,
  overflow: 'hidden',
  minHeight: 0,
});

export const sidebarArea = style({
  width: 260,
  flexShrink: 0,
  borderRight: `1px solid ${vars.color.border}`,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
});

export const sidebarScroll = style({
  flex: 1,
  overflowY: 'auto',
  padding: '12px 0',
});

export const sidebarFooterArea = style({
  padding: '12px 16px',
  borderTop: `1px solid ${vars.color.border}`,
});

export const mainContent = style({
  flex: 1,
  minWidth: 0,
  overflow: 'auto',
});

export const tabBar = style({
  padding: '8px 20px 0',
  position: 'sticky',
  top: 0,
  zIndex: 10,
  background: vars.color.background,
});

export const tabContent = style({
  padding: '16px 20px 32px',
});

/* ─── Sidebar source items ───────────────────────────────────────────────── */

export const sourceItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '6px 16px',
  cursor: 'pointer',
  fontSize: 13,
  color: vars.color.text,
  transition: 'background 120ms',
  ':hover': {
    background: `color-mix(in srgb, ${vars.color.text} 5%, transparent)`,
  },
});

export const sourceItemActive = style({
  background: `color-mix(in srgb, ${vars.color.primary} 10%, transparent)`,
});

export const sourceAvatar = style({
  width: 24,
  height: 24,
  borderRadius: 4,
  background: `color-mix(in srgb, ${vars.color.primary} 15%, transparent)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 9,
  fontWeight: 700,
  letterSpacing: '0.02em',
  color: vars.color.primary,
  flexShrink: 0,
  textTransform: 'uppercase',
});

export const sourceName = style({
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const sidebarSummary = style({
  padding: '12px 16px',
});

export const summaryRow = style({
  marginTop: 8,
});

export const summaryLabel = style({
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  opacity: 0.45,
});

export const summaryValue = style({
  fontSize: 16,
  fontWeight: 700,
  fontVariantNumeric: 'tabular-nums',
});

/* ─── Section header (above each grid) ───────────────────────────────────── */

export const sectionHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 12,
});

export const sectionTitle = style({
  fontSize: 18,
  fontWeight: 700,
});

/* ─── Utilities matrix ───────────────────────────────────────────────────── */

export const utilityMatrix = style({
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: 13,
  fontVariantNumeric: 'tabular-nums',
});

globalStyle(`${utilityMatrix} th`, {
  fontSize: 10,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  opacity: 0.5,
  padding: '6px 8px',
  textAlign: 'right',
  borderBottom: `2px solid ${vars.color.primary}`,
});

globalStyle(`${utilityMatrix} th:first-child`, {
  textAlign: 'left',
});

globalStyle(`${utilityMatrix} td`, {
  padding: '6px 8px',
  textAlign: 'right',
  borderBottom: `1px solid color-mix(in srgb, ${vars.color.border} 40%, transparent)`,
});

globalStyle(`${utilityMatrix} td:first-child`, {
  textAlign: 'left',
  fontWeight: 500,
});

export const utilityEmpty = style({
  opacity: 0.25,
});

export const utilityTotal = style({
  fontWeight: 700,
});

/* ─── Deductions: category sections (long scroll, fit-to-content) ─────── */

export const categorySections = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
});

export const categorySection = style({
  // no explicit width — table sizes to content
});

export const categoryHeader = style({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  paddingBottom: 6,
  borderBottom: `2px solid ${vars.color.primary}`,
  marginBottom: 0,
});

export const categoryName = style({
  fontSize: 14,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
});

export const categoryTotal = style({
  fontSize: 15,
  fontWeight: 700,
  fontVariantNumeric: 'tabular-nums',
});

export const categoryTable = style({
  borderCollapse: 'collapse',
  fontSize: 13,
  fontVariantNumeric: 'tabular-nums',
  width: '100%',
});

globalStyle(`${categoryTable} th`, {
  fontSize: 10,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  opacity: 0.4,
  padding: '6px 8px',
  textAlign: 'left',
  borderBottom: `1px solid color-mix(in srgb, ${vars.color.border} 50%, transparent)`,
});

globalStyle(`${categoryTable} td`, {
  padding: '5px 8px',
  borderBottom: `1px solid color-mix(in srgb, ${vars.color.border} 25%, transparent)`,
  whiteSpace: 'nowrap',
});

globalStyle(`${categoryTable} tbody tr:last-child td`, {
  borderBottom: 'none',
});

/* ─── Grand total footer ─────────────────────────────────────────────────── */

export const grandTotal = style({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'flex-end',
  gap: 8,
  padding: '16px 0',
  marginTop: 8,
  borderTop: `2px solid ${vars.color.primary}`,
});

export const grandTotalLabel = style({
  fontSize: 12,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  opacity: 0.5,
});

export const grandTotalValue = style({
  fontSize: 20,
  fontWeight: 700,
  fontVariantNumeric: 'tabular-nums',
});
