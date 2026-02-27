import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

export const label = style({
  display: 'block',
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text,
  lineHeight: vars.font.lineHeight.normal,
  userSelect: 'none',
  selectors: {
    '&[data-disabled]': {
      opacity: '0.5',
      cursor: 'not-allowed',
    },
  },
});
