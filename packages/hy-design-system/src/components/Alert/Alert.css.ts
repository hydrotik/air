import { recipe } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

export const alertRecipe = recipe({
  base: {
    position: 'relative',
    display: 'flex',
    gap: vars.space['3'],
    width: '100%',
    borderRadius: vars.radii.lg,
    border: `1px solid ${vars.color.border}`,
    padding: vars.space['3'],
    fontSize: vars.font.size.sm,
    lineHeight: vars.font.lineHeight.normal,
  },
  variants: {
    variant: {
      default: {
        backgroundColor: vars.color.surface,
        color: vars.color.text,
      },
      destructive: {
        borderColor: vars.color.destructive,
        color: vars.color.destructive,
      },
      success: {
        borderColor: vars.color.success,
        color: vars.color.success,
      },
      warning: {
        borderColor: vars.color.warning,
        color: vars.color.warning,
      },
    },
  },
  defaultVariants: { variant: 'default' },
});

export const alertIcon = style({
  flexShrink: 0,
  marginTop: '1px',
});

export const alertTitle = style({
  fontWeight: vars.font.weight.semibold,
  lineHeight: vars.font.lineHeight.tight,
  letterSpacing: vars.font.letterSpacing.tight,
  marginBottom: vars.space['1'],
});

export const alertDescription = style({
  fontSize: vars.font.size.sm,
  color: vars.color.textMuted,
  lineHeight: vars.font.lineHeight.relaxed,
});
