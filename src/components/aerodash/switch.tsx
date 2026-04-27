"use client"

import * as React from "react"
import * as RadixSwitch from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

import { colors, radii } from "./tokens"
import "./switch.css"

/**
 * Switch — y2k toggle. Wraps Radix Switch.
 *
 *   <Switch checked={on} onCheckedChange={setOn} />
 *   <Switch defaultChecked size="lg" />
 *
 * Dimensions follow the invariant: travel = trackWidth - trackHeight, which
 * places the thumb perfectly flush in both states with a 1px gap inset.
 */

const SIZE_DIMS = {
  sm: { w: 30, h: 18, thumb: 12, gap: 1 },
  md: { w: 38, h: 22, thumb: 16, gap: 1 },
  lg: { w: 46, h: 26, thumb: 20, gap: 1 },
} as const
type SizeKey = keyof typeof SIZE_DIMS

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof RadixSwitch.Root> {
  size?: SizeKey
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { className, size = "md", style, ...props },
  ref,
) {
  const dim = SIZE_DIMS[size]
  const travel = dim.w - dim.h // distance the thumb translates when checked

  return (
    <RadixSwitch.Root
      ref={ref}
      data-ad-switch=""
      className={cn(
        "relative inline-flex shrink-0 cursor-pointer items-center border-0 p-0",
        "disabled:cursor-not-allowed disabled:opacity-45",
        className,
      )}
      style={{
        width: dim.w,
        height: dim.h,
        borderRadius: radii.pill,
        border: `1.5px solid ${colors.ink}`,
        padding: dim.gap,
        // Custom property consumed by switch.css for the thumb translation
        ["--ad-switch-travel" as string]: `${travel}px`,
        ...style,
      }}
      {...props}
    >
      <RadixSwitch.Thumb
        data-ad-switch-thumb=""
        className="block"
        style={{
          width: dim.thumb,
          height: dim.thumb,
          borderRadius: radii.pill,
        }}
      />
    </RadixSwitch.Root>
  )
})
