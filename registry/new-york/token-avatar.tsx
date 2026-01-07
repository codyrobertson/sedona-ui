"use client"

import * as React from "react"
import Image from "next/image"
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
    text: "text-xs",
  },
  md: {
    container: "w-8 h-8",
    text: "text-sm",
  },
  lg: {
    container: "w-11 h-11",
    text: "text-base",
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
          "relative rounded-full bg-muted border border-border flex items-center justify-center flex-shrink-0 overflow-hidden",
          variant.container,
          className
        )}
        {...props}
      >
        {showImage ? (
          <Image
            src={imageUrl}
            alt={`${ticker} token`}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <span
            className={cn(
              "font-bold text-muted-foreground",
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
