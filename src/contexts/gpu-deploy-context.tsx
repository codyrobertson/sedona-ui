"use client"

import * as React from "react"
import type {
  GPUInstance,
  GPUDeployState,
  GPUDeployContextValue,
  DeploymentRequest,
  DeployModalStep,
} from "@/types/gpu-instance"
import {
  MOCK_GPU_INSTANCES,
  generateInstanceId,
  generateApiKey,
  GPU_PRICING,
} from "@/fixtures/gpu-instances"

// ============================================================================
// CONSTANTS
// ============================================================================

const STORAGE_KEY = "sedona_gpu_instances"
const DEPLOYMENT_SIMULATION_MS = 3000
const TERMINATION_SIMULATION_MS = 1500
const TERMINATED_CLEANUP_DELAY_MS = 2000

// ============================================================================
// STORAGE HELPERS
// ============================================================================

function loadInstancesFromStorage(): GPUInstance[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    const parsed = JSON.parse(stored) as GPUInstance[]
    // Filter out terminated/expired instances
    return parsed.filter((inst) => {
      if (inst.status === "terminated") return false
      // Remove expired instances
      if (new Date(inst.expiresAt) < new Date()) return false
      return true
    })
  } catch {
    return []
  }
}

function saveInstancesToStorage(instances: GPUInstance[]): void {
  if (typeof window === "undefined") return
  try {
    // Only save active instances
    const activeInstances = instances.filter(
      (inst) => inst.status !== "terminated"
    )
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activeInstances))
  } catch {
    // Silently fail on storage errors
  }
}

// ============================================================================
// CONTEXT
// ============================================================================

const GPUDeployContext = React.createContext<GPUDeployContextValue | null>(null)

const initialState: GPUDeployState = {
  isDeployModalOpen: false,
  deployModalStep: "info",
  selectedModel: null,
  isDetailsModalOpen: false,
  selectedInstance: null,
  instances: [],
  isDeploying: false,
  isTerminating: null,
  error: null,
}

