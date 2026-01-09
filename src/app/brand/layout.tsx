import { Metadata } from "next"
import { BrandLayout } from "@/components/brand/layout"

export const metadata: Metadata = {
  title: {
    template: "%s | Sedona Brand Guide",
    default: "Sedona Brand Guide",
  },
  description: "Official brand guidelines for Sedona - logos, colors, typography, and more.",
}

export default function BrandRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <BrandLayout>{children}</BrandLayout>
}
