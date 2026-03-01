// Global styles — import as a side effect at app root:
// import '@hydrotik/design-system/src/global.css';

// ─── Accordion ───────────────────────────────────────────────────────────────
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './components/Accordion';

// ─── Alert ───────────────────────────────────────────────────────────────────
export { Alert, AlertTitle, AlertDescription } from './components/Alert';
export type { AlertProps } from './components/Alert';

// ─── AlertDialog ─────────────────────────────────────────────────────────────
export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from './components/AlertDialog';

// ─── AspectRatio ─────────────────────────────────────────────────────────────
export { AspectRatio } from './components/AspectRatio';

// ─── Avatar ──────────────────────────────────────────────────────────────────
export { Avatar, AvatarImage, AvatarFallback } from './components/Avatar';
export type { AvatarProps } from './components/Avatar';

// ─── Badge ───────────────────────────────────────────────────────────────────
export { Badge } from './components/Badge';
export type { BadgeProps } from './components/Badge';

// ─── Breadcrumb ──────────────────────────────────────────────────────────────
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from './components/Breadcrumb';
export type { BreadcrumbLinkProps } from './components/Breadcrumb';

// ─── Button ──────────────────────────────────────────────────────────────────
export { Button } from './components/Button';
export type { ButtonProps } from './components/Button';

// ─── Card ────────────────────────────────────────────────────────────────────
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './components/Card';
// Card no longer has custom props — uses React.HTMLAttributes directly

// ─── Checkbox ────────────────────────────────────────────────────────────────
export { Checkbox } from './components/Checkbox';

// ─── Collapsible ─────────────────────────────────────────────────────────────
export { Collapsible, CollapsibleTrigger, CollapsibleContent } from './components/Collapsible';

// ─── Command ─────────────────────────────────────────────────────────────────
export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from './components/Command';
export type { CommandInputProps, CommandGroupProps } from './components/Command';

// ─── ContextMenu ─────────────────────────────────────────────────────────────
export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
} from './components/ContextMenu';

// ─── Dialog ──────────────────────────────────────────────────────────────────
export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './components/Dialog';
export type { DialogContentProps } from './components/Dialog';

// ─── DropdownMenu ────────────────────────────────────────────────────────────
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from './components/DropdownMenu';

// ─── FieldMessage ────────────────────────────────────────────────────────────
export { FieldMessage } from './components/FieldMessage';
export type { FieldMessageProps } from './components/FieldMessage';

// ─── HoverCard ───────────────────────────────────────────────────────────────
export { HoverCard, HoverCardTrigger, HoverCardContent } from './components/HoverCard';

// ─── Input ───────────────────────────────────────────────────────────────────
export { Input } from './components/Input';
export type { InputProps } from './components/Input';

// ─── InputGroup ──────────────────────────────────────────────────────────────
export { InputGroup, InputGroupAddon, InputGroupToolbar, inputGroupInputClass } from './components/InputGroup';
export type { InputGroupProps, InputGroupAddonProps, InputGroupToolbarProps } from './components/InputGroup';

// ─── Kbd ─────────────────────────────────────────────────────────────────────
export { Kbd } from './components/Kbd';
export type { KbdProps } from './components/Kbd';

// ─── Label ───────────────────────────────────────────────────────────────────
export { Label } from './components/Label';

// ─── Menubar ─────────────────────────────────────────────────────────────────
export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioItem,
  MenubarLabel,
  MenubarSeparator,
  MenubarShortcut,
  MenubarGroup,
  MenubarPortal,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarRadioGroup,
} from './components/Menubar';

// ─── NavigationMenu ──────────────────────────────────────────────────────────
export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
  NavigationMenuIndicator,
} from './components/NavigationMenu';

// ─── Pagination ──────────────────────────────────────────────────────────────
export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from './components/Pagination';
export type { PaginationLinkProps } from './components/Pagination';

// ─── Popover ─────────────────────────────────────────────────────────────────
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, PopoverClose } from './components/Popover';

// ─── Progress ────────────────────────────────────────────────────────────────
export { Progress } from './components/Progress';

// ─── RadioGroup ──────────────────────────────────────────────────────────────
export { RadioGroup, RadioGroupItem } from './components/RadioGroup';

// ─── ScrollArea ──────────────────────────────────────────────────────────────
export { ScrollArea, ScrollBar } from './components/ScrollArea';

// ─── Select ──────────────────────────────────────────────────────────────────
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,

  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from './components/Select';
export type { SelectTriggerProps } from './components/Select';

// ─── Separator ───────────────────────────────────────────────────────────────
export { Separator } from './components/Separator';

