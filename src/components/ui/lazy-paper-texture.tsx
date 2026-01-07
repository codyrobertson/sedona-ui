"use client"

import dynamic from "next/dynamic"

/**
 * Lazy-loaded PaperTexture component from @paper-design/shaders-react
 * Consolidates the dynamic import that was duplicated across landing sections
 */
export const LazyPaperTexture = dynamic(
  () => import("@paper-design/shaders-react").then((mod) => mod.PaperTexture),
  { ssr: false }
)

export interface PaperTextureOverlayProps {
  colorFront?: string
  colorBack?: string
  scale?: number
  fiber?: number
  crumples?: number
  roughness?: number
  opacity?: number
  className?: string
}

/**
 * Pre-configured paper texture overlay for consistent use across sections
 */
export function PaperTextureOverlay({
  colorFront = "#D4C4A8",
  colorBack = "#8B7355",
  scale = 1.5,
  fiber = 0.3,
  crumples = 0.2,
  roughness = 0.4,
  opacity = 0.2,
  className,
}: PaperTextureOverlayProps) {
  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        opacity,
        mixBlendMode: "soft-light",
      }}
    >
      <LazyPaperTexture
        colorFront={colorFront}
        colorBack={colorBack}
        scale={scale}
        fiber={fiber}
        crumples={crumples}
        roughness={roughness}
        style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
      />
    </div>
  )
}
