"use client"

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

export function BrandSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-zeus-border-default bg-zeus-surface-default">
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="border-b border-zeus-border-default p-6">
          <Link href="/brand" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sedona-500">
              <Icon icon="gem" className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-monument text-lg font-semibold text-zeus-text-primary">
                Brand Guide
              </h1>
              <p className="text-caption-s text-zeus-text-tertiary">Sedona Design System</p>
            </div>
          </Link>
        </div>

        {/* Search */}
        <div className="p-4">
          <BrandSearch />
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
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
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-body-s transition-colors",
                      isActive
                        ? "bg-sedona-500/10 text-sedona-500"
                        : "text-zeus-text-secondary hover:bg-zeus-surface-elevated hover:text-zeus-text-primary"
                    )}
                  >
                    <Icon icon={iconName} className="h-5 w-5 flex-shrink-0" fixedWidth />
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-zeus-border-default p-4">
          <Link
            href="/styleguide"
            className="flex items-center gap-2 text-caption-m text-zeus-text-tertiary transition-colors hover:text-zeus-text-primary"
          >
            <Icon icon="arrow-left" className="h-4 w-4" />
            Back to Styleguide
          </Link>
        </div>
      </div>
    </aside>
  )
}
