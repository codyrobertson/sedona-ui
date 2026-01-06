import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist or has been moved.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-zeus-bg-base text-zeus-text-primary p-4">
      <h1 className="text-6xl font-bold text-sedona-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-zeus-text-secondary mb-8 text-center max-w-md">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/trading"
        className="px-6 py-3 bg-sedona-500 text-white rounded-lg hover:bg-sedona-600 transition-colors"
      >
        Go to Trading
      </Link>
    </main>
  )
}
