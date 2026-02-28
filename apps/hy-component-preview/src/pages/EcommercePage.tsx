import React, { useState, useMemo } from 'react';
import type { ColumnDef } from '@hydrotik/design-system';
import {
  Bar, BarChart, CartesianGrid, XAxis, YAxis,
  Pie, PieChart, Sector, Label as RechartsLabel,
  ResponsiveContainer, Tooltip as RechartsTooltip, Cell,
  Line, LineChart, Area, AreaChart,
} from 'recharts';
import type { PieSectorDataItem } from 'recharts/types/polar/Pie';
import {
  Avatar, AvatarFallback,
  Badge, Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,

  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator,
  Input,

  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
  Separator,
  DataGrid,
  Tabs, TabsList, TabsTrigger, TabsContent,
  TooltipProvider,
} from '@hydrotik/design-system';
import {
  TrendingUp, TrendingDown, Download, Filter, Plus, MoreVertical,
  Home, ChartLine, ShoppingBag, ShoppingCart, FileText, Users, Settings,
  LifeBuoy, Send, Search, ChevronRight, Package, DollarSign, CreditCard,
  Activity, Eye, Archive, Trash2, Copy, PenLine,
} from 'lucide-react';
import { vars } from '@hydrotik/tokens';
import * as s from './EcommercePage.css';

/* ── Sidebar data ── */
const navMain = [
  { title: 'Dashboard', icon: Home, count: undefined, id: 'dashboard' },
  { title: 'Analytics', icon: ChartLine, count: undefined, id: 'analytics' },
  { title: 'Orders', icon: ShoppingBag, count: 24, id: 'orders' },
  { title: 'Products', icon: ShoppingCart, count: 156, id: 'products' },
  { title: 'Invoices', icon: FileText, count: 12, id: 'invoices' },
  { title: 'Customers', icon: Users, count: 573, id: 'customers' },
  { title: 'Settings', icon: Settings, count: undefined, id: 'settings' },
];

const navSecondary = [
  { title: 'Support', icon: LifeBuoy },
  { title: 'Feedback', icon: Send },
];

/* ── Product data ── */
const products = [
  { id: '1', name: 'BJÖRKSNÄS Dining Table', sku: 'DT-001', price: 599.99, stock: 12, dateAdded: '2023-06-15', status: 'In Stock', category: 'Furniture' },
  { id: '2', name: 'POÄNG Armchair', sku: 'AC-002', price: 249.99, stock: 28, dateAdded: '2023-07-22', status: 'In Stock', category: 'Furniture' },
  { id: '3', name: 'MALM Bed Frame', sku: 'BF-003', price: 399.99, stock: 15, dateAdded: '2023-08-05', status: 'In Stock', category: 'Furniture' },
  { id: '4', name: 'KALLAX Shelf Unit', sku: 'SU-004', price: 179.99, stock: 32, dateAdded: '2023-09-12', status: 'In Stock', category: 'Storage' },
  { id: '5', name: 'STOCKHOLM Rug', sku: 'RG-005', price: 299.99, stock: 8, dateAdded: '2023-10-18', status: 'Low Stock', category: 'Decor' },
  { id: '6', name: 'KIVIK Sofa', sku: 'SF-006', price: 899.99, stock: 6, dateAdded: '2023-11-02', status: 'Low Stock', category: 'Furniture' },
  { id: '7', name: 'LISABO Coffee Table', sku: 'CT-007', price: 149.99, stock: 22, dateAdded: '2023-11-29', status: 'In Stock', category: 'Furniture' },
  { id: '8', name: 'HEMNES Bookcase', sku: 'BC-008', price: 249.99, stock: 17, dateAdded: '2023-12-10', status: 'In Stock', category: 'Storage' },
  { id: '9', name: 'EKEDALEN Dining Chairs (Set of 2)', sku: 'DC-009', price: 199.99, stock: 14, dateAdded: '2024-01-05', status: 'In Stock', category: 'Furniture' },
  { id: '10', name: 'FRIHETEN Sleeper Sofa', sku: 'SS-010', price: 799.99, stock: 0, dateAdded: '2024-01-18', status: 'Out of Stock', category: 'Furniture' },
];

/* ── KPI data ── */
const kpis = [
  { label: 'Total Revenue', value: '$45,231.89', trend: '+20.1%', up: true, desc: '+$4,201 from last month', icon: DollarSign },
  { label: 'Orders', value: '2,350', trend: '+12.2%', up: true, desc: '+180 from last month', icon: ShoppingCart },
  { label: 'Products Sold', value: '12,234', trend: '+8.1%', up: true, desc: '+942 from last month', icon: Package },
  { label: 'Active Customers', value: '573', trend: '-2.5%', up: false, desc: '-14 from last month', icon: Users },
];

