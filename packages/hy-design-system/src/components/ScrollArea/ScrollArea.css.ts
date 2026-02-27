import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

export const scrollAreaRoot = style({
  position: 'relative',
  overflow: 'hidden',
});

export const scrollAreaViewport = style({
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
});

export const scrollAreaScrollbar = style({
  display: 'flex',
  userSelect: 'none',
  touchAction: 'none',
  padding: '1px',
  transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  selectors: {
    '&[data-orientation="vertical"]': {
      width: '8px',
      borderLeft: '1px solid transparent',
    },
    '&[data-orientation="horizontal"]': {
      height: '8px',
      flexDirection: 'column',
      borderTop: '1px solid transparent',
    },
    '&:hover': {
      backgroundColor: vars.color.ghostHover,
    },
  },
});

export const scrollAreaThumb = style({
  position: 'relative',
  flex: 1,
  borderRadius: vars.radii.full,
  backgroundColor: vars.color.border,
  transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.textMuted,
    },
  },
});

export const scrollAreaCorner = style({
  backgroundColor: 'transparent',
});
