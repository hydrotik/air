import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

export const textarea = style({
  width: '100%',
  minHeight: '80px',
  padding: `${vars.space['2']} ${vars.space['2_5']}`,
  backgroundColor: vars.color.input,
  color: vars.color.text,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.md,
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.sm,
  lineHeight: vars.font.lineHeight.relaxed,
  resize: 'vertical',
  transition: `border-color ${vars.motion.duration.fast} ${vars.motion.easing.default}, box-shadow ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  selectors: {
    '&::placeholder': { color: vars.color.placeholder },
    '&:hover:not(:disabled)': { borderColor: vars.color.textMuted },
    '&:focus-visible': {
      outline: 'none',
      borderColor: vars.color.focusRing,
      boxShadow: `0 0 0 2px color-mix(in srgb, ${vars.color.focusRing} 20%, transparent)`,
    },
    '&:disabled': { opacity: '0.5', cursor: 'not-allowed' },
    '&[aria-invalid="true"]': {
      borderColor: vars.color.destructive,
      boxShadow: `0 0 0 2px color-mix(in srgb, ${vars.color.destructive} 20%, transparent)`,
    },
  },
});
