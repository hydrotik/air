import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

const slideIn = keyframes({
  from: { opacity: '0', transform: 'scale(0.96)' },
  to: { opacity: '1', transform: 'scale(1)' },
});

export const menubarRoot = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['1'],
  borderRadius: vars.radii.md,
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surface,
  padding: vars.space['1'],
  boxShadow: vars.shadow.sm,
});

export const menubarTrigger = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space['1'],
  borderRadius: vars.radii.sm,
  padding: `${vars.space['1_5']} ${vars.space['3']}`,
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text,
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
  transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.ghostHover,
    },
    '&[data-state="open"]': {
      backgroundColor: vars.color.ghostHover,
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.focusRing}`,
      outlineOffset: '-2px',
    },
  },
});

export const menubarContent = style({
  zIndex: vars.zIndex.dropdown,
  minWidth: '200px',
  overflow: 'hidden',
  borderRadius: vars.radii.md,
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surfaceElevated,
  padding: vars.space['1'],
  boxShadow: vars.shadow.lg,
  animation: `${slideIn} ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
});

export const menubarItem = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['2'],
  borderRadius: vars.radii.sm,
  padding: `${vars.space['1_5']} ${vars.space['2']}`,
  fontSize: vars.font.size.sm,
  color: vars.color.text,
  cursor: 'pointer',
  outline: 'none',
  userSelect: 'none',
  transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  selectors: {
    '&[data-highlighted]': {
      backgroundColor: vars.color.ghostHover,
    },
    '&[data-disabled]': {
      color: vars.color.textDisabled,
      pointerEvents: 'none',
    },
  },
});

export const menubarSeparator = style({
  height: '1px',
  margin: `${vars.space['1']} ${vars.space['0_5']}`,
  backgroundColor: vars.color.borderSubtle,
});

export const menubarLabel = style({
  padding: `${vars.space['1_5']} ${vars.space['2']}`,
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.textMuted,
});

export const menubarShortcut = style({
  marginLeft: 'auto',
  fontSize: vars.font.size.xs,
  letterSpacing: vars.font.letterSpacing.wide,
  color: vars.color.textMuted,
});

export const menubarSubTrigger = style([
  menubarItem,
  {
    selectors: {
      '&[data-state="open"]': {
        backgroundColor: vars.color.ghostHover,
      },
    },
  },
]);

export const menubarSubContent = style([menubarContent, {}]);

export const menubarCheckboxItem = style([menubarItem, {}]);
export const menubarRadioItem = style([menubarItem, {}]);

export const menubarItemIndicator = style({
  position: 'absolute',
  left: vars.space['2'],
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '14px',
  height: '14px',
});
