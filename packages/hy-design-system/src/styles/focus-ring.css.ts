import { vars } from '@hydrotik/tokens';

/**
 * Shared focus ring pattern — 3px ring matching shadcn `ring-[3px]`.
 * Use in `selectors['&:focus-visible']` blocks.
 */
export const focusRingStyles = {
  borderColor: vars.color.focusRing,
  boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.focusRing} 50%, transparent)`,
} as const;
