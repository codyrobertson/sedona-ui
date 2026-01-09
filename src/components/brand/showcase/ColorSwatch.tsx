"use client"

import { useState } from "react"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

interface ColorSwatchProps {
  name: string
  hex: string
  cssVar?: string
  tailwindClass?: string
  description?: string
  size?: "sm" | "md" | "lg"
}

type CopyFormat = "hex" | "rgb" | "hsl" | "css" | "tailwind"

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return hex
  const r = parseInt(result[1], 16)
  const g = parseInt(result[2], 16)
  const b = parseInt(result[3], 16)
  return `rgb(${r}, ${g}, ${b})`
}

function hexToHsl(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return hex

  let r = parseInt(result[1], 16) / 255
  let g = parseInt(result[2], 16) / 255
  let b = parseInt(result[3], 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
}

export function ColorSwatch({
  name,
  hex,
  cssVar,
  tailwindClass,
  description,
  size = "md",
}: ColorSwatchProps) {
  const [copied, setCopied] = useState<CopyFormat | null>(null)

  const copyValue = async (format: CopyFormat) => {
    let value = ""
    switch (format) {
      case "hex":
        value = hex
        break
      case "rgb":
        value = hexToRgb(hex)
        break
      case "hsl":
        value = hexToHsl(hex)
        break
      case "css":
        value = cssVar ? `var(${cssVar})` : hex
        break
      case "tailwind":
        value = tailwindClass || hex
        break
    }

    await navigator.clipboard.writeText(value)
    setCopied(format)
    setTimeout(() => setCopied(null), 2000)
  }

  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-24 w-24",
    lg: "h-32 w-full",
  }

  const isLight = (hex: string): boolean => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (!result) return false
    const r = parseInt(result[1], 16)
    const g = parseInt(result[2], 16)
    const b = parseInt(result[3], 16)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return luminance > 0.5
  }

  return (
    <div className="group">
      {/* Color Preview */}
      <div
        className={cn(
          "relative overflow-hidden rounded-lg border border-zeus-border-default",
          sizeClasses[size]
        )}
        style={{ backgroundColor: hex }}
      >
        {/* Copy overlay */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100",
            isLight(hex) ? "bg-black/10" : "bg-white/10"
          )}
        >
          <button
            onClick={() => copyValue("hex")}
            className={cn(
              "rounded-md p-2 transition-colors",
              isLight(hex)
                ? "bg-black/20 text-black hover:bg-black/30"
                : "bg-white/20 text-white hover:bg-white/30"
            )}
            aria-label={`Copy ${name} hex value`}
          >
            <Icon icon={copied === "hex" ? "check" : "copy"} className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Color Info */}
      <div className="mt-3 space-y-1">
        <p className="text-caption-l font-medium text-zeus-text-primary">{name}</p>
        {description && (
          <p className="text-caption-m text-zeus-text-tertiary">{description}</p>
        )}

        {/* Copy formats */}
        <div className="flex flex-wrap gap-1 pt-1">
          {(["hex", "rgb", "hsl"] as const).map((format) => (
            <button
              key={format}
              onClick={() => copyValue(format)}
              className={cn(
                "rounded px-1.5 py-0.5 text-caption-s font-mono transition-colors",
                copied === format
                  ? "bg-green-500/20 text-green-400"
                  : "bg-zeus-surface-elevated text-zeus-text-tertiary hover:bg-zeus-surface-neutral hover:text-zeus-text-secondary"
              )}
            >
              {copied === format ? "Copied!" : format.toUpperCase()}
            </button>
          ))}
          {cssVar && (
            <button
              onClick={() => copyValue("css")}
              className={cn(
                "rounded px-1.5 py-0.5 text-caption-s font-mono transition-colors",
                copied === "css"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-zeus-surface-elevated text-zeus-text-tertiary hover:bg-zeus-surface-neutral hover:text-zeus-text-secondary"
              )}
            >
              {copied === "css" ? "Copied!" : "CSS"}
            </button>
          )}
          {tailwindClass && (
            <button
              onClick={() => copyValue("tailwind")}
              className={cn(
                "rounded px-1.5 py-0.5 text-caption-s font-mono transition-colors",
                copied === "tailwind"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-zeus-surface-elevated text-zeus-text-tertiary hover:bg-zeus-surface-neutral hover:text-zeus-text-secondary"
              )}
            >
              {copied === "tailwind" ? "Copied!" : "TW"}
            </button>
          )}
        </div>

        {/* Hex value display */}
        <p className="font-mono text-caption-s text-zeus-text-tertiary">{hex}</p>
      </div>
    </div>
  )
}
