import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as Icons from "lucide-react";
import * as react_jsx_runtime0 from "react/jsx-runtime";
import * as _vanilla_extract_recipes0 from "@vanilla-extract/recipes";
import { RecipeVariants } from "@vanilla-extract/recipes";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as SliderPrimitive from "@radix-ui/react-slider";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as ToastPrimitive from "@radix-ui/react-toast";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

//#region src/components/Accordion/Accordion.d.ts
declare const Accordion: React.ForwardRefExoticComponent<(Omit<AccordionPrimitive.AccordionSingleProps & React.RefAttributes<HTMLDivElement>, "ref"> | Omit<AccordionPrimitive.AccordionMultipleProps & React.RefAttributes<HTMLDivElement>, "ref">) & React.RefAttributes<HTMLDivElement>>;
declare const AccordionItem: React.ForwardRefExoticComponent<Omit<AccordionPrimitive.AccordionItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const AccordionTrigger: React.ForwardRefExoticComponent<Omit<AccordionPrimitive.AccordionTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const AccordionContent: React.ForwardRefExoticComponent<Omit<AccordionPrimitive.AccordionContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/Alert/Alert.d.ts
interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive';
  /** Pass a lucide-react icon component to render in the icon slot */
  icon?: React.ReactNode;
}
declare const Alert: React.ForwardRefExoticComponent<AlertProps & React.RefAttributes<HTMLDivElement>>;
declare const AlertTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
declare const AlertDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
//#endregion
//#region src/components/AlertDialog/AlertDialog.d.ts
declare const AlertDialog: typeof AlertDialogPrimitive.Root;
declare const AlertDialogTrigger: typeof AlertDialogPrimitive.Trigger;
declare const AlertDialogPortal: typeof AlertDialogPrimitive.Portal;
declare const AlertDialogAction: typeof AlertDialogPrimitive.Action;
declare const AlertDialogCancel: typeof AlertDialogPrimitive.Cancel;
declare const AlertDialogOverlay: React.ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const AlertDialogContent: React.ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const AlertDialogHeader: {
  ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime0.JSX.Element;
  displayName: string;
};
declare const AlertDialogFooter: {
  ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime0.JSX.Element;
  displayName: string;
};
declare const AlertDialogTitle: React.ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const AlertDialogDescription: React.ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;
//#endregion
//#region src/components/AspectRatio/AspectRatio.d.ts
declare const AspectRatio: typeof AspectRatioPrimitive.Root;
//#endregion
//#region src/components/Avatar/Avatar.d.ts
interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
declare const Avatar: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLSpanElement>>;
declare const AvatarImage: React.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarImageProps & React.RefAttributes<HTMLImageElement>, "ref"> & React.RefAttributes<HTMLImageElement>>;
declare const AvatarFallback: React.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarFallbackProps & React.RefAttributes<HTMLSpanElement>, "ref"> & React.RefAttributes<HTMLSpanElement>>;
//#endregion
//#region src/components/Badge/Badge.d.ts
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
}
declare const Badge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLSpanElement>>;
//#endregion
//#region src/components/Breadcrumb/Breadcrumb.d.ts
declare const Breadcrumb: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
  separator?: React.ReactNode;
} & React.RefAttributes<HTMLElement>>;
declare const BreadcrumbList: React.ForwardRefExoticComponent<React.OlHTMLAttributes<HTMLOListElement> & React.RefAttributes<HTMLOListElement>>;
declare const BreadcrumbItem: React.ForwardRefExoticComponent<React.LiHTMLAttributes<HTMLLIElement> & React.RefAttributes<HTMLLIElement>>;
interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
}
declare const BreadcrumbLink: React.ForwardRefExoticComponent<BreadcrumbLinkProps & React.RefAttributes<HTMLAnchorElement>>;
declare const BreadcrumbPage: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLSpanElement> & React.RefAttributes<HTMLSpanElement>>;
declare const BreadcrumbSeparator: {
  ({
    className,
    children,
    ...props
  }: React.LiHTMLAttributes<HTMLLIElement>): react_jsx_runtime0.JSX.Element;
  displayName: string;
};
declare const BreadcrumbEllipsis: {
  ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLSpanElement>): react_jsx_runtime0.JSX.Element;
  displayName: string;
};
//#endregion
//#region src/components/Button/Button.d.ts
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
  /** Size */
  size?: 'sm' | 'md' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg';
  /** Loading state — shows spinner, disables interaction */
  loading?: boolean;
  /** Stretch to fill container */
  fullWidth?: boolean;
  /**
   * When true, renders as a child element (Radix Slot pattern).
   * Useful for rendering as `<a>` or `<Link>`.
   */
  asChild?: boolean;
}
/**
 * Button — primary interactive element (shadcn v4 aligned).
 *
 * @example
 * ```tsx
 * <Button variant="default" size="md">Save changes</Button>
 * <Button variant="outline" loading>Submitting...</Button>
 * <Button asChild><a href="/dashboard">Go to dashboard</a></Button>
 * ```
 */
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
//#endregion
//#region src/components/Card/Card.d.ts
declare const Card: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
declare const CardDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const CardContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/Checkbox/Checkbox.d.ts
declare const Checkbox: React.ForwardRefExoticComponent<Omit<CheckboxPrimitive.CheckboxProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
//#endregion
//#region src/components/Collapsible/Collapsible.d.ts
declare const Collapsible: typeof CollapsiblePrimitive.Root;
declare const CollapsibleTrigger: typeof CollapsiblePrimitive.Trigger;
declare const CollapsibleContent: typeof CollapsiblePrimitive.Content;
//#endregion
//#region src/components/Command/Command.d.ts
/**
 * Command palette — a simple searchable list component.
 * For a full cmdk-style experience, pair with the `cmdk` package.
 * This provides the styled shell + primitives.
 */
