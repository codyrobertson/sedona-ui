"use client"

import { Button } from "@/components/ui/button"
import { SedonaLogo } from "@/components/sedona/sedona-logo"
import { Navigation } from "@/components/ui/navigation"
import { Search } from "@/components/ui/search"

export default function DarkModePage() {
  return (
    <div className="dark"> {/* Force dark mode */}
      {/* Navigation */}
      <Navigation 
        walletAddress="0xAec78vF...123abc"
        onWalletConnect={() => console.log('Connect wallet')}
        onWalletDisconnect={() => console.log('Disconnect wallet')}
      />
      
      {/* Search Section */}
      <div className="w-full max-w-md mx-auto mt-8 px-6">
        <Search onSearch={(value) => console.log('Search:', value)} />
      </div>
      
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-zeus-surface-default text-zeus-text-primary">
        <div className="max-w-5xl w-full items-center justify-between">
          <div className="flex justify-between items-center mb-8 w-full">
            <div className="flex-1" />
            <SedonaLogo size="xl" />
            <div className="flex-1 flex justify-end">
              <span className="text-sm font-medium bg-zeus-surface-neutral px-3 py-1 rounded-full text-zeus-text-primary">DARK MODE</span>
            </div>
          </div>
          <p className="text-center text-zeus-text-secondary mb-12">
            A modular UI kit built with Tailwind CSS and Shadcn/ui - Dark Mode Testing
          </p>
          
          <div className="flex flex-col gap-8 items-center">
            <div className="flex flex-col gap-4 items-center">
              <h2 className="text-2xl font-semibold mb-4 text-zeus-text-primary">Sedona Buttons - Dark Mode</h2>
              <div className="flex flex-col gap-6 items-center">
                {/* Button Variants */}
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-sm text-zeus-text-secondary">Button Variants</span>
                  <div className="flex gap-4 flex-wrap justify-center">
                    <Button>Primary</Button>
                    <Button variant="brand">Brand</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Danger</Button>
                  </div>
                </div>
                
                {/* Figma Status Buttons */}
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-sm text-zeus-text-secondary">Status Buttons (From Figma)</span>
                  <div className="flex gap-4 flex-wrap justify-center">
                    <Button variant="safe">SAFE</Button>
                    <Button variant="close">CLOSE</Button>
                    <Button variant="risk">AT RISK</Button>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-sm text-zeus-text-secondary">Other Variants</span>
                  <div className="flex gap-4 flex-wrap justify-center">
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </div>
                
                {/* Button Sizes */}
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-sm text-zeus-text-secondary">Button Sizes</span>
                  <div className="flex gap-4 flex-wrap justify-center items-center">
                    <Button size="xs">Extra Small</Button>
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </div>
                
                {/* Icon Buttons */}
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-sm text-zeus-text-secondary">Icon Buttons</span>
                  <div className="flex gap-4 flex-wrap justify-center items-center">
                    <Button icon={<span>→</span>}>With Icon Right</Button>
                    <Button icon={<span>←</span>} iconPosition="left">With Icon Left</Button>
                    <Button iconOnly icon={<span>+</span>} variant="brand" />
                    <Button iconOnly icon={<span>×</span>} variant="outline" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}