// SOURCE: https://github.com/shadcn-ui/ui/blob/main/apps/v4/app/(examples)/dashboard-03/page.tsx
// Main dashboard page — 4 KPI cards at top, charts below, products table

import { type Metadata } from "next"
import {
  DownloadIcon,
  FilterIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react"

import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york-v4/ui/tabs"
import { AnalyticsDatePicker } from "@/app/(examples)/dashboard-03/components/analytics-date-picker"
import { ChartRevenue } from "@/app/(examples)/dashboard-03/components/chart-revenue"
import { ChartVisitors } from "@/app/(examples)/dashboard-03/components/chart-visitors"
import { ProductsTable } from "@/app/(examples)/dashboard-03/components/products-table"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "An example dashboard to test the new components.",
}

// Load from database.
const products = [
  { id: "1", name: "BJÖRKSNÄS Dining Table", price: 599.99, stock: 12, dateAdded: "2023-06-15", status: "In Stock" },
  { id: "2", name: "POÄNG Armchair", price: 249.99, stock: 28, dateAdded: "2023-07-22", status: "In Stock" },
  { id: "3", name: "MALM Bed Frame", price: 399.99, stock: 15, dateAdded: "2023-08-05", status: "In Stock" },
  { id: "4", name: "KALLAX Shelf Unit", price: 179.99, stock: 32, dateAdded: "2023-09-12", status: "In Stock" },
  { id: "5", name: "STOCKHOLM Rug", price: 299.99, stock: 8, dateAdded: "2023-10-18", status: "Low Stock" },
  { id: "6", name: "KIVIK Sofa", price: 899.99, stock: 6, dateAdded: "2023-11-02", status: "Low Stock" },
  { id: "7", name: "LISABO Coffee Table", price: 149.99, stock: 22, dateAdded: "2023-11-29", status: "In Stock" },
  { id: "8", name: "HEMNES Bookcase", price: 249.99, stock: 17, dateAdded: "2023-12-10", status: "In Stock" },
  { id: "9", name: "EKEDALEN Dining Chairs (Set of 2)", price: 199.99, stock: 14, dateAdded: "2024-01-05", status: "In Stock" },
  { id: "10", name: "FRIHETEN Sleeper Sofa", price: 799.99, stock: 9, dateAdded: "2024-01-18", status: "Low Stock" },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {/* Tabs: Overview | Analytics | Reports */}
          <Tabs defaultValue="overview" className="px-4 lg:px-6">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics" disabled>Analytics</TabsTrigger>
                <TabsTrigger value="reports" disabled>Reports</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <AnalyticsDatePicker />
                <Button variant="outline" size="sm">
                  <DownloadIcon />Exports
                </Button>
                <Button variant="outline" size="sm">
                  <FilterIcon />Filter
                </Button>
                <Button size="sm">Export</Button>
              </div>
            </div>
            <TabsContent value="overview" className="flex flex-col gap-4 pt-2 md:gap-6 md:pt-4">
              {/* 4 KPI Cards in a grid */}
              <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                <Card>
                  <CardHeader>
                    <CardDescription>Total Revenue</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums">$1,250.00</CardTitle>
                  </CardHeader>
                  <CardFooter className="flex-col items-start gap-1 text-sm">
                    <div className="flex gap-2 font-medium">
                      +12.5% <TrendingUpIcon className="size-4" />
                    </div>
                    <div className="text-muted-foreground">$1,250.00 in the last 30 days</div>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardDescription>New Customers</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums">1,234</CardTitle>
                  </CardHeader>
                  <CardFooter className="flex-col items-start gap-1 text-sm">
                    <div className="flex gap-2 font-medium">
                      -20% <TrendingDownIcon className="size-4" />
                    </div>
                    <div className="text-muted-foreground">-12 customers from last month</div>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardDescription>Active Accounts</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums">45,678</CardTitle>
                  </CardHeader>
                  <CardFooter className="flex-col items-start gap-1 text-sm">
                    <div className="flex gap-2 font-medium">
                      +12.5% <TrendingUpIcon className="size-4" />
                    </div>
                    <div className="text-muted-foreground">+2,345 users from last month</div>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardDescription>Growth Rate</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums">4.5%</CardTitle>
                  </CardHeader>
                  <CardFooter className="flex-col items-start gap-1 text-sm">
                    <div className="flex gap-2 font-medium">
                      +4.5% <TrendingUpIcon className="size-4" />
                    </div>
                    <div className="text-muted-foreground">+12.5% increase per month</div>
                  </CardFooter>
                </Card>
              </div>
              {/* Charts row */}
              <div className="grid grid-cols-1 gap-4 @3xl/main:grid-cols-2">
                <ChartRevenue />
                <ChartVisitors />
              </div>
              {/* Products table */}
              <ProductsTable products={products} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
