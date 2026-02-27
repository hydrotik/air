import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

export const textarea = style({
  width: '100%',
  minHeight: '100px',
  padding: `${vars.space['3']} ${vars.space['3']}`,
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
      boxShadow: `0 0 0 2px ${vars.color.focusRing}30`,
    },
    '&:disabled': { opacity: '0.5', cursor: 'not-allowed' },
    '&[aria-invalid="true"]': {
      borderColor: vars.color.destructive,
      boxShadow: `0 0 0 2px ${vars.color.destructive}30`,
    },
  },
});
