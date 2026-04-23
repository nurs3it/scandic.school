# Custom Hand-Drawn SVG Icons for "About Us" Sections

## Goal

Replace all Lucide React icons across the "About Us" navigation dropdown and all associated page components (about, partners, structure, community, programs) with custom hand-drawn SVG illustrations matching the style of the features bento grid section.

## Scope

~21 unique custom SVG icons with gradient fills. Navigation icons (6) get animated active states on hover. Page icons (~15) are static gradient illustrations.

---

## Architecture

### File Structure

```
src/components/icons/
├── index.ts                    — re-export all icons
├── icon-types.ts               — shared IconProps { active: boolean; id: string }
├── navigation-icons.tsx        — InfoIcon, HandshakeIcon, UsersNavIcon, Building2NavIcon, HeartHandshakeIcon, BookOpenNavIcon
├── education-icons.tsx         — GraduationCapIcon, FlaskConicalIcon, SigmaIcon, LanguagesIcon, MicroscopeIcon
├── organization-icons.tsx      — CrownIcon, BriefcaseIcon, ShieldIcon, Building2Icon, UsersIcon, CoffeeIcon, SchoolIcon
└── community-icons.tsx         — HeartIcon, HomeIcon, CameraIcon, CompassIcon, TargetIcon, PaletteIcon, HandshakeIcon
```

### Shared Icons

Icons used in multiple contexts are defined once and re-exported:

| Icon | Defined in | Also used in |
|------|-----------|--------------|
| ShieldIcon | organization-icons.tsx | about page (values) |
| Building2Icon | organization-icons.tsx | nav, programs teaser, about facilities |
| UsersIcon | organization-icons.tsx | nav, structure management |
| BookOpenIcon | education-icons.tsx | nav, about values |
| FlaskConicalIcon | education-icons.tsx | structure infrastructure, programs subjects |
| PaletteIcon | community-icons.tsx | about facilities, programs subjects |
| HandshakeIcon | community-icons.tsx | nav |

### Icon Component Pattern

Every icon follows the same pattern from `features-bento-grid.tsx`:

```tsx
import { IconProps } from './icon-types';

export function CrownIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`crown-grad-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#ffb400" />
          <stop offset="1" stopColor="#ff6b35" />
        </linearGradient>
      </defs>
      {/* Main shape — hand-drawn style with soft curves */}
      {active && (
        <>
          {/* Pulse rings, sparkles, rays etc. */}
        </>
      )}
    </svg>
  );
}
```

### IconProps Type

```tsx
export interface IconProps {
  active: boolean;
  id: string;
}
```

---

## Animation System

### Level 1: Static Gradient Icons (active=false)

Used in page sections where there is no hover interactivity:
- Structure page — Management cards, Infrastructure cards
- Community page — Three Sides cards, Camera placeholder
- Programs page — Subject cards, Building2 teaser
- About page — Values cards, Facilities cards

These icons receive gradient fills only. `active` is always `false`.

### Level 2: Animated Icons (active=true)

Used in the navigation dropdown (SchoolDropdown) — 6 icons:

| Icon | Animation |
|------|-----------|
| InfoIcon | Pulsing circle around "i" |
| HandshakeIcon | Gentle rocking of hands |
| UsersNavIcon | Shimmering dots around figures |
| Building2NavIcon | Rays emanating from building |
| HeartHandshakeIcon | Heart pulse effect |
| BookOpenNavIcon | Page-turn sparkles |

### Animation Implementation

CSS-based animations inside SVG (not Framer Motion) for compatibility with both client and server components:
- SVG `<animate>` and `<animateTransform>` for simple effects
- CSS `@keyframes` via `<style>` inside SVG for complex effects
- Triggered by `active={true}` prop — elements are conditionally rendered

---

## Integration

### Navigation (client-header.tsx)

Replace 6 Lucide imports with custom icon imports:
- `Info` → `InfoIcon`
- `Handshake` → `HandshakeIcon`
- `Users` → `UsersNavIcon`
- `Building2` → `Building2NavIcon`
- `HeartHandshake` → `HeartHandshakeIcon`
- `BookOpen` → `BookOpenNavIcon`

### SchoolDropdown Adaptation

Currently renders `<IconComponent className="h-4 w-4" />`. Needs adaptation:
- Wrap icon in a sized `div` container
- Pass `active={isHovered}` based on item hover state
- Pass unique `id` per item to avoid gradient ID conflicts

### Page Components

Direct replacement — wrap custom icon in a sized div:

```tsx
// Before (Lucide)
<Crown className="h-8 w-8 text-primary" />

