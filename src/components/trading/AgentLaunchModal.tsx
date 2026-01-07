"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { GridScan } from "@/components/ui/grid-scan"
import { Search, Loader2, Lock, GitBranch, Check } from "lucide-react"
import { SedonaLogo } from "@/components/sedona/sedona-logo"
import { getHFRepos, formatHFDate, type HFRepo, type HFCommit } from "@/fixtures"

export interface CreateAgentData {
  name: string
  ticker: string
  description: string
  huggingFaceRepo: string
  commitHash: string
}

export interface AgentLaunchModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  isAuthenticated?: boolean
  onSignIn?: () => void
  onCreateAgent?: (data: CreateAgentData) => void
}


type ModalView = "signin" | "select-repo" | "form" | "creating"

const AgentLaunchModal = ({
  open,
  onOpenChange,
  isAuthenticated = false,
  onSignIn,
  onCreateAgent,
}: AgentLaunchModalProps) => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = React.useState("")
  const [view, setView] = React.useState<ModalView>(isAuthenticated ? "select-repo" : "signin")

  // HuggingFace selection state
  const [selectedRepo, setSelectedRepo] = React.useState<HFRepo | null>(null)
  const [selectedCommit, setSelectedCommit] = React.useState<HFCommit | null>(null)

  // Form state
  const [agentName, setAgentName] = React.useState("")
  const [ticker, setTicker] = React.useState("")
  const [description, setDescription] = React.useState("")

  // Get user's HF repos
  const repos = React.useMemo(() => getHFRepos(), [])

  // Reset view when auth state changes
  React.useEffect(() => {
    setView(isAuthenticated ? "select-repo" : "signin")
  }, [isAuthenticated])

  // Reset form when modal closes
  React.useEffect(() => {
    if (!open) {
      setAgentName("")
      setTicker("")
      setDescription("")
      setSelectedRepo(null)
      setSelectedCommit(null)
      setSearchQuery("")
      setView(isAuthenticated ? "select-repo" : "signin")
    }
  }, [open, isAuthenticated])

  // Filter repos by search
  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    repo.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleRepoSelect = (repo: HFRepo) => {
    setSelectedRepo(repo)
    // Auto-select latest commit
    if (repo.commits.length > 0) {
      setSelectedCommit(repo.commits[0])
    }
    // Pre-fill agent name from repo
    setAgentName(repo.name.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "))
  }

  const handleSignIn = () => {
    onSignIn?.()
    setView("select-repo")
  }

  const handleContinueToForm = () => {
    if (!selectedRepo || !selectedCommit) return
    setView("form")
  }

  const handleBackToRepos = () => {
    setView("select-repo")
  }

  const handleCreate = () => {
    if (!agentName || !ticker || !selectedRepo || !selectedCommit) return

    setView("creating")
    onCreateAgent?.({
      name: agentName,
      ticker,
      description,
      huggingFaceRepo: selectedRepo.fullName,
      commitHash: selectedCommit.hash,
    })

    // Redirect to portfolio/my agents after 2.5s
    setTimeout(() => {
      onOpenChange(false)
      router.push("/trading/portfolio")
    }, 2500)
  }

  const isRepoSelected = selectedRepo && selectedCommit
  const isFormValid = agentName.trim() && ticker.trim() && selectedRepo && selectedCommit

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[680px] bg-zeus-surface-neutral border-zeus-border-alpha p-0 gap-0 rounded-lg overflow-hidden [&>button]:hidden">
        {/* Two Column Layout */}
        <div className="grid grid-cols-[280px_1fr] min-h-[480px]">
          {/* Left Column - Repo List or Token Preview */}
          <div className="p-4 border-r border-zeus-border-alpha flex flex-col">
            {view === "creating" ? (
              // Token Preview during creation
              <>
                <h3 className="text-zeus-text-secondary text-caption-s uppercase tracking-wide mb-4">
                  Agent Details
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
                  <p className="text-zeus-text-secondary text-caption-s mb-4">
                    {description || "No description"}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-zeus-border-alpha">
                    <div className="flex items-center gap-2 text-caption-s">
                      <GitBranch className="w-3.5 h-3.5 text-zeus-text-tertiary" />
                      <span className="text-zeus-text-tertiary">Model:</span>
                      <span className="text-zeus-text-primary font-mono truncate">
                        {selectedRepo?.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-caption-s">
                      <span className="w-3.5" />
                      <span className="text-zeus-text-tertiary">Commit:</span>
                      <span className="text-zeus-text-primary font-mono">
                        {selectedCommit?.hashShort}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // HuggingFace Repo List
              <>
                <h3 className="text-zeus-text-secondary text-caption-s uppercase tracking-wide mb-3">
                  Your HuggingFace Models
                </h3>

                {/* Search */}
                <div className="relative mb-3">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zeus-text-tertiary" />
                  <input
                    type="text"
                    placeholder="Search models..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-zeus-surface-default border border-zeus-border-alpha rounded pl-8 pr-3 py-2 text-caption-l text-zeus-text-primary placeholder:text-zeus-text-tertiary focus:outline-none focus:border-zeus-border-normal"
                  />
                </div>

                {/* Repo List */}
                <div className={cn(
                  "flex-1 overflow-y-auto space-y-1.5",
                  view === "signin" && "blur-[2px] pointer-events-none select-none"
                )}>
                  {filteredRepos.map((repo) => {
                    const isSelected = selectedRepo?.id === repo.id
                    return (
                      <button
                        key={repo.id}
                        onClick={() => handleRepoSelect(repo)}
                        disabled={view === "signin"}
                        className={cn(
                          "w-full flex flex-col gap-1 px-3 py-2.5 rounded text-left transition-all border",
                          isSelected
                            ? "bg-sedona-500/10 border-sedona-500/40"
                            : "border-zeus-border-alpha hover:bg-zeus-surface-neutral-subtle"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-zeus-text-primary text-body-s font-medium truncate flex-1">
                            {repo.name}
                          </span>
                          {repo.isPrivate && (
                            <Lock className="w-3 h-3 text-zeus-text-tertiary shrink-0" />
                          )}
                          {isSelected && (
                            <Check className="w-4 h-4 text-sedona-500 shrink-0" />
                          )}
                        </div>
                        <span className="text-zeus-text-tertiary text-caption-s truncate">
                          {repo.description}
                        </span>
                        <div className="flex items-center gap-3 text-caption-s text-zeus-text-quaternary">
                          <span>{repo.downloads.toLocaleString()} downloads</span>
                          <span>Updated {formatHFDate(repo.lastModified)}</span>
                        </div>
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
              // Sign in with HuggingFace
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
            ) : view === "select-repo" ? (
              // Select commit after choosing repo
              <>
                <h3 className="text-zeus-text-secondary text-caption-s uppercase tracking-wide mb-4">
                  Select Version
                </h3>

                {selectedRepo ? (
                  <>
                    {/* Selected repo info */}
                    <div className="bg-zeus-surface-elevated border border-zeus-border-alpha rounded-lg p-4 mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-sedona-500/15 flex items-center justify-center text-sedona-500 font-semibold shrink-0">
                          {selectedRepo.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-zeus-text-primary text-body-s font-semibold truncate">
                            {selectedRepo.fullName}
                          </h4>
                          <p className="text-zeus-text-secondary text-caption-s truncate">
                            {selectedRepo.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Commit selection */}
                    <label className="block text-zeus-text-secondary text-caption-s mb-2">
                      Choose a commit
                    </label>
                    <div className="flex-1 overflow-y-auto space-y-1.5 mb-4">
                      {selectedRepo.commits.map((commit, idx) => {
                        const isSelected = selectedCommit?.hash === commit.hash
                        return (
                          <button
                            key={commit.hash}
                            onClick={() => setSelectedCommit(commit)}
                            className={cn(
                              "w-full flex items-center gap-3 px-3 py-2.5 rounded text-left transition-all border",
                              isSelected
                                ? "bg-sedona-500/10 border-sedona-500/40"
                                : "border-zeus-border-alpha hover:bg-zeus-surface-neutral-subtle"
                            )}
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-zeus-text-primary font-mono text-caption-l">
                                  {commit.hashShort}
                                </span>
                                {idx === 0 && (
                                  <span className="text-[10px] text-sedona-500 font-medium px-1.5 py-0.5 bg-sedona-500/10 rounded">
                                    LATEST
                                  </span>
                                )}
                              </div>
                              <p className="text-zeus-text-secondary text-caption-s truncate mt-0.5">
                                {commit.message}
                              </p>
                            </div>
                            {isSelected && (
                              <Check className="w-4 h-4 text-sedona-500 shrink-0" />
                            )}
                          </button>
                        )
                      })}
                    </div>

                    <Button
                      variant="brand"
                      className="w-full"
                      onClick={handleContinueToForm}
                      disabled={!isRepoSelected}
                    >
                      Continue
                    </Button>
                  </>
                ) : (
                  // No repo selected yet
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-xl bg-zeus-surface-elevated border border-zeus-border-alpha border-dashed flex items-center justify-center mb-4">
                      <GitBranch className="w-5 h-5 text-zeus-text-tertiary" />
                    </div>
                    <h4 className="text-zeus-text-primary text-body-s font-medium mb-2">
                      Select a Model
                    </h4>
                    <p className="text-zeus-text-tertiary text-caption-s max-w-[200px]">
                      Choose a model from your HuggingFace repos to create an agent
                    </p>
                  </div>
                )}
              </>
            ) : view === "form" ? (
              // Create Agent Form
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-zeus-text-secondary text-caption-s uppercase tracking-wide">
                    Agent Details
                  </h3>
                  <button
                    onClick={handleBackToRepos}
                    className="text-zeus-text-tertiary text-caption-s hover:text-zeus-text-secondary transition-colors"
                  >
                    ← Change model
                  </button>
                </div>

                {/* Selected model badge */}
                <div className="flex items-center gap-2 px-3 py-2 bg-zeus-surface-elevated border border-zeus-border-alpha rounded-lg mb-4">
                  <GitBranch className="w-4 h-4 text-zeus-text-tertiary" />
                  <span className="text-zeus-text-primary text-caption-l font-mono flex-1 truncate">
                    {selectedRepo?.fullName}
                  </span>
                  <span className="text-zeus-text-tertiary text-caption-s font-mono">
                    @{selectedCommit?.hashShort}
                  </span>
                </div>

                {/* Form Fields */}
                <div className="space-y-4 flex-1">
                  <div>
                    <label className="block text-zeus-text-secondary text-caption-s mb-1.5">
                      Agent Name
                    </label>
                    <input
                      type="text"
                      placeholder="My AI Agent"
                      value={agentName}
                      onChange={(e) => setAgentName(e.target.value)}
                      className="w-full bg-zeus-surface-elevated border border-zeus-border-alpha rounded-lg px-3 py-2.5 text-body-s text-zeus-text-primary placeholder:text-zeus-text-tertiary focus:outline-none focus:border-sedona-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-zeus-text-secondary text-caption-s mb-1.5">
                      Ticker Symbol
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
                      placeholder="Describe what your agent does..."
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
                  Launch Agent
                </Button>
              </>
            ) : (
              // Creating State with Animation
              <div className="flex-1 bg-zeus-surface-default relative">
                <GridScan color="#f97316" />

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                  <h3 className="text-zeus-text-secondary text-caption-s uppercase tracking-wide mb-8">
                    Launching Agent
                  </h3>

                  <div className="flex items-center gap-2 mb-3">
                    <Loader2 className="w-5 h-5 text-sedona-500 animate-spin" />
                    <span className="text-zeus-text-primary text-body-m font-medium">
                      Starting evaluation...
                    </span>
                  </div>

                  <p className="text-zeus-text-tertiary text-caption-s text-center max-w-[240px]">
                    Loading model weights and initializing TEE evaluation environment
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
