import type { Metadata } from "next"
import ProfileClient from "./profile-client"
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
    type: 'website',
    siteName: SEO_CONFIG.siteName,
  },
}

export default function ProfilePage() {
  return <ProfileClient />
}
