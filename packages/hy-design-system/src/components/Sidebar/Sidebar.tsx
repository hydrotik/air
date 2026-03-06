import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { IconLayoutSidebar } from '@tabler/icons-react';
import { Button } from '../Button';
import { Input } from '../Input';
import { Separator } from '../Separator';
import { Sheet, SheetContent } from '../Sheet';
import { Skeleton } from '../Skeleton';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '../Tooltip';
import {
  sidebarProviderStyle,
  sidebarStyle,
  sidebarGapStyle,
  sidebarFixedStyle,
  sidebarFixedLeftStyle,
  sidebarFixedRightStyle,
  sidebarInnerStyle,
  sidebarInnerFloatingStyle,
  sidebarBorderLeftStyle,
  sidebarBorderRightStyle,
  sidebarCollapsedNone,
  sidebarInsetStyle,
  sidebarHeaderStyle,
  sidebarFooterStyle,
  sidebarContentStyle,
  sidebarSeparatorStyle,
  sidebarGroupStyle,
  sidebarGroupLabelStyle,
  sidebarGroupContentStyle,
  sidebarMenuStyle,
  sidebarMenuItemStyle,
  sidebarMenuButtonRecipe,
  sidebarMenuBadgeStyle,
  sidebarMenuSubStyle,
  sidebarMenuSubButtonStyle,
  sidebarTriggerStyle,
  sidebarRailStyle,
  sidebarInputStyle,
  sidebarMenuSkeletonStyle,
  sidebarWidthVar,
  sidebarWidthIconVar,
} from './Sidebar.css';

const cx = (...classes: (string | false | undefined | null)[]) =>
  classes.filter(Boolean).join(' ');

/* ─── Constants ────────────────────────────────────────────────────────── */
const SIDEBAR_COOKIE_NAME = 'sidebar:state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = '16rem';
const SIDEBAR_WIDTH_MOBILE = '18rem';
const SIDEBAR_WIDTH_ICON = '3rem';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

/* ─── Context ──────────────────────────────────────────────────────────── */
type SidebarContextValue = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) throw new Error('useSidebar must be used within a SidebarProvider.');
  return context;
}

/* ─── useIsMobile ──────────────────────────────────────────────────────── */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const onChange = () => setIsMobile(mql.matches);
    mql.addEventListener('change', onChange);
    setIsMobile(mql.matches);
    return () => mql.removeEventListener('change', onChange);
  }, [breakpoint]);
  return isMobile;
}

/* ─── SidebarProvider ──────────────────────────────────────────────────── */
const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }, ref) => {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;

  const setOpen = React.useCallback(
    (value: boolean | ((v: boolean) => boolean)) => {
      const openState = typeof value === 'function' ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open],
  );

  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((o) => !o) : setOpen((o) => !o);
  }, [isMobile, setOpen]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);

  const state = open ? 'expanded' : 'collapsed';

  const contextValue = React.useMemo<SidebarContextValue>(
    () => ({ state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          ref={ref}
          className={cx(sidebarProviderStyle, className)}
          style={style}
          data-sidebar-provider=""
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
});
SidebarProvider.displayName = 'SidebarProvider';

/* ─── Sidebar ──────────────────────────────────────────────────────────── */
const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    side?: 'left' | 'right';
    variant?: 'sidebar' | 'floating' | 'inset';
    collapsible?: 'offcanvas' | 'icon' | 'none';
  }
