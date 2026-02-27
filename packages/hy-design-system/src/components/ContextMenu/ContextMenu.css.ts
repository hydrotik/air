import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

const slideIn = keyframes({
  from: { opacity: '0', transform: 'scale(0.96)' },
  to: { opacity: '1', transform: 'scale(1)' },
});

export const contextMenuContent = style({
  zIndex: vars.zIndex.dropdown,
  minWidth: '160px',
  overflow: 'hidden',
  borderRadius: vars.radii.md,
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surfaceElevated,
  padding: vars.space['1'],
  boxShadow: vars.shadow.lg,
  animation: `${slideIn} ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
});

export const contextMenuItem = style({
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

export const contextMenuCheckboxItem = style([contextMenuItem, {}]);
export const contextMenuRadioItem = style([contextMenuItem, {}]);

export const contextMenuLabel = style({
  padding: `${vars.space['1_5']} ${vars.space['2']}`,
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.textMuted,
});

export const contextMenuSeparator = style({
  height: '1px',
  margin: `${vars.space['1']} ${vars.space['0_5']}`,
  backgroundColor: vars.color.borderSubtle,
});

export const contextMenuShortcut = style({
  marginLeft: 'auto',
  fontSize: vars.font.size.xs,
  letterSpacing: vars.font.letterSpacing.wide,
  color: vars.color.textMuted,
});

export const contextMenuSubTrigger = style([
  contextMenuItem,
  {
    selectors: {
      '&[data-state="open"]': {
        backgroundColor: vars.color.ghostHover,
      },
    },
  },
]);

export const contextMenuSubContent = style([contextMenuContent, {}]);

export const contextMenuItemIndicator = style({
  position: 'absolute',
  left: vars.space['2'],
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '14px',
  height: '14px',
});
