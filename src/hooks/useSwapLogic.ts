"use client"

import { useState, useCallback } from "react"

export interface UseSwapLogicOptions {
  /** Initial pay amount */
  initialPayAmount?: string
  /** Initial receive amount */
  initialReceiveAmount?: string
  /** Balance to calculate quick amounts from */
  balance?: string
}

export interface UseSwapLogicReturn {
  /** Current pay amount */
  payAmount: string
  /** Current receive amount */
  receiveAmount: string
  /** Set pay amount */
  setPayAmount: (amount: string) => void
  /** Set receive amount */
  setReceiveAmount: (amount: string) => void
  /** Set pay amount to percentage of balance */
  handleQuickAmount: (percent: number) => void
  /** Flip pay and receive amounts */
  handleFlip: () => void
  /** Reset both amounts */
  reset: () => void
}

/**
 * Hook for managing swap widget state and logic
 * Extracted from SwapWidget and TokenSwapCard to eliminate duplication
 */
export function useSwapLogic(options: UseSwapLogicOptions = {}): UseSwapLogicReturn {
  const {
    initialPayAmount = "",
    initialReceiveAmount = "",
    balance = "0",
  } = options

  const [payAmount, setPayAmount] = useState(initialPayAmount)
  const [receiveAmount, setReceiveAmount] = useState(initialReceiveAmount)

  const handleQuickAmount = useCallback((percent: number) => {
    const numericBalance = parseFloat(balance.replace(/,/g, ""))
    if (!isNaN(numericBalance)) {
      const amount = (numericBalance * percent / 100).toFixed(2)
      setPayAmount(amount)
    }
  }, [balance])

  const handleFlip = useCallback(() => {
    setPayAmount(prev => {
      const temp = prev
      setReceiveAmount(temp)
      return receiveAmount
    })
  }, [receiveAmount])

  const reset = useCallback(() => {
    setPayAmount(initialPayAmount)
    setReceiveAmount(initialReceiveAmount)
  }, [initialPayAmount, initialReceiveAmount])

  return {
    payAmount,
    receiveAmount,
    setPayAmount,
    setReceiveAmount,
    handleQuickAmount,
    handleFlip,
    reset,
  }
}