// ─── Sheet ───────────────────────────────────────────────────────────────────
export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetPortal,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetBody,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from './components/Sheet';
export type { SheetContentProps } from './components/Sheet';

// ─── Skeleton ────────────────────────────────────────────────────────────────
export { Skeleton } from './components/Skeleton';

// ─── Slider ──────────────────────────────────────────────────────────────────
export { Slider } from './components/Slider';

// ─── Spinner ─────────────────────────────────────────────────────────────────
export { Spinner } from './components/Spinner';
export type { SpinnerProps } from './components/Spinner';

// ─── Switch ──────────────────────────────────────────────────────────────────
export { Switch } from './components/Switch';

// ─── Table ───────────────────────────────────────────────────────────────────
export {
  TableWrapper,
  Table,
  TableCaption,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
} from './components/Table';

// ─── Tabs ────────────────────────────────────────────────────────────────────
export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/Tabs';

// ─── Textarea ────────────────────────────────────────────────────────────────
export { Textarea } from './components/Textarea';
export type { TextareaProps } from './components/Textarea';

// ─── Toast ───────────────────────────────────────────────────────────────────
export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastAction,
  ToastClose,
  ToastTitle,
  ToastDescription,
} from './components/Toast';
export type { ToastProps } from './components/Toast';

// ─── Toggle ──────────────────────────────────────────────────────────────────
export { Toggle } from './components/Toggle';
export type { ToggleProps } from './components/Toggle';

// ─── ToggleGroup ─────────────────────────────────────────────────────────────
export { ToggleGroup, ToggleGroupItem } from './components/ToggleGroup';

// ─── Tooltip ─────────────────────────────────────────────────────────────────
export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from './components/Tooltip';

// ─── Typography ──────────────────────────────────────────────────────────────
export {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
  TypographyInlineCode,
  TypographyBlockquote,
  TypographyUl,
  TypographyOl,
  TypographyHr,
} from './components/Typography';

// ─── FlagTag ─────────────────────────────────────────────────────────────────
export { FlagTag } from './components/FlagTag';
export type { FlagTagProps } from './components/FlagTag';

// ─── SegmentedRatingBar ─────────────────────────────────────────────────────────
export { SegmentedRatingBar } from './components/SegmentedRatingBar';
export type { SegmentedRatingBarProps } from './components/SegmentedRatingBar';

// ─── DataGrid ────────────────────────────────────────────────────────────────
export { DataGrid, useDataGrid, createDataGrid } from './components/DataGrid';
export type {
  DataGridOptions,
  DataGridInstance,
  DataGridState,
  ColumnDef,
  ResolvedColumn,
  Row as DataGridRow,
  RowModel,
  HeaderGroup,
  CellContext,
  HeaderContext,
  SortingState,
  SortDirection,
  ColumnSort,
  ColumnFiltersState,
  ColumnFilter,
  PaginationState,
  RowSelectionState,
  ColumnVisibilityState,
  ColumnSizingState,
  ColumnOrderState,
  ExpandedState,
  EditingState,
  GroupingState,
  SortingFn,
  FilterFn,
  AggregateFn,
} from './components/DataGrid';

// ─── Price ────────────────────────────────────────────────────────────────────
export { Price } from './components/Price';
export type { PriceProps } from './components/Price';

// ─── ColorSwatch ──────────────────────────────────────────────────────────────
export { ColorSwatch } from './components/ColorSwatch';
export type { ColorSwatchProps } from './components/ColorSwatch';

// ─── QuantityPicker ───────────────────────────────────────────────────────────
export { QuantityPicker } from './components/QuantityPicker';
export type { QuantityPickerProps } from './components/QuantityPicker';

// ─── ProductCard ──────────────────────────────────────────────────────────────
export { ProductCard, ProductCardSkeleton } from './components/ProductCard';
export type {
  ProductCardProps,
  ProductCardSkeletonProps,
  ProductCardProduct,
  ProductCardColor,
} from './components/ProductCard';

// ─── CartItem ─────────────────────────────────────────────────────────────────
export { CartItem, CartItemSkeleton } from './components/CartItem';
export type {
  CartItemProps,
  CartItemSkeletonProps,
  CartItemData,
} from './components/CartItem';

// ─── AddToCartButton ──────────────────────────────────────────────────────────
export { AddToCartButton } from './components/AddToCartButton';
export type { AddToCartButtonProps } from './components/AddToCartButton';

// ─── Icons (re-export lucide-react) ──────────────────────────────────────────
export * as Icons from 'lucide-react';
