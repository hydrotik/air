import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

export const formItemStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['2'],
  marginBottom: vars.space['2'],
});

export const formDescriptionStyle = style({
  fontSize: vars.font.size.xs,
  color: vars.color.textMuted,
  lineHeight: vars.font.lineHeight.normal,
  margin: 0,
});

export const formMessageStyle = style({
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.medium,
  margin: 0,
});

export const formMessageErrorStyle = style({
  color: vars.color.destructive,
});

export const formLabelErrorStyle = style({
  color: vars.color.destructive,
});
