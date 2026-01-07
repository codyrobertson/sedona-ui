import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { SEO_CONFIG } from "@/lib/seo-config"

export const metadata: Metadata = {
  title: SEO_CONFIG.defaultTitle,
  description: SEO_CONFIG.defaultDescription,
  alternates: {
    canonical: `${SEO_CONFIG.baseUrl}/trading`,
  },
}

export default function Home() {
  redirect("/trading")
}
