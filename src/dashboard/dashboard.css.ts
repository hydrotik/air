import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

globalStyle('html, body', {
  margin: 0,
  padding: 0,
  background: vars.color.background,
  color: vars.color.text,
  fontFamily: vars.font.family.sans,
  fontSize: '13px',
  lineHeight: '1.4',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
});

globalStyle('#root', {
  minHeight: '100vh',
});

export const shell = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '6px 16px',
  borderBottom: `1px solid ${vars.color.border}`,
  background: vars.color.surface,
});

export const headerLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const logo = style({
  fontFamily: vars.font.family.mono,
  fontWeight: 700,
  fontSize: '13px',
  letterSpacing: '0.5px',
  color: vars.color.primary,
});

export const statusDot = style({
  width: 6,
  height: 6,
  borderRadius: '50%',
  transition: 'background 0.3s ease',
});

export const main = style({
  flex: 1,
  padding: '10px 12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  maxWidth: '1800px',
  width: '100%',
  margin: '0 auto',
  boxSizing: 'border-box',
});

export const kpiRow = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 1fr)',
  gap: '6px',
  '@media': {
    '(max-width: 1200px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    '(max-width: 768px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
});

export const kpiCard = style({
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.md,
  padding: '8px 10px',
  display: 'flex',
  flexDirection: 'column',
  gap: '1px',
});

export const kpiLabel = style({
  fontFamily: vars.font.family.mono,
  fontSize: '9px',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  color: vars.color.textMuted,
  lineHeight: 1,
});

export const kpiValue = style({
  fontSize: '18px',
  fontWeight: 700,
  fontFamily: vars.font.family.mono,
  color: vars.color.text,
  lineHeight: 1.2,
});

export const kpiSub = style({
  fontSize: '9px',
  color: vars.color.textMuted,
  fontFamily: vars.font.family.mono,
  lineHeight: 1,
});

export const gridRow = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '8px',
  '@media': {
    '(max-width: 1200px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const panel = style({
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.md,
  overflow: 'hidden',
});

export const panelHeader = style({
  padding: '5px 10px',
  borderBottom: `1px solid ${vars.color.border}`,
  fontFamily: vars.font.family.mono,
  fontSize: '10px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  color: vars.color.textMuted,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  lineHeight: 1,
});

export const panelBody = style({
  padding: '6px',
});

export const eventFeed = style({
  maxHeight: '300px',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '0px',
  fontFamily: vars.font.family.mono,
  fontSize: '11px',
});

export const eventRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '2px 6px',
  borderRadius: vars.radii.sm,
  transition: 'background 0.15s ease',
  ':hover': {
    background: `color-mix(in srgb, ${vars.color.primary} 5%, transparent)`,
  },
});

export const eventTime = style({
  color: vars.color.textMuted,
  fontSize: '9px',
  flexShrink: 0,
  width: '60px',
  fontVariantNumeric: 'tabular-nums',
});

export const eventType = style({
  fontWeight: 600,
  fontSize: '8px',
  textTransform: 'uppercase',
  letterSpacing: '0.3px',
  padding: '1px 4px',
  borderRadius: vars.radii.sm,
  flexShrink: 0,
  lineHeight: 1.3,
});

export const eventDetail = style({
  color: vars.color.textMuted,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  flex: 1,
  fontSize: '10px',
});

export const treemapContainer = style({
  width: '100%',
  minHeight: '200px',
  position: 'relative',
});

export const waterfallContainer = style({
  width: '100%',
  minHeight: '150px',
});

export const emptyState = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px 16px',
  color: vars.color.textMuted,
  fontFamily: vars.font.family.mono,
  fontSize: '12px',
  textAlign: 'center',
  gap: '4px',
});

export const sessionList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
});

export const sessionItem = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '4px 8px',
  borderRadius: vars.radii.sm,
  cursor: 'pointer',
  transition: 'background 0.15s ease',
  fontSize: '11px',
  ':hover': {
    background: `color-mix(in srgb, ${vars.color.primary} 8%, transparent)`,
  },
});

export const sessionItemActive = style({
  background: `color-mix(in srgb, ${vars.color.primary} 12%, transparent)`,
  border: `1px solid color-mix(in srgb, ${vars.color.primary} 30%, transparent)`,
});
