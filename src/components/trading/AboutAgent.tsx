"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface AboutAgentProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  description: string
  huggingFaceUrl?: string
}

const AboutAgent = React.forwardRef<HTMLDivElement, AboutAgentProps>(
  ({ className, name, description, huggingFaceUrl, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "bg-zeus-surface-neutral border-zeus-border-alpha",
          className
        )}
        {...props}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-heading-xs text-zeus-text-primary">
            About {name}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <p className="text-zeus-text-secondary text-caption-l leading-relaxed">
            {description}
          </p>

          {huggingFaceUrl && (
            <a
              href={huggingFaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sedona-500 hover:text-sedona-400 transition-colors text-caption-l"
            >
              <span>{"🤗"}</span>
              <span className="underline">View this agent on HuggingFace</span>
            </a>
          )}
        </CardContent>
      </Card>
    )
  }
)

AboutAgent.displayName = "AboutAgent"

export { AboutAgent }
