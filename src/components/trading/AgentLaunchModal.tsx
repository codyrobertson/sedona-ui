"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Search, Bot, ExternalLink, Zap, TrendingUp, Shield } from "lucide-react"
import { SedonaLogo } from "@/components/sedona/sedona-logo"

export interface AgentModel {
  id: string
  name: string
  description?: string
  strategy?: string
  performance?: string
}

export interface AgentLaunchModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  models?: AgentModel[]
  isAuthenticated?: boolean
  onSignIn?: () => void
  onSelectModel?: (modelId: string) => void
  onLaunch?: (modelId: string) => void
}

const DEFAULT_AGENTS: AgentModel[] = [
  { id: "1", name: "Alpha Trader", description: "High-frequency trading", strategy: "Momentum", performance: "+24.5%" },
  { id: "2", name: "Momentum Bot", description: "Trend following", strategy: "Breakout", performance: "+18.2%" },
  { id: "3", name: "Arbitrage AI", description: "Cross-DEX arbitrage", strategy: "Arbitrage", performance: "+12.8%" },
  { id: "4", name: "Sentiment Scout", description: "Social sentiment analysis", strategy: "Sentiment", performance: "+31.4%" },
  { id: "5", name: "Whale Watcher", description: "Large wallet tracking", strategy: "Copy Trading", performance: "+15.6%" },
]

