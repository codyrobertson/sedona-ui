"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { MyAgent, CompetitionEntry } from "@/types/evaluation"

// ============================================================================
// Helper Functions
// ============================================================================

function formatCurrency(value: string): string {
  return value
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value)
}

// ============================================================================
// Sub-Components
// ============================================================================

interface StatItemProps {
  label: string
  value: string | number
  icon?: React.ReactNode
  change?: number
  className?: string
}

function StatItem({ label, value, icon, change, className }: StatItemProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="text-caption-m text-zeus-text-tertiary flex items-center gap-1.5">
        {icon}
        {label}
      </span>
      <div className="flex items-center gap-2">
        <span className="text-body-s font-semibold text-zeus-text-primary">
          {typeof value === "number" ? formatNumber(value) : value}
        </span>
        {change !== undefined && (
          <span className={cn(
            "text-caption-m flex items-center gap-0.5",
            change >= 0 ? "text-zeus-status-success" : "text-zeus-status-destructive"
          )}>
            {change >= 0 ? (
              <Icon icon="arrow-trend-up" className="w-3 h-3" />
            ) : (
              <Icon icon="arrow-trend-down" className="w-3 h-3" />
            )}
            {Math.abs(change).toFixed(1)}%
          </span>
        )}
      </div>
    </div>
  )
}

interface CompetitionBadgeProps {
  entry: CompetitionEntry
  className?: string
}

function CompetitionBadge({ entry, className }: CompetitionBadgeProps) {
  const isActive = entry.competition.status === "active"
  const hasPlacement = entry.finalRank !== undefined

  return (
    <div className={cn(
      "flex items-center gap-2 px-3 py-2 rounded-lg bg-zeus-surface-default border border-zeus-border-alpha",
      className
    )}>
      <Icon icon="trophy" className={cn(
        "w-4 h-4",
        hasPlacement && entry.finalRank !== undefined && entry.finalRank <= 3
          ? "text-zeus-highlight-gold"
          : isActive
            ? "text-sedona-400"
            : "text-zeus-text-tertiary"
      )} />
      <div className="flex-1 min-w-0">
        <p className="text-caption-l font-medium text-zeus-text-primary truncate">
          {entry.competition.name}
        </p>
        <p className="text-caption-m text-zeus-text-tertiary">
          {isActive ? (
            <span className="text-sedona-400">Active - In Progress</span>
          ) : hasPlacement ? (
            <>
              Rank #{entry.finalRank}
              {entry.prize && <span className="text-zeus-highlight-gold ml-2">{entry.prize}</span>}
            </>
          ) : (
            "Participated"
          )}
        </p>
      </div>
      {isActive && (
        <Icon icon="spinner-third" spin className="w-3.5 h-3.5 text-sedona-400" />
      )}
    </div>
  )
}

// ============================================================================
// Main Component
// ============================================================================

export interface MyAgentCardProps {
  agent: MyAgent
  className?: string
  /** Called when user clicks to view agent details */
  onViewDetails?: (agent: MyAgent) => void
  /** Called when user clicks to trade the agent's token */
  onTrade?: (agent: MyAgent) => void
  /** Called when user wants to add new weights */
  onAddWeights?: (agent: MyAgent) => void
}

