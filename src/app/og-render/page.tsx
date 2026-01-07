"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

// Dynamically import to avoid SSR issues with WebGL
const FaultyTerminal = dynamic(() => import("@/components/ui/faulty-terminal"), {
  ssr: false,
})

function OGContent() {
  return (
    <div
      id="og-container"
      style={{
        width: 1200,
        height: 630,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Base Sedona OG image */}
      <img
        src="/og-backgrounds/sedona-og.png"
        alt=""
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Paper/Faulty terminal shader overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.15,
          mixBlendMode: "overlay",
        }}
      >
        <FaultyTerminal
          scale={1.2}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={0.2}
          pause={false}
          scanlineIntensity={0.3}
          glitchAmount={0.5}
          flickerAmount={0.3}
          noiseAmp={1.5}
          chromaticAberration={0}
          curvature={0}
          tint="#D56B12"
          mouseReact={false}
          pageLoadAnimation={false}
          brightness={0.6}
          className="w-full h-full"
        />
      </div>
    </div>
  )
}

export default function OGRenderPage() {
  return (
    <Suspense
      fallback={
        <div style={{ width: 1200, height: 630, background: "#141310" }} />
      }
    >
      <OGContent />
    </Suspense>
  )
}
