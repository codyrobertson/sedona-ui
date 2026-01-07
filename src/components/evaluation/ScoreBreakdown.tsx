"use client"

import * as React from "react"
import { motion } from "motion/react"
import {
  Trophy,
  TrendingUp,
  ExternalLink,
  Shield,
  CheckCircle2,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { EvaluationScore, AttestationProof, ScoreCategory } from "@/types/evaluation"

// ============================================================================
// Helper Functions
// ============================================================================

function getScoreColor(score: number): string {
  if (score >= 90) return "text-zeus-status-success"
  if (score >= 75) return "text-sedona-400"
  if (score >= 60) return "text-zeus-accent-orange"
  return "text-zeus-status-destructive"
}

function getScoreBarColor(score: number): string {
  if (score >= 90) return "bg-zeus-status-success"
  if (score >= 75) return "bg-sedona-500"
  if (score >= 60) return "bg-zeus-accent-orange"
  return "bg-zeus-status-destructive"
}

function getScoreLabel(score: number): string {
  if (score >= 90) return "Excellent"
  if (score >= 75) return "Good"
  if (score >= 60) return "Fair"
  return "Needs Improvement"
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })
}

// ============================================================================
// Sub-Components
// ============================================================================

interface ScoreCategoryBarProps {
  category: ScoreCategory
  animate?: boolean
  delay?: number
}