declare const Command: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
interface CommandInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}
declare const CommandInput: React.ForwardRefExoticComponent<CommandInputProps & React.RefAttributes<HTMLInputElement>>;
declare const CommandList: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CommandEmpty: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
interface CommandGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: React.ReactNode;
}
declare const CommandGroup: React.ForwardRefExoticComponent<CommandGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const CommandItem: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CommandSeparator: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CommandShortcut: {
  ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLSpanElement>): react_jsx_runtime0.JSX.Element;
  displayName: string;
};
//#endregion
//#region src/components/ContextMenu/ContextMenu.d.ts
declare const ContextMenu: typeof ContextMenuPrimitive.Root;
declare const ContextMenuTrigger: typeof ContextMenuPrimitive.Trigger;
declare const ContextMenuGroup: typeof ContextMenuPrimitive.Group;
declare const ContextMenuPortal: typeof ContextMenuPrimitive.Portal;
declare const ContextMenuSub: typeof ContextMenuPrimitive.Sub;
declare const ContextMenuRadioGroup: typeof ContextMenuPrimitive.RadioGroup;
declare const ContextMenuContent: React.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const ContextMenuItem: React.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
  inset?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
declare const ContextMenuCheckboxItem: React.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuCheckboxItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const ContextMenuRadioItem: React.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuRadioItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const ContextMenuLabel: React.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuLabelProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
  inset?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
declare const ContextMenuSeparator: React.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuSeparatorProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const ContextMenuShortcut: {
  ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLSpanElement>): react_jsx_runtime0.JSX.Element;
  displayName: string;
};
declare const ContextMenuSubTrigger: React.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuSubTriggerProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
  inset?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
declare const ContextMenuSubContent: React.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuSubContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/Dialog/Dialog.d.ts
declare const Dialog: typeof DialogPrimitive.Root;
declare const DialogTrigger: typeof DialogPrimitive.Trigger;
declare const DialogPortal: typeof DialogPrimitive.Portal;
declare const DialogClose: typeof DialogPrimitive.Close;
declare const DialogOverlay: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
interface DialogContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  showCloseButton?: boolean;
}
declare const DialogContent: React.ForwardRefExoticComponent<DialogContentProps & React.RefAttributes<HTMLDivElement>>;
declare const DialogHeader: {
  ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime0.JSX.Element;
  displayName: string;
};
declare const DialogFooter: {
  ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime0.JSX.Element;
  displayName: string;
};
declare const DialogTitle: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const DialogDescription: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;
//#endregion
//#region src/components/DropdownMenu/DropdownMenu.d.ts
declare const DropdownMenu: typeof DropdownMenuPrimitive.Root;
declare const DropdownMenuTrigger: typeof DropdownMenuPrimitive.Trigger;
declare const DropdownMenuGroup: typeof DropdownMenuPrimitive.Group;
declare const DropdownMenuPortal: typeof DropdownMenuPrimitive.Portal;
declare const DropdownMenuRadioGroup: typeof DropdownMenuPrimitive.RadioGroup;
declare const DropdownMenuSubTrigger: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSubTriggerProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
  inset?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSubContent: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSubContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuContent: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuItem: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
  destructive?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuCheckboxItem: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuCheckboxItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuRadioItem: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuRadioItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuLabel: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuLabelProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSeparator: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSeparatorProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuShortcut: {
  ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLSpanElement>): react_jsx_runtime0.JSX.Element;
  displayName: string;
};
declare const DropdownMenuSub: typeof DropdownMenuPrimitive.Sub;
//#endregion
//#region src/components/FieldMessage/FieldMessage.d.ts
interface FieldMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'default' | 'error' | 'success';
}
declare const FieldMessage: React.ForwardRefExoticComponent<FieldMessageProps & React.RefAttributes<HTMLParagraphElement>>;
//#endregion
//#region src/components/HoverCard/HoverCard.d.ts
declare const HoverCard: typeof HoverCardPrimitive.Root;
declare const HoverCardTrigger: typeof HoverCardPrimitive.Trigger;
declare const HoverCardContent: React.ForwardRefExoticComponent<Omit<HoverCardPrimitive.HoverCardContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/Input/Input.d.ts
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Input size */
  inputSize?: 'sm' | 'md' | 'lg';
  /** Label text — renders accessible <label> */
  label?: string;
  /** Helper / error message below input */
  message?: string;
  /** Renders message in error state */
  error?: boolean;
  /** Stretch to fill container */
  fullWidth?: boolean;
}
/**
 * Input — text input with optional label and field message.
 *
 * @example
 * ```tsx
 * <Input label="Email" type="email" placeholder="you@example.com" />
 * <Input label="Username" error message="Username is taken" />
 * ```
 */
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
//#endregion
//#region src/components/InputGroup/InputGroup.css.d.ts
/**
 * Strip all chrome from an Input or Textarea inside an InputGroup.
 * The group wrapper provides the visual container.
 */
declare const inputGroupInput: string;
//#endregion
//#region src/components/InputGroup/InputGroup.d.ts
interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Column layout for textarea + toolbar combos */
  column?: boolean;
}
/**
 * InputGroup — wrapper that provides a unified border, shadow, and
 * border-radius for a group of input-related elements.
 *
 * Children should use `InputGroupInput` for the text field and
 * `InputGroupAddon` / `InputGroupToolbar` for decorations.
 *
 * @example
 * ```tsx
 * <InputGroup>
 *   <InputGroupAddon>https://</InputGroupAddon>
 *   <InputGroupInput><Input fullWidth /></InputGroupInput>
 * </InputGroup>
 * ```
 */
declare const InputGroup: React.ForwardRefExoticComponent<InputGroupProps & React.RefAttributes<HTMLDivElement>>;
type InputGroupAddonProps = React.HTMLAttributes<HTMLSpanElement>;
/**
 * InputGroupAddon — non-interactive text / icon slot inside a group.
 */
declare const InputGroupAddon: React.ForwardRefExoticComponent<InputGroupAddonProps & React.RefAttributes<HTMLSpanElement>>;
type InputGroupToolbarProps = React.HTMLAttributes<HTMLDivElement>;
/**
 * InputGroupToolbar — row at the bottom of a column InputGroup.
 */
