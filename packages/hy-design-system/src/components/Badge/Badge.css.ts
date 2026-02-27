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
        backgroundColor: `${vars.color.primary}20`,
        color: vars.color.primary,
        borderColor: `${vars.color.primary}40`,
      },
      destructive: {
        backgroundColor: `${vars.color.destructive}20`,
        color: vars.color.destructive,
        borderColor: `${vars.color.destructive}40`,
      },
      success: {
        backgroundColor: `${vars.color.success}20`,
        color: vars.color.success,
        borderColor: `${vars.color.success}40`,
      },
      warning: {
        backgroundColor: `${vars.color.warning}20`,
        color: vars.color.warning,
        borderColor: `${vars.color.warning}40`,
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
