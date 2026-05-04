"use client"

import * as React from "react"
import * as RadixTabs from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

import { colors, radii } from "./tokens"
import "./tabs.css"

/**
 * Tabs — y2k tab system with content panels. Wraps Radix Tabs.
 *
 *   <TabsRoot defaultValue="overview">
 *     <TabsList>
 *       <TabsTrigger value="overview">Overview</TabsTrigger>
 *       <TabsTrigger value="activity">Activity</TabsTrigger>
 *     </TabsList>
 *     <TabsContent value="overview">…</TabsContent>
 *     <TabsContent value="activity">…</TabsContent>
 *   </TabsRoot>
 *
 * Different from SegmentedControl — that's a stateless toggle group, this owns
 * the value state AND swaps content panels.
 */

export const TabsRoot = RadixTabs.Root

// ─── List ───────────────────────────────────────────────────────────────────

export interface TabsListProps extends React.ComponentPropsWithoutRef<typeof RadixTabs.List> {}

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(function TabsList(
  { className, style, ...props },
  ref,
) {
  return (
    <RadixTabs.List
      ref={ref}
      data-ad-tabs-list=""
      className={cn("flex items-stretch", className)}
      style={{
        background: "#020409",
        borderBottom: `2px solid #101722`,
        height: 44,
        gap: 0,
        ...style,
      }}
      {...props}
    />
  )
})

// ─── Trigger ────────────────────────────────────────────────────────────────

export interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof RadixTabs.Trigger> {}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(function TabsTrigger(
  { className, disabled, style, children, ...props },
  ref,
) {
  return (
    <RadixTabs.Trigger
      ref={ref}
      data-ad-tabs-trigger=""
      data-disabled={disabled ? "" : undefined}
      disabled={disabled}
      className={cn(
        "relative inline-flex items-center justify-center cursor-pointer border-0",
        "font-[900] uppercase leading-none whitespace-nowrap",
        className,
      )}
      style={{
        height: "100%",
        padding: "0 22px",
        fontSize: 12,
        ...style,
      }}
      {...props}
    >
      {children}
    </RadixTabs.Trigger>
  )
})

// ─── Content ────────────────────────────────────────────────────────────────

export interface TabsContentProps extends React.ComponentPropsWithoutRef<typeof RadixTabs.Content> {}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(function TabsContent(
  { className, style, ...props },
  ref,
) {
  return (
    <RadixTabs.Content
      ref={ref}
      data-ad-tabs-content=""
      className={cn("focus:outline-none", className)}
      style={{ paddingTop: 20, ...style }}
      {...props}
    />
  )
})
