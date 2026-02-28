// SOURCE: https://github.com/shadcn-ui/ui/blob/main/apps/v4/app/(examples)/dashboard-03/components/chart-revenue.tsx
// NOTE: Uses recharts (Bar, BarChart, CartesianGrid, XAxis, YAxis)
// NOTE: Uses shadcn Chart component (ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig)
// We don't have recharts or Chart component yet — will need to add or mock

"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/registry/new-york-v4/ui/card"
import {
  ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from "@/registry/new-york-v4/ui/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 346, mobile: 140 },
  { month: "July", desktop: 321, mobile: 275 },
  { month: "August", desktop: 132, mobile: 95 },
  { month: "September", desktop: 189, mobile: 225 },
  { month: "October", desktop: 302, mobile: 248 },
  { month: "November", desktop: 342, mobile: 285 },
  { month: "December", desktop: 328, mobile: 290 },
]

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig

export function ChartRevenue() {
  return (
    <Card>
      <CardHeader>
        <CardDescription>January - June 2024</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums">$45,231.89</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8}
              tickFormatter={(value) => value.toLocaleString()} domain={[0, "dataMax"]} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
