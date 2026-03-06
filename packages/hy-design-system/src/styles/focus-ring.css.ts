import { vars } from '@hydrotik/tokens';

/**
 * Shared focus ring pattern — subtle 1px ring with 25% opacity.
 * Use in `selectors['&:focus-visible']` blocks.
 */
export const focusRingStyles = {
  borderColor: vars.color.focusRing,
  boxShadow: `0 0 0 1px color-mix(in srgb, ${vars.color.focusRing} 25%, transparent)`,
} as const;
