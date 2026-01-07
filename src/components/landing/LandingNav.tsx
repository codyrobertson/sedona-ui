"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { SedonaLogo } from "@/components/sedona/sedona-logo"
import { Button } from "@/components/ui/button"

export interface LandingNavProps {
  onLaunchAgent?: () => void
  className?: string
}

export function LandingNav({ onLaunchAgent, className }: LandingNavProps) {
  const [isSticky, setIsSticky] = React.useState(false)
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    // Trigger entrance animation
    setIsVisible(true)
  }, [])

  React.useEffect(() => {
    const handleScroll = () => {
      // Get the features section position (first section after hero)
      const featuresSection = document.getElementById("features")
      if (featuresSection) {
        const rect = featuresSection.getBoundingClientRect()
        // Trigger sticky when features section reaches top
        setIsSticky(rect.top <= 60)
      } else {
        // Fallback: trigger after scrolling 500px
        setIsSticky(window.scrollY > 500)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Check initial position
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      className={cn(
        "flex items-center justify-between px-6 py-4 z-50",
        isSticky
          ? "fixed top-0 left-0 right-0 bg-zeus-surface-default/95 backdrop-blur-md border-b border-zeus-border-alpha shadow-lg"
          : "absolute top-0 left-0 right-0",
        className
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : -20
      }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
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
      <Button variant="light" size="sm" onClick={onLaunchAgent} className="!text-black">
        Launch Agent
      </Button>
    </motion.nav>
  )
}