declare const InputGroupToolbar: React.ForwardRefExoticComponent<InputGroupToolbarProps & React.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/Kbd/Kbd.d.ts
interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  size?: 'sm' | 'md';
}
declare const Kbd: React.ForwardRefExoticComponent<KbdProps & React.RefAttributes<HTMLElement>>;
//#endregion
//#region src/components/Label/Label.d.ts
interface LabelProps extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  disabled?: boolean;
}
declare const Label: React.ForwardRefExoticComponent<LabelProps & React.RefAttributes<HTMLLabelElement>>;
//#endregion
//#region src/components/Menubar/Menubar.d.ts
declare const Menubar: React.ForwardRefExoticComponent<Omit<MenubarPrimitive.MenubarProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const MenubarMenu: typeof MenubarPrimitive.Menu;
declare const MenubarGroup: typeof MenubarPrimitive.Group;
declare const MenubarPortal: typeof MenubarPrimitive.Portal;
declare const MenubarSub: typeof MenubarPrimitive.Sub;
declare const MenubarRadioGroup: typeof MenubarPrimitive.RadioGroup;
declare const MenubarTrigger: React.ForwardRefExoticComponent<Omit<MenubarPrimitive.MenubarTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const MenubarContent: React.ForwardRefExoticComponent<Omit<MenubarPrimitive.MenubarContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const MenubarItem: React.ForwardRefExoticComponent<Omit<MenubarPrimitive.MenubarItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
  inset?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
declare const MenubarCheckboxItem: React.ForwardRefExoticComponent<Omit<MenubarPrimitive.MenubarCheckboxItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const MenubarRadioItem: React.ForwardRefExoticComponent<Omit<MenubarPrimitive.MenubarRadioItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const MenubarLabel: React.ForwardRefExoticComponent<Omit<MenubarPrimitive.MenubarLabelProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
  inset?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
declare const MenubarSeparator: React.ForwardRefExoticComponent<Omit<MenubarPrimitive.MenubarSeparatorProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const MenubarShortcut: {
  ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLSpanElement>): react_jsx_runtime0.JSX.Element;
  displayName: string;
};
declare const MenubarSubTrigger: React.ForwardRefExoticComponent<Omit<MenubarPrimitive.MenubarSubTriggerProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
  inset?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
