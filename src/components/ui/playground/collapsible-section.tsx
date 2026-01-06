"use client"

import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

export interface CollapsibleSectionProps {
  id: string
  title: string
  description?: string
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
}

export function CollapsibleSection({
  id,
  title,
  description,
  children,
  defaultOpen = true,
  className,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  return (
    <CollapsiblePrimitive.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn("", className)}
    >
      <div id={id} className="scroll-mt-48">
        <CollapsiblePrimitive.Trigger asChild>
          <button className="flex items-center gap-3 w-full group text-left py-3 mb-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-md bg-muted/50 group-hover:bg-sedona-500/10 transition-colors">
              <ChevronRight
                className={cn(
                  "h-4 w-4 text-muted-foreground group-hover:text-sedona-500 transition-all duration-200",
                  isOpen && "rotate-90"
                )}
              />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold group-hover:text-sedona-500 transition-colors">
                {title}
              </h2>
              {description && (
                <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
              )}
            </div>
          </button>
        </CollapsiblePrimitive.Trigger>

        <CollapsiblePrimitive.Content
          className={cn(
            "overflow-hidden",
            "data-[state=open]:animate-accordion-down",
            "data-[state=closed]:animate-accordion-up"
          )}
        >
          <div className="pl-10 pb-10 border-b border-border/50">{children}</div>
        </CollapsiblePrimitive.Content>
      </div>
    </CollapsiblePrimitive.Root>
  )
}
