import React from 'react';
import { vars } from '@hydrotik/tokens';
import type { ColumnDef } from '@hydrotik/design-system';
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  Alert, AlertTitle, AlertDescription,
  AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
  AlertDialogTitle, AlertDialogDescription, AlertDialogFooter,
  AlertDialogAction, AlertDialogCancel,
  Avatar, AvatarImage, AvatarFallback,
  Badge,
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbSeparator, BreadcrumbPage,
  Button,
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Checkbox,
  Collapsible, CollapsibleTrigger, CollapsibleContent,
  ContextMenu, ContextMenuTrigger, ContextMenuContent,
  ContextMenuItem, ContextMenuSeparator,
  Dialog, DialogTrigger, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter,
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator,
  Input,
  Kbd,
  Label,
  Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem,
  MenubarSeparator,
  Pagination, PaginationContent, PaginationItem, PaginationLink,
  PaginationPrevious, PaginationNext, PaginationEllipsis,
  Popover, PopoverTrigger, PopoverContent,
  Progress,
  RadioGroup, RadioGroupItem,
  ScrollArea,
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
  Separator,
  Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  DataGrid,
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
  Tabs, TabsList, TabsTrigger, TabsContent,
  Textarea,
  Toggle,
  ToggleGroup, ToggleGroupItem,
  Tooltip, TooltipTrigger, TooltipContent, TooltipProvider,
} from '@hydrotik/design-system';
import {
  IconAlertCircle, IconTerminal2, IconChevronDown, IconBold, IconItalic, IconUnderline,
  IconAlignLeft, IconAlignCenter, IconAlignRight, IconSettings, IconUser, IconLogout,
  IconCreditCard, IconMail, IconPlus,
} from '@tabler/icons-react';
import * as s from './SinkPage.css';

/* ── Wrapper per component section ── */
function Section({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div id={name} className={s.componentSection}>
      <h2 className={s.componentName}>{name}</h2>
      {children}
    </div>
  );
}

