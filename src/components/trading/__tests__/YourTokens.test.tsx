import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { YourTokens } from "../YourTokens"

describe("YourTokens", () => {
  it("shows a designed empty state when the wallet is disconnected", () => {
    render(<YourTokens isConnected={false} tokens={[]} />)

    expect(screen.getByText("Wallet")).toBeInTheDocument()
    expect(screen.getByText("Connect wallet to load balances")).toBeInTheDocument()
  })

  it("shows a designed empty state when the wallet has no tokens", () => {
    render(<YourTokens isConnected tokens={[]} />)

    expect(screen.getByText("Balances")).toBeInTheDocument()
    expect(screen.getByText("No tokens in this wallet yet")).toBeInTheDocument()
  })
})
