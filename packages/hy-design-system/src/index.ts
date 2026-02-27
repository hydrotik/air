// Global styles — import as a side effect at app root:
// import '@hydrotik/design-system/src/global.css';

// Button
export { Button } from './components/Button';
export type { ButtonProps } from './components/Button';

// Label
export { Label } from './components/Label';

// FieldMessage
export { FieldMessage } from './components/FieldMessage';
export type { FieldMessageProps } from './components/FieldMessage';

// Input
export { Input } from './components/Input';
export type { InputProps } from './components/Input';

// Textarea
export { Textarea } from './components/Textarea';
export type { TextareaProps } from './components/Textarea';

// Card
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './components/Card';
export type { CardProps } from './components/Card';

// Badge
export { Badge } from './components/Badge';
export type { BadgeProps } from './components/Badge';

// Separator
export { Separator } from './components/Separator';

// Tabs
export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/Tabs';

// Dialog
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

// Select
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectItemIndicator,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from './components/Select';
export type { SelectTriggerProps } from './components/Select';

// DropdownMenu
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

// Popover
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, PopoverClose } from './components/Popover';

// Tooltip
export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from './components/Tooltip';

// Toast
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

// Table
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
