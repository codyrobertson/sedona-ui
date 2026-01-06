"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { ChevronDown, Wallet } from "lucide-react"

export interface TokenInputProps {
  /** Current input value */
  value: string
  /** Callback when value changes */
  onChange: (value: string) => void
  /** Token ticker symbol (e.g., "SOL", "ETH") */
  token: string
  /** Custom token icon element. If not provided, displays first letter of ticker */
  tokenIcon?: React.ReactNode
  /** Token balance to display */
  balance: string
  /** Input placeholder text */
  placeholder?: string
  /** Optional label displayed above the input */
  label?: string
  /** Callback when token selector button is clicked */
  onTokenSelect?: () => void
  /** Additional className for the container */
  className?: string
  /** Whether the input is disabled */
  disabled?: boolean
}

const TokenInput = React.forwardRef<HTMLInputElement, TokenInputProps>(
  (
    {
      value,
      onChange,
      token,
      tokenIcon,
      balance,
      placeholder = "0.00",
      label,
      onTokenSelect,
      className,
      disabled = false,
    },
    ref
  ) => {
    const defaultIcon = (
      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-sedona-500 to-sedona-600 flex items-center justify-center">
        <span className="text-[8px] font-bold text-white">{token.charAt(0)}</span>
      </div>
    )

    return (
      <div className={cn("space-y-1", className)}>
        {label && (
          <span className="text-zeus-text-primary text-caption-s font-medium">
            {label}
          </span>
        )}
        <div className="relative">
          <Input
            ref={ref}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className="bg-zeus-surface-default border-zeus-border-alpha text-zeus-text-primary text-body-s h-11 pr-24"
          />
          <button
            type="button"
            onClick={onTokenSelect}
            disabled={disabled}
            className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-zeus-surface-elevated hover:bg-zeus-surface-neutral-subtle transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {tokenIcon || defaultIcon}
            <span className="text-zeus-text-primary text-caption-s font-medium">
              {token}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-zeus-text-tertiary" />
          </button>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-zeus-text-tertiary">
          <Wallet className="w-3 h-3" />
          <span>
            Balance: {balance} {token}
          </span>
        </div>
      </div>
    )
  }
)

TokenInput.displayName = "TokenInput"

export { TokenInput }
