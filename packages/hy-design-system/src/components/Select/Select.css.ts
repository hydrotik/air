import { style, keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@hydrotik/tokens';

const slideDownAndFade = keyframes({
  from: { opacity: 0, transform: 'translateY(-4px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

const slideUpAndFade = keyframes({
  from: { opacity: 0, transform: 'translateY(4px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

/**
 * Select — shadcn v4 aligned.
 * - Trigger: shadow-xs, border-input, dark bg
 * - Content: bg-popover (surfaceElevated)
 * - Labels: no uppercase
 * - Item highlight: ghostHover, no text color change
 */
export const selectTrigger = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: vars.space['2'],
    width: '100%',
    borderRadius: vars.radii.md,
    border: `1px solid ${vars.color.border}`,
    backgroundColor: vars.color.input,
    color: vars.color.text,
    fontFamily: vars.font.family.sans,
    fontSize: vars.font.size.sm,
    lineHeight: vars.font.lineHeight.normal,
    boxShadow: vars.shadow.xs,
    cursor: 'default',
    outline: 'none',
    whiteSpace: 'nowrap',
    transition: `color ${vars.motion.duration.fast} ${vars.motion.easing.default}, box-shadow ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
    selectors: {
      '&:focus-visible': {
        borderColor: vars.color.focusRing,
        boxShadow: `0 0 0 1px color-mix(in srgb, ${vars.color.focusRing} 25%, transparent)`,
      },
      '&[data-placeholder]': {
        color: vars.color.placeholder,
      },
      '&[data-disabled]': {
        opacity: '0.5',
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
  },
  variants: {
    size: {
      sm: { height: vars.space['7'], padding: `0 ${vars.space['2']}`, fontSize: vars.font.size.xs },
      md: { height: vars.space['8'], padding: `0 ${vars.space['3']}` },
      lg: { height: vars.space['10'], padding: `0 ${vars.space['3']}`, fontSize: vars.font.size.sm },
    },
    isError: {
      true: {
        borderColor: vars.color.destructive,
        selectors: {
          '&:focus-visible': {
            borderColor: vars.color.destructive,
            boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.destructive} 20%, transparent)`,
          },
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
    isError: false,
  },
});

export const selectContent = style({
  overflow: 'hidden',
  backgroundColor: vars.color.surfaceElevated,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.md,
  boxShadow: vars.shadow.md,
  zIndex: vars.zIndex.dropdown,
  minWidth: 'var(--radix-select-trigger-width)',
  maxHeight: 'var(--radix-select-content-available-height)',
  animationDuration: vars.motion.duration.normal,
  animationTimingFunction: vars.motion.easing.default,
  selectors: {
    '&[data-state="open"][data-side="bottom"]': {
      animationName: slideDownAndFade,
    },
    '&[data-state="open"][data-side="top"]': {
      animationName: slideUpAndFade,
    },
  },
});

export const selectViewport = style({
  padding: vars.space['1'],
});

export const selectItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['2'],
  padding: `${vars.space['1_5']} ${vars.space['2']}`,
  paddingRight: vars.space['8'],
  borderRadius: vars.radii.sm,
  fontSize: vars.font.size.sm,
  color: vars.color.text,
  cursor: 'default',
  userSelect: 'none',
  position: 'relative',
  outline: 'none',
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

export const selectItemIndicator = style({
  position: 'absolute',
  right: vars.space['2'],
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '14px',
  height: '14px',
});

export const selectLabel = style({
  padding: `${vars.space['1_5']} ${vars.space['2']}`,
  fontSize: vars.font.size.xs,
  color: vars.color.textMuted,
});

export const selectSeparator = style({
  height: '1px',
  backgroundColor: vars.color.borderSubtle,
  margin: `${vars.space['1']} -${vars.space['1']}`,
});

export const selectScrollButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '25px',
  cursor: 'default',
  color: vars.color.textMuted,
});

export const selectIcon = style({
  color: vars.color.textMuted,
  flexShrink: 0,
  opacity: '0.5',
});
