"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

// Dot Matrix Grid Component
interface DotMatrixGridProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: number[]
  height?: number
  width?: number
  dotSize?: number
  gap?: number
  colorScheme?: 'green' | 'red' | 'blue' | 'orange' | 'purple' | 'pink' | 'yellow' | 'neutral'
}

const DotMatrixGrid = React.forwardRef<HTMLDivElement, DotMatrixGridProps>(
  ({ className, data, height = 25, width = 65, dotSize = 1, gap = 1, colorScheme = 'green', ...props }, ref) => {
    // Generate sample data if none provided
    const generateData = React.useMemo(() => {
      if (data) return data
      return Array.from({ length: Math.floor((width * height) / ((dotSize + gap) * (dotSize + gap))) }, () => 
        Math.random() > 0.5 ? 1 : 0
      )
    }, [data, width, height, dotSize, gap])

    const colorSchemes = {
      green: 'bg-emerald-500 dark:bg-zeus-accent-green',
      red: 'bg-red-500 dark:bg-zeus-accent-red', 
      blue: 'bg-blue-500 dark:bg-zeus-accent-blue',
      orange: 'bg-orange-500 dark:bg-zeus-accent-orange',
      purple: 'bg-purple-500 dark:bg-zeus-accent-purple',
      pink: 'bg-pink-500 dark:bg-zeus-accent-pink',
      yellow: 'bg-yellow-500 dark:bg-zeus-accent-yellow',
      neutral: 'bg-gray-500 dark:bg-zeus-accent-gray'
    }

    const dotsPerRow = Math.floor(width / (dotSize + gap))
    const rows = Math.ceil(generateData.length / dotsPerRow)

    return (
      <div 
        ref={ref}
        className={cn("flex flex-col gap-px items-start justify-end overflow-hidden", className)}
        style={{ height: `${height}px`, width: `${width}px` }}
        {...props}
      >
        {Array.from({ length: rows }, (_, rowIndex) => (
          <div key={rowIndex} className="flex gap-px">
            {Array.from({ length: dotsPerRow }, (_, colIndex) => {
              const dataIndex = rowIndex * dotsPerRow + colIndex
              const value = generateData[dataIndex] || 0
              return (
                <div
                  key={colIndex}
                  className={cn(
                    "rounded-sm transition-opacity",
                    value > 0 ? colorSchemes[colorScheme] : 'bg-zeus-surface-neutral-subtle',
                    value > 0 ? 'opacity-100' : 'opacity-40'
                  )}
                  style={{ 
                    width: `${dotSize * 4}px`, 
                    height: `${dotSize * 4}px`
                  }}
                />
              )
            })}
          </div>
        ))}
      </div>
    )
  }
)
DotMatrixGrid.displayName = "DotMatrixGrid"

// Table Row Component
interface TableRowProps extends React.HTMLAttributes<HTMLDivElement> {
  avatar?: {
    initials?: string
    image?: string
  }
  rank?: number
  title: string
  description?: string
  token?: string
  priceChange?: {
    value: string
    isPositive?: boolean
  }
  marketCap?: string
  status?: {
    label: string
    type: 'safe' | 'risk' | 'close' | 'neutral'
  }
  dotMatrix?: {
    data?: number[]
    colorScheme?: 'green' | 'red' | 'blue' | 'orange' | 'purple' | 'pink' | 'yellow' | 'neutral'
  }
}

