# Features Section Redesign: Bento Grid with Lottie Animations

## Overview

Redesign the "Why Choose Scandic International School?" section from a standard 3x2 card grid to an interactive bento grid with Lottie animations and auto-cycling card highlights.

## Current State

- Server component `FeaturesSection` at `src/components/features-section.tsx`
- 6 cards in a 3-column grid with hover effects
- Static Lucide icons, multi-color scheme
- No animation beyond hover transitions
- Translation keys in `messages/{en,ru,kk}.json` under `features.*`

## Design

### Layout: Bento Grid (3 rows x 3 columns)

```
Row 1: [Уважение — span 2 cols] [Совершенство — span 1 col]
Row 2: [Сообщество — span 1 col] [Знания и навыки — span 2 cols]
Row 3: [Международность — span 2 cols] [Безопасность — span 1 col]
```

- Large cards span 2 columns, small cards span 1 column
- Positions alternate (staggered) per row
- Mobile: single column, all cards same size

### Card States

**Inactive:**
- Background: `bg-secondary/5` (light green tint)
- Title: `text-secondary` (dark green #153b24)
- Description: `text-secondary/60`
- Lottie: paused on first frame
- No shadow, no border accent

**Active (highlighted):**
- Background: white
- Ring: `ring-2 ring-primary` (yellow #ffb400 border)
- Left accent: `border-l-4 border-primary`
- Lottie: plays animation
- Shadow: `shadow-lg`
- Smooth transition: 500ms ease

### Color Scheme

Monochrome based on school brand colors:
- Primary: `hsl(45 100% 50%)` — yellow #ffb400
- Secondary: `hsl(150 50% 15%)` — dark green #153b24
- Active card uses primary for accents (ring, border-left)
- All text in secondary tones

### Lottie Animations

Source: LottieFiles (free, downloaded as JSON to `public/lottie/`)

| Card | Animation Theme | File |
|------|----------------|------|
| Respect | Pulsing heart | `heart.json` |
| Excellence | Target/bullseye hit | `target.json` |
| Community | People/teamwork | `community.json` |
| Knowledge | Book/lightbulb idea | `knowledge.json` |
| International | Spinning globe | `globe.json` |
| Safety | Shield with checkmark | `shield.json` |

### Auto-Cycle Behavior

- Continuous cycle, 2-second interval per card
- Order: 0 → 1 → 2 → 3 → 4 → 5 → 0 → ...
- On hover: cycle pauses, hovered card becomes active
- On mouse leave: cycle resumes from current index
- Cycle starts when section enters viewport (IntersectionObserver)
- Cycle pauses when section leaves viewport

### Section Header

- Tighter spacing (reduced from `mb-16` to `mb-10`)
- Title: `text-secondary font-bold text-3xl md:text-4xl`
- Subtitle: `text-secondary/60 text-lg`, max-w-2xl

## Technical Approach

### Component Architecture

The current `FeaturesSection` is a server component. The redesign requires:

1. **`FeaturesSection` (server component)** — fetches translations, passes data as props
2. **`FeaturesBentoGrid` (client component)** — handles auto-cycle, hover, Lottie playback

### Dependencies

- `lottie-react` — React wrapper for Lottie animations
- Lottie JSON files stored in `public/lottie/`

### Files to Create

- `src/components/features-bento-grid.tsx` — client component with bento grid + auto-cycle logic
- `public/lottie/*.json` — 6 Lottie animation files

### Files to Modify

- `src/components/features-section.tsx` — refactor to delegate rendering to `FeaturesBentoGrid`
- `package.json` / `yarn.lock` — add `lottie-react` dependency

### Translation Keys

No changes to translation keys. Same `features.*` namespace is used.

## Out of Scope

- Changes to other sections
- New translation keys
- Changes to color theme variables
- Mobile-specific animations (Lottie plays on all sizes)
