import { style, globalStyle, createVar } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@hydrotik/tokens';

/* ─── CSS variables ────────────────────────────────────────────────────── */
export const sidebarWidthVar = createVar();
export const sidebarWidthIconVar = createVar();

/* ─── SidebarProvider wrapper ──────────────────────────────────────────── */
export const sidebarProviderStyle = style({
  vars: {
    [sidebarWidthVar]: '16rem',
    [sidebarWidthIconVar]: '3rem',
  },
  display: 'flex',
  minHeight: '100svh',
  width: '100%',
  color: vars.color.text,
});

/* ─── Sidebar root ─────────────────────────────────────────────────────── */
export const sidebarStyle = style({
  display: 'none',
  '@media': {
    '(min-width: 768px)': {
      display: 'block',
    },
  },
});

export const sidebarGapStyle = style({
  position: 'relative',
  height: '100svh',
  width: sidebarWidthVar,
  backgroundColor: 'transparent',
  transition: 'width 200ms ease-in-out',
});

export const sidebarFixedStyle = style({
  position: 'fixed',
  top: 0,
  bottom: 0,
  zIndex: 10,
  display: 'none',
  height: '100svh',
  width: sidebarWidthVar,
  transition: 'left 200ms ease-in-out, right 200ms ease-in-out, width 200ms ease-in-out',
  '@media': {
    '(min-width: 768px)': {
      display: 'flex',
    },
  },
});

export const sidebarFixedLeftStyle = style({
  left: 0,
});

export const sidebarFixedRightStyle = style({
  right: 0,
});

export const sidebarInnerStyle = style({
  display: 'flex',
  height: '100%',
  width: '100%',
  flexDirection: 'column',
  backgroundColor: vars.color.surface,
});

export const sidebarInnerFloatingStyle = style({
  borderRadius: vars.radii.lg,
  border: `1px solid ${vars.color.border}`,
  boxShadow: vars.shadow.sm,
});

export const sidebarBorderLeftStyle = style({
  borderRight: `1px solid ${vars.color.border}`,
});

export const sidebarBorderRightStyle = style({
  borderLeft: `1px solid ${vars.color.border}`,
});

export const sidebarCollapsedNone = style({
  width: sidebarWidthVar,
  flex: 'none',
});

/* ─── SidebarInset (main content area) ─────────────────────────────────── */
export const sidebarInsetStyle = style({
  position: 'relative',
  display: 'flex',
  minHeight: '100svh',
  flex: '1 1 0%',
  flexDirection: 'column',
  backgroundColor: vars.color.background,
});

/* ─── SidebarHeader / Footer / Content ─────────────────────────────────── */
export const sidebarHeaderStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['2'],
  padding: vars.space['2'],
});

export const sidebarFooterStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['2'],
  padding: vars.space['2'],
});

export const sidebarContentStyle = style({
  display: 'flex',
  minHeight: 0,
  flex: '1 1 0%',
  flexDirection: 'column',
  gap: vars.space['2'],
  overflowY: 'auto',
});

export const sidebarSeparatorStyle = style({
  marginLeft: vars.space['2'],
  marginRight: vars.space['2'],
  width: 'auto',
  backgroundColor: vars.color.border,
});

/* ─── SidebarGroup ─────────────────────────────────────────────────────── */
export const sidebarGroupStyle = style({
  position: 'relative',
  display: 'flex',
  width: '100%',
  minWidth: 0,
  flexDirection: 'column',
  padding: vars.space['2'],
});

export const sidebarGroupLabelStyle = style({
  display: 'flex',
  height: '32px',
  flexShrink: 0,
  alignItems: 'center',
  borderRadius: vars.radii.md,
  paddingLeft: vars.space['2'],
  paddingRight: vars.space['2'],
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.medium,
  color: vars.color.textMuted,
  outline: 'none',
  transition: 'margin 200ms ease-in-out, opacity 200ms ease-in-out',
});

export const sidebarGroupContentStyle = style({
  width: '100%',
  fontSize: vars.font.size.sm,
});

/* ─── SidebarMenu ──────────────────────────────────────────────────────── */
export const sidebarMenuStyle = style({
  display: 'flex',
  width: '100%',
  minWidth: 0,
  flexDirection: 'column',
  gap: vars.space['1'],
  listStyle: 'none',
  margin: 0,
  padding: 0,
});

export const sidebarMenuItemStyle = style({
  position: 'relative',
  listStyle: 'none',
});

