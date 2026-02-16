"use client"

import { useState, useRef, useMemo } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PropsEditor, type PropDefinition } from "@/components/ui/playground"
import { useCanvasCapture } from "./use-canvas-capture"
import PixelBlast from "@/components/ui/pixel-blast"
import FaultyTerminal from "@/components/ui/faulty-terminal"
import { PaperTextureOverlay } from "@/components/ui/lazy-paper-texture"
import { GridScan } from "@/components/ui/grid-scan"

const SHADER_OPTIONS = ["PixelBlast", "FaultyTerminal", "PaperTexture", "GridScan"] as const
type ShaderName = typeof SHADER_OPTIONS[number]

const SHADER_PROPS: Record<ShaderName, PropDefinition> = {
  PixelBlast: {
    variant: { type: "select", options: ["square", "circle", "triangle", "diamond"], default: "square" },
    pixelSize: { type: "range", min: 1, max: 20, step: 1, default: 3 },
    color: { type: "color", default: "#B19EEF" },
    patternScale: { type: "range", min: 0.1, max: 10, step: 0.1, default: 2 },
    patternDensity: { type: "range", min: 0, max: 2, step: 0.05, default: 1 },
    liquid: { type: "boolean", default: false },
    liquidStrength: { type: "range", min: 0, max: 1, step: 0.01, default: 0.1 },
    enableRipples: { type: "boolean", default: true },
    rippleSpeed: { type: "range", min: 0, max: 2, step: 0.05, default: 0.3 },
    edgeFade: { type: "range", min: 0, max: 1, step: 0.05, default: 0.5 },
    noiseAmount: { type: "range", min: 0, max: 1, step: 0.01, default: 0 },
    speed: { type: "range", min: 0, max: 2, step: 0.05, default: 0.5 },
  },
  FaultyTerminal: {
    scale: { type: "range", min: 0.1, max: 5, step: 0.1, default: 1 },
    scanlineIntensity: { type: "range", min: 0, max: 2, step: 0.05, default: 0.3 },
    glitchAmount: { type: "range", min: 0, max: 5, step: 0.1, default: 1 },
    flickerAmount: { type: "range", min: 0, max: 3, step: 0.1, default: 1 },
    chromaticAberration: { type: "range", min: 0, max: 20, step: 0.5, default: 0 },
    curvature: { type: "range", min: 0, max: 1, step: 0.01, default: 0.2 },
    tint: { type: "color", default: "#ffffff" },
    brightness: { type: "range", min: 0, max: 3, step: 0.05, default: 1 },
    mouseReact: { type: "boolean", default: true },
  },
  PaperTexture: {
    colorFront: { type: "color", default: "#000000" },
    colorBack: { type: "color", default: "#ffffff" },
    scale: { type: "range", min: 0.1, max: 5, step: 0.1, default: 1.2 },
    fiber: { type: "range", min: 0, max: 1, step: 0.05, default: 0.4 },
    crumples: { type: "range", min: 0, max: 1, step: 0.05, default: 0.8 },
    roughness: { type: "range", min: 0, max: 1, step: 0.05, default: 0.7 },
  },
  GridScan: {
    color: { type: "color", default: "#f97316" },
    gridSize: { type: "range", min: 4, max: 30, step: 1, default: 12 },
  },
}

function getDefaults(shader: ShaderName): Record<string, unknown> {
  const defs: Record<string, unknown> = {}
  for (const [key, prop] of Object.entries(SHADER_PROPS[shader])) {
    defs[key] = prop.default
  }
  return defs
}

export function ShaderLab() {
  const [shader, setShader] = useState<ShaderName>("PixelBlast")
  const [propValues, setPropValues] = useState<Record<string, unknown>>(getDefaults("PixelBlast"))
  const canvasRef = useRef<HTMLDivElement>(null)
  const { captureCanvas, status } = useCanvasCapture()

  const handleShaderChange = (name: string) => {
    const s = name as ShaderName
    setShader(s)
    setPropValues(getDefaults(s))
  }

  const handlePropChange = (key: string, value: unknown) => {
    setPropValues((prev) => ({ ...prev, [key]: value }))
  }

  const shaderElement = useMemo(() => {
    const p = propValues
    switch (shader) {
      case "PixelBlast":
        return (
          <PixelBlast
            variant={p.variant as "square" | "circle" | "triangle" | "diamond"}
            pixelSize={p.pixelSize as number}
            color={p.color as string}
            patternScale={p.patternScale as number}
            patternDensity={p.patternDensity as number}
            liquid={p.liquid as boolean}
            liquidStrength={p.liquidStrength as number}
            enableRipples={p.enableRipples as boolean}
            rippleSpeed={p.rippleSpeed as number}
            edgeFade={p.edgeFade as number}
            noiseAmount={p.noiseAmount as number}
            speed={p.speed as number}
          />
        )
      case "FaultyTerminal":
        return (
          <FaultyTerminal
            scale={p.scale as number}
            scanlineIntensity={p.scanlineIntensity as number}
            glitchAmount={p.glitchAmount as number}
            flickerAmount={p.flickerAmount as number}
            chromaticAberration={p.chromaticAberration as number}
            curvature={p.curvature as number}
            tint={p.tint as string}
            brightness={p.brightness as number}
            mouseReact={p.mouseReact as boolean}
            pageLoadAnimation={false}
          />
        )
      case "PaperTexture":
        return (
          <PaperTextureOverlay
            colorFront={p.colorFront as string}
            colorBack={p.colorBack as string}
            scale={p.scale as number}
            fiber={p.fiber as number}
            crumples={p.crumples as number}
            roughness={p.roughness as number}
          />
        )
      case "GridScan":
        return (
          <GridScan
            color={p.color as string}
            gridSize={p.gridSize as number}
          />
        )
    }
  }, [shader, propValues])

  return (
    <div className="flex flex-col lg:flex-row gap-6 mt-4">
      {/* Canvas area */}
      <div
        ref={canvasRef}
        className={cn(
          "relative rounded-lg border border-zeus-border-alpha overflow-hidden",
          "h-[500px] lg:h-[700px]",
          shader === "PaperTexture" && "bg-white",
          shader === "GridScan" && "bg-zeus-surface-default",
          shader === "PixelBlast" && "bg-black",
          shader === "FaultyTerminal" && "bg-black",
        )}
      >
        {shaderElement}
      </div>

      {/* Controls sidebar */}
      <div className="w-full lg:w-80 xl:w-96 space-y-4 shrink-0 lg:max-h-[700px] lg:overflow-y-auto">
        {/* Shader selector */}
        <div className="space-y-2">
          <label className="text-caption-s font-medium text-zeus-text-tertiary uppercase tracking-wider">
            Shader
          </label>
          <Select value={shader} onValueChange={handleShaderChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SHADER_OPTIONS.map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Props editor */}
        <PropsEditor
          props={SHADER_PROPS[shader]}
          values={propValues}
          onChange={handlePropChange}
        />

        {/* Copy to clipboard */}
        <Button
          className="w-full"
          variant={status === "success" ? "default" : "outline"}
          onClick={() => captureCanvas(canvasRef.current)}
          disabled={status === "copying"}
        >
          {status === "idle" && "Copy to Clipboard (PNG)"}
          {status === "copying" && "Capturing..."}
          {status === "success" && "Copied!"}
          {status === "error" && "Failed - Try Again"}
        </Button>
      </div>
    </div>
  )
}
