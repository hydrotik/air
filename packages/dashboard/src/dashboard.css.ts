import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

globalStyle('html, body', {
  margin: 0,
  padding: 0,
  background: vars.color.background,
  color: vars.color.text,
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.control,
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
  padding: `${vars.space['1_5']} ${vars.space['4']}`,
  borderBottom: `1px solid ${vars.color.border}`,
  background: vars.color.surface,
});

export const headerLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['2'],
});

export const logo = style({
  fontFamily: vars.font.family.mono,
  fontWeight: 700,
  fontSize: vars.font.size.control,
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
  padding: `${vars.space['2_5']} ${vars.space['3']}`,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['2'],
  maxInlineSize: '112.5rem',
  width: '100%',
  margin: '0 auto',
  boxSizing: 'border-box',
});

export const kpiRow = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 1fr)',
  gap: vars.space['1_5'],
  '@media': {
    '(max-width: 75rem)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    '(max-width: 48rem)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
});

export const kpiCard = style({
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.md,
  padding: `${vars.space['2']} ${vars.space['2_5']}`,
  display: 'flex',
  flexDirection: 'column',
  gap: '1px',
});

export const kpiLabel = style({
  fontFamily: vars.font.family.mono,
  fontSize: vars.font.size['3xs'],
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  color: vars.color.textMuted,
  lineHeight: 1,
});

export const kpiValue = style({
  fontSize: vars.font.size.lg,
  fontWeight: 700,
  fontFamily: vars.font.family.mono,
  color: vars.color.text,
  lineHeight: 1.2,
});

export const kpiSub = style({
  fontSize: vars.font.size['3xs'],
  color: vars.color.textMuted,
  fontFamily: vars.font.family.mono,
  lineHeight: 1,
});

export const gridRow = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: vars.space['2'],
  '@media': {
    '(max-width: 75rem)': {
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
  padding: `0.3125rem ${vars.space['2_5']}`,
  borderBottom: `1px solid ${vars.color.border}`,
  fontFamily: vars.font.family.mono,
  fontSize: vars.text.micro,
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
  padding: vars.space['1_5'],
});

export const eventFeed = style({
  maxBlockSize: '18.75rem',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '0px',
  fontFamily: vars.font.family.mono,
  fontSize: vars.font.size['2xs'],
});

export const eventRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['1_5'],
  padding: `2px ${vars.space['1_5']}`,
  borderRadius: vars.radii.sm,
  transition: 'background 0.15s ease',
  ':hover': {
    background: `color-mix(in srgb, ${vars.color.primary} 5%, transparent)`,
  },
});

export const eventTime = style({
  color: vars.color.textMuted,
  fontSize: vars.font.size['3xs'],
  flexShrink: 0,
  inlineSize: '3.75rem',
  fontVariantNumeric: 'tabular-nums',
});

export const eventType = style({
  fontWeight: 600,
  fontSize: '0.5rem',
  textTransform: 'uppercase',
  letterSpacing: '0.3px',
  padding: `1px ${vars.space['1']}`,
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
  fontSize: vars.text.micro,
});

export const treemapContainer = style({
  width: '100%',
  minBlockSize: '12.5rem',
  position: 'relative',
});

export const waterfallContainer = style({
  width: '100%',
  minBlockSize: '9.375rem',
});

export const emptyState = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: `${vars.space['6']} ${vars.space['4']}`,
  color: vars.color.textMuted,
  fontFamily: vars.font.family.mono,
  fontSize: vars.font.size.xs,
  textAlign: 'center',
  gap: vars.space['1'],
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
  padding: `${vars.space['1']} ${vars.space['2']}`,
  borderRadius: vars.radii.sm,
  cursor: 'pointer',
  transition: 'background 0.15s ease',
  fontSize: vars.font.size['2xs'],
  ':hover': {
    background: `color-mix(in srgb, ${vars.color.primary} 8%, transparent)`,
  },
});

export const sessionItemActive = style({
  background: `color-mix(in srgb, ${vars.color.primary} 12%, transparent)`,
  border: `1px solid color-mix(in srgb, ${vars.color.primary} 30%, transparent)`,
});
