# PRD: Sedona Branding Mini-Site

**Version:** 1.0
**Date:** January 2026
**Author:** Design Systems Team
**Status:** Draft

---

## 1. Overview

The Sedona Branding Mini-Site is a multi-page brand portal integrated within the existing Sedona UI Kit repository. It serves as the authoritative source for brand guidelines, downloadable assets, and usage examples for the Sedona AI agent marketplace platform. This internal resource enables designers, developers, and partners to access and correctly implement Sedona's visual identity across all touchpoints.

---

## 2. Problem Statement

Currently, brand guidelines exist only as a static markdown file (`docs/BRAND_GUIDELINES.md`) with no interactive exploration, live component previews, or streamlined asset download capabilities. Teams waste time hunting for correct color values, logo files, and typography specifications. There is no single "source of truth" that combines documentation with live examples and downloadable press kit materials. This leads to inconsistent brand application across marketing, product, and partner channels.

---

## 3. Success Criteria

- **Adoption Rate:** 80% of internal design/dev requests for brand assets are fulfilled through the mini-site within 30 days of launch
- **Time Savings:** Reduce average time to locate brand assets from ~15 minutes to under 2 minutes
- **Consistency Score:** Decrease brand inconsistency reports by 50% in the quarter following launch
- **Download Metrics:** Track and achieve 100+ unique asset downloads in the first month
- **Page Performance:** All pages achieve Lighthouse performance score > 90
- **Accessibility:** All pages meet WCAG 2.1 AA compliance

---

## 4. Scope

### In Scope

- **Brand Overview Page** - Mission, personality, pillars, brand essence
- **Logo & Identity Page** - Logo variants, usage guidelines, clear space rules, do's/don'ts with live SVG previews
- **Color System Page** - Interactive color palette with copy-to-clipboard hex/RGB/HSL values, accessibility checker
- **Typography Page** - Font specimens, type scale demonstration, live text rendering for all font families
- **Voice & Tone Page** - Writing guidelines, terminology, example copy templates
- **Visual Patterns Page** - Gradients, textures, shadows, border treatments with live CSS/Tailwind code
- **Press Kit Page** - Downloadable ZIP bundles, individual asset downloads, boilerplate text
- **Social Templates Page** - Twitter/X, Discord templates with copy functionality
- **Component Showcase** - Integration with existing `/styleguide` showing brand-compliant components

### Out of Scope

- External partner portal with authentication
- Real-time Figma plugin sync (existing plugin is separate)
- Brand asset generation tools (e.g., OG image generator - already exists at `/og-render`)
- Multi-language/internationalization
- Version history/changelog tracking within the mini-site
- User accounts or personalized experiences

---

## 5. Technical Requirements

### Stack Alignment
- **Framework:** Next.js 14 (App Router) - already in use
- **Styling:** Tailwind CSS with existing Zeus design system tokens
- **Components:** shadcn/ui + custom Sedona components
- **Icons:** Font Awesome Pro Sharp Solid (already configured)
- **Fonts:** Souvenir, Monument Grotesk, Geist, JetBrains Mono (already loaded)

### New Dependencies Required
- `jszip` - For generating downloadable ZIP archives client-side
- `file-saver` - For triggering file downloads
- `react-syntax-highlighter` or `shiki` - For code snippet display

### File Structure
```
src/app/brand/
├── page.tsx                    # Brand overview (landing)
├── layout.tsx                  # Brand section layout with navigation
├── logo/
│   └── page.tsx               # Logo & identity
├── colors/
│   └── page.tsx               # Color system
├── typography/
│   └── page.tsx               # Typography specimens
├── voice/
│   └── page.tsx               # Voice & tone guidelines
├── patterns/
│   └── page.tsx               # Visual patterns
├── press-kit/
│   └── page.tsx               # Press kit downloads
├── social/
│   └── page.tsx               # Social media templates
└── components/
    ├── BrandNav.tsx           # Side navigation component
    ├── ColorSwatch.tsx        # Interactive color display
    ├── FontSpecimen.tsx       # Typography preview
    ├── DownloadButton.tsx     # Asset download handler
    ├── CodeBlock.tsx          # Syntax-highlighted code
    ├── CopyButton.tsx         # Copy-to-clipboard utility
    └── AssetCard.tsx          # Downloadable asset card
```

