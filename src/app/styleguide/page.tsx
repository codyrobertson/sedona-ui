import type { Metadata } from "next"
import StyleguideClient from "./styleguide-client"
import { SEO_CONFIG } from "@/lib/seo-config"

export const metadata: Metadata = {
  title: 'Style Guide - Component Library',
  description: 'Explore the Sedona UI component library. Browse buttons, forms, cards, modals, and other UI components built with Tailwind CSS and Shadcn/ui.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Style Guide - Component Library | Sedona',
    description: 'Explore the Sedona UI component library. Browse buttons, forms, cards, modals, and other UI components.',
    url: `${SEO_CONFIG.baseUrl}/styleguide`,
    siteName: SEO_CONFIG.siteName,
    images: [SEO_CONFIG.defaultImage],
    type: 'website',
  },
}

export default function StyleguidePage() {
  return <StyleguideClient />
}
