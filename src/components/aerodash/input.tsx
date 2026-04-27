"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import "./input.css"

/**
 * Input — y2k chrome bar form control. Same border + radius language as Button
 * (no offset underlay — that's reserved for actionable elements). Composable:
 *
 *   <InputRoot size="md">
 *     <InputAddon>{leadingIcon}</InputAddon>      optional left slot
 *     <InputControl placeholder="Search…" />       the actual <input>
 *     <InputAddon>{trailingIcon}</InputAddon>      optional right slot
 *   </InputRoot>
 *
 * Or use the convenience:
 *   <Input placeholder="…" leadingIcon={…} trailingIcon={…} />
 *
 * Focus state is a 2px cyan ring on the chrome (matches Button focus styling).
 */

const SIZE_DIMS = {
  sm: { h: 28, fontSize: 11, padX: 10, addonW: 28 },
  md: { h: 34, fontSize: 13, padX: 12, addonW: 32 },
  lg: { h: 40, fontSize: 14, padX: 14, addonW: 38 },
} as const

type SizeKey = keyof typeof SIZE_DIMS

const InputContext = React.createContext<{ size: SizeKey } | null>(null)
const useInputCtx = () => {
  const ctx = React.useContext(InputContext)
  if (!ctx) throw new Error("Input.* must be used inside <InputRoot>")
  return ctx
}

// ─── Root ───────────────────────────────────────────────────────────────────

export interface InputRootProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: SizeKey
  invalid?: boolean
}

export const InputRoot = React.forwardRef<HTMLDivElement, InputRootProps>(function InputRoot(
  { className, size = "md", invalid = false, children, style, ...props },
  ref,
) {
  const dim = SIZE_DIMS[size]
  return (
    <InputContext.Provider value={{ size }}>
      <div
        ref={ref}
        data-ad-input-root=""
        data-invalid={invalid ? "" : undefined}
        className={cn("relative inline-grid items-center overflow-hidden", className)}
        style={{
          minHeight: dim.h,
          gridTemplateColumns: "auto 1fr auto",
          background: "#ffffff",
          border: `1.5px solid ${invalid ? "#ff4d72" : "#05070b"}`,
          borderRadius: 6,
          fontSize: dim.fontSize,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    </InputContext.Provider>
  )
})

// ─── Control (the actual input) ─────────────────────────────────────────────

export interface InputControlProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {}

export const InputControl = React.forwardRef<HTMLInputElement, InputControlProps>(
  function InputControl({ className, style, ...props }, ref) {
    const { size } = useInputCtx()
    const dim = SIZE_DIMS[size]
    return (
      <input
        ref={ref}
        data-ad-input-control=""
        className={cn(
          "min-w-0 border-0 bg-transparent font-medium text-[#05070b]",
          className,
        )}
        style={{
          paddingLeft: dim.padX,
          paddingRight: dim.padX,
          height: dim.h - 4, // accounting for 1.5px border × 2 + a hair of breathing
          ...style,
        }}
        {...props}
      />
    )
  },
)

// ─── Addon (leading/trailing slot) ──────────────────────────────────────────

export interface InputAddonProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Position determines which side gets the divider. Auto-detects from DOM order. */
  side?: "leading" | "trailing"
}

export const InputAddon = React.forwardRef<HTMLSpanElement, InputAddonProps>(function InputAddon(
  { className, style, children, side, ...props },
  ref,
) {
  const { size } = useInputCtx()
  const dim = SIZE_DIMS[size]
  return (
    <span
      ref={ref}
      data-ad-input-addon=""
      data-side={side}
      className={cn("grid place-items-center text-[#5a5a5a]", className)}
      style={{
        width: dim.addonW,
        height: "100%",
        background: "#f7f9fc",
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  )
})

// ─── Convenience: <Input> ───────────────────────────────────────────────────

export interface InputProps extends Omit<InputControlProps, "size"> {
  rootSize?: SizeKey
  invalid?: boolean
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  rootClassName?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { rootSize = "md", invalid = false, leadingIcon, trailingIcon, rootClassName, ...props },
  ref,
) {
  return (
    <InputRoot size={rootSize} invalid={invalid} className={rootClassName}>
      {leadingIcon !== null && leadingIcon !== undefined ? (
        <InputAddon side="leading">{leadingIcon}</InputAddon>
      ) : (
        <span aria-hidden />
      )}
      <InputControl ref={ref} {...props} />
      {trailingIcon !== null && trailingIcon !== undefined ? (
        <InputAddon side="trailing">{trailingIcon}</InputAddon>
      ) : (
        <span aria-hidden />
      )}
    </InputRoot>
  )
})