function ScoreCategoryBar({ category, animate = true, delay = 0 }: ScoreCategoryBarProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-caption-l text-zeus-text-secondary">
            {category.name}
          </span>
          <span className="text-caption-m text-zeus-text-tertiary">
            ({(category.weight * 100).toFixed(0)}% weight)
          </span>
        </div>
        <span className={cn(
          "text-body-s font-semibold tabular-nums",
          getScoreColor(category.score)
        )}>
          {category.score.toFixed(1)}
        </span>
      </div>
      <div className="h-2 bg-zeus-surface-default rounded-full overflow-hidden">
        <motion.div
          className={cn("h-full rounded-full", getScoreBarColor(category.score))}
          initial={animate ? { width: 0 } : false}
          animate={{ width: `${category.score}%` }}
          transition={{ duration: 0.6, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

interface OverallScoreDisplayProps {
  score: number
  rank?: number
  percentile?: number
  animate?: boolean
}

function OverallScoreDisplay({ score, rank, percentile, animate = true }: OverallScoreDisplayProps) {
  return (
    <div className="text-center">
      <motion.div
        className="relative inline-flex items-center justify-center"
        initial={animate ? { scale: 0.8, opacity: 0 } : false}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Circular background */}
        <div className="w-32 h-32 rounded-full bg-zeus-surface-default flex items-center justify-center">
          <div className="text-center">
            <span className={cn(
              "text-heading-l font-bold block",
              getScoreColor(score)
            )}>
              {score.toFixed(1)}
            </span>
            <span className="text-caption-m text-zeus-text-tertiary">
              {getScoreLabel(score)}
            </span>
          </div>
        </div>

        {/* Progress ring */}
        <svg
          className="absolute inset-0 -rotate-90"
          viewBox="0 0 128 128"
        >
          <circle
            cx="64"
            cy="64"
            r="58"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-zeus-surface-elevated"
          />
          <motion.circle
            cx="64"
            cy="64"
            r="58"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            className={getScoreColor(score).replace("text-", "text-")}
            style={{
              strokeDasharray: `${2 * Math.PI * 58}`,
            }}
            initial={animate ? { strokeDashoffset: 2 * Math.PI * 58 } : false}
            animate={{ strokeDashoffset: 2 * Math.PI * 58 * (1 - score / 100) }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          />
        </svg>
      </motion.div>

      {/* Rank and percentile */}
      <div className="flex items-center justify-center gap-4 mt-4">
        {rank && (
          <div className="flex items-center gap-1.5 text-zeus-highlight-gold">
            <Trophy className="w-4 h-4" />
            <span className="text-body-s font-semibold">Rank #{rank}</span>
          </div>
        )}
        {percentile && (
          <div className="flex items-center gap-1.5 text-zeus-text-secondary">
            <TrendingUp className="w-4 h-4" />
            <span className="text-caption-l">Top {100 - percentile}%</span>
          </div>
        )}
      </div>
    </div>
  )
}

interface AttestationDisplayProps {
  attestation: AttestationProof
}

function AttestationDisplay({ attestation }: AttestationDisplayProps) {
  return (
    <div className="p-4 rounded-lg bg-zeus-surface-default border border-zeus-border-alpha">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="w-4 h-4 text-zeus-status-success" />
        <span className="text-caption-l font-medium text-zeus-text-primary">
          TEE Attestation
        </span>
        <Badge variant="success" size="sm">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Verified
        </Badge>
      </div>

      <div className="space-y-2 text-caption-m">
        <div className="flex items-center justify-between">
          <span className="text-zeus-text-tertiary">TEE Type</span>
          <span className="font-mono text-zeus-text-primary">
            {attestation.teeType.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-zeus-text-tertiary">Hash</span>
          <span className="font-mono text-zeus-text-secondary truncate max-w-[180px]">
            {attestation.hash.slice(0, 10)}...{attestation.hash.slice(-8)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-zeus-text-tertiary">Generated</span>
          <span className="text-zeus-text-secondary">
            {formatDate(attestation.timestamp)}
          </span>
        </div>
      </div>

      {attestation.verificationUrl && (
        <a
          href={attestation.verificationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-caption-m text-zeus-accent-blue hover:underline mt-3 pt-3 border-t border-zeus-border-alpha"
        >
          Verify on chain
          <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </div>
  )
}

// ============================================================================
// Main Component
// ============================================================================

export interface ScoreBreakdownProps {
  score: EvaluationScore
  attestation?: AttestationProof
  benchmarkName?: string
  completedAt?: number
  durationMs?: number
  className?: string
  /** Whether to animate the score display */
  animate?: boolean
  /** Layout variant */
  variant?: "default" | "compact" | "expanded"
}

export function ScoreBreakdown({
  score,
  attestation,
  benchmarkName,
  completedAt,
  durationMs,
  className,
  animate = true,
  variant = "default"
}: ScoreBreakdownProps) {
  const isCompact = variant === "compact"
  const isExpanded = variant === "expanded"

  if (isCompact) {
    return (
      <div className={cn("flex items-center gap-4", className)}>
        <div className="flex items-center gap-2">
          <span className={cn(
            "text-heading-s font-bold",
            getScoreColor(score.overall)
          )}>
            {score.overall.toFixed(1)}
          </span>
          {score.rank && (
            <Badge variant="gold" size="sm">
              <Trophy className="w-3 h-3 mr-1" />
              #{score.rank}
            </Badge>
          )}
        </div>
        {score.percentile && (
          <span className="text-caption-m text-zeus-text-tertiary">
            Top {100 - score.percentile}%
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={cn(
      "rounded-lg border bg-zeus-surface-neutral border-zeus-border-alpha overflow-hidden",
      className
    )}>
      {/* Header */}
      {(benchmarkName || completedAt) && (
        <div className="px-4 py-3 border-b border-zeus-border-alpha flex items-center justify-between">
          {benchmarkName && (
            <span className="text-caption-l font-medium text-zeus-text-primary">
              {benchmarkName}
            </span>
          )}
          {completedAt && (
            <div className="flex items-center gap-1.5 text-caption-m text-zeus-text-tertiary">
              <Clock className="w-3.5 h-3.5" />
              {formatDate(completedAt)}
              {durationMs && (
                <span className="ml-2">
                  ({Math.round(durationMs / 60000)}m)
                </span>
              )}
            </div>
          )}
        </div>
      )}

      <div className={cn(
        "p-4",
        isExpanded ? "grid grid-cols-1 lg:grid-cols-2 gap-6" : "space-y-6"
      )}>
        {/* Overall score */}
        <div className={isExpanded ? "" : "flex justify-center"}>
          <OverallScoreDisplay
            score={score.overall}
            rank={score.rank}
            percentile={score.percentile}
            animate={animate}
          />
        </div>

        {/* Category breakdown */}
        <div className="space-y-4">
          <h4 className="text-caption-l font-medium text-zeus-text-secondary">
            Category Breakdown
          </h4>
          <div className="space-y-4">
            {score.breakdown.map((category, index) => (
              <ScoreCategoryBar
                key={category.name}
                category={category}
                animate={animate}
                delay={0.1 * (index + 1)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Attestation */}
      {attestation && (
        <div className="p-4 border-t border-zeus-border-alpha">
          <AttestationDisplay attestation={attestation} />
        </div>
      )}
    </div>
  )
}

// ============================================================================
// Inline variant for tables/lists
// ============================================================================

export interface ScoreInlineProps {
  score: number
  rank?: number
  className?: string
}

export function ScoreInline({ score, rank, className }: ScoreInlineProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className={cn(
        "text-body-s font-semibold tabular-nums",
        getScoreColor(score)
      )}>
        {score.toFixed(1)}
      </span>
      {rank && (
        <span className="text-caption-m text-zeus-highlight-gold flex items-center gap-0.5">
          <Trophy className="w-3 h-3" />
          #{rank}
        </span>
      )}
    </div>
  )
}
