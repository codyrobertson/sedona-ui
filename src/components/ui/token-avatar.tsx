"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type TokenAvatarSize = "sm" | "md" | "lg"

export interface TokenAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The token ticker symbol */
  ticker: string
  /** Size variant of the avatar */
  size?: TokenAvatarSize
  /** Optional image URL for the token */
  imageUrl?: string
}

const sizeVariants: Record<TokenAvatarSize, { container: string; text: string }> = {
  sm: {
    container: "w-6 h-6",
    text: "text-caption-s",
  },
  md: {
    container: "w-8 h-8",
    text: "text-caption-l",
  },
  lg: {
    container: "w-11 h-11",
    text: "text-lg",
  },
}

const TokenAvatar = React.forwardRef<HTMLDivElement, TokenAvatarProps>(
  ({ className, ticker, size = "md", imageUrl, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false)
    const variant = sizeVariants[size]
    const showImage = imageUrl && !imageError

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-full bg-zeus-surface-neutral border border-zeus-border-alpha flex items-center justify-center flex-shrink-0 overflow-hidden",
          variant.container,
          className
        )}
        {...props}
      >
        {showImage ? (
          <img
            src={imageUrl}
            alt={`${ticker} token`}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span
            className={cn(
              "font-bold text-zeus-text-secondary",
              variant.text
            )}
          >
            {ticker.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
    )
  }
)

TokenAvatar.displayName = "TokenAvatar"

export { TokenAvatar }