>(({ side = 'left', variant = 'sidebar', collapsible = 'offcanvas', className, children, ...props }, ref) => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === 'none') {
    return (
      <div ref={ref} className={cx(sidebarCollapsedNone, className)} {...props}>
        <div className={sidebarInnerStyle}>{children}</div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...(props as any)}>
        <SheetContent
          data-sidebar="sidebar"
          data-mobile="true"
          side={side}
          style={{ width: SIDEBAR_WIDTH_MOBILE, padding: 0 }}
        >
          <div style={{ display: 'flex', height: '100%', width: '100%', flexDirection: 'column' }}>
            {children}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      ref={ref}
      className={cx(sidebarStyle, className)}
      data-state={state}
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      data-side={side}
    >
      <div
        className={cx(
          sidebarGapStyle,
          state === 'collapsed' && collapsible === 'offcanvas' && 'sidebar-gap-collapsed',
        )}
        style={state === 'collapsed' && collapsible === 'offcanvas' ? { width: 0 } : undefined}
      />
      <div
        className={cx(
          sidebarFixedStyle,
          side === 'left' ? sidebarFixedLeftStyle : sidebarFixedRightStyle,
        )}
        style={
          state === 'collapsed' && collapsible === 'icon'
            ? { width: `calc(${SIDEBAR_WIDTH_ICON} + 16px)` }
            : state === 'collapsed' && collapsible === 'offcanvas'
              ? side === 'left'
                ? { left: `calc(-1 * ${SIDEBAR_WIDTH})` }
                : { right: `calc(-1 * ${SIDEBAR_WIDTH})` }
              : undefined
        }
        {...props}
      >
        <div
          data-sidebar="sidebar"
          className={cx(
            sidebarInnerStyle,
            (variant === 'floating' || variant === 'inset') && sidebarInnerFloatingStyle,
            variant === 'sidebar' && side === 'left' && sidebarBorderLeftStyle,
            variant === 'sidebar' && side === 'right' && sidebarBorderRightStyle,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
});
Sidebar.displayName = 'Sidebar';

/* ─── SidebarTrigger ───────────────────────────────────────────────────── */
const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();
  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cx(sidebarTriggerStyle, className)}
      onClick={(e) => { onClick?.(e); toggleSidebar(); }}
      {...props}
    >
      <IconLayoutSidebar />
      <span style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
        Toggle Sidebar
      </span>
    </Button>
  );
});
SidebarTrigger.displayName = 'SidebarTrigger';

/* ─── SidebarRail ──────────────────────────────────────────────────────── */
const SidebarRail = React.forwardRef<HTMLButtonElement, React.ComponentProps<'button'>>(
  ({ className, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();
    return (
      <button
        ref={ref}
        data-sidebar="rail"
        aria-label="Toggle Sidebar"
        tabIndex={-1}
        onClick={toggleSidebar}
        title="Toggle Sidebar"
        className={cx(sidebarRailStyle, className)}
        {...props}
      />
    );
  },
);
SidebarRail.displayName = 'SidebarRail';

/* ─── SidebarInset ─────────────────────────────────────────────────────── */
const SidebarInset = React.forwardRef<HTMLDivElement, React.ComponentProps<'main'>>(
  ({ className, ...props }, ref) => (
    <main ref={ref} className={cx(sidebarInsetStyle, className)} {...props} />
  ),
);
SidebarInset.displayName = 'SidebarInset';

/* ─── SidebarInput ─────────────────────────────────────────────────────── */
const SidebarInput = React.forwardRef<HTMLInputElement, React.ComponentProps<typeof Input>>(
  ({ className, ...props }, ref) => (
    <Input ref={ref} data-sidebar="input" className={cx(sidebarInputStyle, className)} {...props} />
  ),
);
SidebarInput.displayName = 'SidebarInput';

/* ─── SidebarHeader ────────────────────────────────────────────────────── */
const SidebarHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-sidebar="header" className={cx(sidebarHeaderStyle, className)} {...props} />
  ),
);
SidebarHeader.displayName = 'SidebarHeader';

/* ─── SidebarFooter ────────────────────────────────────────────────────── */
const SidebarFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-sidebar="footer" className={cx(sidebarFooterStyle, className)} {...props} />
  ),
);
SidebarFooter.displayName = 'SidebarFooter';

/* ─── SidebarSeparator ─────────────────────────────────────────────────── */
const SidebarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => (
  <Separator ref={ref} data-sidebar="separator" className={cx(sidebarSeparatorStyle, className)} {...props} />
));
SidebarSeparator.displayName = 'SidebarSeparator';

/* ─── SidebarContent ───────────────────────────────────────────────────── */
const SidebarContent = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-sidebar="content" className={cx(sidebarContentStyle, className)} {...props} />
  ),
);
SidebarContent.displayName = 'SidebarContent';

