import { style, keyframes, globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@hydrotik/tokens';

export const productCardRoot = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  fontFamily: vars.font.family.sans,
});

export const productCardImageWrapper = style({
  position: 'relative',
  aspectRatio: '1',
  overflow: 'hidden',
  backgroundColor: `color-mix(in srgb, ${vars.color.border} 50%, transparent)`,
  borderRadius: vars.radii.md,
  border: `1px solid ${vars.color.border}`,
  cursor: 'pointer',
  transition: 'border-color 150ms ease',
  ':hover': {
    borderColor: `color-mix(in srgb, ${vars.color.text} 30%, transparent)`,
  },
});

export const productCardImage = recipe({
  base: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 300ms ease',
  },
  variants: {
    visible: {
      true: { opacity: 1 },
      false: { opacity: 0 },
    },
  },
  defaultVariants: {
    visible: true,
  },
});

export const productCardOverlay = style({
  position: 'absolute',
  top: vars.space['2'],
  right: vars.space['2'],
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['1'],
  zIndex: 10,
});

export const productCardWishlist = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  borderRadius: vars.radii.full,
  backgroundColor: `color-mix(in srgb, ${vars.color.background} 80%, transparent)`,
  backdropFilter: 'blur(8px)',
  border: 'none',
  cursor: 'pointer',
  color: vars.color.textMuted,
  transition: 'all 150ms ease',
  ':hover': {
    color: vars.color.destructive,
    backgroundColor: vars.color.background,
  },
});

export const productCardWishlistFilled = style({
  color: vars.color.destructive,
  fill: 'currentColor',
});

export const productCardInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['1'],
  paddingTop: vars.space['3'],
});

export const productCardName = style({
  fontSize: vars.font.size.sm,
  fontWeight: '400',
  color: vars.color.text,
  textTransform: 'uppercase',
  letterSpacing: '0.02em',
  lineHeight: '1.3',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  margin: 0,
});

globalStyle(`${productCardName} a`, {
  color: 'inherit',
  textDecoration: 'none',
});

globalStyle(`${productCardName} a:hover`, {
  textDecoration: 'underline',
});

export const productCardMeta = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.space['2'],
});

export const productCardSwatches = style({
  display: 'flex',
  gap: '2px',
});

export const productCardActions = style({
  paddingTop: vars.space['2'],
});

const shimmer = keyframes({
  '0%': { backgroundPosition: '-200% 0' },
  '100%': { backgroundPosition: '200% 0' },
});

export const productCardSkeleton = style({
  borderRadius: vars.radii.md,
  background: `linear-gradient(90deg, ${vars.color.border} 25%, color-mix(in srgb, ${vars.color.border} 60%, transparent) 50%, ${vars.color.border} 75%)`,
  backgroundSize: '200% 100%',
  animation: `${shimmer} 1.5s infinite`,
});
