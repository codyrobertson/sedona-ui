"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Terminal,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Download,
  Copy,
  ExternalLink,
  GitCommit,
  ChevronDown,
  Server
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import type {
  AgentVersion,
  EvaluationProgress as EvaluationProgressType,
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

const STEP_LABELS: Record<string, string> = {
  queued: "Queued",
  loading_model: "Loading Model",
  initializing: "Initializing Environment",
  running_benchmark: "Running Benchmark",
  generating_attestation: "Generating TEE Attestation",
  publishing_results: "Publishing Results",
  completed: "Completed",
  failed: "Failed",
}

const LOG_LEVEL_STYLES: Record<string, { color: string; bg: string }> = {
  info: { color: "text-zeus-text-primary", bg: "" },
  warn: { color: "text-zeus-accent-orange", bg: "bg-zeus-accent-orange/5" },
  error: { color: "text-zeus-status-destructive", bg: "bg-zeus-status-destructive/5" },
  debug: { color: "text-zeus-accent-blue/70", bg: "" },
}

// ============================================================================
// Sub-Components
// ============================================================================

interface LogEntryRowProps {
  entry: EvaluationLogEntry
  isLast?: boolean
}

function LogEntryRow({ entry, isLast }: LogEntryRowProps) {
  const styles = LOG_LEVEL_STYLES[entry.level] || LOG_LEVEL_STYLES.info

  return (
    <div className={cn(
      "flex gap-3 px-3 py-2 font-mono text-caption-m",
      styles.bg,
      !isLast && "border-b border-zeus-border-alpha/50"
    )}>
      <span className="text-zeus-text-tertiary shrink-0 tabular-nums">
        {formatTimestamp(entry.timestamp)}
      </span>
      <span className={cn(
        "uppercase w-14 shrink-0 font-medium",
        styles.color
      )}>
        {entry.level}
      </span>
      <span className="text-zeus-text-primary break-all flex-1">
        {entry.message}
      </span>
    </div>
  )
}

interface ProgressHeaderProps {
  progress: EvaluationProgressType
  version: AgentVersion
}

function ProgressHeader({ progress, version }: ProgressHeaderProps) {
  const isRunning = progress.status === "running"
  const isCompleted = progress.status === "completed"
  const isFailed = progress.status === "failed"

  return (
    <div className="p-4 border-b border-zeus-border-alpha">
      {/* Version info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Badge variant="default" size="sm">v{version.versionNumber}</Badge>
          <a
            href={version.huggingFace.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-caption-l font-mono text-zeus-text-secondary hover:text-sedona-400 transition-colors"
          >
            <GitCommit className="w-3.5 h-3.5" />
            <span>{version.huggingFace.commitHashShort}</span>
            <ExternalLink className="w-3 h-3 opacity-50" />
          </a>
        </div>
        <Badge
          variant={isCompleted ? "success" : isFailed ? "danger" : isRunning ? "warning" : "default"}
          size="sm"
          showPulse={isRunning}
          pulseColor={isRunning ? "bg-zeus-accent-orange" : undefined}
        >
          {isRunning && <Loader2 className="w-3 h-3 mr-1 animate-spin" />}
          {isCompleted && <CheckCircle2 className="w-3 h-3 mr-1" />}
          {isFailed && <AlertCircle className="w-3 h-3 mr-1" />}
          {progress.status.charAt(0).toUpperCase() + progress.status.slice(1)}
        </Badge>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-caption-m">
          <div className="flex items-center gap-2 text-zeus-text-secondary">
            <Server className="w-3.5 h-3.5" />
            <span>{STEP_LABELS[progress.currentStep] || progress.currentStep}</span>
          </div>
          <span className="font-mono text-zeus-text-primary">
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

      {/* Timer */}
      <div className="flex items-center justify-between mt-3 text-caption-m">
        <div className="flex items-center gap-1.5 text-zeus-text-secondary">
          <Clock className="w-3.5 h-3.5" />
          <span>Elapsed: </span>
          <span className="font-mono text-zeus-text-primary">
            {formatTime(progress.elapsedTimeMs)}
          </span>
        </div>
        {progress.estimatedRemainingMs && isRunning && (
          <span className="text-zeus-text-tertiary">
            ~{formatTime(progress.estimatedRemainingMs)} remaining
          </span>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// Main Component
// ============================================================================

export interface WeightsPanelProps {
  version: AgentVersion
  progress?: EvaluationProgressType
  className?: string
  /** Called when user wants to copy logs */
  onCopyLogs?: () => void
  /** Called when user wants to download logs */
  onDownloadLogs?: () => void
  /** Maximum height for logs area */
  maxLogsHeight?: string
  /** Auto-scroll to bottom on new logs */
  autoScroll?: boolean
}

export function WeightsPanel({
  version,
  progress,
  className,
  onCopyLogs,
  onDownloadLogs,
  maxLogsHeight = "400px",
  autoScroll = true
}: WeightsPanelProps) {
  const logsEndRef = React.useRef<HTMLDivElement>(null)
  const logs = React.useMemo(() => progress?.logs || [], [progress?.logs])

  // Auto-scroll logs to bottom when new entries arrive
  React.useEffect(() => {
    if (autoScroll && logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [logs.length, autoScroll])

  const handleCopyLogs = React.useCallback(() => {
    const logText = logs
      .map(entry => `[${formatTimestamp(entry.timestamp)}] [${entry.level.toUpperCase()}] ${entry.message}`)
      .join("\n")
    navigator.clipboard.writeText(logText)
    onCopyLogs?.()
  }, [logs, onCopyLogs])

  const handleDownloadLogs = React.useCallback(() => {
    const logText = logs
      .map(entry => `[${formatTimestamp(entry.timestamp)}] [${entry.level.toUpperCase()}] ${entry.message}`)
      .join("\n")
    const blob = new Blob([logText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `evaluation-${version.id}-logs.txt`
    a.click()
    URL.revokeObjectURL(url)
    onDownloadLogs?.()
  }, [logs, version.id, onDownloadLogs])

  // If no progress data, show completed state with evaluation result
  if (!progress && version.evaluation) {
    return (
      <div className={cn(
        "rounded-lg border bg-zeus-surface-neutral border-zeus-border-alpha overflow-hidden",
        className
      )}>
        <div className="p-4 border-b border-zeus-border-alpha">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant="default" size="sm">v{version.versionNumber}</Badge>
              <Badge variant="success" size="sm">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Completed
              </Badge>
            </div>
            <a
              href={version.huggingFace.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-caption-m text-sedona-400 hover:underline"
            >
              <span className="font-mono">{version.huggingFace.commitHashShort}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-caption-m text-zeus-text-tertiary">Final Score</span>
            <span className="text-heading-s font-bold text-zeus-text-primary">
              {version.evaluation.score.overall.toFixed(1)}
            </span>
          </div>
          <div className="space-y-2">
            {version.evaluation.score.breakdown.map((category) => (
              <div key={category.name} className="flex items-center justify-between">
                <span className="text-caption-l text-zeus-text-secondary">
                  {category.name}
                </span>
                <div className="flex items-center gap-2">
                  <Progress
                    value={category.score}
                    className="w-24 h-1.5"
                  />
                  <span className="text-caption-m font-mono text-zeus-text-primary w-10 text-right">
                    {category.score.toFixed(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {version.evaluation.attestation.verificationUrl && (
            <a
              href={version.evaluation.attestation.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-caption-m text-zeus-accent-blue hover:underline mt-4 pt-4 border-t border-zeus-border-alpha"
            >
              Verify TEE Attestation ({version.evaluation.attestation.teeType.toUpperCase()})
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    )
  }

  // If no progress and no evaluation, show empty state
  if (!progress) {
    return (
      <div className={cn(
        "rounded-lg border bg-zeus-surface-neutral border-zeus-border-alpha overflow-hidden",
        className
      )}>
        <div className="p-8 text-center">
          <Terminal className="w-8 h-8 text-zeus-text-tertiary mx-auto mb-3" />
          <p className="text-body-s text-zeus-text-secondary">
            No evaluation data available
          </p>
          <p className="text-caption-m text-zeus-text-tertiary mt-1">
            Start an evaluation to see logs here
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn(
      "rounded-lg border bg-zeus-surface-neutral border-zeus-border-alpha overflow-hidden",
      className
    )}>
      {/* Header with progress */}
      <ProgressHeader progress={progress} version={version} />

      {/* Error display */}
      <AnimatePresence>
        {progress.error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="p-4 bg-zeus-status-destructive/10 border-b border-zeus-border-alpha">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-zeus-status-destructive shrink-0" />
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

      {/* Logs header */}
      <div className="px-4 py-2 border-b border-zeus-border-alpha flex items-center justify-between bg-zeus-surface-default">
        <div className="flex items-center gap-2 text-zeus-text-secondary">
          <Terminal className="w-4 h-4" />
          <span className="text-caption-l font-medium">Evaluation Logs</span>
          <Badge variant="default" size="sm">{logs.length}</Badge>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="xs"
            onClick={handleCopyLogs}
            disabled={logs.length === 0}
            icon={<Copy className="w-3.5 h-3.5" />}
          >
            Copy
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={handleDownloadLogs}
            disabled={logs.length === 0}
            icon={<Download className="w-3.5 h-3.5" />}
          >
            Download
          </Button>
        </div>
      </div>

      {/* Logs content */}
      <div
        className="bg-zeus-surface-default overflow-y-auto scrollbar-thin"
        style={{ maxHeight: maxLogsHeight }}
      >
        {logs.length === 0 ? (
          <div className="p-8 text-center">
            <Loader2 className="w-6 h-6 text-zeus-text-tertiary mx-auto mb-2 animate-spin" />
            <p className="text-caption-m text-zeus-text-tertiary">
              Waiting for logs...
            </p>
          </div>
        ) : (
          <div>
            {logs.map((entry, index) => (
              <LogEntryRow
                key={`${entry.timestamp}-${index}`}
                entry={entry}
                isLast={index === logs.length - 1}
              />
            ))}
            <div ref={logsEndRef} />
          </div>
        )}
      </div>
    </div>
  )
}
