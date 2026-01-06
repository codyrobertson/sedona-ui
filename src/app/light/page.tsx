import type { Metadata } from "next"
import LightModeClient from "./light-client"

export const metadata: Metadata = {
  title: 'Light Mode Demo',
  description: 'Light mode theme demonstration for Sedona UI components.',
  robots: { index: false, follow: false },
}

export default function LightModePage() {
  return <LightModeClient />
}