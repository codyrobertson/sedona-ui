"use client"

import * as React from "react"
import { AgentLaunchModal, type CreateAgentData } from "@/components/trading"

// =============================================================================
// HUGGINGFACE OAUTH CONFIGURATION
// =============================================================================

const HF_OAUTH_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_HF_CLIENT_ID || "demo-client-id",
  redirectUri: typeof window !== "undefined"
    ? `${window.location.origin}/api/auth/hf/callback`
    : "",
  authUrl: "https://huggingface.co/oauth/authorize",
  tokenUrl: "https://huggingface.co/oauth/token",
  scope: "read-repos",
}

// =============================================================================
// TYPES
// =============================================================================

interface HFAuthState {
  accessToken: string | null
  username: string | null
  expiresAt: number | null
}

interface AgentLaunchContextValue {
  /** Open the create agent modal */
  openCreateAgent: () => void
  /** Close the create agent modal */
  closeCreateAgent: () => void
  /** Whether the modal is currently open */
  isOpen: boolean
  /** Whether user is authenticated with HuggingFace */
  isHFAuthenticated: boolean
  /** HuggingFace username if authenticated */
  hfUsername: string | null
  /** Sign out from HuggingFace */
  signOutHF: () => void
}

const AgentLaunchContext = React.createContext<AgentLaunchContextValue | null>(null)

export function useAgentLaunch() {
  const context = React.useContext(AgentLaunchContext)
  if (!context) {
    throw new Error("useAgentLaunch must be used within AgentLaunchProvider")
  }
  return context
}

// =============================================================================
// STORAGE HELPERS
// =============================================================================

const HF_AUTH_STORAGE_KEY = "sedona_hf_auth"

function loadAuthState(): HFAuthState {
  if (typeof window === "undefined") {
    return { accessToken: null, username: null, expiresAt: null }
  }
  try {
    const stored = localStorage.getItem(HF_AUTH_STORAGE_KEY)
    if (!stored) return { accessToken: null, username: null, expiresAt: null }
    const parsed = JSON.parse(stored) as HFAuthState
    // Check if token is expired
    if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
      localStorage.removeItem(HF_AUTH_STORAGE_KEY)
      return { accessToken: null, username: null, expiresAt: null }
    }
    return parsed
  } catch {
    return { accessToken: null, username: null, expiresAt: null }
  }
}

function saveAuthState(state: HFAuthState): void {
  if (typeof window === "undefined") return
  localStorage.setItem(HF_AUTH_STORAGE_KEY, JSON.stringify(state))
}

function clearAuthState(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(HF_AUTH_STORAGE_KEY)
}

// =============================================================================
// PROVIDER
// =============================================================================

interface AgentLaunchProviderProps {
  children: React.ReactNode
}

export function AgentLaunchProvider({ children }: AgentLaunchProviderProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  // Initialize with empty state to prevent hydration mismatch - localStorage is client-only
  const [authState, setAuthState] = React.useState<HFAuthState>({
    accessToken: null,
    username: null,
    expiresAt: null,
  })
  const [mounted, setMounted] = React.useState(false)

  const isHFAuthenticated = mounted && Boolean(authState.accessToken)

  // Load persisted auth state on mount (client-side only)
  React.useEffect(() => {
    setAuthState(loadAuthState())
    setMounted(true)
  }, [])

  // Listen for OAuth callback messages from popup
  React.useEffect(() => {
    function handleMessage(event: MessageEvent) {
      // Verify origin in production
      if (event.data?.type === "HF_AUTH_SUCCESS") {
        const { accessToken, username, expiresIn } = event.data
        const newState: HFAuthState = {
          accessToken,
          username,
          expiresAt: Date.now() + (expiresIn || 3600) * 1000,
        }
        setAuthState(newState)
        saveAuthState(newState)
      }
    }
    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  const openCreateAgent = React.useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeCreateAgent = React.useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleSignIn = React.useCallback(() => {
    // In demo mode, simulate successful authentication
    if (HF_OAUTH_CONFIG.clientId === "demo-client-id") {
      const demoState: HFAuthState = {
        accessToken: "demo-token-" + Date.now(),
        username: "demo-user",
        expiresAt: Date.now() + 3600 * 1000, // 1 hour
      }
      setAuthState(demoState)
      saveAuthState(demoState)
      return
    }

    // Production: Open HuggingFace OAuth popup
    const state = crypto.randomUUID()
    sessionStorage.setItem("hf_oauth_state", state)

    const params = new URLSearchParams({
      client_id: HF_OAUTH_CONFIG.clientId,
      redirect_uri: HF_OAUTH_CONFIG.redirectUri,
      scope: HF_OAUTH_CONFIG.scope,
      response_type: "code",
      state,
    })

    const authUrl = `${HF_OAUTH_CONFIG.authUrl}?${params}`
    const popup = window.open(authUrl, "hf_auth", "width=600,height=700")

    // Poll for popup close (fallback if postMessage fails)
    const pollTimer = setInterval(() => {
      if (popup?.closed) {
        clearInterval(pollTimer)
        // Check if auth state was updated via postMessage
        setAuthState(loadAuthState())
      }
    }, 500)
  }, [])

  const signOutHF = React.useCallback(() => {
    clearAuthState()
    setAuthState({ accessToken: null, username: null, expiresAt: null })
  }, [])

  const handleCreateAgent = React.useCallback(async (data: CreateAgentData) => {
    console.log("Creating agent:", data)
    console.log("  - HuggingFace repo:", data.huggingFaceRepo)
    console.log("  - Commit:", data.commitHash)

    // In demo mode, just log and return
    if (!authState.accessToken || authState.accessToken.startsWith("demo-")) {
      console.log("[Demo Mode] Agent creation simulated")
      return
    }

    // Production: Call API to create agent and start evaluation
    // const response = await fetch("/api/agents", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${authState.accessToken}`,
    //   },
    //   body: JSON.stringify({
    //     huggingFaceRepo: data.huggingFaceRepo,
    //     commitHash: data.commitHash,
    //   }),
    // })
    // if (!response.ok) throw new Error("Failed to create agent")
    // return response.json()
  }, [authState.accessToken])

  const value = React.useMemo(
    () => ({
      openCreateAgent,
      closeCreateAgent,
      isOpen,
      isHFAuthenticated,
      hfUsername: authState.username,
      signOutHF,
    }),
    [openCreateAgent, closeCreateAgent, isOpen, isHFAuthenticated, authState.username, signOutHF]
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
