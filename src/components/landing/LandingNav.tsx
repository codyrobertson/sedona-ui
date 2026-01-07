"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { SedonaLogo } from "@/components/sedona/sedona-logo"
import { Button } from "@/components/ui/button"

export interface LandingNavProps {
  onLaunchAgent?: () => void
  className?: string
}

export function LandingNav({ onLaunchAgent, className }: LandingNavProps) {
  return (
    <nav
      className={cn(
        "flex items-center justify-between px-6 py-4",
        className
      )}
    >
      {/* Logo */}
      <Link href="/landing" className="hover:opacity-80 transition-opacity">
        <SedonaLogo variant="logo" size="sm" className="text-white" />
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-8">
        <a
          href="#features"
          className="font-grotesk text-sm text-zeus-text-secondary hover:text-zeus-text-primary transition-colors"
        >
          Features
        </a>
        <a
          href="#how-it-works"
          className="font-grotesk text-sm text-zeus-text-secondary hover:text-zeus-text-primary transition-colors"
        >
          How It Works
        </a>
        <a
          href="/docs"
          className="font-grotesk text-sm text-zeus-text-secondary hover:text-zeus-text-primary transition-colors"
        >
          Docs
        </a>
        <a
          href="/blog"
          className="font-grotesk text-sm text-zeus-text-secondary hover:text-zeus-text-primary transition-colors"
        >
          Blog
        </a>
      </div>

      {/* CTA */}
      <Button variant="light" size="sm" onClick={onLaunchAgent}>
        Launch Agent
      </Button>
    </nav>
  )
}
