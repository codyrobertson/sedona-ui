"use client"

import * as React from "react"
import * as RadixCheckbox from "@radix-ui/react-checkbox"

import { cn } from "@/lib/utils"

import { colors, radii } from "./tokens"
import "./aerodash.css"
import "./checkbox.css"

/**
 * Checkbox — y2k square checkbox. Wraps Radix Checkbox.
 *
 *   <Checkbox checked={on} onCheckedChange={setOn} />
 *   <Checkbox checked="indeterminate" />
 *
 * Indicator uses Radix's mount/unmount lifecycle for clean enter/leave
 * animations. Tick + dash glyphs are independent SVG paths so they can be
 * cross-faded between checked / indeterminate states without DOM swap flicker.
 */

const SIZE_DIMS = {
  sm: { box: 16, glyph: 10, stroke: 2.6 },
  md: { box: 20, glyph: 13, stroke: 3 },
  lg: { box: 24, glyph: 16, stroke: 3.2 },
} as const
type SizeKey = keyof typeof SIZE_DIMS

export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root> {
  size?: SizeKey
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(function Checkbox(
  { className, size = "md", style, ...props },
  ref,
) {
  const dim = SIZE_DIMS[size]
  return (
    <RadixCheckbox.Root
      ref={ref}
      data-ad-checkbox=""
      className={cn(
        "inline-grid place-items-center cursor-pointer border-0 p-0",
        "transition-[background,border-color,transform] duration-150 ease-out",
        "disabled:cursor-not-allowed disabled:opacity-45",
        className,
      )}
      style={{
        width: dim.box,
        height: dim.box,
        borderRadius: radii.sm,
        border: `1.5px solid ${colors.ink}`,
        ...style,
      }}
      {...props}
    >
      <RadixCheckbox.Indicator
        data-ad-checkbox-indicator=""
        forceMount
        className="grid place-items-center"
      >
        <Glyph size={dim.glyph} stroke={dim.stroke} />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  )
})

function Glyph({ size, stroke }: { size: number; stroke: number }) {
  return (
    <svg
      data-ad-checkbox-glyph=""
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Tick — checked state */}
      <path data-ad-checkbox-tick d="M3.5 8.5 L7 12 L13 4.5" pathLength={1} />
      {/* Dash — indeterminate state */}
      <path data-ad-checkbox-dash d="M3.5 8 H12.5" pathLength={1} />
    </svg>
  )
}
