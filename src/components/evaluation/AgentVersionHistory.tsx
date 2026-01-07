"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EvaluationProgressCompact } from "./EvaluationProgress"
import type { AgentVersion, VersionStatus } from "@/types/evaluation"

// ============================================================================
// Helper Functions
// ============================================================================

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  })
}

function formatTimeAgo(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return formatDate(timestamp)
}

const STATUS_CONFIG: Record<VersionStatus, {
  label: string
  variant: "success" | "warning" | "danger" | "default"
  iconName: string
}> = {
  active: { label: "Active", variant: "success", iconName: "circle-check" },
  evaluating: { label: "Evaluating", variant: "warning", iconName: "spinner-third" },
  historical: { label: "Historical", variant: "default", iconName: "clock" },
  failed: { label: "Failed", variant: "danger", iconName: "circle-exclamation" },
}

// ============================================================================
// Sub-Components
// ============================================================================

interface VersionRowProps {
  version: AgentVersion
  isExpanded: boolean
  onToggle: () => void
  onViewDetails?: (version: AgentVersion) => void
  onReEvaluate?: (version: AgentVersion) => void
}

function VersionRow({
  version,
  isExpanded,
  onToggle,
  onViewDetails,
  onReEvaluate
}: VersionRowProps) {
  const statusConfig = STATUS_CONFIG[version.status]
  const isEvaluating = version.status === "evaluating"
  const hasScore = version.evaluation?.score.overall !== undefined

  return (
    <div className="border-b border-zeus-border-alpha last:border-b-0">
      {/* Main Row */}
      <button
        onClick={onToggle}
        className={cn(
          "w-full px-4 py-3 flex items-center gap-4 text-left transition-colors",
          "hover:bg-zeus-surface-elevated",
          isExpanded && "bg-zeus-surface-elevated"
        )}
      >
        {/* Expand chevron */}
        <Icon icon="chevron-right" className={cn(
          "w-4 h-4 text-zeus-text-tertiary transition-transform shrink-0",
          isExpanded && "rotate-90"
        )} />

        {/* Version number */}
        <div className="w-12 shrink-0">
          <span className="text-body-s font-semibold text-zeus-text-primary">
            v{version.versionNumber}
          </span>
        </div>

        {/* Commit hash */}
        <a
          href={version.huggingFace.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1.5 text-caption-l font-mono text-zeus-text-secondary hover:text-sedona-400 transition-colors"
        >
          <Icon icon="code-commit" className="w-3.5 h-3.5" />
          <span>{version.huggingFace.commitHashShort}</span>
          <Icon icon="arrow-up-right-from-square" className="w-3 h-3 opacity-50" />
        </a>

        {/* Score or progress */}
        <div className="flex-1 flex items-center justify-center">
          {isEvaluating && version.evaluationProgress ? (
            <EvaluationProgressCompact
              progress={version.evaluationProgress}
              className="max-w-[200px] w-full"
            />
          ) : hasScore ? (
            <div className="flex items-center gap-2">
              <span className="text-body-s font-semibold text-zeus-text-primary">
                {version.evaluation!.score.overall.toFixed(1)}
              </span>
              {version.evaluation?.score.rank && (
                <div className="flex items-center gap-1 text-zeus-accent-orange">
                  <Icon icon="trophy" className="w-3 h-3" />
                  <span className="text-caption-m">#{version.evaluation.score.rank}</span>
                </div>
              )}
            </div>
          ) : (
            <span className="text-caption-m text-zeus-text-tertiary">-</span>
          )}
        </div>

        {/* Status badge */}
        <Badge
          variant={statusConfig.variant}
          size="sm"
          showPulse={isEvaluating}
          pulseColor={isEvaluating ? "bg-zeus-accent-orange" : undefined}
          className="shrink-0"
        >
          <Icon icon={statusConfig.iconName} spin={isEvaluating} className="w-3 h-3 mr-1" />
          {statusConfig.label}
        </Badge>

        {/* Timestamp */}
        <span className="text-caption-m text-zeus-text-tertiary w-20 text-right shrink-0">
          {formatTimeAgo(version.createdAt)}
        </span>
      </button>

      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 pb-4 pt-2 ml-8 border-l-2 border-zeus-border-alpha">
              <div className="grid grid-cols-2 gap-4">
                {/* Left column - Details */}
                <div className="space-y-3">
                  <div>
                    <span className="text-caption-m text-zeus-text-tertiary block mb-1">
                      Repository
                    </span>
                    <a
                      href={`https://huggingface.co/${version.huggingFace.repoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-caption-l text-sedona-400 hover:underline"
                    >
                      {version.huggingFace.repoId}
                    </a>
                  </div>

                  {version.huggingFace.branch && (
                    <div>
                      <span className="text-caption-m text-zeus-text-tertiary block mb-1">
                        Branch
                      </span>
                      <span className="text-caption-l text-zeus-text-primary font-mono">
                        {version.huggingFace.branch}
                      </span>
                    </div>
                  )}

                  {version.notes && (
                    <div>
                      <span className="text-caption-m text-zeus-text-tertiary block mb-1">
                        Notes
                      </span>
                      <p className="text-caption-l text-zeus-text-secondary">
                        {version.notes}
                      </p>
                    </div>
                  )}

                  <div>
                    <span className="text-caption-m text-zeus-text-tertiary block mb-1">
                      Created
                    </span>
                    <span className="text-caption-l text-zeus-text-primary">
                      {formatDate(version.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Right column - Score breakdown or progress */}
                <div>
                  {isEvaluating && version.evaluationProgress ? (
                    <div className="space-y-2">
                      <span className="text-caption-m text-zeus-text-tertiary">
                        Evaluation in progress...
                      </span>
                      <div className="p-3 rounded bg-zeus-surface-default border border-zeus-border-alpha">
                        <div className="text-caption-m text-zeus-text-secondary mb-2">
                          Step: {version.evaluationProgress.currentStep.replace(/_/g, " ")}
                        </div>
                        <div className="flex items-center justify-between text-caption-l font-mono">
                          <span>{version.evaluationProgress.progress}% complete</span>
                          <span className="text-zeus-text-tertiary">
                            {Math.floor(version.evaluationProgress.elapsedTimeMs / 60000)}m elapsed
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : version.evaluation ? (
                    <div className="space-y-2">
                      <span className="text-caption-m text-zeus-text-tertiary">
                        Score Breakdown
                      </span>
                      <div className="space-y-2">
                        {version.evaluation.score.breakdown.map((category) => (
                          <div key={category.name} className="flex items-center justify-between">
                            <span className="text-caption-l text-zeus-text-secondary">
                              {category.name}
                            </span>
                            <div className="flex items-center gap-2">
                              <div className="w-24 h-1.5 bg-zeus-surface-default rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-sedona-500 rounded-full"
                                  style={{ width: `${category.score}%` }}
                                />
                              </div>
                              <span className="text-caption-m font-mono text-zeus-text-primary w-10 text-right">
                                {category.score.toFixed(1)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      {version.evaluation.attestation && (
                        <div className="mt-3 pt-3 border-t border-zeus-border-alpha">
                          <a
                            href={version.evaluation.attestation.verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-caption-m text-zeus-accent-blue hover:underline"
                          >
                            <span>Verify attestation ({version.evaluation.attestation.teeType.toUpperCase()})</span>
                            <Icon icon="arrow-up-right-from-square" className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-caption-l text-zeus-text-tertiary">
                      No evaluation data available
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-zeus-border-alpha">
                {version.evaluation && onViewDetails && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(version)}
                  >
                    View Full Results
                  </Button>
                )}
                {version.status !== "evaluating" && onReEvaluate && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onReEvaluate(version)}
                  >
                    Re-evaluate
                  </Button>
                )}
                <a
                  href={version.huggingFace.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<Icon icon="arrow-up-right-from-square" className="w-3.5 h-3.5" />}
                    iconPosition="right"
                  >
                    View on HuggingFace
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================================================
// Main Component
// ============================================================================

export interface AgentVersionHistoryProps {
  versions: AgentVersion[]
  className?: string
  /** Called when user clicks to view full evaluation results */
  onViewDetails?: (version: AgentVersion) => void
  /** Called when user initiates re-evaluation */
  onReEvaluate?: (version: AgentVersion) => void
  /** Called when user wants to add new weights */
  onAddVersion?: () => void
  /** Maximum versions to show initially (show "Load more" if exceeded) */
  initialLimit?: number
}

export function AgentVersionHistory({
  versions,
  className,
  onViewDetails,
  onReEvaluate,
  onAddVersion,
  initialLimit = 5
}: AgentVersionHistoryProps) {
  const [expandedId, setExpandedId] = React.useState<string | null>(null)
  const [showAll, setShowAll] = React.useState(false)

  const displayedVersions = showAll ? versions : versions.slice(0, initialLimit)
  const hasMore = versions.length > initialLimit

  return (
    <div className={cn(
      "rounded-lg border bg-zeus-surface-neutral border-zeus-border-alpha overflow-hidden",
      className
    )}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-zeus-border-alpha flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-body-s font-semibold text-zeus-text-primary">
            Version History
          </h3>
          <Badge variant="default" size="sm">
            {versions.length} versions
          </Badge>
        </div>
        {onAddVersion && (
          <Button
            variant="default"
            size="sm"
            onClick={onAddVersion}
          >
            Add New Weights
          </Button>
        )}
      </div>

      {/* Version list */}
      {versions.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-zeus-text-secondary">No versions yet</p>
          {onAddVersion && (
            <Button
              variant="outline"
              size="sm"
              onClick={onAddVersion}
              className="mt-4"
            >
              Upload First Version
            </Button>
          )}
        </div>
      ) : (
        <>
          <div>
            {displayedVersions.map((version) => (
              <VersionRow
                key={version.id}
                version={version}
                isExpanded={expandedId === version.id}
                onToggle={() => setExpandedId(
                  expandedId === version.id ? null : version.id
                )}
                onViewDetails={onViewDetails}
                onReEvaluate={onReEvaluate}
              />
            ))}
          </div>

          {/* Load more */}
          {hasMore && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="w-full py-3 text-caption-l text-zeus-text-secondary hover:text-zeus-text-primary hover:bg-zeus-surface-elevated transition-colors"
            >
              Show {versions.length - initialLimit} more versions
            </button>
          )}
        </>
      )}
    </div>
  )
}
