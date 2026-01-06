'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <main className="min-h-screen flex flex-col items-center justify-center p-4">
          <h1 className="text-6xl font-bold text-red-500 mb-4">Error</h1>
          <h2 className="text-2xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-gray-400 mb-8">A critical error occurred.</p>
          <button
            onClick={reset}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Try Again
          </button>
        </main>
      </body>
    </html>
  )
}
