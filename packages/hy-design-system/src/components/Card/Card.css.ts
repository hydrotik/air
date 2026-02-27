import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

/**
 * Card — shadcn v4 aligned.
 * Simple flex column, border + rounded-lg, no internal header/footer borders.
 * Uses bg-surface (like shadcn bg-card).
 */
export const cardRoot = style({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.lg,
  boxShadow: vars.shadow.sm,
  overflow: 'hidden',
});

export const cardHeader = style({
  display: 'grid',
  gridAutoRows: 'min-content',
  alignItems: 'start',
  gap: vars.space['1_5'],
  padding: vars.space['6'],
});

export const cardTitle = style({
  fontSize: vars.font.size.lg,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text,
  lineHeight: vars.font.lineHeight.tight,
});

export const cardDescription = style({
  fontSize: vars.font.size.sm,
  color: vars.color.textMuted,
  lineHeight: vars.font.lineHeight.normal,
});

export const cardContent = style({
  padding: `0 ${vars.space['6']} ${vars.space['6']}`,
});

export const cardFooter = style({
  display: 'flex',
  alignItems: 'center',
  padding: `0 ${vars.space['6']} ${vars.space['6']}`,
});
