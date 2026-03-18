"use client"

import * as React from "react"
import { trackEmptyStateAction, trackEmptyStateViewed } from "@/lib/analytics"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"

export interface EmptyStateAction {
  label: string
  onClick?: () => void
  href?: string
  variant?: ButtonProps["variant"]
  size?: ButtonProps["size"]
  analyticsAction?: string
}

export interface EmptyStateAnalytics {
  surface: string
  variant: string
}

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Icon to display - can be a ReactNode (component) or emoji string */
  icon?: React.ReactNode | string
  /** Small label above the title */
  eyebrow?: string
  /** Main title text */
  title: string
  /** Description text below the title */
  description?: string
  /** Optional action button configuration */
  action?: EmptyStateAction
  /** Optional multiple actions */
  actions?: EmptyStateAction[]
  /** Visual emphasis for empty and error states */
  tone?: "default" | "warning" | "error"
  /** Optional analytics metadata */
  analytics?: EmptyStateAnalytics
}

function toAnalyticsAction(label: string): string {
  return label.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "")
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      icon,
      eyebrow,
      title,
      description,
      action,
      actions,
      tone = "default",
      analytics,
      ...props
    },
    ref
  ) => {
    const resolvedActions = actions ?? (action ? [action] : [])
    const analyticsSurface = analytics?.surface
    const analyticsVariant = analytics?.variant

    React.useEffect(() => {
      if (!analyticsSurface || !analyticsVariant) return

      trackEmptyStateViewed(
        analyticsSurface,
        analyticsVariant,
        resolvedActions.length > 0
      )
    }, [analyticsSurface, analyticsVariant, resolvedActions.length])

    const toneClasses = {
      default: {
        container: "border-zeus-border-alpha bg-zeus-surface-elevated",
        icon: "text-zeus-text-tertiary",
        eyebrow: "text-zeus-text-tertiary",
      },
      warning: {
        container: "border-sedona-500/20 bg-sedona-500/10",
        icon: "text-sedona-400",
        eyebrow: "text-sedona-400",
      },
      error: {
        container: "border-zeus-status-error/25 bg-zeus-status-error/10",
        icon: "text-zeus-status-error",
        eyebrow: "text-zeus-status-error",
      },
    }[tone]

    const renderIcon = () => {
      if (!icon) return null

      // If icon is a string, treat it as an emoji
      if (typeof icon === "string") {
        return <div className="text-4xl mb-3">{icon}</div>
      }

      // Otherwise render as ReactNode
      return <div className={cn("mb-3", toneClasses.icon)}>{icon}</div>
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center rounded-2xl border px-6 py-12 text-center",
          toneClasses.container,
          className
        )}
        {...props}
      >
        {renderIcon()}
        {eyebrow && (
          <p className={cn("mb-2 text-caption-s font-medium uppercase tracking-[0.24em]", toneClasses.eyebrow)}>
            {eyebrow}
          </p>
        )}
        <h3 className="text-zeus-text-primary text-body-m font-semibold mb-1">
          {title}
        </h3>
        {description && (
          <p className="text-zeus-text-tertiary text-caption-l text-center max-w-sm">
            {description}
          </p>
        )}
        {resolvedActions.length > 0 && (
          <div className="mt-5 flex w-full max-w-md flex-col justify-center gap-2 sm:flex-row">
            {resolvedActions.map((item) => (
              item.href ? (
                <Button
                  key={item.label}
                  asChild
                  variant={item.variant || "default"}
                  size={item.size || "sm"}
                  className="w-full sm:w-auto"
                >
                  <a
                    href={item.href}
                    onClick={() => {
                      if (!analyticsSurface || !analyticsVariant) return

                      trackEmptyStateAction(
                        analyticsSurface,
                        analyticsVariant,
                        item.analyticsAction ?? toAnalyticsAction(item.label)
                      )
                    }}
                  >
                    {item.label}
                  </a>
                </Button>
              ) : (
                <Button
                  key={item.label}
                  variant={item.variant || "default"}
                  size={item.size || "sm"}
                  className="w-full sm:w-auto"
                  onClick={() => {
                    if (analyticsSurface && analyticsVariant) {
                      trackEmptyStateAction(
                        analyticsSurface,
                        analyticsVariant,
                        item.analyticsAction ?? toAnalyticsAction(item.label)
                      )
                    }

                    item.onClick?.()
                  }}
                >
                  {item.label}
                </Button>
              )
            ))}
          </div>
        )}
      </div>
    )
  }
)

EmptyState.displayName = "EmptyState"

export { EmptyState }