### Asset Requirements
Prepare the following downloadable assets in `/public/brand-assets/`:
```
/public/brand-assets/
├── logos/
│   ├── sedona-logo-primary.svg
│   ├── sedona-logo-primary.png (1x, 2x, 4x)
│   ├── sedona-logo-inverted.svg
│   ├── sedona-logo-inverted.png (1x, 2x, 4x)
│   ├── sedona-logo-mono-white.svg
│   ├── sedona-logo-mono-dark.svg
│   ├── sedona-icon-only.svg
│   └── sedona-wordmark.svg
├── colors/
│   └── sedona-color-palette.ase (Adobe Swatch)
├── fonts/
│   └── README-fonts.txt (licensing info, download links)
├── social/
│   ├── twitter-header-template.png
│   ├── discord-banner-template.png
│   └── og-template.png
├── screenshots/
│   ├── app-screenshot-trading.png
│   ├── app-screenshot-arena.png
│   └── app-screenshot-agent.png
└── press-kit-full.zip          # Complete bundle
```

### Performance Requirements
- Lazy load images and heavy assets
- Use Next.js Image component with proper sizing
- Implement skeleton loading states
- Bundle size for brand pages < 200KB (excluding assets)

### SEO Requirements
- Proper metadata for each brand page
- JSON-LD structured data for organization
- Canonical URLs
- robots.txt allowance (or noindex for internal-only)

---

## 6. User Stories

### Designers
- As a **designer**, I want to quickly copy exact color values (hex, RGB, HSL) so that I can use them in Figma without manual conversion
- As a **designer**, I want to see font specimens with all weights and styles so that I understand the complete typography system
- As a **designer**, I want to download logo files in multiple formats so that I have the right file for any use case

### Developers
- As a **developer**, I want copy-paste Tailwind classes for colors so that I can implement brand colors without looking up values
- As a **developer**, I want to see live code examples for gradients and shadows so that I can replicate them exactly
- As a **developer**, I want TypeScript token definitions so that I can ensure type-safe brand consistency

### Marketing/Content
- As a **marketing team member**, I want ready-to-use social media templates so that I can create on-brand posts quickly
- As a **content writer**, I want voice & tone guidelines with examples so that I write copy that matches the Sedona personality
- As a **PR manager**, I want a downloadable press kit with all assets so that I can respond to media requests immediately

### Partners
- As an **external partner**, I want clear logo usage guidelines so that I represent Sedona correctly in co-branded materials
- As an **integration partner**, I want brand colors and assets so that I can build experiences consistent with Sedona

---

## 7. Acceptance Criteria

### Brand Overview Page
- [ ] Displays brand mission, essence, and pillars
- [ ] Shows brand personality attributes with descriptions
- [ ] Links to all sub-pages via clear navigation
- [ ] Hero section uses Sedona branding (orange, dark theme)

### Logo & Identity Page
- [ ] Displays all logo variants (primary, inverted, monochrome)
- [ ] Interactive logo viewer with zoom and background toggle
- [ ] Clear space visualization diagram
- [ ] Minimum size specifications displayed
- [ ] Do's and Don'ts gallery with visual examples
- [ ] Download buttons for each logo variant (SVG, PNG)

### Color System Page
- [ ] Interactive color palette with all Sedona and Zeus colors
- [ ] Click-to-copy functionality for hex, RGB, HSL, Tailwind class
- [ ] Contrast checker showing accessibility compliance
- [ ] Visual examples of color combinations
- [ ] Copy-paste CSS variables and Sass variables

### Typography Page
- [ ] Font specimens for Souvenir, Monument Grotesk, Geist, JetBrains Mono
- [ ] Interactive type scale demonstration
- [ ] Weight and style variations displayed
- [ ] Live editable text preview
- [ ] Font pairing recommendations
- [ ] Download/licensing information links

