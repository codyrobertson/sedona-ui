"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { useClipboard } from "@/hooks/useClipboard"
import { useGPUDeploy } from "@/contexts/gpu-deploy-context"
import {
  generateCodeSnippets,
  getStatusColor,
  getStatusLabel,
  formatDuration,
  formatTimeRemaining,
  GPU_PRICING,
} from "@/fixtures/gpu-instances"
import type { CodeSnippet } from "@/types/gpu-instance"

// ============================================================================
// CODE BLOCK COMPONENT
// ============================================================================

interface CodeBlockProps {
  snippet: CodeSnippet
}

function CodeBlock({ snippet }: CodeBlockProps) {
  const { copy, copied } = useClipboard()

  return (
    <div className="rounded-lg border border-zeus-border-alpha overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-zeus-surface-elevated border-b border-zeus-border-alpha">
        <span className="text-zeus-text-secondary text-caption-s font-medium">
          {snippet.label}
        </span>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => copy(snippet.code)}
          className="h-6 px-2"
        >
          {copied ? (
            <>
              <Icon icon="check" className="w-3 h-3 mr-1 text-zeus-status-success" />
              <span className="text-zeus-status-success">Copied</span>
            </>
          ) : (
            <>
              <Icon icon="copy" className="w-3 h-3 mr-1" />
              Copy
            </>
          )}
        </Button>
      </div>
      {/* Code */}
      <pre className="p-3 bg-zeus-surface-default overflow-x-auto">
        <code className="text-caption-s font-mono text-zeus-text-primary whitespace-pre">
          {snippet.code}
        </code>
      </pre>
    </div>
  )
}

// ============================================================================
// CONNECTION INFO COMPONENT
// ============================================================================

interface ConnectionInfoProps {
  baseUrl: string
  apiKey: string
}

function ConnectionInfo({ baseUrl, apiKey }: ConnectionInfoProps) {
  const { copy: copyUrl, copied: copiedUrl } = useClipboard()
  const { copy: copyKey, copied: copiedKey } = useClipboard()

  return (
    <div className="space-y-3">
      {/* Base URL */}
      <div className="space-y-1.5">
        <label className="text-zeus-text-secondary text-caption-s font-medium">
          Base URL
        </label>
        <div className="flex items-center gap-2">
          <div className="flex-1 px-3 py-2 bg-zeus-surface-neutral rounded-lg border border-zeus-border-alpha">
            <code className="text-caption-s font-mono text-zeus-text-primary break-all">
              {baseUrl}
            </code>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyUrl(baseUrl)}
            className="shrink-0"
          >
            {copiedUrl ? (
              <Icon icon="check" className="w-4 h-4 text-zeus-status-success" />
            ) : (
              <Icon icon="copy" className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* API Key */}
      <div className="space-y-1.5">
        <label className="text-zeus-text-secondary text-caption-s font-medium">
          API Key
        </label>
        <div className="flex items-center gap-2">
          <div className="flex-1 px-3 py-2 bg-zeus-surface-neutral rounded-lg border border-zeus-border-alpha">
            <code className="text-caption-s font-mono text-zeus-text-primary break-all">
              {apiKey}
            </code>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyKey(apiKey)}
            className="shrink-0"
          >
            {copiedKey ? (
              <Icon icon="check" className="w-4 h-4 text-zeus-status-success" />
            ) : (
              <Icon icon="copy" className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// MAIN MODAL COMPONENT
// ============================================================================

export function InstanceDetailsModal() {
  const {
    isDetailsModalOpen,
    selectedInstance,
    closeInstanceDetails,
  } = useGPUDeploy()

  const [activeTab, setActiveTab] = React.useState<"python" | "typescript" | "curl">("python")

  if (!selectedInstance) return null

  const snippets = generateCodeSnippets({
    baseUrl: selectedInstance.baseUrl,
    apiKey: selectedInstance.apiKey,
    modelName: selectedInstance.modelName,
  })

  const activeSnippet = snippets.find((s) => s.language === activeTab)
  const pricing = GPU_PRICING[selectedInstance.tier]

  return (
    <Dialog open={isDetailsModalOpen} onOpenChange={(open) => !open && closeInstanceDetails()}>
      <DialogContent className="fixed inset-0 translate-x-0 translate-y-0 h-full flex flex-col bg-zeus-surface-default sm:inset-auto sm:left-[50%] sm:top-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:max-w-[600px] sm:max-h-[90vh] sm:h-auto sm:bg-zeus-surface-neutral sm:overflow-y-auto">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <span>{selectedInstance.modelName}</span>
            {selectedInstance.modelTicker && (
              <span className="text-zeus-text-tertiary text-body-s font-normal">
                ${selectedInstance.modelTicker}
              </span>
            )}
          </DialogTitle>
          <DialogDescription>
            Connection details and code examples for your deployed instance
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4 sm:space-y-6 flex-1 overflow-y-auto pb-4">
          {/* Status Card */}
          <div className="p-4 bg-zeus-surface-elevated rounded-lg border border-zeus-border-alpha">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-zeus-text-tertiary text-caption-s">Status</p>
                <p className={cn("text-body-s font-medium", getStatusColor(selectedInstance.status))}>
                  {getStatusLabel(selectedInstance.status)}
                </p>
              </div>
              <div>
                <p className="text-zeus-text-tertiary text-caption-s">GPU</p>
                <p className="text-zeus-text-primary text-body-s font-medium">
                  {pricing.name}
                </p>
              </div>
              <div>
                <p className="text-zeus-text-tertiary text-caption-s">Uptime</p>
                <p className="text-zeus-text-primary text-body-s font-medium">
                  {formatDuration(selectedInstance.startedAt)}
                </p>
              </div>
              <div>
                <p className="text-zeus-text-tertiary text-caption-s">Cost</p>
                <p className="text-zeus-text-primary text-body-s font-medium">
                  ${selectedInstance.totalSpend.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Connection Info */}
          <div className="space-y-3">
            <h3 className="text-zeus-text-primary text-body-s font-semibold">
              Connection Info
            </h3>
            <ConnectionInfo
              baseUrl={selectedInstance.baseUrl}
              apiKey={selectedInstance.apiKey}
            />
          </div>

          {/* Code Examples */}
          <div className="space-y-3">
            <h3 className="text-zeus-text-primary text-body-s font-semibold">
              Code Examples
            </h3>

            {/* Language Tabs */}
            <div className="flex gap-1 p-1 bg-zeus-surface-neutral rounded-lg">
              {(["python", "typescript", "curl"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setActiveTab(lang)}
                  className={cn(
                    "flex-1 px-3 py-1.5 rounded-md text-caption-s font-medium transition-colors",
                    activeTab === lang
                      ? "bg-zeus-surface-elevated text-zeus-text-primary"
                      : "text-zeus-text-tertiary hover:text-zeus-text-secondary"
                  )}
                >
                  {lang === "python" && "Python"}
                  {lang === "typescript" && "TypeScript"}
                  {lang === "curl" && "cURL"}
                </button>
              ))}
            </div>

            {/* Active Code Block */}
            {activeSnippet && <CodeBlock snippet={activeSnippet} />}
          </div>

          {/* Time Remaining */}
          {selectedInstance.status === "running" && (
            <div className="flex items-center gap-2 p-3 bg-zeus-accent-blue/10 rounded-lg border border-zeus-accent-blue/20">
              <Icon icon="clock" className="w-4 h-4 text-zeus-accent-blue" />
              <span className="text-zeus-text-primary text-caption-l">
                {formatTimeRemaining(selectedInstance.expiresAt)}
              </span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default InstanceDetailsModal
