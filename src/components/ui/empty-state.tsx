"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"

export interface EmptyStateAction {
  label: string
  onClick?: () => void
  href?: string
  variant?: ButtonProps["variant"]
  size?: ButtonProps["size"]
}

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Icon to display - can be a ReactNode (component) or emoji string */
  icon?: React.ReactNode | string
  /** Main title text */
  title: string
  /** Description text below the title */
  description?: string
  /** Optional action button configuration */
  action?: EmptyStateAction
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, action, ...props }, ref) => {
    const renderIcon = () => {
      if (!icon) return null

      // If icon is a string, treat it as an emoji
      if (typeof icon === "string") {
        return <div className="text-4xl mb-3">{icon}</div>
      }

      // Otherwise render as ReactNode
      return <div className="mb-3 text-zeus-text-tertiary">{icon}</div>
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center py-12",
          className
        )}
        {...props}
      >
        {renderIcon()}
        <h3 className="text-zeus-text-primary text-body-m font-semibold mb-1">
          {title}
        </h3>
        {description && (
          <p className="text-zeus-text-tertiary text-caption-l text-center max-w-sm">
            {description}
          </p>
        )}
        {action && (
          <div className="mt-4">
            {action.href ? (
              <Button
                asChild
                variant={action.variant || "default"}
                size={action.size || "sm"}
              >
                <a href={action.href}>{action.label}</a>
              </Button>
            ) : (
              <Button
                variant={action.variant || "default"}
                size={action.size || "sm"}
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            )}
          </div>
        )}
      </div>
    )
  }
)

EmptyState.displayName = "EmptyState"

export { EmptyState }