### Voice & Tone Page
- [ ] Brand voice attributes with explanations
- [ ] Tone variations by context (marketing, product, support)
- [ ] Terminology guide (always use / avoid)
- [ ] Writing examples (headlines, CTAs, descriptions)
- [ ] Copy-able templates for common scenarios

### Visual Patterns Page
- [ ] Gradient examples with live preview
- [ ] Paper texture demonstration (using existing shader)
- [ ] Shadow/elevation system visualization
- [ ] Border treatment examples
- [ ] Background image previews
- [ ] Copy-paste CSS and Tailwind code for each

### Press Kit Page
- [ ] "Download All" button generates ZIP of complete kit
- [ ] Individual asset downloads (logos, screenshots, backgrounds)
- [ ] Boilerplate text (short, medium, long descriptions)
- [ ] Fact sheet with key statistics
- [ ] Contact information for press inquiries
- [ ] Asset usage terms and conditions

### Social Templates Page
- [ ] Twitter/X post templates with copy functionality
- [ ] Discord announcement templates
- [ ] Hashtag strategy reference
- [ ] Emoji usage guidelines
- [ ] Template previews with example data

### Navigation & UX
- [ ] Persistent side navigation on all brand pages
- [ ] Breadcrumb navigation
- [ ] "Back to Styleguide" link for component reference
- [ ] Mobile-responsive navigation (collapsible)
- [ ] Keyboard navigable

### Technical Quality
- [ ] All pages pass Lighthouse audit (performance > 90)
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] All interactive elements have proper focus states
- [ ] All images have alt text

---

## 8. Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Large asset files slow page load | High | Medium | Implement lazy loading, use Next.js Image optimization, serve assets from CDN |
| Font files bloat bundle size | Medium | Low | Fonts already optimized and loaded via existing setup; use `font-display: swap` |
| ZIP generation fails on large bundles | Medium | Medium | Implement server-side ZIP generation as fallback; limit client-side to <50MB |
| Color contrast issues in examples | Medium | Low | Run automated contrast checks; include accessibility warnings |
| Stale documentation after brand updates | High | High | Create update workflow; link to git history; add "last updated" timestamps |
| Mobile usability suffers with complex interactions | Medium | Medium | Design mobile-first; simplify interactions on small screens; test on real devices |
| External partners access internal docs | Low | Low | Add disclaimer banner; consider separate public-facing subset later |

---

## 9. Site Structure

### Information Architecture

```
/brand (Brand Portal Home)
├── Overview
│   ├── Mission & Vision
│   ├── Brand Pillars
│   ├── Personality
│   └── Quick Reference Card
│
├── Logo & Identity
│   ├── Primary Logo
│   ├── Logo Variants
│   ├── Clear Space & Sizing
│   ├── Usage Guidelines
│   └── Downloads
│
├── Color System
│   ├── Primary Brand Color
│   ├── Sedona Orange Scale
│   ├── Zeus Dark Theme
│   ├── Status Colors
│   ├── Accessibility
│   └── Code Snippets
│
├── Typography
│   ├── Font Families
│   │   ├── Souvenir (Display)
│   │   ├── Monument Grotesk (Headlines)
│   │   ├── Geist (Body)
│   │   └── JetBrains Mono (Code)
│   ├── Type Scale
│   └── Usage Guidelines
│
├── Voice & Tone
│   ├── Brand Voice
│   ├── Tone by Context
│   ├── Terminology
│   └── Writing Examples
│
├── Visual Patterns
│   ├── Gradients
│   ├── Textures
│   ├── Shadows
│   ├── Borders
│   └── Backgrounds
│
├── Social Templates
│   ├── Twitter/X Templates
│   ├── Discord Templates
│   ├── Hashtag Strategy
│   └── Emoji Guidelines
│
└── Press Kit
    ├── Logo Downloads
    ├── Screenshots
    ├── Boilerplate Text
    ├── Fact Sheet
    └── Download All
```

### Navigation Design

