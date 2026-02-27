import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@hydrotik/tokens';

export const toggleRecipe = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vars.space['2'],
    fontFamily: vars.font.family.sans,
    fontSize: vars.font.size.sm,
    fontWeight: vars.font.weight.medium,
    borderRadius: vars.radii.md,
    border: 'none',
    backgroundColor: 'transparent',
    color: vars.color.textMuted,
    cursor: 'pointer',
    transition: `all ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
    selectors: {
      '&:hover': {
        backgroundColor: vars.color.ghostHover,
        color: vars.color.text,
      },
      '&[data-state="on"]': {
        backgroundColor: vars.color.ghostHover,
        color: vars.color.text,
      },
      '&:focus-visible': {
        outline: `2px solid ${vars.color.focusRing}`,
        outlineOffset: '2px',
      },
      '&:disabled': {
        opacity: '0.5',
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
  },
  variants: {
    variant: {
      default: {},
      outline: {
        border: `1px solid ${vars.color.border}`,
        selectors: {
          '&[data-state="on"]': {
            backgroundColor: vars.color.ghostHover,
            borderColor: vars.color.primary,
          },
        },
      },
    },
    size: {
      sm: {
        height: vars.space['8'],
        paddingLeft: vars.space['2'],
        paddingRight: vars.space['2'],
      },
      md: {
        height: vars.space['10'],
        paddingLeft: vars.space['3'],
        paddingRight: vars.space['3'],
      },
      lg: {
        height: vars.space['12'],
        paddingLeft: vars.space['4'],
        paddingRight: vars.space['4'],
      },
    },
  },
  defaultVariants: { variant: 'default', size: 'md' },
});
