"use client"

import { useState, useMemo } from "react"
import { Icon } from "@/components/ui/icon"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Brand color presets
const brandColors = [
  { name: "Sedona 500", hex: "#D56B12" },
  { name: "Sedona 400", hex: "#E87F2A" },
  { name: "Sedona 300", hex: "#F49A50" },
  { name: "Zeus Dark", hex: "#0D0D0D" },
  { name: "Zeus Elevated", hex: "#1A1A1A" },
  { name: "Zeus Neutral", hex: "#262626" },
  { name: "Text Primary", hex: "#FAFAFA" },
  { name: "Text Secondary", hex: "#A3A3A3" },
  { name: "Text Tertiary", hex: "#737373" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Black", hex: "#000000" },
]

// Convert hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

// Calculate relative luminance
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

// Calculate contrast ratio
function getContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1)
  const rgb2 = hexToRgb(hex2)

  if (!rgb1 || !rgb2) return 0

  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b)
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b)

  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)

  return (lighter + 0.05) / (darker + 0.05)
}

// WCAG compliance levels
function getWcagCompliance(ratio: number) {
  return {
    aaLarge: ratio >= 3, // AA for large text (18pt+)
    aa: ratio >= 4.5, // AA for normal text
    aaaLarge: ratio >= 4.5, // AAA for large text
    aaa: ratio >= 7, // AAA for normal text
  }
}

interface ContrastCheckerProps {
  className?: string
}

/**
 * ContrastChecker - Interactive tool for checking color contrast accessibility
 *
 * Evaluates WCAG 2.1 compliance levels for text/background color combinations.
 */
