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
  const [state, setState] = React.useState<GPUDeployState>({
    ...initialState,
    instances: MOCK_GPU_INSTANCES, // Start with mock data
  })

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
        await new Promise((resolve) => setTimeout(resolve, 3000))

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
        await new Promise((resolve) => setTimeout(resolve, 1500))

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
        }, 2000)

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
