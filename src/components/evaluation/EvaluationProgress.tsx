"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type {
  EvaluationProgress as EvaluationProgressType,
  EvaluationStep,
  EvaluationLogEntry
} from "@/types/evaluation"

// ============================================================================
// Helper Functions
// ============================================================================

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}

function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp)
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  })
}

const STEP_CONFIG: Record<EvaluationStep, { label: string; iconName: string }> = {
  queued: { label: "Queued", iconName: "clock" },
  loading_model: { label: "Loading Model", iconName: "upload" },
  initializing: { label: "Initializing", iconName: "microchip" },
  running_benchmark: { label: "Running Benchmark", iconName: "chart-line" },
  generating_attestation: { label: "Generating Attestation", iconName: "shield" },
  publishing_results: { label: "Publishing Results", iconName: "upload" },
  completed: { label: "Completed", iconName: "circle-check" },
  failed: { label: "Failed", iconName: "circle-exclamation" },
}

const LOG_LEVEL_COLORS: Record<string, string> = {
  info: "text-zeus-text-secondary",
  warn: "text-zeus-accent-orange",
  error: "text-zeus-status-destructive",
  debug: "text-zeus-accent-blue/70",
}

// ============================================================================
// Sub-Components
// ============================================================================

interface LogEntryProps {
  entry: EvaluationLogEntry
}

function LogEntry({ entry }: LogEntryProps) {
  return (
    <div className="flex gap-3 text-caption-m font-mono">
      <span className="text-zeus-text-tertiary shrink-0">
        {formatTimestamp(entry.timestamp)}
      </span>
      <span className={cn("uppercase w-12 shrink-0", LOG_LEVEL_COLORS[entry.level])}>
        [{entry.level}]
      </span>
      <span className="text-zeus-text-primary break-all">
        {entry.message}
      </span>
    </div>
  )
}

interface StepIndicatorProps {
  step: EvaluationStep
  isActive: boolean
}

function StepIndicator({ step, isActive }: StepIndicatorProps) {
  const config = STEP_CONFIG[step]

  return (
    <div className={cn(
      "flex items-center gap-2 px-2 py-1 rounded",
      isActive
        ? "bg-sedona-500/20 text-sedona-400"
        : "text-zeus-text-tertiary"
    )}>
      {isActive ? (
        <Icon icon="spinner-third" spin className="w-3.5 h-3.5" />
      ) : (
        <Icon icon={config.iconName} className="w-3.5 h-3.5" />
      )}
      <span className="text-caption-m font-medium">{config.label}</span>
    </div>
  )
}

// ============================================================================
// Main Component
// ============================================================================

export interface EvaluationProgressProps {
  progress: EvaluationProgressType
  className?: string
  /** Whether to show the logs panel expanded by default */
  defaultLogsExpanded?: boolean
  /** Maximum height for the logs panel */
  logsMaxHeight?: string
  /** Callback when the component mounts - useful for WebSocket subscription */
  onMount?: () => void
  /** Callback when the component unmounts - useful for cleanup */
  onUnmount?: () => void
}