declare const MenubarSubContent: React.ForwardRefExoticComponent<Omit<MenubarPrimitive.MenubarSubContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/NavigationMenu/NavigationMenu.d.ts
declare const NavigationMenu: React.ForwardRefExoticComponent<Omit<NavigationMenuPrimitive.NavigationMenuProps & React.RefAttributes<HTMLElement>, "ref"> & React.RefAttributes<HTMLElement>>;
declare const NavigationMenuList: React.ForwardRefExoticComponent<Omit<NavigationMenuPrimitive.NavigationMenuListProps & React.RefAttributes<HTMLUListElement>, "ref"> & React.RefAttributes<HTMLUListElement>>;
declare const NavigationMenuItem: typeof NavigationMenuPrimitive.Item;
declare const NavigationMenuTrigger: React.ForwardRefExoticComponent<Omit<NavigationMenuPrimitive.NavigationMenuTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const NavigationMenuContent: React.ForwardRefExoticComponent<Omit<NavigationMenuPrimitive.NavigationMenuContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const NavigationMenuLink: React.ForwardRefExoticComponent<Omit<NavigationMenuPrimitive.NavigationMenuLinkProps & React.RefAttributes<HTMLAnchorElement>, "ref"> & React.RefAttributes<HTMLAnchorElement>>;
declare const NavigationMenuViewport: React.ForwardRefExoticComponent<Omit<NavigationMenuPrimitive.NavigationMenuViewportProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const NavigationMenuIndicator: React.ForwardRefExoticComponent<Omit<NavigationMenuPrimitive.NavigationMenuIndicatorProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/Pagination/Pagination.d.ts
declare const Pagination: {
  ({
    className,
    ...props
  }: React.ComponentProps<"nav">): react_jsx_runtime0.JSX.Element;
  displayName: string;
};
declare const PaginationContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLUListElement> & React.RefAttributes<HTMLUListElement>>;
declare const PaginationItem: React.ForwardRefExoticComponent<React.LiHTMLAttributes<HTMLLIElement> & React.RefAttributes<HTMLLIElement>>;
interface PaginationLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean;
}
declare const PaginationLink: {
  ({
    isActive,
    className,
    ...props
  }: PaginationLinkProps): react_jsx_runtime0.JSX.Element;
  displayName: string;
};
declare const PaginationPrevious: {
  ({
    className,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>): react_jsx_runtime0.JSX.Element;
  displayName: string;
};
declare const PaginationNext: {
  ({
    className,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>): react_jsx_runtime0.JSX.Element;
  displayName: string;
};
declare const PaginationEllipsis: {
  ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLSpanElement>): react_jsx_runtime0.JSX.Element;
  displayName: string;
};
//#endregion
//#region src/components/Popover/Popover.d.ts
declare const Popover: typeof PopoverPrimitive.Root;
declare const PopoverTrigger: typeof PopoverPrimitive.Trigger;
declare const PopoverAnchor: typeof PopoverPrimitive.Anchor;
declare const PopoverContent: React.ForwardRefExoticComponent<Omit<PopoverPrimitive.PopoverContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
  showArrow?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
declare const PopoverClose: React.ForwardRefExoticComponent<Omit<PopoverPrimitive.PopoverCloseProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
//#endregion
//#region src/components/Progress/Progress.d.ts
declare const Progress: React.ForwardRefExoticComponent<Omit<ProgressPrimitive.ProgressProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/RadioGroup/RadioGroup.d.ts
declare const RadioGroup: React.ForwardRefExoticComponent<Omit<RadioGroupPrimitive.RadioGroupProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const RadioGroupItem: React.ForwardRefExoticComponent<Omit<RadioGroupPrimitive.RadioGroupItemProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
//#endregion
//#region src/components/ScrollArea/ScrollArea.d.ts
declare const ScrollArea: React.ForwardRefExoticComponent<Omit<ScrollAreaPrimitive.ScrollAreaProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const ScrollBar: React.ForwardRefExoticComponent<Omit<ScrollAreaPrimitive.ScrollAreaScrollbarProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/Select/Select.d.ts
declare const Select: typeof SelectPrimitive.Root;
declare const SelectGroup: typeof SelectPrimitive.Group;
declare const SelectValue: typeof SelectPrimitive.Value;
interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  size?: 'sm' | 'md' | 'lg';
  isError?: boolean;
}
declare const SelectTrigger: React.ForwardRefExoticComponent<SelectTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const SelectScrollUpButton: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectScrollUpButtonProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectScrollDownButton: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectScrollDownButtonProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectContent: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectLabel: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectLabelProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectItem: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectSeparator: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectSeparatorProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/Separator/Separator.d.ts
interface SeparatorProps extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {}
declare const Separator: React.ForwardRefExoticComponent<SeparatorProps & React.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/Sheet/Sheet.d.ts
declare const Sheet: typeof DialogPrimitive.Root;
declare const SheetTrigger: typeof DialogPrimitive.Trigger;
declare const SheetClose: typeof DialogPrimitive.Close;
declare const SheetPortal: typeof DialogPrimitive.Portal;
declare const SheetOverlay: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  side?: 'top' | 'right' | 'bottom' | 'left';
  showCloseButton?: boolean;
}
declare const SheetContent: React.ForwardRefExoticComponent<SheetContentProps & React.RefAttributes<HTMLDivElement>>;
declare const SheetHeader: {
  ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime0.JSX.Element;
  displayName: string;
};
declare const SheetBody: {
  ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime0.JSX.Element;
  displayName: string;
};
declare const SheetFooter: {
  ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime0.JSX.Element;
  displayName: string;
};
declare const SheetTitle: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const SheetDescription: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;
//#endregion
//#region src/components/Skeleton/Skeleton.d.ts
declare const Skeleton: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/Slider/Slider.d.ts
declare const Slider: React.ForwardRefExoticComponent<Omit<SliderPrimitive.SliderProps & React.RefAttributes<HTMLSpanElement>, "ref"> & React.RefAttributes<HTMLSpanElement>>;
//#endregion
//#region src/components/Spinner/Spinner.d.ts
interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
declare const Spinner: React.ForwardRefExoticComponent<SpinnerProps & React.RefAttributes<HTMLSpanElement>>;
//#endregion
//#region src/components/Switch/Switch.d.ts
declare const Switch: React.ForwardRefExoticComponent<Omit<SwitchPrimitive.SwitchProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
//#endregion
//#region src/components/Table/Table.d.ts
declare const TableWrapper: {
  ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime0.JSX.Element;
  displayName: string;
};
declare const Table: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableElement> & React.RefAttributes<HTMLTableElement>>;
declare const TableCaption: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableCaptionElement> & React.RefAttributes<HTMLTableCaptionElement>>;
declare const TableHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableBody: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableRow: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableRowElement> & React.RefAttributes<HTMLTableRowElement>>;
declare const TableHead: React.ForwardRefExoticComponent<React.ThHTMLAttributes<HTMLTableCellElement> & React.RefAttributes<HTMLTableCellElement>>;
declare const TableCell: React.ForwardRefExoticComponent<React.TdHTMLAttributes<HTMLTableCellElement> & React.RefAttributes<HTMLTableCellElement>>;
//#endregion
//#region src/components/Tabs/Tabs.d.ts
declare const Tabs: typeof TabsPrimitive.Root;
declare const TabsList: React.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsListProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const TabsTrigger: React.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const TabsContent: React.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/Textarea/Textarea.d.ts
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}
declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
//#endregion
//#region src/components/Toast/Toast.d.ts
declare const ToastProvider: typeof ToastPrimitive.Provider;
declare const ToastViewport: React.ForwardRefExoticComponent<Omit<ToastPrimitive.ToastViewportProps & React.RefAttributes<HTMLOListElement>, "ref"> & React.RefAttributes<HTMLOListElement>>;
interface ToastProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> {
  variant?: 'default' | 'success' | 'destructive' | 'warning';
}
declare const Toast: React.ForwardRefExoticComponent<ToastProps & React.RefAttributes<HTMLLIElement>>;
declare const ToastAction: React.ForwardRefExoticComponent<Omit<ToastPrimitive.ToastActionProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const ToastClose: React.ForwardRefExoticComponent<Omit<ToastPrimitive.ToastCloseProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const ToastTitle: React.ForwardRefExoticComponent<Omit<ToastPrimitive.ToastTitleProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const ToastDescription: React.ForwardRefExoticComponent<Omit<ToastPrimitive.ToastDescriptionProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/Toggle/Toggle.d.ts
interface ToggleProps extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> {
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}
declare const Toggle: React.ForwardRefExoticComponent<ToggleProps & React.RefAttributes<HTMLButtonElement>>;
//#endregion
//#region src/components/ToggleGroup/ToggleGroup.d.ts
declare const ToggleGroup: React.ForwardRefExoticComponent<(Omit<ToggleGroupPrimitive.ToggleGroupSingleProps & React.RefAttributes<HTMLDivElement>, "ref"> | Omit<ToggleGroupPrimitive.ToggleGroupMultipleProps & React.RefAttributes<HTMLDivElement>, "ref">) & React.RefAttributes<HTMLDivElement>>;
declare const ToggleGroupItem: React.ForwardRefExoticComponent<Omit<ToggleGroupPrimitive.ToggleGroupItemProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
//#endregion
//#region src/components/Tooltip/Tooltip.d.ts
declare const TooltipProvider: typeof TooltipPrimitive.Provider;
declare const Tooltip: typeof TooltipPrimitive.Root;
declare const TooltipTrigger: typeof TooltipPrimitive.Trigger;
declare const TooltipContent: React.ForwardRefExoticComponent<Omit<TooltipPrimitive.TooltipContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
  showArrow?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/Typography/Typography.d.ts
