# Onboarding Redesign — Linear Flow with Spotlight Tour

## Summary

Replace the current 3-step pick-any checklist with a linear onboarding flow:
Entry Sheet → Complete Profile → Spotlight Tour → Goal Action → Done.

## Flow

```
First visit → Welcome Sheet → /onboarding/profile → Spotlight Tour (trading page) → Goal Action → Completed
```

User moves sequentially. No branching, no checklist. Skip at any point = done, no further nudging.

## Phase 1: Entry Sheet (revised FirstRunSheet)

Single welcome message with one CTA. Replaces the current 3-card layout.

- "Welcome to Sedona" + brief tagline
- **"Get Started"** button → routes to `/onboarding/profile`
- "Skip for now" → marks onboarding complete, no further prompts

## Phase 2: Complete Profile (`/onboarding/profile`)

Dedicated page mirroring profile fields. Focused, no distractions.

**Included fields:**
- Display Name, Email, Bio
- Social Links (Twitter, Discord, Telegram, GitHub)
- Hugging Face connection
- Communication Preferences

**Excluded:**
- GPU Instances section
- Header navigation / platform stats / marquee ticker
- Any non-profile content

**Behavior:**
- Clean, focused layout with progress indicator ("Step 1 of 2")
- On save → auto-advance immediately to spotlight tour (no intermediate state)
- Routes user to `/trading` and initiates tour

## Phase 3: Spotlight Tour

Tooltip/spotlight overlay on the live trading page. Five stops:

| # | Stop | Target Element | Copy |
|---|------|---------------|------|
| 1 | The Market | Leaderboard/agent table | "AI agents are traded here. Each has a live price driven by supply and demand." |
| 2 | Agent Economics | Agent card/row | "Every agent is a token. Buy in when you believe in its potential — price rises with demand." |
| 3 | Competitions | Competition section | "Agents compete in timed rounds. Winners earn jackpots, and their holders profit." |
| 4 | Launching Agents | Create Agent button | "Create your own AI agent — connect a model, set a ticker, and go live." |
| 5 | Your Portfolio | Portfolio nav link | "Track your holdings, P&L, and launched agents in one place." |

Each stop: highlight target element, show tooltip with copy, "Next" / "Skip tour" buttons.

Skippable at any point. Skipping = onboarding complete.

## Phase 4: Goal Action

After the last tour stop (or skip), show a final prompt.

- **Admin-configurable** action via flag (e.g., `onboarding_goal_action`)
- Possible values: `"trade"`, `"create_agent"`, `"view_agent"`, etc.
- Default: "Make your first trade"
- **One-shot** — onboarding marked complete regardless of whether user completes the action
- PostHog tracking on variant shown + conversion

## State Model

Replace the 3-step checklist with a linear phase model:

```typescript
type OnboardingPhase = "welcome" | "profile" | "tour" | "goal" | "completed"

interface OnboardingState {
  currentPhase: OnboardingPhase
  completedAt: string | null      // ISO timestamp
  skippedAt: string | null        // ISO timestamp + which phase
  profileCompletedAt: string | null
  tourStepsViewed: number[]       // indices of viewed tour stops
  goalVariant: string | null      // which goal action was shown
  goalCompleted: boolean
}
```

Storage: localStorage key `sedona_onboarding_v2` (new key to avoid migration issues with v1).

## Analytics (PostHog)

| Event | Properties | When |
|-------|-----------|------|
| `onboarding_started` | — | Entry sheet shown |
| `onboarding_skipped` | `phase` | Skip at any phase |
| `onboarding_profile_completed` | — | Profile saved |
| `onboarding_tour_started` | — | First tour stop shown |
| `onboarding_tour_step_viewed` | `step_index`, `step_name` | Each tour stop |
| `onboarding_tour_skipped` | `last_step_index` | Skip during tour |
| `onboarding_tour_completed` | — | All 5 stops viewed |
| `onboarding_goal_shown` | `variant` | Goal action prompt shown |
| `onboarding_goal_completed` | `variant`, `action` | User completes goal |
| `onboarding_completed` | `path` (full/skipped/partial) | Full flow done |

## What Gets Removed

- 3-card checklist in `FirstRunSheet`
- `explore_agents` / `open_profile` / `give_feedback` step model
- Portfolio/profile contextual "finish onboarding" banners
- Feedback as an onboarding step (feedback stays in-app, not onboarding)
- `sedona_onboarding_state` localStorage key (superseded by v2)

## What Gets Added

- `/onboarding/profile` route + page component
- Spotlight tour component (overlay + tooltip system)
- Goal action prompt component
- Admin goal action flag configuration
- New onboarding storage module (v2)
- New onboarding context (v2)
- PostHog event integration

## Dependencies

- No new packages required for spotlight tour (custom implementation with portal + overlay)
- PostHog SDK (check if already integrated or needs adding)
