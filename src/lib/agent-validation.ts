/**
 * Agent Creation Validation Utilities
 * Client-side validation for agent creation form fields
 */

// =============================================================================
// VALIDATION CONSTANTS
// =============================================================================

/** Minimum ticker length */
export const MIN_TICKER_LENGTH = 2

/** Maximum ticker length */
export const MAX_TICKER_LENGTH = 6

/** Minimum agent name length */
export const MIN_AGENT_NAME_LENGTH = 2

/** Maximum agent name length */
export const MAX_AGENT_NAME_LENGTH = 50

/** Maximum description length */
export const MAX_DESCRIPTION_LENGTH = 500

/** Maximum image file size in bytes (2MB) */
export const MAX_IMAGE_SIZE = 2 * 1024 * 1024

/** Allowed image MIME types */
export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
]

// =============================================================================
// TYPES
// =============================================================================

export interface AgentValidationError {
  field: 'name' | 'ticker' | 'description' | 'image'
  message: string
}

export interface AgentValidationResult {
  valid: boolean
  errors: AgentValidationError[]
}

export interface AgentFormData {
  name: string
  ticker: string
  description: string
  imageFile?: File | null
}

// =============================================================================
// FIELD VALIDATORS
// =============================================================================

/**
 * Validate agent ticker symbol
 * @param ticker - Ticker to validate
 * @returns Error message or null if valid
 */
export function validateTicker(ticker: string): string | null {
  const trimmed = ticker.trim().toUpperCase()

  if (!trimmed) {
    return "Ticker is required"
  }

  if (trimmed.length < MIN_TICKER_LENGTH) {
    return `Ticker must be at least ${MIN_TICKER_LENGTH} characters`
  }

  if (trimmed.length > MAX_TICKER_LENGTH) {
    return `Ticker must be ${MAX_TICKER_LENGTH} characters or less`
  }

  // Only allow alphanumeric characters
  if (!/^[A-Z0-9]+$/.test(trimmed)) {
    return "Ticker can only contain letters and numbers"
  }

  return null
}

/**
 * Validate agent name
 * @param name - Name to validate
 * @returns Error message or null if valid
 */
export function validateAgentName(name: string): string | null {
  const trimmed = name.trim()

  if (!trimmed) {
    return "Agent name is required"
  }

  if (trimmed.length < MIN_AGENT_NAME_LENGTH) {
    return `Name must be at least ${MIN_AGENT_NAME_LENGTH} characters`
  }

  if (trimmed.length > MAX_AGENT_NAME_LENGTH) {
    return `Name must be ${MAX_AGENT_NAME_LENGTH} characters or less`
  }

  // Allow letters, numbers, spaces, hyphens, underscores, periods, apostrophes
  if (!/^[\w\s\-.']+$/.test(trimmed)) {
    return "Name contains invalid characters"
  }

  return null
}

/**
 * Validate agent description
 * @param description - Description to validate (optional field)
 * @returns Error message or null if valid
 */
export function validateDescription(description: string): string | null {
  // Description is optional
  if (!description || description.trim() === "") {
    return null
  }

  if (description.length > MAX_DESCRIPTION_LENGTH) {
    return `Description must be ${MAX_DESCRIPTION_LENGTH} characters or less`
  }

  return null
}

/**
 * Validate agent image file
 * @param file - File to validate (optional)
 * @returns Error message or null if valid
 */
export function validateImageFile(file: File | null | undefined): string | null {
  // Image is optional
  if (!file) {
    return null
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return "Please upload a valid image (JPEG, PNG, GIF, WebP, or SVG)"
  }

  if (file.size > MAX_IMAGE_SIZE) {
    const sizeMB = (MAX_IMAGE_SIZE / (1024 * 1024)).toFixed(0)
    return `Image must be smaller than ${sizeMB}MB`
  }

  return null
}

// =============================================================================
// FULL FORM VALIDATION
// =============================================================================

/**
 * Validate complete agent creation form
 * @param formData - The form data to validate
 * @returns Validation result with any errors
 */
export function validateAgentForm(formData: AgentFormData): AgentValidationResult {
  const errors: AgentValidationError[] = []

  const nameError = validateAgentName(formData.name)
  if (nameError) {
    errors.push({ field: 'name', message: nameError })
  }

  const tickerError = validateTicker(formData.ticker)
  if (tickerError) {
    errors.push({ field: 'ticker', message: tickerError })
  }

  const descriptionError = validateDescription(formData.description)
  if (descriptionError) {
    errors.push({ field: 'description', message: descriptionError })
  }

  const imageError = validateImageFile(formData.imageFile)
  if (imageError) {
    errors.push({ field: 'image', message: imageError })
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
export function getAgentFieldError(
  errors: AgentValidationError[],
  field: AgentValidationError['field']
): string | undefined {
  return errors.find((e) => e.field === field)?.message
}

/**
 * Sanitize ticker input (uppercase, remove invalid chars)
 * @param value - Raw input value
 * @returns Sanitized ticker string
 */
export function sanitizeTicker(value: string): string {
  return value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, MAX_TICKER_LENGTH)
}

/**
 * Sanitize agent name input
 * @param value - Raw input value
 * @returns Sanitized name string
 */
export function sanitizeAgentName(value: string): string {
  // Remove control characters and limit length
  return value
    .replace(/[\x00-\x1F\x7F]/g, '')
    .slice(0, MAX_AGENT_NAME_LENGTH)
}