declare const TypographyH1: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>;
declare const TypographyH2: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>;
declare const TypographyH3: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>;
declare const TypographyH4: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>;
declare const TypographyP: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>;
declare const TypographyLead: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>;
declare const TypographyLarge: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>;
declare const TypographySmall: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>;
declare const TypographyMuted: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>;
declare const TypographyInlineCode: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>;
declare const TypographyBlockquote: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>;
declare const TypographyUl: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>;
declare const TypographyOl: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>;
declare const TypographyHr: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>;
//#endregion
//#region src/components/FlagTag/FlagTag.css.d.ts
/**
 * FlagTag — Inline status indicator with icon + label
 *
 * Used in forensic/editorial contexts to mark rows as flagged, reviewed,
 * pending, etc. Intentionally minimal: no background, no border — just
 * icon + monospace label in a status color.
 *
 * Design decisions:
 * - No background or border (flat, ink-on-paper feel)
 * - Monospace font with letter-spacing (forensic/editorial density)
 * - Icon sits slightly above text baseline via translateY
 * - Icon is larger than text (14px icon with 9px text) for scannability
 * - Inline-flex so it flows naturally in text or table cells
 */
declare const flagTagRecipe: _vanilla_extract_recipes0.RuntimeFn<{
  variant: {
    destructive: {
      color: `var(--${string})`;
    };
    warning: {
      color: `var(--${string})`;
    };
    success: {
      color: `var(--${string})`;
    };
    primary: {
      color: `var(--${string})`;
    };
    muted: {
      color: `var(--${string})`;
    };
  };
  size: {
    xs: {
      fontSize: "8px";
      gap: "3px";
    };
    sm: {
      fontSize: "9px";
      gap: "4px";
    };
    md: {
      fontSize: "11px";
      gap: "5px";
    };
    lg: {
      fontSize: "13px";
      gap: "6px";
    };
  };
}>;
type FlagTagVariants = RecipeVariants<typeof flagTagRecipe>;
//#endregion
//#region src/components/FlagTag/FlagTag.d.ts
interface FlagTagProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>, NonNullable<FlagTagVariants> {
  /**
   * Icon element or string (emoji). Defaults to "⚠".
   * Can also pass a Lucide icon: `<Icons.AlertTriangle size={14} />`
   */
  icon?: React.ReactNode;
  /**
   * Label text. Defaults to "FLAG".
   */
  label?: string;
  /**
   * Left margin from preceding content. Useful when placed inline
   * after names or values. Defaults to '8px'.
   */
  marginLeft?: string | number;
}
/**
 * FlagTag — Minimal inline status flag for forensic/editorial contexts.
 *
 * Renders an icon + label in a status color with no background or border.
 * Monospace font with letter-spacing for data-dense environments.
 *
 * @example
 * ```tsx
 * // Default destructive flag
 * <FlagTag />
 *
 * // Custom label + warning variant
 * <FlagTag variant="warning" label="REVIEW" icon="🔍" />
 *
 * // With Lucide icon
 * <FlagTag icon={<Icons.AlertTriangle size={14} />} label="FLAGGED" />
 *
 * // Inline after a name
 * <span>Belen Blackstone <FlagTag marginLeft="8px" /></span>
 * ```
 */
declare const FlagTag: React.ForwardRefExoticComponent<FlagTagProps & React.RefAttributes<HTMLSpanElement>>;
//#endregion
//#region src/components/SourceRatingBar/SourceRatingBar.css.d.ts
/**
 * SourceRatingBar — Segmented bar graph component
 *
 * A horizontal bar divided into N equal segments. Each segment is either
 * "lit" (filled with the accent color) or "dim" (filled with a faint wash
 * of the accent color). Together they form a continuous bar — no gaps —
 * where lit segments indicate presence/coverage across data sources.
 *
 * Design decisions:
 * - Segments are flush (gap: 0) forming one continuous bar
 * - Dim segments use 12% opacity of chart2 color (visible but subtle)
 * - Lit segments use chart2 at 80% opacity (punchy but not overpowering)
 * - No border-radius on individual segments; radius on container only
 * - Container border-radius is 1px (nearly square, forensic/editorial feel)
 * - Sizes control segment dimensions; sm is default for inline data tables
 */
declare const sourceRatingBarRecipe: _vanilla_extract_recipes0.RuntimeFn<{
  size: {
    xs: {};
    sm: {};
    md: {};
    lg: {};
  }; /** Color variant — maps to token palette */
  color: {
    primary: {};
    chart1: {};
    chart2: {};
    chart3: {};
    chart4: {};
    chart5: {};
    destructive: {};
    success: {};
    warning: {};
  };
}>;
type SourceRatingBarVariants = RecipeVariants<typeof sourceRatingBarRecipe>;
//#endregion
//#region src/components/SourceRatingBar/SourceRatingBar.d.ts
interface SourceRatingBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>, NonNullable<SourceRatingBarVariants> {
  /**
   * Array of booleans — each entry is one segment.
   * `true` = lit (filled), `false` = dim (background).
   * Length determines total segment count (typically 10).
   */
  sources: boolean[];
  /**
   * Alternatively, pass a numeric value + total to auto-generate.
   * If `sources` is provided, these are ignored.
   */
  value?: number;
  total?: number;
}
/**
 * SourceRatingBar — A segmented bar graph showing coverage across data sources.
 *
 * Each segment is either "lit" (present in source) or "dim" (absent).
 * Segments are flush with no gaps, forming a continuous bar.
 *
 * @example
 * ```tsx
 * // Boolean array mode (explicit control per segment)
 * <SourceRatingBar sources={[true, true, false, true, false, false, true, false, false, false]} />
 *
 * // Numeric mode (auto-fill left-to-right)
 * <SourceRatingBar value={4} total={10} />
 *
 * // Custom color + size
 * <SourceRatingBar sources={data} color="primary" size="md" />
 * ```
 */