export function ContrastChecker({ className }: ContrastCheckerProps) {
  const [foreground, setForeground] = useState("#FAFAFA")
  const [background, setBackground] = useState("#0D0D0D")

  const contrastRatio = useMemo(
    () => getContrastRatio(foreground, background),
    [foreground, background]
  )

  const compliance = useMemo(() => getWcagCompliance(contrastRatio), [contrastRatio])

  const swapColors = () => {
    const temp = foreground
    setForeground(background)
    setBackground(temp)
  }

  const isValidHex = (hex: string) => /^#[0-9A-Fa-f]{6}$/.test(hex)

  return (
    <Card className={cn("bg-zeus-surface-elevated p-6", className)}>
      <h3 className="mb-6 font-monument text-body-m font-semibold text-zeus-text-primary">
        Color Contrast Checker
      </h3>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Color Inputs */}
        <div className="space-y-4">
          {/* Foreground */}
          <div>
            <label className="mb-2 block text-caption-m font-medium text-zeus-text-secondary">
              Foreground (Text)
            </label>
            <div className="flex gap-2">
              <div
                className="h-10 w-10 flex-shrink-0 rounded-lg border border-zeus-border-default"
                style={{ backgroundColor: isValidHex(foreground) ? foreground : "#000" }}
              />
              <input
                type="text"
                value={foreground}
                onChange={(e) => setForeground(e.target.value.toUpperCase())}
                className="flex-1 rounded-lg border border-zeus-border-default bg-zeus-surface-neutral px-3 py-2 font-mono text-caption-l text-zeus-text-primary outline-none focus:border-sedona-500"
                placeholder="#FFFFFF"
              />
            </div>
            {/* Preset buttons */}
            <div className="mt-2 flex flex-wrap gap-1">
              {brandColors.slice(0, 6).map((color) => (
                <button
                  key={color.hex}
                  onClick={() => setForeground(color.hex)}
                  className="h-6 w-6 rounded border border-zeus-border-default transition-transform hover:scale-110"
                  style={{ backgroundColor: color.hex }}
                  title={`${color.name} (${color.hex})`}
                />
              ))}
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={swapColors}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-zeus-border-default bg-zeus-surface-neutral text-zeus-text-secondary transition-colors hover:bg-zeus-surface-default hover:text-zeus-text-primary"
              title="Swap colors"
            >
              <Icon icon="arrows-rotate" className="h-4 w-4" />
            </button>
          </div>

          {/* Background */}
          <div>
            <label className="mb-2 block text-caption-m font-medium text-zeus-text-secondary">
              Background
            </label>
            <div className="flex gap-2">
              <div
                className="h-10 w-10 flex-shrink-0 rounded-lg border border-zeus-border-default"
                style={{ backgroundColor: isValidHex(background) ? background : "#000" }}
              />
              <input
                type="text"
                value={background}
                onChange={(e) => setBackground(e.target.value.toUpperCase())}
                className="flex-1 rounded-lg border border-zeus-border-default bg-zeus-surface-neutral px-3 py-2 font-mono text-caption-l text-zeus-text-primary outline-none focus:border-sedona-500"
                placeholder="#000000"
              />
            </div>
            {/* Preset buttons */}
            <div className="mt-2 flex flex-wrap gap-1">
              {brandColors.slice(3, 11).map((color) => (
                <button
                  key={color.hex}
                  onClick={() => setBackground(color.hex)}
                  className="h-6 w-6 rounded border border-zeus-border-default transition-transform hover:scale-110"
                  style={{ backgroundColor: color.hex }}
                  title={`${color.name} (${color.hex})`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {/* Preview */}
          <div
            className="flex h-32 items-center justify-center rounded-lg border border-zeus-border-default p-4"
            style={{ backgroundColor: isValidHex(background) ? background : "#000" }}
          >
            <div className="text-center">
              <p
                className="font-monument text-heading-m font-bold"
                style={{ color: isValidHex(foreground) ? foreground : "#FFF" }}
              >
                Sample Text
              </p>
              <p
                className="text-caption-l"
                style={{ color: isValidHex(foreground) ? foreground : "#FFF" }}
              >
                The quick brown fox jumps over the lazy dog.
              </p>
            </div>
          </div>

          {/* Contrast Ratio */}
          <div className="rounded-lg bg-zeus-surface-neutral p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-caption-m text-zeus-text-secondary">Contrast Ratio</span>
              <span className="font-monument text-heading-s font-bold text-zeus-text-primary">
                {contrastRatio.toFixed(2)}:1
              </span>
            </div>

            {/* WCAG Compliance Badges */}
            <div className="grid grid-cols-2 gap-2">
              <div
                className={cn(
                  "flex items-center justify-between rounded-md px-3 py-2",
                  compliance.aa ? "bg-green-500/20" : "bg-red-500/20"
                )}
              >
                <span className="text-caption-m text-zeus-text-secondary">AA Normal</span>
                <Icon
                  icon={compliance.aa ? "check" : "xmark"}
                  className={cn("h-4 w-4", compliance.aa ? "text-green-400" : "text-red-400")}
                />
              </div>
              <div
                className={cn(
                  "flex items-center justify-between rounded-md px-3 py-2",
                  compliance.aaLarge ? "bg-green-500/20" : "bg-red-500/20"
                )}
              >
                <span className="text-caption-m text-zeus-text-secondary">AA Large</span>
                <Icon
                  icon={compliance.aaLarge ? "check" : "xmark"}
                  className={cn("h-4 w-4", compliance.aaLarge ? "text-green-400" : "text-red-400")}
                />
              </div>
              <div
                className={cn(
                  "flex items-center justify-between rounded-md px-3 py-2",
                  compliance.aaa ? "bg-green-500/20" : "bg-red-500/20"
                )}
              >
                <span className="text-caption-m text-zeus-text-secondary">AAA Normal</span>
                <Icon
                  icon={compliance.aaa ? "check" : "xmark"}
                  className={cn("h-4 w-4", compliance.aaa ? "text-green-400" : "text-red-400")}
                />
              </div>
              <div
                className={cn(
                  "flex items-center justify-between rounded-md px-3 py-2",
                  compliance.aaaLarge ? "bg-green-500/20" : "bg-red-500/20"
                )}
              >
                <span className="text-caption-m text-zeus-text-secondary">AAA Large</span>
                <Icon
                  icon={compliance.aaaLarge ? "check" : "xmark"}
                  className={cn("h-4 w-4", compliance.aaaLarge ? "text-green-400" : "text-red-400")}
                />
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="text-caption-m text-zeus-text-tertiary">
            <p>
              <strong>AA:</strong> 4.5:1 normal text, 3:1 large text (18pt+)
            </p>
            <p>
              <strong>AAA:</strong> 7:1 normal text, 4.5:1 large text
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