export function GPUDeployProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<GPUDeployState>(initialState)
  const [isHydrated, setIsHydrated] = React.useState(false)

  // Load from localStorage on mount (hydration-safe)
  React.useEffect(() => {
    const storedInstances = loadInstancesFromStorage()
    // Merge mock data with stored instances for dev (avoid duplicates by ID)
    const storedIds = new Set(storedInstances.map((i) => i.id))
    const mergedInstances = [
      ...storedInstances,
      ...MOCK_GPU_INSTANCES.filter((m) => !storedIds.has(m.id)),
    ]
    setState((prev) => ({
      ...prev,
      instances: mergedInstances,
    }))
    setIsHydrated(true)
  }, [])

  // Persist instances to localStorage whenever they change
  React.useEffect(() => {
    if (isHydrated) {
      saveInstancesToStorage(state.instances)
    }
  }, [state.instances, isHydrated])

  // ============================================================================
  // DEPLOY MODAL ACTIONS
  // ============================================================================

  const openDeployModal = React.useCallback(
    (model: { id: string; name: string; ticker?: string }) => {
      setState((prev) => ({
        ...prev,
        isDeployModalOpen: true,
        deployModalStep: "info",
        selectedModel: model,
        error: null,
      }))
    },
    []
  )

  const closeDeployModal = React.useCallback(() => {
    setState((prev) => ({
      ...prev,
      isDeployModalOpen: false,
      deployModalStep: "info",
      selectedModel: null,
      isDeploying: false,
      error: null,
    }))
  }, [])

  const setDeployModalStep = React.useCallback((step: DeployModalStep) => {
    setState((prev) => ({
      ...prev,
      deployModalStep: step,
    }))
  }, [])

  // ============================================================================
  // DEPLOYMENT ACTIONS
  // ============================================================================

  const startDeployment = React.useCallback(
    async (request: DeploymentRequest): Promise<GPUInstance | null> => {
      setState((prev) => ({
        ...prev,
        isDeploying: true,
        deployModalStep: "deploying",
        error: null,
      }))

      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, DEPLOYMENT_SIMULATION_MS))

        const now = new Date()
        const expiresAt = new Date(
          now.getTime() + request.durationHours * 60 * 60 * 1000
        )

        const newInstance: GPUInstance = {
          id: generateInstanceId(),
          modelId: request.modelId,
          modelName: request.modelName,
          modelTicker: request.modelTicker,
          status: "running",
          startedAt: now.toISOString(),
          expiresAt: expiresAt.toISOString(),
          baseUrl: `https://inference.sedona.fun/v1/${generateInstanceId()}`,
          apiKey: generateApiKey(),
          totalSpend: 0,
          paymentMethod: request.paymentMethod,
          tier: request.tier,
        }

        setState((prev) => ({
          ...prev,
          instances: [newInstance, ...prev.instances],
          isDeploying: false,
          deployModalStep: "success",
          selectedInstance: newInstance,
        }))

        return newInstance
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isDeploying: false,
          deployModalStep: "info",
          error: error instanceof Error ? error.message : "Deployment failed",
        }))
        return null
      }
    },
    []
  )

  // ============================================================================
  // INSTANCE DETAILS ACTIONS
  // ============================================================================

  const viewInstanceDetails = React.useCallback((instance: GPUInstance) => {
    setState((prev) => ({
      ...prev,
      isDetailsModalOpen: true,
      selectedInstance: instance,
    }))
  }, [])

  const closeInstanceDetails = React.useCallback(() => {
    setState((prev) => ({
      ...prev,
      isDetailsModalOpen: false,
      // Don't clear selectedInstance immediately for animation
    }))
  }, [])

  // ============================================================================
  // TERMINATE ACTIONS
  // ============================================================================

  const terminateInstance = React.useCallback(
    async (instanceId: string): Promise<boolean> => {
      setState((prev) => ({
        ...prev,
        isTerminating: instanceId,
      }))

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, TERMINATION_SIMULATION_MS))

        setState((prev) => ({
          ...prev,
          instances: prev.instances.map((inst) =>
            inst.id === instanceId
              ? { ...inst, status: "terminated" as const }
              : inst
          ),
          isTerminating: null,
        }))

        // Remove from list after delay
        setTimeout(() => {
          setState((prev) => ({
            ...prev,
            instances: prev.instances.filter((inst) => inst.id !== instanceId),
          }))
        }, TERMINATED_CLEANUP_DELAY_MS)

        return true
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isTerminating: null,
          error: error instanceof Error ? error.message : "Termination failed",
        }))
        return false
      }
    },
    []
  )

  // ============================================================================
  // HELPER FUNCTIONS
  // ============================================================================

  const getActiveInstances = React.useCallback(() => {
    return state.instances.filter(
      (inst) => inst.status === "running" || inst.status === "provisioning"
    )
  }, [state.instances])

  const getInstanceByModel = React.useCallback(
    (modelId: string) => {
      return state.instances.find(
        (inst) =>
          inst.modelId === modelId &&
          (inst.status === "running" || inst.status === "provisioning")
      )
    },
    [state.instances]
  )

  // ============================================================================
  // CONTEXT VALUE
  // ============================================================================

  const value: GPUDeployContextValue = React.useMemo(
    () => ({
      ...state,
      openDeployModal,
      closeDeployModal,
      startDeployment,
      viewInstanceDetails,
      closeInstanceDetails,
      terminateInstance,
      getActiveInstances,
      getInstanceByModel,
    }),
    [
      state,
      openDeployModal,
      closeDeployModal,
      startDeployment,
      viewInstanceDetails,
      closeInstanceDetails,
      terminateInstance,
      getActiveInstances,
      getInstanceByModel,
    ]
  )

  return (
    <GPUDeployContext.Provider value={value}>
      {children}
    </GPUDeployContext.Provider>
  )
}

export function useGPUDeploy(): GPUDeployContextValue {
  const context = React.useContext(GPUDeployContext)
  if (!context) {
    throw new Error("useGPUDeploy must be used within a GPUDeployProvider")
  }
  return context
}
