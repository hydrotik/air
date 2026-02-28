// SOURCE: https://github.com/shadcn-ui/ui/blob/main/apps/v4/app/(internal)/sink/components/component-wrapper.tsx
"use client"

import * as React from "react"
import { cn } from "@/registry/new-york-v4/lib/utils"

export function ComponentWrapper({
  className,
  name,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { name: string }) {
  return (
    <div
      id={name}
      className={cn("flex flex-col gap-4 scroll-mt-20", className)}
      {...props}
    >
      <ComponentErrorBoundary name={name}>
        <h2 className="text-sm font-medium text-muted-foreground">
          {getComponentName(name)}
        </h2>
        {children}
      </ComponentErrorBoundary>
    </div>
  )
}

class ComponentErrorBoundary extends React.Component<
  { children: React.ReactNode; name: string },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; name: string }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`Error in component ${this.props.name}:`, error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-sm text-destructive">
          Something went wrong in component: {this.props.name}
        </div>
      )
    }
    return this.props.children
  }
}

function getComponentName(name: string) {
  // convert kebab-case to title case
  return name.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
}