export function MyAgentCard({
  agent,
  className,
  onViewDetails,
  onTrade,
  onAddWeights
}: MyAgentCardProps) {
  const hasToken = !!agent.token
  const hasCurrentCompetition = !!agent.currentCompetition
  const activeVersion = agent.activeVersion
  const isEvaluating = agent.versions.some(v => v.status === "evaluating")

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-xl border bg-zeus-surface-neutral border-zeus-border-alpha overflow-hidden",
        "hover:border-zeus-border-normal transition-colors",
        className
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-zeus-border-alpha">
        <div className="flex items-start gap-3">
          {/* Agent avatar */}
          {agent.imageUrl ? (
            <img
              src={agent.imageUrl}
              alt={agent.name}
              className="w-12 h-12 rounded-lg bg-zeus-surface-default"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-zeus-surface-default flex items-center justify-center">
              <span className="text-lg font-bold text-zeus-text-tertiary">
                {agent.ticker.charAt(0)}
              </span>
            </div>
          )}

          {/* Agent info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-body-s font-semibold text-zeus-text-primary truncate">
                {agent.name}
              </h3>
              <Badge variant="default" size="sm" className="shrink-0">
                ${agent.ticker}
              </Badge>
            </div>
            <p className="text-caption-m text-zeus-text-secondary mt-0.5 line-clamp-2">
              {agent.description}
            </p>
          </div>

          {/* Status indicators */}
          <div className="flex flex-col items-end gap-1 shrink-0">
            {isEvaluating && (
              <Badge variant="warning" size="sm" showPulse pulseColor="bg-zeus-accent-orange">
                <Icon icon="spinner-third" spin className="w-3 h-3 mr-1" />
                Evaluating
              </Badge>
            )}
            {hasCurrentCompetition && (
              <Badge variant="brand" size="sm">
                <Icon icon="trophy" className="w-3 h-3 mr-1" />
                Competing
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-zeus-border-alpha">
        <StatItem
          label="Best Score"
          value={agent.analytics.bestScore.toFixed(1)}
          icon={<Icon icon="chart-bar" className="w-3 h-3" />}
        />
        <StatItem
          label="Evaluations"
          value={agent.analytics.totalEvaluations}
          icon={<Icon icon="award" className="w-3 h-3" />}
        />
        {agent.token ? (
          <>
            <StatItem
              label="Market Cap"
              value={agent.token.marketCap}
              icon={<Icon icon="coins" className="w-3 h-3" />}
              change={agent.token.priceChange24h}
            />
            <StatItem
              label="Holders"
              value={agent.token.holders}
              icon={<Icon icon="users" className="w-3 h-3" />}
            />
          </>
        ) : (
          <>
            <StatItem
              label="Competitions"
              value={agent.analytics.competitionsEntered}
              icon={<Icon icon="trophy" className="w-3 h-3" />}
            />
            <StatItem
              label="Prize Earnings"
              value={agent.analytics.totalPrizeEarnings || "-"}
              icon={<Icon icon="coins" className="w-3 h-3" />}
            />
          </>
        )}
      </div>

      {/* Active Version */}
      <div className="p-4 border-b border-zeus-border-alpha">
        <div className="flex items-center justify-between mb-2">
          <span className="text-caption-m text-zeus-text-tertiary">Active Version</span>
          <a
            href={activeVersion.huggingFace.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-caption-m text-sedona-400 hover:underline"
          >
            <span className="font-mono">{activeVersion.huggingFace.commitHashShort}</span>
            <Icon icon="arrow-up-right-from-square" className="w-3 h-3" />
          </a>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-body-s text-zeus-text-primary">
            v{activeVersion.versionNumber}
          </span>
          {activeVersion.evaluation && (
            <div className="flex items-center gap-3">
              <span className="text-body-s font-semibold text-zeus-text-primary">
                Score: {activeVersion.evaluation.score.overall.toFixed(1)}
              </span>
              {activeVersion.evaluation.score.percentile && (
                <Badge variant="success" size="sm">
                  Top {100 - activeVersion.evaluation.score.percentile}%
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Competition status */}
      {hasCurrentCompetition && (
        <div className="p-4 border-b border-zeus-border-alpha">
          <span className="text-caption-m text-zeus-text-tertiary block mb-2">
            Current Competition
          </span>
          <CompetitionBadge entry={agent.currentCompetition!} />
        </div>
      )}

      {/* Previous competitions */}
      {agent.competitionHistory.length > 0 && !hasCurrentCompetition && (
        <div className="p-4 border-b border-zeus-border-alpha">
          <span className="text-caption-m text-zeus-text-tertiary block mb-2">
            Competition History
          </span>
          <div className="space-y-2">
            {agent.competitionHistory.slice(0, 2).map((entry) => (
              <CompetitionBadge key={entry.competitionId} entry={entry} />
            ))}
            {agent.competitionHistory.length > 2 && (
              <button className="text-caption-m text-zeus-text-secondary hover:text-zeus-text-primary">
                +{agent.competitionHistory.length - 2} more competitions
              </button>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="p-4 flex items-center gap-2">
        {hasToken && onTrade && (
          <Button
            variant="default"
            size="sm"
            onClick={() => onTrade(agent)}
            className="flex-1"
          >
            Trade ${agent.ticker}
          </Button>
        )}
        {onAddWeights && (
          <Button
            variant={hasToken ? "outline" : "default"}
            size="sm"
            onClick={() => onAddWeights(agent)}
            className={hasToken ? "" : "flex-1"}
          >
            Add Weights
          </Button>
        )}
        {onViewDetails && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewDetails(agent)}
            icon={<Icon icon="chevron-right" className="w-4 h-4" />}
            iconPosition="right"
            className="ml-auto"
          >
            Details
          </Button>
        )}
      </div>
    </motion.div>
  )
}

// ============================================================================
// Compact variant for list views
// ============================================================================

export interface MyAgentCardCompactProps {
  agent: MyAgent
  className?: string
  onClick?: (agent: MyAgent) => void
}

export function MyAgentCardCompact({
  agent,
  className,
  onClick
}: MyAgentCardCompactProps) {
  const hasToken = !!agent.token
  const isEvaluating = agent.versions.some(v => v.status === "evaluating")

  return (
    <button
      onClick={() => onClick?.(agent)}
      className={cn(
        "w-full px-4 py-3 flex items-center gap-3 text-left rounded-lg",
        "bg-zeus-surface-neutral border border-zeus-border-alpha",
        "hover:bg-zeus-surface-elevated hover:border-zeus-border-normal transition-colors",
        className
      )}
    >
      {/* Avatar */}
      {agent.imageUrl ? (
        <img
          src={agent.imageUrl}
          alt={agent.name}
          className="w-10 h-10 rounded-lg bg-zeus-surface-default shrink-0"
        />
      ) : (
        <div className="w-10 h-10 rounded-lg bg-zeus-surface-default flex items-center justify-center shrink-0">
          <span className="text-sm font-bold text-zeus-text-tertiary">
            {agent.ticker.charAt(0)}
          </span>
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-body-s font-medium text-zeus-text-primary truncate">
            {agent.name}
          </span>
          <Badge variant="default" size="sm">${agent.ticker}</Badge>
        </div>
        <div className="flex items-center gap-3 mt-0.5">
          <span className="text-caption-m text-zeus-text-secondary">
            Score: {agent.analytics.bestScore.toFixed(1)}
          </span>
          {agent.token && (
            <span className={cn(
              "text-caption-m",
              agent.token.priceChange24h >= 0
                ? "text-zeus-status-success"
                : "text-zeus-status-destructive"
            )}>
              {agent.token.priceChange24h >= 0 ? "+" : ""}
              {agent.token.priceChange24h.toFixed(1)}%
            </span>
          )}
        </div>
      </div>

      {/* Status */}
      {isEvaluating && (
        <Icon icon="spinner-third" spin className="w-4 h-4 text-sedona-400 shrink-0" />
      )}

      <Icon icon="chevron-right" className="w-4 h-4 text-zeus-text-tertiary shrink-0" />
    </button>
  )
}
