"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { DotMatrixGrid } from "@/components/ui/table"

// Outline Card Component - Exact Figma Implementation
interface OutlineCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  marketPerformance?: {
    timeframes?: Array<{ label: string; active?: boolean }>
    agentsData?: {
      launched: number
      topAgents: Array<{
        name: string
        token: string
        mcap: string
        status: 'safe' | 'close' | 'risk'
      }>
    }
    volumeData?: {
      '24h': string
      total: string
    }
    dotMatrixData?: {
      left: number[]
      right: number[]
    }
  }
  howItWorks?: {
    readDocsLink?: string
    sections?: Array<{
      title: string
      description: string
    }>
  }
}

const OutlineCard = React.forwardRef<HTMLDivElement, OutlineCardProps>(
  ({ className, title, description, marketPerformance, howItWorks, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-card border border-border rounded-lg p-6 font-sans dark:bg-zeus-surface-default dark:border-zeus-border-alpha",
          className
        )}
        {...props}
      >
        {/* Header Section */}
        {(title || description) && (
          <div className="mb-8">
            {title && (
              <h2 className="text-caption-l font-bold text-card-foreground tracking-[-0.1px] mb-4 dark:text-zeus-text-primary">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-caption-l font-normal text-muted-foreground tracking-[-0.1px] leading-5 dark:text-zeus-text-secondary">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Market Performance Section */}
        {marketPerformance && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-caption-l font-bold text-zeus-text-primary tracking-[-0.1px]">
                Market Performance
              </h3>
              {marketPerformance.timeframes && (
                <div className="flex items-center gap-2">
                  {marketPerformance.timeframes.map((timeframe, index) => (
                    <button
                      key={index}
                      className={cn(
                        "text-caption-m font-medium px-2 py-1 transition-colors",
                        timeframe.active 
                          ? "text-zeus-text-primary" 
                          : "text-zeus-text-tertiary hover:text-zeus-text-secondary"
                      )}
                    >
                      {timeframe.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Agents Performance */}
            {marketPerformance.agentsData && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <span className="text-caption-m font-medium text-zeus-text-tertiary">
                      Agents Launched
                    </span>
                    <span className="text-caption-l font-semibold text-zeus-text-primary">
                      {marketPerformance.agentsData.launched}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-caption-m font-medium text-zeus-text-tertiary">
                      Top Agents Today
                    </span>
                    <span className="text-caption-m font-medium text-zeus-text-tertiary">
                      MCAP
                    </span>
                  </div>
                </div>

                {/* Agent List */}
                <div className="space-y-3">
                  {marketPerformance.agentsData.topAgents.map((agent, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant={agent.status === 'safe' ? 'safe' : agent.status === 'close' ? 'close' : 'risk'}
                          size="sm"
                        >
                          {agent.status.toUpperCase()}
                        </Badge>
                        <span className="text-caption-l font-medium text-zeus-text-primary">
                          {agent.name}
                        </span>
                        <Badge variant="default" size="sm">
                          {agent.token}
                        </Badge>
                      </div>
                      <span className="text-caption-l font-semibold text-zeus-text-primary">
                        {agent.mcap}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Volume Data */}
            {marketPerformance.volumeData && (
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-caption-m font-medium text-zeus-text-tertiary block">
                    24H Volume
                  </span>
                  <span className="text-caption-l font-semibold text-zeus-text-primary">
                    {marketPerformance.volumeData['24h']}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-caption-m font-medium text-zeus-text-tertiary block">
                    Total MCAP
                  </span>
                  <span className="text-caption-l font-semibold text-zeus-text-primary">
                    {marketPerformance.volumeData.total}
                  </span>
                </div>
              </div>
            )}

            {/* Dot Matrix Visualization */}
            {marketPerformance.dotMatrixData && (
              <div className="flex gap-4 justify-center">
                <DotMatrixGrid
                  data={marketPerformance.dotMatrixData.left}
                  colorScheme="blue"
                  width={120}
                  height={40}
                />
                <DotMatrixGrid
                  data={marketPerformance.dotMatrixData.right}
                  colorScheme="blue"
                  width={120}
                  height={40}
                />
              </div>
            )}
          </div>
        )}

        {/* How It Works Section */}
        {howItWorks && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-caption-l font-bold text-zeus-text-primary tracking-[-0.1px]">
                How It Works?
              </h3>
              {howItWorks.readDocsLink && (
                <button className="flex items-center gap-2 text-caption-m font-medium text-zeus-text-secondary hover:text-zeus-text-primary transition-colors">
                  Read Docs
                  <span className="text-caption-s">↗</span>
                </button>
              )}
            </div>

            {/* How It Works Sections */}
            {howItWorks.sections && (
              <div className="space-y-6">
                {howItWorks.sections.map((section, index) => (
                  <div key={index} className="border border-zeus-border-alpha rounded-lg p-4">
                    <h4 className="text-caption-l font-bold text-zeus-text-primary tracking-[-0.1px] mb-2">
                      {section.title}
                    </h4>
                    <p className="text-caption-l font-normal text-zeus-text-secondary tracking-[-0.1px] leading-5">
                      {section.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
)
OutlineCard.displayName = "OutlineCard"

export { OutlineCard }
export type { OutlineCardProps }