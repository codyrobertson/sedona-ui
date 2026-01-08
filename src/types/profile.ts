/**
 * Profile Types
 * User profile data structures for the Sedona platform
 */

// =============================================================================
// SOCIAL LINKS
// =============================================================================

/**
 * Social media platform identifiers
 */
export type SocialPlatform = "twitter" | "discord" | "telegram" | "github"

/**
 * Social links configuration for user profiles
 * All fields are optional strings containing usernames/handles
 */
export interface SocialLinks {
  /** Twitter/X username (without @) */
  twitter?: string
  /** Discord username (e.g., username#0000 or new username format) */
  discord?: string
  /** Telegram username (without @) */
  telegram?: string
  /** GitHub username */
  github?: string
}

// =============================================================================
// COMMUNICATION PREFERENCES
// =============================================================================

/**
 * User communication preferences for email and notifications
 */
export interface CommunicationPreferences {
  /** Receive important account updates via email */
  emailNotifications: boolean
  /** Receive notifications about agent performance */
  agentAlerts: boolean
  /** Receive weekly summary of platform activity */
  weeklyDigest: boolean
  /** Receive news, announcements, and promotional content */
  marketingEmails: boolean
}

/**
 * Default communication preferences for new users
 */
export const DEFAULT_COMMUNICATION_PREFERENCES: CommunicationPreferences = {
  emailNotifications: true,
  agentAlerts: true,
  weeklyDigest: true,
  marketingEmails: false,
}

// =============================================================================
// USER PROFILE
// =============================================================================

/**
 * Complete user profile data structure
 * Tied to a wallet address as the primary identifier
 */
export interface UserProfile {
  /** Wallet address (primary key) */
  walletAddress: string
  /** User's display name (3-50 characters) */
  displayName?: string
  /** User's email address */
  email?: string
  /** User bio/description (max 500 characters) */
  bio?: string
  /** Social media links */
  socials: SocialLinks
  /** Communication preferences */
  preferences: CommunicationPreferences
  /** Profile creation timestamp (ISO string) */
  createdAt: string
  /** Last update timestamp (ISO string) */
  updatedAt: string
}

/**
 * Partial profile for updates (all fields optional except walletAddress)
 */
export type UserProfileUpdate = Partial<Omit<UserProfile, "walletAddress" | "createdAt">> & {
  walletAddress: string
}

/**
 * Profile form data (matches the form fields in profile-client.tsx)
 */
export interface ProfileFormData {
  displayName: string
  email: string
  bio: string
  socials: SocialLinks
  preferences: CommunicationPreferences
}

// =============================================================================
// VALIDATION
// =============================================================================

/**
 * Validation error for a specific field
 */
export interface ProfileValidationError {
  field: keyof ProfileFormData | keyof SocialLinks | string
  message: string
}

/**
 * Result of profile validation
 */
export interface ProfileValidationResult {
  valid: boolean
  errors: ProfileValidationError[]
}

// =============================================================================
// PROFILE CONTEXT STATE
// =============================================================================

/**
 * Profile loading/saving state
 */
export interface ProfileState {
  /** Current profile data (null if not loaded or no profile exists) */
  profile: UserProfile | null
  /** True while loading profile from storage */
  isLoading: boolean
  /** True while saving profile to storage */
  isSaving: boolean
  /** Error message if load/save failed */
  error: string | null
  /** Validation errors from last save attempt */
  validationErrors: ProfileValidationError[]
}
