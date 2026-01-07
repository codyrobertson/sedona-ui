/**
 * Date formatting utilities used across the application
 */

/**
 * Format a timestamp to a localized date string
 * @example formatDate(1704067200000) => "Jan 1, 2024"
 */
export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  })
}

/**
 * Format a timestamp to a relative time string
 * @example formatTimeAgo(Date.now() - 86400000) => "Yesterday"
 */
export function formatTimeAgo(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days === 0) return "Today"
  if (days === 1) return "Yesterday"
  if (days < 7) return `${days}d ago`
  return formatDate(timestamp)
}

/**
 * Format milliseconds to MM:SS format
 * @example formatTime(125000) => "02:05"
 */
export function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}

/**
 * Format a timestamp to HH:MM:SS format
 * @example formatTimestamp(1704067200000) => "12:00:00"
 */
export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp)
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  })
}
