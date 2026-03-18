"use client"

import { useCallback, useState } from "react"

type CaptureStatus = "idle" | "copying" | "success" | "error"

export function useCanvasCapture() {
  const [status, setStatus] = useState<CaptureStatus>("idle")

  const captureCanvas = useCallback(async (container: HTMLElement | null) => {
    if (!container) return

    const canvas = container.querySelector("canvas") as HTMLCanvasElement | null

    if (!canvas) {
      // For SVG-based components (like GridScan), serialize SVG to canvas then clipboard
      const svg = container.querySelector("svg")
      if (svg) {
        try {
          setStatus("copying")
          const svgData = new XMLSerializer().serializeToString(svg)
          const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
          const url = URL.createObjectURL(svgBlob)
          const img = new Image()
          img.onload = async () => {
            try {
              const offscreen = document.createElement("canvas")
              offscreen.width = container.clientWidth * window.devicePixelRatio
              offscreen.height = container.clientHeight * window.devicePixelRatio
              const ctx = offscreen.getContext("2d")!
              ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
              ctx.drawImage(img, 0, 0, container.clientWidth, container.clientHeight)
              URL.revokeObjectURL(url)
              const pngBlob = await new Promise<Blob | null>((resolve) =>
                offscreen.toBlob(resolve, "image/png")
              )
              if (!pngBlob) { setStatus("error"); setTimeout(() => setStatus("idle"), 2000); return }
              await navigator.clipboard.write([
                new ClipboardItem({ "image/png": pngBlob }),
              ])
              setStatus("success")
              setTimeout(() => setStatus("idle"), 2000)
            } catch {
              setStatus("error")
              setTimeout(() => setStatus("idle"), 2000)
            }
          }
          img.onerror = () => {
            URL.revokeObjectURL(url)
            setStatus("error")
            setTimeout(() => setStatus("idle"), 2000)
          }
          img.src = url
        } catch {
          setStatus("error")
          setTimeout(() => setStatus("idle"), 2000)
        }
        return
      }

      setStatus("error")
      setTimeout(() => setStatus("idle"), 2000)
      return
    }

    // For WebGL canvases
    try {
      setStatus("copying")
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png")
      )
      if (!blob) throw new Error("Failed to create blob from canvas")
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ])
      setStatus("success")
      setTimeout(() => setStatus("idle"), 2000)
    } catch {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 2000)
    }
  }, [])

  return { captureCanvas, status }
}
