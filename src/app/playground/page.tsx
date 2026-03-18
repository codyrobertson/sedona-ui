import type { Metadata } from "next"
import PlaygroundClient from "./playground-client"
import { SEO_CONFIG } from "@/lib/seo-config"

export const metadata: Metadata = {
  title: 'Playground - Shader Lab & ASCII Art',
  description: 'Experiment with WebGL shaders and convert images to ASCII art.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Playground | Sedona',
    description: 'Experiment with WebGL shaders and convert images to ASCII art.',
    url: `${SEO_CONFIG.baseUrl}/playground`,
    siteName: SEO_CONFIG.siteName,
    type: 'website',
  },
}

export default function PlaygroundPage() {
  return <PlaygroundClient />
}
