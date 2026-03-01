import { style, keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@hydrotik/tokens';

export const cartItemRoot = style({
  display: 'flex',
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.md,
  overflow: 'hidden',
  fontFamily: vars.font.family.sans,
  backgroundColor: vars.color.background,
});

export const cartItemImage = style({
  position: 'relative',
  width: '100px',
  flexShrink: 0,
  borderRight: `1px solid ${vars.color.border}`,
  overflow: 'hidden',
});

export const cartItemImg = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const cartItemContent = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flex: 1,
  padding: vars.space['3'],
  minHeight: '100px',
});

export const cartItemHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: vars.space['2'],
});

export const cartItemName = style({
  fontSize: vars.font.size.sm,
  fontWeight: '400',
  color: vars.color.text,
  lineHeight: '1.3',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  margin: 0,
  flex: 1,
});

export const cartItemNameLink = style({
  color: 'inherit',
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
  },
});

export const cartItemVariant = style({
  fontSize: vars.font.size.xs,
  color: vars.color.textMuted,
  marginLeft: vars.space['1'],
});

export const cartItemPrice = style({
  fontSize: vars.font.size.sm,
  fontWeight: '600',
  color: vars.color.text,
  fontVariantNumeric: 'tabular-nums',
  whiteSpace: 'nowrap',
});

export const cartItemFooter = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.space['2'],
  paddingTop: vars.space['2'],
});

export const cartItemControls = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['2'],
});

export const cartItemRemove = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '28px',
  height: '28px',
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.sm,
  backgroundColor: 'transparent',
  color: vars.color.textMuted,
  cursor: 'pointer',
  transition: 'all 150ms ease',
  ':hover': {
    borderColor: vars.color.destructive,
    color: vars.color.destructive,
    backgroundColor: `color-mix(in srgb, ${vars.color.destructive} 10%, transparent)`,
  },
  ':focus-visible': {
    outline: 'none',
    borderColor: vars.color.focusRing,
    boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.focusRing} 50%, transparent)`,
  },
});

const shimmer = keyframes({
  '0%': { backgroundPosition: '-200% 0' },
  '100%': { backgroundPosition: '200% 0' },
});

export const cartItemSkeleton = style({
  borderRadius: vars.radii.sm,
  background: `linear-gradient(90deg, ${vars.color.border} 25%, color-mix(in srgb, ${vars.color.border} 60%, transparent) 50%, ${vars.color.border} 75%)`,
  backgroundSize: '200% 100%',
  animation: `${shimmer} 1.5s infinite`,
});
