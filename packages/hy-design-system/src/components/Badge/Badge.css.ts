import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@hydrotik/tokens';

/**
 * Badge recipe — shadcn v4 aligned.
 * - `default` = solid primary bg (was missing)
 * - `secondary` = muted bg
 * - `destructive` = solid destructive bg
 * - `outline` = transparent with border
 * - Kept `success` / `warning` as useful extensions
 * - Rounded full (pill), no size variants (shadcn has single size)
 */
export const badgeRecipe = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: vars.radii.full,
    border: '1px solid transparent',
    fontWeight: vars.font.weight.medium,
    fontFamily: vars.font.family.sans,
    fontSize: vars.font.size.xs,
    whiteSpace: 'nowrap',
    lineHeight: '1',
    padding: `${vars.space['0_5']} ${vars.space['2_5']}`,
    gap: vars.space['1'],
    width: 'fit-content',
    flexShrink: 0,
    overflow: 'hidden',
    transition: `color ${vars.motion.duration.fast} ${vars.motion.easing.default}, box-shadow ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  },
  variants: {
    variant: {
      default: {
        backgroundColor: vars.color.primary,
        color: vars.color.primaryForeground,
      },
      secondary: {
        backgroundColor: vars.color.secondary,
        color: vars.color.secondaryForeground,
      },
      destructive: {
        backgroundColor: vars.color.destructive,
        color: vars.color.destructiveForeground,
      },
      outline: {
        backgroundColor: 'transparent',
        color: vars.color.text,
        borderColor: vars.color.border,
      },
      success: {
        backgroundColor: vars.color.success,
        color: vars.color.successForeground,
      },
      warning: {
        backgroundColor: vars.color.warning,
        color: vars.color.warningForeground,
      },
    },
  },
  defaultVariants: { variant: 'default' },
});