export const sidebarMenuButtonRecipe = recipe({
  base: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    gap: vars.space['2'],
    overflow: 'hidden',
    borderRadius: vars.radii.md,
    padding: vars.space['2'],
    textAlign: 'left',
    outline: 'none',
    border: 'none',
    backgroundColor: 'transparent',
    color: vars.color.text,
    fontFamily: vars.font.family.sans,
    cursor: 'pointer',
    transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.default}, color ${vars.motion.duration.fast} ${vars.motion.easing.default}`,
    selectors: {
      '&:hover': {
        backgroundColor: vars.color.ghostHover,
      },
      '&:disabled, &[aria-disabled="true"]': {
        pointerEvents: 'none',
        opacity: 0.5,
      },
      '&[data-active="true"]': {
        backgroundColor: vars.color.ghostHover,
        fontWeight: vars.font.weight.medium,
      },
    },
  },
  variants: {
    variant: {
      default: {},
      outline: {
        backgroundColor: vars.color.background,
        boxShadow: `0 0 0 1px ${vars.color.border}`,
        selectors: {
          '&:hover': {
            backgroundColor: vars.color.ghostHover,
            boxShadow: `0 0 0 1px ${vars.color.ghostHover}`,
          },
        },
      },
    },
    size: {
      default: {
        height: '32px',
        fontSize: vars.font.size.sm,
      },
      sm: {
        height: '28px',
        fontSize: vars.font.size.xs,
      },
      lg: {
        height: '48px',
        fontSize: vars.font.size.sm,
      },
    },
  },
  defaultVariants: { variant: 'default', size: 'default' },
});

/* ─── SidebarMenuBadge ─────────────────────────────────────────────────── */
export const sidebarMenuBadgeStyle = style({
  pointerEvents: 'none',
  position: 'absolute',
  right: vars.space['1'],
  display: 'flex',
  height: '20px',
  minWidth: '20px',
  userSelect: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: vars.radii.md,
  paddingLeft: vars.space['1_5'],
  paddingRight: vars.space['1_5'],
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.medium,
  fontVariantNumeric: 'tabular-nums',
  color: vars.color.text,
});

/* ─── SidebarMenuSub ───────────────────────────────────────────────────── */
export const sidebarMenuSubStyle = style({
  marginLeft: '14px',
  display: 'flex',
  minWidth: 0,
  flexDirection: 'column',
  gap: vars.space['1'],
  borderLeft: `1px solid ${vars.color.border}`,
  paddingLeft: vars.space['2_5'],
  paddingTop: vars.space['0_5'],
  paddingBottom: vars.space['0_5'],
  listStyle: 'none',
  margin: 0,
  marginLeft: '14px',
});

export const sidebarMenuSubButtonStyle = style({
  display: 'flex',
  height: '28px',
  minWidth: 0,
  alignItems: 'center',
  gap: vars.space['2'],
  overflow: 'hidden',
  borderRadius: vars.radii.md,
  paddingLeft: vars.space['2'],
  paddingRight: vars.space['2'],
  fontSize: vars.font.size.sm,
  color: vars.color.text,
  outline: 'none',
  textDecoration: 'none',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.ghostHover,
    },
    '&[data-active="true"]': {
      backgroundColor: vars.color.ghostHover,
    },
  },
});

/* ─── SidebarTrigger ───────────────────────────────────────────────────── */
export const sidebarTriggerStyle = style({
  height: '28px',
  width: '28px',
});

/* ─── SidebarRail ──────────────────────────────────────────────────────── */
export const sidebarRailStyle = style({
  position: 'absolute',
  top: 0,
  bottom: 0,
  zIndex: 20,
  width: '16px',
  cursor: 'col-resize',
  border: 'none',
  backgroundColor: 'transparent',
  padding: 0,
  outline: 'none',
  display: 'none',
  '@media': {
    '(min-width: 640px)': {
      display: 'flex',
    },
  },
  selectors: {
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: '50%',
      width: '2px',
    },
    '&:hover::after': {
      backgroundColor: vars.color.border,
    },
  },
});

/* ─── SidebarInput ─────────────────────────────────────────────────────── */
export const sidebarInputStyle = style({
  height: '32px',
  width: '100%',
  backgroundColor: vars.color.background,
  boxShadow: 'none',
});

/* ─── SidebarMenuSkeleton ──────────────────────────────────────────────── */
export const sidebarMenuSkeletonStyle = style({
  display: 'flex',
  height: '32px',
  alignItems: 'center',
  gap: vars.space['2'],
  borderRadius: vars.radii.md,
  paddingLeft: vars.space['2'],
  paddingRight: vars.space['2'],
});
