"use client"

import * as React from "react"
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
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Counter, CurrencyCounter, TimeCounter } from "@/components/ui/counter"
import { TokenInput } from "@/components/ui/token-input"
import { TokenAvatar } from "@/components/ui/token-avatar"
import { WalletCard } from "@/components/ui/wallet-card"
import { StatsGrid } from "@/components/ui/stats-grid"
import { EmptyState } from "@/components/ui/empty-state"
import { GridScan } from "@/components/ui/grid-scan"
import { ElevatedBox, QuickButton, SlippageButton } from "@/components/ui/elevated"
import { EliminationProgress } from "@/components/ui/elimination-progress"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from "@/components/ui/pagination"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import FaultyTerminal from "@/components/ui/faulty-terminal"
import { Marquee, MarqueeItem, VerticalMarquee } from "@/components/ui/marquee/marquee"
import { DataTable, DataTableHeader, DataTableBody, DataTableRow, DataTableHead, DataTableCell, DataTableEmpty, DataTableLoading } from "@/components/ui/data-table/data-table"
import { CollapsibleSection, CodeBlock, SimpleDemo, StyleguideNav, StyleguideSidebar, categories, type CategoryId } from "@/components/ui/playground"

export default function StyleguideClient() {
  const [activeCategory, setActiveCategory] = React.useState<CategoryId>("foundation")
  const [activeSection, setActiveSection] = React.useState("design-foundation")

  // Get all section IDs for the current category
  const currentCategorySections = React.useMemo(() => {
    const category = categories.find(c => c.id === activeCategory)
    return category?.sections.map(s => s.id) || []
  }, [activeCategory])

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId)
    // Find which category this section belongs to
    for (const category of categories) {
      if (category.sections.some(s => s.id === sectionId)) {
        setActiveCategory(category.id)
        break
      }
    }
    // Scroll to the section
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Navigation */}
      <StyleguideNav
        activeCategory={activeCategory}
        activeSection={activeSection}
        onCategoryChange={setActiveCategory}
        onSectionClick={handleSectionClick}
      />

      <div className="flex">
        {/* Sidebar - hidden on mobile */}
        <aside className="hidden lg:block w-60 shrink-0 border-r bg-muted/20 h-[calc(100vh-156px)] sticky top-[156px] overflow-y-auto">
          <div className="py-6 px-4">
            <StyleguideSidebar
              activeSection={activeSection}
              onSectionClick={handleSectionClick}
            />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-8 lg:px-16 py-10 max-w-5xl">
          <h1 className="sr-only">Style Guide</h1>
          <div className="space-y-6">
          {/* Design Tokens Section */}
          <CollapsibleSection id="design-foundation" title="Typography" defaultOpen>

            {/* Typography */}
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-caption-m font-semibold uppercase tracking-wider text-muted-foreground">Inter</span>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-muted/30 border border-border/50 rounded-lg hover:bg-muted/50 transition-colors">
                      <span className="text-body-m font-semibold">Body M/Semi Bold</span>
                      <code className="text-[10px] font-mono text-muted-foreground bg-background px-2 py-0.5 rounded border">18px / 26px / 600</code>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 border border-border/50 rounded-lg hover:bg-muted/50 transition-colors">
                      <span className="text-body-s font-medium">Body S/Medium</span>
                      <code className="text-[10px] font-mono text-muted-foreground bg-background px-2 py-0.5 rounded border">16px / 24px / 500</code>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 border border-border/50 rounded-lg hover:bg-muted/50 transition-colors">
                      <span className="text-caption-l font-semibold">Caption L/Semi Bold</span>
                      <code className="text-[10px] font-mono text-muted-foreground bg-background px-2 py-0.5 rounded border">14px / 20px / 600</code>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 border border-border/50 rounded-lg hover:bg-muted/50 transition-colors">
                      <span className="text-caption-m font-medium">Caption M/Medium</span>
                      <code className="text-[10px] font-mono text-muted-foreground bg-background px-2 py-0.5 rounded border">12px / 16px / 500</code>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 border border-border/50 rounded-lg hover:bg-muted/50 transition-colors">
                      <span className="text-caption-s font-semibold">Caption S/Semi Bold</span>
                      <code className="text-[10px] font-mono text-muted-foreground bg-background px-2 py-0.5 rounded border">10px / 14px / 600</code>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-caption-m font-semibold uppercase tracking-wider text-muted-foreground">Berkeley Mono</span>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-muted/30 border border-border/50 rounded-lg hover:bg-muted/50 transition-colors">
                      <span className="font-mono text-body-m">1000 SOL</span>
                      <code className="text-[10px] font-mono text-muted-foreground bg-background px-2 py-0.5 rounded border">Numeric values</code>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 border border-border/50 rounded-lg hover:bg-muted/50 transition-colors">
                      <span className="font-mono text-caption-m">0xAec78vF...123abc</span>
                      <code className="text-[10px] font-mono text-muted-foreground bg-background px-2 py-0.5 rounded border">Wallet addresses</code>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 border border-border/50 rounded-lg hover:bg-muted/50 transition-colors">
                      <span className="font-mono text-caption-s">$4,500,000</span>
                      <code className="text-[10px] font-mono text-muted-foreground bg-background px-2 py-0.5 rounded border">Financial data</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Complete Zeus Color System */}
          <CollapsibleSection id="color-system" title="Colors" defaultOpen>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                
                {/* Surface Colors */}
                <div>
                  <h4 className="text-heading-xs font-medium mb-4">Surface Colors</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 border rounded">
                      <div className="w-6 h-6 bg-zeus-surface-default rounded border"></div>
                      <div className="text-caption-s">
                        <div className="font-medium">Default</div>
                        <code className="text-muted-foreground">#141310</code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded">
                      <div className="w-6 h-6 bg-zeus-surface-elevated rounded border"></div>
                      <div className="text-caption-s">
                        <div className="font-medium">Elevated</div>
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
                  <h4 className="text-heading-xs font-medium mb-4">Accent Colors</h4>
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
                    <div className="flex items-center gap-2 p-2 border rounded">
                      <div className="w-6 h-6 bg-zeus-accent-cyan rounded border"></div>
                      <div className="text-caption-s">
                        <div className="font-medium">Cyan</div>
                        <code className="text-muted-foreground">#81d9c3</code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded">
                      <div className="w-6 h-6 bg-zeus-highlight rounded border"></div>
                      <div className="text-caption-s">
                        <div className="font-medium">Highlight</div>
                        <code className="text-muted-foreground">#f6e78a</code>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Colors */}
                <div>
                  <h4 className="text-heading-xs font-medium mb-4">Status Colors</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 border rounded">
                      <div className="w-6 h-6 bg-zeus-status-success rounded border"></div>
                      <div className="text-caption-s">
                        <div className="font-medium">Success</div>
                        <code className="text-muted-foreground">#87d68a</code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded">
                      <div className="w-6 h-6 bg-zeus-status-warning rounded border"></div>
                      <div className="text-caption-s">
                        <div className="font-medium">Warning</div>
                        <code className="text-muted-foreground">#ffa55b</code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded">
                      <div className="w-6 h-6 bg-zeus-status-destructive rounded border"></div>
                      <div className="text-caption-s">
                        <div className="font-medium">Destructive</div>
                        <code className="text-muted-foreground">#e75d57</code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded">
                      <div className="w-6 h-6 bg-zeus-status-info rounded border"></div>
                      <div className="text-caption-s">
                        <div className="font-medium">Info</div>
                        <code className="text-muted-foreground">#6b9dd0</code>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text Colors */}
                <div>
                  <h4 className="text-heading-xs font-medium mb-4">Text Colors</h4>
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
                  <h4 className="text-heading-xs font-medium mb-4">Brand Colors</h4>
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
                  <h4 className="text-heading-xs font-medium mb-4">Border & Overlay</h4>
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

              {/* Full Semantic Color Scales */}
              <div className="mt-10 pt-8 border-t">
                <h3 className="text-heading-sm font-semibold mb-2">Semantic Color Scales</h3>
                <p className="text-muted-foreground mb-6">Full 11-step color scales (50→950) for consistent UI theming. 500 is the default.</p>

                <div className="space-y-6">
                  {/* Success Scale */}
                  <div>
                    <h4 className="text-caption-l font-medium mb-2 text-muted-foreground">Success (Green)</h4>
                    <div className="flex">
                      <div className="flex-1 h-14 bg-success-50 rounded-l flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-success-900 font-mono">50</span>
                      </div>
                      <div className="flex-1 h-14 bg-success-100 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-success-900 font-mono">100</span>
                      </div>
                      <div className="flex-1 h-14 bg-success-200 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-success-900 font-mono">200</span>
                      </div>
                      <div className="flex-1 h-14 bg-success-300 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-success-900 font-mono">300</span>
                      </div>
                      <div className="flex-1 h-14 bg-success-400 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-success-900 font-mono">400</span>
                      </div>
                      <div className="flex-1 h-14 bg-success-500 flex flex-col items-center justify-end pb-1 ring-2 ring-white/50">
                        <span className="text-[9px] text-white font-mono font-bold">500</span>
                      </div>
                      <div className="flex-1 h-14 bg-success-600 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-white font-mono">600</span>
                      </div>
                      <div className="flex-1 h-14 bg-success-700 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-white font-mono">700</span>
                      </div>
                      <div className="flex-1 h-14 bg-success-800 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-white font-mono">800</span>
                      </div>
                      <div className="flex-1 h-14 bg-success-900 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-white font-mono">900</span>
                      </div>
                      <div className="flex-1 h-14 bg-success-950 rounded-r flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-white font-mono">950</span>
                      </div>
                    </div>
                  </div>

                  {/* Warning Scale */}
                  <div>
                    <h4 className="text-caption-l font-medium mb-2 text-muted-foreground">Warning (Yellow)</h4>
                    <div className="flex">
                      <div className="flex-1 h-14 bg-warning-50 rounded-l flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-warning-900 font-mono">50</span>
                      </div>
                      <div className="flex-1 h-14 bg-warning-100 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-warning-900 font-mono">100</span>
                      </div>
                      <div className="flex-1 h-14 bg-warning-200 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-warning-900 font-mono">200</span>
                      </div>
                      <div className="flex-1 h-14 bg-warning-300 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-warning-900 font-mono">300</span>
                      </div>
                      <div className="flex-1 h-14 bg-warning-400 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-warning-900 font-mono">400</span>
                      </div>
                      <div className="flex-1 h-14 bg-warning-500 flex flex-col items-center justify-end pb-1 ring-2 ring-white/50">
                        <span className="text-[9px] text-warning-900 font-mono font-bold">500</span>
                      </div>
                      <div className="flex-1 h-14 bg-warning-600 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-white font-mono">600</span>
                      </div>
                      <div className="flex-1 h-14 bg-warning-700 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-white font-mono">700</span>
                      </div>
                      <div className="flex-1 h-14 bg-warning-800 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-white font-mono">800</span>
                      </div>
                      <div className="flex-1 h-14 bg-warning-900 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-white font-mono">900</span>
                      </div>
                      <div className="flex-1 h-14 bg-warning-950 rounded-r flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-white font-mono">950</span>
                      </div>
                    </div>
                  </div>

                  {/* Error Scale */}
                  <div>
                    <h4 className="text-caption-l font-medium mb-2 text-muted-foreground">Error (Red)</h4>
                    <div className="flex">
                      <div className="flex-1 h-14 bg-error-50 rounded-l flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-error-900 font-mono">50</span>
                      </div>
                      <div className="flex-1 h-14 bg-error-100 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-error-900 font-mono">100</span>
                      </div>
                      <div className="flex-1 h-14 bg-error-200 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-error-900 font-mono">200</span>
                      </div>
                      <div className="flex-1 h-14 bg-error-300 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-error-900 font-mono">300</span>
                      </div>
                      <div className="flex-1 h-14 bg-error-400 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-error-900 font-mono">400</span>
                      </div>
                      <div className="flex-1 h-14 bg-error-500 flex flex-col items-center justify-end pb-1 ring-2 ring-white/50">
                        <span className="text-[9px] text-white font-mono font-bold">500</span>
                      </div>
                      <div className="flex-1 h-14 bg-error-600 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-white font-mono">600</span>
                      </div>
                      <div className="flex-1 h-14 bg-error-700 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-white font-mono">700</span>
                      </div>
                      <div className="flex-1 h-14 bg-error-800 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-white font-mono">800</span>
                      </div>
                      <div className="flex-1 h-14 bg-error-900 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-white font-mono">900</span>
                      </div>
                      <div className="flex-1 h-14 bg-error-950 rounded-r flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-white font-mono">950</span>
                      </div>
                    </div>
                  </div>

                  {/* Info Scale */}
                  <div>
                    <h4 className="text-caption-l font-medium mb-2 text-muted-foreground">Info (Blue)</h4>
                    <div className="flex">
                      <div className="flex-1 h-14 bg-info-50 rounded-l flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-info-900 font-mono">50</span>
                      </div>
                      <div className="flex-1 h-14 bg-info-100 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-info-900 font-mono">100</span>
                      </div>
                      <div className="flex-1 h-14 bg-info-200 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-info-900 font-mono">200</span>
                      </div>
                      <div className="flex-1 h-14 bg-info-300 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-info-900 font-mono">300</span>
                      </div>
                      <div className="flex-1 h-14 bg-info-400 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-info-900 font-mono">400</span>
                      </div>
                      <div className="flex-1 h-14 bg-info-500 flex flex-col items-center justify-end pb-1 ring-2 ring-white/50">
                        <span className="text-[9px] text-white font-mono font-bold">500</span>
                      </div>
                      <div className="flex-1 h-14 bg-info-600 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-white font-mono">600</span>
                      </div>
                      <div className="flex-1 h-14 bg-info-700 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-white font-mono">700</span>
                      </div>
                      <div className="flex-1 h-14 bg-info-800 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-white font-mono">800</span>
                      </div>
                      <div className="flex-1 h-14 bg-info-900 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-white font-mono">900</span>
                      </div>
                      <div className="flex-1 h-14 bg-info-950 rounded-r flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-white font-mono">950</span>
                      </div>
                    </div>
                  </div>

                  {/* Neutral Scale */}
                  <div>
                    <h4 className="text-caption-l font-medium mb-2 text-muted-foreground">Neutral (Dark theme surfaces)</h4>
                    <div className="flex">
                      <div className="flex-1 h-14 bg-neutral-50 rounded-l flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-white font-mono">50</span>
                      </div>
                      <div className="flex-1 h-14 bg-neutral-100 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-white font-mono">100</span>
                      </div>
                      <div className="flex-1 h-14 bg-neutral-200 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-white font-mono">200</span>
                      </div>
                      <div className="flex-1 h-14 bg-neutral-300 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-white font-mono">300</span>
                      </div>
                      <div className="flex-1 h-14 bg-neutral-400 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-white font-mono">400</span>
                      </div>
                      <div className="flex-1 h-14 bg-neutral-500 flex flex-col items-center justify-end pb-1 ring-2 ring-white/50">
                        <span className="text-[9px] text-white font-mono font-bold">500</span>
                      </div>
                      <div className="flex-1 h-14 bg-neutral-600 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-white font-mono">600</span>
                      </div>
                      <div className="flex-1 h-14 bg-neutral-700 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-white font-mono">700</span>
                      </div>
                      <div className="flex-1 h-14 bg-neutral-800 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-white font-mono">800</span>
                      </div>
                      <div className="flex-1 h-14 bg-neutral-900 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-white font-mono">900</span>
                      </div>
                      <div className="flex-1 h-14 bg-neutral-950 rounded-r flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-white font-mono">950</span>
                      </div>
                    </div>
                  </div>

                  {/* Sedona Brand Scale */}
                  <div>
                    <h4 className="text-caption-l font-medium mb-2 text-muted-foreground">Sedona (Brand Orange)</h4>
                    <div className="flex">
                      <div className="flex-1 h-14 bg-sedona-50 rounded-l flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-sedona-900 font-mono">50</span>
                      </div>
                      <div className="flex-1 h-14 bg-sedona-100 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-sedona-900 font-mono">100</span>
                      </div>
                      <div className="flex-1 h-14 bg-sedona-200 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-sedona-900 font-mono">200</span>
                      </div>
                      <div className="flex-1 h-14 bg-sedona-300 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-sedona-900 font-mono">300</span>
                      </div>
                      <div className="flex-1 h-14 bg-sedona-400 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-sedona-900 font-mono">400</span>
                      </div>
                      <div className="flex-1 h-14 bg-sedona-500 flex flex-col items-center justify-end pb-1 ring-2 ring-white/50">
                        <span className="text-[9px] text-white font-mono font-bold">500</span>
                      </div>
                      <div className="flex-1 h-14 bg-sedona-600 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-white font-mono">600</span>
                      </div>
                      <div className="flex-1 h-14 bg-sedona-700 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-white font-mono">700</span>
                      </div>
                      <div className="flex-1 h-14 bg-sedona-800 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-white font-mono">800</span>
                      </div>
                      <div className="flex-1 h-14 bg-sedona-900 flex flex-col items-center justify-end pb-1">
                        <span className="text-[9px] text-white font-mono">900</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </CollapsibleSection>

          {/* Spacing & Layout Tokens */}
          <CollapsibleSection id="spacing-tokens" title="Spacing & Layout Tokens" description="Consistent spacing and border radius values from the design system for predictable layouts.">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Spacing Scale */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Spacing Scale</h3>
                <div className="space-y-3 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-4 bg-sedona-500 rounded" />
                      <code className="text-caption-l font-mono">space-1</code>
                    </div>
                    <span className="text-caption-s text-muted-foreground">4px</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-4 bg-sedona-500 rounded" />
                      <code className="text-caption-l font-mono">space-2</code>
                    </div>
                    <span className="text-caption-s text-muted-foreground">8px</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-4 bg-sedona-500 rounded" />
                      <code className="text-caption-l font-mono">space-3</code>
                    </div>
                    <span className="text-caption-s text-muted-foreground">12px</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-sedona-500 rounded" />
                      <code className="text-caption-l font-mono">space-4</code>
                    </div>
                    <span className="text-caption-s text-muted-foreground">16px</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-4 bg-sedona-500 rounded" />
                      <code className="text-caption-l font-mono">space-6</code>
                    </div>
                    <span className="text-caption-s text-muted-foreground">24px</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-4 bg-sedona-500 rounded" />
                      <code className="text-caption-l font-mono">space-8</code>
                    </div>
                    <span className="text-caption-s text-muted-foreground">32px</span>
                  </div>
                </div>
              </div>

              {/* Border Radius */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Border Radius</h3>
                <div className="space-y-3 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-sedona-500 rounded-none" />
                      <code className="text-caption-l font-mono">rounded-none</code>
                    </div>
                    <span className="text-caption-s text-muted-foreground">0px</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-sedona-500 rounded-xs" />
                      <code className="text-caption-l font-mono">rounded-xs</code>
                    </div>
                    <span className="text-caption-s text-muted-foreground">4px</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-sedona-500 rounded-md" />
                      <code className="text-caption-l font-mono">rounded-md</code>
                    </div>
                    <span className="text-caption-s text-muted-foreground">8px</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-sedona-500 rounded-xl" />
                      <code className="text-caption-l font-mono">rounded-xl</code>
                    </div>
                    <span className="text-caption-s text-muted-foreground">10px (buttons)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-sedona-500 rounded-full" />
                      <code className="text-caption-l font-mono">rounded-full</code>
                    </div>
                    <span className="text-caption-s text-muted-foreground">999px</span>
                  </div>
                </div>
              </div>

              {/* Animation Tokens */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Animation Tokens</h3>
                <div className="space-y-3 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <code className="text-caption-l font-mono">animate-accordion-down</code>
                    <span className="text-caption-s text-muted-foreground">0.2s ease-out</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <code className="text-caption-l font-mono">animate-marquee</code>
                    <span className="text-caption-s text-muted-foreground">20s linear infinite</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <code className="text-caption-l font-mono">animate-scan-x</code>
                    <span className="text-caption-s text-muted-foreground">1.5s ease-in-out</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <code className="text-caption-l font-mono">animate-scan-y</code>
                    <span className="text-caption-s text-muted-foreground">2s ease-in-out</span>
                  </div>
                </div>
              </div>

              {/* Container */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Container</h3>
                <div className="space-y-3 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <code className="text-caption-l font-mono">container</code>
                    <span className="text-caption-s text-muted-foreground">max-width: 1400px</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <code className="text-caption-l font-mono">padding</code>
                    <span className="text-caption-s text-muted-foreground">2rem (32px)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <code className="text-caption-l font-mono">center</code>
                    <span className="text-caption-s text-muted-foreground">mx-auto</span>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Logo System */}
          <CollapsibleSection id="logo-system" title="Logo System">
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
          </CollapsibleSection>

          {/* Navigation Components */}
          <CollapsibleSection id="navigation" title="Navigation Components">
            
            <div className="space-y-8">
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Navigation Bar</h3>
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
                <h3 className="text-heading-sm font-semibold mb-4">Search Component</h3>
                <p className="text-muted-foreground mb-4">
                  Search input with proper focus states and Zeus color integration.
                </p>
                <div className="max-w-md">
                  <Search onSearch={(value) => console.log('Search:', value)} />
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Button System */}
          <CollapsibleSection
            id="buttons"
            title="Button System"
            description="Interactive button components with multiple variants, sizes, and states. Each variant has complete hover, active, focus, and disabled states."
            defaultOpen
          >
            <div className="space-y-12">
              {/* All Variants Grid */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Button Variants</h3>
                <p className="text-muted-foreground mb-4">
                  Complete button variant system with proper interaction states (hover, active, focus, disabled).
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Button className="mb-3">Primary</Button>
                    <h4 className="font-medium mb-1">Primary</h4>
                    <p className="text-caption-s text-muted-foreground">Main actions, brand color</p>
                  </div>

                  <div className="text-center p-4 border rounded-lg">
                    <Button variant="secondary" className="mb-3">Secondary</Button>
                    <h4 className="font-medium mb-1">Secondary</h4>
                    <p className="text-caption-s text-muted-foreground">Neutral surface, bordered</p>
                  </div>

                  <div className="text-center p-4 border rounded-lg">
                    <Button variant="tertiary" className="mb-3">Tertiary</Button>
                    <h4 className="font-medium mb-1">Tertiary</h4>
                    <p className="text-caption-s text-muted-foreground">Subtle transparent bg</p>
                  </div>

                  <div className="text-center p-4 border rounded-lg">
                    <Button variant="ghost" className="mb-3">Ghost</Button>
                    <h4 className="font-medium mb-1">Ghost</h4>
                    <p className="text-caption-s text-muted-foreground">No bg until hover</p>
                  </div>

                  <div className="text-center p-4 border rounded-lg">
                    <Button variant="outline" className="mb-3">Outline</Button>
                    <h4 className="font-medium mb-1">Outline</h4>
                    <p className="text-caption-s text-muted-foreground">Border only</p>
                  </div>

                  <div className="text-center p-4 border rounded-lg">
                    <Button variant="destructive" className="mb-3">Destructive</Button>
                    <h4 className="font-medium mb-1">Destructive</h4>
                    <p className="text-caption-s text-muted-foreground">Dangerous actions</p>
                  </div>

                  <div className="text-center p-4 border rounded-lg">
                    <Button variant="link" className="mb-3">Link Style</Button>
                    <h4 className="font-medium mb-1">Link</h4>
                    <p className="text-caption-s text-muted-foreground">Text link appearance</p>
                  </div>
                </div>
              </div>

              {/* Button States Demo */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Button States</h3>
                <p className="text-muted-foreground mb-4">
                  Each variant supports default, hover, active, focus, and disabled states. Interact with buttons to see state changes.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-caption-l">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 pr-4 font-medium">Variant</th>
                        <th className="text-left py-3 px-4 font-medium">Default</th>
                        <th className="text-left py-3 px-4 font-medium">Disabled</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="py-4 pr-4 text-muted-foreground">Primary</td>
                        <td className="py-4 px-4"><Button size="sm">Button</Button></td>
                        <td className="py-4 px-4"><Button size="sm" disabled>Button</Button></td>
                      </tr>
                      <tr>
                        <td className="py-4 pr-4 text-muted-foreground">Secondary</td>
                        <td className="py-4 px-4"><Button variant="secondary" size="sm">Button</Button></td>
                        <td className="py-4 px-4"><Button variant="secondary" size="sm" disabled>Button</Button></td>
                      </tr>
                      <tr>
                        <td className="py-4 pr-4 text-muted-foreground">Tertiary</td>
                        <td className="py-4 px-4"><Button variant="tertiary" size="sm">Button</Button></td>
                        <td className="py-4 px-4"><Button variant="tertiary" size="sm" disabled>Button</Button></td>
                      </tr>
                      <tr>
                        <td className="py-4 pr-4 text-muted-foreground">Ghost</td>
                        <td className="py-4 px-4"><Button variant="ghost" size="sm">Button</Button></td>
                        <td className="py-4 px-4"><Button variant="ghost" size="sm" disabled>Button</Button></td>
                      </tr>
                      <tr>
                        <td className="py-4 pr-4 text-muted-foreground">Outline</td>
                        <td className="py-4 px-4"><Button variant="outline" size="sm">Button</Button></td>
                        <td className="py-4 px-4"><Button variant="outline" size="sm" disabled>Button</Button></td>
                      </tr>
                      <tr>
                        <td className="py-4 pr-4 text-muted-foreground">Destructive</td>
                        <td className="py-4 px-4"><Button variant="destructive" size="sm">Button</Button></td>
                        <td className="py-4 px-4"><Button variant="destructive" size="sm" disabled>Button</Button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Status Buttons */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Status Buttons</h3>
                <p className="text-muted-foreground mb-4">
                  Status buttons for agent trading states with semantic colors.
                </p>
                <div className="flex gap-4 flex-wrap items-center">
                  <Button variant="safe">SAFE</Button>
                  <Button variant="close">CLOSE</Button>
                  <Button variant="risk">AT RISK</Button>
                  <span className="text-caption-m text-muted-foreground ml-4">
                    Uses success, warning, and error color scales
                  </span>
                </div>
              </div>

              {/* Button Sizes */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Button Sizes</h3>
                <div className="flex gap-4 items-center flex-wrap">
                  <Button size="xs">Extra Small</Button>
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
                <p className="text-caption-m text-muted-foreground mt-3">
                  xs: 24px • sm: 32px • default: 40px • lg: 48px
                </p>
              </div>

              {/* Icon Buttons */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Icon Buttons</h3>
                <div className="flex gap-4 items-center flex-wrap">
                  <Button icon={<span>→</span>}>With Icon Right</Button>
                  <Button icon={<span>←</span>} iconPosition="left">With Icon Left</Button>
                  <Button iconOnly icon={<span>+</span>} variant="brand" />
                  <Button iconOnly icon={<span>×</span>} variant="outline" />
                  <Button iconOnly icon={<span>⚙</span>} variant="ghost" />
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Form Components */}
          <CollapsibleSection
            id="form-components"
            title="Form Components"
            description="Input fields, selects, checkboxes, and other form elements with full theme integration."
          >
            <div className="space-y-10">
              {/* Text Inputs */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Text Inputs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="default-input">Default Input</Label>
                    <Input id="default-input" placeholder="Enter text..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="disabled-input">Disabled Input</Label>
                    <Input id="disabled-input" placeholder="Disabled..." disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="with-value">With Value</Label>
                    <Input id="with-value" defaultValue="Hello world" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-input">Password</Label>
                    <Input id="password-input" type="password" placeholder="Password..." />
                  </div>
                </div>
              </div>

              {/* Textarea */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Textarea</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="default-textarea">Default Textarea</Label>
                    <Textarea id="default-textarea" placeholder="Enter longer text..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="disabled-textarea">Disabled Textarea</Label>
                    <Textarea id="disabled-textarea" placeholder="Disabled..." disabled />
                  </div>
                </div>
              </div>

              {/* Select */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Select</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Default Select</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                        <SelectItem value="option3">Option 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Disabled Select</Label>
                    <Select disabled>
                      <SelectTrigger>
                        <SelectValue placeholder="Disabled..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Option 1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Checkbox */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Checkbox</h3>
                <div className="flex flex-wrap gap-8">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="check1" />
                    <Label htmlFor="check1">Unchecked</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="check2" defaultChecked />
                    <Label htmlFor="check2">Checked</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="check3" disabled />
                    <Label htmlFor="check3" className="text-muted-foreground">Disabled</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="check4" defaultChecked disabled />
                    <Label htmlFor="check4" className="text-muted-foreground">Checked Disabled</Label>
                  </div>
                </div>
              </div>

              {/* Toggle */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Toggle</h3>
                <div className="flex flex-wrap gap-4">
                  <Toggle>Default</Toggle>
                  <Toggle defaultPressed>Pressed</Toggle>
                  <Toggle variant="outline">Outline</Toggle>
                  <Toggle disabled>Disabled</Toggle>
                </div>
              </div>

              {/* Toggle Group */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Toggle Group</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-caption-l text-muted-foreground mb-2">Single selection</p>
                    <ToggleGroup type="single" defaultValue="center">
                      <ToggleGroupItem value="left">Left</ToggleGroupItem>
                      <ToggleGroupItem value="center">Center</ToggleGroupItem>
                      <ToggleGroupItem value="right">Right</ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                  <div>
                    <p className="text-caption-l text-muted-foreground mb-2">Multiple selection</p>
                    <ToggleGroup type="multiple" defaultValue={["bold"]}>
                      <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
                      <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
                      <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Badge System */}
          <CollapsibleSection
            id="badges"
            title="Badge System"
            description="Badge components for status indicators, labels, and categorization using Zeus theme variables."
          >
            <div className="space-y-8">
              {/* Core Badge Variants - Exact Figma Designs */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Core Badge Variants</h3>
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
                <h3 className="text-heading-sm font-semibold mb-4">Badge Groups</h3>
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
                <h3 className="text-heading-sm font-semibold mb-4">Status Badges</h3>
                <p className="text-muted-foreground mb-4">
                  Status badges matching Figma design for trading indicators.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <Badge variant="safe">SAFE</Badge>
                  <Badge variant="close">CLOSE</Badge>
                  <Badge variant="risk">AT RISK</Badge>
                  <Badge variant="secondary">NEUTRAL</Badge>
                  <Badge variant="brand">ACCENT</Badge>
                  <Badge variant="destructive">DESTRUCTIVE</Badge>
                  <Badge variant="outline">OUTLINE</Badge>
                </div>
              </div>

              {/* Badge Sizes */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Badge Sizes</h3>
                <div className="flex gap-4 items-center flex-wrap">
                  <Badge size="sm">Small</Badge>
                  <Badge size="default">Default</Badge>
                  <Badge size="lg">Large</Badge>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Input System */}
          <CollapsibleSection
            id="inputs"
            title="Input System"
            description="Form input components with theme-aware styling and proper focus states."
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Input Types</h3>
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
                <h3 className="text-heading-sm font-semibold mb-4">Input States</h3>
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
          </CollapsibleSection>

          {/* Card System */}
          <CollapsibleSection
            id="cards"
            title="Card System"
            description="Flexible card components for content organization using theme variables."
          >
            
            <div className="space-y-8">
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Card Components</h3>
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
                          <span className="font-mono text-caption-l text-zeus-status-success">+5.2%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Card Composition</h3>
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
          </CollapsibleSection>

          {/* Table System */}
          <CollapsibleSection
            id="tables"
            title="Table System"
            description="Flexible table rows with dot matrix visualization, exactly matching Figma designs."
          >
            
            <div className="space-y-8">
              {/* Table Rows */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Table Rows</h3>
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
                <h3 className="text-heading-sm font-semibold mb-4">Dot Matrix Grid</h3>
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
                <h3 className="text-heading-sm font-semibold mb-4">Component Features</h3>
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
          </CollapsibleSection>

          {/* Feedback Components */}
          <CollapsibleSection
            id="feedback-components"
            title="Feedback Components"
            description="Dialogs, tooltips, progress indicators, and other feedback UI elements."
          >
            <div className="space-y-10">
              {/* Dialog */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Dialog</h3>
                <p className="text-muted-foreground mb-4">Modal dialogs for focused interactions.</p>
                <div className="flex gap-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Open Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Dialog Title</DialogTitle>
                        <DialogDescription>
                          This is a dialog description. It provides context for the dialog content.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <p className="text-caption-l text-muted-foreground">Dialog content goes here.</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Alert Dialog */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Alert Dialog</h3>
                <p className="text-muted-foreground mb-4">Confirmation dialogs for destructive actions.</p>
                <div className="flex gap-4">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Delete Item</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the item.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>

              {/* Tooltip */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Tooltip</h3>
                <p className="text-muted-foreground mb-4">Contextual information on hover.</p>
                <div className="flex gap-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline">Hover me</Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>This is a tooltip</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="secondary">With delay</Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>Tooltip on bottom</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              {/* Progress */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Progress</h3>
                <p className="text-muted-foreground mb-4">Progress indicators for loading states.</p>
                <div className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <div className="flex justify-between text-caption-l">
                      <span>25%</span>
                    </div>
                    <Progress value={25} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-caption-l">
                      <span>50%</span>
                    </div>
                    <Progress value={50} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-caption-l">
                      <span>75%</span>
                    </div>
                    <Progress value={75} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-caption-l">
                      <span>100%</span>
                    </div>
                    <Progress value={100} />
                  </div>
                </div>
              </div>

              {/* Skeleton */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Skeleton</h3>
                <p className="text-muted-foreground mb-4">Placeholder loading states.</p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                  <Skeleton className="h-[125px] w-full rounded-xl" />
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Layout Components */}
          <CollapsibleSection
            id="layout-components"
            title="Layout Components"
            description="Tabs, separators, avatars and other layout primitives."
          >
            <div className="space-y-10">
              {/* Tabs */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Tabs</h3>
                <p className="text-muted-foreground mb-4">Tabbed navigation for organizing content.</p>
                <Tabs defaultValue="account" className="w-full max-w-md">
                  <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  <TabsContent value="account" className="p-4 border rounded-b-lg">
                    <p className="text-caption-l text-muted-foreground">Account settings and preferences.</p>
                  </TabsContent>
                  <TabsContent value="password" className="p-4 border rounded-b-lg">
                    <p className="text-caption-l text-muted-foreground">Change your password here.</p>
                  </TabsContent>
                  <TabsContent value="settings" className="p-4 border rounded-b-lg">
                    <p className="text-caption-l text-muted-foreground">General application settings.</p>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Separator */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Separator</h3>
                <p className="text-muted-foreground mb-4">Visual dividers for content sections.</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-caption-l">Content above separator</p>
                    <Separator className="my-4" />
                    <p className="text-caption-l">Content below separator</p>
                  </div>
                  <div className="flex h-5 items-center space-x-4 text-caption-l">
                    <span>Item 1</span>
                    <Separator orientation="vertical" />
                    <span>Item 2</span>
                    <Separator orientation="vertical" />
                    <span>Item 3</span>
                  </div>
                </div>
              </div>

              {/* Avatar */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Avatar</h3>
                <p className="text-muted-foreground mb-4">User profile images with fallbacks.</p>
                <div className="flex gap-4 items-center">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-14 w-14">
                    <AvatarFallback className="text-heading-xs">LG</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-caption-s">SM</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              {/* Dropdown Menu */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Dropdown Menu</h3>
                <p className="text-muted-foreground mb-4">Contextual menus triggered by buttons.</p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Open Menu</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-error-500">Log out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Popover */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Popover</h3>
                <p className="text-muted-foreground mb-4">Floating content panels triggered on click.</p>
                <div className="flex gap-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Open Popover</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Dimensions</h4>
                          <p className="text-caption-l text-muted-foreground">
                            Set the dimensions for the layer.
                          </p>
                        </div>
                        <div className="grid gap-2">
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="width">Width</Label>
                            <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
                          </div>
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="height">Height</Label>
                            <Input id="height" defaultValue="auto" className="col-span-2 h-8" />
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Pagination */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Pagination</h3>
                <p className="text-muted-foreground mb-4">Navigation for paginated content with previous/next and page links.</p>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">10</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </CollapsibleSection>

          {/* Domain Components */}
          <CollapsibleSection
            id="domain-components"
            title="Domain Components"
            description="Specialized components for crypto/trading interfaces: token inputs, wallets, stats, and visual effects."
          >
            <div className="space-y-10">
              {/* Token Avatar */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Token Avatar</h3>
                <p className="text-muted-foreground mb-4">Circular token identifiers with fallback to first letter.</p>
                <div className="flex gap-4 items-center">
                  <TokenAvatar ticker="SOL" size="sm" />
                  <TokenAvatar ticker="ETH" size="md" />
                  <TokenAvatar ticker="BTC" size="lg" />
                  <TokenAvatar ticker="USDC" size="md" />
                </div>
                <p className="text-caption-m text-muted-foreground mt-3">
                  Sizes: sm (24px) • md (32px) • lg (44px)
                </p>
              </div>

              {/* Token Input */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Token Input</h3>
                <p className="text-muted-foreground mb-4">Amount input with token selector and balance display.</p>
                <div className="max-w-sm">
                  <TokenInput
                    value=""
                    onChange={() => {}}
                    token="SOL"
                    balance="125.50"
                    label="You Pay"
                    placeholder="0.00"
                    onTokenSelect={() => {}}
                  />
                </div>
              </div>

              {/* Wallet Card */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Wallet Card</h3>
                <p className="text-muted-foreground mb-4">Connected wallet display with address copy and disconnect.</p>
                <WalletCard
                  address="J181...U7Wi"
                  fullAddress="J181cDkLptwTqPyiVKUAJHCd3dFDU7Wi"
                  balance="125.50 SOL"
                  balanceUsd="$18,825.00"
                  onDisconnect={() => {}}
                />
              </div>

              {/* Stats Grid */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Stats Grid</h3>
                <p className="text-muted-foreground mb-4">Compact grid of labeled statistics with optional change indicators.</p>
                <div className="max-w-md">
                  <StatsGrid
                    columns={4}
                    items={[
                      { label: "PRICE", value: "$0.0234" },
                      { label: "24H VOL", value: "$1.2M" },
                      { label: "MCAP", value: "$45M" },
                      { label: "24H", value: "", change: 12.5 },
                    ]}
                  />
                </div>
                <div className="max-w-md mt-4">
                  <StatsGrid
                    columns={3}
                    size="sm"
                    items={[
                      { label: "TVL", value: "$2.1B" },
                      { label: "APY", value: "8.2%" },
                      { label: "CHANGE", value: "", change: -3.2 },
                    ]}
                  />
                </div>
              </div>

              {/* Elimination Progress */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Elimination Progress</h3>
                <p className="text-muted-foreground mb-4">
                  Status indicator showing rank position and elimination risk. Supports default card and inline arc gauge variants.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Default variant */}
                  <div className="space-y-3">
                    <span className="text-caption-m text-muted-foreground">Default Variant</span>
                    <EliminationProgress
                      rank={12}
                      totalAgents={47}
                      marketCap="$45.2K"
                      eliminationThreshold="$5K"
                    />
                    <EliminationProgress
                      rank={35}
                      totalAgents={47}
                      marketCap="$8.5K"
                      eliminationThreshold="$5K"
                    />
                    <EliminationProgress
                      rank={44}
                      totalAgents={47}
                      marketCap="$3.2K"
                      eliminationThreshold="$5K"
                    />
                  </div>
                  {/* Inline variant */}
                  <div className="space-y-3">
                    <span className="text-caption-m text-muted-foreground">Inline Variant (Arc Gauge)</span>
                    <div className="flex flex-col gap-3">
                      <EliminationProgress
                        variant="inline"
                        rank={5}
                        totalAgents={47}
                        marketCap="$125K"
                        eliminationThreshold="$5K"
                      />
                      <EliminationProgress
                        variant="inline"
                        rank={30}
                        totalAgents={47}
                        marketCap="$9K"
                        eliminationThreshold="$5K"
                      />
                      <EliminationProgress
                        variant="inline"
                        rank={45}
                        totalAgents={47}
                        marketCap="$4K"
                        eliminationThreshold="$5K"
                      />
                    </div>
                  </div>
                </div>
                <p className="text-caption-m text-muted-foreground mt-4">
                  Status: SAFE (top 60% + above threshold) • CLOSE (60-80% or near threshold) • AT RISK (bottom 20% or below threshold)
                </p>
              </div>

              {/* Empty State */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Empty State</h3>
                <p className="text-muted-foreground mb-4">Placeholder for empty content areas with optional actions.</p>
                <div className="border rounded-lg">
                  <EmptyState
                    icon="📭"
                    title="No transactions yet"
                    description="Your recent transactions will appear here once you start trading."
                    action={{
                      label: "Start Trading",
                      onClick: () => {},
                      variant: "default"
                    }}
                  />
                </div>
              </div>

              {/* Elevated Components */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Elevated Surfaces</h3>
                <p className="text-muted-foreground mb-4">Elevated container boxes and quick action buttons.</p>
                <div className="space-y-4">
                  <div className="flex gap-4 items-center">
                    <ElevatedBox className="p-4">
                      Default elevated box
                    </ElevatedBox>
                    <ElevatedBox rounded="lg" className="p-4">
                      Rounded large
                    </ElevatedBox>
                  </div>
                  <div className="flex gap-2 items-center">
                    <QuickButton size="xs">25%</QuickButton>
                    <QuickButton size="sm">50%</QuickButton>
                    <QuickButton size="md">75%</QuickButton>
                    <QuickButton size="md">MAX</QuickButton>
                    <SlippageButton slippage="0.5%" />
                  </div>
                </div>
              </div>

              {/* Grid Scan Effect */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Grid Scan Effect</h3>
                <p className="text-muted-foreground mb-4">Animated scanning grid overlay for visual effects.</p>
                <div className="relative h-48 bg-zeus-surface-default rounded-lg overflow-hidden">
                  <GridScan color="#de7001" gridSize={8} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-zeus-text-tertiary text-caption-l">Scanning...</span>
                  </div>
                </div>
              </div>

              {/* Faulty Terminal Effect */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Faulty Terminal</h3>
                <p className="text-muted-foreground mb-4">
                  WebGL-powered terminal effect with scanlines, glitches, and mouse interaction. GPU-accelerated for smooth performance.
                </p>
                <div className="grid gap-4">
                  <div className="rounded-lg overflow-hidden h-64 border border-zeus-border-normal bg-black">
                    <FaultyTerminal
                      tint="#de7001"
                      curvature={0.15}
                      scanlineIntensity={0.3}
                      brightness={0.8}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg overflow-hidden h-32 border border-zeus-border-normal bg-black">
                      <FaultyTerminal
                        tint="#87d68a"
                        curvature={0}
                        glitchAmount={2}
                        brightness={0.6}
                      />
                    </div>
                    <div className="rounded-lg overflow-hidden h-32 border border-zeus-border-normal bg-black">
                      <FaultyTerminal
                        tint="#6b9dd0"
                        curvature={0.3}
                        chromaticAberration={5}
                        brightness={0.7}
                      />
                    </div>
                  </div>
                </div>
                <p className="text-caption-m text-muted-foreground mt-3">
                  Props: tint • curvature • scanlineIntensity • glitchAmount • chromaticAberration • brightness • mouseReact
                </p>
              </div>
            </div>
          </CollapsibleSection>

          {/* Data Table System */}
          <CollapsibleSection id="data-tables" title="Data Table System" description="Composable table primitives for building complex data displays with sorting, loading states, and empty states.">

            <div className="space-y-8">
              {/* Basic Data Table */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Composable Table</h3>
                <p className="text-muted-foreground mb-4">
                  Build custom tables with flexible primitives: DataTable, DataTableHeader, DataTableBody, DataTableRow, DataTableCell.
                </p>
                <div className="border rounded-lg overflow-hidden bg-card dark:bg-zeus-surface-default">
                  <DataTable>
                    <DataTableHeader>
                      <DataTableRow interactive={false}>
                        <DataTableHead width={60}>Rank</DataTableHead>
                        <DataTableHead>Agent</DataTableHead>
                        <DataTableHead width={100} align="right">Price</DataTableHead>
                        <DataTableHead width={120} align="right">Market Cap</DataTableHead>
                        <DataTableHead width={80} align="center">Status</DataTableHead>
                      </DataTableRow>
                    </DataTableHeader>
                    <DataTableBody>
                      <DataTableRow>
                        <DataTableCell width={60}>
                          <span className="font-mono text-zeus-text-tertiary">#1</span>
                        </DataTableCell>
                        <DataTableCell>
                          <div>
                            <div className="font-medium">Shopping Buddy</div>
                            <div className="text-caption-s text-muted-foreground font-mono">$SHOP</div>
                          </div>
                        </DataTableCell>
                        <DataTableCell width={100} align="right">
                          <span className="font-mono text-zeus-status-success">+4.7%</span>
                        </DataTableCell>
                        <DataTableCell width={120} align="right">
                          <span className="font-mono">$4.5M</span>
                        </DataTableCell>
                        <DataTableCell width={80} align="center">
                          <Badge variant="safe" size="sm">SAFE</Badge>
                        </DataTableCell>
                      </DataTableRow>
                      <DataTableRow>
                        <DataTableCell width={60}>
                          <span className="font-mono text-zeus-text-tertiary">#2</span>
                        </DataTableCell>
                        <DataTableCell>
                          <div>
                            <div className="font-medium">Trading Cat</div>
                            <div className="text-caption-s text-muted-foreground font-mono">$TCAT</div>
                          </div>
                        </DataTableCell>
                        <DataTableCell width={100} align="right">
                          <span className="font-mono text-zeus-status-destructive">-2.1%</span>
                        </DataTableCell>
                        <DataTableCell width={120} align="right">
                          <span className="font-mono">$2.1M</span>
                        </DataTableCell>
                        <DataTableCell width={80} align="center">
                          <Badge variant="risk" size="sm">RISK</Badge>
                        </DataTableCell>
                      </DataTableRow>
                    </DataTableBody>
                  </DataTable>
                </div>
              </div>

              {/* Loading State */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Loading State</h3>
                <p className="text-muted-foreground mb-4">
                  Built-in skeleton loading for tables.
                </p>
                <div className="border rounded-lg overflow-hidden bg-card dark:bg-zeus-surface-default max-w-xl">
                  <DataTableLoading rows={3} />
                </div>
              </div>

              {/* Empty State */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Empty State</h3>
                <p className="text-muted-foreground mb-4">
                  Customizable empty state with icon, title, and description.
                </p>
                <div className="border rounded-lg overflow-hidden bg-card dark:bg-zeus-surface-default max-w-xl">
                  <DataTableEmpty
                    icon={<span className="text-heading-md">📊</span>}
                    title="No agents found"
                    description="Try adjusting your search or filters to find what you're looking for."
                  />
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Counter System */}
          <CollapsibleSection id="counter" title="Counter System" description="Animated number counter with spring physics. Perfect for displaying dynamic financial data, statistics, and metrics.">

            <div className="space-y-8">
              {/* Basic Counter */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Basic Counter</h3>
                <p className="text-muted-foreground mb-4">
                  Smoothly animates between number values with spring physics.
                </p>
                <div className="flex gap-8 items-center flex-wrap p-6 border rounded-lg bg-card dark:bg-zeus-surface-default">
                  <div className="text-center">
                    <div className="font-mono text-heading-md mb-2">
                      <Counter value={1234567} fontSize={28} fontWeight={600} />
                    </div>
                    <p className="text-caption-s text-muted-foreground">Large number</p>
                  </div>
                  <div className="text-center">
                    <div className="font-mono text-heading-md mb-2">
                      <Counter value={99.99} fontSize={28} fontWeight={600} />
                    </div>
                    <p className="text-caption-s text-muted-foreground">Decimal</p>
                  </div>
                  <div className="text-center">
                    <div className="font-mono text-heading-md mb-2">
                      <Counter value={42} fontSize={28} fontWeight={600} prefix="+" suffix="%" />
                    </div>
                    <p className="text-caption-s text-muted-foreground">With prefix/suffix</p>
                  </div>
                </div>
              </div>

              {/* Currency Counter */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Currency Counter</h3>
                <p className="text-muted-foreground mb-4">
                  Specialized variant for displaying monetary values.
                </p>
                <div className="flex gap-8 items-center flex-wrap p-6 border rounded-lg bg-card dark:bg-zeus-surface-default">
                  <div className="text-center">
                    <div className="mb-2">
                      <CurrencyCounter value={4500000} fontSize={24} />
                    </div>
                    <p className="text-caption-s text-muted-foreground">USD</p>
                  </div>
                  <div className="text-center">
                    <div className="mb-2">
                      <CurrencyCounter value={1250} fontSize={24} currency="SOL " />
                    </div>
                    <p className="text-caption-s text-muted-foreground">SOL</p>
                  </div>
                </div>
              </div>

              {/* Time Counter */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Time Counter</h3>
                <p className="text-muted-foreground mb-4">
                  Countdown/timer variant with minutes and seconds.
                </p>
                <div className="flex gap-8 items-center flex-wrap p-6 border rounded-lg bg-card dark:bg-zeus-surface-default">
                  <div className="text-center">
                    <div className="mb-2">
                      <TimeCounter seconds={125} fontSize={24} />
                    </div>
                    <p className="text-caption-s text-muted-foreground">2m 5s</p>
                  </div>
                  <div className="text-center">
                    <div className="mb-2">
                      <TimeCounter seconds={3600} fontSize={24} />
                    </div>
                    <p className="text-caption-s text-muted-foreground">60m 0s</p>
                  </div>
                </div>
              </div>

              {/* Component API */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Component API</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Counter Props</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1 text-caption-l font-mono">
                        <li><code>value</code> - number to display</li>
                        <li><code>fontSize</code> - text size (default: 16)</li>
                        <li><code>prefix</code> - text before number</li>
                        <li><code>suffix</code> - text after number</li>
                        <li><code>fontWeight</code> - CSS font weight</li>
                        <li><code>textColor</code> - text color</li>
                        <li><code>showGradient</code> - fade edges</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Variants</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1 text-caption-l">
                        <li>• <code className="font-mono">Counter</code> - Base component</li>
                        <li>• <code className="font-mono">CurrencyCounter</code> - Money display</li>
                        <li>• <code className="font-mono">TimeCounter</code> - Timer display</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Marquee System */}
          <CollapsibleSection id="marquee" title="Marquee System" description="GPU-accelerated infinite scroll component for tickers, announcements, and scrolling content.">

            <div className="space-y-8">
              {/* Horizontal Marquee */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Horizontal Marquee</h3>
                <p className="text-muted-foreground mb-4">
                  Smooth infinite horizontal scroll with fade edges and pause on hover.
                </p>
                <div className="border rounded-lg overflow-hidden bg-zeus-surface-default py-4">
                  <Marquee speed={60} gap={32} pauseOnHover fadeColor="rgb(20, 19, 16)">
                    <MarqueeItem className="flex items-center gap-2">
                      <Badge variant="success">$SHOP</Badge>
                      <span className="font-mono text-white">+4.7%</span>
                    </MarqueeItem>
                    <MarqueeItem className="flex items-center gap-2">
                      <Badge variant="danger">$TCAT</Badge>
                      <span className="font-mono text-white">-2.1%</span>
                    </MarqueeItem>
                    <MarqueeItem className="flex items-center gap-2">
                      <Badge variant="info">$WEALTH</Badge>
                      <span className="font-mono text-white">+1.2%</span>
                    </MarqueeItem>
                    <MarqueeItem className="flex items-center gap-2">
                      <Badge variant="warning">$TRADE</Badge>
                      <span className="font-mono text-white">+0.5%</span>
                    </MarqueeItem>
                    <MarqueeItem className="flex items-center gap-2">
                      <Badge variant="safe">$AI</Badge>
                      <span className="font-mono text-white">+8.3%</span>
                    </MarqueeItem>
                  </Marquee>
                </div>
              </div>

              {/* Vertical Marquee */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Vertical Marquee</h3>
                <p className="text-muted-foreground mb-4">
                  Vertical scrolling variant for news feeds, activity logs, and notifications.
                </p>
                <div className="border rounded-lg overflow-hidden bg-zeus-surface-default p-4 h-48">
                  <VerticalMarquee speed={30} gap={12} pauseOnHover fadeColor="rgb(20, 19, 16)">
                    <div className="text-caption-l text-white/80">🔥 Shopping Buddy reached $4.5M market cap</div>
                    <div className="text-caption-l text-white/80">📈 Trading Cat up 15% in the last hour</div>
                    <div className="text-caption-l text-white/80">🎯 New agent Wealth Manager launched</div>
                    <div className="text-caption-l text-white/80">⚡ Platform volume hit $200k today</div>
                    <div className="text-caption-l text-white/80">🏆 Weekly competition starting in 2 days</div>
                  </VerticalMarquee>
                </div>
              </div>

              {/* Marquee Props */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Marquee Props</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1 text-caption-l font-mono">
                        <li><code>speed</code> - pixels per second (default: 50)</li>
                        <li><code>direction</code> - &quot;left&quot; | &quot;right&quot;</li>
                        <li><code>pauseOnHover</code> - pause on mouse hover</li>
                        <li><code>gap</code> - space between items</li>
                        <li><code>fade</code> - show edge gradients</li>
                        <li><code>fadeColor</code> - gradient color</li>
                        <li><code>paused</code> - start paused</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Components</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1 text-caption-l">
                        <li>• <code className="font-mono">Marquee</code> - Horizontal scroll</li>
                        <li>• <code className="font-mono">VerticalMarquee</code> - Vertical scroll</li>
                        <li>• <code className="font-mono">MarqueeItem</code> - Item wrapper</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Outline Card System */}
          <CollapsibleSection id="outline-cards" title="Outline Card System" description="Complex content cards with market performance data, dot matrix visualizations, and structured information sections.">
            
            <div className="space-y-8">
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Market Performance Card</h3>
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
                <h3 className="text-heading-sm font-semibold mb-4">Simple Information Card</h3>
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
          </CollapsibleSection>

          {/* Chat System */}
          <CollapsibleSection id="chat" title="Chat System" description="Comprehensive chat interface components for AI agent interactions with multiple variants and full theme integration.">
            
            <div className="space-y-8">
              {/* Complete Chat Interface */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Complete Chat Interface (Dark Theme)</h3>
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
                    autoScroll={false}
                  />
                </div>
              </div>

              {/* Individual Components */}
              <div>
                <h3 className="text-heading-sm font-semibold mb-4">Individual Components</h3>
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
                  <div className="p-4 border rounded-lg bg-card dark:bg-zeus-surface-elevated">
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
                  <div className="p-4 border rounded-lg bg-card dark:bg-zeus-surface-elevated">
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
                <h3 className="text-heading-sm font-semibold mb-4">Chat System Features</h3>
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
          </CollapsibleSection>

          {/* Complete Shadcn/UI Components */}
          <CollapsibleSection id="shadcn-components" title="Shadcn/UI Components" description="Production-ready shadcn/ui components with full Zeus theming integration.">
            
            <div className="space-y-12">
              {/* Form Components */}
              <div>
                <h3 className="text-heading-md font-semibold mb-6">Form Components</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Input & Label */}
                  <div className="space-y-4">
                    <h4 className="text-heading-xs font-medium">Inputs & Labels</h4>
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
                    <h4 className="text-heading-xs font-medium">Select Dropdown</h4>
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
                <h3 className="text-heading-md font-semibold mb-6">Navigation & Dialogs</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Dropdown Menu */}
                  <div className="space-y-4">
                    <h4 className="text-heading-xs font-medium">Dropdown Menu</h4>
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
                    <h4 className="text-heading-xs font-medium">Dialog Modal</h4>
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
                    <h4 className="text-heading-xs font-medium">Alert Dialog</h4>
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
                <h3 className="text-heading-md font-semibold mb-6">Layout & Structure</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Tabs */}
                  <div className="space-y-4">
                    <h4 className="text-heading-xs font-medium">Tabs Navigation</h4>
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
                    <h4 className="text-heading-xs font-medium">Avatars & Separators</h4>
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
                <h3 className="text-heading-md font-semibold mb-6">Feedback & States</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Progress */}
                  <div className="space-y-4">
                    <h4 className="text-heading-xs font-medium">Progress Indicator</h4>
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
                    <h4 className="text-heading-xs font-medium">Loading Skeleton</h4>
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
                    <h4 className="text-heading-xs font-medium">Tooltip</h4>
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
                <h3 className="text-heading-md font-semibold mb-6">Implementation Summary</h3>
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
          </CollapsibleSection>

          {/* Theme Demonstration */}
          <CollapsibleSection id="theme-system" title="Theme System" description="Full light/dark theme support with automatic persistence and system preference detection.">
            
            <div className="space-y-8">
              {/* Theme Toggle Demo */}
              <div>
                <h3 className="text-heading-md font-semibold mb-6">Interactive Theme Controls</h3>
                <div className="flex flex-col items-center gap-6 p-8 border rounded-lg bg-background">
                  <div className="text-center space-y-2">
                    <h4 className="text-heading-xs font-medium">Current Theme</h4>
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
                <h3 className="text-heading-md font-semibold mb-6">Component Theme Adaptation</h3>
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
                <h3 className="text-heading-md font-semibold mb-6">Technical Implementation</h3>
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
          </CollapsibleSection>

          {/* Usage Guidelines */}
          <CollapsibleSection id="usage-guidelines" title="Usage Guidelines">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 border rounded-lg">
                <h3 className="text-heading-xs font-semibold mb-4">Typography</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Use Inter for UI text and labels</li>
                  <li>• Use monospace for financial data and addresses</li>
                  <li>• Maintain consistent line heights and letter spacing</li>
                  <li>• Follow the established type scale</li>
                </ul>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-heading-xs font-semibold mb-4">Colors</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Zeus colors provide consistent theming</li>
                  <li>• Sedona orange for brand elements</li>
                  <li>• Status colors for trading states</li>
                  <li>• Always test contrast ratios</li>
                </ul>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-heading-xs font-semibold mb-4">Buttons</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Primary for main actions</li>
                  <li>• Brand for Sedona-specific features</li>
                  <li>• Status buttons for agent states</li>
                  <li>• Use appropriate sizes for context</li>
                </ul>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-heading-xs font-semibold mb-4">Layout</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Consistent spacing using design tokens</li>
                  <li>• Responsive grid system</li>
                  <li>• Proper component composition</li>
                  <li>• Theme-aware implementations</li>
                </ul>
              </div>
            </div>
          </CollapsibleSection>
        </div>
        </main>
      </div>
    </div>
  )
}