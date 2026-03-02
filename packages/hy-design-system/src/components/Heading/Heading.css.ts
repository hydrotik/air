import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

export const headingRoot = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['1'],
});

export const headingTitle = style({
  fontFamily: vars.font.family.sans,
  fontWeight: vars.font.weight.bold,
  letterSpacing: vars.font.letterSpacing.tight,
  lineHeight: vars.font.lineHeight.tight,
  color: vars.color.text,
  margin: 0,
});

export const headingDescription = style({
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.sm,
  color: vars.color.textMuted,
  margin: 0,
  lineHeight: vars.font.lineHeight.normal,
});

export const headingSizeStyles = {
  sm: style({ fontSize: vars.font.size.xl }),
  md: style({ fontSize: vars.font.size['2xl'] }),
  lg: style({ fontSize: vars.font.size['3xl'] }),
  xl: style({ fontSize: vars.font.size['4xl'] }),
};
