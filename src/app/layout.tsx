import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Footer } from "@/components/trading/Footer"
import { JsonLd } from "@/components/seo"
import { SEO_CONFIG } from "@/lib/seo-config"

const inter = Inter({ subsets: ["latin"] })

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sedona",
  description: "AI Agent Trading Platform on Solana",
  url: SEO_CONFIG.baseUrl,
  logo: `${SEO_CONFIG.baseUrl}/logo.png`,
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SEO_CONFIG.siteName,
  url: SEO_CONFIG.baseUrl,
}

export const metadata: Metadata = {
  metadataBase: new URL(SEO_CONFIG.baseUrl),
  title: {
    template: `%s | ${SEO_CONFIG.siteName}`,
    default: SEO_CONFIG.defaultTitle,
  },
  description: "Trade AI agents on Solana. Real-time charts, swap tokens, and track your portfolio with Sedona's modern trading interface.",
  keywords: ['AI agents', 'trading', 'Solana', 'DeFi', 'crypto trading', 'token swap'],
  alternates: {
    canonical: SEO_CONFIG.baseUrl,
  },
  openGraph: {
    title: SEO_CONFIG.defaultTitle,
    description: "Trade AI agents on Solana. Real-time charts, swap tokens, and track your portfolio with Sedona's modern trading interface.",
    type: 'website',
    siteName: SEO_CONFIG.siteName,
    images: [SEO_CONFIG.defaultImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_CONFIG.defaultTitle,
    description: "Trade AI agents on Solana. Real-time charts, swap tokens, and track your portfolio with Sedona's modern trading interface.",
    images: [SEO_CONFIG.defaultImage],
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  )
}