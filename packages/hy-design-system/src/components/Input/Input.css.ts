import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@hydrotik/tokens';

export const inputWrapperRecipe = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: vars.space['1_5'],
  },
  variants: {
    fullWidth: {
      true: { width: '100%' },
      false: {},
    },
  },
  defaultVariants: { fullWidth: false },
});

/**
 * Input — shadcn v4 aligned.
 * Uses shadow-xs, border-input, dark bg-input/30 pattern.
 */
export const inputRecipe = recipe({
  base: {
    width: '100%',
    minWidth: 0,
    backgroundColor: vars.color.input,
    color: vars.color.text,
    border: `1px solid ${vars.color.border}`,
    borderRadius: vars.radii.md,
    fontFamily: vars.font.family.sans,
    fontSize: vars.font.size.sm,
    lineHeight: vars.font.lineHeight.normal,
    boxShadow: vars.shadow.xs,
    outline: 'none',
    transition: [
      `color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
      `box-shadow ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
    ].join(', '),
    selectors: {
      '&::placeholder': {
        color: vars.color.placeholder,
      },
      '&:focus-visible': {
        borderColor: vars.color.focusRing,
        boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.focusRing} 50%, transparent)`,
      },
      '&:disabled': {
        opacity: '0.5',
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
      '&[aria-invalid="true"]': {
        borderColor: vars.color.destructive,
        boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.destructive} 20%, transparent)`,
      },
    },
  },
  variants: {
    size: {
      sm: {
        height: vars.space['7'],
        paddingLeft: vars.space['2'],
        paddingRight: vars.space['2'],
        fontSize: vars.font.size.xs,
      },
      md: {
        height: vars.space['8'],
        paddingLeft: vars.space['3'],
        paddingRight: vars.space['3'],
        fontSize: vars.font.size.sm,
      },
      lg: {
        height: vars.space['10'],
        paddingLeft: vars.space['3'],
        paddingRight: vars.space['3'],
        fontSize: vars.font.size.sm,
      },
    },
  },
  defaultVariants: { size: 'md' },
});
