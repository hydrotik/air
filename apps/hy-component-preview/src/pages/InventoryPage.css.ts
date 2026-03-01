import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

/* ─── Layout ─── */
export const layout = style({
  display: 'flex',
  flex: 1,
  minHeight: 0,
});

export const sidebar = style({
  display: 'none',
  flexDirection: 'column',
  width: '240px',
  borderRight: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surface,
  padding: `${vars.space['4']} 0`,
  gap: vars.space['1'],
  flexShrink: 0,
  overflow: 'auto',
  '@media': {
    '(min-width: 768px)': {
      display: 'flex',
    },
  },
});

export const sidebarCollapsed = style({
  width: '52px',
});

export const sidebarGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['0_5'],
  padding: `0 ${vars.space['3']}`,
});

export const sidebarGroupLabel = style({
  fontSize: vars.font.size.xs,
  fontWeight: 500,
  color: vars.color.textMuted,
  padding: `${vars.space['2']} ${vars.space['3']}`,
  textTransform: 'none',
});

export const sidebarItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['2'],
  padding: `${vars.space['1_5']} ${vars.space['3']}`,
  fontSize: vars.font.size.sm,
  fontWeight: 500,
  color: vars.color.textMuted,
  borderRadius: vars.radii.md,
  cursor: 'pointer',
  transition: 'color 0.15s, background-color 0.15s',
  textDecoration: 'none',
  border: 'none',
  background: 'none',
  width: '100%',
  textAlign: 'left',
  selectors: {
    '&:hover': {
      color: vars.color.text,
      backgroundColor: vars.color.secondary,
    },
  },
});

export const sidebarItemActive = style({
  color: vars.color.text,
  backgroundColor: vars.color.secondary,
});

export const sidebarItemCount = style({
  marginLeft: 'auto',
  fontSize: vars.font.size.xs,
  color: vars.color.textMuted,
  fontWeight: 400,
  fontVariantNumeric: 'tabular-nums',
});

/* ─── Main content ─── */
export const main = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  minWidth: 0,
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['3'],
  padding: `${vars.space['3']} ${vars.space['6']}`,
  borderBottom: `1px solid ${vars.color.border}`,
  flexWrap: 'wrap',
});

export const headerTitle = style({
  fontSize: vars.font.size.lg,
  fontWeight: 600,
  letterSpacing: '-0.01em',
  whiteSpace: 'nowrap',
});

export const headerActions = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['2'],
  marginLeft: 'auto',
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['6'],
  padding: vars.space['6'],
  maxWidth: '80rem',
  width: '100%',
  margin: '0 auto',
});

/* ─── KPI cards ─── */
export const kpiGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gap: vars.space['4'],
  '@media': {
    '(min-width: 640px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
    '(min-width: 1024px)': { gridTemplateColumns: 'repeat(4, 1fr)' },
  },
});

export const kpiValue = style({
  fontSize: '24px',
  fontWeight: 600,
  fontVariantNumeric: 'tabular-nums',
  lineHeight: 1.2,
});

export const kpiTrend = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: vars.font.size.sm,
  fontWeight: 500,
});

export const trendUp = style({ color: '#22c55e' });
export const trendDown = style({ color: vars.color.destructive });

export const kpiDesc = style({
  fontSize: vars.font.size.sm,
  color: vars.color.textMuted,
});

/* ─── Charts grid ─── */
export const chartsGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: vars.space['4'],
  '@media': {
    '(min-width: 768px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
  },
});

/* ─── Table ─── */
export const tableHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: vars.space['3'],
});

export const tableFilters = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['2'],
  flexWrap: 'wrap',
});

export const tableFooter = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: vars.space['3'],
});

/* ─── Tooltip ─── */
export const tooltip = style({
  backgroundColor: vars.color.surfaceElevated,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.lg,
  padding: `${vars.space['2']} ${vars.space['3']}`,
  boxShadow: vars.shadow.md,
  fontSize: vars.font.size.sm,
  minWidth: '140px',
});

export const tooltipLabel = style({
  fontWeight: 600,
  marginBottom: vars.space['1'],
  color: vars.color.text,
});

export const tooltipRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['2'],
  color: vars.color.textMuted,
  padding: `${vars.space['0_5']} 0`,
});

export const tooltipDot = style({
  width: '8px',
  height: '8px',
  borderRadius: vars.radii.full,
  flexShrink: 0,
});

/* ─── Order status dot ─── */
export const statusDot = style({
  width: '8px',
  height: '8px',
  borderRadius: vars.radii.full,
  flexShrink: 0,
});

/* ─── Recent orders / activity ─── */
export const activityItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['3'],
  padding: `${vars.space['2_5']} 0`,
  borderBottom: `1px solid color-mix(in srgb, ${vars.color.border} 50%, transparent)`,
  selectors: {
    '&:last-child': {
      borderBottom: 'none',
    },
  },
});

export const activityAvatar = style({
  width: '32px',
  height: '32px',
  borderRadius: vars.radii.full,
  backgroundColor: vars.color.secondary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: vars.font.size.xs,
  fontWeight: 600,
  color: vars.color.text,
  flexShrink: 0,
});

export const activityText = style({
  flex: 1,
  minWidth: 0,
});

export const activityName = style({
  fontSize: vars.font.size.sm,
  fontWeight: 500,
  color: vars.color.text,
});

export const activityMeta = style({
  fontSize: vars.font.size.xs,
  color: vars.color.textMuted,
});

export const activityAmount = style({
  fontSize: vars.font.size.sm,
  fontWeight: 600,
  fontVariantNumeric: 'tabular-nums',
  color: vars.color.text,
  whiteSpace: 'nowrap',
});

/* ─── Search ─── */
export const searchWrapper = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  maxWidth: '320px',
});

export const searchIcon = style({
  position: 'absolute',
  left: vars.space['3'],
  color: vars.color.textMuted,
  pointerEvents: 'none',
});

/* ─── Breadcrumbs ─── */
export const breadcrumbs = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['1'],
  fontSize: vars.font.size.sm,
  color: vars.color.textMuted,
});

export const breadcrumbSep = style({
  color: vars.color.border,
});

export const breadcrumbCurrent = style({
  color: vars.color.text,
  fontWeight: 500,
});
