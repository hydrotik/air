import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

/**
 * Tabs — shadcn v4 aligned.
 * - List: bg-muted (secondary), rounded-lg, 3px padding, no border
 * - Trigger: data-[state=active] gets bg-background + shadow-sm
 * - h-9 compact
 */
export const tabsList = style({
  display: 'inline-flex',
  alignItems: 'center',
  backgroundColor: vars.color.secondary,
  borderRadius: vars.radii.lg,
  padding: '3px',
  gap: vars.space['0_5'],
  height: vars.space['8'],
  color: vars.color.textMuted,
});

export const tabsTrigger = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  height: 'calc(100% - 1px)',
  paddingLeft: vars.space['2'],
  paddingRight: vars.space['2'],
  paddingTop: vars.space['1'],
  paddingBottom: vars.space['1'],
  borderRadius: vars.radii.md,
  border: '1px solid transparent',
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium,
  color: vars.color.textMuted,
  cursor: 'pointer',
  backgroundColor: 'transparent',
  whiteSpace: 'nowrap',
  transition: `all ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  outline: 'none',
  gap: vars.space['1_5'],
  selectors: {
    '&:hover': {
      color: vars.color.text,
    },
    '&[data-state="active"]': {
      color: vars.color.text,
      backgroundColor: vars.color.background,
      boxShadow: vars.shadow.sm,
    },
    '&:focus-visible': {
      borderColor: vars.color.focusRing,
      boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.focusRing} 50%, transparent)`,
    },
    '&:disabled': {
      opacity: '0.5',
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
  },
});

export const tabsContent = style({
  flex: 1,
  outline: 'none',
});
