import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@hydrotik/tokens';

/**
 * Toggle — shadcn v4 aligned.
 * - hover: bg-muted (secondary) + text-muted
 * - on: bg-accent (ghostHover) + text-foreground
 * - outline: border + shadow-xs
 */
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
    whiteSpace: 'nowrap',
    outline: 'none',
    transition: `color ${vars.motion.duration.fast} ${vars.motion.easing.default}, box-shadow ${vars.motion.duration.fast} ${vars.motion.easing.default}, background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
    selectors: {
      '&:hover': {
        backgroundColor: vars.color.secondary,
        color: vars.color.textMuted,
      },
      '&[data-state="on"]': {
        backgroundColor: vars.color.ghostHover,
        color: vars.color.text,
      },
      '&:focus-visible': {
        borderColor: vars.color.focusRing,
        boxShadow: `0 0 0 1px color-mix(in srgb, ${vars.color.focusRing} 25%, transparent)`,
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
        backgroundColor: 'transparent',
        boxShadow: vars.shadow.xs,
        selectors: {
          '&:hover': {
            backgroundColor: vars.color.ghostHover,
          },
        },
      },
    },
    size: {
      sm: {
        height: vars.space['7'],
        paddingLeft: vars.space['1_5'],
        paddingRight: vars.space['1_5'],
        minWidth: vars.space['7'],
      },
      md: {
        height: vars.space['8'],
        paddingLeft: vars.space['2'],
        paddingRight: vars.space['2'],
        minWidth: vars.space['8'],
      },
      lg: {
        height: vars.space['10'],
        paddingLeft: vars.space['2_5'],
        paddingRight: vars.space['2_5'],
        minWidth: vars.space['10'],
      },
    },
  },
  defaultVariants: { variant: 'default', size: 'md' },
});
