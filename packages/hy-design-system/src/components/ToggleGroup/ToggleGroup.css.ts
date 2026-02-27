import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

export const toggleGroupRoot = style({
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: vars.radii.md,
  border: `1px solid ${vars.color.border}`,
  overflow: 'hidden',
  gap: 0,
});

export const toggleGroupItem = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: vars.space['10'],
  paddingLeft: vars.space['3'],
  paddingRight: vars.space['3'],
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium,
  color: vars.color.textMuted,
  backgroundColor: 'transparent',
  border: 'none',
  borderRight: `1px solid ${vars.color.border}`,
  cursor: 'pointer',
  transition: `all ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  selectors: {
    '&:last-child': {
      borderRight: 'none',
    },
    '&:hover': {
      backgroundColor: vars.color.ghostHover,
      color: vars.color.text,
    },
    '&[data-state="on"]': {
      backgroundColor: vars.color.ghostHover,
      color: vars.color.text,
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.focusRing}`,
      outlineOffset: '-2px',
    },
    '&:disabled': {
      opacity: '0.5',
      cursor: 'not-allowed',
    },
  },
});
