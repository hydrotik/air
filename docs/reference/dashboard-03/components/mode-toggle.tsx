// SOURCE: https://github.com/shadcn-ui/ui/blob/main/apps/v4/app/(examples)/dashboard-03/components/mode-toggle.tsx
"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/registry/new-york-v4/ui/button"

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }, [resolvedTheme, setTheme])

  return (
    <Button variant="ghost" size="icon" className="group/toggle h-8 w-8 px-0" onClick={toggleTheme}>
      <SunIcon className="hidden [html.dark_&]:block" />
      <MoonIcon className="block [html.dark_&]:hidden" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
