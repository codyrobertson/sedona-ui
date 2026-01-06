"use client"

import { Button } from "@/components/ui/button"
import { SedonaLogo } from "@/components/sedona/sedona-logo"
import { Navigation } from "@/components/ui/navigation"
import { Search } from "@/components/ui/search"

export default function LightModePage() {
  return (
    <div className=""> {/* Force light mode - no dark class */}
      {/* Navigation */}
      <Navigation 
        walletAddress="0xAec78vF...123abc"
        onWalletConnect={() => console.log('Connect wallet')}
        onWalletDisconnect={() => console.log('Disconnect wallet')}
        className="bg-white border-gray-200"
      />
      
      {/* Search Section */}
      <div className="w-full max-w-md mx-auto mt-8 px-6">
        <Search 
          onSearch={(value) => console.log('Search:', value)}
          className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500"
        />
      </div>
      
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white text-black">
        <div className="max-w-5xl w-full items-center justify-between">
          <div className="flex justify-between items-center mb-8 w-full">
            <div className="flex-1" />
            <SedonaLogo size="xl" />
            <div className="flex-1 flex justify-end">
              <span className="text-caption-l font-medium bg-gray-100 px-3 py-1 rounded-full">LIGHT MODE</span>
            </div>
          </div>
          <p className="text-center text-gray-600 mb-12">
            A modular UI kit built with Tailwind CSS and Shadcn/ui - Light Mode Testing
          </p>
          
          <div className="flex flex-col gap-8 items-center">
            <div className="flex flex-col gap-4 items-center">
              <h2 className="text-heading-md font-semibold mb-4">Sedona Buttons - Light Mode</h2>
              <div className="flex flex-col gap-6 items-center">
                {/* Button Variants */}
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-caption-l text-gray-600">Button Variants</span>
                  <div className="flex gap-4 flex-wrap justify-center">
                    <Button>Primary</Button>
                    <Button variant="brand">Brand</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Danger</Button>
                  </div>
                </div>
                
                {/* Figma Status Buttons */}
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-caption-l text-gray-600">Status Buttons (From Figma)</span>
                  <div className="flex gap-4 flex-wrap justify-center">
                    <Button variant="safe">SAFE</Button>
                    <Button variant="close">CLOSE</Button>
                    <Button variant="risk">AT RISK</Button>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-caption-l text-gray-600">Other Variants</span>
                  <div className="flex gap-4 flex-wrap justify-center">
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </div>
                
                {/* Button Sizes */}
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-caption-l text-gray-600">Button Sizes</span>
                  <div className="flex gap-4 flex-wrap justify-center items-center">
                    <Button size="xs">Extra Small</Button>
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </div>
                
                {/* Icon Buttons */}
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-caption-l text-gray-600">Icon Buttons</span>
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