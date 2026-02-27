import { style, keyframes, globalStyle } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

const slideDown = keyframes({
  from: { height: '0' },
  to: { height: 'var(--radix-accordion-content-height)' },
});

const slideUp = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: '0' },
});

export const accordionRoot = style({
  borderRadius: vars.radii.lg,
  border: `1px solid ${vars.color.border}`,
  overflow: 'hidden',
});

export const accordionItem = style({
  borderBottom: `1px solid ${vars.color.borderSubtle}`,
  selectors: {
    '&:last-child': {
      borderBottom: 'none',
    },
  },
});

export const accordionTrigger = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: `${vars.space['4']} ${vars.space['4']}`,
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text,
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  textAlign: 'left',
  transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.ghostHover,
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.focusRing}`,
      outlineOffset: '-2px',
    },
  },
});

export const accordionChevron = style({
  transition: `transform ${vars.motion.duration.normal} ${vars.motion.easing.default}`,
  flexShrink: 0,
  color: vars.color.textMuted,
});

globalStyle(`${accordionTrigger}[data-state="open"] ${accordionChevron}`, {
  transform: 'rotate(180deg)',
});

export const accordionContent = style({
  overflow: 'hidden',
  fontSize: vars.font.size.sm,
  color: vars.color.textMuted,
  selectors: {
    '&[data-state="open"]': {
      animation: `${slideDown} ${vars.motion.duration.normal} ${vars.motion.easing.default}`,
    },
    '&[data-state="closed"]': {
      animation: `${slideUp} ${vars.motion.duration.normal} ${vars.motion.easing.default}`,
    },
  },
});

export const accordionContentInner = style({
  padding: `0 ${vars.space['4']} ${vars.space['4']}`,
});
