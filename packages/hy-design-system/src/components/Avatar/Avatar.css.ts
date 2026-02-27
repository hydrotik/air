import { recipe } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

export const avatarRoot = recipe({
  base: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
    overflow: 'hidden',
    borderRadius: vars.radii.full,
    backgroundColor: vars.color.secondary,
    flexShrink: 0,
  },
  variants: {
    size: {
      sm: { width: vars.space['6'], height: vars.space['6'] },
      md: { width: vars.space['8'], height: vars.space['8'] },
      lg: { width: vars.space['10'], height: vars.space['10'] },
      xl: { width: vars.space['14'], height: vars.space['14'] },
    },
  },
  defaultVariants: { size: 'md' },
});

export const avatarImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 'inherit',
});

export const avatarFallback = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: vars.color.secondary,
  color: vars.color.secondaryForeground,
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium,
  lineHeight: '1',
});
