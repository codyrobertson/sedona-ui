"use client"

import * as React from "react"
import dynamic from "next/dynamic"

/**
 * Lazy-loaded PaperTexture component from @paper-design/shaders-react
 * Consolidates the dynamic import that was duplicated across landing sections
 */
const LazyPaperTextureComponent = dynamic(
  () => import("@paper-design/shaders-react").then((mod) => mod.PaperTexture),
  { ssr: false, loading: () => null }
)

// Pre-load the noise texture used by PaperTexture shader
let noiseTextureReady = false
let noiseTexturePromise: Promise<void> | null = null

function preloadNoiseTexture(): Promise<void> {
  if (noiseTextureReady) return Promise.resolve()
  if (noiseTexturePromise) return noiseTexturePromise

  noiseTexturePromise = import("@paper-design/shaders").then((mod) => {
    return new Promise<void>((resolve) => {
      const texture = mod.getShaderNoiseTexture?.()
      if (!texture) {
        noiseTextureReady = true
        resolve()
        return
      }
      if (texture.complete) {
        noiseTextureReady = true
        resolve()
        return
      }
      texture.onload = () => {
        noiseTextureReady = true
        resolve()
      }
      texture.onerror = () => {
        // Still mark as ready to avoid blocking forever
        noiseTextureReady = true
        resolve()
      }
    })
  })
  return noiseTexturePromise
}

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
 * Pre-loads noise texture to prevent "image must be fully loaded" errors
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
  const [ready, setReady] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)

  React.useEffect(() => {
    let cancelled = false

    preloadNoiseTexture()
      .then(() => {
        if (!cancelled) {
          // Small additional delay to ensure WebGL context is ready
          setTimeout(() => setReady(true), 50)
        }
      })
      .catch(() => {
        if (!cancelled) setHasError(true)
      })

    return () => { cancelled = true }
  }, [])

  // Global error handler for shader errors
  React.useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes("Paper Shaders") || event.message.includes("u_image")) {
        event.preventDefault()
        setHasError(true)
        console.warn("Paper shader error caught:", event.message)
      }
    }
    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [])

  if (!ready || hasError) return null

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
      <LazyPaperTextureComponent
        colorFront={colorFront}
        colorBack={colorBack}
        scale={scale}
        fiber={fiber}
        fiberSize={0.5}
        crumples={crumples}
        crumpleSize={0.5}
        roughness={roughness}
        seed={42}
        style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
      />
    </div>
  )
}

export const LazyPaperTexture = LazyPaperTextureComponent
