"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  // Initialize theme on mount
  React.useEffect(() => {
    setMounted(true)
    
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark)
    setIsDark(shouldBeDark)
    
    // Apply theme immediately
    const root = window.document.documentElement
    if (shouldBeDark) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [])

  // Apply theme changes
  React.useEffect(() => {
    if (!mounted) return
    
    const root = window.document.documentElement
    if (isDark) {
      root.classList.add("dark")
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove("dark")
      localStorage.setItem('theme', 'light')
    }
  }, [isDark, mounted])

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <Button variant="outline" size="sm" disabled>
        🌙 Theme
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setIsDark(!isDark)}
      className="gap-2"
    >
      {isDark ? "🌞" : "🌙"} 
      <span className="hidden sm:inline">
        Switch to {isDark ? "Light" : "Dark"}
      </span>
      <span className="sm:hidden">
        {isDark ? "Light" : "Dark"}
      </span>
    </Button>
  )
}