export function SinkPage() {
  const [progress, setProgress] = React.useState(42);
  const [sliderVal, setSliderVal] = React.useState([33]);
  const [switchOn, setSwitchOn] = React.useState(true);
  const [collapsibleOpen, setCollapsibleOpen] = React.useState(false);

  React.useEffect(() => {
    const t = setInterval(() => setProgress((p) => (p >= 90 ? 10 : p + 8)), 800);
    return () => clearInterval(t);
  }, []);

  return (
    <TooltipProvider>
      <div className={s.sinkContainer}>

        {/* ─── Accordion ─── */}
        <Section name="Accordion">
          <div className={s.demoBox}>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that match the other components.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. It&apos;s animated by default, but you can disable it.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Section>

        {/* ─── Alert ─── */}
        <Section name="Alert">
          <div className={s.demoColumn}>
            <Alert>
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You can add components to your app using the cli.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive" icon={<IconAlertCircle size={16} />}>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Your session has expired. Please log in again.
              </AlertDescription>
            </Alert>
          </div>
        </Section>

        {/* ─── Alert Dialog ─── */}
        <Section name="Alert Dialog">
          <div className={s.demoRow}>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Delete Account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </Section>

        {/* ─── Avatar ─── */}
        <Section name="Avatar">
          <div className={s.demoRow}>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </Section>

        {/* ─── Badge ─── */}
        <Section name="Badge">
          <div className={s.demoRow}>
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </Section>

        {/* ─── Breadcrumb ─── */}
        <Section name="Breadcrumb">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Section>

        {/* ─── Button ─── */}
        <Section name="Button">
          <div className={s.demoRow}>
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className={s.demoRow}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="icon-sm"><IconPlus size={14} /></Button>
            <Button disabled>Disabled</Button>
          </div>
        </Section>

        {/* ─── Card ─── */}
        <Section name="Card">
          <div className={s.demoBox}>
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description goes here.</CardDescription>
              </CardHeader>
              <CardContent>
                <p style={{ fontSize: '14px' }}>Card content with some text.</p>
              </CardContent>
              <CardFooter>
                <Button size="sm">Save</Button>
              </CardFooter>
            </Card>
          </div>
        </Section>

        {/* ─── Checkbox ─── */}
        <Section name="Checkbox">
          <div className={s.demoColumn} style={{ gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Checkbox id="terms" defaultChecked />
              <Label htmlFor="terms">Accept terms and conditions</Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Checkbox id="marketing" />
              <Label htmlFor="marketing">Receive marketing emails</Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Checkbox id="disabled" disabled />
              <Label htmlFor="disabled">Disabled</Label>
            </div>
          </div>
        </Section>

        {/* ─── Collapsible ─── */}
        <Section name="Collapsible">
          <div className={s.demoBox}>
            <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>@peduarte starred 3 repositories</span>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="icon-sm">
                    <IconChevronDown size={14} />
                  </Button>
                </CollapsibleTrigger>
              </div>
              <div style={{ borderRadius: '6px', border: `1px solid ${vars.color.border}`, padding: '8px 12px', fontSize: '14px', marginTop: '8px' }}>
                @radix-ui/primitives
              </div>
              <CollapsibleContent>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                  <div style={{ borderRadius: '6px', border: `1px solid ${vars.color.border}`, padding: '8px 12px', fontSize: '14px' }}>
                    @radix-ui/colors
                  </div>
                  <div style={{ borderRadius: '6px', border: `1px solid ${vars.color.border}`, padding: '8px 12px', fontSize: '14px' }}>
                    @stitches/react
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </Section>

        {/* ─── Context Menu ─── */}
        <Section name="Context Menu">
          <ContextMenu>
            <ContextMenuTrigger>
              <div className={s.contextTarget}>Right click here</div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>Back</ContextMenuItem>
              <ContextMenuItem>Forward</ContextMenuItem>
              <ContextMenuItem>Reload</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>View Page Source</ContextMenuItem>
              <ContextMenuItem>Inspect</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </Section>

        {/* ─── Dialog ─── */}
        <Section name="Dialog">
          <div className={s.demoRow}>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px 0' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Pedro Duarte" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@peduarte" />
                  </div>
                </div>
                <DialogFooter>
                  <Button>Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </Section>

        {/* ─── Dropdown Menu ─── */}
        <Section name="Dropdown Menu">
          <div className={s.demoRow}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Open Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem><IconUser size={14} /> Profile</DropdownMenuItem>
                <DropdownMenuItem><IconCreditCard size={14} /> Billing</DropdownMenuItem>
                <DropdownMenuItem><IconSettings size={14} /> Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem><IconLogout size={14} /> Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Section>

        {/* ─── Hover Card ─── */}
        <Section name="Hover Card">
          <div className={s.demoRow}>
            <p style={{ fontSize: '14px', color: vars.color.textMuted }}>
              Hover over a trigger to see the card (uses Popover for demo).
            </p>
          </div>
        </Section>

        {/* ─── Input ─── */}
        <Section name="Input">
          <div className={s.demoColumn} style={{ maxWidth: '24rem', gap: '12px' }}>
            <Input placeholder="Email" type="email" />
            <Input placeholder="Disabled" disabled />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Label htmlFor="with-label">With Label</Label>
              <Input id="with-label" placeholder="Enter text..." />
            </div>
          </div>
        </Section>

        {/* ─── Kbd ─── */}
        <Section name="Kbd">
          <div className={s.demoRow}>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
            <span style={{ fontSize: '14px' }}>Press</span>
            <Kbd>⌘</Kbd>
            <Kbd>⇧</Kbd>
            <Kbd>P</Kbd>
            <span style={{ fontSize: '14px' }}>to open command palette</span>
          </div>
        </Section>

        {/* ─── Label ─── */}
        <Section name="Label">
          <div className={s.demoBox}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Label htmlFor="label-demo">Email</Label>
              <Input id="label-demo" type="email" placeholder="m@example.com" />
            </div>
          </div>
        </Section>

        {/* ─── Menubar ─── */}
        <Section name="Menubar">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>New Tab</MenubarItem>
                <MenubarItem>New Window</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Print</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Undo</MenubarItem>
                <MenubarItem>Redo</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Cut</MenubarItem>
                <MenubarItem>Copy</MenubarItem>
                <MenubarItem>Paste</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Zoom In</MenubarItem>
                <MenubarItem>Zoom Out</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Toggle Fullscreen</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </Section>

        {/* ─── Pagination ─── */}
        <Section name="Pagination">
          <Pagination>
            <PaginationContent>
              <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
              <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
              <PaginationItem><PaginationEllipsis /></PaginationItem>
              <PaginationItem><PaginationNext href="#" /></PaginationItem>
            </PaginationContent>
          </Pagination>
        </Section>

        {/* ─── Popover ─── */}
        <Section name="Popover">
          <div className={s.demoRow}>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Open Popover</Button>
              </PopoverTrigger>
              <PopoverContent>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 600, margin: 0 }}>Dimensions</h4>
                  <p style={{ fontSize: '13px', color: vars.color.textMuted, margin: 0 }}>
                    Set the dimensions for the layer.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <Label htmlFor="width">Width</Label>
                    <Input id="width" defaultValue="100%" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <Label htmlFor="height">Height</Label>
                    <Input id="height" defaultValue="25px" />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </Section>

        {/* ─── Progress ─── */}
        <Section name="Progress">
          <div className={s.demoBox}>
            <Progress value={progress} />
          </div>
        </Section>

        {/* ─── Radio Group ─── */}
        <Section name="Radio Group">
          <div className={s.demoBox}>
            <RadioGroup defaultValue="comfortable">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RadioGroupItem value="default" id="r1" />
                <Label htmlFor="r1">Default</Label>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RadioGroupItem value="comfortable" id="r2" />
                <Label htmlFor="r2">Comfortable</Label>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RadioGroupItem value="compact" id="r3" />
                <Label htmlFor="r3">Compact</Label>
              </div>
            </RadioGroup>
          </div>
        </Section>

        {/* ─── Scroll Area ─── */}
        <Section name="Scroll Area">
          <div style={{ maxWidth: '24rem' }}>
            <ScrollArea style={{ height: '200px', borderRadius: '8px', border: `1px solid ${vars.color.border}`, padding: '16px' }}>
              <div style={{ fontSize: '14px' }}>
                <h4 style={{ marginBottom: '16px', fontWeight: 600 }}>Tags</h4>
                {Array.from({ length: 50 }, (_, i) => (
                  <div key={i} style={{ padding: '4px 0', borderBottom: `1px solid ${vars.color.border}` }}>
                    v1.2.0-beta.{i}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </Section>

        {/* ─── Select ─── */}
        <Section name="Select">
          <div className={s.demoRow}>
            <Select>
              <SelectTrigger style={{ width: '180px' }}>
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Section>

        {/* ─── Separator ─── */}
        <Section name="Separator">
          <div className={s.demoBox}>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 600, margin: '0 0 4px' }}>Radix Primitives</h4>
              <p style={{ fontSize: '13px', color: vars.color.textMuted, margin: 0 }}>
                An open-source UI component library.
              </p>
            </div>
            <Separator />
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', height: '20px', fontSize: '14px' }}>
              <span>Docs</span>
              <Separator orientation="vertical" />
              <span>API</span>
              <Separator orientation="vertical" />
              <span>Source</span>
            </div>
          </div>
        </Section>

        {/* ─── Sheet ─── */}
        <Section name="Sheet">
          <div className={s.demoRow}>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Open Sheet</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Edit profile</SheetTitle>
                  <SheetDescription>
                    Make changes to your profile here. Click save when you&apos;re done.
                  </SheetDescription>
                </SheetHeader>
                <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <Label htmlFor="sheet-name">Name</Label>
                    <Input id="sheet-name" defaultValue="Pedro Duarte" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <Label htmlFor="sheet-username">Username</Label>
                    <Input id="sheet-username" defaultValue="@peduarte" />
                  </div>
                </div>
                <Button>Save changes</Button>
              </SheetContent>
            </Sheet>
          </div>
        </Section>

        {/* ─── Skeleton ─── */}
        <Section name="Skeleton">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Skeleton style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Skeleton style={{ width: '250px', height: '16px' }} />
              <Skeleton style={{ width: '200px', height: '16px' }} />
            </div>
          </div>
        </Section>

        {/* ─── Slider ─── */}
        <Section name="Slider">
          <div className={s.demoBox}>
            <Slider value={sliderVal} onValueChange={setSliderVal} max={100} step={1} />
            <span style={{ fontSize: '13px', color: vars.color.textMuted }}>Value: {sliderVal[0]}</span>
          </div>
        </Section>

        {/* ─── Spinner ─── */}
        <Section name="Spinner">
          <div className={s.demoRow}>
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </div>
        </Section>

        {/* ─── Switch ─── */}
        <Section name="Switch">
          <div className={s.demoColumn} style={{ gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Switch id="airplane" checked={switchOn} onCheckedChange={setSwitchOn} />
              <Label htmlFor="airplane">Airplane Mode</Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Switch id="disabled-switch" disabled />
              <Label htmlFor="disabled-switch">Disabled</Label>
            </div>
          </div>
        </Section>

        {/* ─── Table ─── */}
        <Section name="Table">
          <div className={s.demoWide}>
            <DataGrid
              data={[
                { invoice: 'INV001', status: 'Paid', method: 'Credit Card', amount: 250.00 },
                { invoice: 'INV002', status: 'Pending', method: 'PayPal', amount: 150.00 },
                { invoice: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: 350.00 },
              ]}
              columns={[
                { id: 'invoice', header: 'Invoice', accessorKey: 'invoice', cell: ({ value }) => <span style={{ fontWeight: 500 }}>{value}</span> } as ColumnDef,
                { id: 'status', header: 'Status', accessorKey: 'status' } as ColumnDef,
                { id: 'method', header: 'Method', accessorKey: 'method' } as ColumnDef,
                { id: 'amount', header: 'Amount', accessorKey: 'amount', align: 'right', cell: ({ value }) => `$${Number(value).toFixed(2)}` } as ColumnDef,
              ]}
              enableSorting
              enablePagination={false}
              showToolbar={false}
            />
          </div>
        </Section>

        {/* ─── Tabs ─── */}
        <Section name="Tabs">
          <div className={s.demoBox}>
            <Tabs defaultValue="account">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription>Make changes to your account here.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <Label htmlFor="tab-name">Name</Label>
                      <Input id="tab-name" defaultValue="Pedro Duarte" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="password">
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>Change your password here.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <Label htmlFor="current">Current password</Label>
                      <Input id="current" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save password</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </Section>

        {/* ─── Textarea ─── */}
        <Section name="Textarea">
          <div className={s.demoBox}>
            <Textarea placeholder="Type your message here." />
          </div>
        </Section>

        {/* ─── Toggle ─── */}
        <Section name="Toggle">
          <div className={s.demoRow}>
            <Toggle aria-label="Toggle bold"><IconBold size={14} /></Toggle>
            <Toggle aria-label="Toggle italic"><IconItalic size={14} /></Toggle>
            <Toggle aria-label="Toggle underline"><IconUnderline size={14} /></Toggle>
          </div>
        </Section>

        {/* ─── Toggle Group ─── */}
        <Section name="Toggle Group">
          <div className={s.demoRow}>
            <ToggleGroup type="single" defaultValue="center">
              <ToggleGroupItem value="left" aria-label="Align left"><IconAlignLeft size={14} /></ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Align center"><IconAlignCenter size={14} /></ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Align right"><IconAlignRight size={14} /></ToggleGroupItem>
            </ToggleGroup>
          </div>
        </Section>

        {/* ─── Tooltip ─── */}
        <Section name="Tooltip">
          <div className={s.demoRow}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </Section>

      </div>
    </TooltipProvider>
  );
}
