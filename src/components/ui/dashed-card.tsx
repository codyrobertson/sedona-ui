"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface DashedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of 4 icon components for corners [topLeft, topRight, bottomLeft, bottomRight] */
  cornerIcons?: [
    React.ComponentType<{ className?: string }>,
    React.ComponentType<{ className?: string }>,
    React.ComponentType<{ className?: string }>,
    React.ComponentType<{ className?: string }>
  ]
  /** Icon size class */
  iconSize?: string
  /** Icon color class */
  iconColor?: string
  /** Border color class */
  borderColor?: string
  /** Background class */
  background?: string
}

/**
 * Card with dashed border and optional corner icons
 * Used for decorative sections like FAQ
 *
 * @example
 * <DashedCard
 *   cornerIcons={[SquirrelIcon, ComputerIcon, CowboyIcon, CactusIcon]}
 * >
 *   {children}
 * </DashedCard>
 */
export function DashedCard({
  children,
  className,
  cornerIcons,
  iconSize = "w-5 h-5",
  iconColor = "text-zeus-text-tertiary",
  borderColor = "border-zeus-highlight-gold/30",
  background = "bg-zeus-surface-elevated/50 backdrop-blur-sm",
  ...props
}: DashedCardProps) {
  const [TopLeft, TopRight, BottomLeft, BottomRight] = cornerIcons || []

  return (
    <div
      className={cn(
        "relative border border-dashed rounded-xl",
        borderColor,
        background,
        className
      )}
      {...props}
    >
      {/* Corner Icons */}
      {TopLeft && (
        <div className="absolute top-4 left-4">
          <TopLeft className={cn(iconSize, iconColor)} />
        </div>
      )}
      {TopRight && (
        <div className="absolute top-4 right-4">
          <TopRight className={cn(iconSize, iconColor)} />
        </div>
      )}
      {BottomLeft && (
        <div className="absolute bottom-4 left-4">
          <BottomLeft className={cn(iconSize, iconColor)} />
        </div>
      )}
      {BottomRight && (
        <div className="absolute bottom-4 right-4">
          <BottomRight className={cn(iconSize, iconColor)} />
        </div>
      )}

      {children}
    </div>
  )
}
