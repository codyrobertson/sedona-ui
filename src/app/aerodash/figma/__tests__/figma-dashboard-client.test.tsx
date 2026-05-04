import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { FigmaAerodashDashboard } from "../figma-dashboard-client"

describe("FigmaAerodashDashboard", () => {
  it("renders the coded Figma dashboard shell", () => {
    render(<FigmaAerodashDashboard />)

    expect(screen.getByRole("banner")).toHaveAccessibleName("Sedona AeroDash")
    expect(screen.getByRole("heading", { name: "DASHBOARD" })).toBeInTheDocument()
    expect(screen.getByText("Live system overview and operational metrics. All systems nominal.")).toBeInTheDocument()

    const navigation = screen.getByRole("navigation", { name: "AeroDash sections" })
    expect(within(navigation).getByText("AeroDash")).toBeInTheDocument()
    expect(within(navigation).getByRole("link", { name: /Shell/i })).toHaveAttribute("aria-current", "page")
    expect(within(navigation).getByRole("link", { name: /Buttons/i })).toBeInTheDocument()
    expect(within(navigation).getByRole("link", { name: /Forms/i })).toBeInTheDocument()
    expect(within(navigation).getByRole("link", { name: /Tables/i })).toBeInTheDocument()
    expect(within(navigation).getByRole("link", { name: /Overlays/i })).toBeInTheDocument()

    expect(screen.getAllByPlaceholderText("Search...")).toHaveLength(4)
    expect(screen.getByTestId("figma-dashboard-canvas")).toBeInTheDocument()

    expect(screen.getByText("Platform Stats")).toBeInTheDocument()
    expect(screen.getByText("Top Pools")).toBeInTheDocument()
    expect(screen.getByText("0M 12S")).toBeInTheDocument()
    expect(screen.getByText("$VEGA")).toBeInTheDocument()
  })
})
