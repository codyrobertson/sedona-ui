"use client"

import { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"
import { brandNavigation } from "@/lib/brand/navigation"
import { BrandSearch } from "./BrandSearch"

const iconMap: Record<string, string> = {
  home: "house",
  diamond: "gem",
  palette: "palette",
  type: "font",
  "message-circle": "comment",
  layers: "layer-group",
  download: "download",
  "share-2": "share-nodes",
}

interface BrandMobileNavProps {
  open: boolean
  onClose: () => void
}

export function BrandMobileNav({ open, onClose }: BrandMobileNavProps) {
  const pathname = usePathname()

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, onClose])

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 lg:hidden transition-opacity duration-200",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Navigation Panel */}
      <nav
        className={cn(
          "fixed left-0 top-0 bottom-0 w-72 overflow-hidden bg-zeus-surface-default border-r border-zeus-border-default shadow-2xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zeus-border-default p-4">
            <Link href="/brand" className="flex items-center gap-3" onClick={onClose}>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sedona-500">
                <Icon icon="gem" className="h-4 w-4 text-white" />
              </div>
              <div>
                <h2 className="font-monument text-body-m font-semibold text-zeus-text-primary">
                  Brand Guide
                </h2>
              </div>
            </Link>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-zeus-text-secondary transition-colors hover:bg-zeus-surface-elevated hover:text-zeus-text-primary"
              aria-label="Close menu"
            >
              <Icon icon="xmark" className="h-5 w-5" />
            </button>
          </div>

          {/* Search */}
          <div className="border-b border-zeus-border-default p-4">
            <BrandSearch />
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {brandNavigation.map((item) => {
                const iconName = iconMap[item.icon] || "circle"
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/brand" && pathname.startsWith(item.href))

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-3 text-body-s transition-colors",
                        isActive
                          ? "bg-sedona-500/10 text-sedona-500"
                          : "text-zeus-text-secondary hover:bg-zeus-surface-elevated hover:text-zeus-text-primary"
                      )}
                    >
                      <Icon icon={iconName} className="h-5 w-5 flex-shrink-0" fixedWidth />
                      <span>{item.label}</span>
                      {isActive && (
                        <Icon icon="chevron-right" className="ml-auto h-4 w-4 text-sedona-500/60" />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Footer */}
          <div className="border-t border-zeus-border-default p-4">
            <Link
              href="/styleguide"
              onClick={onClose}
              className="flex items-center gap-2 text-caption-m text-zeus-text-tertiary transition-colors hover:text-zeus-text-primary"
            >
              <Icon icon="arrow-left" className="h-4 w-4" />
              Back to Styleguide
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}
