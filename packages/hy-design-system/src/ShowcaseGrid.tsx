import React, { useState } from 'react';
import { ThemeProvider } from '@hydrotik/theme-provider';
import { vars } from '@hydrotik/tokens';
import type { ColumnDef } from './components/DataGrid/types';
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  Alert, AlertTitle, AlertDescription,
  Avatar, AvatarFallback,
  Badge,
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbSeparator, BreadcrumbPage,
  Button,
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Checkbox,
  DataGrid,
  Dialog, DialogTrigger, DialogContent, DialogHeader,
  DialogTitle, DialogDescription,
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator,
  Input,
  Kbd,
  Label,
  Pagination, PaginationContent, PaginationItem, PaginationLink,
  PaginationPrevious, PaginationNext, PaginationEllipsis,
  Popover, PopoverTrigger, PopoverContent,
  Progress,
  RadioGroup, RadioGroupItem,
  SegmentedRatingBar,
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
  Separator,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Tabs, TabsList, TabsTrigger, TabsContent,
  Textarea,
  Toggle,
  ToggleGroup, ToggleGroupItem,
  Tooltip, TooltipTrigger, TooltipContent, TooltipProvider,
  Price,
  ColorSwatch,
  QuantityPicker,
  AddToCartButton,
  FlagTag,
  ChatMessage,
  CodeBlock,
  InlineCode,
  TypingAnimation,
  ToolCallIndicator,
  Heading,
  TypographyH3,
  TypographyLead,
  TypographyMuted,
} from '.';
import {
  IconAlertCircle, IconBold, IconItalic, IconUnderline,
  IconAlignLeft, IconAlignCenter, IconAlignRight,
  IconSettings, IconUser, IconLogout, IconCreditCard,
  IconRobot, IconTool, IconShoppingCart,
  IconChartBar, IconStack2,
  IconPointer, IconForms, IconGrid3x3, IconSparkles,
  IconTypography, IconMessage, IconCode, IconBolt,
  IconAlertTriangle, IconSearch, IconCircleCheck,
} from '@tabler/icons-react';
import * as s from './ShowcaseGrid.css';

/* ─── Categories ─── */
type Category = 'all' | 'primitives' | 'forms' | 'data' | 'navigation' | 'overlay' | 'feedback' | 'ecommerce' | 'ai' | 'editorial';

const CATEGORIES: { id: Category; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'All', icon: <IconGrid3x3 size={11} /> },
  { id: 'primitives', label: 'Primitives', icon: <IconStack2 size={11} /> },
  { id: 'forms', label: 'Forms', icon: <IconForms size={11} /> },
  { id: 'data', label: 'Data', icon: <IconChartBar size={11} /> },
  { id: 'navigation', label: 'Nav', icon: <IconPointer size={11} /> },
  { id: 'overlay', label: 'Overlays', icon: <IconStack2 size={11} /> },
  { id: 'feedback', label: 'Feedback', icon: <IconSparkles size={11} /> },
  { id: 'ecommerce', label: 'Commerce', icon: <IconShoppingCart size={11} /> },
  { id: 'ai', label: 'AI', icon: <IconRobot size={11} /> },
  { id: 'editorial', label: 'Editorial', icon: <IconTypography size={11} /> },
];

/* ─── Section wrapper ─── */
function Section({ label, tag, category, activeCategory, children }: {
  label: string; tag?: string; category: Category; activeCategory: Category; children: React.ReactNode;
}) {
  if (activeCategory !== 'all' && activeCategory !== category) return null;
  return (
    <div className={s.masonryItem}>
      <div className={s.sectionCard}>
        <div className={s.sectionHeader}>
          <span className={s.sectionLabel}>{label}</span>
          {tag && <span className={s.sectionTag}>{tag}</span>}
        </div>
        <div className={s.sectionBody}>{children}</div>
      </div>
    </div>
  );
}

/**
 * Standalone showcase grid of all design system components.
 * Used in both the Component Preview app and Storybook Introduction page.
 */
