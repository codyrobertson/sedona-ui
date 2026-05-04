# Sedona UI Component Library

> Legacy reference: this page documents the older `src/components/ui` and
> trading component library. The active AeroDash design-system contract is
> `docs/AERODASH_DESIGN_SYSTEM.md`, with public exports from
> `src/components/aerodash/index.ts`.

Comprehensive API documentation for the Sedona UI component library. This library provides a complete set of UI components for building trading and DeFi interfaces.

## Table of Contents

- [Core UI Components](#core-ui-components)
  - [Button](#button)
  - [Badge](#badge)
  - [Card](#card)
  - [Input](#input)
  - [Textarea](#textarea)
  - [Select](#select)
  - [Checkbox](#checkbox)
  - [Switch](#switch)
  - [Label](#label)
  - [Avatar](#avatar)
  - [Progress](#progress)
  - [Skeleton](#skeleton)
- [Overlay Components](#overlay-components)
  - [Dialog](#dialog)
  - [AlertDialog](#alertdialog)
  - [Popover](#popover)
  - [Tooltip](#tooltip)
  - [DropdownMenu](#dropdownmenu)
- [Navigation Components](#navigation-components)
  - [Tabs](#tabs)
  - [Navigation](#navigation)
  - [Header](#header)
- [Trading Components](#trading-components)
  - [PriceChart](#pricechart)
  - [SwapWidget](#swapwidget)
  - [TokenAvatar](#tokenavatar)
  - [EliminationProgress](#eliminationprogress)
- [Data Display Components](#data-display-components)
  - [Counter](#counter)
  - [DataTable](#datatable)
  - [Marquee](#marquee)
- [Utilities](#utilities)
  - [Icon](#icon)

---

## Core UI Components

### Button

Interactive button component with multiple variants and sizes, built with class-variance-authority (CVA).

#### Import

```tsx
import { Button, buttonVariants } from "@/components/ui/button"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "brand" \| "secondary" \| "tertiary" \| "ghost" \| "outline" \| "destructive" \| "safe" \| "close" \| "risk" \| "link" \| "light"` | `"default"` | Visual style variant |
| `size` | `"default" \| "sm" \| "lg" \| "icon" \| "xs"` | `"default"` | Button size |
| `asChild` | `boolean` | `false` | Render as child element using Radix Slot |
| `icon` | `React.ReactNode` | - | Icon to display |
| `iconPosition` | `"left" \| "right"` | `"left"` | Position of the icon |
| `iconOnly` | `boolean` | `false` | Render as icon-only button |

#### Variants

- **default/brand**: Sedona orange primary button
- **secondary**: Raised surface with border
- **tertiary**: Frosted glass effect
- **ghost**: Transparent until hover
- **outline**: Border only
- **destructive/risk**: Error red for dangerous actions
- **safe**: Success green
- **close**: Warning yellow
- **link**: Text with underline on hover
- **light**: White button for dark backgrounds

#### Usage

```tsx
<Button variant="brand" size="lg">
  Connect Wallet
</Button>

<Button variant="ghost" icon={<Icon icon="gear" />}>
  Settings
</Button>

<Button variant="destructive" iconOnly icon={<Icon icon="trash" />} />
```

---

### Badge

Status and label indicators with multiple variants.

#### Import

```tsx
import { Badge, BadgeGroup, badgeVariants } from "@/components/ui/badge"
```

#### Badge Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "live" \| "gold" \| "success" \| "danger" \| "info" \| "warning" \| "secondary" \| "destructive" \| "outline" \| "safe" \| "close" \| "risk" \| "brand"` | `"default"` | Visual style variant |
| `size` | `"default" \| "sm" \| "md" \| "lg"` | `"default"` | Badge size |
| `showPulse` | `boolean` | `false` | Show animated pulse dot |
| `pulseColor` | `string` | `"bg-zeus-status-success"` | Pulse dot color class |

#### BadgeGroup Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `React.ReactNode` | - | Leading icon |
| `label` | `string` | - | Label text |
| `value` | `string` | - | Value text |
| `variant` | `"info" \| "success" \| "warning" \| "danger"` | `"info"` | Color variant |

#### Usage

```tsx
<Badge variant="live" showPulse>
  Live on Solana
</Badge>

<Badge variant="success">+12.5%</Badge>

<BadgeGroup icon={<Icon icon="chart-line" />} label="24h" value="+5.2%" variant="success" />
```

---

### Card

Container component for grouping related content.

#### Import

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
```

#### Subcomponents

| Component | Description |
|-----------|-------------|
| `Card` | Main container with border and shadow |
| `CardHeader` | Header section with spacing |
| `CardTitle` | Title text (h3 element) |
| `CardDescription` | Secondary description text |
| `CardContent` | Main content area |
| `CardFooter` | Footer with flex alignment |

#### Usage

```tsx
<Card>
  <CardHeader>
    <CardTitle>Agent Performance</CardTitle>
    <CardDescription>24-hour trading statistics</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Volume: $1.2M</p>
  </CardContent>
  <CardFooter>
    <Button>View Details</Button>
  </CardFooter>
</Card>
```

---

### Input

Text input field with consistent styling.

#### Import

```tsx
import { Input } from "@/components/ui/input"
```

#### Props

Extends `React.InputHTMLAttributes<HTMLInputElement>`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `"text"` | HTML input type |
| `className` | `string` | - | Additional CSS classes |

#### Usage

```tsx
<Input type="text" placeholder="Enter token address" />
<Input type="number" min={0} step={0.01} />
```

---

### Textarea

Multi-line text input field.

#### Import

```tsx
import { Textarea } from "@/components/ui/textarea"
```

#### Props

Extends `React.TextareaHTMLAttributes<HTMLTextAreaElement>`.

#### Usage

```tsx
<Textarea placeholder="Enter description..." rows={4} />
```

---

### Select

Dropdown select component built on Radix UI.

#### Import

```tsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
```

#### Subcomponents

| Component | Description |
|-----------|-------------|
| `Select` | Root component (Radix primitive) |
| `SelectTrigger` | Button that opens the dropdown |
| `SelectValue` | Displays selected value |
| `SelectContent` | Dropdown content container |
| `SelectGroup` | Group of related items |
| `SelectLabel` | Label for a group |
| `SelectItem` | Individual selectable option |
| `SelectSeparator` | Visual divider |

#### Usage

```tsx
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select token" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Popular</SelectLabel>
      <SelectItem value="sol">SOL</SelectItem>
      <SelectItem value="usdc">USDC</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

---

### Checkbox

Toggle checkbox input.

#### Import

```tsx
import { Checkbox } from "@/components/ui/checkbox"
```

#### Props

Extends Radix `CheckboxPrimitive.Root` props.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean \| "indeterminate"` | - | Controlled checked state |
| `onCheckedChange` | `(checked: boolean) => void` | - | Change handler |
| `disabled` | `boolean` | `false` | Disabled state |

#### Usage

```tsx
<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms</Label>
</div>
```

---

### Switch

Toggle switch input.

#### Import

```tsx
import { Switch } from "@/components/ui/switch"
```

#### Props

Extends Radix `SwitchPrimitives.Root` props.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | - | Controlled checked state |
| `onCheckedChange` | `(checked: boolean) => void` | - | Change handler |
| `disabled` | `boolean` | `false` | Disabled state |

#### Usage

```tsx
<div className="flex items-center gap-2">
  <Switch id="notifications" />
  <Label htmlFor="notifications">Enable notifications</Label>
</div>
```

---

### Label

Accessible label for form elements.

#### Import

```tsx
import { Label } from "@/components/ui/label"
```

#### Props

Extends Radix `LabelPrimitive.Root` props.

#### Usage

```tsx
<Label htmlFor="email">Email address</Label>
<Input id="email" type="email" />
```

---

### Avatar

User or entity avatar with image and fallback support.

#### Import

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
```

#### Subcomponents

| Component | Description |
|-----------|-------------|
| `Avatar` | Container with rounded styling |
| `AvatarImage` | Image element with object-cover |
| `AvatarFallback` | Fallback content (initials, icon) |

#### Usage

```tsx
<Avatar>
  <AvatarImage src="/agent-avatar.png" alt="Agent" />
  <AvatarFallback>AG</AvatarFallback>
</Avatar>
```

---

### Progress

Linear progress indicator.

#### Import

```tsx
import { Progress } from "@/components/ui/progress"
```

#### Props

Extends Radix `ProgressPrimitive.Root` props.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Progress value (0-100) |

#### Usage

```tsx
<Progress value={75} />
```

---

### Skeleton

Loading placeholder with pulse animation.

#### Import

```tsx
import { Skeleton } from "@/components/ui/skeleton"
```

#### Props

Extends `React.HTMLAttributes<HTMLDivElement>`.

#### Usage

```tsx
<Skeleton className="h-4 w-[200px]" />
<Skeleton className="h-12 w-12 rounded-full" />
```

---

## Overlay Components

### Dialog

Modal dialog for focused user interactions.

#### Import

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
```

#### Subcomponents

| Component | Description |
|-----------|-------------|
| `Dialog` | Root component (controlled or uncontrolled) |
| `DialogTrigger` | Element that opens the dialog |
| `DialogContent` | Modal content with overlay |
| `DialogHeader` | Header section |
| `DialogTitle` | Dialog title |
| `DialogDescription` | Description text |
| `DialogFooter` | Footer with actions |
| `DialogClose` | Close button |

#### Usage

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm Swap</DialogTitle>
      <DialogDescription>Review your transaction details.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="ghost">Cancel</Button>
      </DialogClose>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

### AlertDialog

Confirmation dialog for destructive actions.

#### Import

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
```

#### Usage

```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

---

### Popover

Floating content panel for additional information or controls.

#### Import

```tsx
import { Popover, PopoverContent, PopoverTrigger, PopoverAnchor } from "@/components/ui/popover"
```

#### PopoverContent Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `align` | `"start" \| "center" \| "end"` | `"center"` | Horizontal alignment |
| `sideOffset` | `number` | `4` | Distance from trigger |

#### Usage

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant="ghost">Settings</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="space-y-4">
      <h4 className="font-medium">Slippage Tolerance</h4>
      {/* Settings content */}
    </div>
  </PopoverContent>
</Popover>
```

---

### Tooltip

Contextual information on hover.

#### Import

```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
```

#### TooltipContent Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sideOffset` | `number` | `4` | Distance from trigger |
| `side` | `"top" \| "right" \| "bottom" \| "left"` | - | Preferred side |

#### Usage

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost">
        <Icon icon="circle-info" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Additional information here</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

---

### DropdownMenu

Menu with actions and options.

#### Import

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"
```

#### Usage

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost">
      <Icon icon="ellipsis-vertical" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>View Details</DropdownMenuItem>
    <DropdownMenuItem>Copy Address</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-zeus-status-destructive">
      Remove
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

## Navigation Components

### Tabs

Tabbed content navigation.

#### Import

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
```

#### Subcomponents

| Component | Description |
|-----------|-------------|
| `Tabs` | Root component (controlled or uncontrolled) |
| `TabsList` | Container for tab triggers |
| `TabsTrigger` | Individual tab button |
| `TabsContent` | Content panel for each tab |

#### Usage

```tsx
<Tabs defaultValue="chart">
  <TabsList>
    <TabsTrigger value="chart">Chart</TabsTrigger>
    <TabsTrigger value="trades">Trades</TabsTrigger>
    <TabsTrigger value="info">Info</TabsTrigger>
  </TabsList>
  <TabsContent value="chart">
    <PriceChart ticker="SOL" />
  </TabsContent>
  <TabsContent value="trades">
    <TransactionsTable />
  </TabsContent>
  <TabsContent value="info">
    <AgentInfo />
  </TabsContent>
</Tabs>
```

---

### Navigation

Main navigation bar component.

#### Import

```tsx
import { Navigation } from "@/components/ui/navigation"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `walletAddress` | `string` | - | Connected wallet address |
| `onWalletConnect` | `() => void` | - | Connect button handler |
| `onWalletDisconnect` | `() => void` | - | Disconnect handler |

#### Usage

```tsx
<Navigation
  walletAddress="J181...U7Wi"
  onWalletConnect={() => connectWallet()}
  onWalletDisconnect={() => disconnectWallet()}
/>
```

---

### Header

Application header with logo, wallet connection, and actions.

#### Import

```tsx
import { Header } from "@/components/trading/Header"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onCreateCoin` | `() => void` | - | Create agent button handler |
| `onConnect` | `() => void` | - | Connect wallet handler |
| `onDisconnect` | `() => void` | - | Disconnect wallet handler |
| `onProfile` | `() => void` | - | Profile button handler |
| `isAuthenticated` | `boolean` | `false` | User authentication status |
| `walletAddress` | `string` | `"J181...U7Wi"` | Truncated wallet address |
| `fullWalletAddress` | `string` | - | Full wallet address for copy |
| `balance` | `string` | `"0.00 SOL"` | Wallet balance display |
| `balanceUsd` | `string` | `"$0.00"` | Balance in USD |

#### Usage

```tsx
<Header
  isAuthenticated={true}
  walletAddress="J181...U7Wi"
  balance="1.5 SOL"
  balanceUsd="$150.00"
  onCreateCoin={() => openCreateModal()}
  onDisconnect={() => disconnectWallet()}
/>
```

---

## Trading Components

### PriceChart

Interactive candlestick chart built on lightweight-charts.

#### Import

```tsx
import { PriceChart } from "@/components/trading/PriceChart"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ticker` | `string` | **required** | Token ticker symbol |
| `timeframes` | `ChartTimeframe[]` | `["1m", "5m", "1h", "1d"]` | Available timeframe options |
| `activeTimeframe` | `ChartTimeframe` | `"1d"` | Currently selected timeframe |
| `onTimeframeChange` | `(timeframe: ChartTimeframe) => void` | - | Timeframe change handler |

#### ChartTimeframe

`"1m" | "5m" | "1h" | "1d"`

#### Features

- Candlestick visualization
- Timeframe selection (1m, 5m, 1h, 1d)
- Scale modes: Normal, Percentage, Logarithmic
- Date range filtering
- Auto-fit functionality
- Responsive sizing

#### Usage

```tsx
<PriceChart
  ticker="AGENT"
  timeframes={["1m", "5m", "1h", "1d"]}
  activeTimeframe="1h"
  onTimeframeChange={(tf) => setTimeframe(tf)}
/>
```

---

### SwapWidget

Complete token swap interface with quote management.

#### Import

```tsx
import { SwapWidget, Token, SwapQuote, SwapError, SwapStatus, TradingStatus } from "@/components/ui/swap-widget"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `payToken` | `Token` | **required** | Token being sold |
| `receiveToken` | `Token` | **required** | Token being bought |
| `tradingStatus` | `TradingStatus` | `"active"` | Trading availability status |
| `tradingStatusMessage` | `string` | - | Custom status message |
| `slippage` | `string` | `"Auto"` | Initial slippage setting |
| `slippagePresets` | `string[]` | `["0.5", "1.0", "2.0"]` | Slippage quick-select options |
| `nativeGasReserve` | `string` | `"0.01"` | Reserve for gas (native tokens) |
| `quoteRefreshInterval` | `number` | `30000` | Auto-refresh interval (ms) |
| `quoteDebounceMs` | `number` | `300` | Quote request debounce (ms) |
| `onQuoteRequest` | `(params) => Promise<SwapQuote \| null>` | - | Quote fetching callback |
| `onSwap` | `(params) => Promise<void>` | - | Swap execution callback |
| `onFlip` | `() => void` | - | Token flip callback |
| `onPayTokenSelect` | `() => void` | - | Pay token selector click |
| `onReceiveTokenSelect` | `() => void` | - | Receive token selector click |
| `onError` | `(error: SwapError) => void` | - | Error callback |

#### Token Interface

```tsx
interface Token {
  symbol: string        // Token ticker (e.g., "SOL")
  name: string          // Full name
  imageUrl?: string     // Avatar URL
  decimals?: number     // Input precision (default: 9)
  balance: string       // User balance
  price: number         // USD price
  isNative?: boolean    // Is native token
  minAmount?: string    // Minimum trade amount
  maxAmount?: string    // Maximum trade amount
}
```

#### SwapQuote Interface

```tsx
interface SwapQuote {
  receiveAmount: string   // Amount to receive
  exchangeRate: number    // 1 pay = X receive
  priceImpact: number     // Impact percentage
  minReceived: string     // After slippage
  networkFee?: string     // Gas estimate
  expiresAt?: number      // Quote expiry timestamp
  metadata?: Record<string, unknown>
}
```

#### Usage

```tsx
<SwapWidget
  payToken={{
    symbol: "SOL",
    name: "Solana",
    balance: "10.5",
    price: 100,
    isNative: true,
  }}
  receiveToken={{
    symbol: "AGENT",
    name: "Agent Token",
    balance: "0",
    price: 0.05,
  }}
  onQuoteRequest={async ({ payAmount }) => {
    const quote = await fetchQuote(payAmount)
    return quote
  }}
  onSwap={async ({ payAmount, quote }) => {
    await executeSwap(payAmount, quote)
  }}
  onFlip={() => swapTokens()}
/>
```

---

### TokenAvatar

Avatar component optimized for token icons.

#### Import

```tsx
import { TokenAvatar, TokenAvatarSize } from "@/components/ui/token-avatar"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ticker` | `string` | **required** | Token symbol |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Avatar size |
| `imageUrl` | `string` | - | Token image URL |

#### Size Variants

| Size | Container | Text |
|------|-----------|------|
| `sm` | 24x24px | caption-s |
| `md` | 32x32px | caption-l |
| `lg` | 44x44px | heading-xs |

#### Usage

```tsx
<TokenAvatar ticker="SOL" size="lg" imageUrl="/tokens/sol.png" />
<TokenAvatar ticker="USDC" size="sm" />
```

---

### EliminationProgress

Progress indicator for elimination status in competitive games.

#### Import

```tsx
import { EliminationProgress, calculateStatus, getStatusLabel, EliminationStatus } from "@/components/ui/elimination-progress"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rank` | `number` | **required** | Current rank (1 = best) |
| `totalAgents` | `number` | **required** | Total agents in competition |
| `marketCap` | `string` | **required** | Current market cap (e.g., "$45.2K") |
| `eliminationThreshold` | `string` | **required** | Threshold to avoid elimination |
| `variant` | `"default" \| "inline"` | `"default"` | Display variant |

#### EliminationStatus

- `"safe"` - Top 60% and above threshold
- `"close"` - 60-80% rank or near threshold
- `"risk"` - Bottom 20% or below threshold

#### Usage

```tsx
// Full card display
<EliminationProgress
  rank={5}
  totalAgents={20}
  marketCap="$45.2K"
  eliminationThreshold="$5K"
/>

// Compact inline arc gauge
<EliminationProgress
  rank={5}
  totalAgents={20}
  marketCap="$45.2K"
  eliminationThreshold="$5K"
  variant="inline"
/>
```

---

## Data Display Components

### Counter

Animated number counter with spring physics.

#### Import

```tsx
import { Counter, TimeCounter, CurrencyCounter, CounterProps } from "@/components/ui/counter"
```

#### Counter Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | **required** | Numeric value to display |
| `fontSize` | `number` | `16` | Font size in pixels |
| `padding` | `number` | `0` | Vertical padding |
| `places` | `PlaceValue[]` | auto | Digit places configuration |
| `gap` | `number` | `0` | Gap between digits |
| `textColor` | `string` | `"inherit"` | Text color |
| `fontWeight` | `CSSProperties["fontWeight"]` | `"inherit"` | Font weight |
| `digitClassName` | `string` | - | Class for individual digits |
| `prefix` | `string` | - | Text before number |
| `suffix` | `string` | - | Text after number |
| `showGradient` | `boolean` | `false` | Show edge gradients |
| `gradientColor` | `string` | `"black"` | Gradient color |

#### TimeCounter Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `seconds` | `number` | **required** | Time in seconds |
| `fontSize` | `number` | `16` | Font size |
| `textColor` | `string` | `"inherit"` | Text color |

#### CurrencyCounter Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | **required** | Currency amount |
| `fontSize` | `number` | `16` | Font size |
| `textColor` | `string` | `"inherit"` | Text color |
| `currency` | `string` | `"$"` | Currency symbol |

#### Usage

```tsx
<Counter value={1234567} fontSize={24} prefix="$" />

<TimeCounter seconds={125} fontSize={20} />

<CurrencyCounter value={50000} fontSize={32} currency="$" />
```

---

### DataTable

Composable data table primitives with sorting and loading states.

#### Import

```tsx
import {
  DataTable,
  DataTableHeader,
  DataTableBody,
  DataTableRow,
  DataTableHead,
  DataTableCell,
  DataTableEmpty,
  DataTableLoading,
} from "@/components/ui/data-table/data-table"
```

#### DataTableHead Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sortable` | `boolean` | `false` | Enable sorting |
| `sortDirection` | `"asc" \| "desc" \| null` | - | Current sort direction |
| `onSort` | `() => void` | - | Sort click handler |
| `width` | `string \| number` | - | Fixed column width |
| `align` | `"left" \| "center" \| "right"` | `"left"` | Text alignment |

#### DataTableRow Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `interactive` | `boolean` | `true` | Enable hover effects |
| `selected` | `boolean` | `false` | Selected state |

#### DataTableCell Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `string \| number` | - | Fixed cell width |
| `align` | `"left" \| "center" \| "right"` | `"left"` | Content alignment |

#### DataTableHeader Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sticky` | `boolean` | `false` | Sticky header on scroll |

#### DataTableEmpty Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `React.ReactNode` | - | Empty state icon |
| `title` | `string` | `"No data"` | Empty state title |
| `description` | `string` | - | Empty state description |

#### DataTableLoading Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rows` | `number` | `5` | Number of skeleton rows |

#### Usage

```tsx
<DataTable>
  <DataTableHeader sticky>
    <DataTableRow interactive={false}>
      <DataTableHead width={200} sortable sortDirection="desc" onSort={handleSort}>
        Agent
      </DataTableHead>
      <DataTableHead align="right">Market Cap</DataTableHead>
      <DataTableHead align="right">24h Change</DataTableHead>
    </DataTableRow>
  </DataTableHeader>
  <DataTableBody>
    {agents.map((agent) => (
      <DataTableRow key={agent.id} onClick={() => selectAgent(agent)}>
        <DataTableCell width={200}>{agent.name}</DataTableCell>
        <DataTableCell align="right">{agent.marketCap}</DataTableCell>
        <DataTableCell align="right">{agent.change24h}</DataTableCell>
      </DataTableRow>
    ))}
  </DataTableBody>
</DataTable>

{/* Loading state */}
<DataTableLoading rows={10} />

{/* Empty state */}
<DataTableEmpty
  icon={<Icon icon="search" className="w-8 h-8" />}
  title="No agents found"
  description="Try adjusting your search criteria"
/>
```

---

### Marquee

GPU-accelerated infinite scrolling component.

#### Import

```tsx
import { Marquee, MarqueeItem, VerticalMarquee } from "@/components/ui/marquee/marquee"
```

#### Marquee Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `speed` | `number` | `50` | Speed in pixels per second |
| `direction` | `"left" \| "right"` | `"left"` | Scroll direction |
| `pauseOnHover` | `boolean` | `true` | Pause on mouse hover |
| `gap` | `number` | `24` | Gap between items (px) |
| `repeat` | `number` | `3` | Content clones for seamless loop |
| `paused` | `boolean` | `false` | Start paused |
| `fade` | `boolean` | `true` | Show edge gradients |
| `fadeWidth` | `number` | `32` | Gradient width (px) |
| `fadeColor` | `string` | `"var(--marquee-fade)"` | Gradient color |

#### VerticalMarquee Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `speed` | `number` | `30` | Speed in pixels per second |
| `direction` | `"up" \| "down"` | `"up"` | Scroll direction |
| `pauseOnHover` | `boolean` | `true` | Pause on mouse hover |
| `gap` | `number` | `16` | Gap between items (px) |
| `repeat` | `number` | `3` | Content clones |
| `paused` | `boolean` | `false` | Start paused |
| `fade` | `boolean` | `true` | Show edge gradients |
| `fadeHeight` | `number` | `24` | Gradient height (px) |
| `fadeColor` | `string` | `"var(--marquee-fade)"` | Gradient color |

#### Usage

```tsx
<Marquee speed={60} pauseOnHover>
  {tokens.map((token) => (
    <MarqueeItem key={token.symbol}>
      <TokenCard token={token} />
    </MarqueeItem>
  ))}
</Marquee>

<VerticalMarquee direction="up" speed={20}>
  {transactions.map((tx) => (
    <MarqueeItem key={tx.id}>
      <TransactionRow tx={tx} />
    </MarqueeItem>
  ))}
</VerticalMarquee>
```

---

## Utilities

### Icon

Font Awesome icon wrapper with configurable default prefix.

#### Import

```tsx
import { Icon } from "@/components/ui/icon"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `IconProp \| string` | **required** | Icon name or definition |
| `size` | `SizeProp` | - | FA size (xs, sm, lg, 2x, etc.) |
| `spin` | `boolean` | `false` | Spin animation |
| `pulse` | `boolean` | `false` | Pulse animation |
| `fixedWidth` | `boolean` | `false` | Fixed width for alignment |
| `className` | `string` | - | Additional CSS classes |

#### Icon Prefixes

- Default prefix is configured in `lib/fontawesome.ts`
- Use array syntax for other styles: `["far", "heart"]`, `["fab", "github"]`

#### Usage

```tsx
// Using default prefix
<Icon icon="shopping-cart" />
<Icon icon="check" className="text-green-500" />

// Using specific prefix
<Icon icon={["far", "heart"]} />
<Icon icon={["fab", "github"]} size="2x" />

// With animations
<Icon icon="spinner" spin />
<Icon icon="circle-notch" pulse />
```

---

## Registry Components

The following components are available through the Sedona component registry:

| Name | Type | Description |
|------|------|-------------|
| `fontawesome` | lib | Font Awesome configuration |
| `icon` | ui | Font Awesome icon wrapper |
| `trading-utils` | lib | Market cap parsing, price formatting |
| `swap-utils` | lib | Number formatting, slippage calculations |
| `counter` | ui | Animated number counter |
| `token-avatar` | ui | Token/crypto avatar with fallback |
| `marquee` | ui | GPU-accelerated infinite scrolling |
| `data-table` | ui | Composable data table primitives |
| `elimination-progress` | ui | Elimination status indicator |
| `price-chart` | ui | Lightweight trading chart |
| `swap-widget` | ui | Complete token swap interface |
| `sedona-kit` | lib | Demo fixtures and generators |

---

## Design Tokens

The component library uses the Zeus design system with Sedona brand colors:

### Brand Colors

- `sedona-500`: Primary brand orange (#F37821)
- `sedona-600`, `sedona-700`: Darker shades for hover/active

### Surface Colors (Dark Mode)

- `zeus-surface-default`: Base background
- `zeus-surface-elevated`: Raised surfaces
- `zeus-surface-neutral`: Neutral backgrounds
- `zeus-surface-neutral-subtle`: Subtle backgrounds

### Border Colors

- `zeus-border-alpha`: Transparent borders
- `zeus-border-normal`: Standard borders
- `zeus-border-focused`: Focus ring color

### Text Colors

- `zeus-text-primary`: Primary text
- `zeus-text-secondary`: Secondary text
- `zeus-text-tertiary`: Muted text
- `zeus-text-quaternary`: Disabled/subtle text

### Status Colors

- `zeus-status-success`: Green for positive
- `zeus-status-destructive`: Red for errors/danger
- `zeus-status-warning`: Yellow for warnings
- `zeus-accent-orange`: Orange accent
- `zeus-accent-blue`: Blue accent
