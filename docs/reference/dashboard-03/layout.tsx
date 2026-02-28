// SOURCE: https://github.com/shadcn-ui/ui/blob/main/apps/v4/app/(examples)/dashboard-03/layout.tsx
// This is a Next.js layout — adapt to React Router or flat SPA for our implementation

import { cookies } from "next/headers"

import {
  SidebarInset,
  SidebarProvider,
} from "@/registry/new-york-v4/ui/sidebar"
import { AppSidebar } from "@/app/(examples)/dashboard-03/components/app-sidebar"
import { SiteHeader } from "@/app/(examples)/dashboard-03/components/site-header"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
