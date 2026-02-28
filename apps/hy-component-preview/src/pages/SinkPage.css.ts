import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

export const sinkContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '64px',
  padding: `${vars.space['6']} ${vars.space['6']} 80px`,
  maxWidth: '56rem',
  width: '100%',
  margin: '0 auto',
});

export const componentSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['4'],
  scrollMarginTop: '72px',
});

export const componentName = style({
  fontSize: vars.font.size.sm,
  fontWeight: 500,
  color: vars.color.textMuted,
});

export const demoRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: vars.space['3'],
});

export const demoColumn = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['3'],
  width: '100%',
});

export const demoBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['3'],
  maxWidth: '24rem',
  width: '100%',
});

export const demoWide = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['3'],
  maxWidth: '36rem',
  width: '100%',
});

export const contextTarget = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '150px',
  width: '300px',
  borderRadius: vars.radii.lg,
  border: `2px dashed ${vars.color.border}`,
  fontSize: vars.font.size.sm,
  color: vars.color.textMuted,
});
