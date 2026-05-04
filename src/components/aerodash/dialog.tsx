"use client"

import * as React from "react"
import * as RadixDialog from "@radix-ui/react-dialog"

import { cn } from "@/lib/utils"

import { colors, radii } from "./tokens"
import "./aerodash.css"
import "./dialog.css"

/**
 * Dialog — y2k modal. Wraps Radix Dialog (focus trap, scroll lock, ESC, portal)
 * with the AeroDash chrome aesthetic.
 *
 *   <DialogRoot>
 *     <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
 *     <DialogContent>
 *       <DialogHeader>
 *         <DialogTitle>Confirm Action</DialogTitle>
 *         <DialogClose />
 *       </DialogHeader>
 *       <DialogBody>
 *         <DialogDescription>This is permanent…</DialogDescription>
 *       </DialogBody>
 *       <DialogFooter>
 *         <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
 *         <Button variant="danger">Delete</Button>
 *       </DialogFooter>
 *     </DialogContent>
 *   </DialogRoot>
 */

export const DialogRoot = RadixDialog.Root
export const DialogTrigger = RadixDialog.Trigger
export const DialogPortal = RadixDialog.Portal

// ─── Backdrop ───────────────────────────────────────────────────────────────

export const DialogBackdrop = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Overlay>
>(function DialogBackdrop({ className, ...props }, ref) {
  return (
    <RadixDialog.Overlay
      ref={ref}
      data-ad-dialog-backdrop=""
      className={cn("fixed inset-0 z-50", className)}
      style={{ background: "rgba(5, 7, 11, 0.55)", backdropFilter: "blur(4px)" }}
      {...props}
    />
  )
})

// ─── Content (the modal box) ────────────────────────────────────────────────

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof RadixDialog.Content> {
  size?: "sm" | "md" | "lg"
  /** Render the backdrop alongside content (default: true). */
  withBackdrop?: boolean
}

const SIZE_WIDTH: Record<NonNullable<DialogContentProps["size"]>, number> = {
  sm: 360,
  md: 480,
  lg: 640,
}

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  function DialogContent(
    { className, size = "md", withBackdrop = true, children, style, ...props },
    ref,
  ) {
    return (
      <DialogPortal>
        {withBackdrop ? <DialogBackdrop /> : null}
        <RadixDialog.Content
          ref={ref}
          data-ad-dialog-content=""
          className={cn(
            "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
            "flex max-h-[85vh] w-[calc(100vw-32px)] flex-col overflow-hidden",
            className,
          )}
          style={{
            maxWidth: SIZE_WIDTH[size],
            background: colors.paper,
            color: colors.ink,
            border: `2px solid ${colors.ink}`,
            borderRadius: radii.lg,
            boxShadow: `1px 1px 0 ${colors.ink}`,
            ...style,
          }}
          {...props}
        >
          {children}
        </RadixDialog.Content>
      </DialogPortal>
    )
  },
)

// ─── Header ─────────────────────────────────────────────────────────────────

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  function DialogHeader({ className, style, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-ad-dialog-header=""
        className={cn("flex items-center justify-between gap-3", className)}
        style={{
          padding: "10px 14px",
          background: colors.ink,
          color: colors.paper,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    )
  },
)

// ─── Title ──────────────────────────────────────────────────────────────────

export const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Title>
>(function DialogTitle({ className, style, ...props }, ref) {
  return (
    <RadixDialog.Title
      ref={ref}
      data-ad-dialog-title=""
      className={cn("font-[950] uppercase", className)}
      style={{ fontSize: 12, letterSpacing: "0.06em", margin: 0, ...style }}
      {...props}
    />
  )
})

// ─── Description ────────────────────────────────────────────────────────────

export const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Description>
>(function DialogDescription({ className, style, ...props }, ref) {
  return (
    <RadixDialog.Description
      ref={ref}
      data-ad-dialog-description=""
      className={className}
      style={{ fontSize: 13, lineHeight: 1.5, color: "#5a5a5a", margin: 0, ...style }}
      {...props}
    />
  )
})

// ─── Body ───────────────────────────────────────────────────────────────────

export interface DialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DialogBody = React.forwardRef<HTMLDivElement, DialogBodyProps>(function DialogBody(
  { className, style, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-ad-dialog-body=""
      className={cn("flex-1 overflow-auto", className)}
      style={{ padding: 16, ...style }}
      {...props}
    >
      {children}
    </div>
  )
})

// ─── Footer ─────────────────────────────────────────────────────────────────

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  function DialogFooter({ className, style, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-ad-dialog-footer=""
        className={cn("flex items-center justify-end gap-2", className)}
        style={{
          padding: "12px 14px",
          background: "#f5f7fa",
          borderTop: `1px solid ${colors.line}`,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    )
  },
)

// ─── Close (button) ─────────────────────────────────────────────────────────

export const DialogClose = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Close>
>(function DialogClose({ className, children, asChild, style, ...props }, ref) {
  if (asChild) {
    return (
      <RadixDialog.Close ref={ref} asChild className={className} {...props}>
        {children}
      </RadixDialog.Close>
    )
  }
  return (
    <RadixDialog.Close
      ref={ref}
      data-ad-dialog-close=""
      className={cn(
        "grid place-items-center cursor-pointer border-0",
        "text-current opacity-70 hover:opacity-100",
        className,
      )}
      style={{
        width: 22,
        height: 22,
        borderRadius: radii.sm,
        background: "transparent",
        ...style,
      }}
      {...props}
    >
      {children ?? (
        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M3 3l6 6M9 3l-6 6" strokeLinecap="round" />
        </svg>
      )}
    </RadixDialog.Close>
  )
})