const TableRow = React.forwardRef<HTMLDivElement, TableRowProps>(
  ({ 
    className, 
    avatar, 
    rank, 
    title, 
    description, 
    token, 
    priceChange, 
    marketCap, 
    status,
    dotMatrix,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-4 w-full bg-card border-b border-border px-2 py-0 font-sans dark:bg-zeus-surface-default dark:border-zeus-border-divider",
          className
        )}
        {...props}
      >
        {/* Avatar */}
        {avatar && (
          <div className="flex-shrink-0">
            {avatar.image ? (
              <img 
                src={avatar.image} 
                alt={title}
                className="w-10 h-10 rounded-lg border border-border object-cover dark:border-zeus-border-alpha"
              />
            ) : (
              <div className="w-10 h-10 bg-muted border border-border rounded-lg flex items-center justify-center dark:bg-zeus-surface-neutral-subtle dark:border-zeus-border-alpha">
                <span className="text-body-s font-medium text-foreground tracking-[-0.2px] font-sans dark:text-zeus-text-primary">
                  {avatar.initials || title.slice(0, 2).toUpperCase()}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Task Card */}
        <div className="flex-1 min-w-0 border-b border-border shadow-sm font-sans dark:border-zeus-border-normal">
          <div className="px-3 py-2">
            <div className="flex items-start justify-between h-10 gap-6">
              {/* Left Content */}
              <div className="flex-1 min-w-0">
                <div className="min-w-36 w-full max-w-[497px]">
                  {/* Title Row */}
                  <div className="flex items-center gap-2 mb-1">
                    {rank && (
                      <span className="text-caption-l font-bold text-foreground tracking-[-0.1px] font-sans dark:text-zeus-text-primary">
                        {rank}.
                      </span>
                    )}
                    <span className="text-caption-l font-bold text-foreground tracking-[-0.1px] truncate font-sans dark:text-zeus-text-primary">
                      {title}
                    </span>
                    {token && (
                      <Badge variant="default" size="sm" className="shrink-0">
                        {token}
                      </Badge>
                    )}
                    {priceChange && (
                      <div className="flex items-center gap-1 text-caption-m leading-4 shrink-0">
                        <span className={cn(
                          "font-bold font-sans",
                          priceChange.isPositive ? "text-emerald-600 dark:text-zeus-status-success" : "text-red-600 dark:text-zeus-status-destructive"
                        )}>
                          {priceChange.value}
                        </span>
                        <span className={cn(
                          "text-caption-m font-sans",
                          priceChange.isPositive ? "text-emerald-500 dark:text-zeus-status-success-secondary" : "text-red-500 dark:text-zeus-status-destructive-secondary"
                        )}>
                          {priceChange.isPositive ? "↗" : "↘"}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Description */}
                  {description && (
                    <p className="text-caption-l font-normal text-muted-foreground tracking-[-0.1px] truncate font-sans dark:text-zeus-text-secondary">
                      {description}
                    </p>
                  )}
                </div>
              </div>

              {/* Market Cap */}
              {marketCap && (
                <div className="flex flex-col items-end justify-between h-full shrink-0">
                  <span className="text-caption-m font-medium text-muted-foreground font-sans dark:text-zeus-text-tertiary">
                    MARKET CAP
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-caption-l font-semibold text-foreground tracking-[-0.1px] font-sans dark:text-zeus-text-primary">
                      {marketCap}
                    </span>
                  </div>
                </div>
              )}

              {/* Status and Dot Matrix */}
              {(status || dotMatrix) && (
                <div className="flex flex-col gap-[3.5px] h-full items-start justify-end w-[65px] shrink-0">
                  {status && (
                    <div className="h-3.5 flex items-center justify-between w-full">
                      <span className="text-caption-m font-medium text-foreground font-sans dark:text-zeus-text-primary">
                        {status.label}
                      </span>
                      <span className="text-caption-s text-muted-foreground font-sans dark:text-zeus-text-tertiary">
                        ℹ
                      </span>
                    </div>
                  )}
                  
                  {dotMatrix && (
                    <DotMatrixGrid
                      data={dotMatrix.data}
                      colorScheme={dotMatrix.colorScheme || 'green'}
                      height={25}
                      width={65}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
)
TableRow.displayName = "TableRow"

// Table Container
interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Table = React.forwardRef<HTMLDivElement, TableProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("w-full bg-zeus-surface-default", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Table.displayName = "Table"

export { Table, TableRow, DotMatrixGrid }
export type { TableRowProps, DotMatrixGridProps }