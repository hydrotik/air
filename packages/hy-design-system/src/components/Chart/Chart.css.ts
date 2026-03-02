import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

/* ─── ChartContainer ───────────────────────────────────────────────────── */
export const chartContainerStyle = style({
  display: 'flex',
  justifyContent: 'center',
  fontSize: vars.font.size.xs,
});

/* ─── Global recharts overrides using data-chart attribute ─────────────── */
globalStyle(`[data-chart] .recharts-cartesian-axis-tick text`, {
  fill: vars.color.textMuted,
});

globalStyle(`[data-chart] .recharts-cartesian-grid line`, {
  stroke: `color-mix(in srgb, ${vars.color.border} 50%, transparent)`,
});

globalStyle(`[data-chart] .recharts-curve.recharts-tooltip-cursor`, {
  stroke: vars.color.border,
});

globalStyle(`[data-chart] .recharts-dot[stroke='#fff']`, {
  stroke: 'transparent',
});

globalStyle(`[data-chart] .recharts-layer`, {
  outline: 'none',
});

globalStyle(`[data-chart] .recharts-polar-grid [stroke='#ccc']`, {
  stroke: vars.color.border,
});

globalStyle(`[data-chart] .recharts-radial-bar-background-sector`, {
  fill: vars.color.secondary,
});

globalStyle(`[data-chart] .recharts-rectangle.recharts-tooltip-cursor`, {
  fill: vars.color.secondary,
});

globalStyle(`[data-chart] .recharts-reference-line line`, {
  stroke: vars.color.border,
});

globalStyle(`[data-chart] .recharts-sector[stroke='#fff']`, {
  stroke: 'transparent',
});

globalStyle(`[data-chart] .recharts-sector`, {
  outline: 'none',
});

globalStyle(`[data-chart] .recharts-surface`, {
  outline: 'none',
});

/* ─── ChartTooltipContent ──────────────────────────────────────────────── */
export const tooltipContentStyle = style({
  display: 'grid',
  minWidth: '8rem',
  alignItems: 'flex-start',
  gap: '6px',
  borderRadius: vars.radii.lg,
  border: `1px solid color-mix(in srgb, ${vars.color.border} 50%, transparent)`,
  backgroundColor: vars.color.background,
  paddingLeft: vars.space['2_5'],
  paddingRight: vars.space['2_5'],
  paddingTop: vars.space['1_5'],
  paddingBottom: vars.space['1_5'],
  fontSize: vars.font.size.xs,
  boxShadow: vars.shadow.xl,
});

export const tooltipLabelStyle = style({
  fontWeight: vars.font.weight.medium,
});

export const tooltipItemsStyle = style({
  display: 'grid',
  gap: '6px',
});

export const tooltipItemRowStyle = style({
  display: 'flex',
  width: '100%',
  alignItems: 'stretch',
  gap: vars.space['2'],
});

export const tooltipItemRowCenteredStyle = style({
  alignItems: 'center',
});

export const tooltipIndicatorDotStyle = style({
  height: '10px',
  width: '10px',
  flexShrink: 0,
  borderRadius: '2px',
});

export const tooltipIndicatorLineStyle = style({
  width: '4px',
  flexShrink: 0,
  borderRadius: '2px',
});

export const tooltipIndicatorDashedStyle = style({
  width: 0,
  flexShrink: 0,
  borderWidth: '1.5px',
  borderStyle: 'dashed',
  backgroundColor: 'transparent',
});

export const tooltipItemContentStyle = style({
  display: 'flex',
  flex: '1 1 0%',
  justifyContent: 'space-between',
  lineHeight: '1',
});

export const tooltipItemContentEndStyle = style({
  alignItems: 'flex-end',
});

export const tooltipItemContentCenterStyle = style({
  alignItems: 'center',
});

export const tooltipItemLabelStyle = style({
  display: 'grid',
  gap: '6px',
});

export const tooltipItemNameStyle = style({
  color: vars.color.textMuted,
});

export const tooltipItemValueStyle = style({
  fontFamily: vars.font.family.mono,
  fontWeight: vars.font.weight.medium,
  fontVariantNumeric: 'tabular-nums',
  color: vars.color.text,
});

/* ─── ChartLegendContent ───────────────────────────────────────────────── */
export const legendContentStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space['4'],
});

export const legendContentTopStyle = style({
  paddingBottom: vars.space['3'],
});

export const legendContentBottomStyle = style({
  paddingTop: vars.space['3'],
});

export const legendItemStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
});

export const legendItemDotStyle = style({
  height: '8px',
  width: '8px',
  flexShrink: 0,
  borderRadius: '2px',
});
