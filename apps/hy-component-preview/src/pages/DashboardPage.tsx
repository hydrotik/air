import React from 'react';
import {
  Bar, BarChart, CartesianGrid, XAxis, YAxis,
  Pie, PieChart, Sector, Label as RechartsLabel,
  ResponsiveContainer, Tooltip as RechartsTooltip, Cell,
} from 'recharts';
import type { PieSectorDataItem } from 'recharts/types/polar/Pie';
import {
  Badge, Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Checkbox,
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
  Pagination, PaginationContent, PaginationItem, PaginationLink,
  PaginationPrevious, PaginationNext, PaginationEllipsis,
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
  Tabs, TabsList, TabsTrigger, TabsContent,
  TooltipProvider,
} from '@hydrotik/design-system';
import {
  TrendingUp, TrendingDown, Download, Filter, Plus, MoreVertical,
} from 'lucide-react';
import { vars } from '@hydrotik/tokens';
import * as s from './DashboardPage.css';

/* ── Data ── */
const products = [
  { id: '1', name: 'BJÖRKSNÄS Dining Table', price: 599.99, stock: 12, dateAdded: '2023-06-15', status: 'In Stock' },
  { id: '2', name: 'POÄNG Armchair', price: 249.99, stock: 28, dateAdded: '2023-07-22', status: 'In Stock' },
  { id: '3', name: 'MALM Bed Frame', price: 399.99, stock: 15, dateAdded: '2023-08-05', status: 'In Stock' },
  { id: '4', name: 'KALLAX Shelf Unit', price: 179.99, stock: 32, dateAdded: '2023-09-12', status: 'In Stock' },
  { id: '5', name: 'STOCKHOLM Rug', price: 299.99, stock: 8, dateAdded: '2023-10-18', status: 'Low Stock' },
  { id: '6', name: 'KIVIK Sofa', price: 899.99, stock: 6, dateAdded: '2023-11-02', status: 'Low Stock' },
  { id: '7', name: 'LISABO Coffee Table', price: 149.99, stock: 22, dateAdded: '2023-11-29', status: 'In Stock' },
  { id: '8', name: 'HEMNES Bookcase', price: 249.99, stock: 17, dateAdded: '2023-12-10', status: 'In Stock' },
];

const kpis = [
  { label: 'Total Revenue', value: '$1,250.00', trend: '+12.5%', up: true, desc: '$1,250.00 in the last 30 days' },
  { label: 'New Customers', value: '1,234', trend: '-20%', up: false, desc: '-12 customers from last month' },
  { label: 'Active Accounts', value: '45,678', trend: '+12.5%', up: true, desc: '+2,345 users from last month' },
  { label: 'Growth Rate', value: '4.5%', trend: '+4.5%', up: true, desc: '+12.5% increase per month' },
];

const revenueData = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'Jun', desktop: 346, mobile: 140 },
  { month: 'Jul', desktop: 321, mobile: 275 },
  { month: 'Aug', desktop: 132, mobile: 95 },
  { month: 'Sep', desktop: 189, mobile: 225 },
  { month: 'Oct', desktop: 302, mobile: 248 },
  { month: 'Nov', desktop: 342, mobile: 285 },
  { month: 'Dec', desktop: 328, mobile: 290 },
];

const CHART_COLORS = [
  vars.color.chart1,
  vars.color.chart2,
  vars.color.chart3,
  vars.color.chart4,
  vars.color.chart5,
];

