"use client"

import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Dynamically import to avoid SSR issues with WebGL
const FaultyTerminal = dynamic(() => import("@/components/ui/faulty-terminal"), {
  ssr: false,
})

function TerminalContent() {
  const searchParams = useSearchParams()
  const seed = parseInt(searchParams.get("seed") || "0", 10)
  const [ready, setReady] = useState(false)

  // Let it animate briefly then signal ready
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 500)
    return () => clearTimeout(timer)
  }, [])

  // Vary scale slightly based on seed for different patterns
  const scale = 1.0 + (seed % 5) * 0.1
  const gridMul: [number, number] = [1.5 + (seed % 3) * 0.3, 1]

  return (
    <div
      id="terminal-container"
      style={{ width: 600, height: 630, background: "#1e1c17" }}
      data-ready={ready}
    >
      <FaultyTerminal
        scale={scale}
        gridMul={gridMul}
        digitSize={1.5}
        timeScale={0.3}
        pause={false}
        scanlineIntensity={0.25}
        glitchAmount={1}
        flickerAmount={0.5}
        noiseAmp={1.2}
        chromaticAberration={0}
        curvature={0}
        tint="#D56B12"
        mouseReact={false}
        pageLoadAnimation={false}
        brightness={0.7}
        className="w-full h-full"
      />
    </div>
  )
}

export default function TerminalRenderPage() {
  return (
    <Suspense fallback={<div style={{ width: 600, height: 630, background: "#1e1c17" }} />}>
      <TerminalContent />
    </Suspense>
  )
}
