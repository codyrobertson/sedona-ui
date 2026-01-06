'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-zeus-bg-base text-zeus-text-primary p-4">
      <h1 className="text-6xl font-bold text-zeus-status-destructive mb-4">Error</h1>
      <h2 className="text-2xl font-semibold mb-2">Something went wrong</h2>
      <p className="text-zeus-text-secondary mb-8 text-center max-w-md">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-sedona-500 text-white rounded-lg hover:bg-sedona-600 transition-colors"
      >
        Try Again
      </button>
    </main>
  )
}