declare const SourceRatingBar: React.ForwardRefExoticComponent<SourceRatingBarProps & React.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/components/DataGrid/types.d.ts
type Updater<T> = T | ((old: T) => T);
type OnChangeFn<T> = (updaterOrValue: Updater<T>) => void;
type SortDirection = 'asc' | 'desc';
interface ColumnDef<TData = any> {
  /** Unique column identifier */
  id: string;
  /** Header text or render function */
  header?: string | ((ctx: HeaderContext<TData>) => React.ReactNode);
  /** Accessor key (dot-notation supported for nested objects) */
  accessorKey?: string;
  /** Accessor function for computed values */
  accessorFn?: (row: TData, index: number) => any;
  /** Custom cell renderer */
  cell?: (ctx: CellContext<TData>) => React.ReactNode;
  /** Footer renderer */
  footer?: string | ((ctx: HeaderContext<TData>) => React.ReactNode);
  /** Enable/disable sorting for this column. Default: true */
  enableSorting?: boolean;
  /** Enable/disable filtering for this column. Default: true */
  enableFiltering?: boolean;
  /** Enable/disable resizing for this column. Default: true */
  enableResizing?: boolean;
  /** Enable/disable hiding for this column. Default: true */
  enableHiding?: boolean;
  /** Custom filter function */
  filterFn?: FilterFn<TData>;
  /** Custom sorting function */
  sortingFn?: SortingFn<TData>;
  /** Sort descending first. Default: false */
  sortDescFirst?: boolean;
  /** Default column width in px */
  size?: number;
  /** Min column width in px */
  minSize?: number;
  /** Max column width in px */
  maxSize?: number;
  /** Pin column to 'left' or 'right' */
  pin?: 'left' | 'right';
  /** Horizontal alignment */
  align?: 'left' | 'center' | 'right';
  /** Child columns for grouped headers */
  columns?: ColumnDef<TData>[];
  /** Aggregate function for grouped rows */
  aggregateFn?: AggregateFn;
  /** Custom CSS class for cells in this column */
  cellClassName?: string;
  /** Custom CSS class for the header */
  headerClassName?: string;
  /** Whether this column is editable */
  editable?: boolean;
  /** Editor component for inline editing */
  editor?: (ctx: CellContext<TData>) => React.ReactNode;
}
interface HeaderContext<TData = any> {
  column: ResolvedColumn<TData>;
  table: DataGridInstance<TData>;
}
interface CellContext<TData = any> {
  row: Row<TData>;
  column: ResolvedColumn<TData>;
  value: any;
  table: DataGridInstance<TData>;
  getValue: () => any;
  renderValue: () => any;
}
interface ResolvedColumn<TData = any> extends ColumnDef<TData> {
  /** Resolved accessor function */
  getAccessorFn: () => ((row: TData, index: number) => any) | undefined;
  /** Get current column size */
  getSize: () => number;
  /** Get current sort direction or false */
  getIsSorted: () => false | SortDirection;
  /** Get sort index in multi-sort */
  getSortIndex: () => number;
  /** Toggle sorting */
  toggleSorting: (desc?: boolean, multi?: boolean) => void;
  /** Whether column can be sorted */
  getCanSort: () => boolean;
  /** Whether column can be resized */
  getCanResize: () => boolean;
  /** Whether column can be filtered */
  getCanFilter: () => boolean;
  /** Whether column is visible */
  getIsVisible: () => boolean;
  /** Toggle column visibility */
  toggleVisibility: (value?: boolean) => void;
  /** Get current filter value */
  getFilterValue: () => any;
  /** Set filter value */
  setFilterValue: (value: any) => void;
  /** Column depth (for grouped headers) */
  depth: number;
  /** Parent column (if grouped) */
  parent?: ResolvedColumn<TData>;
  /** Child columns (if grouped) */
  childColumns: ResolvedColumn<TData>[];
  /** Leaf columns (flattened) */
  getLeafColumns: () => ResolvedColumn<TData>[];
}
interface Row<TData = any> {
  /** Unique row id */
  id: string;
  /** Row index in current view */
  index: number;
  /** Original data */
  original: TData;
  /** Get value for column */
  getValue: (columnId: string) => any;
  /** Get render value (with fallback) */
  renderValue: (columnId: string) => any;
  /** Whether row is selected */
  getIsSelected: () => boolean;
  /** Toggle selection */
  toggleSelected: (value?: boolean) => void;
  /** Whether row is expanded */
  getIsExpanded: () => boolean;
  /** Toggle expansion */
  toggleExpanded: (value?: boolean) => void;
  /** Sub-rows (for tree/grouping) */
  subRows: Row<TData>[];
  /** Depth for nested rows */
  depth: number;
  /** Parent row */
  parentRow?: Row<TData>;
  /** Whether this row can be selected */
  getCanSelect: () => boolean;
  /** Whether row is being edited */
  getIsEditing: () => boolean;
}
interface ColumnSort {
  id: string;
  desc: boolean;
}
type SortingState = ColumnSort[];
type SortingFn<TData = any> = (rowA: Row<TData>, rowB: Row<TData>, columnId: string) => number;
interface ColumnFilter {
  id: string;
  value: any;
}
type ColumnFiltersState = ColumnFilter[];
type FilterFn<TData = any> = (row: Row<TData>, columnId: string, filterValue: any) => boolean;
interface PaginationState {
  pageIndex: number;
  pageSize: number;
}
type RowSelectionState = Record<string, boolean>;
type ColumnVisibilityState = Record<string, boolean>;
type ColumnSizingState = Record<string, number>;
interface ColumnSizingInfoState {
  isResizingColumn: false | string;
  startOffset: number | null;
  startSize: number | null;
  deltaOffset: number | null;
  columnSizingStart: [string, number][];
}
type ColumnOrderState = string[];
type ExpandedState = Record<string, boolean> | true;
interface EditingState {
  rowId: string | null;
  columnId: string | null;
}
type GroupingState = string[];
type AggregateFn = (columnId: string, leafRows: Row[], childRows: Row[]) => any;
type GlobalFilterState = string;
interface DataGridState {
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  globalFilter: GlobalFilterState;
  pagination: PaginationState;
  rowSelection: RowSelectionState;
  columnVisibility: ColumnVisibilityState;
  columnSizing: ColumnSizingState;
  columnSizingInfo: ColumnSizingInfoState;
  columnOrder: ColumnOrderState;
  expanded: ExpandedState;
  editing: EditingState;
  grouping: GroupingState;
}
interface RowModel<TData = any> {
  rows: Row<TData>[];
  flatRows: Row<TData>[];
  rowsById: Record<string, Row<TData>>;
}
interface DataGridOptions<TData = any> {
  /** Column definitions */
  columns: ColumnDef<TData>[];
  /** Data array */
  data: TData[];
  /** Derive row ID from data */
  getRowId?: (row: TData, index: number, parent?: Row<TData>) => string;
  /** Get sub-rows for tree data */
  getSubRows?: (row: TData) => TData[] | undefined;
  /** Initial state */
  initialState?: Partial<DataGridState>;
  enableSorting?: boolean;
  enableMultiSort?: boolean;
  manualSorting?: boolean;
  onSortingChange?: OnChangeFn<SortingState>;
  sortDescFirst?: boolean;
  maxMultiSortColCount?: number;
  enableColumnFilters?: boolean;
  enableGlobalFilter?: boolean;
  manualFiltering?: boolean;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
  onGlobalFilterChange?: OnChangeFn<GlobalFilterState>;
  globalFilterFn?: FilterFn<TData>;
  enablePagination?: boolean;
  manualPagination?: boolean;
  onPaginationChange?: OnChangeFn<PaginationState>;
  pageCount?: number;
  rowCount?: number;
  pageSizeOptions?: number[];
  enableRowSelection?: boolean | ((row: Row<TData>) => boolean);
  enableMultiRowSelection?: boolean;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  enableColumnVisibility?: boolean;
  onColumnVisibilityChange?: OnChangeFn<ColumnVisibilityState>;
  enableColumnResizing?: boolean;
  columnResizeMode?: 'onChange' | 'onEnd';
  onColumnSizingChange?: OnChangeFn<ColumnSizingState>;
  onColumnSizingInfoChange?: OnChangeFn<ColumnSizingInfoState>;
  enableColumnOrdering?: boolean;
  onColumnOrderChange?: OnChangeFn<ColumnOrderState>;
  enableExpanding?: boolean;
  onExpandedChange?: OnChangeFn<ExpandedState>;
  enableEditing?: boolean;
  onEditingChange?: OnChangeFn<EditingState>;
  onCellEdit?: (rowId: string, columnId: string, value: any) => void;
  enableGrouping?: boolean;
  onGroupingChange?: OnChangeFn<GroupingState>;
  state?: Partial<DataGridState>;
  onStateChange?: (updater: Updater<DataGridState>) => void;
  renderFallbackValue?: any;
  defaultColumn?: Partial<ColumnDef<TData>>;
  meta?: Record<string, any>;
}
interface DataGridInstance<TData = any> {
  options: DataGridOptions<TData>;
  getState: () => DataGridState;
  setState: (updater: Updater<DataGridState>) => void;
  initialState: DataGridState;
  reset: () => void;
  getAllColumns: () => ResolvedColumn<TData>[];
  getAllFlatColumns: () => ResolvedColumn<TData>[];
  getAllLeafColumns: () => ResolvedColumn<TData>[];
  getVisibleLeafColumns: () => ResolvedColumn<TData>[];
  getColumn: (id: string) => ResolvedColumn<TData> | undefined;
  getHeaderGroups: () => HeaderGroup<TData>[];
  getCoreRowModel: () => RowModel<TData>;
  getRowModel: () => RowModel<TData>;
  getFilteredRowModel: () => RowModel<TData>;
  getSortedRowModel: () => RowModel<TData>;
  getPaginatedRowModel: () => RowModel<TData>;
  getRow: (id: string) => Row<TData>;
  getPrePaginationRowModel: () => RowModel<TData>;
  setSorting: (updater: Updater<SortingState>) => void;
  resetSorting: () => void;
  setColumnFilters: (updater: Updater<ColumnFiltersState>) => void;
  resetColumnFilters: () => void;
  setGlobalFilter: (value: string) => void;
  resetGlobalFilter: () => void;
  setPagination: (updater: Updater<PaginationState>) => void;
  setPageIndex: (updater: Updater<number>) => void;
  setPageSize: (updater: Updater<number>) => void;
  getPageCount: () => number;
  getCanPreviousPage: () => boolean;
  getCanNextPage: () => boolean;
  previousPage: () => void;
  nextPage: () => void;
  firstPage: () => void;
  lastPage: () => void;
  resetPagination: () => void;
  setRowSelection: (updater: Updater<RowSelectionState>) => void;
  resetRowSelection: () => void;
  getIsAllRowsSelected: () => boolean;
  getIsAllPageRowsSelected: () => boolean;
  getIsSomeRowsSelected: () => boolean;
  getIsSomePageRowsSelected: () => boolean;
  toggleAllRowsSelected: (value?: boolean) => void;
  toggleAllPageRowsSelected: (value?: boolean) => void;
  getSelectedRowModel: () => RowModel<TData>;
  setColumnVisibility: (updater: Updater<ColumnVisibilityState>) => void;
  resetColumnVisibility: () => void;
  setColumnSizing: (updater: Updater<ColumnSizingState>) => void;
  setColumnSizingInfo: (updater: Updater<ColumnSizingInfoState>) => void;
  resetColumnSizing: () => void;
  getTotalSize: () => number;
  setColumnOrder: (updater: Updater<ColumnOrderState>) => void;
  resetColumnOrder: () => void;
  setExpanded: (updater: Updater<ExpandedState>) => void;
  resetExpanded: () => void;
  toggleAllRowsExpanded: (value?: boolean) => void;
  getIsAllRowsExpanded: () => boolean;
  getExpandedDepth: () => number;
  setEditing: (updater: Updater<EditingState>) => void;
  startEditing: (rowId: string, columnId: string) => void;
  stopEditing: () => void;
  setGrouping: (updater: Updater<GroupingState>) => void;
  resetGrouping: () => void;
}
interface HeaderGroup<TData = any> {
  id: string;
  depth: number;
  headers: ResolvedColumn<TData>[];
}
//#endregion
//#region src/components/DataGrid/DataGrid.d.ts
interface DataGridProps<TData = any> extends DataGridOptions<TData> {
  /** Maximum height of the grid body (enables scroll) */
  height?: string | number;
  /** Show the toolbar with search and controls. Default: true */
  showToolbar?: boolean;
  /** Show the status bar at the bottom. Default: false */
  showStatusBar?: boolean;
  /** Show the footer with pagination. Default: true when pagination enabled */
  showFooter?: boolean;
  /** Show column filter row. Default: false */
  showColumnFilters?: boolean;
  /** Custom empty state message */
  emptyMessage?: string;
  /** Show loading skeleton rows */
  loading?: boolean;
  /** Number of skeleton rows to show */
  loadingRows?: number;
  /** Custom class for container */
  className?: string;
  /** Custom toolbar content (left side) */
  toolbarLeft?: React.ReactNode;
  /** Custom toolbar content (right side) */
  toolbarRight?: React.ReactNode;
  /** CSS inline styles */
  style?: React.CSSProperties;
  /** Use external table instance instead of creating one */
  table?: DataGridInstance<TData>;
  /** Callback when a row is clicked */
  onRowClick?: (row: Row<TData>) => void;
  /** Callback when a row is double-clicked */
  onRowDoubleClick?: (row: Row<TData>) => void;
  /** Remove outer border and border-radius. Default: false */
  borderless?: boolean;
  /** Density: 'default' (standard), 'compact' (tighter rows/fonts), 'editorial' (high-density data journalism) */
  density?: 'default' | 'compact' | 'editorial';
  /** Header border style: 'thin' (1px), 'thick' (2px), 'none' */
  headerBorder?: 'thin' | 'thick' | 'none';
  /** Row separator style: 'full' (default), 'subtle' (barely visible), 'none' */
  rowSeparator?: 'full' | 'subtle' | 'none';
  /** Remove background fill from container (transparent). Default: false */
  transparent?: boolean;
  /** Disable hover highlight on rows. Default: false */
  noRowHover?: boolean;
}
declare function DataGrid<TData = any>({
  height,
  showToolbar,
  showStatusBar,
  showFooter,
  showColumnFilters,
  emptyMessage,
  loading,
  loadingRows: loadingRowCount,
  className,
  toolbarLeft: customToolbarLeft,
  toolbarRight: customToolbarRight,
  style: containerStyle,
  table: externalTable,
  onRowClick,
  onRowDoubleClick,
  borderless,
  density,
  headerBorder,
  rowSeparator,
  transparent,
  noRowHover,
  ...options
}: DataGridProps<TData>): react_jsx_runtime0.JSX.Element;
declare namespace DataGrid {
  var displayName: string;
}
//#endregion
//#region src/components/DataGrid/useDataGrid.d.ts
/**
 * React hook that creates and manages a DataGrid instance.
 *
 * Inspired by TanStack Table's `useReactTable` — provides a headless,
 * fully typed table instance with automatic React state management.
 *
 * @example
 * ```tsx
 * const table = useDataGrid({
 *   data: myData,
 *   columns: myColumns,
 *   enableSorting: true,
 *   enablePagination: true,
 * });
 * ```
 */
