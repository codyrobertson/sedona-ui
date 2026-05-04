# Sedona UI Design Tokens

> Legacy reference: this page documents the older Zeus/Tailwind token layer.
> The active AeroDash design-system contract is
> `docs/AERODASH_DESIGN_SYSTEM.md`, with runtime tokens in
> `src/components/aerodash/tokens.ts`.

This document provides a comprehensive reference for all design tokens used in the Sedona UI design system. Tokens are defined in `tailwind.config.ts` and `src/app/globals.css`.

---

## Table of Contents

1. [Colors](#colors)
   - [Zeus Design System](#zeus-design-system)
   - [Sedona Brand Colors](#sedona-brand-colors)
   - [Semantic Colors](#semantic-colors)
   - [Status Colors](#status-colors)
   - [CSS Custom Properties](#css-custom-properties)
2. [Typography](#typography)
   - [Font Families](#font-families)
   - [Font Sizes](#font-sizes)
   - [Font Weights](#font-weights)
3. [Spacing](#spacing)
4. [Borders & Radius](#borders--radius)
5. [Shadows](#shadows)
6. [Breakpoints](#breakpoints)
7. [Animation](#animation)
8. [Utility Classes](#utility-classes)

---

## Colors

### Zeus Design System

The Zeus color system provides the complete palette for dark-themed interfaces. All colors are accessible via `zeus-*` Tailwind classes.

#### Surface Colors

| Token Name | Tailwind Class | Value | Usage |
|------------|----------------|-------|-------|
| surface-default | `bg-zeus-surface-default` | `#141310` | Default background |
| surface-elevated | `bg-zeus-surface-elevated` | `#1e1c17` | Elevated containers, cards |
| surface-neutral | `bg-zeus-surface-neutral` | `#2e2b24` | Neutral surface elements |
| surface-neutral-subtle | `bg-zeus-surface-neutral-subtle` | `#3e3a31` | Subtle background variations |
| surface-warning | `bg-zeus-surface-warning` | `#2e2319` | Warning state backgrounds |
| surface-warning-accent | `bg-zeus-surface-warning-accent` | `#fb9704` | Warning accent highlights |
| surface-destructive | `bg-zeus-surface-destructive` | `#2e1b19` | Error/destructive backgrounds |
| surface-destructive-accent | `bg-zeus-surface-destructive-accent` | `#ea1e04` | Destructive accent highlights |
| surface-info | `bg-zeus-surface-info` | `#1e2228` | Informational backgrounds |
| surface-info-accent | `bg-zeus-surface-info-accent` | `#397fb2` | Info accent highlights |
| surface-success | `bg-zeus-surface-success` | `#1e2821` | Success state backgrounds |
| surface-success-accent | `bg-zeus-surface-success-accent` | `#21a65e` | Success accent highlights |
| surface-nutshell | `bg-zeus-surface-nutshell` | `#2A1610` | Landing page special surface |

**Example:**
```jsx
<div className="bg-zeus-surface-default">Default background</div>
<div className="bg-zeus-surface-elevated">Card or modal</div>
```

#### Text Colors

| Token Name | Tailwind Class | Value | Usage |
|------------|----------------|-------|-------|
| text-primary | `text-zeus-text-primary` | `#ffffff` | Primary text content |
| text-secondary | `text-zeus-text-secondary` | `#ffffff99` (60%) | Secondary text, descriptions |
| text-tertiary | `text-zeus-text-tertiary` | `#ffffff75` (46%) | Tertiary text, hints |
| text-quaternary | `text-zeus-text-quaternary` | `#ffffff40` (25%) | Placeholder text |
| text-inverted | `text-zeus-text-inverted` | `#1e1c17` | Text on light backgrounds |
| text-inverted-secondary | `text-zeus-text-inverted-secondary` | `#1e1c1799` (60%) | Secondary inverted text |
| text-disabled | `text-zeus-text-disabled` | `#ffffff1a` (10%) | Disabled state text |

**Example:**
```jsx
<h1 className="text-zeus-text-primary">Main heading</h1>
<p className="text-zeus-text-secondary">Supporting text</p>
<span className="text-zeus-text-tertiary">Hint text</span>
```

#### Icon Colors

| Token Name | Tailwind Class | Value | Usage |
|------------|----------------|-------|-------|
| icon-primary | `text-zeus-icon-primary` | `#ffffff` | Primary icons |
| icon-secondary | `text-zeus-icon-secondary` | `#ffffff99` (60%) | Secondary icons |
| icon-tertiary | `text-zeus-icon-tertiary` | `#ffffff75` (46%) | Tertiary icons |
| icon-inverted | `text-zeus-icon-inverted` | `#1e1c17` | Icons on light backgrounds |
| icon-disabled | `text-zeus-icon-disabled` | `#ffffff1a` (10%) | Disabled icons |

**Example:**
```jsx
<Icon className="text-zeus-icon-primary" />
<Icon className="text-zeus-icon-secondary" />
```

#### Border Colors

| Token Name | Tailwind Class | Value | Usage |
|------------|----------------|-------|-------|
| border-normal | `border-zeus-border-normal` | `#ffffff2e` (18%) | Standard borders |
| border-alpha | `border-zeus-border-alpha` | `#ffffff24` (14%) | Subtle borders |
| border-divider | `border-zeus-border-divider` | `#ffffff24` (14%) | Divider lines |
| border-neutral-subtle | `border-zeus-border-neutral-subtle` | `#ffffff3d` (24%) | Prominent borders |
| border-surface | `border-zeus-border-surface` | `#1e1c17` | Surface-matching borders |
| border-focused | `border-zeus-border-focused` | `#ffffff4d` (30%) | Focus state borders |
| border-disabled | `border-zeus-border-disabled` | `#ffffff0d` (5%) | Disabled state borders |

**Example:**
```jsx
<div className="border border-zeus-border-normal">Standard border</div>
<hr className="border-zeus-border-divider" />
```

#### Button Colors

| Token Name | Tailwind Class | Value | Usage |
|------------|----------------|-------|-------|
| button-secondary | `bg-zeus-button-secondary` | `#2e2b24` | Secondary button background |
| button-tertiary | `bg-zeus-button-tertiary` | `#ffffff14` (8%) | Tertiary/ghost button |
| button-ghost | `bg-zeus-button-ghost` | `transparent` | Ghost button |
| button-disabled | `bg-zeus-button-disabled` | `#ffffff0d` (5%) | Disabled button |

**Example:**
```jsx
<button className="bg-zeus-button-secondary">Secondary Action</button>
<button className="bg-zeus-button-tertiary">Tertiary Action</button>
```

#### Badge Colors

| Token Name | Tailwind Class | Value | Usage |
|------------|----------------|-------|-------|
| badge-surface | `bg-zeus-badge-surface` | `#1f2228` | Default badge surface |
| badge-neutral | `bg-zeus-badge-neutral` | `#2e2b24` | Neutral badge |
| badge-warning | `bg-zeus-badge-warning` | `#2e2319` | Warning badge |
| badge-destructive | `bg-zeus-badge-destructive` | `#2e1b19` | Destructive/error badge |
| badge-info | `bg-zeus-badge-info` | `#1e2228` | Informational badge |
| badge-success | `bg-zeus-badge-success` | `#1e2821` | Success badge |

**Example:**
```jsx
<span className="bg-zeus-badge-success text-zeus-status-success">Active</span>
```

#### Accent Colors

| Token Name | Tailwind Class | Value | Usage |
|------------|----------------|-------|-------|
| accent-red | `bg-zeus-accent-red` / `text-zeus-accent-red` | `#d9281c` | Red accent |
| accent-red-accent | `text-zeus-accent-red-accent` | `#e6483d` | Lighter red |
| accent-red-subtle | `bg-zeus-accent-red-subtle` | `#2e1b19` | Red subtle background |
| accent-orange | `text-zeus-accent-orange` | `#fb9704` | Orange accent |
| accent-orange-subtle | `bg-zeus-accent-orange-subtle` | `#2e2319` | Orange subtle background |
| accent-yellow | `text-zeus-accent-yellow` | `#fdd835` | Yellow accent |
| accent-yellow-subtle | `bg-zeus-accent-yellow-subtle` | `#2e2b19` | Yellow subtle background |
| accent-green | `text-zeus-accent-green` | `#21a65e` | Green accent |
| accent-green-accent | `text-zeus-accent-green-accent` | `#26bd6c` | Lighter green |
| accent-green-subtle | `bg-zeus-accent-green-subtle` | `#1e2821` | Green subtle background |
| accent-blue | `text-zeus-accent-blue` | `#397fb2` | Blue accent |
| accent-blue-accent | `text-zeus-accent-blue-accent` | `#4778f5` | Lighter blue |
| accent-blue-subtle | `bg-zeus-accent-blue-subtle` | `#1e2228` | Blue subtle background |
| accent-purple | `text-zeus-accent-purple` | `#8b5cf6` | Purple accent |
| accent-purple-subtle | `bg-zeus-accent-purple-subtle` | `#251e2e` | Purple subtle background |
| accent-pink | `text-zeus-accent-pink` | `#ec4899` | Pink accent |
| accent-pink-subtle | `bg-zeus-accent-pink-subtle` | `#2e1e28` | Pink subtle background |
| accent-gray | `text-zeus-accent-gray` | `#6b7280` | Gray accent |
| accent-gray-subtle | `bg-zeus-accent-gray-subtle` | `#1f2228` | Gray subtle background |
| accent-purple-new | `text-zeus-accent-purple-new` | `#aa97d3` | New purple variant |
| accent-cyan | `text-zeus-accent-cyan` | `#81d9c3` | Cyan accent |
| accent-pink-new | `text-zeus-accent-pink-new` | `#fd5a91` | New pink variant |

**Example:**
```jsx
<span className="text-zeus-accent-green bg-zeus-accent-green-subtle px-2 py-1 rounded">
  +5.2%
</span>
```

#### Status Colors

| Token Name | Tailwind Class | Value | Usage |
|------------|----------------|-------|-------|
| status-success | `text-zeus-status-success` | `#87d68a` | Success text/icons |
| status-success-secondary | `text-zeus-status-success-secondary` | `#87d68a99` (60%) | Secondary success |
| status-success-subtle | `bg-zeus-status-success-subtle` | `#1e2821` | Success background |
| status-warning | `text-zeus-status-warning` | `#ffa55b` | Warning text/icons |
| status-warning-secondary | `text-zeus-status-warning-secondary` | `#ffa55b99` (60%) | Secondary warning |
| status-warning-subtle | `bg-zeus-status-warning-subtle` | `#2e2319` | Warning background |
| status-destructive | `text-zeus-status-destructive` | `#e75d57` | Destructive text/icons |
| status-destructive-secondary | `text-zeus-status-destructive-secondary` | `#e75d57b2` (70%) | Secondary destructive |
| status-destructive-subtle | `bg-zeus-status-destructive-subtle` | `#2e1b19` | Destructive background |
| status-info | `text-zeus-status-info` | `#6b9dd0` | Info text/icons |
| status-info-secondary | `text-zeus-status-info-secondary` | `#6b9dd099` (60%) | Secondary info |
| status-info-subtle | `bg-zeus-status-info-subtle` | `#1e2228` | Info background |

**Example:**
```jsx
<div className="bg-zeus-status-success-subtle text-zeus-status-success p-3 rounded">
  Transaction successful!
</div>
```

#### Highlight Colors

| Token Name | Tailwind Class | Value | Usage |
|------------|----------------|-------|-------|
| highlight | `text-zeus-highlight` | `#f6e78a` | Primary highlight |
| highlight-secondary | `text-zeus-highlight-secondary` | `#f6e78a99` (60%) | Secondary highlight |
| highlight-gold | `text-zeus-highlight-gold` | `#ECD89B` | Gold highlight |
| highlight-gold-secondary | `text-zeus-highlight-gold-secondary` | `#ECD89B99` (60%) | Secondary gold |

#### Overlay Colors

| Token Name | Tailwind Class | Value | Usage |
|------------|----------------|-------|-------|
| overlay-light | `bg-zeus-overlay-light` | `#ffffff0d` (5%) | Light overlay |
| overlay-medium | `bg-zeus-overlay-medium` | `#ffffff1a` (10%) | Medium overlay |
| overlay-heavy | `bg-zeus-overlay-heavy` | `#ffffff40` (25%) | Heavy overlay |
| overlay-backdrop | `bg-zeus-overlay-backdrop` | `#000000b3` (70%) | Modal backdrop |

#### Gradient Colors

| Token Name | Tailwind Class | Value | Usage |
|------------|----------------|-------|-------|
| gradient-start | `from-zeus-gradient-start` | `#1e1c17` | Gradient start |
| gradient-middle | `via-zeus-gradient-middle` | `#2e2b24` | Gradient middle |
| gradient-end | `to-zeus-gradient-end` | `#3e3a31` | Gradient end |

**Example:**
```jsx
<div className="bg-gradient-to-r from-zeus-gradient-start via-zeus-gradient-middle to-zeus-gradient-end">
  Gradient background
</div>
```

---

### Sedona Brand Colors

The primary brand color palette for Sedona, featuring warm orange tones.

| Token Name | Tailwind Class | Value | Usage |
|------------|----------------|-------|-------|
| sedona-50 | `bg-sedona-50` / `text-sedona-50` | `#fef6ed` | Lightest tint |
| sedona-100 | `bg-sedona-100` | `#fde8d6` | Very light |
| sedona-200 | `bg-sedona-200` | `#fbcdab` | Light |
| sedona-300 | `bg-sedona-300` | `#f8aa76` | Light accent |
| sedona-400 | `bg-sedona-400` | `#f4803e` | Medium light |
| sedona-500 (primary) | `bg-sedona-500` / `text-sedona-500` | `#D56B12` | **Primary brand color** |
| sedona-600 | `bg-sedona-600` | `#c26012` | Medium dark |
| sedona-700 | `bg-sedona-700` | `#a24d10` | Dark |
| sedona-800 | `bg-sedona-800` | `#833f0e` | Darker |
| sedona-900 | `bg-sedona-900` | `#6b340c` | Darkest |
| sedona-primary | `bg-sedona-primary` | `#D56B12` | Semantic primary |

**Example:**
```jsx
<button className="bg-sedona-500 hover:bg-sedona-600 text-white">
  Primary Action
</button>
```

---

### Semantic Colors

These are 5-step color scales for consistent status and feedback colors.

#### Neutral Scale

| Token | Tailwind Class | Value |
|-------|----------------|-------|
| neutral-50 | `bg-neutral-50` | `#4a463d` |
| neutral-100 | `bg-neutral-100` | `#3e3a31` |
| neutral-200 | `bg-neutral-200` | `#363229` |
| neutral-300 | `bg-neutral-300` | `#2e2b24` |
| neutral-400 | `bg-neutral-400` | `#262320` |
| neutral-500 | `bg-neutral-500` | `#1e1c17` |
| neutral-600 | `bg-neutral-600` | `#1a1915` |
| neutral-700 | `bg-neutral-700` | `#171512` |
| neutral-800 | `bg-neutral-800` | `#141210` |
| neutral-900 | `bg-neutral-900` | `#141310` |
| neutral-950 | `bg-neutral-950` | `#0d0c0a` |

#### Success Scale

| Token | Tailwind Class | Value |
|-------|----------------|-------|
| success-50 | `bg-success-50` | `#f0fdf4` |
| success-100 | `bg-success-100` | `#dcfce7` |
| success-200 | `bg-success-200` | `#bbf7d0` |
| success-300 | `bg-success-300` | `#86efac` |
| success-400 | `bg-success-400` | `#4ade80` |
| success-500 | `bg-success-500` | `#22c55e` |
| success-600 | `bg-success-600` | `#16a34a` |
| success-700 | `bg-success-700` | `#15803d` |
| success-800 | `bg-success-800` | `#166534` |
| success-900 | `bg-success-900` | `#14532d` |
| success-950 | `bg-success-950` | `#052e16` |

#### Warning Scale

| Token | Tailwind Class | Value |
|-------|----------------|-------|
| warning-50 | `bg-warning-50` | `#fefce8` |
| warning-500 | `bg-warning-500` | `#eab308` |
| warning-900 | `bg-warning-900` | `#713f12` |

#### Error Scale

| Token | Tailwind Class | Value |
|-------|----------------|-------|
| error-50 | `bg-error-50` | `#fef2f2` |
| error-500 | `bg-error-500` | `#ef4444` |
| error-900 | `bg-error-900` | `#7f1d1d` |

#### Info Scale

| Token | Tailwind Class | Value |
|-------|----------------|-------|
| info-50 | `bg-info-50` | `#eff6ff` |
| info-500 | `bg-info-500` | `#3b82f6` |
| info-900 | `bg-info-900` | `#1e3a8a` |

---

### CSS Custom Properties

CSS variables defined in `globals.css` for theming support.

#### Light Theme (`:root`)

| CSS Variable | HSL Value | Usage |
|--------------|-----------|-------|
| `--background` | `0 0% 100%` | Page background |
| `--foreground` | `12 5% 11%` | Primary text |
| `--card` | `0 0% 100%` | Card background |
| `--card-foreground` | `12 5% 11%` | Card text |
| `--popover` | `0 0% 100%` | Popover background |
| `--popover-foreground` | `12 5% 11%` | Popover text |
| `--primary` | `0 0% 20%` | Primary actions |
| `--primary-foreground` | `0 0% 100%` | Primary action text |
| `--secondary` | `0 0% 96%` | Secondary surfaces |
| `--secondary-foreground` | `12 5% 11%` | Secondary text |
| `--muted` | `0 0% 96%` | Muted surfaces |
| `--muted-foreground` | `0 0% 45%` | Muted text |
| `--accent` | `0 0% 96%` | Accent surfaces |
| `--accent-foreground` | `12 5% 11%` | Accent text |
| `--destructive` | `4 87% 56%` | Destructive actions |
| `--destructive-foreground` | `0 0% 100%` | Destructive text |
| `--border` | `0 0% 90%` | Border color |
| `--input` | `0 0% 90%` | Input border |
| `--ring` | `25 100% 43%` | Focus ring |
| `--radius` | `0.5rem` | Base border radius |
| `--hover-bg` | `0 0% 96%` | Hover background |
| `--active-bg` | `0 0% 92%` | Active background |
| `--focus-ring` | `25 100% 43% / 0.4` | Focus ring with opacity |
| `--disabled-opacity` | `0.5` | Disabled state opacity |
| `--sedona-hover` | `25 100% 40%` | Sedona hover state |
| `--sedona-active` | `25 100% 35%` | Sedona active state |

#### Dark Theme (`.dark`)

| CSS Variable | HSL Value | Usage |
|--------------|-----------|-------|
| `--background` | `20 8% 7%` | Page background |
| `--foreground` | `0 0% 100%` | Primary text |
| `--card` | `20 8% 11%` | Card background |
| `--card-foreground` | `0 0% 100%` | Card text |
| `--popover` | `20 8% 11%` | Popover background |
| `--popover-foreground` | `0 0% 100%` | Popover text |
| `--primary` | `0 0% 95%` | Primary actions |
| `--primary-foreground` | `0 0% 10%` | Primary action text |
| `--secondary` | `20 8% 16%` | Secondary surfaces |
| `--secondary-foreground` | `0 0% 100%` | Secondary text |
| `--muted` | `26 12% 20%` | Muted surfaces |
| `--muted-foreground` | `0 0% 60%` | Muted text |
| `--accent` | `26 12% 20%` | Accent surfaces |
| `--accent-foreground` | `0 0% 100%` | Accent text |
| `--destructive` | `6 91% 46%` | Destructive actions |
| `--destructive-foreground` | `0 0% 100%` | Destructive text |
| `--border` | `0 0% 100% / 0.14` | Border color |
| `--input` | `0 0% 100% / 0.18` | Input border |
| `--ring` | `25 100% 43%` | Focus ring |
| `--hover-bg` | `0 0% 100% / 0.08` | Hover background |
| `--active-bg` | `0 0% 100% / 0.12` | Active background |
| `--focus-ring` | `25 100% 50% / 0.5` | Focus ring with opacity |
| `--disabled-opacity` | `0.4` | Disabled state opacity |
| `--sedona-hover` | `25 100% 50%` | Sedona hover state |
| `--sedona-active` | `25 100% 55%` | Sedona active state |

**Usage with Tailwind:**
```jsx
<div className="bg-background text-foreground">
  <button className="bg-primary text-primary-foreground">Button</button>
</div>
```

---

## Typography

### Font Families

| Token Name | Tailwind Class | Font Stack | Usage |
|------------|----------------|------------|-------|
| sans | `font-sans` | `var(--font-geist-sans), Geist, ui-sans-serif, system-ui` | Default body text |
| mono | `font-mono` | `JetBrains Mono, Source Code Pro, Fira Code, ui-monospace, monospace` | Code, numbers |
| souvenir | `font-souvenir` | `Souvenir, Georgia, serif` | Display, branding |
| grotesk | `font-grotesk` | `Monument Grotesk, Geist, ui-sans-serif, system-ui` | Headlines, UI |

**Font Weights Available:**

| Font Family | Available Weights |
|-------------|-------------------|
| Souvenir | 400 (normal), 700 (bold), italic variants |
| Monument Grotesk | 300 (light), 400 (normal), 500 (medium), italic variants |
| JetBrains Mono | 400, 500, 600, 700 |

**Example:**
```jsx
<h1 className="font-grotesk font-medium">Headline</h1>
<p className="font-sans">Body text</p>
<code className="font-mono">Code snippet</code>
<span className="font-souvenir">Brand element</span>
```

### Font Sizes

Complete typography scale with line heights and letter spacing.

#### Captions

| Token | Tailwind Class | Size | Line Height | Letter Spacing |
|-------|----------------|------|-------------|----------------|
| caption-s | `text-caption-s` | 10px | 14px | 0 |
| caption-m | `text-caption-m` | 12px | 16px | 0 |
| caption-l | `text-caption-l` | 14px | 20px | -0.1px |

#### Body Text

| Token | Tailwind Class | Size | Line Height | Letter Spacing |
|-------|----------------|------|-------------|----------------|
| body-s | `text-body-s` | 16px | 24px | -0.2px |
| body-m | `text-body-m` | 18px | 26px | -0.2px |

#### Headings

| Token | Tailwind Class | Size | Line Height | Letter Spacing | Font Weight |
|-------|----------------|------|-------------|----------------|-------------|
| heading-xs | `text-heading-xs` | 18px | 24px | -0.3px | 600 |
| heading-sm | `text-heading-sm` | 20px | 28px | -0.3px | 600 |
| heading-md | `text-heading-md` | 24px | 32px | -0.4px | 600 |
| heading-lg | `text-heading-lg` | 30px | 36px | -0.5px | 700 |
| heading-xl | `text-heading-xl` | 36px | 44px | -0.6px | 700 |

#### Display (Hero Text)

| Token | Tailwind Class | Size | Line Height | Letter Spacing | Font Weight |
|-------|----------------|------|-------------|----------------|-------------|
| display-sm | `text-display-sm` | 42px | 48px | -0.8px | 700 |
| display-md | `text-display-md` | 48px | 56px | -1px | 700 |
| display-lg | `text-display-lg` | 60px | 68px | -1.2px | 700 |

**Example:**
```jsx
<h1 className="text-display-lg font-grotesk">Hero Headline</h1>
<h2 className="text-heading-xl">Section Title</h2>
<h3 className="text-heading-md">Subsection</h3>
<p className="text-body-s">Body paragraph text</p>
<span className="text-caption-m">Caption or label</span>
```

### Font Weights

| Token | Tailwind Class | Value |
|-------|----------------|-------|
| regular | `font-regular` | 400 |
| medium | `font-medium` | 500 |
| semibold | `font-semibold` | 600 |
| bold | `font-bold` | 700 |

---

## Spacing

The spacing scale follows a 4px base grid system.

| Token | Tailwind Class | Value | Pixels |
|-------|----------------|-------|--------|
| 0 | `p-0`, `m-0`, `gap-0` | 0 | 0px |
| 0.5 | `p-0.5`, `m-0.5`, `gap-0.5` | 2px | 2px |
| 1 | `p-1`, `m-1`, `gap-1` | 4px | 4px |
| 1.5 | `p-1.5`, `m-1.5`, `gap-1.5` | 6px | 6px |
| 2 | `p-2`, `m-2`, `gap-2` | 8px | 8px |
| 2.5 | `p-2.5`, `m-2.5`, `gap-2.5` | 10px | 10px |
| 3 | `p-3`, `m-3`, `gap-3` | 12px | 12px |
| 3.5 | `p-3.5`, `m-3.5`, `gap-3.5` | 14px | 14px |
| 4 | `p-4`, `m-4`, `gap-4` | 16px | 16px |
| 5 | `p-5`, `m-5`, `gap-5` | 20px | 20px |
| 6 | `p-6`, `m-6`, `gap-6` | 24px | 24px |
| 7 | `p-7`, `m-7`, `gap-7` | 28px | 28px |
| 8 | `p-8`, `m-8`, `gap-8` | 32px | 32px |
| 9 | `p-9`, `m-9`, `gap-9` | 36px | 36px |
| 10 | `p-10`, `m-10`, `gap-10` | 40px | 40px |
| 12 | `p-12`, `m-12`, `gap-12` | 48px | 48px |
| 14 | `p-14`, `m-14`, `gap-14` | 56px | 56px |
| 16 | `p-16`, `m-16`, `gap-16` | 64px | 64px |
| 20 | `p-20`, `m-20`, `gap-20` | 80px | 80px |
| 24 | `p-24`, `m-24`, `gap-24` | 96px | 96px |
| 28 | `p-28`, `m-28`, `gap-28` | 112px | 112px |
| 32 | `p-32`, `m-32`, `gap-32` | 128px | 128px |
| 36 | `p-36`, `m-36`, `gap-36` | 144px | 144px |
| 40 | `p-40`, `m-40`, `gap-40` | 160px | 160px |

**Example:**
```jsx
<div className="p-4 mb-6 gap-3">
  <div className="p-2">Compact padding</div>
  <div className="p-6">Standard padding</div>
</div>
```

---

## Borders & Radius

### Border Radius

| Token | Tailwind Class | Value | Usage |
|-------|----------------|-------|-------|
| none | `rounded-none` | 0 | No rounding |
| xs | `rounded-xs` | 4px | Extra small elements |
| sm | `rounded-sm` | 4px | Small elements |
| md | `rounded-md` | 8px | Medium elements |
| lg | `rounded-lg` | `var(--radius)` (0.5rem) | Large elements |
| xl | `rounded-xl` | 10px | Buttons, cards |
| full | `rounded-full` | 999px | Pills, avatars |

**Example:**
```jsx
<button className="rounded-xl px-4 py-2">Button</button>
<div className="rounded-md p-4">Card</div>
<span className="rounded-full px-3 py-1">Badge</span>
```

---

## Shadows

### Elevation Shadows

| Token | Tailwind Class | Value | Usage |
|-------|----------------|-------|-------|
| xs | `shadow-xs` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | Subtle elevation |
| sm | `shadow-sm` | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` | Low elevation |
| DEFAULT | `shadow` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` | Standard elevation |
| md | `shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` | Medium elevation |
| lg | `shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` | High elevation |
| xl | `shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` | Very high elevation |
| 2xl | `shadow-2xl` | `0 25px 50px -12px rgb(0 0 0 / 0.25)` | Maximum elevation |
| none | `shadow-none` | none | No shadow |

### Glow Effects

| Token | Tailwind Class | Value | Usage |
|-------|----------------|-------|-------|
| glow-sm | `shadow-glow-sm` | `0 0 10px 0 rgb(222 112 1 / 0.3)` | Subtle brand glow |
| glow | `shadow-glow` | `0 0 20px 0 rgb(222 112 1 / 0.4)` | Standard brand glow |
| glow-lg | `shadow-glow-lg` | `0 0 30px 0 rgb(222 112 1 / 0.5)` | Large brand glow |

### Inset Shadows

| Token | Tailwind Class | Value | Usage |
|-------|----------------|-------|-------|
| inner | `shadow-inner` | `inset 0 2px 4px 0 rgb(0 0 0 / 0.05)` | Standard inset |
| inner-lg | `shadow-inner-lg` | `inset 0 4px 8px 0 rgb(0 0 0 / 0.1)` | Deep inset |

**Example:**
```jsx
<div className="shadow-md rounded-lg p-4">Standard card</div>
<button className="shadow-glow hover:shadow-glow-lg">Glowing button</button>
<input className="shadow-inner bg-zeus-surface-neutral" />
```

### Elevation Utility Classes

Combined background + shadow classes defined in `globals.css`:

| Class | Composition | Usage |
|-------|-------------|-------|
| `elevation-0` | `bg-background shadow-none` | Flat/embedded |
| `elevation-1` | `bg-card shadow-sm` | Low elevation |
| `elevation-2` | `bg-card shadow-md` | Medium elevation |
| `elevation-3` | `bg-card shadow-lg` | High elevation |

---

## Breakpoints

### Container

The container is configured with:
- Center alignment
- 2rem padding
- Max width: 1400px at 2xl breakpoint

```jsx
<div className="container">
  Content with responsive padding and max-width
</div>
```

### Default Tailwind Breakpoints

| Breakpoint | Min Width | Class Prefix |
|------------|-----------|--------------|
| sm | 640px | `sm:` |
| md | 768px | `md:` |
| lg | 1024px | `lg:` |
| xl | 1280px | `xl:` |
| 2xl | 1400px (custom) | `2xl:` |

**Example:**
```jsx
<div className="text-body-s md:text-body-m lg:text-heading-md">
  Responsive text
</div>
```

---

## Animation

### Keyframes

| Animation Name | Description |
|----------------|-------------|
| `accordion-down` | Expand accordion content from height 0 |
| `accordion-up` | Collapse accordion content to height 0 |
| `marquee` | Continuous horizontal scroll (20s) |
| `scan-x` | Horizontal scanning effect |
| `scan-y` | Vertical scanning effect |
| `shimmer` | Loading shimmer effect |

### Animation Classes

| Tailwind Class | Duration | Timing | Usage |
|----------------|----------|--------|-------|
| `animate-accordion-down` | 0.2s | ease-out | Accordion expand |
| `animate-accordion-up` | 0.2s | ease-out | Accordion collapse |
| `animate-marquee` | 20s | linear | Ticker/marquee |
| `animate-scan-x` | 1.5s | ease-in-out | Horizontal scan |
| `animate-scan-y` | 2s | ease-in-out | Vertical scan |
| `animate-shimmer` | 3s | - | Loading shimmer |

### Transition Utilities

Custom transition presets defined in `globals.css`:

| Class | Composition | Usage |
|-------|-------------|-------|
| `transition-fast` | `transition-all duration-150 ease-out` | Quick interactions |
| `transition-normal` | `transition-all duration-200 ease-out` | Standard interactions |
| `transition-slow` | `transition-all duration-300 ease-out` | Deliberate animations |

**Example:**
```jsx
<button className="transition-normal hover:bg-zeus-button-secondary">
  Hover me
</button>

<div className="animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent">
  Loading state
</div>
```

---

## Utility Classes

### Interactive States

The `interactive` class provides consistent hover and active states:

```css
.interactive {
  @apply transition-normal cursor-pointer;
}
.interactive:hover {
  background-color: hsl(var(--hover-bg));
}
.interactive:active {
  background-color: hsl(var(--active-bg));
}
```

**Usage:**
```jsx
<button className="interactive p-2 rounded">Clickable element</button>
```

### Text Utilities

| Class | Description |
|-------|-------------|
| `text-balance` | Apply `text-wrap: balance` for better headline wrapping |
| `text-gradient` | Apply `bg-clip-text text-transparent` for gradient text |
| `gradient-sedona` | Sedona brand gradient (`from-sedona-400 to-sedona-600`) |

**Example:**
```jsx
<h1 className="text-gradient gradient-sedona text-display-lg">
  Gradient Headline
</h1>
```

### Scrollbar Utilities

| Class | Description |
|-------|-------------|
| `scrollbar-hide` | Hide scrollbar while maintaining functionality |
| `scrollbar-thin` | Thin, styled scrollbar (6px width) |

**Example:**
```jsx
<div className="overflow-auto scrollbar-thin h-64">
  Scrollable content with thin scrollbar
</div>

<div className="overflow-auto scrollbar-hide">
  Scrollable content without visible scrollbar
</div>
```

---

## Quick Reference

### Most Common Tokens

**Backgrounds:**
- Page: `bg-zeus-surface-default` or `bg-background`
- Cards: `bg-zeus-surface-elevated` or `bg-card`
- Interactive: `bg-zeus-surface-neutral`

**Text:**
- Primary: `text-zeus-text-primary` or `text-foreground`
- Secondary: `text-zeus-text-secondary`
- Muted: `text-muted-foreground`

**Borders:**
- Standard: `border-zeus-border-normal` or `border-border`
- Subtle: `border-zeus-border-alpha`

**Status Indicators:**
- Success: `text-zeus-status-success bg-zeus-status-success-subtle`
- Warning: `text-zeus-status-warning bg-zeus-status-warning-subtle`
- Error: `text-zeus-status-destructive bg-zeus-status-destructive-subtle`
- Info: `text-zeus-status-info bg-zeus-status-info-subtle`

**Typography:**
- Headlines: `font-grotesk text-heading-*`
- Body: `font-sans text-body-*`
- Code: `font-mono text-caption-*`
- Brand: `font-souvenir`

---

## File References

- **Tailwind Configuration:** `/tailwind.config.ts`
- **Global CSS:** `/src/app/globals.css`
- **Theme Toggle Component:** `/src/components/sedona/theme-toggle.tsx`
