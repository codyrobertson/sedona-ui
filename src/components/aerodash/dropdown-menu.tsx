"use client"

import * as React from "react"
import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu"

import { cn } from "@/lib/utils"

import { colors, radii } from "./tokens"
import "./menu.css"

/**
 * DropdownMenu — y2k action menu. Wraps Radix DropdownMenu.
 *
 *   <DropdownMenuRoot>
 *     <DropdownMenuTrigger asChild><Button>Actions</Button></DropdownMenuTrigger>
 *     <DropdownMenuContent>
 *       <DropdownMenuLabel>Account</DropdownMenuLabel>
 *       <DropdownMenuItem onSelect={…}>Profile</DropdownMenuItem>
 *       <DropdownMenuItem>Settings</DropdownMenuItem>
 *       <DropdownMenuSeparator />
 *       <DropdownMenuItem variant="danger">Sign out</DropdownMenuItem>
 *     </DropdownMenuContent>
 *   </DropdownMenuRoot>
 */

export const DropdownMenuRoot = RadixDropdownMenu.Root
export const DropdownMenuTrigger = RadixDropdownMenu.Trigger
export const DropdownMenuPortal = RadixDropdownMenu.Portal
export const DropdownMenuSub = RadixDropdownMenu.Sub
export const DropdownMenuSubTrigger = RadixDropdownMenu.SubTrigger
export const DropdownMenuRadioGroup = RadixDropdownMenu.RadioGroup

// ─── Content ────────────────────────────────────────────────────────────────

export interface DropdownMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.Content> {}

export const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  function DropdownMenuContent({ className, sideOffset = 4, style, ...props }, ref) {
    return (
      <DropdownMenuPortal>
        <RadixDropdownMenu.Content
          ref={ref}
          sideOffset={sideOffset}
          data-ad-menu-content=""
          className={cn("z-50 min-w-[180px] overflow-hidden", className)}
          style={{
            background: colors.paper,
            color: colors.ink,
            border: `1.5px solid ${colors.ink}`,
            borderRadius: radii.md,
            boxShadow: `1px 1px 0 ${colors.ink}`,
            padding: 4,
            ...style,
          }}
          {...props}
        />
      </DropdownMenuPortal>
    )
  },
)

// ─── Item ───────────────────────────────────────────────────────────────────

export interface DropdownMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.Item> {
  variant?: "default" | "danger"
  /** Optional leading icon. */
  icon?: React.ReactNode
  /** Optional trailing shortcut/hint. */
  shortcut?: React.ReactNode
}

export const DropdownMenuItem = React.forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  function DropdownMenuItem(
    { className, variant = "default", icon, shortcut, children, style, ...props },
    ref,
  ) {
    return (
      <RadixDropdownMenu.Item
        ref={ref}
        data-ad-menu-item=""
        data-variant={variant}
        className={cn(
          "relative flex items-center gap-2 cursor-pointer select-none",
          "outline-none whitespace-nowrap",
          className,
        )}
        style={{
          padding: "6px 10px",
          fontSize: 12,
          borderRadius: radii.xs,
          color: variant === "danger" ? "#71132a" : colors.ink,
          fontWeight: 600,
          letterSpacing: "0.01em",
          ...style,
        }}
        {...props}
      >
        {icon ? (
          <span className="grid place-items-center [&>svg]:h-[14px] [&>svg]:w-[14px] opacity-70">
            {icon}
          </span>
        ) : null}
        <span className="flex-1">{children}</span>
        {shortcut ? (
          <span className="text-[10px] uppercase tracking-[0.06em] opacity-50">{shortcut}</span>
        ) : null}
      </RadixDropdownMenu.Item>
    )
  },
)

// ─── Separator ──────────────────────────────────────────────────────────────

export const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.Separator>
>(function DropdownMenuSeparator({ className, style, ...props }, ref) {
  return (
    <RadixDropdownMenu.Separator
      ref={ref}
      data-ad-menu-separator=""
      className={cn("h-px", className)}
      style={{ background: colors.line, margin: "4px -4px", ...style }}
      {...props}
    />
  )
})

// ─── Label ──────────────────────────────────────────────────────────────────

export const DropdownMenuLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.Label>
>(function DropdownMenuLabel({ className, style, ...props }, ref) {
  return (
    <RadixDropdownMenu.Label
      ref={ref}
      data-ad-menu-label=""
      className={cn("uppercase font-[950] tracking-[0.08em]", className)}
      style={{
        padding: "6px 10px 4px",
        fontSize: 9,
        color: colors.muted,
        ...style,
      }}
      {...props}
    />
  )
})

// ─── CheckboxItem ───────────────────────────────────────────────────────────

export const DropdownMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.CheckboxItem>
>(function DropdownMenuCheckboxItem({ className, style, children, ...props }, ref) {
  return (
    <RadixDropdownMenu.CheckboxItem
      ref={ref}
      data-ad-menu-item=""
      data-checkbox=""
      className={cn(
        "relative flex items-center gap-2 cursor-pointer select-none outline-none",
        className,
      )}
      style={{
        padding: "6px 10px 6px 26px",
        fontSize: 12,
        borderRadius: radii.xs,
        color: colors.ink,
        fontWeight: 600,
        ...style,
      }}
      {...props}
    >
      <RadixDropdownMenu.ItemIndicator
        style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)" }}
      >
        <svg width={12} height={12} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 6.5L5 9.5L10 4" />
        </svg>
      </RadixDropdownMenu.ItemIndicator>
      {children}
    </RadixDropdownMenu.CheckboxItem>
  )
})

// ─── RadioItem ──────────────────────────────────────────────────────────────

export const DropdownMenuRadioItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.RadioItem>
>(function DropdownMenuRadioItem({ className, style, children, ...props }, ref) {
  return (
    <RadixDropdownMenu.RadioItem
      ref={ref}
      data-ad-menu-item=""
      data-radio=""
      className={cn(
        "relative flex items-center gap-2 cursor-pointer select-none outline-none",
        className,
      )}
      style={{
        padding: "6px 10px 6px 26px",
        fontSize: 12,
        borderRadius: radii.xs,
        color: colors.ink,
        fontWeight: 600,
        ...style,
      }}
      {...props}
    >
      <RadixDropdownMenu.ItemIndicator
        style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}
      >
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: colors.ink, display: "block" }} />
      </RadixDropdownMenu.ItemIndicator>
      {children}
    </RadixDropdownMenu.RadioItem>
  )
})
