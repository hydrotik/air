import { recipe } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

export const cardRecipe = recipe({
  base: {
    backgroundColor: vars.color.surface,
    border: `1px solid ${vars.color.border}`,
    borderRadius: vars.radii.lg,
    overflow: 'hidden',
  },
  variants: {
    elevation: {
      flat: {},
      raised: { boxShadow: vars.shadow.sm },
      elevated: {
        backgroundColor: vars.color.surfaceElevated,
        boxShadow: vars.shadow.md,
      },
    },
    padding: {
      none: {},
      sm: { padding: vars.space['4'] },
      md: { padding: vars.space['6'] },
      lg: { padding: vars.space['8'] },
    },
  },
  defaultVariants: { elevation: 'raised', padding: 'md' },
});

export const cardHeader = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['1_5'],
  paddingBottom: vars.space['4'],
  borderBottom: `1px solid ${vars.color.borderSubtle}`,
  marginBottom: vars.space['4'],
});

export const cardTitle = style({
  fontSize: vars.font.size.lg,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text,
  lineHeight: vars.font.lineHeight.tight,
});

export const cardDescription = style({
  fontSize: vars.font.size.sm,
  color: vars.color.textMuted,
  lineHeight: vars.font.lineHeight.normal,
});

export const cardFooter = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['3'],
  paddingTop: vars.space['4'],
  borderTop: `1px solid ${vars.color.borderSubtle}`,
  marginTop: vars.space['4'],
});
