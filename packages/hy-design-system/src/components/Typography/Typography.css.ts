import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

export const h1 = style({
  fontSize: vars.font.size['4xl'],
  fontWeight: vars.font.weight.bold,
  lineHeight: vars.font.lineHeight.tight,
  letterSpacing: vars.font.letterSpacing.tight,
  color: vars.color.text,
});

export const h2 = style({
  fontSize: vars.font.size['3xl'],
  fontWeight: vars.font.weight.semibold,
  lineHeight: vars.font.lineHeight.tight,
  letterSpacing: vars.font.letterSpacing.tight,
  color: vars.color.text,
});

export const h3 = style({
  fontSize: vars.font.size['2xl'],
  fontWeight: vars.font.weight.semibold,
  lineHeight: vars.font.lineHeight.tight,
  letterSpacing: vars.font.letterSpacing.tight,
  color: vars.color.text,
});

export const h4 = style({
  fontSize: vars.font.size.xl,
  fontWeight: vars.font.weight.semibold,
  lineHeight: vars.font.lineHeight.tight,
  letterSpacing: vars.font.letterSpacing.tight,
  color: vars.color.text,
});

export const p = style({
  fontSize: vars.font.size.md,
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.text,
});

export const lead = style({
  fontSize: vars.font.size.xl,
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.textMuted,
});

export const large = style({
  fontSize: vars.font.size.lg,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text,
});

export const small = style({
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium,
  lineHeight: vars.font.lineHeight.normal,
  color: vars.color.text,
});

export const muted = style({
  fontSize: vars.font.size.sm,
  color: vars.color.textMuted,
  lineHeight: vars.font.lineHeight.relaxed,
});

export const inlineCode = style({
  position: 'relative',
  fontFamily: vars.font.family.mono,
  fontSize: '0.875em',
  fontWeight: vars.font.weight.medium,
  backgroundColor: vars.color.secondary,
  borderRadius: vars.radii.sm,
  padding: `${vars.space['0_5']} ${vars.space['1_5']}`,
  color: vars.color.text,
});

export const blockquote = style({
  borderLeft: `3px solid ${vars.color.border}`,
  paddingLeft: vars.space['4'],
  fontStyle: 'italic',
  color: vars.color.textMuted,
  lineHeight: vars.font.lineHeight.relaxed,
});

export const ul = style({
  listStyleType: 'disc',
  paddingLeft: vars.space['6'],
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.text,
});

export const ol = style({
  listStyleType: 'decimal',
  paddingLeft: vars.space['6'],
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.text,
});

export const hr = style({
  border: 'none',
  borderTop: `1px solid ${vars.color.border}`,
  margin: `${vars.space['6']} 0`,
});