// After (Custom)
<div className="w-8 h-8">
  <CrownIcon active={false} id="management-crown" />
</div>
```

SVG fills 100% of container via `viewBox`. Size controlled by wrapper div.

### Affected Files

| File | Change |
|------|--------|
| `src/components/icons/icon-types.ts` | NEW — IconProps type |
| `src/components/icons/navigation-icons.tsx` | NEW — 6 nav icons |
| `src/components/icons/education-icons.tsx` | NEW — 5 education icons |
| `src/components/icons/organization-icons.tsx` | NEW — 7 organization icons |
| `src/components/icons/community-icons.tsx` | NEW — 7 community icons |
| `src/components/icons/index.ts` | NEW — re-exports |
| `src/components/client-header.tsx` | MODIFY — replace Lucide imports with custom icons |
| `src/components/school-dropdown.tsx` | MODIFY — adapt icon rendering for active/id props |
| `src/components/about-page-content.tsx` | MODIFY — replace ~7 Lucide icons |
| `src/components/structure-page-content.tsx` | MODIFY — replace ~8 Lucide icons |
| `src/components/community-page-content.tsx` | MODIFY — replace ~4 Lucide icons |
| `src/components/programs-page-content.tsx` | MODIFY — replace ~5 Lucide icons |

### What Gets Removed

Unused Lucide imports removed from each modified file. Lucide stays in the project for other areas (footer, contact, etc.).

---

## Visual Style

### Drawing Style

- `viewBox="0 0 64 64"` — unified canvas
- Gradient fills via `<linearGradient>` / `<radialGradient>` with unique `id` (via `id` prop)
- Soft, rounded shapes — slightly "alive", not geometrically perfect
- Palette tied to context

### Icon Visual Reference

| Icon | Visual | Palette |
|------|--------|---------|
| InfoIcon | Circle with "i", soft shadows | primary → accent |
| HandshakeIcon | Two hands shaking | warm orange → amber |
| UsersIcon / UsersNavIcon | 2-3 silhouettes | secondary → teal |
| Building2Icon / Building2NavIcon | Building with flag | secondary → emerald |
| HeartHandshakeIcon | Heart + hands | accent → coral |
| BookOpenIcon / BookOpenNavIcon | Open book | primary → amber |
| CrownIcon | Crown with gems | gold → amber |
| BriefcaseIcon | Briefcase | secondary → teal |
| ShieldIcon | Shield with checkmark | emerald → secondary |
| SchoolIcon | School with bell | secondary → primary |
| CoffeeIcon | Cup with steam | amber → warm |
| FlaskConicalIcon | Flask with bubbles | emerald → teal |
| MicroscopeIcon | Microscope | teal → secondary |
| GraduationCapIcon | Graduation cap with tassel | secondary → primary |
| HeartIcon | Heart | accent → coral |
| HomeIcon | House with window | warm → amber |
| CameraIcon | Camera | gray → secondary |
| TargetIcon | Target with arrow | accent → primary |
| CompassIcon | Compass with needle | teal → emerald |
| SigmaIcon | Sigma symbol + formulas | amber → primary |
| LanguagesIcon | Letters A文あ | primary → teal |
| PaletteIcon | Palette with brush | rainbow gradient |

### Color System

Colors from the project design system:
- **primary**: #ffb400 (yellow)
- **secondary**: #153b24 (dark green)
- **accent**: #ff6b35 (orange)
- Plus contextual shades: emerald, amber, teal, coral, warm, gold, gray

---

## Testing

- Visual verification via dev server: every page + navigation dropdown
- Hover animations in dropdown — verify via browser
- Responsive: icons scale via container div, SVG viewBox preserves aspect ratio
- Gradient ID uniqueness: verify no conflicts when multiple identical icons render on same page (each gets unique `id` prop)
