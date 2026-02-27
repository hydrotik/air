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

export const inputRecipe = recipe({
  base: {
    width: '100%',
    backgroundColor: vars.color.input,
    color: vars.color.text,
    border: `1px solid ${vars.color.border}`,
    borderRadius: vars.radii.md,
    fontFamily: vars.font.family.sans,
    fontSize: vars.font.size.sm,
    lineHeight: vars.font.lineHeight.normal,
    transition: [
      `border-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
      `box-shadow ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
    ].join(', '),
    selectors: {
      '&::placeholder': {
        color: vars.color.placeholder,
      },
      '&:hover:not(:disabled):not([aria-invalid="true"])': {
        borderColor: vars.color.textMuted,
      },
      '&:focus-visible': {
        outline: 'none',
        borderColor: vars.color.focusRing,
        boxShadow: `0 0 0 2px ${vars.color.focusRing}30`,
      },
      '&:disabled': {
        opacity: '0.5',
        cursor: 'not-allowed',
        backgroundColor: vars.color.surface,
      },
      '&[aria-invalid="true"]': {
        borderColor: vars.color.destructive,
        boxShadow: `0 0 0 2px ${vars.color.destructive}30`,
      },
    },
  },
  variants: {
    size: {
      sm: {
        height: vars.space['8'],
        paddingLeft: vars.space['3'],
        paddingRight: vars.space['3'],
        fontSize: vars.font.size.xs,
      },
      md: {
        height: vars.space['10'],
        paddingLeft: vars.space['3'],
        paddingRight: vars.space['3'],
        fontSize: vars.font.size.sm,
      },
      lg: {
        height: vars.space['12'],
        paddingLeft: vars.space['4'],
        paddingRight: vars.space['4'],
        fontSize: vars.font.size.md,
      },
    },
  },
  defaultVariants: { size: 'md' },
});
