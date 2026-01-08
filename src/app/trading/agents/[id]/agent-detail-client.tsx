"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"
import { Header, PlatformStats } from "@/components/trading"
import { useAgentLaunch, useGPUDeploy } from "@/contexts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { StatRow } from "@/components/ui/stat-row"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { getDummyPools } from "@/lib/dummy-data"
import { formatDate, formatTimeAgo } from "@/lib/date-utils"
import { getMockAgent } from "@/fixtures/my-agents"
import type { AgentVersion, MyAgent } from "@/types/evaluation"

const MARQUEE_POOLS = getDummyPools(30)

// ============================================================================
// Version Row Component
// ============================================================================

interface VersionRowProps {
  version: AgentVersion
  isActive: boolean
  onClick: () => void
}

function VersionRow({ version, isActive, onClick }: VersionRowProps) {
  const isEvaluating = version.status === "evaluating"
  const hasScore = version.evaluation?.score.overall !== undefined

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 px-4 py-3.5 text-left transition-all duration-150 group",
        "border-b border-zeus-border-alpha border-l-2 border-l-transparent last:border-b-0",
        "hover:bg-zeus-surface-neutral",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sedona-500/50",
        isActive && "bg-zeus-surface-neutral !border-l-sedona-500"
      )}
    >
      {/* Version Number */}
      <div className="w-12 shrink-0">
        <span className="text-body-s font-semibold text-zeus-text-primary tabular-nums">
          v{version.versionNumber}
        </span>
      </div>

      {/* Commit Hash */}
      <div className="flex items-center gap-1.5 min-w-[100px]">
        <Icon icon="code-commit" className="w-3.5 h-3.5 text-zeus-text-tertiary" />
        <span className="text-caption-l font-mono text-zeus-text-secondary">
          {version.huggingFace.commitHashShort}
        </span>
      </div>

      {/* Score or Progress */}
      <div className="flex-1">
        {isEvaluating && version.evaluationProgress ? (
          <div className="flex items-center gap-3">
            <Progress value={version.evaluationProgress.progress} className="h-1.5 flex-1 max-w-[120px] [&>div]:bg-sedona-500" />
            <span className="text-caption-s font-mono text-zeus-text-tertiary tabular-nums">
              {version.evaluationProgress.progress}%
            </span>
          </div>
        ) : hasScore ? (
          <span className="text-body-s font-bold text-zeus-status-success tabular-nums">
            {version.evaluation!.score.overall.toFixed(1)}
          </span>
        ) : (
          <span className="text-caption-l text-zeus-text-tertiary">—</span>
        )}
      </div>

      {/* Status */}
      <div className="w-24 text-right">
        {version.status === "active" && (
          <Badge variant="success" size="sm">Active</Badge>
        )}
        {version.status === "evaluating" && (
          <Badge variant="warning" size="sm" showPulse pulseColor="bg-zeus-accent-orange">
            <Icon icon="spinner-third" spin className="w-3 h-3 mr-1" />
            Eval
          </Badge>
        )}
        {version.status === "historical" && (
          <span className="text-caption-s text-zeus-text-tertiary">{formatTimeAgo(version.createdAt)}</span>
        )}
      </div>

      <Icon icon="chevron-right" className="w-4 h-4 text-zeus-text-tertiary shrink-0 group-hover:text-zeus-text-secondary group-hover:translate-x-0.5 transition-all" />
    </button>
  )
}

// ============================================================================
// Agent Stats Card
// ============================================================================

interface AgentStatsCardProps {
  agent: MyAgent
  onTrade?: () => void
  onAddWeights?: () => void
  onDeploy?: () => void
}

