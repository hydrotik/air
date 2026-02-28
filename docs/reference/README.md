# shadcn/ui v4 Reference Source

These files are **reference copies** from the [shadcn-ui/ui](https://github.com/shadcn-ui/ui) repository.
They are Next.js / Tailwind source — **not runnable** in our monorepo. They exist purely as
a source-of-truth for translating layouts, patterns, and component demos into our
vanilla-extract + Radix implementation.

## Directory Structure

### `sink/`
Source: `apps/v4/app/(internal)/sink/`

The **kitchen sink** page — renders every single component with a labeled wrapper.
Used as reference for our `hy-component-preview` app.

Key file:
- `component-wrapper.tsx` — The wrapper that renders each component with a name label,
  error boundary, and scroll anchor (`id={name}`)

Layout: Vertical list, `flex flex-col gap-16 p-4`, each component gets a
`ComponentWrapper` with `h2` label in `text-sm font-medium text-muted-foreground`.

### `dashboard-03/`
Source: `apps/v4/app/(examples)/dashboard-03/`

A **full dashboard example** with sidebar, header, KPI cards, charts, and data table.
To be implemented as a separate app (`apps/hy-dashboard`).

Structure:
- `layout.tsx` — SidebarProvider + AppSidebar + SidebarInset + SiteHeader
- `page.tsx` — Overview tab with 4 KPI cards, 2 charts, products table
- `settings/page.tsx` — Tabbed settings (Account, Security, Notifications, Privacy)
- `customers/page.tsx` — Placeholder
- `components/` — All dashboard-specific components:
  - `app-sidebar.tsx` — Icon-based nav (Dashboard, Analytics, Orders, Products, etc.)
  - `site-header.tsx` — Breadcrumbs + mode toggle + user dropdown
  - `nav-main.tsx` — Collapsible sidebar nav with active state
  - `nav-secondary.tsx` — Bottom sidebar links (Support, Feedback)
  - `nav-user.tsx` — Avatar dropdown (Account, Billing, Notifications, Log out)
  - `products-table.tsx` — Table with filters, pagination, action dropdowns
  - `chart-revenue.tsx` — Bar chart (recharts)
  - `chart-visitors.tsx` — Interactive pie chart with month selector
  - `analytics-date-picker.tsx` — Date range picker (react-day-picker)
  - `mode-toggle.tsx` — Dark/light toggle
  - `search-form.tsx` — Sidebar search input

### Dependencies we'd need to add for dashboard:
- `recharts` — For chart components
- `react-day-picker` + `date-fns` — For calendar/date picker
- Sidebar component — shadcn has a complex Sidebar primitive we don't have yet

### Components used in dashboard-03:
Badge, Button, Card (with CardAction), Checkbox, DropdownMenu, Input, Label,
Pagination, Popover, Select, Separator, Switch, Table, Tabs, Avatar, Breadcrumb,
Collapsible, Sidebar (custom)
