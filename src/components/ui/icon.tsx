"use client"

import * as React from "react"
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome"
import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core"
import { cn } from "@/lib/utils"
import { DEFAULT_ICON_PREFIX } from "@/lib/fontawesome"

export interface IconProps extends Omit<FontAwesomeIconProps, "icon"> {
  /** The icon to display (e.g., "shopping-cart", ["fass", "shopping-cart"]) */
  icon: IconProp | string
  /** Size of the icon */
  size?: SizeProp
  /** Additional class names */
  className?: string
  /** Apply spin animation */
  spin?: boolean
  /** Apply pulse animation */
  pulse?: boolean
  /** Fixed width (useful for alignment) */
  fixedWidth?: boolean
}

/**
 * Normalize icon prop to use DEFAULT_ICON_PREFIX when only icon name is provided
 */
function normalizeIcon(icon: IconProp | string): IconProp {
  // If it's a string, use the configured default prefix
  if (typeof icon === "string") {
    return [DEFAULT_ICON_PREFIX, icon] as IconProp
  }
  // Otherwise return as-is (already has prefix or is IconDefinition)
  return icon as IconProp
}

/**
 * Icon component wrapping Font Awesome
 *
 * @example
 * // Using string shorthand (defaults to faes - Etch Solid)
 * <Icon icon="shopping-cart" />
 *
 * @example
 * // Using prefix for different styles
 * <Icon icon={["far", "heart"]} />  // Regular
 * <Icon icon={["fab", "github"]} /> // Brands
 * <Icon icon={["fas", "check"]} />  // Free Solid
 *
 * @example
 * // With size and color
 * <Icon icon="check" size="lg" className="text-green-500" />
 */
const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ icon, size, className, spin, pulse, fixedWidth, ...props }, ref) => {
    const normalizedIcon = normalizeIcon(icon)

    return (
      <FontAwesomeIcon
        ref={ref}
        icon={normalizedIcon}
        size={size}
        spin={spin}
        pulse={pulse}
        fixedWidth={fixedWidth}
        className={cn(className)}
        {...props}
      />
    )
  }
)

Icon.displayName = "Icon"

export { Icon }
