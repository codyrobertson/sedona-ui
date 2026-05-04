/**
 * AeroDash design tokens — single source of truth for radii, colors, motion,
 * fonts, and the modular type scale. Importable from any aerodash component.
 * Treat as read-only.
 */

// ─── Fonts ──────────────────────────────────────────────────────────────────
//
// `sans` prefers the bundled Monument Grotesk so AeroDash renders consistently
// on every machine. Boing remains in the chain as an optional local upgrade for
// machines that have Pangram Pangram installed.
//
// `display` is the chrome UI voice. Monument Grotesk leads so labels stay
// precise and premium; condensed system faces remain only as fallbacks for
// machines that fail to load the bundled font.
//
// `mono` is for code, hashes, addresses, tabular data where character width
// alignment matters more than reading flow.

export const fonts = {
  sans: [
    '"Monument Grotesk"',
    "Boing",
    "PP Boing",
    "Boing Test",
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI Variable"',
    '"Segoe UI"',
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
  ].join(", "),
  display: [
    '"Monument Grotesk"',
    '"Arial Narrow"',
    '"Roboto Condensed"',
    "Impact",
    '"Helvetica Inserat"',
    '"Bebas Neue"',
    "ui-sans-serif",
    "sans-serif",
  ].join(", "),
  mono: [
    '"JetBrains Mono"',
    '"Source Code Pro"',
    "ui-monospace",
    '"SF Mono"',
    "Menlo",
    "Consolas",
    "monospace",
  ].join(", "),
} as const

// ─── Type scale ─────────────────────────────────────────────────────────────
//
// Modular ratio ~1.25 from a 13px (0.8125rem) base. Five contrast steps for
// product UI; jumps are deliberate — close-together sizes flatten hierarchy.
// Lineheight gets tighter at display sizes (UI shouldn't breathe like prose).

export const fontSize = {
  micro:   "10px",   // chevron tag labels, eyebrow micro-caps
  xs:      "11px",   // small caps, status pills
  sm:      "12px",   // dense labels, table cells
  base:    "13px",   // body in product UI
  md:      "15px",   // emphasis body / lead paragraphs
  lg:      "19px",   // section heading
  xl:      "24px",   // page heading
  "2xl":   "32px",   // KPI values
  "3xl":   "44px",   // hero / display
} as const

export const lineHeight = {
  tight:   "1.05",   // display + KPI numerals
  snug:    "1.2",    // headings
  normal:  "1.45",   // body
  relaxed: "1.6",    // marketing copy
} as const

export const fontWeight = {
  regular:  400,
  medium:   500,
  semibold: 600,
  bold:     700,
  black:    900,
  heavy:    950,  // display
} as const

export const letterSpacing = {
  tightest: "-0.02em",  // big display numerals
  tight:    "-0.01em",  // h1, h2
  normal:   "0",
  wide:     "0.04em",   // small caps body
  wider:    "0.08em",   // section labels (PLATFORM STATS)
  widest:   "0.12em",   // brand wordmarks
  chrome:   "0.115em",  // AeroDash nav/stat chrome labels
} as const

// ─── Radii ──────────────────────────────────────────────────────────────────

export const radii = {
  none: 0,
  xs: 3,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  pill: 999,
} as const

export const colors = {
  ink: "#05070b",
  paper: "#ffffff",
  canvas: "#f7f9fc",
  cyan: "#00c8ff",
  cyanDeep: "#00a2d6",
  cyanSoft: "#d9f7ff",
  pink: "#ff4d72",
  pinkSoft: "#ffd8e2",
  warn: "#ffd51d",
  warnSoft: "#fff3b8",
  green: "#22d66f",
  greenSoft: "#dffdec",
  // Sedona brand orange — punchier, with depth tones for chrome treatment.
  orange: "#ff6a00",
  orangeBright: "#ff8a3d",
  orangeDeep: "#c14a00",
  orangeSoft: "#ffe4d0",
  muted: "#657282",
  line: "#e3e9f1",
  lineSoft: "#eef3f8",
} as const

export const motion = {
  fast: 100,
  base: 150,
  slow: 250,
  ease: "ease",
  easeOut: "cubic-bezier(.2, .7, .3, 1)",
} as const

export type RadiusKey = keyof typeof radii
