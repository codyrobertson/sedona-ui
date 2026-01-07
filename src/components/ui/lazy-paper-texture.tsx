"use client"

/**
 * Paper texture overlay - DISABLED
 * The @paper-design/shaders library has a bug where getShaderNoiseTexture()
 * creates a new image on each call without waiting for it to load,
 * causing "image for uniform u_image must be fully loaded" errors.
 *
 * TODO: Re-enable when library is fixed or use CSS grain effect instead
 */

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

export function PaperTextureOverlay(_props: PaperTextureOverlayProps) {
  // Disabled due to library bug - returns null
  return null
}

export const LazyPaperTexture = () => null
