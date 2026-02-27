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
    cursor: 'default',
    outline: 'none',
    transition: `border-color ${vars.motion.duration.fast} ${vars.motion.easing.default}, box-shadow ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
    selectors: {
      '&:hover': {
        borderColor: vars.color.textMuted,
      },
      '&:focus': {
        borderColor: vars.color.focusRing,
        boxShadow: `0 0 0 2px color-mix(in srgb, ${vars.color.focusRing} 20%, transparent)`,
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
      md: { height: vars.space['8'], padding: `0 ${vars.space['2_5']}` },
      lg: { height: vars.space['10'], padding: `0 ${vars.space['3']}`, fontSize: vars.font.size.sm },
    },
    isError: {
      true: {
        borderColor: vars.color.destructive,
        selectors: {
          '&:focus': {
            borderColor: vars.color.destructive,
            boxShadow: `0 0 0 2px color-mix(in srgb, ${vars.color.destructive} 20%, transparent)`,
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
  boxShadow: vars.shadow.lg,
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
    '&[data-state="checked"]': {
      fontWeight: vars.font.weight.medium,
    },
  },
});

export const selectItemIndicator = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: vars.space['4'],
  flexShrink: 0,
  color: vars.color.primary,
});

export const selectLabel = style({
  padding: `${vars.space['1_5']} ${vars.space['2']}`,
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.textMuted,
  textTransform: 'uppercase',
  letterSpacing: vars.font.letterSpacing.wide,
});

export const selectSeparator = style({
  height: '1px',
  backgroundColor: vars.color.borderSubtle,
  margin: `${vars.space['1']} 0`,
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
});
