import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

/**
 * Textarea — shadcn v4 aligned.
 * border-input, shadow-xs, focus ring pattern.
 */
export const textarea = style({
  width: '100%',
  minHeight: '4rem',
  padding: `${vars.space['2']} ${vars.space['3']}`,
  backgroundColor: vars.color.input,
  color: vars.color.text,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.md,
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.sm,
  lineHeight: vars.font.lineHeight.relaxed,
  resize: 'vertical',
  boxShadow: vars.shadow.xs,
  outline: 'none',
  transition: `color ${vars.motion.duration.fast} ${vars.motion.easing.default}, box-shadow ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  selectors: {
    '&::placeholder': { color: vars.color.placeholder },
    '&:focus-visible': {
      borderColor: vars.color.focusRing,
      boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.focusRing} 50%, transparent)`,
    },
    '&:disabled': {
      opacity: '0.5',
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
    '&[aria-invalid="true"]': {
      borderColor: vars.color.destructive,
      boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.destructive} 20%, transparent)`,
    },
  },
});
