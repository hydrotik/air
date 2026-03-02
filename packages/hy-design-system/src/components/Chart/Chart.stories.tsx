import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  CartesianGrid, XAxis, YAxis,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from './Chart';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../Card';

const meta = {
  title: 'Components/Chart',
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Sample Data ──────────────────────────────────────────────────────── */

const areaData = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'Jun', desktop: 214, mobile: 140 },
];

const barData = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 600 },
  { name: 'Thu', value: 800 },
  { name: 'Fri', value: 500 },
];

const pieData = [
  { name: 'Desktop', value: 65 },
  { name: 'Mobile', value: 25 },
  { name: 'Tablet', value: 10 },
];

const areaConfig: ChartConfig = {
  desktop: { label: 'Desktop', color: 'hsl(210, 80%, 55%)' },
  mobile: { label: 'Mobile', color: 'hsl(160, 60%, 45%)' },
};

const barConfig: ChartConfig = {
  value: { label: 'Revenue', color: 'hsl(210, 80%, 55%)' },
};

const pieConfig: ChartConfig = {
  desktop: { label: 'Desktop', color: 'hsl(210, 80%, 55%)' },
  mobile: { label: 'Mobile', color: 'hsl(160, 60%, 45%)' },
  tablet: { label: 'Tablet', color: 'hsl(30, 80%, 55%)' },
};

const PIE_COLORS = ['hsl(210, 80%, 55%)', 'hsl(160, 60%, 45%)', 'hsl(30, 80%, 55%)'];

/* ─── Stories ──────────────────────────────────────────────────────────── */

export const AreaChartStory: Story = {
  name: 'Area Chart',
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Visitors</CardTitle>
        <CardDescription>Desktop vs Mobile — last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={areaConfig} style={{ aspectRatio: '16/9', width: '100%' }}>
          <AreaChart data={areaData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Area dataKey="mobile" type="natural" fill="var(--color-mobile)" fillOpacity={0.4} stroke="var(--color-mobile)" stackId="a" />
            <Area dataKey="desktop" type="natural" fill="var(--color-desktop)" fillOpacity={0.4} stroke="var(--color-desktop)" stackId="a" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  ),
};

export const BarChartStory: Story = {
  name: 'Bar Chart',
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Revenue</CardTitle>
        <CardDescription>Daily revenue this week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={barConfig} style={{ aspectRatio: '16/9', width: '100%' }}>
          <BarChart data={barData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  ),
};

export const PieChartStory: Story = {
  name: 'Pie Chart',
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Traffic Sources</CardTitle>
        <CardDescription>By device type</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={pieConfig} style={{ aspectRatio: '1', maxWidth: '300px', margin: '0 auto' }}>
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80}>
              {pieData.map((_, i) => (
                <Cell key={i} fill={PIE_COLORS[i]} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  ),
};
