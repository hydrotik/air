import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

export const commandRoot = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  overflow: 'hidden',
  borderRadius: vars.radii.lg,
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surfaceElevated,
});

export const commandInput = style({
  display: 'flex',
  width: '100%',
  borderBottom: `1px solid ${vars.color.borderSubtle}`,
});

export const commandInputField = style({
  flex: 1,
  height: vars.space['12'],
  padding: `0 ${vars.space['4']}`,
  fontSize: vars.font.size.sm,
  fontFamily: vars.font.family.sans,
  color: vars.color.text,
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  selectors: {
    '&::placeholder': {
      color: vars.color.placeholder,
    },
  },
});

export const commandList = style({
  maxHeight: '300px',
  overflow: 'auto',
  padding: vars.space['1'],
});

export const commandEmpty = style({
  padding: `${vars.space['6']} 0`,
  textAlign: 'center',
  fontSize: vars.font.size.sm,
  color: vars.color.textMuted,
});

export const commandGroup = style({
  overflow: 'hidden',
  padding: vars.space['1'],
});

export const commandGroupHeading = style({
  padding: `${vars.space['1_5']} ${vars.space['2']}`,
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.textMuted,
  letterSpacing: vars.font.letterSpacing.wide,
  textTransform: 'uppercase' as const,
});

export const commandItem = style({
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
    '&:hover': {
      backgroundColor: vars.color.ghostHover,
    },
    '&[aria-selected="true"]': {
      backgroundColor: vars.color.ghostHover,
    },
    '&[data-disabled="true"]': {
      color: vars.color.textDisabled,
      pointerEvents: 'none',
    },
  },
});

export const commandSeparator = style({
  height: '1px',
  margin: `${vars.space['1']} 0`,
  backgroundColor: vars.color.borderSubtle,
});

export const commandShortcut = style({
  marginLeft: 'auto',
  fontSize: vars.font.size.xs,
  color: vars.color.textMuted,
  letterSpacing: vars.font.letterSpacing.wide,
});

export const commandInputIcon = style({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: vars.space['3'],
  color: vars.color.textMuted,
  flexShrink: 0,
});
