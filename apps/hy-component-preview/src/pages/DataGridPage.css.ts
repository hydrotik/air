import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

export const page = style({
  padding: `${vars.space['6']} ${vars.space['8']}`,
  maxWidth: '1400px',
  margin: '0 auto',
});

export const title = style({
  fontSize: vars.font.size['3xl'],
  fontWeight: vars.font.weight.bold,
  color: vars.color.text,
  marginBottom: vars.space['1'],
});

export const subtitle = style({
  fontSize: vars.font.size.md,
  color: vars.color.textMuted,
  marginBottom: vars.space['6'],
});

export const section = style({
  marginBottom: vars.space['8'],
});

export const sectionTitle = style({
  fontSize: vars.font.size.xl,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text,
  marginBottom: vars.space['3'],
});

export const sectionDesc = style({
  fontSize: vars.font.size.sm,
  color: vars.color.textMuted,
  marginBottom: vars.space['4'],
});

export const badge = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: `${vars.space['0_5']} ${vars.space['2']}`,
  borderRadius: vars.radii.full,
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.medium,
  lineHeight: vars.font.lineHeight.normal,
});

export const badgeActive = style({
  backgroundColor: `color-mix(in srgb, ${vars.color.success} 15%, transparent)`,
  color: vars.color.success,
});

export const badgeInactive = style({
  backgroundColor: `color-mix(in srgb, ${vars.color.destructive} 15%, transparent)`,
  color: vars.color.destructive,
});

export const avatarCell = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['2'],
});

export const avatar = style({
  width: '28px',
  height: '28px',
  borderRadius: vars.radii.full,
  backgroundColor: vars.color.primary,
  color: vars.color.primaryForeground,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '11px',
  fontWeight: vars.font.weight.semibold,
  flexShrink: 0,
});

export const progressBar = style({
  width: '100%',
  maxWidth: '120px',
  height: '6px',
  borderRadius: vars.radii.full,
  backgroundColor: vars.color.ghostHover,
  overflow: 'hidden',
});

export const progressFill = style({
  height: '100%',
  borderRadius: vars.radii.full,
  backgroundColor: vars.color.primary,
  transition: `width ${vars.motion.duration.normal} ${vars.motion.easing.default}`,
});