function AgentStatsCard({ agent, onTrade, onAddWeights, onDeploy }: AgentStatsCardProps) {
  const hasToken = !!agent.token

  return (
    <div className="rounded-xl border border-zeus-border-alpha bg-zeus-surface-elevated overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-zeus-border-alpha">
        <div className="flex items-center gap-3 mb-3">
          {agent.imageUrl ? (
            <img src={agent.imageUrl} alt={agent.name} className="w-12 h-12 rounded-xl bg-zeus-surface-default" />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-zeus-surface-default flex items-center justify-center">
              <Icon icon="robot" className="w-6 h-6 text-zeus-text-tertiary" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-body-m font-bold text-zeus-text-primary truncate">{agent.name}</h2>
              <Badge variant="default" size="sm">${agent.ticker}</Badge>
            </div>
            <p className="text-caption-l text-zeus-text-tertiary truncate">{agent.description}</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-2.5 rounded-lg bg-zeus-surface-neutral">
            <div className="text-body-s font-bold text-zeus-text-primary tabular-nums">{agent.analytics.bestScore.toFixed(1)}</div>
            <div className="text-caption-s text-zeus-text-tertiary">Best Score</div>
          </div>
          <div className="text-center p-2.5 rounded-lg bg-zeus-surface-neutral">
            <div className="text-body-s font-bold text-zeus-text-primary tabular-nums">{agent.versions.length}</div>
            <div className="text-caption-s text-zeus-text-tertiary">Versions</div>
          </div>
          <div className="text-center p-2.5 rounded-lg bg-zeus-surface-neutral">
            <div className="text-body-s font-bold text-zeus-text-primary tabular-nums">{agent.analytics.competitionsEntered}</div>
            <div className="text-caption-s text-zeus-text-tertiary">Competitions</div>
          </div>
        </div>
      </div>

      {/* Token Stats (if launched) */}
      {hasToken && (
        <div className="p-4 border-b border-zeus-border-alpha">
          <h3 className="text-caption-s font-semibold text-zeus-text-tertiary uppercase tracking-wide mb-3">Token</h3>
          <StatRow label="Price" value={agent.token!.price} valueColor={agent.token!.priceChange24h >= 0 ? "text-zeus-status-success" : "text-zeus-status-destructive"} />
          <StatRow label="Market Cap" value={agent.token!.marketCap} />
          <StatRow label="24h Volume" value={agent.token!.volume24h} />
          <StatRow label="Holders" value={agent.token!.holders.toLocaleString()} />
        </div>
      )}

      {/* Active Version */}
      <div className="p-4 border-b border-zeus-border-alpha">
        <h3 className="text-caption-s font-semibold text-zeus-text-tertiary uppercase tracking-wide mb-3">Active Version</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-body-s font-semibold text-zeus-text-primary">v{agent.activeVersion.versionNumber}</span>
            <a
              href={agent.activeVersion.huggingFace.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-caption-l font-mono text-sedona-400 hover:underline"
            >
              {agent.activeVersion.huggingFace.commitHashShort}
              <Icon icon="arrow-up-right-from-square" className="w-3 h-3" />
            </a>
          </div>
          {agent.activeVersion.evaluation && (
            <div className="flex items-center gap-2">
              <span className="text-body-s font-bold text-zeus-status-success">
                {agent.activeVersion.evaluation.score.overall.toFixed(1)}
              </span>
              {agent.activeVersion.evaluation.score.rank && (
                <Badge variant="gold" size="sm">#{agent.activeVersion.evaluation.score.rank}</Badge>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Current Competition */}
      {agent.currentCompetition && (
        <div className="p-4 border-b border-zeus-border-alpha">
          <h3 className="text-caption-s font-semibold text-zeus-text-tertiary uppercase tracking-wide mb-3">Competition</h3>
          <div className="flex items-center gap-2">
            <Icon icon="trophy" className="w-4 h-4 text-sedona-400" />
            <span className="text-body-s text-zeus-text-primary flex-1 truncate">
              {agent.currentCompetition.competition.name}
            </span>
            <Badge variant="brand" size="sm">Active</Badge>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="p-4 flex flex-col gap-2.5">
        {hasToken && onTrade && (
          <Button variant="default" size="lg" onClick={onTrade} className="w-full">
            Trade ${agent.ticker}
          </Button>
        )}
        {onDeploy && (
          <Button variant="secondary" size="lg" onClick={onDeploy} className="w-full">
            <Icon icon="server" className="w-4 h-4 mr-2" />
            Deploy Model
          </Button>
        )}
        {onAddWeights && (
          <Button variant={hasToken ? "outline" : "default"} size="lg" onClick={onAddWeights} className="w-full">
            Add New Weights
          </Button>
        )}
        <a
          href={agent.activeVersion.huggingFace.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button variant="ghost" size="sm" className="w-full" icon={<Icon icon="arrow-up-right-from-square" className="w-3.5 h-3.5" />} iconPosition="right">
            View on HuggingFace
          </Button>
        </a>
      </div>
    </div>
  )
}

// ============================================================================
// Version Detail Sheet
// ============================================================================

interface VersionDetailSheetProps {
  version: AgentVersion | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSetActive?: (version: AgentVersion) => void
}

function VersionDetailSheet({ version, open, onOpenChange, onSetActive }: VersionDetailSheetProps) {
  if (!version) return null

  const isEvaluating = version.status === "evaluating"
  const hasEvaluation = !!version.evaluation

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="pb-4 border-b border-zeus-border-alpha">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-zeus-surface-default flex items-center justify-center">
              <Icon icon="code-commit" className="w-5 h-5 text-zeus-text-tertiary" />
            </div>
            <div>
              <SheetTitle>Version {version.versionNumber}</SheetTitle>
              <SheetDescription className="font-mono">
                {version.huggingFace.commitHashShort}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <span className="text-caption-l text-zeus-text-tertiary">Status</span>
            {version.status === "active" && (
              <Badge variant="success" size="sm">Active</Badge>
            )}
            {version.status === "evaluating" && (
              <Badge variant="warning" size="sm" showPulse pulseColor="bg-zeus-accent-orange">
                <Icon icon="spinner-third" spin className="w-3 h-3 mr-1" />
                Evaluating
              </Badge>
            )}
            {version.status === "historical" && (
              <Badge variant="default" size="sm">Historical</Badge>
            )}
            {version.status === "failed" && (
              <Badge variant="destructive" size="sm">Failed</Badge>
            )}
          </div>

          {/* Evaluation Progress (if evaluating) */}
          {isEvaluating && version.evaluationProgress && (
            <div className="rounded-lg border border-zeus-border-alpha bg-zeus-surface-default p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-caption-s font-semibold text-zeus-text-tertiary uppercase tracking-wide">
                  Evaluation Progress
                </span>
                <span className="text-caption-l font-mono text-zeus-text-secondary tabular-nums">
                  {version.evaluationProgress.progress}%
                </span>
              </div>
              <Progress value={version.evaluationProgress.progress} className="h-2 [&>div]:bg-sedona-500 mb-2" />
              <div className="flex items-center justify-between text-caption-s text-zeus-text-tertiary">
                <span className="capitalize">{version.evaluationProgress.currentStep.replace(/_/g, " ")}</span>
                <span className="flex items-center gap-1">
                  <Icon icon="clock" className="w-3 h-3" />
                  {Math.floor(version.evaluationProgress.elapsedTimeMs / 60000)}m elapsed
                </span>
              </div>
            </div>
          )}

          {/* Score (if evaluated) */}
          {hasEvaluation && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-caption-s font-semibold text-zeus-text-tertiary uppercase tracking-wide">
                  Overall Score
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-heading-s font-bold text-zeus-status-success tabular-nums">
                    {version.evaluation!.score.overall.toFixed(1)}
                  </span>
                  {version.evaluation!.score.rank && (
                    <Badge variant="gold" size="sm">#{version.evaluation!.score.rank}</Badge>
                  )}
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="rounded-lg border border-zeus-border-alpha bg-zeus-surface-default p-4 space-y-3">
                <span className="text-caption-s font-semibold text-zeus-text-tertiary uppercase tracking-wide">
                  Breakdown
                </span>
                {version.evaluation!.score.breakdown.map((category) => (
                  <div key={category.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-caption-l text-zeus-text-secondary capitalize">{category.name}</span>
                      <span className="text-caption-l font-medium text-zeus-text-primary tabular-nums">
                        {category.score.toFixed(1)}
                      </span>
                    </div>
                    <Progress value={category.score} className="h-1.5" />
                  </div>
                ))}
              </div>

              {/* Attestation */}
              {version.evaluation!.attestation && (
                <div className="rounded-lg border border-zeus-border-alpha bg-zeus-surface-default p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon icon="circle-check" className="w-4 h-4 text-zeus-status-success" />
                    <span className="text-caption-s font-semibold text-zeus-text-tertiary uppercase tracking-wide">
                      TEE Attestation
                    </span>
                  </div>
                  <p className="text-caption-l font-mono text-zeus-text-secondary break-all">
                    {version.evaluation!.attestation.hash.slice(0, 32)}...
                  </p>
                  <p className="text-caption-s text-zeus-text-tertiary mt-1">
                    {version.evaluation!.attestation.teeType.toUpperCase()} verified
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Details */}
          <div className="space-y-3">
            <span className="text-caption-s font-semibold text-zeus-text-tertiary uppercase tracking-wide">
              Details
            </span>
            <StatRow label="Created" value={formatDate(version.createdAt)} />
            <StatRow label="Commit" value={version.huggingFace.commitHashShort} valueClassName="font-mono" />
            {version.huggingFace.branch && (
              <StatRow label="Branch" value={version.huggingFace.branch} />
            )}
            {version.notes && (
              <div className="pt-2">
                <span className="text-caption-s text-zeus-text-tertiary">Notes</span>
                <p className="text-body-s text-zeus-text-secondary mt-1">{version.notes}</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-4 border-t border-zeus-border-alpha">
            <a
              href={version.huggingFace.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button variant="outline" size="lg" className="w-full" icon={<Icon icon="arrow-up-right-from-square" className="w-4 h-4" />} iconPosition="right">
                View on HuggingFace
              </Button>
            </a>
            {version.status === "historical" && onSetActive && (
              <Button
                variant="default"
                size="lg"
                className="w-full"
                onClick={() => onSetActive(version)}
              >
                Set as Active Version
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

// ============================================================================
// Main Page Component
// ============================================================================

interface AgentDetailClientProps {
  agentId: string
}

export default function AgentDetailClient({ agentId }: AgentDetailClientProps) {
  const router = useRouter()
  const { openCreateAgent } = useAgentLaunch()
  const { openDeployModal } = useGPUDeploy()
  const agent = getMockAgent(agentId)

  // Version sheet state
  const [selectedVersion, setSelectedVersion] = React.useState<AgentVersion | null>(null)
  const [sheetOpen, setSheetOpen] = React.useState(false)

  const handleDisconnect = () => router.push("/trading")
  const handleBack = () => router.push("/trading/portfolio")
  const handleTrade = () => agent?.ticker && router.push(`/trading/${agent.ticker}`)
  const handleAddWeights = () => console.log("Add weights")
  const handleDeploy = () => {
    if (agent) {
      openDeployModal({
        id: agent.id,
        name: agent.name,
        ticker: agent.ticker,
      })
    }
  }
  const handleVersionClick = (version: AgentVersion) => {
    setSelectedVersion(version)
    setSheetOpen(true)
  }
  const handleSetActive = (version: AgentVersion) => {
    console.log("Set active:", version.id)
    setSheetOpen(false)
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-zeus-surface-default">
        <Header isAuthenticated={true} walletAddress="J181...U7Wi" balance="0.00 SOL" onCreateCoin={openCreateAgent} onDisconnect={handleDisconnect} />
        <main className="px-6 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-heading-m text-zeus-text-primary mb-4">Agent Not Found</h1>
            <p className="text-zeus-text-secondary mb-6">The agent you&apos;re looking for doesn&apos;t exist.</p>
            <Button onClick={handleBack} variant="default">Back to Portfolio</Button>
          </div>
        </main>
      </div>
    )
  }

  // Find evaluating version
  const evaluatingVersion = agent.versions.find(v => v.status === "evaluating")

  return (
    <div className="h-screen bg-zeus-surface-default flex flex-col overflow-hidden">
      <Header isAuthenticated={true} walletAddress="J181...U7Wi" balance="0.00 SOL" onCreateCoin={openCreateAgent} onDisconnect={handleDisconnect} />

      <main className="flex flex-col flex-1 min-h-0 overflow-hidden">
        <h1 className="sr-only">{agent.name} - Agent Details</h1>

        <section aria-label="Platform Statistics">
          <PlatformStats endsIn="0m 0s" jackpot="$201" tokens={1} topPools={MARQUEE_POOLS} />
        </section>

        {/* Back + Title - outside columns so both align */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-2">
          <Button variant="ghost" size="sm" onClick={handleBack} icon={<Icon icon="arrow-left" className="w-4 h-4" />}>
            Back
          </Button>
          <span className="text-zeus-text-tertiary">/</span>
          <h2 className="text-body-m font-semibold text-zeus-text-primary">{agent.name}</h2>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-4 px-4 pt-2 pb-16 flex-1 min-h-0 overflow-y-auto lg:overflow-hidden">
          {/* Left Column - Version History */}
          <section className="flex-1 min-w-0 flex flex-col gap-4 lg:min-h-0" aria-label="Version History">
            {/* Evaluation Progress (if any) */}
            {evaluatingVersion?.evaluationProgress && (
              <div className="rounded-xl border border-zeus-border-alpha bg-zeus-surface-elevated p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Icon icon="spinner-third" spin className="w-4 h-4 text-sedona-400" />
                    <span className="text-body-s font-medium text-zeus-text-primary">Evaluating v{evaluatingVersion.versionNumber}</span>
                  </div>
                  <div className="flex items-center gap-3 text-caption-l text-zeus-text-tertiary">
                    <span className="flex items-center gap-1">
                      <Icon icon="clock" className="w-3.5 h-3.5" />
                      {Math.floor(evaluatingVersion.evaluationProgress.elapsedTimeMs / 60000)}m
                    </span>
                    <span>{evaluatingVersion.evaluationProgress.progress}%</span>
                  </div>
                </div>
                <Progress value={evaluatingVersion.evaluationProgress.progress} className="h-2 [&>div]:bg-sedona-500" />
                <p className="text-caption-s text-zeus-text-tertiary mt-2">
                  {evaluatingVersion.evaluationProgress.currentStep.replace(/_/g, " ")}
                </p>
              </div>
            )}

            {/* Version List */}
            <div className="rounded-xl border border-zeus-border-alpha bg-zeus-surface-elevated overflow-hidden flex-1 flex flex-col min-h-0">
              <div className="px-4 py-3 border-b border-zeus-border-alpha flex items-center justify-between shrink-0">
                <h3 className="text-body-s font-semibold text-zeus-text-primary">Version History</h3>
                <Badge variant="default" size="sm">{agent.versions.length}</Badge>
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-[52px_100px_1fr_96px_20px] gap-4 px-4 py-2.5 border-b border-zeus-border-alpha text-caption-s text-zeus-text-quaternary uppercase tracking-wide shrink-0">
                <div>Ver</div>
                <div>Commit</div>
                <div>Score</div>
                <div className="text-right">Status</div>
                <div></div>
              </div>

              {/* Version Rows */}
              <div className="overflow-y-auto flex-1">
                {agent.versions.map((version) => (
                  <VersionRow
                    key={version.id}
                    version={version}
                    isActive={version.status === "active"}
                    onClick={() => handleVersionClick(version)}
                  />
                ))}
              </div>
            </div>

            {/* Score Breakdown (for active version) */}
            {agent.activeVersion.evaluation && (
              <div className="rounded-xl border border-zeus-border-alpha bg-zeus-surface-elevated p-4">
                <h3 className="text-caption-s font-semibold text-zeus-text-tertiary uppercase tracking-wide mb-4">Score Breakdown</h3>
                <div className="space-y-4">
                  {agent.activeVersion.evaluation.score.breakdown.map((category) => (
                    <div key={category.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-caption-l text-zeus-text-secondary">{category.name}</span>
                        <span className="text-caption-l font-medium text-zeus-text-primary tabular-nums">{category.score.toFixed(1)}</span>
                      </div>
                      <Progress value={category.score} className="h-1.5" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Right Column - Stats Card */}
          <aside className="hidden lg:flex lg:flex-col w-[380px] flex-shrink-0" aria-label="Agent Stats">
            <AgentStatsCard agent={agent} onTrade={handleTrade} onAddWeights={handleAddWeights} onDeploy={handleDeploy} />
          </aside>

          {/* Mobile Stats Card */}
          <div className="lg:hidden">
            <AgentStatsCard agent={agent} onTrade={handleTrade} onAddWeights={handleAddWeights} onDeploy={handleDeploy} />
          </div>
        </div>
      </main>

      {/* Version Detail Sheet */}
      <VersionDetailSheet
        version={selectedVersion}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onSetActive={handleSetActive}
      />
    </div>
  )
}
