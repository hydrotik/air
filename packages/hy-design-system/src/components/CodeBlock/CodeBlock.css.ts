import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

export const codeBlockWrapper = style({
  position: 'relative',
  marginTop: vars.space['4'],
  marginBottom: vars.space['4'],
});

export const codeBlockPre = style({
  borderRadius: vars.radii.md,
  overflow: 'auto',
  fontFamily: vars.font.family.mono,
  fontSize: vars.font.size.sm,
  lineHeight: vars.font.lineHeight.relaxed,
  padding: vars.space['4'],
  margin: 0,
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  color: vars.color.text,
});

export const copyButton = style({
  position: 'absolute',
  top: vars.space['2'],
  right: vars.space['2'],
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['1_5'],
  borderRadius: vars.radii.md,
  border: 'none',
  backgroundColor: vars.color.surfaceElevated,
  color: vars.color.textMuted,
  paddingLeft: vars.space['2'],
  paddingRight: vars.space['2'],
  paddingTop: vars.space['1'],
  paddingBottom: vars.space['1'],
  fontSize: vars.font.size.xs,
  fontFamily: vars.font.family.sans,
  cursor: 'pointer',
  transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}, color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.ghostHover,
      color: vars.color.text,
    },
  },
});

export const languageBadge = style({
  position: 'absolute',
  top: vars.space['2'],
  left: vars.space['2'],
  fontSize: '10px',
  fontFamily: vars.font.family.mono,
  color: vars.color.textMuted,
  textTransform: 'uppercase',
  letterSpacing: '1px',
  userSelect: 'none',
});

export const inlineCode = style({
  fontFamily: vars.font.family.mono,
  fontSize: '0.875em',
  backgroundColor: vars.color.secondary,
  color: vars.color.text,
  borderRadius: vars.radii.sm,
  paddingLeft: vars.space['1'],
  paddingRight: vars.space['1'],
  paddingTop: '2px',
  paddingBottom: '2px',
});