/* ── Chart data ── */
const revenueData = [
  { month: 'Jan', revenue: 4500, orders: 186 },
  { month: 'Feb', revenue: 7800, orders: 305 },
  { month: 'Mar', revenue: 5600, orders: 237 },
  { month: 'Apr', revenue: 3200, orders: 73 },
  { month: 'May', revenue: 6100, orders: 209 },
  { month: 'Jun', revenue: 8400, orders: 346 },
  { month: 'Jul', revenue: 7900, orders: 321 },
  { month: 'Aug', revenue: 4200, orders: 132 },
  { month: 'Sep', revenue: 5500, orders: 189 },
  { month: 'Oct', revenue: 7200, orders: 302 },
  { month: 'Nov', revenue: 8100, orders: 342 },
  { month: 'Dec', revenue: 8900, orders: 328 },
];

const CHART_COLORS = [
  vars.color.chart1,
  vars.color.chart2,
  vars.color.chart3,
  vars.color.chart4,
  vars.color.chart5,
];

const categoryData = [
  { name: 'Furniture', value: 8420 },
  { name: 'Storage', value: 2340 },
  { name: 'Decor', value: 1820 },
  { name: 'Lighting', value: 940 },
  { name: 'Textiles', value: 720 },
];

/* ── Recent orders ── */
const recentOrders = [
  { id: 'ORD-7291', customer: 'Olivia Martin', email: 'olivia@example.com', amount: 1499.00, status: 'Delivered', initials: 'OM' },
  { id: 'ORD-7290', customer: 'Jackson Lee', email: 'jackson@example.com', amount: 249.99, status: 'Processing', initials: 'JL' },
  { id: 'ORD-7289', customer: 'Isabella Nguyen', email: 'isabella@example.com', amount: 899.99, status: 'Shipped', initials: 'IN' },
  { id: 'ORD-7288', customer: 'William Kim', email: 'william@example.com', amount: 599.99, status: 'Processing', initials: 'WK' },
  { id: 'ORD-7287', customer: 'Sofia Davis', email: 'sofia@example.com', amount: 179.99, status: 'Delivered', initials: 'SD' },
];

const orderStatusColor: Record<string, string> = {
  'Delivered': '#22c55e',
  'Shipped': vars.color.chart2,
  'Processing': vars.color.chart4,
  'Cancelled': vars.color.destructive,
};

