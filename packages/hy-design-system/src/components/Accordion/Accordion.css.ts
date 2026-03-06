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

/**
 * Accordion — shadcn v4 aligned.
 * No wrapping border container — items separated by bottom border.
 */
export const accordionRoot = style({});

export const accordionItem = style({
  borderBottom: `1px solid ${vars.color.border}`,
  selectors: {
    '&:last-child': {
      borderBottom: 'none',
    },
  },
});

export const accordionTrigger = style({
  display: 'flex',
  flex: 1,
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: vars.space['4'],
  width: '100%',
  padding: `${vars.space['4']} 0`,
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text,
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: vars.radii.md,
  cursor: 'pointer',
  textAlign: 'left',
  outline: 'none',
  transition: `all ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  selectors: {
    '&:hover': {
      textDecoration: 'underline',
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.focusRing}`,
      outlineOffset: '2px',
      boxShadow: `0 0 0 1px color-mix(in srgb, ${vars.color.focusRing} 25%, transparent)`,
    },
    '&:disabled': {
      opacity: '0.5',
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
  },
});

export const accordionChevron = style({
  transition: `transform ${vars.motion.duration.normal} ${vars.motion.easing.default}`,
  flexShrink: 0,
  color: vars.color.textMuted,
  marginTop: '2px',
  width: '16px',
  height: '16px',
  pointerEvents: 'none',
});

globalStyle(`${accordionTrigger}[data-state="open"] ${accordionChevron}`, {
  transform: 'rotate(180deg)',
});

export const accordionContent = style({
  overflow: 'hidden',
  fontSize: vars.font.size.sm,
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
  paddingTop: 0,
  paddingBottom: vars.space['4'],
});
