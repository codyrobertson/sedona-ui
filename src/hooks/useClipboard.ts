"use client"

import { useState, useCallback } from "react"

interface UseClipboardReturn {
  copy: (text: string) => Promise<boolean>
  copied: boolean
}

export function useClipboard(resetDelay = 2000): UseClipboardReturn {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), resetDelay)
      return true
    } catch {
      console.error("Failed to copy to clipboard")
      return false
    }
  }, [resetDelay])

  return { copy, copied }
}
