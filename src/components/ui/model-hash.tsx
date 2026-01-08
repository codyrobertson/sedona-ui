"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Icon } from "@/components/ui/icon"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useClipboard } from "@/hooks/useClipboard"

// ============================================================================
// Types
// ============================================================================

/** Flexible benchmark format - accepts multiple input styles */
export type BenchmarkInput =
  | { name: string; score: number; maxScore?: number }  // Standard format
  | { label: string; value: number; max?: number }      // Alternative format
  | [string, number]                                     // Tuple format [name, score]
  | [string, number, number]                             // Tuple with max [name, score, max]

/** Normalized benchmark for internal use */
export interface NormalizedBenchmark {
  name: string
  score: number
  maxScore?: number
}

/** Normalize any benchmark input to standard format */
function normalizeBenchmark(input: BenchmarkInput): NormalizedBenchmark {
  if (Array.isArray(input)) {
    return {
      name: input[0],
      score: input[1],
      maxScore: input[2],
    }
  }
  if ('label' in input) {
    return {
      name: input.label,
      score: input.value,
      maxScore: input.max,
    }
  }
  return input
}

export interface ModelVersion {
  /** Unique hash/commit identifier */
  hash: string
  /** Version number (e.g., "v1.2.0") */
  version?: string
  /** Upload timestamp - accepts Date, ISO string, or Unix timestamp */
  uploadedAt: Date | string | number
  /** Whether this is the current active version */
  isCurrent?: boolean
  /** Benchmark scores - flexible input format */
  benchmarks?: BenchmarkInput[]
  /** Additional metadata as key-value pairs */
  metrics?: Record<string, number | string>
  /** Changelog or notes */
  notes?: string
}

export interface ModelHashProps {
  /** Current model hash */
  hash: string
  /** Model version history */
  versions?: ModelVersion[]
  /** Model name for display */
  modelName?: string
  /** HuggingFace or model URL */
  modelUrl?: string
  /** Called when a version is selected */
  onVersionSelect?: (version: ModelVersion) => void
  /** Custom trigger element */
  children?: React.ReactNode
  /** Additional class names */
  className?: string
}

// ============================================================================
// Sub-components
// ============================================================================

interface ModelHashTriggerProps {
  hash: string
  modelUrl?: string
  className?: string
  onClick?: () => void
}

const ModelHashTrigger = React.forwardRef<HTMLDivElement, ModelHashTriggerProps>(
  ({ hash, modelUrl, className, onClick }, ref) => {
    const truncatedHash = `${hash.slice(0, 6)}...${hash.slice(-4)}`

    const handleLinkClick = (e: React.MouseEvent) => {
      e.stopPropagation()
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg",
          "bg-zeus-surface-elevated border border-zeus-border-alpha",
          className
        )}
      >
        {/* Hash section - clickable to open sheet */}
        <button
          onClick={onClick}
          className="flex items-center gap-2 flex-1 min-w-0 group"
        >
          <Icon icon="hashtag" className="w-3.5 h-3.5 text-zeus-text-tertiary group-hover:text-zeus-text-secondary transition-colors flex-shrink-0" />
          <span className="text-zeus-text-tertiary text-[10px] uppercase tracking-wider flex-shrink-0">Hash</span>
          <span className="text-zeus-text-secondary text-caption-s font-mono truncate">{truncatedHash}</span>
          <Icon icon="chevron-right" className="w-4 h-4 text-zeus-text-quaternary group-hover:text-zeus-text-tertiary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
        </button>

        {/* Divider */}
        {modelUrl && <div className="w-px h-5 bg-zeus-border-alpha flex-shrink-0" />}

        {/* HuggingFace link */}
        {modelUrl && (
          <a
            href={modelUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
            className="flex items-center gap-1.5 px-2 py-1 rounded-md text-zeus-text-secondary hover:text-white hover:bg-zeus-surface-neutral transition-colors flex-shrink-0"
          >
            <Icon icon="arrow-up-right-from-square" className="w-3.5 h-3.5" />
            <span className="text-caption-s font-medium">View Model</span>
          </a>
        )}
      </div>
    )
  }
)
ModelHashTrigger.displayName = "ModelHashTrigger"

interface ModelVersionItemProps {
  version: ModelVersion
  onCopy?: (hash: string) => void
  onSelect?: (version: ModelVersion) => void
}

