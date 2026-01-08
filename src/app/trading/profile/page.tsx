import type { Metadata } from "next"
import ProfileClient from "./profile-client"
import { JsonLd } from "@/components/seo"
import { SEO_CONFIG } from "@/lib/seo-config"

export const metadata: Metadata = {
  title: "My Profile",
  description: "Manage your profile, social connections, and preferences on Sedona.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "My Profile | Sedona",
    description: "Manage your profile, social connections, and preferences on Sedona.",
    type: 'profile',
    siteName: SEO_CONFIG.siteName,
    locale: SEO_CONFIG.locale,
  },
  twitter: {
    card: 'summary',
    site: SEO_CONFIG.twitter.site,
    title: "My Profile | Sedona",
    description: "Manage your profile and preferences on Sedona.",
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Sedona",
      item: SEO_CONFIG.baseUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Trading",
      item: `${SEO_CONFIG.baseUrl}/trading`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Profile",
      item: `${SEO_CONFIG.baseUrl}/trading/profile`,
    },
  ],
}

export default function ProfilePage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <ProfileClient />
    </>
  )
}
