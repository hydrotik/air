import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

const slideDownAndFade = keyframes({
  from: { opacity: 0, transform: 'translateY(-4px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

const slideUpAndFade = keyframes({
  from: { opacity: 0, transform: 'translateY(4px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
  from: { opacity: 0, transform: 'translateX(4px)' },
  to: { opacity: 1, transform: 'translateX(0)' },
});

const slideRightAndFade = keyframes({
  from: { opacity: 0, transform: 'translateX(-4px)' },
  to: { opacity: 1, transform: 'translateX(0)' },
});

export const dropdownContent = style({
  minWidth: '180px',
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.md,
  boxShadow: vars.shadow.lg,
  padding: vars.space[1],
  zIndex: vars.zIndex.dropdown,
  animationDuration: vars.motion.duration.normal,
  animationTimingFunction: vars.motion.easing.default,
  selectors: {
    '&[data-side="top"]': { animationName: slideUpAndFade },
    '&[data-side="bottom"]': { animationName: slideDownAndFade },
    '&[data-side="left"]': { animationName: slideLeftAndFade },
    '&[data-side="right"]': { animationName: slideRightAndFade },
  },
});

export const dropdownItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[2],
  padding: `${vars.space[2]} ${vars.space[3]}`,
  borderRadius: vars.radii.sm,
  fontSize: vars.font.size.sm,
  color: vars.color.text,
  cursor: 'default',
  userSelect: 'none',
  outline: 'none',
  transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  selectors: {
    '&[data-highlighted]': {
      backgroundColor: vars.color.ghostHover,
      color: vars.color.primary,
    },
    '&[data-disabled]': {
      opacity: 0.5,
      pointerEvents: 'none',
    },
  },
});

export const dropdownDestructiveItem = style([
  dropdownItem,
  {
    selectors: {
      '&[data-highlighted]': {
      backgroundColor: vars.color.ghostHover,
        color: vars.color.destructive,
      },
    },
  },
]);

export const dropdownLabel = style({
  padding: `${vars.space[1]} ${vars.space[3]}`,
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.textMuted,
  textTransform: 'uppercase',
  letterSpacing: vars.font.letterSpacing.wide,
});

export const dropdownSeparator = style({
  height: '1px',
  backgroundColor: vars.color.border,
  margin: `${vars.space[1]} 0`,
});

export const dropdownItemIndicator = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: vars.space[4],
  flexShrink: 0,
  color: vars.color.primary,
});

export const dropdownCheckboxItem = style([
  dropdownItem,
  {
    paddingLeft: vars.space[8],
    position: 'relative',
  },
]);

export const dropdownRadioItem = style([dropdownCheckboxItem]);

export const dropdownSubTrigger = style([
  dropdownItem,
  {
    selectors: {
      '&[data-state="open"]': {
        backgroundColor: vars.color.ghostHover,
        color: vars.color.primary,
      },
    },
  },
]);

export const dropdownSubContent = style([dropdownContent]);

export const dropdownShortcut = style({
  marginLeft: 'auto',
  fontSize: vars.font.size.xs,
  color: vars.color.textMuted,
  letterSpacing: vars.font.letterSpacing.wide,
});
