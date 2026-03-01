import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

globalStyle('html, body', {
  margin: 0,
  padding: 0,
  background: vars.color.background,
  color: vars.color.text,
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.md,
  lineHeight: vars.font.lineHeight.normal,
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
  padding: '12px 24px',
  borderBottom: `1px solid ${vars.color.border}`,
  background: vars.color.surface,
});

export const headerLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

export const logo = style({
  fontFamily: vars.font.family.mono,
  fontWeight: 700,
  fontSize: '15px',
  letterSpacing: '0.5px',
  color: vars.color.primary,
});

export const statusDot = style({
  width: 8,
  height: 8,
  borderRadius: '50%',
  transition: 'background 0.3s ease',
});

export const main = style({
  flex: 1,
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  maxWidth: '1600px',
  width: '100%',
  margin: '0 auto',
  boxSizing: 'border-box',
});

export const kpiRow = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '16px',
});

export const kpiCard = style({
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.lg,
  padding: '16px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

export const kpiLabel = style({
  fontFamily: vars.font.family.mono,
  fontSize: '11px',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  color: vars.color.textMuted,
});

export const kpiValue = style({
  fontSize: '24px',
  fontWeight: 700,
  fontFamily: vars.font.family.mono,
  color: vars.color.text,
});

export const kpiSub = style({
  fontSize: '11px',
  color: vars.color.textMuted,
  fontFamily: vars.font.family.mono,
});

export const gridRow = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '16px',
  '@media': {
    '(max-width: 1200px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const panel = style({
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.lg,
  overflow: 'hidden',
});

export const panelHeader = style({
  padding: '12px 16px',
  borderBottom: `1px solid ${vars.color.border}`,
  fontFamily: vars.font.family.mono,
  fontSize: '12px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  color: vars.color.textMuted,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const panelBody = style({
  padding: '16px',
});

export const eventFeed = style({
  maxHeight: '400px',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  fontFamily: vars.font.family.mono,
  fontSize: '12px',
});

export const eventRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '4px 8px',
  borderRadius: vars.radii.sm,
  transition: 'background 0.15s ease',
  ':hover': {
    background: `color-mix(in srgb, ${vars.color.primary} 5%, transparent)`,
  },
});

export const eventTime = style({
  color: vars.color.textMuted,
  fontSize: '10px',
  flexShrink: 0,
  width: '72px',
});

export const eventType = style({
  fontWeight: 600,
  fontSize: '10px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  padding: '1px 6px',
  borderRadius: vars.radii.sm,
  flexShrink: 0,
});

export const eventDetail = style({
  color: vars.color.textMuted,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  flex: 1,
});

export const treemapContainer = style({
  width: '100%',
  minHeight: '300px',
  position: 'relative',
});

export const waterfallContainer = style({
  width: '100%',
  minHeight: '200px',
});

export const emptyState = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '48px 24px',
  color: vars.color.textMuted,
  fontFamily: vars.font.family.mono,
  fontSize: '13px',
  textAlign: 'center',
  gap: '8px',
});

export const sessionList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

export const sessionItem = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 12px',
  borderRadius: vars.radii.md,
  cursor: 'pointer',
  transition: 'background 0.15s ease',
  ':hover': {
    background: `color-mix(in srgb, ${vars.color.primary} 8%, transparent)`,
  },
});

export const sessionItemActive = style({
  background: `color-mix(in srgb, ${vars.color.primary} 12%, transparent)`,
  border: `1px solid color-mix(in srgb, ${vars.color.primary} 30%, transparent)`,
});
