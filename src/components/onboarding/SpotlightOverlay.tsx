"use client"

import * as React from "react"
import { createPortal } from "react-dom"

interface SpotlightOverlayProps {
  targetSelector: string
  children: React.ReactNode
}

export function SpotlightOverlay({
  targetSelector,
  children,
}: SpotlightOverlayProps) {
  const [rect, setRect] = React.useState<DOMRect | null>(null)
  const [tooltipPosition, setTooltipPosition] = React.useState<
    "below" | "above"
  >("below")

  React.useEffect(() => {
    const el = document.querySelector(targetSelector)
    if (!el) return

    const update = () => {
      const r = el.getBoundingClientRect()
      setRect(r)
      setTooltipPosition(r.bottom > window.innerHeight * 0.6 ? "above" : "below")
    }

    update()
    window.addEventListener("resize", update)
    window.addEventListener("scroll", update, true)
    return () => {
      window.removeEventListener("resize", update)
      window.removeEventListener("scroll", update, true)
    }
  }, [targetSelector])

  if (!rect) return null

  const padding = 8

  return createPortal(
    <div className="fixed inset-0 z-[9999]" aria-live="polite">
      {/* Overlay with cutout via clip-path */}
      <div
        className="absolute inset-0 bg-black/70 transition-all duration-300"
        style={{
          clipPath: `polygon(
            0% 0%, 0% 100%, 100% 100%, 100% 0%,
            ${rect.left - padding}px 0%,
            ${rect.left - padding}px ${rect.top - padding}px,
            ${rect.right + padding}px ${rect.top - padding}px,
            ${rect.right + padding}px ${rect.bottom + padding}px,
            ${rect.left - padding}px ${rect.bottom + padding}px,
            ${rect.left - padding}px 0%
          )`,
        }}
      />

      {/* Highlight border */}
      <div
        className="absolute border-2 border-sedona-500 rounded-lg pointer-events-none transition-all duration-300"
        style={{
          top: rect.top - padding,
          left: rect.left - padding,
          width: rect.width + padding * 2,
          height: rect.height + padding * 2,
        }}
      />

      {/* Tooltip */}
      <div
        className="absolute"
        style={{
          left: Math.max(
            16,
            Math.min(rect.left, window.innerWidth - 360)
          ),
          ...(tooltipPosition === "below"
            ? { top: rect.bottom + padding + 12 }
            : { bottom: window.innerHeight - rect.top + padding + 12 }),
          maxWidth: 340,
        }}
      >
        {children}
      </div>
    </div>,
    document.body
  )
}
