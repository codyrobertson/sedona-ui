"use client"

import * as React from "react"
import { AgentLaunchModal, type CreateAgentData } from "@/components/trading"

interface AgentLaunchContextValue {
  /** Open the create agent modal */
  openCreateAgent: () => void
  /** Close the create agent modal */
  closeCreateAgent: () => void
  /** Whether the modal is currently open */
  isOpen: boolean
  /** Whether user is authenticated with HuggingFace */
  isHFAuthenticated: boolean
}

const AgentLaunchContext = React.createContext<AgentLaunchContextValue | null>(null)

export function useAgentLaunch() {
  const context = React.useContext(AgentLaunchContext)
  if (!context) {
    throw new Error("useAgentLaunch must be used within AgentLaunchProvider")
  }
  return context
}

interface AgentLaunchProviderProps {
  children: React.ReactNode
}

export function AgentLaunchProvider({ children }: AgentLaunchProviderProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isHFAuthenticated, setIsHFAuthenticated] = React.useState(false)

  const openCreateAgent = React.useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeCreateAgent = React.useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleSignIn = React.useCallback(() => {
    // TODO: Implement actual HuggingFace OAuth
    setIsHFAuthenticated(true)
  }, [])

  const handleCreateAgent = React.useCallback((data: CreateAgentData) => {
    console.log("Creating agent:", data)
    console.log("  - HuggingFace repo:", data.huggingFaceRepo)
    console.log("  - Commit:", data.commitHash)
    // TODO: Call API to create agent and start evaluation
    // The modal handles its own close and redirect
  }, [])

  const value = React.useMemo(
    () => ({
      openCreateAgent,
      closeCreateAgent,
      isOpen,
      isHFAuthenticated,
    }),
    [openCreateAgent, closeCreateAgent, isOpen, isHFAuthenticated]
  )

  return (
    <AgentLaunchContext.Provider value={value}>
      {children}
      <AgentLaunchModal
        open={isOpen}
        onOpenChange={setIsOpen}
        isAuthenticated={isHFAuthenticated}
        onSignIn={handleSignIn}
        onCreateAgent={handleCreateAgent}
      />
    </AgentLaunchContext.Provider>
  )
}
