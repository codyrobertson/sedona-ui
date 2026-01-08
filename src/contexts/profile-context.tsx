"use client"

import * as React from "react"
import type {
  UserProfile,
  ProfileFormData,
  ProfileValidationError,
  ProfileState,
} from "@/types/profile"
import {
  getProfile,
  saveProfile as saveProfileToStorage,
  deleteProfile as deleteProfileFromStorage,
  hasProfile as hasProfileInStorage,
} from "@/lib/profile-storage"
import { validateProfile } from "@/lib/profile-validation"
import {
  getDefaultProfile,
  profileToFormData,
  formDataToProfile,
} from "@/fixtures/profile"

// =============================================================================
// TYPES
// =============================================================================

interface ProfileContextValue extends ProfileState {
  /** Load profile from storage for a wallet address */
  loadProfile: (walletAddress: string) => Promise<void>
  /** Save profile data */
  saveProfile: (formData: ProfileFormData) => Promise<boolean>
  /** Update specific profile fields */
  updateProfile: (updates: Partial<ProfileFormData>) => void
  /** Clear profile state (not storage) */
  clearProfile: () => void
  /** Delete profile from storage */
  deleteProfile: () => Promise<boolean>
  /** Current wallet address */
  walletAddress: string | null
  /** Convert current profile to form data */
  getFormData: () => ProfileFormData
  /** Clear validation errors */
  clearErrors: () => void
}

const ProfileContext = React.createContext<ProfileContextValue | null>(null)

// =============================================================================
// HOOK
// =============================================================================

/**
 * Hook to access profile context
 * @throws Error if used outside ProfileProvider
 */
export function useProfile() {
  const context = React.useContext(ProfileContext)
  if (!context) {
    throw new Error("useProfile must be used within ProfileProvider")
  }
  return context
}

// =============================================================================
// PROVIDER
// =============================================================================

interface ProfileProviderProps {
  children: React.ReactNode
  /** Optional initial wallet address to load profile for */
  initialWalletAddress?: string
}

export function ProfileProvider({
  children,
  initialWalletAddress,
}: ProfileProviderProps) {
  // State
  const [profile, setProfile] = React.useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSaving, setIsSaving] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [validationErrors, setValidationErrors] = React.useState<ProfileValidationError[]>([])
  const [walletAddress, setWalletAddress] = React.useState<string | null>(
    initialWalletAddress ?? null
  )

  // Form data state (for tracking unsaved changes)
  const [formData, setFormData] = React.useState<ProfileFormData>(() =>
    profileToFormData(null)
  )

  // Load profile when wallet address changes
  const loadProfile = React.useCallback(async (address: string) => {
    setIsLoading(true)
    setError(null)
    setValidationErrors([])
    setWalletAddress(address)

    try {
      // Simulate async (for future API compatibility)
      await new Promise((resolve) => setTimeout(resolve, 100))

      const loadedProfile = getProfile(address)

      if (loadedProfile) {
        setProfile(loadedProfile)
        setFormData(profileToFormData(loadedProfile))
      } else {
        // No existing profile - use defaults
        const defaultProfile = getDefaultProfile(address)
        setProfile(null) // null indicates new profile
        setFormData(profileToFormData(defaultProfile))
      }
    } catch (err) {
      setError("Failed to load profile")
      console.error("Profile load error:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Load initial profile on mount
  React.useEffect(() => {
    if (initialWalletAddress) {
      loadProfile(initialWalletAddress)
    }
  }, [initialWalletAddress, loadProfile])

  // Save profile
  const saveProfile = React.useCallback(
    async (data: ProfileFormData): Promise<boolean> => {
      if (!walletAddress) {
        setError("No wallet connected")
        return false
      }

      setIsSaving(true)
      setError(null)
      setValidationErrors([])

      try {
        // Validate
        const validation = validateProfile(data)
        if (!validation.valid) {
          setValidationErrors(validation.errors)
          return false
        }

        // Convert form data to profile
        const profileToSave = formDataToProfile(data, walletAddress, profile)

        // Simulate async (for future API compatibility)
        await new Promise((resolve) => setTimeout(resolve, 200))

        // Save to storage
        const success = saveProfileToStorage(walletAddress, profileToSave)

        if (success) {
          setProfile(profileToSave)
          setFormData(profileToFormData(profileToSave))
          return true
        } else {
          setError("Failed to save profile. Storage may be full.")
          return false
        }
      } catch (err) {
        setError("Failed to save profile")
        console.error("Profile save error:", err)
        return false
      } finally {
        setIsSaving(false)
      }
    },
    [walletAddress, profile]
  )

  // Update form data (partial updates)
  const updateProfile = React.useCallback((updates: Partial<ProfileFormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...updates,
      socials: {
        ...prev.socials,
        ...(updates.socials ?? {}),
      },
      preferences: {
        ...prev.preferences,
        ...(updates.preferences ?? {}),
      },
    }))
    // Clear validation errors when user makes changes
    setValidationErrors([])
  }, [])

  // Clear profile state
  const clearProfile = React.useCallback(() => {
    setProfile(null)
    setFormData(profileToFormData(null))
    setWalletAddress(null)
    setError(null)
    setValidationErrors([])
  }, [])

  // Delete profile from storage
  const deleteProfileAction = React.useCallback(async (): Promise<boolean> => {
    if (!walletAddress) return false

    try {
      const success = deleteProfileFromStorage(walletAddress)
      if (success) {
        setProfile(null)
        setFormData(profileToFormData(null))
      }
      return success
    } catch (err) {
      console.error("Profile delete error:", err)
      return false
    }
  }, [walletAddress])

  // Get current form data
  const getFormData = React.useCallback(() => formData, [formData])

  // Clear errors
  const clearErrors = React.useCallback(() => {
    setError(null)
    setValidationErrors([])
  }, [])

  // Context value
  const value = React.useMemo<ProfileContextValue>(
    () => ({
      profile,
      isLoading,
      isSaving,
      error,
      validationErrors,
      walletAddress,
      loadProfile,
      saveProfile,
      updateProfile,
      clearProfile,
      deleteProfile: deleteProfileAction,
      getFormData,
      clearErrors,
    }),
    [
      profile,
      isLoading,
      isSaving,
      error,
      validationErrors,
      walletAddress,
      loadProfile,
      saveProfile,
      updateProfile,
      clearProfile,
      deleteProfileAction,
      getFormData,
      clearErrors,
    ]
  )

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  )
}
