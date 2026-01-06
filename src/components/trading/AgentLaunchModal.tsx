"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { GridScan } from "@/components/ui/grid-scan"
import { Search, Upload, Loader2 } from "lucide-react"
import { SedonaLogo } from "@/components/sedona/sedona-logo"
import { DEFAULT_AGENT_MODELS } from "@/fixtures/agents"

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
  onCreateAgent?: (data: { name: string; ticker: string; description: string }) => void
}


type ModalView = "signin" | "form" | "creating"

const AgentLaunchModal = ({
  open,
  onOpenChange,
  models = DEFAULT_AGENT_MODELS,
  isAuthenticated = true,
  onSignIn,
  onSelectModel,
  onLaunch,
  onCreateAgent,
}: AgentLaunchModalProps) => {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedModel, setSelectedModel] = React.useState<string | null>(null)
  const [view, setView] = React.useState<ModalView>(isAuthenticated ? "form" : "signin")

  // Form state
  const [agentName, setAgentName] = React.useState("")
  const [ticker, setTicker] = React.useState("")
  const [description, setDescription] = React.useState("")

  // Reset view when auth state changes
  React.useEffect(() => {
    setView(isAuthenticated ? "form" : "signin")
  }, [isAuthenticated])

  // Reset form when modal closes
  React.useEffect(() => {
    if (!open) {
      setAgentName("")
      setTicker("")
      setDescription("")
      setSelectedModel(null)
      setView(isAuthenticated ? "form" : "signin")
    }
  }, [open, isAuthenticated])

  const filteredModels = models.filter((model) =>
    model.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleModelSelect = (modelId: string) => {
    if (!isAuthenticated) return
    setSelectedModel(modelId)
    onSelectModel?.(modelId)
  }

  const handleSignIn = () => {
    onSignIn?.()
    setView("form")
  }

  const handleCreate = () => {
    if (!agentName || !ticker) return

    setView("creating")
    onCreateAgent?.({ name: agentName, ticker, description })

    // Redirect after 2s
    setTimeout(() => {
      onOpenChange(false)
      window.location.href = `/trading/${ticker.toLowerCase()}`
    }, 2000)
  }

  const selectedAgent = models.find(m => m.id === selectedModel)
  const isFormValid = agentName.trim() && ticker.trim()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[640px] bg-zeus-surface-neutral border-zeus-border-alpha p-0 gap-0 rounded-lg overflow-hidden [&>button]:hidden">
        {/* Two Column Layout */}
        <div className="grid grid-cols-[260px_1fr] min-h-[420px]">
          {/* Left Column - Agent List or Token Preview */}
          <div className="p-4 border-r border-zeus-border-alpha flex flex-col">
            {view === "creating" ? (
              // Token Preview during creation - all in card
              <>
                <h3 className="text-zeus-text-secondary text-caption-s uppercase tracking-wide mb-4">
                  Token Details
                </h3>
                <div className="flex-1 bg-zeus-surface-elevated rounded-lg p-4">
                  <div className="w-14 h-14 rounded-lg bg-sedona-500/20 flex items-center justify-center text-heading-md font-bold text-sedona-500 mb-4">
                    {ticker.charAt(0) || "?"}
                  </div>
                  <h4 className="text-zeus-text-primary text-body-m font-semibold mb-1">
                    {agentName || "Agent Name"}
                  </h4>
                  <p className="text-sedona-500 text-caption-l font-medium mb-2">
                    ${ticker || "TICKER"}
                  </p>
                  <p className="text-zeus-text-secondary text-caption-s mb-6">
                    {description || "No description"}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-zeus-border-alpha">
                    <div className="flex items-center justify-between text-caption-s">
                      <span className="text-zeus-text-tertiary">Initial Supply</span>
                      <span className="text-zeus-text-primary font-medium">1,000,000</span>
                    </div>
                    <div className="flex items-center justify-between text-caption-s">
                      <span className="text-zeus-text-tertiary">Creator Fee</span>
                      <span className="text-zeus-text-primary font-medium">1%</span>
                    </div>
                    <div className="flex items-center justify-between text-caption-s">
                      <span className="text-zeus-text-tertiary">Network</span>
                      <span className="text-zeus-text-primary font-medium">Solana</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // Agent List
              <>
                <h3 className="text-zeus-text-secondary text-caption-s uppercase tracking-wide mb-3">
                  Your Models
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
                  view === "signin" && "blur-[2px] pointer-events-none select-none"
                )}>
                  {filteredModels.map((model) => {
                    const isSelected = selectedModel === model.id
                    return (
                      <button
                        key={model.id}
                        onClick={() => handleModelSelect(model.id)}
                        disabled={view === "signin"}
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
              </>
            )}
          </div>

          {/* Right Column */}
          <div className={cn(
            "flex flex-col",
            view === "creating" ? "p-0" : "p-5"
          )}>
            {view === "signin" ? (
              // Not Logged In State
              <>
                <h3 className="text-zeus-text-secondary text-caption-s uppercase tracking-wide mb-4">
                  Connect Account
                </h3>
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
                    onClick={handleSignIn}
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
            ) : view === "form" ? (
              // Create Agent Form
              <>
                <h3 className="text-zeus-text-secondary text-caption-s uppercase tracking-wide mb-4">
                  Create Agent
                </h3>

                {/* Upload Icon */}
                <div className="flex justify-center mb-5">
                  <div className="w-16 h-16 rounded-xl bg-zeus-surface-elevated border border-zeus-border-alpha border-dashed flex items-center justify-center cursor-pointer hover:border-sedona-500/50 transition-colors">
                    <Upload className="w-6 h-6 text-zeus-text-tertiary" />
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4 flex-1">
                  <div>
                    <label className="block text-zeus-text-secondary text-caption-s mb-1.5">
                      Agent Name
                    </label>
                    <input
                      type="text"
                      placeholder="My Trading Agent"
                      value={agentName}
                      onChange={(e) => setAgentName(e.target.value)}
                      className="w-full bg-zeus-surface-elevated border border-zeus-border-alpha rounded-lg px-3 py-2.5 text-body-s text-zeus-text-primary placeholder:text-zeus-text-tertiary focus:outline-none focus:border-sedona-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-zeus-text-secondary text-caption-s mb-1.5">
                      Ticker
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zeus-text-tertiary text-body-s">$</span>
                      <input
                        type="text"
                        placeholder="AGENT"
                        value={ticker}
                        onChange={(e) => setTicker(e.target.value.toUpperCase().slice(0, 6))}
                        className="w-full bg-zeus-surface-elevated border border-zeus-border-alpha rounded-lg pl-7 pr-3 py-2.5 text-body-s text-zeus-text-primary placeholder:text-zeus-text-tertiary focus:outline-none focus:border-sedona-500/50 uppercase"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-zeus-text-secondary text-caption-s mb-1.5">
                      Description
                    </label>
                    <textarea
                      placeholder="Describe your agent's strategy..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      className="w-full bg-zeus-surface-elevated border border-zeus-border-alpha rounded-lg px-3 py-2.5 text-body-s text-zeus-text-primary placeholder:text-zeus-text-tertiary focus:outline-none focus:border-sedona-500/50 resize-none"
                    />
                  </div>
                </div>

                {/* Create Button */}
                <Button
                  variant="brand"
                  className="w-full mt-4"
                  onClick={handleCreate}
                  disabled={!isFormValid}
                >
                  Create Agent
                </Button>
              </>
            ) : (
              // Creating State with Animation - full panel grid
              <div className="flex-1 bg-zeus-surface-default relative">
                <GridScan color="#f97316" />

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                  <h3 className="text-zeus-text-secondary text-caption-s uppercase tracking-wide mb-8">
                    Deploying
                  </h3>

                  <div className="flex items-center gap-2 mb-3">
                    <Loader2 className="w-5 h-5 text-sedona-500 animate-spin" />
                    <span className="text-zeus-text-primary text-body-m font-medium">
                      Creating your token...
                    </span>
                  </div>

                  <p className="text-zeus-text-tertiary text-caption-s text-center max-w-[220px]">
                    Deploying smart contract and initializing liquidity pool
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

AgentLaunchModal.displayName = "AgentLaunchModal"

export { AgentLaunchModal }
