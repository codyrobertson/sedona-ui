"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useClipboard } from "@/hooks/useClipboard"
import { Icon } from "@/components/ui/icon"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface WalletCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onCopy'> {
  /** Truncated wallet address to display (e.g., "J181...U7Wi") */
  address: string
  /** Full wallet address for copying */
  fullAddress: string
  /** Balance display string (e.g., "0.00 SOL") */
  balance: string
  /** Balance in USD (e.g., "$0.00") */
  balanceUsd: string
  /** Callback when disconnect is clicked */
  onDisconnect?: () => void
  /** Callback when profile is clicked */
  onProfile?: () => void
  /** Callback when address is copied */
  onCopy?: (address: string) => void
}

const WalletCard = React.forwardRef<HTMLDivElement, WalletCardProps>(
  ({
    className,
    address,
    fullAddress,
    balance,
    balanceUsd,
    onDisconnect,
    onProfile,
    onCopy,
    ...props
  }, ref) => {
    const { copy, copied } = useClipboard()
    const [dropdownOpen, setDropdownOpen] = React.useState(false)

    const handleCopyAddress = async (e: React.MouseEvent | React.KeyboardEvent) => {
      e.stopPropagation()
      const success = await copy(fullAddress)
      if (success) {
        onCopy?.(fullAddress)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleCopyAddress(e)
      }
    }

    return (
      <TooltipProvider>
        <div
          ref={ref}
          className={cn(
            "flex items-center bg-zeus-surface-neutral border border-zeus-border-alpha rounded-lg",
            className
          )}
          {...props}
        >
          {/* Address Section - Click to Copy */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                role="button"
                tabIndex={0}
                className="flex items-center gap-2 px-2.5 py-1.5 border-r border-zeus-border-alpha cursor-pointer hover:bg-zeus-surface-elevated transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sedona-500 focus-visible:ring-inset"
                onClick={handleCopyAddress}
                onKeyDown={handleKeyDown}
                aria-label={`Copy wallet address ${address}`}
              >
                <div className="w-2 h-2 rounded-full bg-zeus-accent-purple" />
                <span className="text-zeus-text-primary text-caption-l font-medium">
                  {address}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              align="start"
              className="bg-black border-zeus-border-alpha"
            >
              <div className="text-white text-caption-s font-mono mb-1 max-w-[200px] break-all">
                {fullAddress}
              </div>
              <div className="text-zeus-text-tertiary text-[10px]">
                {copied ? "Copied!" : "Click to copy"}
              </div>
            </TooltipContent>
          </Tooltip>

          {/* Balance Section - Hover for USD (hidden on mobile) */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="hidden sm:block px-2.5 py-1.5 border-r border-zeus-border-alpha">
                <span className="text-zeus-status-success text-caption-l font-medium">
                  {balance}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              className="bg-black border-zeus-border-alpha"
            >
              <div className="text-white text-caption-s font-medium">
                {balanceUsd} USD
              </div>
            </TooltipContent>
          </Tooltip>

          {/* Dropdown Toggle */}
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <button
                className="px-1.5 py-1.5 hover:bg-zeus-surface-elevated transition-colors"
                aria-label="Open wallet menu"
              >
                <Icon icon="chevron-down" className={cn(
                  "w-4 h-4 text-zeus-text-tertiary transition-transform",
                  dropdownOpen && "rotate-180"
                )} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="min-w-[140px]"
            >
              {/* Balance - shown on mobile only */}
              <div className="sm:hidden px-2 py-1.5 border-b border-zeus-border-alpha mb-1">
                <div className="text-zeus-text-tertiary text-caption-s">Balance</div>
                <div className="text-zeus-status-success text-caption-l font-medium">{balance}</div>
              </div>
              <DropdownMenuItem
                onClick={() => onProfile?.()}
                className="cursor-pointer"
              >
                <Icon icon="user" className="w-4 h-4 mr-2" />
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDisconnect?.()}
                className="text-zeus-status-destructive cursor-pointer"
              >
                Disconnect
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TooltipProvider>
    )
  }
)

WalletCard.displayName = "WalletCard"

export { WalletCard }
