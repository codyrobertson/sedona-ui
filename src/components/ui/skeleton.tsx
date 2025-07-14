"use client"

import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-zeus-surface-neutral",
        "dark:bg-zeus-surface-default",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }