import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import "@/lib/fontawesome" // Initialize Font Awesome library
import { Footer } from "@/components/trading/Footer"
import { JsonLd } from "@/components/seo"
import { SEO_CONFIG } from "@/lib/seo-config"
import { AgentLaunchProvider, ProfileProvider, GPUDeployProvider } from "@/contexts"
import { DeployModelModal, InstanceDetailsModal } from "@/components/trading"

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sedona",
  description: "AI Agent Trading Platform on Solana",
  url: SEO_CONFIG.baseUrl,
  logo: `${SEO_CONFIG.baseUrl}/icon.svg`,
  sameAs: [
    "https://twitter.com/SedonaAI",
  ],
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SEO_CONFIG.siteName,
  url: SEO_CONFIG.baseUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SEO_CONFIG.baseUrl}/trading/{search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
}

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Sedona",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description: "Trade AI agents as performance-based tokens on Solana.",
}

export const metadata: Metadata = {
  metadataBase: new URL(SEO_CONFIG.baseUrl),
  title: {
    template: `%s | ${SEO_CONFIG.siteName}`,
    default: SEO_CONFIG.defaultTitle,
  },
  description: "Trade AI agents on Solana. Real-time charts, swap tokens, and track your portfolio with Sedona's modern trading interface.",
  keywords: ['AI agents', 'trading', 'Solana', 'DeFi', 'crypto trading', 'token swap', 'machine learning', 'automated trading'],
  authors: [{ name: 'Sedona', url: SEO_CONFIG.baseUrl }],
  creator: 'Sedona',
  publisher: 'Sedona',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.svg',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: SEO_CONFIG.baseUrl,
  },
  openGraph: {
    title: SEO_CONFIG.defaultTitle,
    description: "Trade AI agents on Solana. Real-time charts, swap tokens, and track your portfolio with Sedona's modern trading interface.",
    type: 'website',
    siteName: SEO_CONFIG.siteName,
    locale: SEO_CONFIG.locale,
    images: [SEO_CONFIG.defaultImage],
  },
  twitter: {
    card: 'summary_large_image',
    site: SEO_CONFIG.twitter.site,
    creator: SEO_CONFIG.twitter.creator,
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
        <JsonLd data={softwareAppSchema} />
      </head>
      <body className={GeistSans.className}>
        <AgentLaunchProvider>
          <ProfileProvider>
            <GPUDeployProvider>
              {children}
              <Footer />
              <DeployModelModal />
              <InstanceDetailsModal />
            </GPUDeployProvider>
          </ProfileProvider>
        </AgentLaunchProvider>
      </body>
    </html>
  )
}