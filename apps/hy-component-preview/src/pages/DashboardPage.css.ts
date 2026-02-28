import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

export const dashboardContainer = style({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  gap: vars.space['6'],
  padding: `${vars.space['6']}`,
  maxWidth: '80rem',
  width: '100%',
  margin: '0 auto',
});

export const kpiGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gap: vars.space['4'],
  '@media': {
    '(min-width: 640px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
    '(min-width: 1024px)': { gridTemplateColumns: 'repeat(4, 1fr)' },
  },
});

export const chartsGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: vars.space['4'],
  '@media': {
    '(min-width: 768px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
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

export const trendUp = style({
  color: '#22c55e',
});

export const trendDown = style({
  color: vars.color.destructive,
});

export const kpiDesc = style({
  fontSize: vars.font.size.sm,
  color: vars.color.textMuted,
});

export const chartPlaceholder = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '240px',
  borderRadius: vars.radii.lg,
  border: `2px dashed ${vars.color.border}`,
  color: vars.color.textMuted,
  fontSize: vars.font.size.sm,
});

export const tableSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['4'],
});

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
