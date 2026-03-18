'use client'

import { useEffect } from 'react'
import { EmptyState } from '@/components/ui/empty-state'
import { Icon } from '@/components/ui/icon'
import { trackErrorStateRecovery, trackErrorStateViewed } from '@/lib/analytics'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
    trackErrorStateViewed('route_error', error.digest, true)
  }, [error])

  return (
    <main className="min-h-screen bg-zeus-surface-default px-4 py-8">
      <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center">
        <EmptyState
          icon={<Icon icon="triangle-exclamation" className="h-8 w-8" />}
          eyebrow="Recoverable Error"
          tone="error"
          title="Something went wrong in this route"
          description="The page hit an unexpected problem, but the rest of the app should still be recoverable. Try the action below to render it again."
          actions={[
            {
              label: 'Try Again',
              onClick: () => {
                trackErrorStateRecovery('route_error', 'reset', error.digest)
                reset()
              },
            },
            {
              label: 'Back to Trading',
              href: '/trading',
              variant: 'outline',
            },
          ]}
        />
      </div>
    </main>
  )
}
