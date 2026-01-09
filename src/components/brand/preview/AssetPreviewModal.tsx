"use client"

import { useState } from "react"
import Image from "next/image"
import { Icon } from "@/components/ui/icon"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface AssetPreviewModalProps {
  src: string
  alt: string
  title: string
  description?: string
  downloadHref?: string
  downloadFilename?: string
  children: React.ReactNode
  className?: string
  previewBgOptions?: ("light" | "dark" | "sedona" | "checkered")[]
}

const bgStyles = {
  light: "bg-white",
  dark: "bg-zeus-surface-default",
  sedona: "bg-sedona-500",
  checkered: "bg-[length:20px_20px] bg-[linear-gradient(45deg,#1a1a1a_25%,transparent_25%),linear-gradient(-45deg,#1a1a1a_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#1a1a1a_75%),linear-gradient(-45deg,transparent_75%,#1a1a1a_75%)] bg-[position:0_0,0_10px,10px_-10px,-10px_0px] bg-[#2a2a2a]",
}

/**
 * AssetPreviewModal - Modal for previewing and downloading brand assets
 *
 * @example Basic usage
 * ```tsx
 * <AssetPreviewModal
 *   src="/brand/logos/sedona-logomark.svg"
 *   alt="Sedona Logomark"
 *   title="Logomark"
 *   description="Icon with currentColor"
 *   downloadHref="/brand/logos/sedona-logomark.svg"
 *   downloadFilename="sedona-logomark.svg"
 * >
 *   <button>Preview</button>
 * </AssetPreviewModal>
 * ```
 */
export function AssetPreviewModal({
  src,
  alt,
  title,
  description,
  downloadHref,
  downloadFilename,
  children,
  className,
  previewBgOptions = ["dark", "light", "sedona", "checkered"],
}: AssetPreviewModalProps) {
  const [activeBg, setActiveBg] = useState<"light" | "dark" | "sedona" | "checkered">(
    previewBgOptions[0]
  )
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const handleCopyUrl = async () => {
    const fullUrl = window.location.origin + src
    await navigator.clipboard.writeText(fullUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = async () => {
    if (!downloadHref) return
    setDownloading(true)
    try {
      const response = await fetch(downloadHref)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = downloadFilename || downloadHref.split("/").pop() || "asset"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Download failed:", error)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild className={className}>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-zeus-surface-elevated">
        <DialogHeader>
          <DialogTitle className="font-monument text-heading-s font-semibold text-zeus-text-primary">
            {title}
          </DialogTitle>
          {description && (
            <p className="text-caption-l text-zeus-text-secondary">{description}</p>
          )}
        </DialogHeader>

        {/* Preview Area */}
        <div className="mt-4">
          {/* Background Selector */}
          <div className="mb-3 flex items-center gap-2">
            <span className="text-caption-m text-zeus-text-tertiary">Background:</span>
            <div className="flex gap-1">
              {previewBgOptions.map((bg) => (
                <button
                  key={bg}
                  onClick={() => setActiveBg(bg)}
                  className={cn(
                    "h-6 w-6 rounded border-2 transition-colors",
                    bg === "light" && "bg-white",
                    bg === "dark" && "bg-zeus-surface-default",
                    bg === "sedona" && "bg-sedona-500",
                    bg === "checkered" && "bg-[#2a2a2a]",
                    activeBg === bg
                      ? "border-sedona-500"
                      : "border-zeus-border-default hover:border-zeus-border-hover"
                  )}
                  title={bg.charAt(0).toUpperCase() + bg.slice(1)}
                >
                  {bg === "checkered" && (
                    <div className="h-full w-full bg-[length:6px_6px] bg-[linear-gradient(45deg,#1a1a1a_25%,transparent_25%),linear-gradient(-45deg,#1a1a1a_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#1a1a1a_75%),linear-gradient(-45deg,transparent_75%,#1a1a1a_75%)] bg-[position:0_0,0_3px,3px_-3px,-3px_0px] rounded-sm" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div
            className={cn(
              "flex items-center justify-center rounded-lg p-12 transition-colors",
              bgStyles[activeBg],
              activeBg === "light" && "border border-zeus-border-default"
            )}
          >
            <div className="relative h-32 w-32">
              <Image
                src={src}
                alt={alt}
                fill
                className={cn(
                  "object-contain",
                  // For currentColor SVGs, invert on light backgrounds
                  activeBg === "light" && src.includes("logomark.svg") && !src.includes("white") && !src.includes("orange") && "invert"
                )}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          {downloadHref && (
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center gap-2 rounded-lg bg-sedona-500 px-4 py-2 text-caption-l font-medium text-white transition-colors hover:bg-sedona-400 disabled:opacity-50"
            >
              <Icon icon={downloading ? "spinner" : "download"} className={cn("h-4 w-4", downloading && "animate-spin")} />
              {downloading ? "Downloading..." : "Download"}
            </button>
          )}

          <button
            onClick={handleCopyUrl}
            className="flex items-center gap-2 rounded-lg border border-zeus-border-default bg-zeus-surface-neutral px-4 py-2 text-caption-l font-medium text-zeus-text-primary transition-colors hover:bg-zeus-surface-default"
          >
            <Icon icon={copied ? "check" : "link"} className="h-4 w-4" />
            {copied ? "Copied!" : "Copy URL"}
          </button>

          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-zeus-border-default bg-zeus-surface-neutral px-4 py-2 text-caption-l font-medium text-zeus-text-primary transition-colors hover:bg-zeus-surface-default"
          >
            <Icon icon="arrow-up-right-from-square" className="h-4 w-4" />
            Open Original
          </a>
        </div>

        {/* File Info */}
        <div className="mt-4 rounded-lg bg-zeus-surface-neutral p-3">
          <div className="flex items-center gap-4 text-caption-m text-zeus-text-tertiary">
            <span className="font-mono">{src}</span>
            <span className="text-zeus-text-quaternary">•</span>
            <span>SVG</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
