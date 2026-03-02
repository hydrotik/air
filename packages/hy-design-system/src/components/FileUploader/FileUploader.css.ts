import { style } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

export const uploaderRoot = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['6'],
  overflow: 'hidden',
});

export const dropzone = style({
  position: 'relative',
  display: 'grid',
  height: '208px',
  width: '100%',
  cursor: 'pointer',
  placeItems: 'center',
  borderRadius: vars.radii.lg,
  border: `2px dashed color-mix(in srgb, ${vars.color.textMuted} 25%, transparent)`,
  paddingLeft: vars.space['5'],
  paddingRight: vars.space['5'],
  paddingTop: vars.space['2_5'],
  paddingBottom: vars.space['2_5'],
  textAlign: 'center',
  transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}, border-color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
  selectors: {
    '&:hover': {
      backgroundColor: `color-mix(in srgb, ${vars.color.secondary} 25%, transparent)`,
    },
    '&:focus-visible': {
      outline: 'none',
      borderColor: vars.color.focusRing,
      boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.focusRing} 50%, transparent)`,
    },
  },
});

export const dropzoneActive = style({
  borderColor: `color-mix(in srgb, ${vars.color.textMuted} 50%, transparent)`,
});

export const dropzoneDisabled = style({
  pointerEvents: 'none',
  opacity: 0.6,
});

export const dropzoneContent = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space['4'],
});

export const dropzoneIcon = style({
  borderRadius: vars.radii.full,
  border: `1px dashed ${vars.color.border}`,
  padding: vars.space['3'],
  color: vars.color.textMuted,
});

export const dropzoneText = style({
  fontWeight: vars.font.weight.medium,
  color: vars.color.textMuted,
  fontSize: vars.font.size.sm,
});

export const dropzoneSubtext = style({
  fontSize: vars.font.size.xs,
  color: `color-mix(in srgb, ${vars.color.textMuted} 70%, transparent)`,
});

export const fileListContainer = style({
  maxHeight: '192px',
  width: '100%',
  overflowY: 'auto',
  paddingLeft: vars.space['3'],
  paddingRight: vars.space['3'],
});

export const fileListInner = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['4'],
});

export const fileCard = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['4'],
});

export const fileInfo = style({
  display: 'flex',
  flex: '1 1 0%',
  flexDirection: 'column',
  gap: vars.space['2'],
});

export const fileName = style({
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium,
  color: `color-mix(in srgb, ${vars.color.text} 80%, transparent)`,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const fileSize = style({
  fontSize: vars.font.size.xs,
  color: vars.color.textMuted,
});

export const filePreview = style({
  width: '48px',
  height: '48px',
  flexShrink: 0,
  borderRadius: vars.radii.md,
  objectFit: 'cover',
});
