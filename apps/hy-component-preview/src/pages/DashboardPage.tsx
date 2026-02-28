import React from 'react';
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
import * as s from './DashboardPage.css';

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

export function DashboardPage() {
  return (
    <TooltipProvider>
      <div className={s.dashboardContainer}>
        {/* ─── Tabs ──────────────────────────────── */}
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
            {/* ─── KPI Cards ──────────────────────── */}
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

            {/* ─── Charts (placeholders) ─────────── */}
            <div className={s.chartsGrid}>
              <Card>
                <CardHeader>
                  <CardDescription>January – December 2024</CardDescription>
                  <CardTitle className={s.kpiValue}>$45,231.89</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={s.chartPlaceholder}>
                    Bar Chart — requires recharts
                  </div>
                </CardContent>
                <CardFooter style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                  <span className={`${s.kpiTrend} ${s.trendUp}`}>
                    Trending up by 5.2% this month <TrendingUp size={14} />
                  </span>
                  <span className={s.kpiDesc}>Showing total visitors for the last 6 months</span>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardDescription>January – June 2024</CardDescription>
                  <CardTitle className={s.kpiValue}>1,234 visitors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={s.chartPlaceholder}>
                    Pie Chart — requires recharts
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ─── Products Table ─────────────────── */}
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
                        <span style={{ color: 'var(--color-textMuted)' }}>Category:&nbsp;</span>
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
                        <span style={{ color: 'var(--color-textMuted)' }}>Status:&nbsp;</span>
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
