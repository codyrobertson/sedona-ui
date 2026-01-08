/**
 * Profile Storage Utilities
 * localStorage-based persistence for user profiles
 */

import type { UserProfile } from "@/types/profile"

// =============================================================================
// CONSTANTS
// =============================================================================

/** Storage key prefix for profile data */
const STORAGE_KEY_PREFIX = "sedona_profile_"

/** Current profile schema version for migrations */
const PROFILE_SCHEMA_VERSION = 1

// =============================================================================
// STORAGE FUNCTIONS
// =============================================================================

/**
 * Get the storage key for a wallet address
 */
function getStorageKey(walletAddress: string): string {
  return `${STORAGE_KEY_PREFIX}${walletAddress}`
}

/**
 * Check if localStorage is available
 * @returns true if localStorage is available and writable
 */
export function isStorageAvailable(): boolean {
  if (typeof window === "undefined") return false

  try {
    const testKey = "__sedona_storage_test__"
    localStorage.setItem(testKey, "test")
    localStorage.removeItem(testKey)
    return true
  } catch {
    return false
  }
}

/**
 * Get a user profile from localStorage
 * @param walletAddress - The wallet address to look up
 * @returns The profile if found and valid, null otherwise
 */
export function getProfile(walletAddress: string): UserProfile | null {
  if (!isStorageAvailable()) return null

  try {
    const key = getStorageKey(walletAddress)
    const data = localStorage.getItem(key)

    if (!data) return null

    const parsed = JSON.parse(data)

    // Validate basic structure
    if (!parsed || typeof parsed !== "object" || !parsed.walletAddress) {
      return null
    }

    // Ensure required fields exist with defaults
    const profile: UserProfile = {
      walletAddress: parsed.walletAddress,
      displayName: parsed.displayName,
      email: parsed.email,
      bio: parsed.bio,
      socials: parsed.socials ?? {},
      preferences: parsed.preferences ?? {
        emailNotifications: true,
        agentAlerts: true,
        weeklyDigest: true,
        marketingEmails: false,
      },
      createdAt: parsed.createdAt ?? new Date().toISOString(),
      updatedAt: parsed.updatedAt ?? new Date().toISOString(),
    }

    return profile
  } catch {
    // Corrupted data - return null
    return null
  }
}

/**
 * Save a user profile to localStorage
 * @param walletAddress - The wallet address (key)
 * @param profile - The profile data to save
 * @returns true if save was successful, false otherwise
 */
export function saveProfile(walletAddress: string, profile: UserProfile): boolean {
  if (!isStorageAvailable()) return false

  try {
    const key = getStorageKey(walletAddress)
    const data = JSON.stringify({
      ...profile,
      _version: PROFILE_SCHEMA_VERSION,
      updatedAt: new Date().toISOString(),
    })

    localStorage.setItem(key, data)
    return true
  } catch (error) {
    // Quota exceeded or other error
    if (error instanceof Error && error.name === "QuotaExceededError") {
      console.error("Profile storage quota exceeded")
    }
    return false
  }
}

/**
 * Delete a user profile from localStorage
 * @param walletAddress - The wallet address to delete
 * @returns true if deletion was successful
 */
export function deleteProfile(walletAddress: string): boolean {
  if (!isStorageAvailable()) return false

  try {
    const key = getStorageKey(walletAddress)
    localStorage.removeItem(key)
    return true
  } catch {
    return false
  }
}

/**
 * Check if a profile exists for a wallet address
 * @param walletAddress - The wallet address to check
 * @returns true if profile exists in storage
 */
export function hasProfile(walletAddress: string): boolean {
  if (!isStorageAvailable()) return false

  try {
    const key = getStorageKey(walletAddress)
    return localStorage.getItem(key) !== null
  } catch {
    return false
  }
}

/**
 * List all stored profile wallet addresses
 * @returns Array of wallet addresses with stored profiles
 */
export function listStoredProfiles(): string[] {
  if (!isStorageAvailable()) return []

  try {
    const wallets: string[] = []

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith(STORAGE_KEY_PREFIX)) {
        const wallet = key.slice(STORAGE_KEY_PREFIX.length)
        wallets.push(wallet)
      }
    }

    return wallets
  } catch {
    return []
  }
}

/**
 * Clear all stored profiles (use with caution!)
 * @returns Number of profiles cleared
 */
export function clearAllProfiles(): number {
  if (!isStorageAvailable()) return 0

  const wallets = listStoredProfiles()
  let cleared = 0

  for (const wallet of wallets) {
    if (deleteProfile(wallet)) {
      cleared++
    }
  }

  return cleared
}

/**
 * Get approximate storage usage for profiles
 * @returns Object with used bytes and approximate percentage of quota
 */
export function getStorageUsage(): { usedBytes: number; percentUsed: number } {
  if (!isStorageAvailable()) return { usedBytes: 0, percentUsed: 0 }

  try {
    let usedBytes = 0

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith(STORAGE_KEY_PREFIX)) {
        const value = localStorage.getItem(key)
        if (value) {
          usedBytes += key.length + value.length
        }
      }
    }

    // localStorage quota is typically 5-10MB, assume 5MB
    const quotaBytes = 5 * 1024 * 1024
    const percentUsed = (usedBytes / quotaBytes) * 100

    return { usedBytes, percentUsed }
  } catch {
    return { usedBytes: 0, percentUsed: 0 }
  }
}
