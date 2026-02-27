import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@hydrotik/tokens';

export const badgeRecipe = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: vars.radii.full,
    fontWeight: vars.font.weight.medium,
    fontFamily: vars.font.family.sans,
    whiteSpace: 'nowrap',
    lineHeight: '1',
    border: '1px solid transparent',
  },
  variants: {
    variant: {
      default: {
        backgroundColor: vars.color.secondary,
        color: vars.color.secondaryForeground,
        borderColor: vars.color.border,
      },
      primary: {
        backgroundColor: `color-mix(in srgb, ${vars.color.primary} 12%, transparent)`,
        color: vars.color.primary,
        borderColor: `color-mix(in srgb, ${vars.color.primary} 25%, transparent)`,
      },
      destructive: {
        backgroundColor: `color-mix(in srgb, ${vars.color.destructive} 12%, transparent)`,
        color: vars.color.destructive,
        borderColor: `color-mix(in srgb, ${vars.color.destructive} 25%, transparent)`,
      },
      success: {
        backgroundColor: `color-mix(in srgb, ${vars.color.success} 12%, transparent)`,
        color: vars.color.success,
        borderColor: `color-mix(in srgb, ${vars.color.success} 25%, transparent)`,
      },
      warning: {
        backgroundColor: `color-mix(in srgb, ${vars.color.warning} 12%, transparent)`,
        color: vars.color.warning,
        borderColor: `color-mix(in srgb, ${vars.color.warning} 25%, transparent)`,
      },
      outline: {
        backgroundColor: 'transparent',
        color: vars.color.text,
        borderColor: vars.color.border,
      },
    },
    size: {
      sm: {
        fontSize: vars.font.size.xs,
        padding: `2px ${vars.space['2']}`,
      },
      md: {
        fontSize: vars.font.size.xs,
        padding: `${vars.space['0_5']} ${vars.space['2_5']}`,
      },
      lg: {
        fontSize: vars.font.size.sm,
        padding: `${vars.space['1']} ${vars.space['3']}`,
      },
    },
  },
  defaultVariants: { variant: 'default', size: 'md' },
});
