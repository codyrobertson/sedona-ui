"use client"

import * as React from "react"
import * as RadixSelect from "@radix-ui/react-select"

import { cn } from "@/lib/utils"

import { colors, radii } from "./tokens"
import "./menu.css"

/**
 * Select — y2k chrome-bar select wrapping Radix Select.
 *
 *   <SelectRoot value={v} onValueChange={setV}>
 *     <SelectTrigger placeholder="Choose…" />
 *     <SelectContent>
 *       <SelectItem value="a">Option A</SelectItem>
 *       <SelectItem value="b">Option B</SelectItem>
 *       <SelectGroup>
 *         <SelectLabel>More</SelectLabel>
 *         <SelectItem value="c">Option C</SelectItem>
 *       </SelectGroup>
 *     </SelectContent>
 *   </SelectRoot>
 *
 * Use Select for single-choice from known options. For free-text + filter,
 * reach for Combobox.
 */

export const SelectRoot = RadixSelect.Root
export const SelectGroup = RadixSelect.Group
export const SelectValue = RadixSelect.Value

// ─── Trigger ────────────────────────────────────────────────────────────────

export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof RadixSelect.Trigger> {
  placeholder?: string
  invalid?: boolean
  size?: "sm" | "md" | "lg"
}

const SIZE_HEIGHT: Record<NonNullable<SelectTriggerProps["size"]>, number> = {
  sm: 28,
  md: 34,
  lg: 40,
}

export const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  function SelectTrigger(
    { className, placeholder, invalid, size = "md", style, children, ...props },
    ref,
  ) {
    const height = SIZE_HEIGHT[size]
    return (
      <RadixSelect.Trigger
        ref={ref}
        data-ad-select-trigger=""
        data-invalid={invalid ? "" : undefined}
        className={cn(
          "inline-flex items-center justify-between gap-2 cursor-pointer select-none",
          "outline-none whitespace-nowrap text-left",
          "data-[placeholder]:text-[color:var(--ad-placeholder)]",
          className,
        )}
        style={{
          height,
          padding: "0 10px 0 12px",
          fontSize: 12,
          fontWeight: 600,
          background: colors.paper,
          color: colors.ink,
          border: `1.5px solid ${invalid ? "#71132a" : colors.ink}`,
          borderRadius: radii.md,
          boxShadow: `1px 1px 0 ${invalid ? "#71132a" : colors.ink}`,
          minWidth: 140,
          ["--ad-placeholder" as string]: colors.muted,
          ...style,
        }}
        {...props}
      >
        <span className="flex-1 truncate">
          {children ?? <RadixSelect.Value placeholder={placeholder} />}
        </span>
        <RadixSelect.Icon asChild>
          <svg
            width={10}
            height={10}
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            style={{ flexShrink: 0, opacity: 0.7 }}
          >
            <path d="M2 3.5L5 6.5L8 3.5" />
          </svg>
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
    )
  },
)

// ─── Content ────────────────────────────────────────────────────────────────

export interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof RadixSelect.Content> {}

export const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  function SelectContent(
    { className, position = "popper", sideOffset = 4, style, children, ...props },
    ref,
  ) {
    return (
      <RadixSelect.Portal>
        <RadixSelect.Content
          ref={ref}
          position={position}
          sideOffset={position === "popper" ? sideOffset : undefined}
          data-ad-select-content=""
          className={cn("z-50 overflow-hidden", className)}
          style={{
            background: colors.paper,
            color: colors.ink,
            border: `1.5px solid ${colors.ink}`,
            borderRadius: radii.md,
            boxShadow: `1px 1px 0 ${colors.ink}`,
            minWidth: "var(--radix-select-trigger-width)",
            maxHeight: "var(--radix-select-content-available-height)",
            ...style,
          }}
          {...props}
        >
          <RadixSelect.ScrollUpButton className="grid place-items-center" style={{ height: 18, color: colors.muted }}>
            <svg width={10} height={10} viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 6.5L5 3.5L8 6.5" />
            </svg>
          </RadixSelect.ScrollUpButton>
          <RadixSelect.Viewport style={{ padding: 4 }}>{children}</RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton className="grid place-items-center" style={{ height: 18, color: colors.muted }}>
            <svg width={10} height={10} viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3.5L5 6.5L8 3.5" />
            </svg>
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    )
  },
)

// ─── Item ───────────────────────────────────────────────────────────────────

export interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof RadixSelect.Item> {
  icon?: React.ReactNode
}

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(function SelectItem(
  { className, icon, children, style, ...props },
  ref,
) {
  return (
    <RadixSelect.Item
      ref={ref}
      data-ad-menu-item=""
      className={cn(
        "relative flex items-center gap-2 cursor-pointer select-none outline-none whitespace-nowrap",
        "pr-7",
        className,
      )}
      style={{
        padding: "6px 28px 6px 10px",
        fontSize: 12,
        borderRadius: radii.xs,
        color: colors.ink,
        fontWeight: 600,
        ...style,
      }}
      {...props}
    >
      {icon ? (
        <span className="grid place-items-center [&>svg]:h-[14px] [&>svg]:w-[14px] opacity-70">
          {icon}
        </span>
      ) : null}
      <RadixSelect.ItemText asChild>
        <span className="flex-1 truncate">{children}</span>
      </RadixSelect.ItemText>
      <RadixSelect.ItemIndicator
        style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)" }}
      >
        <svg
          width={12}
          height={12}
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 6.5L5 9.5L10 4" />
        </svg>
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  )
})

// ─── Label ──────────────────────────────────────────────────────────────────

export const SelectLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Label>
>(function SelectLabel({ className, style, ...props }, ref) {
  return (
    <RadixSelect.Label
      ref={ref}
      data-ad-menu-label=""
      className={cn("uppercase font-[950] tracking-[0.08em]", className)}
      style={{ padding: "6px 10px 4px", fontSize: 9, color: colors.muted, ...style }}
      {...props}
    />
  )
})

// ─── Separator ──────────────────────────────────────────────────────────────

export const SelectSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Separator>
>(function SelectSeparator({ className, style, ...props }, ref) {
  return (
    <RadixSelect.Separator
      ref={ref}
      data-ad-menu-separator=""
      className={cn("h-px", className)}
      style={{ background: colors.line, margin: "4px -4px", ...style }}
      {...props}
    />
  )
})
