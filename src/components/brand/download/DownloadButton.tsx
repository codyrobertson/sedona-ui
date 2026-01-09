"use client"

import { useState } from "react"
import { Icon } from "@/components/ui/icon"
import { Button, ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DownloadButtonProps extends Omit<ButtonProps, "children"> {
  href: string
  filename?: string
  label?: string
  fileSize?: string
  fileType?: string
}

export function DownloadButton({
  href,
  filename,
  label = "Download",
  fileSize,
  fileType,
  className,
  variant = "outline",
  ...props
}: DownloadButtonProps) {
  const [status, setStatus] = useState<"idle" | "downloading" | "done">("idle")

  const handleDownload = async (e: React.MouseEvent) => {
    // If it's a direct link, let the browser handle it
    if (!href.startsWith("blob:") && !href.startsWith("data:")) {
      setStatus("downloading")
      // Brief visual feedback for static file downloads
      setTimeout(() => {
        setStatus("done")
        setTimeout(() => setStatus("idle"), 2000)
      }, 500)
      return
    }

    e.preventDefault()
    setStatus("downloading")

    try {
      const response = await fetch(href)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename || "download"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      setStatus("done")
      setTimeout(() => setStatus("idle"), 2000)
    } catch {
      setStatus("idle")
    }
  }

  return (
    <Button
      asChild={status === "idle"}
      variant={variant}
      className={cn("gap-2", className)}
      onClick={handleDownload}
      disabled={status === "downloading"}
      {...props}
    >
      {status === "idle" ? (
        <a href={href} download={filename}>
          <Icon icon="download" className="h-4 w-4" />
          <span>{label}</span>
          {(fileSize || fileType) && (
            <span className="ml-1 text-zeus-text-tertiary">
              {fileType && <span className="uppercase">{fileType}</span>}
              {fileSize && fileType && " · "}
              {fileSize && <span>{fileSize}</span>}
            </span>
          )}
        </a>
      ) : status === "downloading" ? (
        <>
          <Icon icon="spinner" className="h-4 w-4" spin />
          <span>Downloading...</span>
        </>
      ) : (
        <>
          <Icon icon="check" className="h-4 w-4 text-green-400" />
          <span>Downloaded!</span>
        </>
      )}
    </Button>
  )
}