declare function useDataGrid<TData>(options: DataGridOptions<TData>): DataGridInstance<TData>;
//#endregion
//#region src/components/DataGrid/core.d.ts
declare function createDataGrid<TData>(options: DataGridOptions<TData>): DataGridInstance<TData>;
//#endregion
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger, type AggregateFn, Alert, AlertDescription, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger, type AlertProps, AlertTitle, AspectRatio, Avatar, AvatarFallback, AvatarImage, type AvatarProps, Badge, type BadgeProps, Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, type BreadcrumbLinkProps, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, type ButtonProps, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, type CellContext, Checkbox, Collapsible, CollapsibleContent, CollapsibleTrigger, type ColumnDef, type ColumnFilter, type ColumnFiltersState, type ColumnOrderState, type ColumnSizingState, type ColumnSort, type ColumnVisibilityState, Command, CommandEmpty, CommandGroup, type CommandGroupProps, CommandInput, type CommandInputProps, CommandItem, CommandList, CommandSeparator, CommandShortcut, ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuLabel, ContextMenuPortal, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger, DataGrid, type DataGridInstance, type DataGridOptions, type Row as DataGridRow, type DataGridState, Dialog, DialogClose, DialogContent, type DialogContentProps, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, type EditingState, type ExpandedState, FieldMessage, type FieldMessageProps, type FilterFn, FlagTag, type FlagTagProps, type GroupingState, type HeaderContext, type HeaderGroup, HoverCard, HoverCardContent, HoverCardTrigger, Icons, Input, InputGroup, InputGroupAddon, type InputGroupAddonProps, type InputGroupProps, InputGroupToolbar, type InputGroupToolbarProps, type InputProps, Kbd, type KbdProps, Label, Menubar, MenubarCheckboxItem, MenubarContent, MenubarGroup, MenubarItem, MenubarLabel, MenubarMenu, MenubarPortal, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger, NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport, Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, type PaginationLinkProps, PaginationNext, PaginationPrevious, type PaginationState, Popover, PopoverAnchor, PopoverClose, PopoverContent, PopoverTrigger, Progress, RadioGroup, RadioGroupItem, type ResolvedColumn, type RowModel, type RowSelectionState, ScrollArea, ScrollBar, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, type SelectTriggerProps, SelectValue, Separator, Sheet, SheetBody, SheetClose, SheetContent, type SheetContentProps, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetPortal, SheetTitle, SheetTrigger, Skeleton, Slider, type SortDirection, type SortingFn, type SortingState, SourceRatingBar, type SourceRatingBarProps, Spinner, type SpinnerProps, Switch, Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, TableWrapper, Tabs, TabsContent, TabsList, TabsTrigger, Textarea, type TextareaProps, Toast, ToastAction, ToastClose, ToastDescription, type ToastProps, ToastProvider, ToastTitle, ToastViewport, Toggle, ToggleGroup, ToggleGroupItem, type ToggleProps, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, TypographyBlockquote, TypographyH1, TypographyH2, TypographyH3, TypographyH4, TypographyHr, TypographyInlineCode, TypographyLarge, TypographyLead, TypographyMuted, TypographyOl, TypographyP, TypographySmall, TypographyUl, createDataGrid, inputGroupInput as inputGroupInputClass, useDataGrid };
//# sourceMappingURL=index.d.mts.map