"use client"

import * as React from "react"
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome"
import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core"
import { cn } from "@/lib/utils"

export interface IconProps extends Omit<FontAwesomeIconProps, "icon"> {
  /** The icon to display (e.g., "shopping-cart", ["fas", "shopping-cart"]) */
  icon: IconProp
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
 * Icon component wrapping Font Awesome
 *
 * @example
 * // Using string shorthand (defaults to solid)
 * <Icon icon="shopping-cart" />
 *
 * @example
 * // Using prefix for different styles
 * <Icon icon={["far", "heart"]} />  // Regular
 * <Icon icon={["fab", "github"]} /> // Brands
 * <Icon icon={["faes", "shield"]} /> // Kit: Etch Solid
 *
 * @example
 * // With size and color
 * <Icon icon="check" size="lg" className="text-green-500" />
 */
const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ icon, size, className, spin, pulse, fixedWidth, ...props }, ref) => {
    return (
      <FontAwesomeIcon
        ref={ref}
        icon={icon}
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