export function ShowcaseGrid() {
  const [category, setCategory] = useState<Category>('all');
  const [progress] = useState(42);
  const [sliderVal, setSliderVal] = useState([33]);
  const [switchOn, setSwitchOn] = useState(true);
  const [quantity, setQuantity] = useState(2);
  const [typingKey, setTypingKey] = useState(0);

  return (
    <ThemeProvider defaultTheme="dark">
    <TooltipProvider>
      <div className={s.page}>
        {/* ─── Hero ─── */}
        <div className={s.hero}>
          <h1 className={s.heroTitle}>
            Hydrotik <span className={s.heroAccent}>Design System</span>
          </h1>
          <p className={s.heroSub}>
            63 components built with vanilla-extract tokens and Radix primitives.
            Dark-first. Type-safe. High-density.
          </p>
          <div className={s.statsRow}>
            <div className={s.stat}><span className={s.statNumber}>63</span><span className={s.statLabel}>Components</span></div>
            <div className={s.stat}><span className={s.statNumber}>56</span><span className={s.statLabel}>Stories</span></div>
            <div className={s.stat}><span className={s.statNumber}>245</span><span className={s.statLabel}>Tests</span></div>
          </div>
        </div>

        {/* ─── Filters ─── */}
        <div className={s.filterRow}>
          {CATEGORIES.map((c) => (
            <Button
              key={c.id}
              size="sm"
              variant={category === c.id ? 'default' : 'ghost'}
              onClick={() => setCategory(c.id)}
              style={{ fontSize: 12, padding: '4px 10px', height: 28, gap: 4 }}
            >
              {c.icon} {c.label}
            </Button>
          ))}
        </div>

        {/* ─── Masonry ─── */}
        <div className={s.masonry}>

          {/* ── PRIMITIVES ── */}

          <Section label="Button" category="primitives" activeCategory={category}>
            <div className={s.demoRow}>
              <Button size="sm">Default</Button>
              <Button size="sm" variant="secondary">Secondary</Button>
              <Button size="sm" variant="destructive">Destructive</Button>
              <Button size="sm" variant="outline">Outline</Button>
              <Button size="sm" variant="ghost">Ghost</Button>
              <Button size="sm" variant="link">Link</Button>
            </div>
            <div className={s.demoRow}>
              <Button size="sm" disabled>Disabled</Button>
              <Button size="lg">Large</Button>
            </div>
          </Section>

          <Section label="Badge" category="primitives" activeCategory={category}>
            <div className={s.demoRow}>
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
            </div>
          </Section>

          <Section label="Avatar" category="primitives" activeCategory={category}>
            <div className={s.demoRow}>
              <Avatar><AvatarFallback>CN</AvatarFallback></Avatar>
              <Avatar><AvatarFallback>AB</AvatarFallback></Avatar>
              <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
            </div>
          </Section>

          <Section label="Card" category="primitives" activeCategory={category}>
            <Card>
              <CardHeader>
                <CardTitle style={{ fontSize: 14 }}>Card Title</CardTitle>
                <CardDescription>Description text.</CardDescription>
              </CardHeader>
              <CardContent><p style={{ fontSize: 13, margin: 0 }}>Content area.</p></CardContent>
              <CardFooter><Button size="sm">Save</Button></CardFooter>
            </Card>
          </Section>

          <Section label="Separator" category="primitives" activeCategory={category}>
            <div style={{ fontSize: 13 }}>
              <div style={{ fontWeight: 600 }}>Radix Primitives</div>
              <div style={{ color: vars.color.textMuted, fontSize: 12 }}>Open-source UI library.</div>
            </div>
            <Separator />
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', height: 16, fontSize: 13 }}>
              <span>Docs</span>
              <Separator orientation="vertical" />
              <span>API</span>
              <Separator orientation="vertical" />
              <span>Source</span>
            </div>
          </Section>

          <Section label="Kbd" category="primitives" activeCategory={category}>
            <div className={s.demoRow}>
              <Kbd>⌘</Kbd><Kbd>K</Kbd>
              <span style={{ fontSize: 12, color: vars.color.textMuted }}>Command palette</span>
            </div>
          </Section>

          <Section label="Skeleton" category="primitives" activeCategory={category}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Skeleton style={{ width: 32, height: 32, borderRadius: '50%' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Skeleton style={{ width: 140, height: 10 }} />
                <Skeleton style={{ width: 100, height: 10 }} />
              </div>
            </div>
          </Section>

          <Section label="Typography" category="primitives" activeCategory={category}>
            <TypographyH3>Heading</TypographyH3>
            <TypographyLead>Lead paragraph text.</TypographyLead>
            <TypographyMuted>Muted helper text.</TypographyMuted>
          </Section>

          <Section label="Heading" category="primitives" activeCategory={category}>
            <Heading title="Page Title" description="Section description." size="md" as="h3" />
          </Section>

          {/* ── FORMS ── */}

          <Section label="Input" category="forms" activeCategory={category}>
            <div className={s.demoCol}>
              <Input placeholder="Email address" type="email" size="sm" />
              <Input placeholder="Disabled" disabled size="sm" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Label htmlFor="sc-n" style={{ fontSize: 12 }}>Name</Label>
                <Input id="sc-n" placeholder="Enter name..." size="sm" />
              </div>
            </div>
          </Section>

          <Section label="Textarea" category="forms" activeCategory={category}>
            <Textarea placeholder="Type your message..." rows={2} style={{ fontSize: 13 }} />
          </Section>

          <Section label="Checkbox" category="forms" activeCategory={category}>
            <div className={s.demoCol} style={{ gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Checkbox id="sc-t" defaultChecked /><Label htmlFor="sc-t" style={{ fontSize: 12 }}>Accept terms</Label>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Checkbox id="sc-n2" /><Label htmlFor="sc-n2" style={{ fontSize: 12 }}>Newsletter</Label>
              </div>
            </div>
          </Section>

          <Section label="Radio Group" category="forms" activeCategory={category}>
            <RadioGroup defaultValue="comfortable">
              {['Default', 'Comfortable', 'Compact'].map((v) => (
                <div key={v} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <RadioGroupItem value={v.toLowerCase()} id={`sc-r-${v}`} />
                  <Label htmlFor={`sc-r-${v}`} style={{ fontSize: 12 }}>{v}</Label>
                </div>
              ))}
            </RadioGroup>
          </Section>

          <Section label="Switch" category="forms" activeCategory={category}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Switch id="sc-sw" checked={switchOn} onCheckedChange={setSwitchOn} />
              <Label htmlFor="sc-sw" style={{ fontSize: 12 }}>Airplane Mode</Label>
            </div>
          </Section>

          <Section label="Select" category="forms" activeCategory={category}>
            <Select>
              <SelectTrigger style={{ height: 28, fontSize: 12 }}><SelectValue placeholder="Select a fruit" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
              </SelectContent>
            </Select>
          </Section>

          <Section label="Slider" category="forms" activeCategory={category}>
            <Slider value={sliderVal} onValueChange={setSliderVal} max={100} step={1} />
            <span style={{ fontSize: 11, color: vars.color.textMuted, fontFamily: vars.font.family.mono }}>{sliderVal[0]}</span>
          </Section>

          <Section label="Toggle" category="forms" activeCategory={category}>
            <div className={s.demoRow}>
              <Toggle aria-label="Bold"><IconBold size={13} /></Toggle>
              <Toggle aria-label="Italic"><IconItalic size={13} /></Toggle>
              <Toggle aria-label="Underline"><IconUnderline size={13} /></Toggle>
            </div>
            <ToggleGroup type="single" defaultValue="center">
              <ToggleGroupItem value="left" aria-label="Left"><IconAlignLeft size={13} /></ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Center"><IconAlignCenter size={13} /></ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Right"><IconAlignRight size={13} /></ToggleGroupItem>
            </ToggleGroup>
          </Section>

          {/* ── DATA ── */}

          <Section label="DataGrid" category="data" activeCategory={category}>
            <DataGrid
              data={[
                { invoice: 'INV001', status: 'Paid', method: 'Credit Card', amount: 250 },
                { invoice: 'INV002', status: 'Pending', method: 'PayPal', amount: 150 },
                { invoice: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: 350 },
              ]}
              columns={[
                { id: 'invoice', header: 'Invoice', accessorKey: 'invoice' } as ColumnDef,
                { id: 'status', header: 'Status', accessorKey: 'status' } as ColumnDef,
                { id: 'amount', header: 'Amount', accessorKey: 'amount', align: 'right', cell: ({ value }) => `$${Number(value).toFixed(2)}` } as ColumnDef,
              ]}
              enableSorting
              enablePagination={false}
              showToolbar={false}
              density="editorial"
              borderless
            />
          </Section>

          <Section label="Tabs" category="data" activeCategory={category}>
            <Tabs defaultValue="account">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <div className={s.demoCol} style={{ paddingTop: 6 }}>
                  <Label style={{ fontSize: 12 }}>Name</Label>
                  <Input defaultValue="Pedro Duarte" size="sm" />
                  <Button size="sm">Save</Button>
                </div>
              </TabsContent>
              <TabsContent value="password">
                <div className={s.demoCol} style={{ paddingTop: 6 }}>
                  <Label style={{ fontSize: 12 }}>Current</Label>
                  <Input type="password" size="sm" />
                </div>
              </TabsContent>
            </Tabs>
          </Section>

          <Section label="Accordion" category="data" activeCategory={category}>
            <Accordion type="single" collapsible>
              <AccordionItem value="1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>Yes — WAI-ARIA compliant.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>Vanilla-extract tokens.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </Section>

          {/* ── NAVIGATION ── */}

          <Section label="Breadcrumb" category="navigation" activeCategory={category}>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink href="#">Components</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </Section>

          <Section label="Pagination" category="navigation" activeCategory={category}>
            <Pagination>
              <PaginationContent>
                <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
                <PaginationItem><PaginationEllipsis /></PaginationItem>
                <PaginationItem><PaginationNext href="#" /></PaginationItem>
              </PaginationContent>
            </Pagination>
          </Section>

          {/* ── OVERLAYS ── */}

          <Section label="Dialog" category="overlay" activeCategory={category}>
            <Dialog>
              <DialogTrigger asChild><Button size="sm" variant="outline">Edit Profile</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>Make changes here.</DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </Section>

          <Section label="Dropdown Menu" category="overlay" activeCategory={category}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button size="sm" variant="outline">Open Menu</Button></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem><IconUser size={13} /> Profile</DropdownMenuItem>
                <DropdownMenuItem><IconCreditCard size={13} /> Billing</DropdownMenuItem>
                <DropdownMenuItem><IconSettings size={13} /> Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem><IconLogout size={13} /> Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Section>

          <Section label="Popover" category="overlay" activeCategory={category}>
            <Popover>
              <PopoverTrigger asChild><Button size="sm" variant="outline">Open</Button></PopoverTrigger>
              <PopoverContent>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
                  <div style={{ fontWeight: 600 }}>Dimensions</div>
                  <Label style={{ fontSize: 12 }}>Width</Label>
                  <Input defaultValue="100%" size="sm" />
                </div>
              </PopoverContent>
            </Popover>
          </Section>

          <Section label="Tooltip" category="overlay" activeCategory={category}>
            <Tooltip>
              <TooltipTrigger asChild><Button size="sm" variant="outline">Hover me</Button></TooltipTrigger>
              <TooltipContent><p>Add to library</p></TooltipContent>
            </Tooltip>
          </Section>

          {/* ── FEEDBACK ── */}

          <Section label="Alert" category="feedback" activeCategory={category}>
            <Alert>
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>Components via CLI.</AlertDescription>
            </Alert>
            <Alert variant="destructive" icon={<IconAlertCircle size={14} />}>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Session expired.</AlertDescription>
            </Alert>
          </Section>

          <Section label="Progress" category="feedback" activeCategory={category}>
            <Progress value={progress} />
            <span style={{ fontSize: 11, color: vars.color.textMuted, fontFamily: vars.font.family.mono }}>{progress}%</span>
          </Section>

          <Section label="Spinner" category="feedback" activeCategory={category}>
            <div className={s.demoRow}>
              <Spinner size="sm" /><Spinner size="md" /><Spinner size="lg" />
            </div>
          </Section>

          {/* ── E-COMMERCE ── */}

          <Section label="Price" tag="commerce" category="ecommerce" activeCategory={category}>
            <div className={s.demoCol}>
              <Price amount={129.99} size="sm" />
              <Price amount={99.99} originalAmount={149.99} size="sm" />
            </div>
          </Section>

          <Section label="ColorSwatch" tag="commerce" category="ecommerce" activeCategory={category}>
            <div className={s.demoRow}>
              <ColorSwatch hex="#1a2744" name="Navy" size="sm" isSelected onClick={() => {}} />
              <ColorSwatch hex="#d4c5a9" name="Cream" size="sm" onClick={() => {}} />
              <ColorSwatch hex="#000000" name="Black" size="sm" onClick={() => {}} />
              <ColorSwatch hex="#8b2252" name="Berry" size="sm" onClick={() => {}} />
              <ColorSwatch hex="#4a6741" name="Forest" size="sm" disabled />
            </div>
          </Section>

          <Section label="QuantityPicker" tag="commerce" category="ecommerce" activeCategory={category}>
            <QuantityPicker
              quantity={quantity}
              onIncrease={() => setQuantity((q) => Math.min(10, q + 1))}
              onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
              min={1} max={10} size="sm"
            />
          </Section>

          <Section label="AddToCartButton" tag="commerce" category="ecommerce" activeCategory={category}>
            <div className={s.demoCol}>
              <AddToCartButton onAddToCart={() => {}} />
              <AddToCartButton onAddToCart={() => {}} variant="primary" />
              <AddToCartButton onAddToCart={() => {}} quantity={2} />
            </div>
          </Section>

          {/* ── EDITORIAL ── */}

          <Section label="SegmentedRatingBar" tag="editorial" category="editorial" activeCategory={category}>
            <div className={s.demoCol} style={{ gap: 4 }}>
              <div className={s.demoRow}><SegmentedRatingBar value={7} total={10} color="primary" size="sm" /><span style={{ fontSize: 11, color: vars.color.textMuted }}>7/10</span></div>
              <div className={s.demoRow}><SegmentedRatingBar value={4} total={10} color="chart1" size="sm" /><span style={{ fontSize: 11, color: vars.color.textMuted }}>4/10</span></div>
              <div className={s.demoRow}><SegmentedRatingBar value={9} total={10} color="success" size="sm" /><span style={{ fontSize: 11, color: vars.color.textMuted }}>9/10</span></div>
              <div className={s.demoRow}><SegmentedRatingBar value={2} total={10} color="destructive" size="sm" /><span style={{ fontSize: 11, color: vars.color.textMuted }}>2/10</span></div>
            </div>
          </Section>

          <Section label="FlagTag" tag="editorial" category="editorial" activeCategory={category}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div><FlagTag icon={<IconAlertTriangle size={14} />} marginLeft="0" size="sm" /></div>
              <div><FlagTag label="FLAGGED" variant="destructive" icon={<IconAlertTriangle size={14} />} marginLeft="0" size="sm" /></div>
              <div><FlagTag label="REVIEW" variant="warning" icon={<IconSearch size={14} />} marginLeft="0" size="sm" /></div>
              <div><FlagTag label="VERIFIED" variant="success" icon={<IconCircleCheck size={14} />} marginLeft="0" size="sm" /></div>
            </div>
          </Section>

          {/* ── AI ── */}

          <Section label="CodeBlock" tag="ai" category="ai" activeCategory={category}>
            <CodeBlock language="typescript">{`import { useChat } from 'ai/react';
import { ChatContainer } from '@hydrotik/design-system';

const { messages } = useChat({ maxSteps: 4 });`}</CodeBlock>
          </Section>

          <Section label="InlineCode" tag="ai" category="ai" activeCategory={category}>
            <p style={{ fontSize: 12, lineHeight: 1.7, margin: 0, color: vars.color.textMuted }}>
              Use <InlineCode>useChat</InlineCode> with <InlineCode>maxSteps: 4</InlineCode> for
              multi-step tool calling.
            </p>
          </Section>

          <Section label="ChatMessage" tag="ai" category="ai" activeCategory={category}>
            <ChatMessage role="user" avatar="DA" label="User">
              How do I add a component?
            </ChatMessage>
            <ChatMessage role="assistant" avatar="AI" label="Assistant">
              Create a folder under <InlineCode>src/components/</InlineCode>.
            </ChatMessage>
          </Section>

          <Section label="ToolCallIndicator" tag="ai" category="ai" activeCategory={category}>
            <div className={s.demoCol} style={{ gap: 2 }}>
              <ToolCallIndicator />
              <ToolCallIndicator toolName="getInformation" />
              <ToolCallIndicator toolName="rag_search" />
            </div>
          </Section>

          <Section label="TypingAnimation" tag="ai" category="ai" activeCategory={category}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: -4 }}>
              <Button variant="ghost" size="sm" onClick={() => setTypingKey((k) => k + 1)} style={{ fontSize: 11, height: 22, padding: '0 6px' }}>Replay</Button>
            </div>
            <TypingAnimation
              key={typingKey}
              text="Components for AI interfaces with streaming, tool calling, and real-time updates."
              speed={50}
            />
          </Section>

        </div>
      </div>
    </TooltipProvider>
    </ThemeProvider>
  );
}