const visitorData = [
  { month: 'January', visitors: 186 },
  { month: 'February', visitors: 305 },
  { month: 'March', visitors: 237 },
  { month: 'April', visitors: 173 },
  { month: 'May', visitors: 209 },
];

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
          <span style={{ fontWeight: 600, marginLeft: 'auto' }}>{entry.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Pie sector shape (v3 API) ── */
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

/* ── Revenue Bar Chart ── */
function ChartRevenue() {
  return (
    <Card>
      <CardHeader>
        <CardDescription>January – December 2024</CardDescription>
        <CardTitle style={{ fontSize: '24px', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
          $45,231.89
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
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
              tickFormatter={(v) => v.toLocaleString()}
            />
            <RechartsTooltip
              cursor={{ fill: vars.color.ghostHover }}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="desktop" name="Desktop" fill={vars.color.chart1} radius={[4, 4, 0, 0]} />
            <Bar dataKey="mobile" name="Mobile" fill={vars.color.chart2} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
        <span className={`${s.kpiTrend} ${s.trendUp}`}>
          Trending up by 5.2% this month <TrendingUp size={14} />
        </span>
        <span className={s.kpiDesc}>Showing total visitors for the last 12 months</span>
      </CardFooter>
    </Card>
  );
}

/* ── Visitors Pie Chart ── */
function ChartVisitors() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <Card style={{ display: 'flex', flexDirection: 'column' }}>
      <CardHeader>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <CardDescription>January – June 2024</CardDescription>
            <CardTitle style={{ fontSize: '24px', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
              {visitorData[activeIndex].visitors.toLocaleString()} visitors
            </CardTitle>
          </div>
          <Select
            value={visitorData[activeIndex].month.toLowerCase()}
            onValueChange={(v) => {
              const idx = visitorData.findIndex((d) => d.month.toLowerCase() === v);
              if (idx >= 0) setActiveIndex(idx);
            }}
          >
            <SelectTrigger style={{ width: '130px', height: '28px' }}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {visitorData.map((d, i) => (
                <SelectItem key={d.month} value={d.month.toLowerCase()}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                    <span style={{
                      width: '12px', height: '12px', borderRadius: '3px',
                      backgroundColor: CHART_COLORS[i],
                      flexShrink: 0,
                    }} />
                    {d.month}
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
              data={visitorData.map((d, i) => ({ ...d, isActive: i === activeIndex }))}
              dataKey="visitors"
              nameKey="month"
              innerRadius={60}
              strokeWidth={5}
              stroke={vars.color.surface}
              shape={PieSectorShape as any}
              onMouseEnter={(_: any, index: number) => setActiveIndex(index)}
            >
              {visitorData.map((_, i) => (
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
                          {visitorData[activeIndex].visitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          style={{ fontSize: '12px', fill: vars.color.textMuted }}
                        >
                          Visitors
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

/* ── Main Dashboard Page ── */
export function DashboardPage() {
  return (
    <TooltipProvider>
      <div className={s.dashboardContainer}>
        <Tabs defaultValue="overview">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics" disabled>Analytics</TabsTrigger>
              <TabsTrigger value="reports" disabled>Reports</TabsTrigger>
            </TabsList>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Button variant="outline" size="sm">
                <Download size={14} /> Export
              </Button>
              <Button variant="outline" size="sm">
                <Filter size={14} /> Filter
              </Button>
            </div>
          </div>

          <TabsContent value="overview" style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '16px' }}>
            {/* KPI Cards */}
            <div className={s.kpiGrid}>
              {kpis.map((kpi) => (
                <Card key={kpi.label}>
                  <CardHeader>
                    <CardDescription>{kpi.label}</CardDescription>
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
              <ChartRevenue />
              <ChartVisitors />
            </div>

            {/* Products Table */}
            <Card>
              <CardHeader>
                <div className={s.tableHeader}>
                  <Tabs defaultValue="all">
                    <TabsList>
                      <TabsTrigger value="all">All Products</TabsTrigger>
                      <TabsTrigger value="in-stock">In Stock</TabsTrigger>
                      <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
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
                        <SelectItem value="decor">Decor</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger style={{ width: 'auto' }}>
                        <span style={{ color: vars.color.textMuted }}>Status:&nbsp;</span>
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in-stock">In Stock</SelectItem>
                        <SelectItem value="low-stock">Low Stock</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <Plus size={14} /> Add Product
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead style={{ width: '32px' }}><Checkbox /></TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date Added</TableHead>
                      <TableHead style={{ width: '32px' }} />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell><Checkbox /></TableCell>
                        <TableCell style={{ fontWeight: 500 }}>{p.name}</TableCell>
                        <TableCell>${p.price.toFixed(2)}</TableCell>
                        <TableCell>{p.stock}</TableCell>
                        <TableCell>
                          <Badge variant={p.status === 'In Stock' ? 'default' : 'secondary'}>
                            {p.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(p.dateAdded).toLocaleDateString('en-US', {
                            month: 'long', day: 'numeric', year: 'numeric',
                          })}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon-sm">
                                <MoreVertical size={14} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className={s.tableFooter}>
                <span className={s.kpiDesc}>Showing 1–8 of 100 products</span>
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
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  );
}
