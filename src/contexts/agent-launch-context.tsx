"use client"

import * as React from "react"
import { AgentLaunchModal } from "@/components/trading"

interface AgentLaunchContextValue {
  /** Open the create agent modal */
  openCreateAgent: () => void
  /** Close the create agent modal */
  closeCreateAgent: () => void
  /** Whether the modal is currently open */
  isOpen: boolean
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
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)

  const openCreateAgent = React.useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeCreateAgent = React.useCallback(() => {
    setIsOpen(false)
  }, [])

  const value = React.useMemo(
    () => ({
      openCreateAgent,
      closeCreateAgent,
      isOpen,
    }),
    [openCreateAgent, closeCreateAgent, isOpen]
  )

  return (
    <AgentLaunchContext.Provider value={value}>
      {children}
      <AgentLaunchModal
        open={isOpen}
        onOpenChange={setIsOpen}
        isAuthenticated={isAuthenticated}
        onSignIn={() => setIsAuthenticated(true)}
        onSelectModel={() => {}}
        onCreateAgent={(data) => {
          console.log("Creating agent:", data)
          // TODO: Integrate with actual agent creation
          setIsOpen(false)
        }}
        onLaunch={() => {
          setIsOpen(false)
        }}
      />
    </AgentLaunchContext.Provider>
  )
}
