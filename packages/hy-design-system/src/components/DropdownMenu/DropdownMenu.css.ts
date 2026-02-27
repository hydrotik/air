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

/**
 * DropdownMenu — shadcn v4 aligned.
 * - bg-popover (surfaceElevated)
 * - No text color change on highlight (focus:bg-accent only)
 * - Labels: font-medium, no uppercase
 */
export const dropdownContent = style({
  minWidth: '8rem',
  backgroundColor: vars.color.surfaceElevated,
  color: vars.color.text,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.md,
  boxShadow: vars.shadow.md,
  padding: vars.space['1'],
  zIndex: vars.zIndex.dropdown,
  overflow: 'hidden',
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
  gap: vars.space['2'],
  padding: `${vars.space['1_5']} ${vars.space['2']}`,
  borderRadius: vars.radii.sm,
  fontSize: vars.font.size.sm,
  color: vars.color.text,
  cursor: 'default',
  userSelect: 'none',
  outline: 'none',
  position: 'relative',
  transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  selectors: {
    '&[data-highlighted]': {
      backgroundColor: vars.color.ghostHover,
    },
    '&[data-disabled]': {
      opacity: '0.5',
      pointerEvents: 'none',
    },
  },
});

export const dropdownDestructiveItem = style([
  dropdownItem,
  {
    color: vars.color.destructive,
    selectors: {
      '&[data-highlighted]': {
        backgroundColor: `color-mix(in srgb, ${vars.color.destructive} 10%, transparent)`,
        color: vars.color.destructive,
      },
    },
  },
]);

export const dropdownLabel = style({
  padding: `${vars.space['1_5']} ${vars.space['2']}`,
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium,
});

export const dropdownSeparator = style({
  height: '1px',
  backgroundColor: vars.color.borderSubtle,
  margin: `${vars.space['1']} -${vars.space['1']}`,
});

export const dropdownItemIndicator = style({
  position: 'absolute',
  left: vars.space['2'],
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '14px',
  height: '14px',
});

export const dropdownCheckboxItem = style([
  dropdownItem,
  {
    paddingLeft: vars.space['8'],
  },
]);

export const dropdownRadioItem = style([dropdownCheckboxItem]);

export const dropdownSubTrigger = style([
  dropdownItem,
  {
    selectors: {
      '&[data-state="open"]': {
        backgroundColor: vars.color.ghostHover,
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
