import type { Metadata } from "next"
import DarkModeClient from "./dark-client"

export const metadata: Metadata = {
  title: 'Dark Mode Demo',
  description: 'Dark mode theme demonstration for Sedona UI components.',
  robots: { index: false, follow: false },
}

export default function DarkModePage() {
  return <DarkModeClient />
}