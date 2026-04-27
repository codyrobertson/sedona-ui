"use client"

import * as React from "react"
import * as RadixRadioGroup from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils"

import { colors, radii } from "./tokens"
import "./aerodash.css"
import "./radio-group.css"

/**
 * RadioGroup — y2k radio set. Wraps Radix RadioGroup.
 *
 *   <RadioGroupRoot value={v} onValueChange={setV}>
 *     <RadioItem value="one">One</RadioItem>
 *     <RadioItem value="two">Two</RadioItem>
 *   </RadioGroupRoot>
 *
 * RadioItem renders a circular indicator + adjacent label. Use RadioBare for
 * just the indicator (e.g., custom layouts).
 */

const SIZE_DIMS = {
  sm: { box: 14, dot: 6 },
  md: { box: 18, dot: 8 },
  lg: { box: 22, dot: 10 },
} as const
type SizeKey = keyof typeof SIZE_DIMS

const RadioGroupContext = React.createContext<{ size: SizeKey } | null>(null)
const useRadioGroupCtx = () => {
  const ctx = React.useContext(RadioGroupContext)
  if (!ctx) throw new Error("Radio* must be used inside <RadioGroupRoot>")
  return ctx
}

// ─── Root ───────────────────────────────────────────────────────────────────

export interface RadioGroupRootProps
  extends React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Root> {
  size?: SizeKey
  /** Layout direction. Default vertical. */
  orientation?: "vertical" | "horizontal"
}

export const RadioGroupRoot = React.forwardRef<HTMLDivElement, RadioGroupRootProps>(
  function RadioGroupRoot({ className, size = "md", orientation = "vertical", style, ...props }, ref) {
    return (
      <RadioGroupContext.Provider value={{ size }}>
        <RadixRadioGroup.Root
          ref={ref}
          data-ad-radio-group=""
          orientation={orientation}
          className={cn(
            orientation === "horizontal" ? "inline-flex flex-row gap-4" : "inline-flex flex-col gap-2",
            className,
          )}
          style={style}
          {...props}
        />
      </RadioGroupContext.Provider>
    )
  },
)

// ─── Bare indicator (just the circle) ───────────────────────────────────────

export interface RadioBareProps
  extends React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Item> {}

export const RadioBare = React.forwardRef<HTMLButtonElement, RadioBareProps>(function RadioBare(
  { className, style, ...props },
  ref,
) {
  const { size } = useRadioGroupCtx()
  const dim = SIZE_DIMS[size]
  return (
    <RadixRadioGroup.Item
      ref={ref}
      data-ad-radio=""
      className={cn(
        "inline-grid place-items-center cursor-pointer border-0 p-0",
        "disabled:cursor-not-allowed disabled:opacity-45",
        className,
      )}
      style={{
        width: dim.box,
        height: dim.box,
        borderRadius: radii.pill,
        border: `1.5px solid ${colors.ink}`,
        ...style,
      }}
      {...props}
    >
      <RadixRadioGroup.Indicator
        data-ad-radio-indicator=""
        className="block"
        style={{
          width: dim.dot,
          height: dim.dot,
          borderRadius: radii.pill,
        }}
      />
    </RadixRadioGroup.Item>
  )
})

// ─── Item (radio + adjacent label) ──────────────────────────────────────────

export interface RadioItemProps extends RadioBareProps {
  children?: React.ReactNode
  labelClassName?: string
}

export const RadioItem = React.forwardRef<HTMLButtonElement, RadioItemProps>(function RadioItem(
  { children, labelClassName, value, ...itemProps },
  ref,
) {
  const id = React.useId()
  const itemId = itemProps.id ?? `radio-${id}`
  return (
    <label
      htmlFor={itemId}
      className="inline-flex cursor-pointer items-center gap-2 select-none"
    >
      <RadioBare ref={ref} value={value} id={itemId} {...itemProps} />
      {children !== undefined ? (
        <span className={cn("text-[12px] uppercase font-[950] tracking-[0.04em]", labelClassName)}>
          {children}
        </span>
      ) : null}
    </label>
  )
})
