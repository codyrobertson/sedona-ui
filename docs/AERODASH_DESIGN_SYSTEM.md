# AeroDash Design System

AeroDash is the active Sedona product design system in this repo. It lives in
`src/components/aerodash` and is exported through `@/components/aerodash`.

The older `src/components/ui` and Zeus docs still exist for legacy surfaces and
registry work. New Sedona app chrome, trading dashboards, product headers, and
competition screens should use AeroDash unless a PR is explicitly scoped to the
legacy kit.

## Source Of Truth

| Layer | File | Rule |
| --- | --- | --- |
| Public API | `src/components/aerodash/index.ts` | Every supported value export leaves through this barrel. |
| Inventory | `src/components/aerodash/manifest.ts` | Every component, utility, source file, CSS entrypoint, and public export is listed here. |
| Tokens | `src/components/aerodash/tokens.ts` | Runtime tokens for fonts, type, color, radius, and motion. |
| Shared CSS | `src/components/aerodash/aerodash.css` | Shared focus, typography, numeric, and toggle-state behavior. |
| Playground | `src/app/aerodash/page.tsx` | Visual reference for live examples and composition patterns. |
| Audit | `scripts/audit-aerodash.mjs` | Enforces manifest, source, CSS, and barrel consistency. |

Run the contract check before opening design-system PRs:

```bash
npm run design-system:audit
npm run test:run -- src/components/aerodash
npm run type-check
```

## Design Language

AeroDash is a dense y2k chrome system for product UI, not a marketing kit. The
visual language is defined by hard ink borders, cyan focus, offset underlays,
clipped chrome tags, tabular numeric displays, and compact uppercase control
labels. Components should feel operational and scan-friendly.

Use cards for individual repeated objects, modals, or framed tool surfaces. Do
not put page sections inside decorative cards. Keep shell and layout surfaces
unframed unless the component itself owns a frame.

Primary dimensions should be stable. Controls, metric strips, tables, tabs,
rails, and icon cells should not resize when text, hover state, loading state,
or selected state changes.

## Foundations

Tokens are exported from `tokens.ts` and re-exported from the barrel:

| Token group | Exports | Use |
| --- | --- | --- |
| Fonts | `fonts` | `sans` for product text, `display` for chrome/KPI labels, `mono` for code and tabular data. |
| Type | `fontSize`, `lineHeight`, `fontWeight`, `letterSpacing` | Product UI scale from 10px micro labels to 44px display. |
| Color | `colors` | Ink, paper, canvas, cyan, pink, warning, green, orange, muted, and line tokens. |
| Radius | `radii` | `xs` through `xl`, with `lg` capped at 8px for most component cards. |
| Motion | `motion` | Short UI transitions only; avoid decorative motion in dense surfaces. |

CSS custom properties in `aerodash.css` mirror core typography choices for
component islands and portaled overlays. If a token changes, update both
`tokens.ts` and the matching CSS mirror when the CSS layer consumes it.

## Component Inventory

The canonical inventory is exported as `aerodashComponents`. It currently
covers:

| Category | Entries |
| --- | --- |
| Foundation | Tokens |
| Primitive | Button, SectionHeader, Chip, Card, Avatar |
| Form | Input, SegmentedControl, Switch, Checkbox, RadioGroup, Select, Combobox |
| Overlay | Dialog, Tooltip, DropdownMenu |
| Feedback | Skeleton, Progress, Alert, Toast |
| Data | Table, DataTable, DataTable Core, DataTable State |
| Navigation | Tabs, TopNav, SideRail |
| Shell | TitleBlock, AppShell, HeaderBar, StatsBar |
| Utility | Chrome, IconTile, useControllableState |

When adding or removing a component:

1. Add or update the source file in `src/components/aerodash`.
2. Add or update its local CSS import if it has component-specific state.
3. Export the supported public values from `index.ts`.
4. Update `aerodashComponents` in `manifest.ts`.
5. Add focused tests for behavior or state logic.
6. Run `npm run design-system:audit`, `npm run test:run -- src/components/aerodash`, and `npm run type-check`.

## API Rules

Prefer named compound exports over dot notation. This keeps the public API
compatible with server/client boundaries and mirrors the current component
style:

```tsx
import { Button, ButtonRoot, ButtonInner, ButtonLabel } from "@/components/aerodash"
```

Use shorthand components for common cases and compound parts when layout needs
explicit anatomy:

```tsx
<Button variant="primary" icon={icon}>
  Execute
</Button>

<ButtonRoot variant="secondary">
  <ButtonInner>
    <ButtonLabel>Review</ButtonLabel>
  </ButtonInner>
</ButtonRoot>
```

Every exported interactive primitive needs an accessible native element or
Radix primitive underneath it. Use `data-ad-*` attributes for system CSS hooks
and visual regression selectors.

## Styling Rules

Component CSS lives beside the component. Shared behavior belongs in
`aerodash.css` only when multiple components consume it, such as focus rings,
font setup, numeric rendering, and shared toggle states.

Keep component CSS imported by the component that owns it. The audit verifies
that manifest CSS and actual imports match.

Avoid one-off Tailwind styling inside product surfaces when an AeroDash
primitive exists. The `src/app/aerodash/page.tsx` playground can use local demo
layout, but production pages should compose primitives rather than reimplement
their chrome.

## PR Readiness

Design-system PRs should be small enough to review in isolation:

| PR type | Scope |
| --- | --- |
| Foundations | Tokens, shared CSS, docs, audit changes. |
| Primitive | One component family plus tests and playground examples. |
| Composite | Shell, page layout, or data component integrations. |
| Migration | One app route or feature surface moved from legacy UI to AeroDash. |

Each PR should say which manifest entries changed, whether CSS entrypoints
changed, which playground sections prove the work, and which commands passed.
