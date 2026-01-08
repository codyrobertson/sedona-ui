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
import { useGPUDeploy } from "@/contexts/gpu-deploy-context"
import {
  GPU_PRICING,
  DEFAULT_GPU_TIER,
  generateCodeSnippets,
} from "@/fixtures/gpu-instances"
import type { GPUTier, PaymentMethod, DeployModalStep } from "@/types/gpu-instance"

// ============================================================================
// STEP: INFO
// ============================================================================

interface InfoStepProps {
  modelName: string
  onContinue: () => void
}

function InfoStep({ modelName, onContinue }: InfoStepProps) {
  const [selectedTier, setSelectedTier] = React.useState<GPUTier>(DEFAULT_GPU_TIER)
  const pricing = GPU_PRICING[selectedTier]

  return (
    <div className="space-y-6">
      {/* Explainer */}
      <div className="space-y-3">
        <div className="flex items-start gap-3 p-4 bg-zeus-surface-neutral rounded-lg border border-zeus-border-alpha">
          <Icon icon="microchip" className="w-5 h-5 text-zeus-accent-purple mt-0.5" />
          <div className="space-y-1">
            <p className="text-zeus-text-primary text-body-s font-medium">
              What is Model Deployment?
            </p>
            <p className="text-zeus-text-secondary text-caption-l">
              Run <span className="font-medium text-zeus-text-primary">{modelName}</span> on
              dedicated GPU infrastructure. Get an OpenAI-compatible API endpoint for inference
              in your applications.
            </p>
          </div>
        </div>
      </div>

      {/* GPU Tier Selection */}
      <div className="space-y-3">
        <label className="text-zeus-text-primary text-body-s font-medium">
          Select GPU Tier
        </label>
        <div className="grid gap-2">
          {(Object.keys(GPU_PRICING) as GPUTier[]).map((tier) => {
            const tierPricing = GPU_PRICING[tier]
            const isSelected = selectedTier === tier

            return (
              <button
                key={tier}
                type="button"
                onClick={() => setSelectedTier(tier)}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg border text-left transition-colors",
                  isSelected
                    ? "border-sedona-500 bg-sedona-500/10"
                    : "border-zeus-border-alpha bg-zeus-surface-neutral hover:bg-zeus-surface-elevated"
                )}
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-zeus-text-primary text-body-s font-medium">
                      {tierPricing.name}
                    </span>
                    {tier === "h200" && (
                      <span className="px-1.5 py-0.5 text-[10px] font-medium bg-sedona-500/20 text-sedona-500 rounded">
                        RECOMMENDED
                      </span>
                    )}
                  </div>
                  <p className="text-zeus-text-tertiary text-caption-s">
                    {tierPricing.description}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-zeus-text-primary text-body-s font-semibold">
                    ${tierPricing.hourlyRate.toFixed(2)}/hr
                  </p>
                  <p className="text-zeus-text-tertiary text-caption-s">
                    ${tierPricing.minimumCost} min (24h)
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Pricing Summary */}
      <div className="p-4 bg-zeus-surface-elevated rounded-lg border border-zeus-border-alpha">
        <div className="flex items-center justify-between">
          <span className="text-zeus-text-secondary text-body-s">Minimum Commitment</span>
          <span className="text-zeus-text-primary text-heading-sm font-bold">
            ${pricing.minimumCost}
          </span>
        </div>
        <p className="text-zeus-text-tertiary text-caption-s mt-1">
          For {pricing.minimumHours} hours on {pricing.name}
        </p>
      </div>

      {/* Continue Button */}
      <Button
        variant="brand"
        size="lg"
        className="w-full"
        onClick={onContinue}
      >
        Continue to Payment
        <Icon icon="arrow-right" className="w-4 h-4 ml-2" />
      </Button>
    </div>
  )
}

// ============================================================================
// STEP: PAYMENT
// ============================================================================

interface PaymentStepProps {
  modelName: string
  modelId: string
  modelTicker?: string
  onBack: () => void
  onDeploy: (paymentMethod: PaymentMethod) => void
}

function PaymentStep({ modelName, modelId, modelTicker, onBack, onDeploy }: PaymentStepProps) {
  const [selectedPayment, setSelectedPayment] = React.useState<PaymentMethod>("solana")
  const pricing = GPU_PRICING[DEFAULT_GPU_TIER]

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-zeus-text-secondary hover:text-zeus-text-primary text-caption-l transition-colors"
      >
        <Icon icon="arrow-left" className="w-3.5 h-3.5" />
        Back to configuration
      </button>

      {/* Payment Method Selection */}
      <div className="space-y-3">
        <label className="text-zeus-text-primary text-body-s font-medium">
          Select Payment Method
        </label>
        <div className="grid gap-2">
          {/* Solana */}
          <button
            type="button"
            onClick={() => setSelectedPayment("solana")}
            className={cn(
              "flex items-center gap-3 p-4 rounded-lg border text-left transition-colors",
              selectedPayment === "solana"
                ? "border-sedona-500 bg-sedona-500/10"
                : "border-zeus-border-alpha bg-zeus-surface-neutral hover:bg-zeus-surface-elevated"
            )}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9945FF] to-[#14F195] flex items-center justify-center">
              <Icon icon="wallet" className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-zeus-text-primary text-body-s font-medium">
                Pay with Solana
              </p>
              <p className="text-zeus-text-tertiary text-caption-s">
                Use your connected wallet
              </p>
            </div>
            {selectedPayment === "solana" && (
              <Icon icon="check-circle" className="w-5 h-5 text-sedona-500" />
            )}
          </button>

          {/* Stripe */}
          <button
            type="button"
            onClick={() => setSelectedPayment("stripe")}
            className={cn(
              "flex items-center gap-3 p-4 rounded-lg border text-left transition-colors",
              selectedPayment === "stripe"
                ? "border-sedona-500 bg-sedona-500/10"
                : "border-zeus-border-alpha bg-zeus-surface-neutral hover:bg-zeus-surface-elevated"
            )}
          >
            <div className="w-10 h-10 rounded-full bg-[#635BFF] flex items-center justify-center">
              <Icon icon="credit-card" className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-zeus-text-primary text-body-s font-medium">
                Pay with Card
              </p>
              <p className="text-zeus-text-tertiary text-caption-s">
                Credit or debit card via Stripe
              </p>
            </div>
            {selectedPayment === "stripe" && (
              <Icon icon="check-circle" className="w-5 h-5 text-sedona-500" />
            )}
          </button>
        </div>
      </div>

      {/* Order Summary */}
      <div className="p-4 bg-zeus-surface-elevated rounded-lg border border-zeus-border-alpha space-y-3">
        <p className="text-zeus-text-secondary text-caption-l font-medium">Order Summary</p>
        <div className="space-y-2">
          <div className="flex justify-between text-caption-l">
            <span className="text-zeus-text-tertiary">Model</span>
            <span className="text-zeus-text-primary font-medium">{modelName}</span>
          </div>
          <div className="flex justify-between text-caption-l">
            <span className="text-zeus-text-tertiary">GPU</span>
            <span className="text-zeus-text-primary">{GPU_PRICING[DEFAULT_GPU_TIER].name}</span>
          </div>
          <div className="flex justify-between text-caption-l">
            <span className="text-zeus-text-tertiary">Duration</span>
            <span className="text-zeus-text-primary">24 hours (minimum)</span>
          </div>
          <div className="border-t border-zeus-border-alpha my-2" />
          <div className="flex justify-between">
            <span className="text-zeus-text-primary text-body-s font-medium">Total</span>
            <span className="text-zeus-text-primary text-heading-sm font-bold">
              ${pricing.minimumCost}
            </span>
          </div>
        </div>
      </div>

      {/* Deploy Button */}
      <Button
        variant="brand"
        size="lg"
        className="w-full"
        onClick={() => onDeploy(selectedPayment)}
      >
        {selectedPayment === "solana" ? (
          <>
            <Icon icon="wallet" className="w-4 h-4 mr-2" />
            Pay ${pricing.minimumCost} with Wallet
          </>
        ) : (
          <>
            <Icon icon="credit-card" className="w-4 h-4 mr-2" />
            Pay ${pricing.minimumCost} with Card
          </>
        )}
      </Button>
    </div>
  )
}

