import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

export const tabsList = style({
  display: 'inline-flex',
  alignItems: 'center',
  backgroundColor: vars.color.secondary,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.md,
  padding: vars.space['1'],
  gap: vars.space['0_5'],
});

export const tabsTrigger = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: vars.space['1_5'],
  paddingBottom: vars.space['1_5'],
  paddingLeft: vars.space['4'],
  paddingRight: vars.space['4'],
  borderRadius: vars.radii.sm,
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium,
  color: vars.color.textMuted,
  cursor: 'pointer',
  border: 'none',
  backgroundColor: 'transparent',
  transition: `all ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  selectors: {
    '&:hover': {
      color: vars.color.text,
      backgroundColor: vars.color.ghostHover,
    },
    '&[data-state="active"]': {
      color: vars.color.text,
      backgroundColor: vars.color.surfaceElevated,
      boxShadow: vars.shadow.sm,
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.focusRing}`,
      outlineOffset: '2px',
    },
    '&:disabled': {
      opacity: '0.5',
      cursor: 'not-allowed',
    },
  },
});

export const tabsContent = style({
  marginTop: vars.space['4'],
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${vars.color.focusRing}`,
      outlineOffset: '2px',
      borderRadius: vars.radii.sm,
    },
  },
});
