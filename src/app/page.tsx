"use client"

import { Button } from "@/components/ui/button"
import { SedonaLogo } from "@/components/sedona/sedona-logo"
import { ThemeToggle } from "@/components/sedona/theme-toggle"
import { Navigation } from "@/components/ui/navigation"
import { Search } from "@/components/ui/search"
import { Badge, BadgeGroup } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableRow, DotMatrixGrid } from "@/components/ui/table"
import { OutlineCard } from "@/components/ui/outline-card"
import { ChatInterface, MessageBubble, AgentAvatar, TypingIndicator } from "@/components/chat"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation 
        walletAddress="0xAec78vF...123abc"
        onWalletConnect={() => console.log('Connect wallet')}
        onWalletDisconnect={() => console.log('Disconnect wallet')}
      />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <SedonaLogo size="xl" />
            <ThemeToggle />
          </div>
          <h1 className="text-4xl font-bold mb-4">Sedona Design System</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive UI kit built with Tailwind CSS, Shadcn/ui, and Zeus design tokens. 
            Optimized for AI agent trading platforms.
          </p>
        </div>

        <div className="space-y-20">
          {/* Design Tokens Section */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Design Foundation</h2>
            
            {/* Typography */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6">Typography System</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-muted-foreground">Inter Font Family</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <span className="text-body-m font-semibold">Body M/Semi Bold</span>
                      <code className="text-caption-s bg-muted px-2 py-1 rounded">18px / 26px / 600</code>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <span className="text-body-s font-medium">Body S/Medium</span>
                      <code className="text-caption-s bg-muted px-2 py-1 rounded">16px / 24px / 500</code>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <span className="text-caption-l font-semibold">Caption L/Semi Bold</span>
                      <code className="text-caption-s bg-muted px-2 py-1 rounded">14px / 20px / 600</code>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <span className="text-caption-m font-medium">Caption M/Medium</span>
                      <code className="text-caption-s bg-muted px-2 py-1 rounded">12px / 16px / 500</code>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <span className="text-caption-s font-semibold">Caption S/Semi Bold</span>
                      <code className="text-caption-s bg-muted px-2 py-1 rounded">10px / 14px / 600</code>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-muted-foreground">Monospace Font Family</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <span className="font-mono text-body-m">1000 SOL</span>
                      <code className="text-caption-s bg-muted px-2 py-1 rounded">Berkeley Mono</code>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <span className="font-mono text-caption-m">0xAec78vF...123abc</span>
                      <code className="text-caption-s bg-muted px-2 py-1 rounded">Wallet addresses</code>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <span className="font-mono text-caption-s">$4,500,000</span>
                      <code className="text-caption-s bg-muted px-2 py-1 rounded">Financial data</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Complete Zeus Color System */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6">Complete Zeus Color System</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                
                {/* Surface Colors */}
                <div>
                  <h4 className="text-lg font-medium mb-4">Surface Colors</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 border rounded">
                      <div className="w-6 h-6 bg-zeus-surface-default rounded border"></div>
                      <div className="text-caption-s">
                        <div className="font-medium">Default</div>
                        <code className="text-muted-foreground">#1e1c17</code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded">
                      <div className="w-6 h-6 bg-zeus-surface-neutral rounded border"></div>
                      <div className="text-caption-s">
                        <div className="font-medium">Neutral</div>
                        <code className="text-muted-foreground">#2e2b24</code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded">
                      <div className="w-6 h-6 bg-zeus-surface-neutral-subtle rounded border"></div>
                      <div className="text-caption-s">
                        <div className="font-medium">Neutral Subtle</div>
                        <code className="text-muted-foreground">#3e3a31</code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded">
                      <div className="w-6 h-6 bg-zeus-surface-warning rounded border"></div>
                      <div className="text-caption-s">
                        <div className="font-medium">Warning</div>
                        <code className="text-muted-foreground">#2e2319</code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded">
                      <div className="w-6 h-6 bg-zeus-surface-destructive rounded border"></div>
                      <div className="text-caption-s">
                        <div className="font-medium">Destructive</div>
                        <code className="text-muted-foreground">#2e1b19</code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded">
                      <div className="w-6 h-6 bg-zeus-surface-success rounded border"></div>
                      <div className="text-caption-s">
                        <div className="font-medium">Success</div>
                        <code className="text-muted-foreground">#1e2821</code>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Accent Colors */}
                <div>
                  <h4 className="text-lg font-medium mb-4">Accent Colors</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 border rounded">
                      <div className="w-6 h-6 bg-zeus-accent-red rounded border"></div>
                      <div className="text-caption-s">
                        <div className="font-medium">Red</div>
                        <code className="text-muted-foreground">#d9281c</code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded">
                      <div className="w-6 h-6 bg-zeus-accent-orange rounded border"></div>
                      <div className="text-caption-s">
                        <div className="font-medium">Orange</div>
                        <code className="text-muted-foreground">#fb9704</code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded">
                      <div className="w-6 h-6 bg-zeus-accent-yellow rounded border"></div>
                      <div className="text-caption-s">
                        <div className="font-medium">Yellow</div>
                        <code className="text-muted-foreground">#fdd835</code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded">
                      <div className="w-6 h-6 bg-zeus-accent-green rounded border"></div>
                      <div className="text-caption-s">
                        <div className="font-medium">Green</div>
                        <code className="text-muted-foreground">#21a65e</code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded">
                      <div className="w-6 h-6 bg-zeus-accent-blue rounded border"></div>
                      <div className="text-caption-s">
                        <div className="font-medium">Blue</div>
                        <code className="text-muted-foreground">#397fb2</code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded">
                      <div className="w-6 h-6 bg-zeus-accent-purple rounded border"></div>
                      <div className="text-caption-s">
                        <div className="font-medium">Purple</div>
                        <code className="text-muted-foreground">#8b5cf6</code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded">
                      <div className="w-6 h-6 bg-zeus-accent-pink rounded border"></div>
                      <div className="text-caption-s">
                        <div className="font-medium">Pink</div>
                        <code className="text-muted-foreground">#ec4899</code>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Colors */}
                <div>
                  <h4 className="text-lg font-medium mb-4">Status Colors</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 border rounded">
                      <div className="w-6 h-6 bg-zeus-status-success rounded border"></div>
                      <div className="text-caption-s">
                        <div className="font-medium">Success</div>
                        <code className="text-muted-foreground">#339965</code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded">
                      <div className="w-6 h-6 bg-zeus-status-warning rounded border"></div>
                      <div className="text-caption-s">
                        <div className="font-medium">Warning</div>
                        <code className="text-muted-foreground">#f48e2f</code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded">
                      <div className="w-6 h-6 bg-zeus-status-destructive rounded border"></div>
                      <div className="text-caption-s">
                        <div className="font-medium">Destructive</div>
                        <code className="text-muted-foreground">#e6483d</code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded">
                      <div className="w-6 h-6 bg-zeus-status-info rounded border"></div>
                      <div className="text-caption-s">
                        <div className="font-medium">Info</div>
                        <code className="text-muted-foreground">#397fb2</code>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text Colors */}
                <div>
                  <h4 className="text-lg font-medium mb-4">Text Colors</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 border rounded bg-zeus-surface-default">
                      <div className="w-6 h-6 bg-zeus-text-primary rounded border"></div>
                      <div className="text-caption-s">
                        <div className="font-medium text-white">Primary</div>
                        <code className="text-zeus-text-secondary">#ffffff</code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded bg-zeus-surface-default">
                      <div className="w-6 h-6 bg-zeus-text-secondary rounded border"></div>
                      <div className="text-caption-s">
                        <div className="font-medium text-white">Secondary</div>
                        <code className="text-zeus-text-secondary">60% opacity</code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded bg-zeus-surface-default">
                      <div className="w-6 h-6 bg-zeus-text-tertiary rounded border"></div>
                      <div className="text-caption-s">
                        <div className="font-medium text-white">Tertiary</div>
                        <code className="text-zeus-text-secondary">46% opacity</code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded">
                      <div className="w-6 h-6 bg-zeus-text-inverted rounded border"></div>
                      <div className="text-caption-s">
                        <div className="font-medium">Inverted</div>
                        <code className="text-muted-foreground">#1e1c17</code>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Brand Colors */}
                <div>
                  <h4 className="text-lg font-medium mb-4">Brand Colors</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 border rounded">
                      <div className="w-6 h-6 bg-sedona-400 rounded border"></div>
                      <div className="text-caption-s">
                        <div className="font-medium">Sedona 400</div>
                        <code className="text-muted-foreground">#f2883c</code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded">
                      <div className="w-6 h-6 bg-sedona-500 rounded border"></div>
                      <div className="text-caption-s">
                        <div className="font-medium">Sedona 500</div>
                        <code className="text-muted-foreground">#de7001</code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded">
                      <div className="w-6 h-6 bg-sedona-600 rounded border"></div>
                      <div className="text-caption-s">
                        <div className="font-medium">Sedona 600</div>
                        <code className="text-muted-foreground">#c25e00</code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded">
                      <div className="w-6 h-6 bg-sedona-700 rounded border"></div>
                      <div className="text-caption-s">
                        <div className="font-medium">Sedona 700</div>
                        <code className="text-muted-foreground">#a14800</code>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Border & Overlay Colors */}
                <div>
                  <h4 className="text-lg font-medium mb-4">Border & Overlay</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 border rounded bg-zeus-surface-default">
                      <div className="w-6 h-6 bg-zeus-border-normal rounded border border-white"></div>
                      <div className="text-caption-s">
                        <div className="font-medium text-white">Normal</div>
                        <code className="text-zeus-text-secondary">18% opacity</code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded bg-zeus-surface-default">
                      <div className="w-6 h-6 bg-zeus-border-alpha rounded border border-white"></div>
                      <div className="text-caption-s">
                        <div className="font-medium text-white">Alpha</div>
                        <code className="text-zeus-text-secondary">14% opacity</code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded bg-zeus-surface-default">
                      <div className="w-6 h-6 bg-zeus-overlay-light rounded border border-white"></div>
                      <div className="text-caption-s">
                        <div className="font-medium text-white">Light Overlay</div>
                        <code className="text-zeus-text-secondary">5% opacity</code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded bg-zeus-surface-default">
                      <div className="w-6 h-6 bg-zeus-overlay-medium rounded border border-white"></div>
                      <div className="text-caption-s">
                        <div className="font-medium text-white">Medium Overlay</div>
                        <code className="text-zeus-text-secondary">10% opacity</code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Logo System */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Logo System</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 border rounded-lg">
                <div className="mb-4">
                  <SedonaLogo variant="logo" size="lg" />
                </div>
                <h4 className="font-medium mb-2">Full Logo</h4>
                <p className="text-caption-m text-muted-foreground">Primary brand mark with wordmark</p>
              </div>
              
              <div className="text-center p-6 border rounded-lg">
                <div className="mb-4 flex justify-center">
                  <SedonaLogo variant="logomark" size="lg" />
                </div>
                <h4 className="font-medium mb-2">Logomark</h4>
                <p className="text-caption-m text-muted-foreground">Icon only for small spaces</p>
              </div>
              
              <div className="text-center p-6 border rounded-lg">
                <div className="mb-4">
                  <SedonaLogo variant="wordmark" size="lg" />
                </div>
                <h4 className="font-medium mb-2">Wordmark</h4>
                <p className="text-caption-m text-muted-foreground">Text only version</p>
              </div>
              
              <div className="text-center p-6 border rounded-lg">
                <div className="mb-4 space-y-2">
                  <SedonaLogo variant="logo" size="sm" />
                  <SedonaLogo variant="logo" size="md" />
                  <SedonaLogo variant="logo" size="lg" />
                </div>
                <h4 className="font-medium mb-2">Size Variants</h4>
                <p className="text-caption-m text-muted-foreground">Multiple size options</p>
              </div>
            </div>
          </section>

          {/* Navigation Components */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Navigation Components</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Navigation Bar</h3>
                <p className="text-muted-foreground mb-4">
                  Responsive navigation with wallet connection, logo, and theme-aware styling.
                </p>
                <div className="border rounded-lg p-1">
                  <Navigation 
                    walletAddress="0xAec78vF...123abc"
                    onWalletConnect={() => {}}
                    onWalletDisconnect={() => {}}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Search Component</h3>
                <p className="text-muted-foreground mb-4">
                  Search input with proper focus states and Zeus color integration.
                </p>
                <div className="max-w-md">
                  <Search onSearch={(value) => console.log('Search:', value)} />
                </div>
              </div>
            </div>
          </section>

          {/* Button System */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Button System</h2>
            
            <div className="space-y-12">
              {/* Primary Variants */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Button Variants</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Button className="mb-3">Primary</Button>
                    <h4 className="font-medium mb-1">Primary</h4>
                    <p className="text-caption-s text-muted-foreground">Main actions</p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <Button variant="brand" className="mb-3">Brand</Button>
                    <h4 className="font-medium mb-1">Brand</h4>
                    <p className="text-caption-s text-muted-foreground">Sedona orange</p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <Button variant="secondary" className="mb-3">Secondary</Button>
                    <h4 className="font-medium mb-1">Secondary</h4>
                    <p className="text-caption-s text-muted-foreground">Secondary actions</p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <Button variant="destructive" className="mb-3">Danger</Button>
                    <h4 className="font-medium mb-1">Destructive</h4>
                    <p className="text-caption-s text-muted-foreground">Dangerous actions</p>
                  </div>
                </div>
              </div>

              {/* Status Buttons */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Status Indicators</h3>
                <p className="text-muted-foreground mb-4">
                  Status buttons based on Figma designs for agent trading states.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <Button variant="safe">SAFE</Button>
                  <Button variant="close">CLOSE</Button>
                  <Button variant="risk">AT RISK</Button>
                </div>
              </div>

              {/* Button Sizes */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Button Sizes</h3>
                <div className="flex gap-4 items-center flex-wrap">
                  <Button size="xs">Extra Small</Button>
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>

              {/* Icon Buttons */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Icon Buttons</h3>
                <div className="flex gap-4 items-center flex-wrap">
                  <Button icon={<span>→</span>}>With Icon Right</Button>
                  <Button icon={<span>←</span>} iconPosition="left">With Icon Left</Button>
                  <Button iconOnly icon={<span>+</span>} variant="brand" />
                  <Button iconOnly icon={<span>×</span>} variant="outline" />
                </div>
              </div>

              {/* Other Variants */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Other Variants</h3>
                <div className="flex gap-4 flex-wrap">
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>
            </div>
          </section>

          {/* Badge System */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Badge System</h2>
            <p className="text-muted-foreground mb-8">
              Badge components for status indicators, labels, and categorization using Zeus theme variables.
            </p>
            
            <div className="space-y-8">
              {/* Core Badge Variants - Exact Figma Designs */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Core Badge Variants</h3>
                <p className="text-muted-foreground mb-4">
                  Primary badge designs matching Figma specifications exactly.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Badge className="mb-3">$SHOP</Badge>
                    <h4 className="font-medium text-caption-s">Default</h4>
                    <p className="text-caption-s text-muted-foreground">Light, mono font</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-card dark:bg-zeus-surface-default">
                    <Badge variant="success" className="mb-3">1000 SOL</Badge>
                    <h4 className="font-medium text-caption-s text-card-foreground dark:text-white">Success</h4>
                    <p className="text-caption-s text-muted-foreground dark:text-white/60">Dark, green text</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-card dark:bg-zeus-surface-default">
                    <Badge variant="danger" className="mb-3">AT RISK</Badge>
                    <h4 className="font-medium text-caption-s text-card-foreground dark:text-white">Danger</h4>
                    <p className="text-caption-s text-muted-foreground dark:text-white/60">Dark, red text</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-card dark:bg-zeus-surface-default">
                    <Badge variant="info" className="mb-3">INFO</Badge>
                    <h4 className="font-medium text-caption-s text-card-foreground dark:text-white">Info</h4>
                    <p className="text-caption-s text-muted-foreground dark:text-white/60">Dark, blue text</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-card dark:bg-zeus-surface-default">
                    <Badge variant="warning" className="mb-3">WARNING</Badge>
                    <h4 className="font-medium text-caption-s text-card-foreground dark:text-white">Warning</h4>
                    <p className="text-caption-s text-muted-foreground dark:text-white/60">Dark, orange text</p>
                  </div>
                </div>
              </div>

              {/* Badge Group Component */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Badge Groups</h3>
                <p className="text-muted-foreground mb-4">
                  Complex badges with icons, labels, and values following Figma badge group design.
                </p>
                <div className="flex gap-4 flex-wrap items-center">
                  <BadgeGroup 
                    icon={<span>▲</span>}
                    label="Market Cap Safeline" 
                    value="$1,000,000.56"
                    variant="info"
                  />
                  <BadgeGroup 
                    icon={<span>●</span>}
                    label="Holdings" 
                    value="500 SOL"
                    variant="success"
                  />
                  <BadgeGroup 
                    icon={<span>⚠</span>}
                    label="Risk Level" 
                    value="Medium"
                    variant="warning"
                  />
                  <BadgeGroup 
                    icon={<span>✗</span>}
                    label="Alert" 
                    value="Price Drop"
                    variant="danger"
                  />
                </div>
              </div>

              {/* Status Badges */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Status Badges</h3>
                <p className="text-muted-foreground mb-4">
                  Status badges matching Figma design for trading indicators.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <Badge variant="safe">SAFE</Badge>
                  <Badge variant="close">CLOSE</Badge>
                  <Badge variant="risk">AT RISK</Badge>
                  <Badge variant="secondary">NEUTRAL</Badge>
                  <Badge variant="brand">ACCENT</Badge>
                </div>
              </div>

              {/* Badge Sizes */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Badge Sizes</h3>
                <div className="flex gap-4 items-center flex-wrap">
                  <Badge size="sm">Small</Badge>
                  <Badge size="default">Default</Badge>
                  <Badge size="lg">Large</Badge>
                </div>
              </div>
            </div>
          </section>

          {/* Input System */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Input System</h2>
            <p className="text-muted-foreground mb-8">
              Form input components with theme-aware styling and proper focus states.
            </p>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Input Types</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                  <div className="space-y-2">
                    <label className="text-caption-l font-medium">Text Input</label>
                    <Input type="text" placeholder="Enter text..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-caption-l font-medium">Email Input</label>
                    <Input type="email" placeholder="Enter email..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-caption-l font-medium">Password Input</label>
                    <Input type="password" placeholder="Enter password..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-caption-l font-medium">Number Input</label>
                    <Input type="number" placeholder="Enter number..." />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Input States</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl">
                  <div className="space-y-2">
                    <label className="text-caption-l font-medium">Default</label>
                    <Input placeholder="Default state" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-caption-l font-medium">With Value</label>
                    <Input value="Sample value" readOnly />
                  </div>
                  <div className="space-y-2">
                    <label className="text-caption-l font-medium">Disabled</label>
                    <Input placeholder="Disabled state" disabled />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Card System */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Card System</h2>
            <p className="text-muted-foreground mb-8">
              Flexible card components for content organization using theme variables.
            </p>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Card Components</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Basic Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic Card</CardTitle>
                      <CardDescription>
                        A simple card with header and content
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-caption-l">
                        This is the card content area where you can add any components or text.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Card with Footer */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Card with Footer</CardTitle>
                      <CardDescription>
                        Card including footer actions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-caption-l">
                        Content area with footer buttons below.
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">Cancel</Button>
                      <Button size="sm">Save</Button>
                    </CardFooter>
                  </Card>

                  {/* Status Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        Agent Status
                        <Badge variant="safe">SAFE</Badge>
                      </CardTitle>
                      <CardDescription>
                        Trading agent performance
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-caption-l">Balance:</span>
                          <span className="font-mono text-caption-l">1,250 SOL</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-caption-l">24h Change:</span>
                          <span className="font-mono text-caption-l text-emerald-600 dark:text-zeus-accent-green">+5.2%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Card Composition</h3>
                <div className="max-w-md">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Component Structure</CardTitle>
                          <CardDescription>
                            Available card sub-components
                          </CardDescription>
                        </div>
                        <Badge variant="outline">Demo</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1 text-caption-l">
                        <li>• CardHeader - Header container</li>
                        <li>• CardTitle - Main heading</li>
                        <li>• CardDescription - Subtitle text</li>
                        <li>• CardContent - Main content area</li>
                        <li>• CardFooter - Footer actions</li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">Learn More</Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Table System */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Table System</h2>
            <p className="text-muted-foreground mb-8">
              Flexible table rows with dot matrix visualization, exactly matching Figma designs.
            </p>
            
            <div className="space-y-8">
              {/* Table Rows */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Table Rows</h3>
                <div className="border rounded-lg overflow-hidden bg-card dark:bg-zeus-surface-default">
                  <Table>
                    <TableRow
                      avatar={{ initials: "SB" }}
                      rank={1}
                      title="Shopping Buddy"
                      description="Your smart companion for finding the deals."
                      token="$SHOP"
                      priceChange={{ value: "+4.7%", isPositive: true }}
                      marketCap="$4,500,000"
                      status={{ label: "SAFE", type: "safe" }}
                      dotMatrix={{ 
                        colorScheme: "green",
                        data: Array.from({ length: 50 }, () => Math.random() > 0.3 ? 1 : 0)
                      }}
                    />
                    <TableRow
                      avatar={{ initials: "TC" }}
                      rank={2}
                      title="Trading Cat"
                      description="AI-powered trading assistant for crypto markets."
                      token="$TCAT"
                      priceChange={{ value: "-2.1%", isPositive: false }}
                      marketCap="$2,100,000"
                      status={{ label: "RISK", type: "risk" }}
                      dotMatrix={{ 
                        colorScheme: "red",
                        data: Array.from({ length: 50 }, () => Math.random() > 0.4 ? 1 : 0)
                      }}
                    />
                    <TableRow
                      avatar={{ initials: "WM" }}
                      rank={3}
                      title="Wealth Manager"
                      description="Portfolio optimization and risk management."
                      token="$WEALTH"
                      priceChange={{ value: "+1.2%", isPositive: true }}
                      marketCap="$8,900,000"
                      status={{ label: "CLOSE", type: "close" }}
                      dotMatrix={{ 
                        colorScheme: "orange",
                        data: Array.from({ length: 50 }, () => Math.random() > 0.5 ? 1 : 0)
                      }}
                    />
                  </Table>
                </div>
              </div>

              {/* Dot Matrix Grid Standalone */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Dot Matrix Grid</h3>
                <p className="text-muted-foreground mb-4">
                  Flexible visualization component with customizable colors and data patterns.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                  <div className="text-center p-4 border rounded-lg bg-card dark:bg-zeus-surface-default">
                    <DotMatrixGrid 
                      colorScheme="green" 
                      data={Array.from({ length: 40 }, () => Math.random() > 0.3 ? 1 : 0)}
                    />
                    <h4 className="font-medium text-caption-s mt-2 text-card-foreground dark:text-white">Green</h4>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-zeus-surface-default">
                    <DotMatrixGrid 
                      colorScheme="red" 
                      data={Array.from({ length: 40 }, () => Math.random() > 0.6 ? 1 : 0)}
                    />
                    <h4 className="font-medium text-caption-s mt-2 text-white">Red</h4>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-zeus-surface-default">
                    <DotMatrixGrid 
                      colorScheme="blue" 
                      data={Array.from({ length: 40 }, () => Math.random() > 0.4 ? 1 : 0)}
                    />
                    <h4 className="font-medium text-caption-s mt-2 text-white">Blue</h4>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-zeus-surface-default">
                    <DotMatrixGrid 
                      colorScheme="orange" 
                      data={Array.from({ length: 40 }, () => Math.random() > 0.5 ? 1 : 0)}
                    />
                    <h4 className="font-medium text-caption-s mt-2 text-white">Orange</h4>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-zeus-surface-default">
                    <DotMatrixGrid 
                      colorScheme="purple" 
                      data={Array.from({ length: 40 }, () => Math.random() > 0.4 ? 1 : 0)}
                    />
                    <h4 className="font-medium text-caption-s mt-2 text-white">Purple</h4>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-zeus-surface-default">
                    <DotMatrixGrid 
                      colorScheme="pink" 
                      data={Array.from({ length: 40 }, () => Math.random() > 0.3 ? 1 : 0)}
                    />
                    <h4 className="font-medium text-caption-s mt-2 text-white">Pink</h4>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-zeus-surface-default">
                    <DotMatrixGrid 
                      colorScheme="yellow" 
                      data={Array.from({ length: 40 }, () => Math.random() > 0.5 ? 1 : 0)}
                    />
                    <h4 className="font-medium text-caption-s mt-2 text-white">Yellow</h4>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-zeus-surface-default">
                    <DotMatrixGrid 
                      colorScheme="neutral" 
                      data={Array.from({ length: 40 }, () => Math.random() > 0.4 ? 1 : 0)}
                    />
                    <h4 className="font-medium text-caption-s mt-2 text-white">Neutral</h4>
                  </div>
                </div>
              </div>

              {/* Component Features */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Component Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Table Row Features</CardTitle>
                      <CardDescription>
                        Comprehensive table row with all Figma elements
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-caption-l">
                        <li>• Avatar with initials or image</li>
                        <li>• Rank numbering system</li>
                        <li>• Token badges with monospace font</li>
                        <li>• Price change indicators</li>
                        <li>• Market cap formatting</li>
                        <li>• Status labels with info icons</li>
                        <li>• Integrated dot matrix visualization</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Dot Matrix Grid</CardTitle>
                      <CardDescription>
                        Flexible data visualization component
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-caption-l">
                        <li>• Customizable color schemes</li>
                        <li>• Dynamic data patterns</li>
                        <li>• Responsive sizing</li>
                        <li>• Performance optimized</li>
                        <li>• Theme-aware styling</li>
                        <li>• Exact Figma measurements</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Outline Card System */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Outline Card System</h2>
            <p className="text-muted-foreground mb-8">
              Complex content cards with market performance data, dot matrix visualizations, and structured information sections.
            </p>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Market Performance Card</h3>
                <div className="max-w-2xl">
                  <OutlineCard
                    title="Trade AI agents as performance-based tokens on Solana."
                    description="Our weekly market competitions reward strategic traders and eliminate underperformers—creating continuous opportunities for profit."
                    marketPerformance={{
                      timeframes: [
                        { label: "D", active: true },
                        { label: "W", active: false },
                        { label: "M", active: false }
                      ],
                      agentsData: {
                        launched: 200,
                        topAgents: [
                          { name: "Shopping Bud..", token: "$SHOP", mcap: "$4,500,000", status: "safe" },
                          { name: "Shopping Bud..", token: "$SHOP", mcap: "$4,500,000", status: "close" },
                          { name: "Shopping Bud..", token: "$SHOP", mcap: "$4,500,000", status: "risk" }
                        ]
                      },
                      volumeData: {
                        "24h": "$4.13k",
                        total: "$200,000"
                      },
                      dotMatrixData: {
                        left: Array.from({ length: 60 }, () => Math.random() > 0.4 ? 1 : 0),
                        right: Array.from({ length: 60 }, () => Math.random() > 0.3 ? 1 : 0)
                      }
                    }}
                    howItWorks={{
                      readDocsLink: "#",
                      sections: [
                        {
                          title: "Trade & Compete",
                          description: "Trade AI agents as Solana tokens where market activity determines value—buy low, sell high based on agent performance metrics."
                        },
                        {
                          title: "Develop & Deploy",
                          description: "Create AI agents using our developer tools and improve them based on market feedback and trading activity."
                        },
                        {
                          title: "Elimination Rounds",
                          description: "Weekly competitions eliminate underperformers, creating continuous opportunities for profit."
                        }
                      ]
                    }}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Simple Information Card</h3>
                <div className="max-w-lg">
                  <OutlineCard
                    title="How It Works?"
                    howItWorks={{
                      readDocsLink: "#",
                      sections: [
                        {
                          title: "Connect Wallet",
                          description: "Connect your Solana wallet to start trading AI agents as performance-based tokens."
                        },
                        {
                          title: "Browse Agents",
                          description: "Explore our marketplace of AI agents, each with unique capabilities and performance metrics."
                        }
                      ]
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Chat System */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Chat System</h2>
            <p className="text-muted-foreground mb-8">
              Comprehensive chat interface components for AI agent interactions with multiple variants and full theme integration.
            </p>
            
            <div className="space-y-8">
              {/* Complete Chat Interface */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Complete Chat Interface (Dark Theme)</h3>
                <p className="text-caption-l text-muted-foreground mb-4">
                  Rebuilt to match Figma designs exactly with proper dark theme colors and styling.
                </p>
                <div className="max-w-md mx-auto">
                  <ChatInterface
                    agent={{
                      id: "agent-1",
                      name: "Shopping Buddy",
                      status: "online",
                      description: "AI shopping assistant"
                    }}
                    messages={[
                      {
                        id: "1",
                        content: "Hello! How can I help you find the best deals today?",
                        sender: "agent",
                        timestamp: new Date(Date.now() - 60000),
                        agentName: "Shopping Buddy"
                      },
                      {
                        id: "2", 
                        content: "I'm looking for a new laptop under $1000",
                        sender: "user",
                        timestamp: new Date(Date.now() - 30000)
                      },
                      {
                        id: "3",
                        content: "Perfect! I can help you find some great laptop deals. Let me search for options under $1000 with good performance ratings.",
                        sender: "agent", 
                        timestamp: new Date(),
                        agentName: "Shopping Buddy"
                      }
                    ]}
                    isTyping={true}
                    onMessageSend={(message) => console.log("Sent:", message)}
                    variant="panel"
                  />
                </div>
              </div>

              {/* Individual Components */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Individual Components</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Agent Avatars */}
                  <div className="p-4 border rounded-lg bg-card dark:bg-zeus-surface-default">
                    <h4 className="font-medium text-card-foreground dark:text-white mb-3">Agent Avatars</h4>
                    <div className="flex gap-3 items-center">
                      <AgentAvatar name="Shopping Buddy" status="online" size="sm" />
                      <AgentAvatar name="Trading Cat" status="typing" size="md" />
                      <AgentAvatar name="Wealth Manager" status="offline" size="lg" />
                    </div>
                  </div>

                  {/* Message Bubbles */}
                  <div className="p-4 border rounded-lg bg-card dark:bg-[#1e1c17]">
                    <h4 className="font-medium text-card-foreground dark:text-white mb-3">Message Types (Exact Figma)</h4>
                    <div className="space-y-3">
                      <MessageBubble
                        content="I can help you find the best deals today!"
                        sender="agent"
                        timestamp={new Date()}
                        agentName="AI"
                        showAvatar={true}
                        showTimestamp={false}
                      />
                      <MessageBubble
                        content="That sounds great, thanks!"
                        sender="user"
                        timestamp={new Date()}
                        showAvatar={false}
                        showTimestamp={false}
                      />
                    </div>
                  </div>

                  {/* Typing Indicator */}
                  <div className="p-4 border rounded-lg bg-card dark:bg-[#1e1c17]">
                    <h4 className="font-medium text-card-foreground dark:text-white mb-3">Typing States</h4>
                    <div className="space-y-3">
                      <TypingIndicator variant="dots" />
                      <TypingIndicator variant="text" agentName="AI Agent" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Overview */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Chat System Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Core Features</CardTitle>
                      <CardDescription>
                        Essential chat functionality
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-caption-l">
                        <li>• Real-time message exchange</li>
                        <li>• Agent avatars with status indicators</li>
                        <li>• Typing indicators and animations</li>
                        <li>• Message grouping and timestamps</li>
                        <li>• Auto-scrolling message list</li>
                        <li>• Multi-line input with auto-resize</li>
                        <li>• Keyboard shortcuts (Enter to send)</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Interface Variants</CardTitle>
                      <CardDescription>
                        Multiple layout options
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-caption-l">
                        <li>• Widget: Embeddable chat popup</li>
                        <li>• Panel: Sidebar chat interface</li>
                        <li>• Fullscreen: Dedicated chat view</li>
                        <li>• Minimize/maximize functionality</li>
                        <li>• Theme switching (light/dark)</li>
                        <li>• Responsive design</li>
                        <li>• Zeus color system integration</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Complete Shadcn/UI Components */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Complete Shadcn/UI Components</h2>
            <p className="text-muted-foreground mb-8">
              Production-ready shadcn/ui components with full Zeus theming integration. All components follow accessibility standards and design system patterns.
            </p>
            
            <div className="space-y-12">
              {/* Form Components */}
              <div>
                <h3 className="text-2xl font-semibold mb-6">Form Components</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Input & Label */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium">Inputs & Labels</h4>
                    <div className="space-y-3 p-4 border rounded-lg">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="Enter your email" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" placeholder="Enter your message here..." />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms">Accept terms and conditions</Label>
                      </div>
                    </div>
                  </div>

                  {/* Select */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium">Select Dropdown</h4>
                    <div className="space-y-3 p-4 border rounded-lg">
                      <div className="space-y-2">
                        <Label htmlFor="framework">Choose Framework</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a framework" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="react">React</SelectItem>
                            <SelectItem value="vue">Vue</SelectItem>
                            <SelectItem value="angular">Angular</SelectItem>
                            <SelectItem value="svelte">Svelte</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation & Dialogs */}
              <div>
                <h3 className="text-2xl font-semibold mb-6">Navigation & Dialogs</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Dropdown Menu */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium">Dropdown Menu</h4>
                    <div className="p-4 border rounded-lg">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">Open Menu</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Profile</DropdownMenuItem>
                          <DropdownMenuItem>Billing</DropdownMenuItem>
                          <DropdownMenuItem>Settings</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Dialog */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium">Dialog Modal</h4>
                    <div className="p-4 border rounded-lg">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>Open Dialog</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                              This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  {/* Alert Dialog */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium">Alert Dialog</h4>
                    <div className="p-4 border rounded-lg">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">Delete Account</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your account.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </div>

              {/* Layout Components */}
              <div>
                <h3 className="text-2xl font-semibold mb-6">Layout & Structure</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Tabs */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium">Tabs Navigation</h4>
                    <div className="p-4 border rounded-lg">
                      <Tabs defaultValue="account" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="account">Account</TabsTrigger>
                          <TabsTrigger value="password">Password</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account" className="space-y-2">
                          <p className="text-caption-l text-muted-foreground dark:text-zeus-text-secondary">Make changes to your account here. Click save when you&apos;re done.</p>
                        </TabsContent>
                        <TabsContent value="password" className="space-y-2">
                          <p className="text-caption-l text-muted-foreground dark:text-zeus-text-secondary">Change your password here. After saving, you&apos;ll be logged out.</p>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>

                  {/* Avatar & Separators */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium">Avatars & Separators</h4>
                    <div className="p-4 border rounded-lg space-y-4">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Avatar>
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <Avatar>
                          <AvatarFallback>AB</AvatarFallback>
                        </Avatar>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex h-5 items-center space-x-4 text-caption-s">
                        <div>Blog</div>
                        <Separator orientation="vertical" />
                        <div>Docs</div>
                        <Separator orientation="vertical" />
                        <div>Source</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feedback Components */}
              <div>
                <h3 className="text-2xl font-semibold mb-6">Feedback & States</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Progress */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium">Progress Indicator</h4>
                    <div className="p-4 border rounded-lg space-y-3">
                      <div className="space-y-2">
                        <div className="flex justify-between text-caption-s">
                          <span>Progress</span>
                          <span>45%</span>
                        </div>
                        <Progress value={45} />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-caption-s">
                          <span>Complete</span>
                          <span>100%</span>
                        </div>
                        <Progress value={100} />
                      </div>
                    </div>
                  </div>

                  {/* Skeleton */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium">Loading Skeleton</h4>
                    <div className="p-4 border rounded-lg space-y-3">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                  </div>

                  {/* Tooltip */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium">Tooltip</h4>
                    <div className="p-4 border rounded-lg">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline">Hover me</Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Add to library</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              </div>

              {/* Component Summary */}
              <div>
                <h3 className="text-2xl font-semibold mb-6">Implementation Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>✅ Components Added</CardTitle>
                      <CardDescription>
                        18 essential shadcn/ui components with full Zeus theming
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1 text-caption-l">
                        <li>• Form: Label, Input, Textarea, Checkbox, Select</li>
                        <li>• Navigation: DropdownMenu, Dialog, AlertDialog</li>
                        <li>• Layout: Separator, Tabs, Avatar</li>
                        <li>• Feedback: Progress, Skeleton, Tooltip</li>
                        <li>• Existing: Button, Badge, Card, Table</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>🎨 Zeus Theming Complete</CardTitle>
                      <CardDescription>
                        All components use consistent Zeus color system
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1 text-caption-l">
                        <li>• Surface colors for backgrounds</li>
                        <li>• Text colors for typography hierarchy</li>
                        <li>• Border colors for consistent outlines</li>
                        <li>• Status colors for states and feedback</li>
                        <li>• Dark mode support throughout</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Theme Demonstration */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Theme System</h2>
            <p className="text-muted-foreground mb-8">
              The Sedona UI kit fully supports light and dark themes with automatic persistence and system preference detection. 
              Use the theme toggle above to test all components in both modes.
            </p>
            
            <div className="space-y-8">
              {/* Theme Toggle Demo */}
              <div>
                <h3 className="text-2xl font-semibold mb-6">Interactive Theme Controls</h3>
                <div className="flex flex-col items-center gap-6 p-8 border rounded-lg bg-background">
                  <div className="text-center space-y-2">
                    <h4 className="text-lg font-medium">Current Theme</h4>
                    <p className="text-muted-foreground">Click the theme toggle in the header to switch between light and dark modes</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <span className="text-caption-l text-muted-foreground">
                      Theme persists across page reloads
                    </span>
                  </div>
                </div>
              </div>

              {/* Theme Showcase */}
              <div>
                <h3 className="text-2xl font-semibold mb-6">Component Theme Adaptation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  {/* Buttons Theme Test */}
                  <div className="p-4 border rounded-lg bg-background">
                    <h4 className="font-medium mb-3">Button Variants</h4>
                    <div className="space-y-2">
                      <Button className="w-full">Primary</Button>
                      <Button variant="secondary" className="w-full">Secondary</Button>
                      <Button variant="outline" className="w-full">Outline</Button>
                      <Button variant="ghost" className="w-full">Ghost</Button>
                    </div>
                  </div>

                  {/* Form Elements */}
                  <div className="p-4 border rounded-lg bg-background">
                    <h4 className="font-medium mb-3">Form Elements</h4>
                    <div className="space-y-3">
                      <Input placeholder="Theme-aware input" />
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light Theme</SelectItem>
                          <SelectItem value="dark">Dark Theme</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="theme-check" />
                        <Label htmlFor="theme-check">Theme-aware checkbox</Label>
                      </div>
                    </div>
                  </div>

                  {/* Status Badges */}
                  <div className="p-4 border rounded-lg bg-background">
                    <h4 className="font-medium mb-3">Status Badges</h4>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Badge variant="success">Success</Badge>
                        <Badge variant="warning">Warning</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="danger">Danger</Badge>
                        <Badge variant="info">Info</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="safe">Safe</Badge>
                        <Badge variant="risk">Risk</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Theme Technical Details */}
              <div>
                <h3 className="text-2xl font-semibold mb-6">Technical Implementation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Theme Variables</CardTitle>
                      <CardDescription>
                        All components use CSS custom properties for theming
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-caption-l font-mono">
                        <div className="p-2 rounded bg-muted">
                          <code>bg-background</code> → Dynamic background
                        </div>
                        <div className="p-2 rounded bg-muted">
                          <code>text-foreground</code> → Dynamic text
                        </div>
                        <div className="p-2 rounded bg-muted">
                          <code>border-border</code> → Dynamic borders
                        </div>
                        <div className="p-2 rounded bg-muted">
                          <code>zeus-*</code> → Zeus design tokens
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Theme Features</CardTitle>
                      <CardDescription>
                        Comprehensive theme system capabilities
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-caption-l">
                        <li>✅ Automatic system preference detection</li>
                        <li>✅ LocalStorage persistence</li>
                        <li>✅ No hydration mismatches</li>
                        <li>✅ Zeus + semantic color integration</li>
                        <li>✅ All components theme-aware</li>
                        <li>✅ Smooth transitions</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Usage Guidelines */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Usage Guidelines</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Typography</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Use Inter for UI text and labels</li>
                  <li>• Use monospace for financial data and addresses</li>
                  <li>• Maintain consistent line heights and letter spacing</li>
                  <li>• Follow the established type scale</li>
                </ul>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Colors</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Zeus colors provide consistent theming</li>
                  <li>• Sedona orange for brand elements</li>
                  <li>• Status colors for trading states</li>
                  <li>• Always test contrast ratios</li>
                </ul>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Buttons</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Primary for main actions</li>
                  <li>• Brand for Sedona-specific features</li>
                  <li>• Status buttons for agent states</li>
                  <li>• Use appropriate sizes for context</li>
                </ul>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Layout</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Consistent spacing using design tokens</li>
                  <li>• Responsive grid system</li>
                  <li>• Proper component composition</li>
                  <li>• Theme-aware implementations</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}