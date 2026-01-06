"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const navLinkVariants = cva(
  "relative inline-flex items-center gap-1.5 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sedona-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zeus-surface-default",
  {
    variants: {
      variant: {
        default: [
          "text-zeus-text-secondary",
          "hover:text-zeus-text-primary",
          "data-[active=true]:text-sedona-500",
        ],
        underline: [
          "text-zeus-text-secondary",
          "hover:text-zeus-text-primary",
          "data-[active=true]:text-sedona-500",
          "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5",
          "after:bg-sedona-500 after:scale-x-0 after:transition-transform",
          "data-[active=true]:after:scale-x-100",
        ],
        pill: [
          "text-zeus-text-secondary px-3 py-1.5 rounded-full",
          "hover:text-zeus-text-primary hover:bg-zeus-surface-elevated",
          "data-[active=true]:text-sedona-500 data-[active=true]:bg-sedona-500/10",
        ],
        ghost: [
          "text-zeus-text-tertiary",
          "hover:text-zeus-text-secondary",
          "data-[active=true]:text-zeus-text-primary",
        ],
      },
      size: {
        sm: "text-caption-s",
        md: "text-caption-l",
        lg: "text-body-s",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface NavLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    VariantProps<typeof navLinkVariants> {
  /** Link destination */
  href: string
  /** Whether to match exact path or prefix */
  exact?: boolean
  /** Force active state (overrides automatic detection) */
  active?: boolean
  /** Whether link is disabled */
  disabled?: boolean
  /** Icon to display before text */
  icon?: React.ReactNode
  /** Icon to display after text */
  iconAfter?: React.ReactNode
  /** Whether this is an external link */
  external?: boolean
}

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  (
    {
      className,
      variant,
      size,
      href,
      exact = false,
      active: forcedActive,
      disabled = false,
      icon,
      iconAfter,
      external = false,
      children,
      ...props
    },
    ref
  ) => {
    const pathname = usePathname()

    // Determine if link is active
    const isActive = React.useMemo(() => {
      if (forcedActive !== undefined) return forcedActive
      if (exact) return pathname === href
      return pathname.startsWith(href) && (href !== "/" || pathname === "/")
    }, [pathname, href, exact, forcedActive])

    if (disabled) {
      return (
        <span
          className={cn(
            navLinkVariants({ variant, size }),
            "cursor-not-allowed opacity-50",
            className
          )}
          aria-disabled="true"
        >
          {icon}
          {children}
          {iconAfter}
        </span>
      )
    }

    const linkProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {}

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(navLinkVariants({ variant, size }), className)}
        data-active={isActive}
        aria-current={isActive ? "page" : undefined}
        {...linkProps}
        {...props}
      >
        {icon}
        {children}
        {iconAfter}
      </Link>
    )
  }
)

NavLink.displayName = "NavLink"

export { NavLink, navLinkVariants }
