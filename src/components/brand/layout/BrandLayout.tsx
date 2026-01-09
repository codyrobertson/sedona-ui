"use client"

import { useState } from "react"
import { Icon } from "@/components/ui/icon"
import { Button } from "@/components/ui/button"
import { BrandSidebar } from "./BrandSidebar"
import { BrandMobileNav } from "./BrandMobileNav"
import { cn } from "@/lib/utils"

interface BrandLayoutProps {
  children: React.ReactNode
}

export function BrandLayout({ children }: BrandLayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="min-h-screen bg-zeus-bg-default">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <BrandSidebar />
      </div>

      {/* Mobile Header */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-zeus-border-default bg-zeus-surface-default lg:hidden">
        <div className="flex h-16 items-center justify-between px-4">
          <span className="font-monument text-lg font-semibold text-zeus-text-primary">
            Brand Guide
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
          >
            <Icon icon={mobileNavOpen ? "xmark" : "bars"} className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <BrandMobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      {/* Main Content */}
      <main
        className={cn(
          "min-h-screen pt-16 lg:ml-64 lg:pt-0",
          "transition-all duration-200"
        )}
      >
        <div className="mx-auto max-w-4xl px-6 py-12">{children}</div>
      </main>
    </div>
  )
}
