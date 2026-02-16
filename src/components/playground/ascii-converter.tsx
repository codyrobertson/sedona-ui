"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const CHAR_SETS: Record<string, string> = {
  standard: "@%#*+=-:. ",
  blocks: "\u2588\u2593\u2592\u2591 ",
  simple: ".:-=+*#%@",
  minimal: "@#. ",
}

function imageToAscii(
  img: HTMLImageElement,
  width: number,
  charSet: string,
  invert: boolean
): string {
  const canvas = document.createElement("canvas")
  const aspect = img.naturalHeight / img.naturalWidth
  const height = Math.round(width * aspect * 0.5)
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext("2d")!
  ctx.drawImage(img, 0, 0, width, height)
  const { data } = ctx.getImageData(0, 0, width, height)

  const chars = invert ? charSet.split("").reverse().join("") : charSet
  const lines: string[] = []

  for (let y = 0; y < height; y++) {
    let line = ""
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4
      const lum = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) / 255
      const charIndex = Math.min(Math.floor(lum * chars.length), chars.length - 1)
      line += chars[charIndex]
    }
    lines.push(line)
  }

  return lines.join("\n")
}

export function AsciiConverter() {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [ascii, setAscii] = useState("")
  const [width, setWidth] = useState(100)
  const [charSet, setCharSet] = useState("standard")
  const [invert, setInvert] = useState(false)
  const [copyStatus, setCopyStatus] = useState<"idle" | "success">("idle")
  const [isDragging, setIsDragging] = useState(false)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const reconvert = useCallback(() => {
    if (imgRef.current) {
      const result = imageToAscii(imgRef.current, width, CHAR_SETS[charSet], invert)
      setAscii(result)
    }
  }, [width, charSet, invert])

  // Re-convert when settings change
  useEffect(() => {
    reconvert()
  }, [reconvert])

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return
      const url = URL.createObjectURL(file)
      setImageSrc(url)
      const img = new Image()
      img.onload = () => {
        imgRef.current = img
        const result = imageToAscii(img, width, CHAR_SETS[charSet], invert)
        setAscii(result)
      }
      img.src = url
    },
    [width, charSet, invert]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(ascii)
    setCopyStatus("success")
    setTimeout(() => setCopyStatus("idle"), 2000)
  }

  return (
    <div className="mt-4 space-y-6">
      {/* Upload zone */}
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer",
          isDragging
            ? "border-zeus-accent-a bg-zeus-accent-a/5"
            : "border-zeus-border-alpha hover:border-zeus-text-tertiary",
        )}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
          }}
        />
        <p className="text-zeus-text-secondary text-body-s">
          {isDragging ? "Drop image here..." : "Drag & drop an image or click to browse"}
        </p>
        <p className="text-zeus-text-tertiary text-caption-l mt-1">JPG, PNG, WebP</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-end gap-4 p-4 rounded-lg bg-zeus-surface-elevated border border-zeus-border-alpha">
        <div className="space-y-2">
          <Label className="text-caption-s uppercase tracking-wider text-zeus-text-tertiary">
            Width ({width} cols)
          </Label>
          <input
            type="range"
            min={40}
            max={200}
            step={5}
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="w-40 h-2 rounded-lg appearance-none cursor-pointer accent-zeus-accent-a"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-caption-s uppercase tracking-wider text-zeus-text-tertiary">
            Characters
          </Label>
          <Select value={charSet} onValueChange={setCharSet}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="blocks">Blocks</SelectItem>
              <SelectItem value="simple">Simple</SelectItem>
              <SelectItem value="minimal">Minimal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 pb-0.5">
          <Checkbox
            checked={invert}
            onCheckedChange={(v) => setInvert(!!v)}
          />
          <Label className="text-caption-l">Invert</Label>
        </div>
      </div>

      {/* Preview */}
      {ascii && (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Original thumbnail */}
          {imageSrc && (
            <div className="shrink-0 lg:w-48">
              <p className="text-caption-s text-zeus-text-tertiary uppercase tracking-wider mb-2">Original</p>
              <img
                src={imageSrc}
                alt="Original"
                className="w-full rounded-lg border border-zeus-border-alpha object-cover"
              />
            </div>
          )}

          {/* ASCII output */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-caption-s text-zeus-text-tertiary uppercase tracking-wider">ASCII Output</p>
              <Button
                size="sm"
                variant={copyStatus === "success" ? "default" : "outline"}
                onClick={copyToClipboard}
              >
                {copyStatus === "success" ? "Copied!" : "Copy ASCII"}
              </Button>
            </div>
            <pre className="overflow-auto p-4 rounded-lg bg-black text-green-400 text-[6px] leading-[7px] font-mono border border-zeus-border-alpha max-h-[600px]">
              {ascii}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}
