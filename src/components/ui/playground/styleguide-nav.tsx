"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { SedonaLogo } from "@/components/sedona/sedona-logo"
import { ThemeToggle } from "@/components/sedona/theme-toggle"

// Category definitions
export const categories = [
  {
    id: "foundation",
    label: "Foundation",
    sections: [
      { id: "design-foundation", label: "Typography" },
      { id: "color-system", label: "Colors" },
      { id: "spacing-tokens", label: "Spacing & Layout" },
    ],
  },
  {
    id: "components",
    label: "Components",
    sections: [
      { id: "logo-system", label: "Logo" },
      { id: "navigation", label: "Navigation" },
      { id: "buttons", label: "Buttons" },
      { id: "badges", label: "Badges" },
      { id: "inputs", label: "Inputs" },
      { id: "cards", label: "Cards" },
      { id: "tables", label: "Tables" },
      { id: "data-tables", label: "Data Tables" },
      { id: "counter", label: "Counter" },
      { id: "marquee", label: "Marquee" },
      { id: "outline-cards", label: "Outline Cards" },
    ],
  },
  {
    id: "patterns",
    label: "Patterns",
    sections: [
      { id: "chat", label: "Chat System" },
      { id: "shadcn-components", label: "Shadcn/UI" },
      { id: "theme-system", label: "Theme System" },
    ],
  },
  {
    id: "guidelines",
    label: "Guidelines",
    sections: [
      { id: "usage-guidelines", label: "Usage Guidelines" },
    ],
  },
] as const

export type CategoryId = (typeof categories)[number]["id"]

interface StyleguideNavProps {
  activeCategory: CategoryId
  activeSection: string
  onCategoryChange: (category: CategoryId) => void
  onSectionClick: (sectionId: string) => void
}

export function StyleguideNav({
  activeCategory,
  activeSection,
  onCategoryChange,
  onSectionClick,
}: StyleguideNavProps) {
  const currentCategory = categories.find((c) => c.id === activeCategory)

  return (
    <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b shadow-sm">
      {/* Header Bar with Logo */}
      <div className="border-b bg-gradient-to-r from-background to-muted/30">
        <div className="flex items-center justify-between h-14 px-6">
          <div className="flex items-center gap-3">
            <SedonaLogo size="md" variant="logomark" />
            <div className="h-5 w-px bg-border" />
            <span className="text-caption-l font-semibold tracking-tight">Design System</span>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-6">
        <nav className="flex gap-1 -mb-px" aria-label="Category tabs">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                "px-4 py-3 text-caption-l font-medium transition-all relative",
                "hover:text-foreground border-b-2",
                activeCategory === category.id
                  ? "text-foreground border-sedona-500"
                  : "text-muted-foreground border-transparent hover:border-muted-foreground/30"
              )}
            >
              {category.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Section Pills */}
      {currentCategory && (
        <div className="px-6 py-3 bg-muted/30 border-t">
          <div className="flex gap-2 flex-wrap">
            {currentCategory.sections.map((section) => (
              <button
                key={section.id}
                onClick={() => onSectionClick(section.id)}
                className={cn(
                  "px-3.5 py-1.5 text-caption-l font-medium rounded-full transition-all",
                  activeSection === section.id
                    ? "bg-sedona-500 text-white shadow-sm"
                    : "bg-background hover:bg-background/80 text-muted-foreground hover:text-foreground border border-border/50"
                )}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Sidebar variant for larger screens
export function StyleguideSidebar({
  activeSection,
  onSectionClick,
  className,
}: {
  activeSection: string
  onSectionClick: (sectionId: string) => void
  className?: string
}) {
  return (
    <nav className={cn("space-y-8", className)}>
      {categories.map((category) => (
        <div key={category.id}>
          <h3 className="text-[11px] font-bold text-muted-foreground/70 uppercase tracking-widest mb-3 px-3">
            {category.label}
          </h3>
          <ul className="space-y-0.5">
            {category.sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => onSectionClick(section.id)}
                  className={cn(
                    "w-full text-left px-3 py-2 text-caption-l rounded-lg transition-all",
                    activeSection === section.id
                      ? "bg-sedona-500/10 text-sedona-600 dark:text-sedona-400 font-medium border-l-2 border-sedona-500 rounded-l-none"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}