const AgentLaunchModal = ({
  open,
  onOpenChange,
  models = DEFAULT_AGENTS,
  isAuthenticated = true,
  onSignIn,
  onSelectModel,
  onLaunch,
}: AgentLaunchModalProps) => {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedModel, setSelectedModel] = React.useState<string | null>(null)

  const filteredModels = models.filter((model) =>
    model.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleModelSelect = (modelId: string) => {
    if (!isAuthenticated) return
    setSelectedModel(modelId)
    onSelectModel?.(modelId)
  }

  const selectedAgent = models.find(m => m.id === selectedModel)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[640px] bg-zeus-surface-neutral border-zeus-border-alpha p-0 gap-0 rounded-lg overflow-hidden [&>button]:hidden">
        {/* Two Column Layout */}
        <div className="grid grid-cols-[260px_1fr] min-h-[380px]">
          {/* Left Column - Agent List */}
          <div className="p-4 border-r border-zeus-border-alpha flex flex-col">
            <h3 className="text-zeus-text-secondary text-caption-s uppercase tracking-wide mb-3">
              Select Agent
            </h3>

            {/* Search */}
            <div className="relative mb-3">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zeus-text-tertiary" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zeus-surface-default border border-zeus-border-alpha rounded pl-8 pr-3 py-2 text-caption-l text-zeus-text-primary placeholder:text-zeus-text-tertiary focus:outline-none focus:border-zeus-border-normal"
              />
            </div>

            {/* Agent List */}
            <div className={cn(
              "flex-1 overflow-y-auto space-y-1",
              !isAuthenticated && "blur-[2px] pointer-events-none select-none"
            )}>
              {filteredModels.map((model) => {
                const isSelected = selectedModel === model.id
                return (
                  <button
                    key={model.id}
                    onClick={() => handleModelSelect(model.id)}
                    disabled={!isAuthenticated}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-3 rounded text-left transition-all border",
                      isSelected
                        ? "bg-sedona-500/10 border-sedona-500/40"
                        : "border-zeus-border-alpha hover:bg-zeus-surface-neutral-subtle"
                    )}
                  >
                    <div className="w-9 h-9 rounded bg-zeus-surface-elevated flex items-center justify-center text-caption-l font-medium text-zeus-text-secondary shrink-0">
                      {model.name.charAt(0)}
                    </div>
                    <span className="flex-1 text-zeus-text-primary text-body-s font-medium truncate">
                      {model.name}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] text-sedona-500 font-medium px-1.5 py-0.5 bg-sedona-500/10 rounded shrink-0">
                        SELECTED
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right Column - Agent Details */}
          <div className="p-5 flex flex-col">
            <h3 className="text-zeus-text-secondary text-caption-s uppercase tracking-wide mb-4">
              {!isAuthenticated ? "Connect Account" : "Agent Details"}
            </h3>

            {!isAuthenticated ? (
              // Not Logged In State - Card style like wallet dialog
              <>
                <div className="flex-1 bg-zeus-surface-elevated border border-zeus-border-alpha rounded-lg p-5 mb-8">
                  <div className="w-10 h-10 rounded-lg bg-sedona-500/15 flex items-center justify-center mb-4">
                    <SedonaLogo variant="logomark" size="sm" className="text-sedona-500" />
                  </div>
                  <h4 className="text-zeus-text-primary text-body-m font-semibold mb-2">
                    Sign in with Hugging Face
                  </h4>
                  <p className="text-zeus-text-secondary text-caption-l mb-5">
                    Connect your Hugging Face account to access your models and launch AI agents on Sedona.
                  </p>
                  <Button
                    onClick={onSignIn}
                    className="w-full bg-sedona-500/30 hover:bg-sedona-500/40 text-sedona-400 border-0"
                  >
                    Sign in with Hugging Face
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zeus-text-tertiary text-caption-s">
                    New to Hugging Face?
                  </span>
                  <a
                    href="https://huggingface.co/join"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sedona-500 text-caption-s font-medium hover:underline"
                  >
                    Create Account
                  </a>
                </div>
              </>
            ) : !selectedAgent ? (
              // Default Info State (Logged In)
              <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                <div className="w-14 h-14 rounded-xl bg-sedona-500/15 flex items-center justify-center mb-5">
                  <Bot className="w-7 h-7 text-sedona-500" />
                </div>
                <h4 className="text-zeus-text-primary text-body-m font-semibold mb-2">
                  Select an Agent
                </h4>
                <p className="text-zeus-text-secondary text-caption-l mb-6 max-w-[260px]">
                  Choose an agent from the list to view its strategy and performance before launching.
                </p>
                <Button variant="secondary" size="sm">
                  Learn More
                  <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </div>
            ) : (
              // Selected Agent State
              <>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-zeus-text-primary text-body-m font-semibold">
                    {selectedAgent.name}
                  </h3>
                </div>
                <p className="text-zeus-text-secondary text-caption-l mb-5">
                  {selectedAgent.description}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="bg-zeus-surface-elevated rounded-lg p-3">
                    <div className="flex items-center gap-1.5 text-zeus-text-tertiary text-caption-s mb-1">
                      <Zap className="w-3 h-3" />
                      Strategy
                    </div>
                    <div className="text-zeus-text-primary text-caption-l font-medium">
                      {selectedAgent.strategy}
                    </div>
                  </div>
                  <div className="bg-zeus-surface-elevated rounded-lg p-3">
                    <div className="flex items-center gap-1.5 text-zeus-text-tertiary text-caption-s mb-1">
                      <TrendingUp className="w-3 h-3" />
                      30d Return
                    </div>
                    <div className="text-zeus-status-success text-caption-l font-medium">
                      {selectedAgent.performance}
                    </div>
                  </div>
                  <div className="bg-zeus-surface-elevated rounded-lg p-3">
                    <div className="flex items-center gap-1.5 text-zeus-text-tertiary text-caption-s mb-1">
                      <Shield className="w-3 h-3" />
                      Risk Level
                    </div>
                    <div className="text-zeus-text-primary text-caption-l font-medium">
                      Medium
                    </div>
                  </div>
                </div>

                {/* Launch Button */}
                <Button
                  variant="brand"
                  className="w-full mb-4"
                  onClick={() => onLaunch?.(selectedAgent.id)}
                >
                  Launch Agent
                  <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </Button>

                <p className="text-zeus-text-tertiary text-caption-s text-center">
                  Launching will create a token for this agent
                </p>

                <div className="mt-auto pt-4 border-t border-zeus-border-alpha flex items-center justify-between">
                  <span className="text-zeus-text-tertiary text-caption-s">
                    Need help choosing?
                  </span>
                  <button className="text-sedona-500 text-caption-s font-medium hover:text-sedona-400">
                    Compare Agents
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

AgentLaunchModal.displayName = "AgentLaunchModal"

export { AgentLaunchModal }
