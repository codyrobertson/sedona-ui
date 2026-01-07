"use client"

import { useState, useEffect, useMemo } from "react"
import { ShaderMount } from "@paper-design/shaders-react"
import {
  paperTextureFragmentShader,
  getShaderColorFromString,
  getShaderNoiseTexture,
  ShaderFitOptions,
  defaultObjectSizing,
} from "@paper-design/shaders"
import { cn } from "@/lib/utils"

// Module-level cache for the loaded noise texture
let cachedNoiseTexture: HTMLImageElement | null = null
let noiseTextureLoadPromise: Promise<HTMLImageElement> | null = null

/**
 * Pre-load and cache the noise texture using the library's function
 * but properly waiting for it to load
 */
function loadNoiseTexture(): Promise<HTMLImageElement> {
  // Return cached texture if already loaded
  if (cachedNoiseTexture?.complete && cachedNoiseTexture.naturalWidth > 0) {
    return Promise.resolve(cachedNoiseTexture)
  }

  // Return existing promise if loading is in progress
  if (noiseTextureLoadPromise) {
    return noiseTextureLoadPromise
  }

  // Start loading the texture
  noiseTextureLoadPromise = new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Cannot load texture in server environment"))
      return
    }

    // Use the library's noise texture but wait for it to load
    const img = getShaderNoiseTexture()
    if (!img) {
      reject(new Error("Failed to get noise texture from library"))
      return
    }

    // Check if already loaded (browser cached)
    if (img.complete && img.naturalWidth > 0) {
      cachedNoiseTexture = img
      resolve(img)
      return
    }

    img.onload = () => {
      cachedNoiseTexture = img
      resolve(img)
    }
    img.onerror = () => {
      noiseTextureLoadPromise = null
      reject(new Error("Failed to load noise texture"))
    }
  })

  return noiseTextureLoadPromise
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

const defaultParams = {
  colorFront: "#000000",
  colorBack: "#ffffff",
  scale: 1.2,
  fiber: 0.4,
  crumples: 0.8,
  roughness: 0.7,
  contrast: 0.5,
  fiberSize: 0.15,
  crumpleSize: 0.5,
  foldCount: 8,
  folds: 0.8,
  fade: 0,
  drops: 0.3,
  seed: 5.8,
}

export function PaperTextureOverlay({
  colorFront = defaultParams.colorFront,
  colorBack = defaultParams.colorBack,
  scale = defaultParams.scale,
  fiber = defaultParams.fiber,
  crumples = defaultParams.crumples,
  roughness = defaultParams.roughness,
  opacity = 1,
  className,
}: PaperTextureOverlayProps) {
  const [noiseTexture, setNoiseTexture] = useState<HTMLImageElement | null>(
    cachedNoiseTexture
  )
  const [error, setError] = useState(false)

  useEffect(() => {
    // If we already have the cached texture and it's loaded, use it
    if (cachedNoiseTexture?.complete && cachedNoiseTexture.naturalWidth > 0) {
      setNoiseTexture(cachedNoiseTexture)
      return
    }

    // Load the texture
    let mounted = true
    loadNoiseTexture()
      .then((img) => {
        if (mounted) {
          setNoiseTexture(img)
        }
      })
      .catch(() => {
        if (mounted) {
          setError(true)
        }
      })

    return () => {
      mounted = false
    }
  }, [])

  // Build uniforms with memoization
  const uniforms = useMemo(() => {
    if (!noiseTexture) return null

    return {
      u_colorFront: getShaderColorFromString(colorFront),
      u_colorBack: getShaderColorFromString(colorBack),
      u_contrast: defaultParams.contrast,
      u_roughness: roughness,
      u_fiber: fiber,
      u_fiberSize: defaultParams.fiberSize,
      u_crumples: crumples,
      u_crumpleSize: defaultParams.crumpleSize,
      u_foldCount: defaultParams.foldCount,
      u_folds: defaultParams.folds,
      u_fade: defaultParams.fade,
      u_drops: defaultParams.drops,
      u_seed: defaultParams.seed,
      u_noiseTexture: noiseTexture,
      // Sizing uniforms
      u_fit: ShaderFitOptions.cover,
      u_scale: scale,
      u_rotation: defaultObjectSizing.rotation,
      u_offsetX: defaultObjectSizing.offsetX,
      u_offsetY: defaultObjectSizing.offsetY,
      u_originX: defaultObjectSizing.originX,
      u_originY: defaultObjectSizing.originY,
      u_worldWidth: defaultObjectSizing.worldWidth,
      u_worldHeight: defaultObjectSizing.worldHeight,
    }
  }, [noiseTexture, colorFront, colorBack, scale, fiber, crumples, roughness])

  // Don't render if texture is not loaded or if there was an error
  if (!noiseTexture || error || !uniforms) {
    return null
  }

  return (
    <ShaderMount
      className={cn(
        "absolute inset-0 pointer-events-none z-10",
        className
      )}
      style={{ opacity }}
      fragmentShader={paperTextureFragmentShader}
      uniforms={uniforms}
      speed={0}
      frame={0}
    />
  )
}
