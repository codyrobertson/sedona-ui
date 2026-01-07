"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SectionHeaderProps {
  /** Icon component to display above the title */
  icon?: React.ComponentType<{ className?: string }>
  /** Section title text */
  title: string
  /** Title color - defaults to white */
  titleColor?: "white" | "gold"
  /** Show decorative lines on either side of title */
  showLines?: boolean
  /** Line width class */
  lineWidth?: string
  /** Additional className for the container */
  className?: string
  /** Size variant */
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: {
    icon: "w-6 h-6",
    title: "text-base md:text-lg",
    gap: "gap-3",
    lineWidth: "w-8",
  },
  md: {
    icon: "w-8 h-8",
    title: "text-lg md:text-xl",
    gap: "gap-4",
    lineWidth: "w-12",
  },
  lg: {
    icon: "w-10 h-10",
    title: "text-2xl md:text-3xl",
    gap: "gap-4",
    lineWidth: "w-16",
  },
}

/**
 * Section header with optional icon and decorative lines
 * Used across landing page sections for consistent styling
 *
 * @example
 * <SectionHeader
 *   icon={CactusIcon}
 *   title="In a Nutshell"
 *   size="lg"
 * />
 */
export function SectionHeader({
  icon: Icon,
  title,
  titleColor = "white",
  showLines = true,
  lineWidth,
  className,
  size = "md",
}: SectionHeaderProps) {
  const sizes = sizeClasses[size]
  const finalLineWidth = lineWidth || sizes.lineWidth

  return (
    <div className={cn("text-center", className)}>
      {Icon && (
        <div className="flex justify-center mb-3">
          <Icon className={cn(sizes.icon, "text-zeus-highlight-gold")} />
        </div>
      )}
      <div className={cn("flex items-center justify-center", sizes.gap)}>
        {showLines && (
          <div className={cn("h-px bg-zeus-highlight-gold/30", finalLineWidth)} />
        )}
        <h2
          className={cn(
            "font-souvenir font-bold uppercase tracking-wide",
            sizes.title,
            titleColor === "white" ? "text-white" : "text-zeus-highlight-gold"
          )}
        >
          {title}
        </h2>
        {showLines && (
          <div className={cn("h-px bg-zeus-highlight-gold/30", finalLineWidth)} />
        )}
      </div>
    </div>
  )
}
