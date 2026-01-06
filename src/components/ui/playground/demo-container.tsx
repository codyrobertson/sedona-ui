"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface DemoContainerProps {
  children: React.ReactNode
  className?: string
  /** Adds a subtle grid pattern background */
  pattern?: boolean
  /** Dark mode preview container */
  dark?: boolean
  /** Label for the demo */
  label?: string
}

export function DemoContainer({
  children,
  className,
  pattern = false,
  dark = false,
  label,
}: DemoContainerProps) {
  return (
    <div className={cn("relative", className)}>
      {label && (
        <div className="absolute -top-2.5 left-3 px-2 bg-zeus-surface-default text-caption-s font-medium text-zeus-text-tertiary uppercase tracking-wider">
          {label}
        </div>
      )}
      <div
        className={cn(
          "rounded-lg border p-6",
          pattern && "bg-[radial-gradient(circle_at_1px_1px,_rgb(0_0_0_/_0.05)_1px,_transparent_0)] bg-[size:16px_16px]",
          dark && "bg-zeus-surface-default border-zeus-border-alpha"
        )}
      >
        {children}
      </div>
    </div>
  )
}

interface DemoGridProps {
  children: React.ReactNode
  className?: string
  cols?: 1 | 2 | 3 | 4
}

export function DemoGrid({ children, className, cols = 2 }: DemoGridProps) {
  const colsClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <div className={cn("grid gap-6", colsClass[cols], className)}>
      {children}
    </div>
  )
}

interface DemoRowProps {
  children: React.ReactNode
  className?: string
  label?: string
}

export function DemoRow({ children, className, label }: DemoRowProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {label && (
        <h4 className="text-caption-l font-medium text-zeus-text-tertiary">{label}</h4>
      )}
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

interface SpecimenCardProps {
  children: React.ReactNode
  label?: string
  description?: string
  className?: string
}

export function SpecimenCard({
  children,
  label,
  description,
  className,
}: SpecimenCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-zeus-border-alpha bg-zeus-surface-neutral p-4 space-y-3",
        className
      )}
    >
      <div className="flex items-center justify-between">
        {children}
      </div>
      {(label || description) && (
        <div className="pt-2 border-t border-zeus-border-alpha/50">
          {label && (
            <span className="text-caption-s font-medium text-zeus-text-primary">{label}</span>
          )}
          {description && (
            <span className="text-caption-s text-zeus-text-tertiary ml-2">{description}</span>
          )}
        </div>
      )}
    </div>
  )
}
