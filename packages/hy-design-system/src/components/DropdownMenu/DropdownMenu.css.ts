import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';
import {
  baseMenuItem,
  baseMenuSeparator,
  baseMenuLabel,
  baseMenuShortcut,
  baseMenuItemIndicator,
} from '../../styles/menu-item.css';

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
 * Uses shared menu-item styles + directional animations.
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

export const dropdownItem = baseMenuItem;

export const dropdownDestructiveItem = style([
  baseMenuItem,
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

export const dropdownLabel = baseMenuLabel;
export const dropdownSeparator = baseMenuSeparator;
export const dropdownItemIndicator = baseMenuItemIndicator;
export const dropdownShortcut = baseMenuShortcut;

export const dropdownCheckboxItem = style([
  baseMenuItem,
  {
    paddingLeft: vars.space['8'],
  },
]);

export const dropdownRadioItem = style([dropdownCheckboxItem]);

export const dropdownSubTrigger = style([
  baseMenuItem,
  {
    selectors: {
      '&[data-state="open"]': {
        backgroundColor: vars.color.ghostHover,
      },
    },
  },
]);

export const dropdownSubContent = style([dropdownContent]);
