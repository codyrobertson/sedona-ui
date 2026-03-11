'use client'

import { useEffect } from 'react'
import { EmptyState } from '@/components/ui/empty-state'
import { Icon } from '@/components/ui/icon'
import { trackErrorStateRecovery, trackErrorStateViewed } from '@/lib/analytics'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    trackErrorStateViewed('global_error', error.digest, true)
  }, [error.digest])

  return (
    <html lang="en">
      <body className="bg-zeus-surface-default text-zeus-text-primary">
        <main className="min-h-screen px-4 py-8">
          <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center">
            <EmptyState
              icon={<Icon icon="skull" className="h-8 w-8" />}
              eyebrow="Critical Error"
              tone="error"
              title="Sedona hit a critical failure"
              description="The app shell could not recover this render. Try resetting first. If it happens again, reopen the site and send us feedback from the footer."
              actions={[
                {
                  label: 'Reset App',
                  onClick: () => {
                    trackErrorStateRecovery('global_error', 'reset', error.digest)
                    reset()
                  },
                },
                {
                  label: 'Go to Trading',
                  href: '/trading',
                  variant: 'outline',
                },
              ]}
            />
          </div>
        </main>
      </body>
    </html>
  )
}
