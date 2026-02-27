import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

export const breadcrumbNav = style({
  display: 'flex',
  alignItems: 'center',
});

export const breadcrumbList = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['1_5'],
  flexWrap: 'wrap',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  fontSize: vars.font.size.sm,
});

export const breadcrumbItem = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space['1_5'],
});

export const breadcrumbLink = style({
  color: vars.color.textMuted,
  textDecoration: 'none',
  transition: `color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  selectors: {
    '&:hover': {
      color: vars.color.text,
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.focusRing}`,
      outlineOffset: '2px',
      borderRadius: vars.radii.sm,
    },
  },
});

export const breadcrumbPage = style({
  color: vars.color.text,
  fontWeight: vars.font.weight.medium,
});

export const breadcrumbSeparator = style({
  display: 'inline-flex',
  alignItems: 'center',
  color: vars.color.textMuted,
});

export const breadcrumbEllipsis = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: vars.space['8'],
  height: vars.space['8'],
  color: vars.color.textMuted,
});