**Desktop (Sidebar)**
```
┌─────────────────────────────────────────────┐
│  SEDONA BRAND                               │
├─────────────────────────────────────────────┤
│  ▸ Overview                                 │
│  ▸ Logo & Identity                          │
│  ▸ Color System                             │
│  ▸ Typography                               │
│  ▸ Voice & Tone                             │
│  ▸ Visual Patterns                          │
│  ▸ Social Templates                         │
│  ▸ Press Kit                          ↓     │
├─────────────────────────────────────────────┤
│  ← Back to Styleguide                       │
│  ↗ View on GitHub                           │
└─────────────────────────────────────────────┘
```

**Mobile (Collapsible)**
```
┌─────────────────────────┐
│  ☰  SEDONA BRAND        │
├─────────────────────────┤
│  [Page Content]         │
└─────────────────────────┘
```

---

## 10. Open Questions

1. **Access Control:** Should the brand portal be publicly accessible, or restricted to internal users only? If restricted, what authentication mechanism should be used?

2. **Asset Hosting:** Should downloadable assets be hosted on the same domain, or moved to a CDN/cloud storage for better performance and analytics?

3. **Analytics Integration:** What events should be tracked? (Page views, asset downloads, copy actions, etc.) Should this use the existing PostHog setup?

4. **Update Workflow:** Who is responsible for keeping brand assets current? Should there be an automated sync from Figma or another source?

5. **Press Kit Scope:** What specific screenshots and product images should be included? Are there legal/compliance requirements for press assets?

6. **Font Licensing:** Can font files (Souvenir, Monument Grotesk) be distributed via the press kit, or only licensing information with download links?

7. **Component Integration:** Should the brand portal include links to the component styleguide, or should they remain separate experiences?

8. **Version Management:** When brand guidelines change, should we maintain access to previous versions?

9. **Feedback Mechanism:** Should there be a way for users to request assets, report issues, or suggest improvements?

10. **Launch Timeline:** What is the target launch date, and should there be a phased rollout (MVP with core pages first)?

---

## Appendix A: Existing Assets Inventory

### Already Available
| Asset | Location | Status |
|-------|----------|--------|
| Brand Guidelines Doc | `/docs/BRAND_GUIDELINES.md` | Complete |
| Favicon | `/public/favicon.svg` | Ready |
| App Icon | `/public/icon.svg` | Ready |
| Apple Icon | `/public/apple-icon.svg` | Ready |
| OG Image | `/public/og-image.svg` | Ready |
| OG Backgrounds | `/public/og-backgrounds/*.png` | 20+ variants |
| Sedona Background | `/public/sedona-bg.png` | Ready |
| Agents Background | `/public/agents-bg.png` | Ready |
| Font Files | `/public/fonts/*.woff2` | Complete |
| Tailwind Config | `/tailwind.config.ts` | Complete |
| Color Tokens | Defined in Tailwind | Complete |

### Needs Creation
| Asset | Priority | Notes |
|-------|----------|-------|
| Logo variants (SVG/PNG exports) | High | Export from existing SVGs |
| Color palette .ase file | Medium | Adobe Swatch for designers |
| Screenshot captures | High | From existing pages |
| Press kit ZIP bundle | High | Compile from above |
| Social media templates (PSD/Figma) | Medium | Based on guidelines |

---

## Appendix B: Related Documentation

- [Brand Guidelines](/docs/BRAND_GUIDELINES.md) - Source content for mini-site
- [Design Tokens](/docs/DESIGN_TOKENS.md) - Token reference (if exists)
- [Component Styleguide](/styleguide) - Existing component documentation
- [Registry README](/registry/README.md) - Component installation guide

---

## Appendix C: Competitive Reference

Brand portals to reference for inspiration:
- [Vercel Design](https://vercel.com/design) - Clean, developer-focused
- [Stripe Brand](https://stripe.com/brand) - Excellent press kit
- [Linear Brand](https://linear.app/brand) - Minimal, high-quality assets
- [GitHub Brand](https://github.com/logos) - Clear usage guidelines
- [Figma Brand](https://www.figma.com/brand/) - Interactive, design-focused

---

*Document Version: 1.0*
*Last Updated: January 2026*
