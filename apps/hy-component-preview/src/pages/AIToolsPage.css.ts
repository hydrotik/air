import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

export const page = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['8'],
  padding: vars.space['8'],
  maxWidth: '1200px',
  marginLeft: 'auto',
  marginRight: 'auto',
  overflowX: 'hidden',
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['4'],
});

export const sectionTitle = style({
  fontSize: vars.font.size.lg,
  fontWeight: vars.font.weight.bold,
  color: vars.color.text,
  fontFamily: vars.font.family.sans,
  margin: 0,
  paddingBottom: vars.space['2'],
  borderBottom: `1px solid ${vars.color.border}`,
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: vars.space['4'],
  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const chatDemo = style({
  display: 'flex',
  flexDirection: 'column',
  height: '500px',
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.lg,
  overflow: 'hidden',
});

export const chatScroll = style({
  flex: 1,
  overflowY: 'auto',
  padding: vars.space['4'],
});

export const chatInput = style({
  padding: vars.space['4'],
  borderTop: `1px solid ${vars.color.border}`,
});

export const componentShowcase = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['3'],
  padding: vars.space['4'],
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.lg,
  backgroundColor: vars.color.surface,
  overflow: 'hidden',
  minWidth: 0,
});

export const showcaseLabel = style({
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.medium,
  color: vars.color.textMuted,
  fontFamily: vars.font.family.mono,
  textTransform: 'uppercase',
  letterSpacing: '1px',
});
