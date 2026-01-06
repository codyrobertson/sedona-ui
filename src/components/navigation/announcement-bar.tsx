"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { X, ArrowRight, Sparkles, Megaphone, Flame, Gift } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import Link from "next/link"

const announcementVariants = cva(
  "relative flex items-center justify-center gap-2 px-4 py-2 text-caption-s font-medium transition-all",
  {
    variants: {
      variant: {
        default: "bg-zeus-surface-elevated text-zeus-text-primary",
        accent: "bg-sedona-500/10 text-sedona-500 border-b border-sedona-500/20",
        gradient: "bg-gradient-to-r from-sedona-600/20 via-sedona-500/10 to-sedona-600/20 text-sedona-400",
        success: "bg-zeus-status-success/10 text-zeus-status-success border-b border-zeus-status-success/20",
        warning: "bg-zeus-status-warning/10 text-zeus-status-warning border-b border-zeus-status-warning/20",
      },
    },
    defaultVariants: {
      variant: "accent",
    },
  }
)

const iconMap = {
  sparkles: Sparkles,
  megaphone: Megaphone,
  flame: Flame,
  gift: Gift,
} as const

export interface AnnouncementBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof announcementVariants> {
  /** Announcement message */
  message: string
  /** Optional link URL */
  href?: string
  /** Link text (defaults to "Learn more") */
  linkText?: string
  /** Icon to display */
  icon?: keyof typeof iconMap
  /** Whether the bar is dismissible */
  dismissible?: boolean
  /** Callback when dismissed */
  onDismiss?: () => void
  /** Whether the bar is dismissed */
  isDismissed?: boolean
  /** Whether to animate the icon */
  animateIcon?: boolean
}

const AnnouncementBar = React.forwardRef<HTMLDivElement, AnnouncementBarProps>(
  (
    {
      className,
      variant,
      message,
      href,
      linkText = "Learn more",
      icon = "sparkles",
      dismissible = true,
      onDismiss,
      isDismissed = false,
      animateIcon = true,
      ...props
    },
    ref
  ) => {
    const Icon = iconMap[icon]

    if (isDismissed) {
      return null
    }

    const content = (
      <>
        <Icon
          className={cn(
            "w-4 h-4 flex-shrink-0",
            animateIcon && "animate-pulse"
          )}
        />
        <span className="truncate">{message}</span>
        {href && (
          <span className="inline-flex items-center gap-1 flex-shrink-0 hover:underline">
            {linkText}
            <ArrowRight className="w-3 h-3" />
          </span>
        )}
      </>
    )

    return (
      <div
        ref={ref}
        className={cn(announcementVariants({ variant }), className)}
        role="banner"
        aria-label="Announcement"
        {...props}
      >
        {href ? (
          <Link
            href={href}
            className="flex items-center justify-center gap-2 hover:opacity-80 transition-opacity"
          >
            {content}
          </Link>
        ) : (
          <div className="flex items-center justify-center gap-2">
            {content}
          </div>
        )}

        {dismissible && (
          <button
            onClick={onDismiss}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/10 transition-colors"
            aria-label="Dismiss announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    )
  }
)

AnnouncementBar.displayName = "AnnouncementBar"

export { AnnouncementBar, announcementVariants }
