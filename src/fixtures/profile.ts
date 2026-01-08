/**
 * Profile Fixtures
 * Mock user profile data for development and testing
 */

import type {
  UserProfile,
  SocialLinks,
  CommunicationPreferences,
  ProfileFormData,
} from "@/types/profile"
import { DEFAULT_COMMUNICATION_PREFERENCES } from "@/types/profile"
import { MY_WALLET } from "./agents-unified"
import { MOCK_WALLETS } from "./wallet"

// =============================================================================
// MOCK PROFILES
// =============================================================================

/**
 * Mock profile for the primary test user (MY_WALLET)
 * Fully filled out profile with all fields
 */
const MOCK_PROFILE_USER: UserProfile = {
  walletAddress: MY_WALLET,
  displayName: "CryptoTrader",
  email: "trader@example.com",
  bio: "Full-time AI agent trader. Building the future of autonomous finance on Sedona. Always looking for the next 100x agent.",
  socials: {
    twitter: "cryptotrader_ai",
    discord: "cryptotrader",
    telegram: "cryptotrader_ai",
    github: "cryptotrader",
  },
  preferences: {
    emailNotifications: true,
    agentAlerts: true,
    weeklyDigest: true,
    marketingEmails: false,
  },
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-03-10T14:45:00Z",
}

/**
 * Mock profile for trader1 - partial profile (some fields missing)
 */
const MOCK_PROFILE_TRADER1: UserProfile = {
  walletAddress: MOCK_WALLETS.trader1,
  displayName: "WhaleWatcher",
  email: "whale@example.com",
  bio: "Tracking whale movements in the AI agent ecosystem.",
  socials: {
    twitter: "whalewatcher",
    discord: undefined,
    telegram: undefined,
    github: undefined,
  },
  preferences: {
    emailNotifications: true,
    agentAlerts: true,
    weeklyDigest: false,
    marketingEmails: false,
  },
  createdAt: "2024-02-01T08:00:00Z",
  updatedAt: "2024-02-01T08:00:00Z",
}

/**
 * Mock profile for trader2 - minimal profile (only required fields)
 */
const MOCK_PROFILE_TRADER2: UserProfile = {
  walletAddress: MOCK_WALLETS.trader2,
  displayName: undefined,
  email: undefined,
  bio: undefined,
  socials: {},
  preferences: DEFAULT_COMMUNICATION_PREFERENCES,
  createdAt: "2024-03-01T12:00:00Z",
  updatedAt: "2024-03-01T12:00:00Z",
}

/**
 * Mock profile for a power user with all socials
 */
const MOCK_PROFILE_POWER_USER: UserProfile = {
  walletAddress: "PwRuSeR1111111111111111111111111111111111111",
  displayName: "AgentMaximalist",
  email: "max@agentmaxi.com",
  bio: "Building and trading AI agents since day 1. Top 10 in the Sedona leaderboard. DMs open for collabs.",
  socials: {
    twitter: "agentmaxi",
    discord: "agentmaxi#1234",
    telegram: "agentmaximalist",
    github: "agent-maximalist",
  },
  preferences: {
    emailNotifications: true,
    agentAlerts: true,
    weeklyDigest: true,
    marketingEmails: true,
  },
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-03-15T18:30:00Z",
}

/**
 * Mock profile for a privacy-focused user
 */
const MOCK_PROFILE_PRIVATE: UserProfile = {
  walletAddress: "PrIvAtE1111111111111111111111111111111111111",
  displayName: "Anon",
  email: undefined,
  bio: "Prefer to stay anonymous.",
  socials: {},
  preferences: {
    emailNotifications: false,
    agentAlerts: false,
    weeklyDigest: false,
    marketingEmails: false,
  },
  createdAt: "2024-02-15T00:00:00Z",
  updatedAt: "2024-02-15T00:00:00Z",
}

/**
 * All mock profiles array
 */
export const MOCK_PROFILES: UserProfile[] = [
  MOCK_PROFILE_USER,
  MOCK_PROFILE_TRADER1,
  MOCK_PROFILE_TRADER2,
  MOCK_PROFILE_POWER_USER,
  MOCK_PROFILE_PRIVATE,
]

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get a profile by wallet address
 * @param walletAddress - The wallet address to look up
 * @returns The profile if found, null otherwise
 */
export function getProfileByWallet(walletAddress: string): UserProfile | null {
  return MOCK_PROFILES.find((p) => p.walletAddress === walletAddress) ?? null
}

/**
 * Check if a profile exists for a wallet address
 * @param walletAddress - The wallet address to check
 * @returns true if profile exists
 */
export function hasProfileForWallet(walletAddress: string): boolean {
  return MOCK_PROFILES.some((p) => p.walletAddress === walletAddress)
}

/**
 * Get a default empty profile for a new user
 * @param walletAddress - The wallet address for the new profile
 * @returns A new profile with default values
 */
export function getDefaultProfile(walletAddress: string): UserProfile {
  const now = new Date().toISOString()
  return {
    walletAddress,
    displayName: undefined,
    email: undefined,
    bio: undefined,
    socials: {},
    preferences: { ...DEFAULT_COMMUNICATION_PREFERENCES },
    createdAt: now,
    updatedAt: now,
  }
}

/**
 * Convert a UserProfile to ProfileFormData for form initialization
 * @param profile - The profile to convert (or null for empty form)
 * @returns Form data with all fields as strings
 */
export function profileToFormData(profile: UserProfile | null): ProfileFormData {
  if (!profile) {
    return {
      displayName: "",
      email: "",
      bio: "",
      socials: {
        twitter: "",
        discord: "",
        telegram: "",
        github: "",
      },
      preferences: { ...DEFAULT_COMMUNICATION_PREFERENCES },
    }
  }

  return {
    displayName: profile.displayName ?? "",
    email: profile.email ?? "",
    bio: profile.bio ?? "",
    socials: {
      twitter: profile.socials.twitter ?? "",
      discord: profile.socials.discord ?? "",
      telegram: profile.socials.telegram ?? "",
      github: profile.socials.github ?? "",
    },
    preferences: { ...profile.preferences },
  }
}

/**
 * Convert ProfileFormData back to a UserProfile update
 * @param formData - The form data to convert
 * @param walletAddress - The wallet address for the profile
 * @param existingProfile - The existing profile (for createdAt timestamp)
 * @returns Updated profile data
 */
export function formDataToProfile(
  formData: ProfileFormData,
  walletAddress: string,
  existingProfile: UserProfile | null
): UserProfile {
  const now = new Date().toISOString()

  // Clean up empty strings to undefined
  const cleanSocials: SocialLinks = {}
  if (formData.socials.twitter?.trim()) cleanSocials.twitter = formData.socials.twitter.trim()
  if (formData.socials.discord?.trim()) cleanSocials.discord = formData.socials.discord.trim()
  if (formData.socials.telegram?.trim()) cleanSocials.telegram = formData.socials.telegram.trim()
  if (formData.socials.github?.trim()) cleanSocials.github = formData.socials.github.trim()

  return {
    walletAddress,
    displayName: formData.displayName.trim() || undefined,
    email: formData.email.trim() || undefined,
    bio: formData.bio.trim() || undefined,
    socials: cleanSocials,
    preferences: formData.preferences,
    createdAt: existingProfile?.createdAt ?? now,
    updatedAt: now,
  }
}

/**
 * Get the mock user profile (convenience export for testing)
 */
export const MOCK_USER_PROFILE = MOCK_PROFILE_USER
