/**
 * OG Image Generation Constants
 * Centralized configuration for Open Graph image generation
 */

// =============================================================================
// Dimensions
// =============================================================================

export const OG_WIDTH = 1200
export const OG_HEIGHT = 630
export const TERMINAL_BG_WIDTH = 600
export const TERMINAL_BG_HEIGHT = 630
export const CHART_WIDTH = 520
export const CHART_HEIGHT = 280

// =============================================================================
// Theme Colors (matching design system)
// =============================================================================

export const OG_COLORS = {
  sedonaOrange: "#D56B12",
  surfaceDefault: "#141310",
  surfaceElevated: "#1e1c17",
  textPrimary: "#ffffff",
  textSecondary: "rgba(255,255,255,0.6)",
  textTertiary: "rgba(255,255,255,0.46)",
  green: "#22c55e",
  red: "#ef4444",
} as const

// Color tints for terminal background variety
export const TINT_COLORS = [
  "#D56B12", // Sedona orange
  "#D56B12",
  "#c76a1a", // Darker orange
  "#e07820", // Lighter orange
  "#b85d10", // Deep orange
  "#d4710f",
  "#c26515",
  "#da7018",
  "#bf5f12",
  "#e67d1c",
] as const

// =============================================================================
// Fonts
// =============================================================================

export const FONT_URLS = {
  interSemiBold: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYAZ9hjp-Ek-_0ew.woff",
  interBold: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYAZ9hjp-Ek-_0ew.woff",
} as const

// =============================================================================
// Background Generation
// =============================================================================

export const NUM_TERMINAL_BACKGROUNDS = 20
export const BACKGROUND_ANIMATION_SETTLE_MS = 1000
export const SHADER_INIT_DELAY_MS = 500

// Dev server URL for background generation scripts
export const DEV_SERVER_URL = process.env.DEV_URL || "http://localhost:3002"

// =============================================================================
// Sedona Logomark SVG Path
// =============================================================================

export const LOGOMARK_PATH = `M1.88865 9.85046C1.98205 9.75031 2.01298 9.61357 2.02288 9.47864C2.03278 9.24836 2.02845 9.01927 2.04329 8.78839C2.32722 4.759 5.9273 1.71492 10.0835 1.99018C11.2334 2.06635 12.3054 2.38839 13.2487 2.90053C13.5351 3.05525 13.5549 3.44686 13.2846 3.62677L12.1396 4.38599L12.1279 4.39378L16.3564 6.09033C16.3533 6.08434 16.3502 6.07834 16.3465 6.07234L18.6173 6.98209C18.7194 7.02287 18.827 6.93951 18.8103 6.83456C18.8103 6.83336 18.8097 6.83156 18.8097 6.83037L18.8078 6.82197L17.6697 0.949705C17.6505 0.852553 17.5354 0.806376 17.4513 0.862148L16.0286 1.80608C15.7873 1.9668 15.4675 1.962 15.2312 1.79468C13.8178 0.788385 12.1019 0.146706 10.2227 0.0219683C4.94439 -0.327657 0.373768 3.53741 0.0131406 8.65405C0.000769167 8.93831 -0.0685109 9.3593 0.244486 9.49903C0.499338 9.61357 0.785737 9.71792 1.04925 9.82707C1.40431 9.9686 1.62452 10.0891 1.88865 9.85046Z M18.8771 8.50083C18.6223 8.38629 18.3359 8.28194 18.0723 8.1728C17.7173 8.03127 17.4971 7.91073 17.2329 8.14941C17.1395 8.24956 17.1086 8.38629 17.0987 8.52122C17.0888 8.75151 17.0931 8.98059 17.0783 9.21148C16.7944 13.2409 13.1943 16.2849 9.03811 16.0097C7.88818 15.9335 6.8162 15.6115 5.87287 15.0993C5.58647 14.9446 5.56668 14.553 5.837 14.3731L6.98197 13.6139L6.99372 13.6061L2.76517 11.9095C2.76826 11.9155 2.77135 11.9215 2.77507 11.9275L0.504289 11.0178C0.402225 10.977 0.294593 11.0604 0.311295 11.1653C0.311295 11.1665 0.311913 11.1683 0.311913 11.1695L0.313769 11.1779L1.45194 17.0502C1.47112 17.1473 1.58617 17.1935 1.6703 17.1377L3.09301 16.1938C3.33425 16.0331 3.65406 16.0379 3.89035 16.2052C5.30379 17.2115 7.01971 17.8532 8.89893 17.9779C14.1772 18.3275 18.7478 14.4625 19.1085 9.34581C19.1208 9.06155 19.1901 8.64056 18.8771 8.50083Z M9.63859 4.41472C9.23714 6.58623 7.77298 8.4525 5.75087 8.86029C5.7286 8.86689 5.70077 8.87289 5.67046 8.87888C5.5721 8.89748 5.56839 9.03361 5.66613 9.0558C7.81381 9.53736 9.42271 11.427 9.67633 13.8564C9.70416 14.0693 9.71777 14.1449 9.73509 14.0831C9.75241 14.1449 9.76602 14.0693 9.79385 13.8564C10.0475 11.427 11.6564 9.53736 13.8041 9.0558C13.9018 9.03361 13.8981 8.89748 13.7997 8.87888C13.7694 8.87289 13.7416 8.86689 13.7193 8.86029C11.6972 8.4525 10.233 6.58623 9.83159 4.41472C9.82169 4.36314 9.77839 4.33855 9.73571 4.34155C9.69241 4.33855 9.64911 4.36314 9.63983 4.41472H9.63859Z`

// =============================================================================
// Types
// =============================================================================

export interface OGAgentData {
  name: string
  ticker: string
  price: number
  change: number
  mcap: number
  vol: number
  holders: number
}

// =============================================================================
// Utilities
// =============================================================================

/** Hash ticker to get consistent background index */
export function hashTicker(ticker: string): number {
  let hash = 0
  for (const c of ticker) {
    hash = ((hash << 5) - hash) + c.charCodeAt(0)
    hash = hash & hash
  }
  return Math.abs(hash) % NUM_TERMINAL_BACKGROUNDS
}

/** Format price for display */
export function formatOGPrice(n: number): string {
  if (n >= 1) return `$${n.toFixed(2)}`
  if (n >= 0.01) return `$${n.toFixed(4)}`
  return `$${n.toFixed(6)}`
}

/** Format large numbers (market cap, volume) */
export function formatOGNumber(n: number): string {
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`
  return `$${n.toFixed(0)}`
}

/** Format holder count */
export function formatOGHolders(n: number): string {
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`
  return n.toString()
}

/** Generate sparkline path - fills full width */
export function generateSparklinePath(ticker: string, up: boolean, W: number, H: number): string {
  let seed = 0
  for (const c of ticker) seed += c.charCodeAt(0)

  const pts: number[] = []
  let p = 100
  for (let i = 0; i < 40; i++) {
    const r = Math.sin(seed * (i + 1)) * 10000
    p *= 1 + (r - Math.floor(r) - 0.5) * 0.1
    pts.push(p)
  }

  if ((up && pts[pts.length - 1] < pts[0]) || (!up && pts[pts.length - 1] > pts[0])) pts.reverse()

  const min = Math.min(...pts)
  const max = Math.max(...pts)
  const range = max - min || 1

  // Scale to use 85% of height, leaving room at top
  const chartH = H * 0.85
  const offsetY = H * 0.05

  return pts.map((v, i) => {
    const x = (i / (pts.length - 1)) * W
    const y = offsetY + chartH - ((v - min) / range) * chartH
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`
  }).join(" ")
}