/* ─── SidebarGroup ─────────────────────────────────────────────────────── */
const SidebarGroup = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-sidebar="group" className={cx(sidebarGroupStyle, className)} {...props} />
  ),
);
SidebarGroup.displayName = 'SidebarGroup';

/* ─── SidebarGroupLabel ────────────────────────────────────────────────── */
const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp ref={ref} data-sidebar="group-label" className={cx(sidebarGroupLabelStyle, className)} {...props} />
  );
});
SidebarGroupLabel.displayName = 'SidebarGroupLabel';

/* ─── SidebarGroupContent ──────────────────────────────────────────────── */
const SidebarGroupContent = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-sidebar="group-content" className={cx(sidebarGroupContentStyle, className)} {...props} />
  ),
);
SidebarGroupContent.displayName = 'SidebarGroupContent';

/* ─── SidebarMenu ──────────────────────────────────────────────────────── */
const SidebarMenu = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} data-sidebar="menu" className={cx(sidebarMenuStyle, className)} {...props} />
  ),
);
SidebarMenu.displayName = 'SidebarMenu';

/* ─── SidebarMenuItem ──────────────────────────────────────────────────── */
const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} data-sidebar="menu-item" className={cx(sidebarMenuItemStyle, className)} {...props} />
  ),
);
SidebarMenuItem.displayName = 'SidebarMenuItem';

/* ─── SidebarMenuButton ────────────────────────────────────────────────── */
const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<'button'> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
    variant?: 'default' | 'outline';
    size?: 'default' | 'sm' | 'lg';
  }
>(({ asChild = false, isActive = false, variant = 'default', size = 'default', tooltip, className, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  const { isMobile, state } = useSidebar();

  const button = (
    <Comp
      ref={ref}
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cx(sidebarMenuButtonRecipe({ variant, size }), className)}
      {...props}
    />
  );

  if (!tooltip) return button;

  const tooltipProps = typeof tooltip === 'string' ? { children: tooltip } : tooltip;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== 'collapsed' || isMobile}
        {...tooltipProps}
      />
    </Tooltip>
  );
});
SidebarMenuButton.displayName = 'SidebarMenuButton';

/* ─── SidebarMenuBadge ─────────────────────────────────────────────────── */
const SidebarMenuBadge = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-sidebar="menu-badge" className={cx(sidebarMenuBadgeStyle, className)} {...props} />
  ),
);
SidebarMenuBadge.displayName = 'SidebarMenuBadge';

/* ─── SidebarMenuSkeleton ──────────────────────────────────────────────── */
const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & { showIcon?: boolean }
>(({ className, showIcon = false, ...props }, ref) => {
  const width = React.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return (
    <div ref={ref} data-sidebar="menu-skeleton" className={cx(sidebarMenuSkeletonStyle, className)} {...props}>
      {showIcon && <Skeleton style={{ width: 16, height: 16, borderRadius: 4 }} />}
      <Skeleton style={{ height: 16, flex: 1, maxWidth: width }} />
    </div>
  );
});
SidebarMenuSkeleton.displayName = 'SidebarMenuSkeleton';

/* ─── SidebarMenuSub ───────────────────────────────────────────────────── */
const SidebarMenuSub = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} data-sidebar="menu-sub" className={cx(sidebarMenuSubStyle, className)} {...props} />
  ),
);
SidebarMenuSub.displayName = 'SidebarMenuSub';

/* ─── SidebarMenuSubItem ───────────────────────────────────────────────── */
const SidebarMenuSubItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
  ({ ...props }, ref) => <li ref={ref} {...props} />,
);
SidebarMenuSubItem.displayName = 'SidebarMenuSubItem';

/* ─── SidebarMenuSubButton ─────────────────────────────────────────────── */
const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<'a'> & {
    asChild?: boolean;
    size?: 'sm' | 'md';
    isActive?: boolean;
  }
>(({ asChild = false, size = 'md', isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : 'a';
  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cx(sidebarMenuSubButtonStyle, className)}
      style={size === 'sm' ? { fontSize: '0.75rem' } : undefined}
      {...props}
    />
  );
});
SidebarMenuSubButton.displayName = 'SidebarMenuSubButton';

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