const ModelVersionItem = ({ version, onCopy, onSelect }: ModelVersionItemProps) => {
  const { copy, copied } = useClipboard()
  const truncatedHash = `${version.hash.slice(0, 8)}...${version.hash.slice(-4)}`

  // Handle flexible date input
  const uploadDate = typeof version.uploadedAt === 'number'
    ? new Date(version.uploadedAt)
    : typeof version.uploadedAt === 'string'
      ? new Date(version.uploadedAt)
      : version.uploadedAt

  const formattedDate = uploadDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })

  // Normalize benchmarks
  const normalizedBenchmarks = version.benchmarks?.map(normalizeBenchmark) || []

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    copy(version.hash)
    onCopy?.(version.hash)
  }

  return (
    <div
      onClick={() => onSelect?.(version)}
      className={cn(
        "group p-4 rounded-xl border transition-all",
        version.isCurrent
          ? "bg-sedona-500/5 border-sedona-500/40"
          : "bg-zeus-surface-neutral border-zeus-border-alpha hover:border-zeus-border-subtle",
        onSelect && "cursor-pointer"
      )}
    >
      {/* Top row: Version + Date */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {version.version && (
            <span className="text-white text-base font-bold">{version.version}</span>
          )}
          {version.isCurrent && (
            <Badge variant="safe" size="sm">Active</Badge>
          )}
        </div>
        <span className="text-caption-l text-zeus-text-tertiary">{formattedDate}</span>
      </div>

      {/* Hash row */}
      <div className="flex items-center gap-2 mb-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <code className="text-xs text-zeus-text-secondary font-mono bg-zeus-surface-default/80 px-2 py-1 rounded-md cursor-help">
              {truncatedHash}
            </code>
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-mono text-[10px]">{version.hash}</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-md hover:bg-zeus-surface-default transition-colors opacity-0 group-hover:opacity-100"
              aria-label={copied ? "Copied" : "Copy hash"}
            >
              {copied ? (
                <Icon icon="check" className="w-3.5 h-3.5 text-zeus-status-success" />
              ) : (
                <Icon icon="copy" className="w-3.5 h-3.5 text-zeus-text-tertiary" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{copied ? "Copied!" : "Copy full hash"}</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Benchmarks */}
      {normalizedBenchmarks.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-3 border-t border-zeus-border-alpha">
          {normalizedBenchmarks.slice(0, 4).map((benchmark, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <span className="text-[11px] text-zeus-text-tertiary uppercase tracking-wide">{benchmark.name}</span>
              <span className="text-caption-l font-semibold text-white">
                {benchmark.score}
                {benchmark.maxScore && (
                  <span className="text-zeus-text-tertiary font-normal">/{benchmark.maxScore}</span>
                )}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Additional metrics */}
      {version.metrics && Object.keys(version.metrics).length > 0 && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
          {Object.entries(version.metrics).slice(0, 4).map(([key, value]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span className="text-[11px] text-zeus-text-tertiary uppercase tracking-wide">{key}</span>
              <span className="text-caption-l font-semibold text-white">{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ============================================================================
// Main Component
// ============================================================================

const ModelHash = React.forwardRef<HTMLDivElement, ModelHashProps>(
  ({ hash, versions = [], modelName, modelUrl, onVersionSelect, children, className }, ref) => {
    const [open, setOpen] = React.useState(false)

    // Create default versions array with current hash if not provided
    const displayVersions = versions.length > 0
      ? versions
      : [{
          hash,
          uploadedAt: new Date(),
          isCurrent: true,
        }]

    const handleVersionSelect = (version: ModelVersion) => {
      onVersionSelect?.(version)
    }

    return (
      <div ref={ref} className={cn("flex-1", className)}>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            {children || <ModelHashTrigger hash={hash} modelUrl={modelUrl} />}
          </SheetTrigger>
          <SheetContent className="bg-zeus-surface-default border-zeus-border-alpha w-full sm:max-w-sm p-0">
            {/* Header */}
            <div className="p-4 border-b border-zeus-border-alpha">
              <SheetTitle className="text-zeus-text-primary text-heading-xs font-semibold">
                {modelName || 'Model'} Versions
              </SheetTitle>
              <SheetDescription className="text-zeus-text-tertiary text-caption-l mt-0.5">
                {displayVersions.length} version{displayVersions.length !== 1 ? 's' : ''} available
              </SheetDescription>
            </div>

            {/* Version list */}
            <div className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-200px)]">
              {displayVersions.map((version, idx) => (
                <ModelVersionItem
                  key={version.hash + idx}
                  version={version}
                  onSelect={onVersionSelect ? handleVersionSelect : undefined}
                />
              ))}

              {/* Empty state */}
              {displayVersions.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Icon icon="hashtag" className="w-10 h-10 text-zeus-text-quaternary mb-2" />
                  <p className="text-zeus-text-tertiary text-caption-l">No versions yet</p>
                </div>
              )}
            </div>

            {/* Footer with HuggingFace link */}
            {modelUrl && (
              <div className="p-4 border-t border-zeus-border-alpha">
                <a
                  href={modelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-zeus-surface-elevated hover:bg-zeus-surface-neutral border border-zeus-border-alpha text-zeus-text-primary text-caption-l font-medium transition-colors"
                >
                  <Icon icon="arrow-up-right-from-square" className="w-4 h-4" />
                  View on HuggingFace
                </a>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    )
  }
)

ModelHash.displayName = "ModelHash"

// ============================================================================
// Exports
// ============================================================================

export { ModelHash, ModelHashTrigger, ModelVersionItem, normalizeBenchmark }
