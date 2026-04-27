"use client"

import * as React from "react"
import * as RadixTooltip from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

import { colors, radii } from "./tokens"
import "./tooltip.css"

/**
 * Tooltip — y2k tooltip. Wraps Radix Tooltip with our chrome aesthetic.
 *
 *   <TooltipProvider>
 *     <Tooltip content="Helpful tip" side="top">
 *       <Button>Hover me</Button>
 *     </Tooltip>
 *   </TooltipProvider>
 *
 * Compound primitives:
 *   <TooltipRoot>
 *     <TooltipTrigger asChild>{trigger}</TooltipTrigger>
 *     <TooltipContent side="top">{tip}</TooltipContent>
 *   </TooltipRoot>
 */

export const TooltipProvider = RadixTooltip.Provider
export const TooltipRoot = RadixTooltip.Root
export const TooltipTrigger = RadixTooltip.Trigger
export const TooltipPortal = RadixTooltip.Portal

// ─── Content ────────────────────────────────────────────────────────────────

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof RadixTooltip.Content> {}

export const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  function TooltipContent(
    { className, sideOffset = 6, children, style, ...props },
    ref,
  ) {
    return (
      <TooltipPortal>
        <RadixTooltip.Content
          ref={ref}
          sideOffset={sideOffset}
          data-ad-tooltip=""
          className={cn(
            "z-50 select-none whitespace-nowrap font-[950] uppercase",
            className,
          )}
          style={{
            background: colors.ink,
            color: colors.paper,
            border: `1.5px solid ${colors.ink}`,
            borderRadius: radii.sm,
            padding: "5px 9px",
            fontSize: 10,
            letterSpacing: "0.06em",
            lineHeight: 1.2,
            boxShadow: `2px 2px 0 ${colors.cyan}`,
            ...style,
          }}
          {...props}
        >
          {children}
          <RadixTooltip.Arrow data-ad-tooltip-arrow="" width={10} height={5} fill={colors.ink} />
        </RadixTooltip.Content>
      </TooltipPortal>
    )
  },
)

// ─── Convenience: <Tooltip> ─────────────────────────────────────────────────

export interface TooltipProps {
  content: React.ReactNode
  children: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  delayDuration?: number
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** Wrap with TooltipProvider. Set false if a parent already provides one. */
  withProvider?: boolean
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(
  {
    content,
    children,
    side = "top",
    align = "center",
    delayDuration = 200,
    open,
    defaultOpen,
    onOpenChange,
    withProvider = true,
  },
  ref,
) {
  const inner = (
    <TooltipRoot
      delayDuration={delayDuration}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent ref={ref} side={side} align={align}>
        {content}
      </TooltipContent>
    </TooltipRoot>
  )
  return withProvider ? <TooltipProvider>{inner}</TooltipProvider> : inner
})
