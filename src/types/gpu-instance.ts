/**
 * GPU Instance Types
 *
 * Types for GPU deployment and instance management feature
 */

export type GPUInstanceStatus = "provisioning" | "running" | "terminating" | "terminated" | "error"

export type PaymentMethod = "solana" | "stripe"

export type GPUTier = "h200" | "a100" | "h100"

export interface GPUPricing {
  tier: GPUTier
  name: string
  hourlyRate: number
  minimumHours: number
  minimumCost: number
  description: string
}

export interface GPUInstance {
  id: string
  modelId: string
  modelName: string
  modelTicker?: string
  status: GPUInstanceStatus
  startedAt: string
  expiresAt: string
  baseUrl: string
  apiKey: string
  totalSpend: number
  paymentMethod: PaymentMethod
  tier: GPUTier
}

export interface DeploymentRequest {
  modelId: string
  modelName: string
  modelTicker?: string
  tier: GPUTier
  paymentMethod: PaymentMethod
  durationHours: number
}

export interface CodeSnippet {
  language: "python" | "typescript" | "curl"
  label: string
  code: string
}

export interface ConnectionInfo {
  baseUrl: string
  apiKey: string
  modelName: string
}

// Modal step types
export type DeployModalStep = "info" | "payment" | "deploying" | "success"

// Context state
export interface GPUDeployState {
  // Modal state
  isDeployModalOpen: boolean
  deployModalStep: DeployModalStep
  selectedModel: { id: string; name: string; ticker?: string } | null

  // Instance details modal
  isDetailsModalOpen: boolean
  selectedInstance: GPUInstance | null

  // Instances
  instances: GPUInstance[]

  // Loading states
  isDeploying: boolean
  isTerminating: string | null // instance id being terminated

  // Errors
  error: string | null
}

export interface GPUDeployContextValue extends GPUDeployState {
  // Modal actions
  openDeployModal: (model: { id: string; name: string; ticker?: string }) => void
  closeDeployModal: () => void

  // Deployment actions
  startDeployment: (request: DeploymentRequest) => Promise<GPUInstance | null>

  // Instance actions
  viewInstanceDetails: (instance: GPUInstance) => void
  closeInstanceDetails: () => void
  terminateInstance: (instanceId: string) => Promise<boolean>

  // Helpers
  getActiveInstances: () => GPUInstance[]
  getInstanceByModel: (modelId: string) => GPUInstance | undefined
}
