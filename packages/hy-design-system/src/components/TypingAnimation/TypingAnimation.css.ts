import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

const blink = keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0 },
});

export const typingContainer = style({
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.sm,
  color: vars.color.text,
  lineHeight: vars.font.lineHeight.relaxed,
});

export const cursorStyle = style({
  animation: `${blink} 1s step-end infinite`,
  color: vars.color.primary,
  fontWeight: vars.font.weight.bold,
});
