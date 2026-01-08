/**
 * Profile Validation Utilities
 * Client-side validation for user profile fields
 */

import type {
  ProfileFormData,
  ProfileValidationError,
  ProfileValidationResult,
  SocialPlatform,
} from "@/types/profile"

// =============================================================================
// VALIDATION CONSTANTS
// =============================================================================

/** Minimum display name length */
export const MIN_DISPLAY_NAME_LENGTH = 3

/** Maximum display name length */
export const MAX_DISPLAY_NAME_LENGTH = 50

/** Maximum bio length */
export const MAX_BIO_LENGTH = 500

/** Email regex pattern (RFC 5322 simplified) */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// =============================================================================
// FIELD VALIDATORS
// =============================================================================

/**
 * Validate email address format
 * @param email - Email to validate (can be empty)
 * @returns Error message or null if valid
 */
export function validateEmail(email: string): string | null {
  // Empty email is valid (field is optional)
  if (!email || email.trim() === "") {
    return null
  }

  const trimmed = email.trim()

  if (trimmed.length > 254) {
    return "Email address is too long"
  }

  if (!EMAIL_REGEX.test(trimmed)) {
    return "Please enter a valid email address"
  }

  return null
}

/**
 * Validate display name
 * @param displayName - Name to validate (can be empty)
 * @returns Error message or null if valid
 */
export function validateDisplayName(displayName: string): string | null {
  // Empty display name is valid (field is optional)
  if (!displayName || displayName.trim() === "") {
    return null
  }

  const trimmed = displayName.trim()

  if (trimmed.length < MIN_DISPLAY_NAME_LENGTH) {
    return `Display name must be at least ${MIN_DISPLAY_NAME_LENGTH} characters`
  }

  if (trimmed.length > MAX_DISPLAY_NAME_LENGTH) {
    return `Display name must be less than ${MAX_DISPLAY_NAME_LENGTH} characters`
  }

  // Check for invalid characters (allow letters, numbers, spaces, underscores, hyphens)
  if (!/^[\w\s-]+$/.test(trimmed)) {
    return "Display name can only contain letters, numbers, spaces, underscores, and hyphens"
  }

  return null
}

/**
 * Validate bio text
 * @param bio - Bio to validate (can be empty)
 * @returns Error message or null if valid
 */
export function validateBio(bio: string): string | null {
  // Empty bio is valid (field is optional)
  if (!bio || bio.trim() === "") {
    return null
  }

  if (bio.length > MAX_BIO_LENGTH) {
    return `Bio must be less than ${MAX_BIO_LENGTH} characters`
  }

  return null
}

/**
 * Validate a social link value
 * @param platform - The social platform
 * @param value - The username/handle to validate (can be empty)
 * @returns Error message or null if valid
 */
export function validateSocialLink(
  platform: SocialPlatform,
  value: string
): string | null {
  // Empty values are valid (all social links are optional)
  if (!value || value.trim() === "") {
    return null
  }

  const trimmed = value.trim()

  // Remove @ prefix if present for validation
  const normalizedValue = trimmed.startsWith("@") ? trimmed.slice(1) : trimmed

  switch (platform) {
    case "twitter":
      // Twitter usernames: 1-15 characters, alphanumeric and underscores
      if (normalizedValue.length > 15) {
        return "Twitter username must be 15 characters or less"
      }
      if (!/^[\w]+$/.test(normalizedValue)) {
        return "Twitter username can only contain letters, numbers, and underscores"
      }
      break

    case "discord":
      // Discord new format: 2-32 lowercase letters, numbers, periods, underscores
      // Or legacy format: Username#0000
      if (trimmed.includes("#")) {
        // Legacy format
        if (!/^.+#\d{4}$/.test(trimmed)) {
          return "Discord username should be in format username#0000 or just username"
        }
      } else {
        if (normalizedValue.length < 2 || normalizedValue.length > 32) {
          return "Discord username must be 2-32 characters"
        }
      }
      break

    case "telegram":
      // Telegram usernames: 5-32 characters, alphanumeric and underscores
      if (normalizedValue.length < 5) {
        return "Telegram username must be at least 5 characters"
      }
      if (normalizedValue.length > 32) {
        return "Telegram username must be 32 characters or less"
      }
      if (!/^[\w]+$/.test(normalizedValue)) {
        return "Telegram username can only contain letters, numbers, and underscores"
      }
      break

    case "github":
      // GitHub usernames: 1-39 characters, alphanumeric and hyphens, no consecutive hyphens
      if (normalizedValue.length > 39) {
        return "GitHub username must be 39 characters or less"
      }
      if (!/^[\w-]+$/.test(normalizedValue)) {
        return "GitHub username can only contain letters, numbers, and hyphens"
      }
      if (/--/.test(normalizedValue)) {
        return "GitHub username cannot have consecutive hyphens"
      }
      if (normalizedValue.startsWith("-") || normalizedValue.endsWith("-")) {
        return "GitHub username cannot start or end with a hyphen"
      }
      break
  }

  return null
}

// =============================================================================
// FULL PROFILE VALIDATION
// =============================================================================

/**
 * Validate a complete profile form
 * @param formData - The form data to validate
 * @returns Validation result with any errors
 */
export function validateProfile(formData: ProfileFormData): ProfileValidationResult {
  const errors: ProfileValidationError[] = []

  // Validate basic fields
  const emailError = validateEmail(formData.email)
  if (emailError) {
    errors.push({ field: "email", message: emailError })
  }

  const displayNameError = validateDisplayName(formData.displayName)
  if (displayNameError) {
    errors.push({ field: "displayName", message: displayNameError })
  }

  const bioError = validateBio(formData.bio)
  if (bioError) {
    errors.push({ field: "bio", message: bioError })
  }

  // Validate social links
  const socialPlatforms: SocialPlatform[] = ["twitter", "discord", "telegram", "github"]
  for (const platform of socialPlatforms) {
    const value = formData.socials[platform]
    if (value) {
      const error = validateSocialLink(platform, value)
      if (error) {
        errors.push({ field: platform, message: error })
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Get error message for a specific field
 * @param errors - Array of validation errors
 * @param field - Field name to look up
 * @returns Error message or undefined
 */
export function getFieldError(
  errors: ProfileValidationError[],
  field: string
): string | undefined {
  return errors.find((e) => e.field === field)?.message
}

/**
 * Check if form has any errors
 * @param errors - Array of validation errors
 * @returns true if there are errors
 */
export function hasErrors(errors: ProfileValidationError[]): boolean {
  return errors.length > 0
}
