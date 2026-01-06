import type { Metadata } from "next"
import StyleguideClient from "./styleguide-client"
import { SEO_CONFIG } from "@/lib/seo-config"

export const metadata: Metadata = {
  title: 'Style Guide - Component Library',
  description: 'Explore the Sedona UI component library. Browse buttons, forms, cards, modals, and other UI components built with Tailwind CSS and Shadcn/ui.',
  alternates: {
    canonical: `${SEO_CONFIG.baseUrl}/styleguide`,
  },
}

export default function StyleguidePage() {
  return <StyleguideClient />
}