// ============================================================================
// STEP: DEPLOYING
// ============================================================================

function DeployingStep({ modelName }: { modelName: string }) {
  return (
    <div className="py-8 text-center space-y-4">
      <div className="w-16 h-16 mx-auto rounded-full bg-sedona-500/20 flex items-center justify-center animate-pulse">
        <Icon icon="server" className="w-8 h-8 text-sedona-500" />
      </div>
      <div className="space-y-2">
        <p className="text-zeus-text-primary text-heading-sm font-semibold">
          Deploying {modelName}
        </p>
        <p className="text-zeus-text-secondary text-caption-l">
          Provisioning GPU instance... This may take a minute.
        </p>
      </div>
      <div className="flex justify-center gap-1">
        <div className="w-2 h-2 bg-sedona-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
        <div className="w-2 h-2 bg-sedona-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
        <div className="w-2 h-2 bg-sedona-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  )
}

// ============================================================================
// STEP: SUCCESS
// ============================================================================

interface SuccessStepProps {
  modelName: string
  onViewDetails: () => void
  onClose: () => void
}

function SuccessStep({ modelName, onViewDetails, onClose }: SuccessStepProps) {
  return (
    <div className="py-6 text-center space-y-6">
      <div className="w-16 h-16 mx-auto rounded-full bg-zeus-status-success/20 flex items-center justify-center">
        <Icon icon="check" className="w-8 h-8 text-zeus-status-success" />
      </div>
      <div className="space-y-2">
        <p className="text-zeus-text-primary text-heading-sm font-semibold">
          Deployment Successful!
        </p>
        <p className="text-zeus-text-secondary text-caption-l">
          {modelName} is now running on dedicated GPU infrastructure.
        </p>
      </div>
      <div className="space-y-2">
        <Button
          variant="brand"
          size="lg"
          className="w-full"
          onClick={onViewDetails}
        >
          <Icon icon="code" className="w-4 h-4 mr-2" />
          View Connection Details
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="w-full"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </div>
  )
}

// ============================================================================
// MAIN MODAL COMPONENT
// ============================================================================

export function DeployModelModal() {
  const {
    isDeployModalOpen,
    deployModalStep,
    selectedModel,
    selectedInstance,
    closeDeployModal,
    startDeployment,
    viewInstanceDetails,
  } = useGPUDeploy()

  const [localStep, setLocalStep] = React.useState<DeployModalStep>("info")

  // Sync local step with context
  React.useEffect(() => {
    setLocalStep(deployModalStep)
  }, [deployModalStep])

  const handleContinueToPayment = () => {
    setLocalStep("payment")
  }

  const handleBackToInfo = () => {
    setLocalStep("info")
  }

  const handleDeploy = async (paymentMethod: PaymentMethod) => {
    if (!selectedModel) return

    await startDeployment({
      modelId: selectedModel.id,
      modelName: selectedModel.name,
      modelTicker: selectedModel.ticker,
      tier: DEFAULT_GPU_TIER,
      paymentMethod,
      durationHours: 24,
    })
  }

  const handleViewDetails = () => {
    if (selectedInstance) {
      closeDeployModal()
      // Small delay to let deploy modal close before opening details
      setTimeout(() => {
        viewInstanceDetails(selectedInstance)
      }, 200)
    }
  }

  const getTitle = () => {
    switch (localStep) {
      case "info":
        return "Deploy Model"
      case "payment":
        return "Complete Payment"
      case "deploying":
        return "Deploying..."
      case "success":
        return "Deployment Complete"
      default:
        return "Deploy Model"
    }
  }

  return (
    <Dialog open={isDeployModalOpen} onOpenChange={(open) => !open && closeDeployModal()}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          {localStep === "info" && (
            <DialogDescription>
              Deploy {selectedModel?.name} to GPU infrastructure
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="mt-4">
          {localStep === "info" && selectedModel && (
            <InfoStep
              modelName={selectedModel.name}
              onContinue={handleContinueToPayment}
            />
          )}

          {localStep === "payment" && selectedModel && (
            <PaymentStep
              modelName={selectedModel.name}
              modelId={selectedModel.id}
              modelTicker={selectedModel.ticker}
              onBack={handleBackToInfo}
              onDeploy={handleDeploy}
            />
          )}

          {localStep === "deploying" && selectedModel && (
            <DeployingStep modelName={selectedModel.name} />
          )}

          {localStep === "success" && selectedModel && (
            <SuccessStep
              modelName={selectedModel.name}
              onViewDetails={handleViewDetails}
              onClose={closeDeployModal}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DeployModelModal