/* ── Custom Tooltip ── */
function ChartTooltipContent({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className={s.tooltip}>
      <div className={s.tooltipLabel}>{label}</div>
      {payload.map((entry: any, i: number) => (
        <div key={i} className={s.tooltipRow}>
          <span className={s.tooltipDot} style={{ backgroundColor: entry.color }} />
          <span>{entry.name}</span>
          <span style={{ fontWeight: 600, marginLeft: 'auto' }}>
            {typeof entry.value === 'number' && entry.name === 'Revenue'
              ? `$${entry.value.toLocaleString()}`
              : entry.value.toLocaleString()
            }
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Pie sector shape (recharts v3 API) ── */
function PieSectorShape(props: PieSectorDataItem & { isActive: boolean }) {
  const { isActive, outerRadius = 0, ...rest } = props;
  if (isActive) {
    return (
      <g>
        <Sector {...rest} outerRadius={outerRadius + 8} />
        <Sector {...rest} outerRadius={outerRadius + 20} innerRadius={outerRadius + 10} />
      </g>
    );
  }
  return <Sector {...rest} outerRadius={outerRadius} />;
}

/* ── Revenue Chart ── */
function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Revenue over time</CardDescription>
        <CardTitle style={{ fontSize: '24px', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
          $45,231.89
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={vars.color.chart1} stopOpacity={0.3} />
                <stop offset="95%" stopColor={vars.color.chart1} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={vars.color.border} strokeOpacity={0.5} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: vars.color.textMuted }}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: vars.color.textMuted }}
              tickMargin={8}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <RechartsTooltip
              cursor={{ stroke: vars.color.border }}
              content={<ChartTooltipContent />}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke={vars.color.chart1}
              strokeWidth={2}
              fill="url(#revGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
        <span className={`${s.kpiTrend} ${s.trendUp}`}>
          Trending up by 5.2% this month <TrendingUp size={14} />
        </span>
        <span className={s.kpiDesc}>Jan – Dec 2024</span>
      </CardFooter>
    </Card>
  );
}

/* ── Category Pie Chart ── */
function CategoryChart() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = useMemo(() => categoryData.reduce((sum, d) => sum + d.value, 0), []);

  return (
    <Card style={{ display: 'flex', flexDirection: 'column' }}>
      <CardHeader>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <CardDescription>Sales by Category</CardDescription>
            <CardTitle style={{ fontSize: '24px', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
              {categoryData[activeIndex].value.toLocaleString()} sold
            </CardTitle>
          </div>
          <Select
            value={categoryData[activeIndex].name.toLowerCase()}
            onValueChange={(v) => {
              const idx = categoryData.findIndex((d) => d.name.toLowerCase() === v);
              if (idx >= 0) setActiveIndex(idx);
            }}
          >
            <SelectTrigger style={{ width: '130px', height: '28px' }}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categoryData.map((d, i) => (
                <SelectItem key={d.name} value={d.name.toLowerCase()}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                    <span style={{
                      width: '12px', height: '12px', borderRadius: '3px',
                      backgroundColor: CHART_COLORS[i],
                      flexShrink: 0,
                    }} />
                    {d.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent style={{ flex: 1, display: 'flex', justifyContent: 'center', paddingBottom: 0 }}>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <RechartsTooltip content={<ChartTooltipContent />} />
            <Pie
              data={categoryData.map((d, i) => ({ ...d, isActive: i === activeIndex }))}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
              stroke={vars.color.surface}
              shape={PieSectorShape as any}
              onMouseEnter={(_: any, index: number) => setActiveIndex(index)}
            >
              {categoryData.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i]} />
              ))}
              <RechartsLabel
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          style={{ fontSize: '28px', fontWeight: 700, fill: vars.color.text }}
                        >
                          {categoryData[activeIndex].value.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          style={{ fontSize: '12px', fill: vars.color.textMuted }}
                        >
                          {categoryData[activeIndex].name}
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

/* ── Recent Orders List ── */
function RecentOrdersList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Latest 5 orders across all channels</CardDescription>
      </CardHeader>
      <CardContent>
        {recentOrders.map((order) => (
          <div key={order.id} className={s.activityItem}>
            <div className={s.activityAvatar}>{order.initials}</div>
            <div className={s.activityText}>
              <div className={s.activityName}>{order.customer}</div>
              <div className={s.activityMeta}>{order.id} · {order.email}</div>
            </div>
            <Badge
              variant="outline"
              style={{ gap: '4px', display: 'inline-flex', alignItems: 'center' }}
            >
              <span
                className={s.statusDot}
                style={{ backgroundColor: orderStatusColor[order.status] || vars.color.textMuted }}
              />
              {order.status}
            </Badge>
            <span className={s.activityAmount}>+${order.amount.toFixed(2)}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

/* ── Products Table ── */
function ProductsTable() {
  return (
    <Card>
      <CardHeader>
        <div className={s.tableHeader}>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Products</TabsTrigger>
              <TabsTrigger value="in-stock">In Stock</TabsTrigger>
              <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
              <TabsTrigger value="out-of-stock">Out of Stock</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className={s.tableFilters}>
            <Select defaultValue="all">
              <SelectTrigger style={{ width: 'auto' }}>
                <span style={{ color: vars.color.textMuted }}>Category:&nbsp;</span>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="storage">Storage</SelectItem>
                <SelectItem value="decor">Decor</SelectItem>
                <SelectItem value="lighting">Lighting</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger style={{ width: 'auto' }}>
                <span style={{ color: vars.color.textMuted }}>Price:&nbsp;</span>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-200">$0 – $200</SelectItem>
                <SelectItem value="200-500">$200 – $500</SelectItem>
                <SelectItem value="500+">$500+</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Plus size={14} /> Add Product
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent style={{ padding: 0 }}>
        <DataGrid
          data={products}
          columns={[
            { id: 'name', header: 'Product', accessorKey: 'name', size: 220, cell: ({ value }) => <span style={{ fontWeight: 500 }}>{value}</span> } as ColumnDef,
            { id: 'sku', header: 'SKU', accessorKey: 'sku', size: 90, cell: ({ value }) => <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '12px', color: vars.color.textMuted }}>{value}</span> } as ColumnDef,
            { id: 'price', header: 'Price', accessorKey: 'price', align: 'right', size: 100, cell: ({ value }) => `$${Number(value).toFixed(2)}` } as ColumnDef,
            { id: 'stock', header: 'Stock', accessorKey: 'stock', align: 'right', size: 80 } as ColumnDef,
            { id: 'status', header: 'Status', accessorKey: 'status', size: 120, cell: ({ value }) => <Badge variant={value === 'In Stock' ? 'default' : value === 'Low Stock' ? 'secondary' : 'destructive'}>{value}</Badge> } as ColumnDef,
            { id: 'category', header: 'Category', accessorKey: 'category', size: 110 } as ColumnDef,
            { id: 'dateAdded', header: 'Date Added', accessorKey: 'dateAdded', size: 140, cell: ({ value }) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) } as ColumnDef,
            { id: 'actions', header: '', size: 48, enableSorting: false, enableFiltering: false, cell: ({ row }) => (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon-sm"><MoreVertical size={14} /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem><Eye size={14} /> View</DropdownMenuItem>
                  <DropdownMenuItem><PenLine size={14} /> Edit</DropdownMenuItem>
                  <DropdownMenuItem><Copy size={14} /> Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><Archive size={14} /> Archive</DropdownMenuItem>
                  <DropdownMenuItem style={{ color: vars.color.destructive }}>
                    <Trash2 size={14} /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )} as ColumnDef,
          ]}
          enableSorting
          enableRowSelection
          enablePagination
          showToolbar={false}
          showFooter
          getRowId={(row) => row.id}
          initialState={{ pagination: { pageIndex: 0, pageSize: 10 } }}
          style={{ border: 'none', borderRadius: 0 }}
        />
      </CardContent>
    </Card>
  );
}

/* ─── Main E-commerce Page ─── */
export function EcommercePage() {
  const [activeNav, setActiveNav] = useState('dashboard');

  return (
    <TooltipProvider>
      <div className={s.layout}>
        {/* ── Sidebar ── */}
        <aside className={s.sidebar}>
          <div className={s.sidebarGroup}>
            <div className={s.sidebarGroupLabel}>Store</div>
            {navMain.map((item) => (
              <button
                key={item.id}
                className={`${s.sidebarItem} ${activeNav === item.id ? s.sidebarItemActive : ''}`}
                onClick={() => setActiveNav(item.id)}
              >
                <item.icon size={16} />
                {item.title}
                {item.count != null && (
                  <span className={s.sidebarItemCount}>{item.count}</span>
                )}
              </button>
            ))}
          </div>

          <div style={{ flex: 1 }} />

          <div className={s.sidebarGroup}>
            {navSecondary.map((item) => (
              <button key={item.title} className={s.sidebarItem}>
                <item.icon size={16} />
                {item.title}
              </button>
            ))}
          </div>
        </aside>

        {/* ── Main ── */}
        <div className={s.main}>
          {/* Header / Breadcrumb */}
          <div className={s.header}>
            <div className={s.breadcrumbs}>
              <span>Store</span>
              <ChevronRight size={12} className={s.breadcrumbSep} />
              <span className={s.breadcrumbCurrent}>
                {navMain.find((n) => n.id === activeNav)?.title || 'Dashboard'}
              </span>
            </div>
            <div className={s.headerActions}>
              <div className={s.searchWrapper}>
                <Search size={14} className={s.searchIcon} />
                <Input
                  placeholder="Search products..."
                  style={{ paddingLeft: '32px' }}
                />
              </div>
              <Button variant="outline" size="sm">
                <Download size={14} /> Export
              </Button>
              <Button variant="outline" size="sm">
                <Filter size={14} /> Filter
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className={s.content}>
            {/* KPI Cards */}
            <div className={s.kpiGrid}>
              {kpis.map((kpi) => (
                <Card key={kpi.label}>
                  <CardHeader>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <CardDescription>{kpi.label}</CardDescription>
                      <kpi.icon size={16} style={{ color: vars.color.textMuted }} />
                    </div>
                    <CardTitle className={s.kpiValue}>{kpi.value}</CardTitle>
                  </CardHeader>
                  <CardFooter style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                    <span className={`${s.kpiTrend} ${kpi.up ? s.trendUp : s.trendDown}`}>
                      {kpi.trend}
                      {kpi.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    </span>
                    <span className={s.kpiDesc}>{kpi.desc}</span>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Charts */}
            <div className={s.chartsGrid}>
              <RevenueChart />
              <CategoryChart />
            </div>

            {/* Recent Orders */}
            <RecentOrdersList />

            {/* Products Table */}
            <ProductsTable />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
