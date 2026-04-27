/**
 * AeroDash design tokens — single source of truth for radii, colors, motion.
 * Importable from any aerodash component. Treat as read-only.
 */

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
