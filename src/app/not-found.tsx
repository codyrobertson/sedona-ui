import type { Metadata } from 'next'
import { EmptyState } from '@/components/ui/empty-state'
import { Icon } from '@/components/ui/icon'

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist or has been moved.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-zeus-surface-default px-4 py-8">
      <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center">
        <EmptyState
          icon={<Icon icon="compass" className="h-8 w-8" />}
          eyebrow="404"
          title="This trail does not lead anywhere"
          description="The page you were trying to reach does not exist, or the route has moved while the interface was evolving."
          actions={[
            {
              label: 'Go to Trading',
              href: '/trading',
            },
            {
              label: 'Open Landing',
              href: '/landing',
              variant: 'outline',
            },
          ]}
        />
      </div>
    </main>
  )
}
