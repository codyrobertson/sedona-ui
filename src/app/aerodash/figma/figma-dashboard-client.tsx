"use client"

import * as React from "react"
import {
  BarChart3,
  Clock3,
  LayoutPanelLeft,
  Search,
  SlidersHorizontal,
  Square,
  Trophy,
  Zap,
} from "lucide-react"

import {
  HeaderCta,
  Input,
  RailCard,
  RailItem,
  RailKicker,
  RailLabel,
  RailLogo,
  SideRail,
  StatsBar,
  StatsIcons,
  StatsItem,
  StatsSection,
  StatsTicker,
  colors,
} from "@/components/aerodash"
import { SedonaLogo } from "@/components/sedona"

import styles from "./figma-dashboard.module.css"

const navItems = [
  { label: "Shell", icon: <LayoutPanelLeft />, active: true },
  { label: "Buttons", icon: <Square />, active: false },
  { label: "Forms", icon: <Square />, active: false },
  { label: "Tables", icon: <Square />, active: false },
  { label: "Overlays", icon: <Square />, active: false },
] as const

const searchIcon = <Search size={14} strokeWidth={2} aria-hidden />

function GlobalSearch() {
  return (
    <label className={styles.globalSearch} aria-label="Global search">
      {searchIcon}
      <input placeholder="Search..." />
      <span className={styles.shortcut} aria-hidden>
        /
      </span>
    </label>
  )
}

function AeroDashRail() {
  return (
    <SideRail className={styles.rail} style={{ width: 164, height: "100%" }}>
      <nav className={styles.railNav} aria-label="AeroDash sections">
        <RailKicker>Navigation</RailKicker>
        <RailCard>
          <RailLogo>
            <span>AeroDash</span>
            <br />
            <span>OS</span>
          </RailLogo>
          <RailLabel>Default</RailLabel>
          {navItems.map((item) => (
            <RailItem
              key={item.label}
              href={`#${item.label.toLowerCase()}`}
              icon={item.icon}
              active={item.active}
              aria-current={item.active ? "page" : undefined}
            >
              {item.label}
            </RailItem>
          ))}
        </RailCard>
      </nav>
    </SideRail>
  )
}

function FilterInputs() {
  return (
    <div className={styles.filters} aria-label="Dashboard filters">
      <Input rootSize="sm" placeholder="Search..." leadingIcon={searchIcon} />
      <Input rootSize="sm" placeholder="Search..." leadingIcon={searchIcon} />
      <Input rootSize="sm" placeholder="Search..." leadingIcon={searchIcon} />
    </div>
  )
}

function BottomStats() {
  return (
    <StatsBar className={styles.bottomStats} style={{ height: 29, minHeight: 29 }}>
      <StatsSection label="Platform Stats">
        <StatsItem icon={<Clock3 />} label="Ends In" value="0M 12S" />
        <StatsItem icon={<Trophy />} label="Jackpot" value="$750" />
        <StatsItem icon={<BarChart3 />} label="Tokens" value="1" />
      </StatsSection>
      <StatsSection label="Top Pools" style={{ flex: 1 }}>
        <StatsTicker symbol="$LYON" price="$0.000003" change={0.0024} changeText="+0.24%" />
        <StatsTicker symbol="$VEGA" price="$0.0042" change={-0.0118} changeText="-1.18%" />
      </StatsSection>
    </StatsBar>
  )
}

export function FigmaAerodashDashboard() {
  return (
    <main data-ad-page="" data-figma-dashboard="" className={styles.screen}>
      <style>{`body:has([data-figma-dashboard]) footer { display: none !important; }`}</style>
      <div className={styles.frame}>
        <header className={styles.topBar} aria-label="Sedona AeroDash">
          <div className={styles.brandWedge}>
            <SedonaLogo variant="logo" size="sm" color="primary" aria-label="Sedona" />
          </div>
          <div className={styles.headerVoid} aria-hidden />
          <div className={styles.headerControls}>
            <GlobalSearch />
            <button className={styles.filterButton} type="button" aria-label="Filter dashboard">
              <SlidersHorizontal size={14} strokeWidth={2} />
            </button>
            <HeaderCta
              icon={<Zap size={14} fill="currentColor" />}
              style={{ width: 158, ["--ad-offset" as string]: "1px" } as React.CSSProperties}
            >
              Start Action
            </HeaderCta>
          </div>
        </header>

        <div className={styles.body}>
          <AeroDashRail />
          <section className={styles.content} aria-labelledby="figma-dashboard-title">
            <h1 id="figma-dashboard-title" className={styles.title}>
              DASHBOARD
            </h1>
            <p className={styles.lede}>Live system overview and operational metrics. All systems nominal.</p>
            <FilterInputs />
            <div
              className={styles.canvas}
              data-testid="figma-dashboard-canvas"
              aria-label="Dashboard content canvas"
            />
          </section>
        </div>

        <BottomStats />
      </div>
    </main>
  )
}
