import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@hydrotik/tokens';

export const messageContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['4'],
  width: '100%',
  maxWidth: '600px',
  marginLeft: 'auto',
  marginRight: 'auto',
});

export const messageCard = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['4'],
  borderRadius: vars.radii.lg,
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surface,
  padding: vars.space['6'],
  fontSize: vars.font.size.sm,
  color: vars.color.textMuted,
});

export const messageBubble = recipe({
  base: {
    borderRadius: vars.radii.md,
    padding: vars.space['4'],
  },
  variants: {
    role: {
      user: {
        backgroundColor: vars.color.background,
      },
      assistant: {
        backgroundColor: vars.color.background,
      },
    },
  },
  defaultVariants: { role: 'assistant' },
});

export const messageLabel = style({
  fontSize: vars.font.size.xs,
  color: vars.color.textMuted,
  marginBottom: vars.space['1'],
  fontFamily: vars.font.family.mono,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
});

export const messageContent = style({
  color: vars.color.text,
  lineHeight: vars.font.lineHeight.relaxed,
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.sm,
});

export const avatarRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['2'],
  marginBottom: vars.space['2'],
});

export const avatarIcon = style({
  width: '24px',
  height: '24px',
  borderRadius: vars.radii.full,
  backgroundColor: vars.color.primary,
  color: vars.color.primaryForeground,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  fontWeight: vars.font.weight.bold,
  flexShrink: 0,
});

export const avatarLabel = style({
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text,
});

export const inputContainer = style({
  width: '100%',
  maxWidth: '600px',
  marginLeft: 'auto',
  marginRight: 'auto',
});

export const inputForm = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['2'],
  borderRadius: vars.radii.lg,
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surface,
  padding: vars.space['2'],
});

export const emptyState = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.space['4'],
  padding: vars.space['6'],
  borderRadius: vars.radii.lg,
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surface,
  textAlign: 'center',
  maxWidth: '600px',
  marginLeft: 'auto',
  marginRight: 'auto',
});

export const emptyStateTitle = style({
  fontSize: vars.font.size.lg,
  fontWeight: vars.font.weight.bold,
  color: vars.color.text,
});

export const emptyStateDescription = style({
  fontSize: vars.font.size.sm,
  color: vars.color.textMuted,
});
