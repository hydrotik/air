import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

const pulse = keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.5 },
});

export const indicatorContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['2'],
  padding: vars.space['2'],
});

export const indicatorSpinner = style({
  color: vars.color.primary,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 16,
  height: 16,
  overflow: 'hidden',
});

export const indicatorSpinnerIcon = style({
  animation: `${spin} 1s linear infinite`,
  transformOrigin: 'center',
});

export const indicatorLabel = style({
  fontSize: vars.font.size.sm,
  color: vars.color.textMuted,
  fontFamily: vars.font.family.sans,
});

export const indicatorDot = style({
  display: 'inline-block',
  animation: `${pulse} 1.5s ease-in-out infinite`,
});

export const toolBadge = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space['1'],
  paddingLeft: vars.space['2'],
  paddingRight: vars.space['2'],
  paddingTop: vars.space['0_5'],
  paddingBottom: vars.space['0_5'],
  borderRadius: vars.radii.full,
  backgroundColor: `color-mix(in srgb, ${vars.color.primary} 15%, transparent)`,
  color: vars.color.primary,
  fontSize: vars.font.size.xs,
  fontFamily: vars.font.family.mono,
  fontWeight: vars.font.weight.medium,
});
