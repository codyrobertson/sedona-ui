import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

// Hoist stable function references to avoid infinite re-render loops
// (useEffect depends on getFormData identity — inline arrows would change every render)
const mocks = vi.hoisted(() => ({
  push: vi.fn(),
  advance: vi.fn().mockReturnValue({ currentPhase: "tour" }),
  skip: vi.fn().mockReturnValue({ currentPhase: "completed" }),
  saveProfile: vi.fn().mockResolvedValue(true),
  loadProfile: vi.fn(),
  clearErrors: vi.fn(),
  connectHF: vi.fn(),
  signOutHF: vi.fn(),
  trackOnboardingProfileCompleted: vi.fn(),
  trackOnboardingSkipped: vi.fn(),
  getFormData: vi.fn(() => ({
    displayName: "",
    email: "",
    bio: "",
    socials: { twitter: "", discord: "", telegram: "", github: "" },
    preferences: {
      emailNotifications: true,
      agentAlerts: true,
      weeklyDigest: true,
      marketingEmails: false,
    },
  })),
}))

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mocks.push }),
}))

vi.mock("@/contexts", () => ({
  useProfile: () => ({
    profile: null,
    isLoading: false,
    isSaving: false,
    error: null,
    validationErrors: [],
    loadProfile: mocks.loadProfile,
    saveProfile: mocks.saveProfile,
    getFormData: mocks.getFormData,
    clearErrors: mocks.clearErrors,
  }),
  useAgentLaunch: () => ({
    connectHF: mocks.connectHF,
    isHFAuthenticated: false,
    hfUsername: null,
    signOutHF: mocks.signOutHF,
  }),
  useOnboardingV2: () => ({
    state: { currentPhase: "profile" },
    advance: mocks.advance,
    skip: mocks.skip,
  }),
}))

vi.mock("@/lib/analytics", () => ({
  trackOnboardingProfileCompleted: mocks.trackOnboardingProfileCompleted,
  trackOnboardingSkipped: mocks.trackOnboardingSkipped,
}))

vi.mock("@/fixtures", () => ({
  MY_WALLET: "mock-wallet-address",
}))

vi.mock("@/lib/profile-validation", () => ({
  getFieldError: () => undefined,
}))

vi.mock("@/components/sedona/sedona-logo", () => ({
  SedonaLogo: () => <div data-testid="sedona-logo">Sedona</div>,
}))

vi.mock("@/components/ui/icon", () => ({
  Icon: () => <span data-testid="icon" />,
}))

vi.mock("@/components/ui/switch", () => ({
  Switch: ({ checked, onCheckedChange }: any) => (
    <button role="switch" aria-checked={checked} onClick={() => onCheckedChange?.(!checked)} />
  ),
}))

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick, disabled }: any) => (
    <button onClick={onClick} disabled={disabled}>{children}</button>
  ),
}))

import OnboardingProfileClient from "../onboarding-profile-client"

describe("OnboardingProfileClient", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.saveProfile.mockResolvedValue(true)
    mocks.advance.mockReturnValue({ currentPhase: "tour" })
    mocks.skip.mockReturnValue({ currentPhase: "completed" })
    mocks.getFormData.mockReturnValue({
      displayName: "",
      email: "",
      bio: "",
      socials: { twitter: "", discord: "", telegram: "", github: "" },
      preferences: {
        emailNotifications: true,
        agentAlerts: true,
        weeklyDigest: true,
        marketingEmails: false,
      },
    })
  })

  it("renders profile setup heading", () => {
    render(<OnboardingProfileClient />)
    expect(screen.getByText(/set up your profile/i)).toBeInTheDocument()
  })

  it("renders step indicator", () => {
    render(<OnboardingProfileClient />)
    expect(screen.getByText(/step 1 of 2/i)).toBeInTheDocument()
  })

  it("renders display name, email, and bio fields", () => {
    render(<OnboardingProfileClient />)
    expect(screen.getByPlaceholderText(/how you want to be known/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/your@email.com/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/tell us about yourself/i)).toBeInTheDocument()
  })

  it("renders social link fields", () => {
    render(<OnboardingProfileClient />)
    // Twitter and Telegram both use "@username" placeholder
    const usernameFields = screen.getAllByPlaceholderText("@username")
    expect(usernameFields).toHaveLength(2)
    expect(screen.getByPlaceholderText("username#0000")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("username")).toBeInTheDocument()
  })

  it("renders Hugging Face connection section", () => {
    render(<OnboardingProfileClient />)
    expect(screen.getByText(/hugging face/i)).toBeInTheDocument()
  })

  it("renders save and continue button", () => {
    render(<OnboardingProfileClient />)
    expect(screen.getByRole("button", { name: /save.*continue/i })).toBeInTheDocument()
  })

  it("renders skip link", () => {
    render(<OnboardingProfileClient />)
    expect(screen.getByText(/skip for now/i)).toBeInTheDocument()
  })

  it("does NOT render GPU instances", () => {
    render(<OnboardingProfileClient />)
    expect(screen.queryByText(/gpu instances/i)).not.toBeInTheDocument()
  })

  it("navigates to /trading on skip", async () => {
    const user = userEvent.setup()
    render(<OnboardingProfileClient />)
    await user.click(screen.getByText(/skip for now/i))
    expect(mocks.skip).toHaveBeenCalled()
    expect(mocks.trackOnboardingSkipped).toHaveBeenCalledWith("profile")
    expect(mocks.push).toHaveBeenCalledWith("/trading")
  })

  it("saves profile and advances on Save & Continue", async () => {
    const user = userEvent.setup()
    render(<OnboardingProfileClient />)
    await user.click(screen.getByRole("button", { name: /save.*continue/i }))

    await waitFor(() => {
      expect(mocks.saveProfile).toHaveBeenCalled()
      expect(mocks.advance).toHaveBeenCalledWith("profile")
      expect(mocks.trackOnboardingProfileCompleted).toHaveBeenCalled()
      expect(mocks.push).toHaveBeenCalledWith("/trading")
    })
  })
})