export function EvaluationProgress({
  progress,
  className,
  defaultLogsExpanded = false,
  logsMaxHeight = "200px",
  onMount,
  onUnmount,
}: EvaluationProgressProps) {
  const [logsExpanded, setLogsExpanded] = React.useState(defaultLogsExpanded)
  const logsEndRef = React.useRef<HTMLDivElement>(null)

  // Auto-scroll logs to bottom when new entries arrive
  React.useEffect(() => {
    if (logsExpanded && logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [progress.logs.length, logsExpanded])

  // Mount/unmount callbacks for WebSocket integration
  React.useEffect(() => {
    onMount?.()
    return () => onUnmount?.()
  }, [onMount, onUnmount])

  const isRunning = progress.status === "running"
  const isCompleted = progress.status === "completed"
  const isFailed = progress.status === "failed"

  const statusBadgeVariant = isCompleted
    ? "success"
    : isFailed
      ? "danger"
      : isRunning
        ? "warning"
        : "default"

  return (
    <div className={cn(
      "rounded-lg border bg-zeus-surface-neutral border-zeus-border-alpha overflow-hidden",
      className
    )}>
      {/* Header */}
      <div className="p-4 border-b border-zeus-border-alpha">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <h3 className="text-body-s font-semibold text-zeus-text-primary">
              Evaluation Progress
            </h3>
            <Badge
              variant={statusBadgeVariant}
              size="sm"
              showPulse={isRunning}
              pulseColor={isRunning ? "bg-zeus-accent-orange" : undefined}
            >
              {progress.status.toUpperCase()}
            </Badge>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-4 text-caption-l">
            <div className="flex items-center gap-1.5 text-zeus-text-secondary">
              <Icon icon="clock" className="w-3.5 h-3.5" />
              <span className="font-mono">{formatTime(progress.elapsedTimeMs)}</span>
            </div>
            {progress.estimatedRemainingMs && isRunning && (
              <div className="flex items-center gap-1.5 text-zeus-text-tertiary">
                <span className="text-zeus-text-tertiary">~</span>
                <span className="font-mono">{formatTime(progress.estimatedRemainingMs)}</span>
                <span>remaining</span>
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-caption-m">
            <StepIndicator step={progress.currentStep} isActive={isRunning} />
            <span className="font-mono text-zeus-text-secondary">
              {progress.progress}%
            </span>
          </div>
          <Progress
            value={progress.progress}
            className={cn(
              "h-2",
              isFailed && "[&>div]:bg-zeus-status-destructive",
              isCompleted && "[&>div]:bg-zeus-status-success",
              isRunning && "[&>div]:bg-sedona-500"
            )}
          />
        </div>
      </div>

      {/* Error Display */}
      <AnimatePresence>
        {progress.error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-zeus-border-alpha"
          >
            <div className="p-4 bg-zeus-status-destructive/10">
              <div className="flex items-start gap-3">
                <Icon icon="circle-exclamation" className="w-5 h-5 text-zeus-status-destructive shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-caption-m text-zeus-status-destructive">
                      {progress.error.code}
                    </span>
                    {progress.error.recoverable && (
                      <Badge variant="warning" size="sm">Recoverable</Badge>
                    )}
                  </div>
                  <p className="text-body-s text-zeus-text-primary">
                    {progress.error.message}
                  </p>
                  {progress.error.details && (
                    <p className="text-caption-m text-zeus-text-secondary mt-1">
                      {progress.error.details}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logs Panel */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLogsExpanded(!logsExpanded)}
          className="w-full justify-between px-4 py-2 rounded-none hover:bg-zeus-surface-elevated"
        >
          <div className="flex items-center gap-2 text-zeus-text-secondary">
            <Icon icon="terminal" className="w-4 h-4" />
            <span className="text-caption-l">
              Logs ({progress.logs.length})
            </span>
          </div>
          {logsExpanded ? (
            <Icon icon="chevron-up" className="w-4 h-4 text-zeus-text-tertiary" />
          ) : (
            <Icon icon="chevron-down" className="w-4 h-4 text-zeus-text-tertiary" />
          )}
        </Button>

        <AnimatePresence>
          {logsExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="p-4 bg-zeus-surface-default border-t border-zeus-border-alpha overflow-y-auto scrollbar-thin"
                style={{ maxHeight: logsMaxHeight }}
              >
                {progress.logs.length === 0 ? (
                  <p className="text-caption-m text-zeus-text-tertiary text-center py-4">
                    No logs yet...
                  </p>
                ) : (
                  <div className="space-y-2">
                    {progress.logs.map((entry, index) => (
                      <LogEntry key={`${entry.timestamp}-${index}`} entry={entry} />
                    ))}
                    <div ref={logsEndRef} />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ============================================================================
// Compact Variant for inline use
// ============================================================================

export interface EvaluationProgressCompactProps {
  progress: EvaluationProgressType
  className?: string
}

export function EvaluationProgressCompact({
  progress,
  className
}: EvaluationProgressCompactProps) {
  const isRunning = progress.status === "running"
  const isCompleted = progress.status === "completed"
  const isFailed = progress.status === "failed"

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Status indicator */}
      {isRunning ? (
        <Icon icon="spinner-third" spin className="w-4 h-4 text-sedona-400" />
      ) : isCompleted ? (
        <Icon icon="circle-check" className="w-4 h-4 text-zeus-status-success" />
      ) : isFailed ? (
        <Icon icon="circle-exclamation" className="w-4 h-4 text-zeus-status-destructive" />
      ) : (
        <Icon icon="clock" className="w-4 h-4 text-zeus-text-tertiary" />
      )}

      {/* Progress info */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <Progress
          value={progress.progress}
          className={cn(
            "h-1.5 flex-1",
            isFailed && "[&>div]:bg-zeus-status-destructive",
            isCompleted && "[&>div]:bg-zeus-status-success",
            isRunning && "[&>div]:bg-sedona-500"
          )}
        />
        <span className="text-caption-m font-mono text-zeus-text-secondary shrink-0">
          {progress.progress}%
        </span>
      </div>

      {/* Timer */}
      <span className="text-caption-m font-mono text-zeus-text-tertiary shrink-0">
        {formatTime(progress.elapsedTimeMs)}
      </span>
    </div>
  )
}
