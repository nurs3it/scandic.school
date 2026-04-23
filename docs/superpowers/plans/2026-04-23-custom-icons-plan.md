# Custom Hand-Drawn SVG Icons Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all Lucide icons in "About Us" navigation and page components with custom hand-drawn SVG illustrations matching the features-bento-grid style.

**Architecture:** 23 custom SVG icon components organized into 4 domain-grouped files under `src/components/icons/`. Each icon accepts `{ active: boolean; id: string }` and renders gradient fills with optional active-state animations. Navigation dropdown gets hover-triggered animations; page icons are static.

**Tech Stack:** React, SVG, CSS animations (inline `<style>` in SVG), TypeScript, Tailwind CSS

---

## File Structure

```
src/components/icons/
├── icon-types.ts               — IconProps interface
├── index.ts                    — Re-exports all icons
├── organization-icons.tsx      — CrownIcon, BriefcaseIcon, ShieldIcon, Building2Icon, UsersIcon, SchoolIcon, CoffeeIcon
├── education-icons.tsx         — GraduationCapIcon, BookOpenIcon, FlaskConicalIcon, BeakerIcon, SigmaIcon, LanguagesIcon, MicroscopeIcon
├── community-icons.tsx         — HeartIcon, HomeIcon, CameraIcon, CompassIcon, TargetIcon, PaletteIcon
└── navigation-icons.tsx        — InfoIcon, HandshakeIcon, HeartHandshakeIcon
```

**Shared icons** (defined once, used in multiple components):
- ShieldIcon → about values + structure management
- Building2Icon → about facilities + about teaser + programs teaser + nav
- UsersIcon → structure management + nav
- BookOpenIcon → about values + nav
- FlaskConicalIcon → structure infrastructure + programs subjects
- PaletteIcon → about facilities + programs subjects
- HandshakeIcon → nav + partners page (2 places)

---

### Task 1: Foundation — Types, Index, Directory

**Files:**
- Create: `src/components/icons/icon-types.ts`
- Create: `src/components/icons/index.ts`
- Create: `src/components/icons/organization-icons.tsx` (empty placeholder)
- Create: `src/components/icons/education-icons.tsx` (empty placeholder)
- Create: `src/components/icons/community-icons.tsx` (empty placeholder)
- Create: `src/components/icons/navigation-icons.tsx` (empty placeholder)

- [ ] **Step 1: Create directory**

```bash
mkdir -p src/components/icons
```

- [ ] **Step 2: Create icon-types.ts**

```tsx
// src/components/icons/icon-types.ts
export interface IconProps {
  active: boolean;
  id: string;
}
```

- [ ] **Step 3: Create stub icon files**

Each file starts with just the import and empty exports. They will be filled in subsequent tasks.

`src/components/icons/organization-icons.tsx`:
```tsx
import { IconProps } from './icon-types';

// Icons: CrownIcon, BriefcaseIcon, ShieldIcon, Building2Icon, UsersIcon, SchoolIcon, CoffeeIcon
// Will be implemented in Task 2
```

`src/components/icons/education-icons.tsx`:
```tsx
import { IconProps } from './icon-types';

// Icons: GraduationCapIcon, BookOpenIcon, FlaskConicalIcon, BeakerIcon, SigmaIcon, LanguagesIcon, MicroscopeIcon
// Will be implemented in Task 3
```

`src/components/icons/community-icons.tsx`:
```tsx
import { IconProps } from './icon-types';

// Icons: HeartIcon, HomeIcon, CameraIcon, CompassIcon, TargetIcon, PaletteIcon
// Will be implemented in Task 4
```

`src/components/icons/navigation-icons.tsx`:
```tsx
import { IconProps } from './icon-types';

// Icons: InfoIcon, HandshakeIcon, HeartHandshakeIcon
// Will be implemented in Task 5
```

- [ ] **Step 4: Create index.ts**

```tsx
// src/components/icons/index.ts
export type { IconProps } from './icon-types';
export {
  CrownIcon,
  BriefcaseIcon,
  ShieldIcon,
  Building2Icon,
  UsersIcon,
  SchoolIcon,
  CoffeeIcon,
} from './organization-icons';
export {
  GraduationCapIcon,
  BookOpenIcon,
  FlaskConicalIcon,
  BeakerIcon,
  SigmaIcon,
  LanguagesIcon,
  MicroscopeIcon,
} from './education-icons';
export {
  HeartIcon,
  HomeIcon,
  CameraIcon,
  CompassIcon,
  TargetIcon,
  PaletteIcon,
} from './community-icons';
export {
  InfoIcon,
  HandshakeIcon,
  HeartHandshakeIcon,
} from './navigation-icons';
```

- [ ] **Step 5: Commit**

```bash
git add src/components/icons/
git commit -m "feat: scaffold custom icons directory structure and types"
```

---

### Task 2: Organization Icons (7 icons)

**Files:**
- Modify: `src/components/icons/organization-icons.tsx`
- Reference: `src/components/features-bento-grid.tsx` (for style patterns)

**Icon style reference:** Every icon in `features-bento-grid.tsx` follows this structure:
1. `<svg viewBox="0 0 64 64" fill="none" className="w-full h-full">`
2. `<defs>` with `<linearGradient>` using unique ID `{prefix}-${id}`
3. Main shape paths with gradient fill
4. Shine/highlight elements (white ellipse or path, low opacity)
5. Active-state elements wrapped in `{active && (...)}`
6. Transition classes: `transition-all duration-500`, opacity and scale changes between active/inactive

**Color palettes for this file:**

| Icon | Gradient Start | Gradient End | Prefix |
|------|---------------|--------------|--------|
| CrownIcon | #ffb400 (gold) | #d97706 (amber) | `cr` |
| BriefcaseIcon | #153b24 (secondary) | #0d9488 (teal) | `br` |
| ShieldIcon | #2dd4bf (teal) | #0d9488 (teal-dark) | `sh` |
| Building2Icon | #153b24 (secondary) | #34d399 (emerald) | `bd` |
| UsersIcon | #34d399 (emerald) | #059669 (emerald-dark) | `us` |
| SchoolIcon | #153b24 (secondary) | #ffb400 (primary) | `sc` |
| CoffeeIcon | #fbbf24 (amber) | #d97706 (amber-dark) | `cf` |

- [ ] **Step 1: Implement CrownIcon (complete example)**

Replace the entire content of `src/components/icons/organization-icons.tsx`:

```tsx
import { IconProps } from './icon-types';

export function CrownIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`cr-${id}`} x1="10" y1="8" x2="54" y2="56">
          <stop offset="0%" stopColor="#ffb400" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      {/* Crown base */}
      <path
        d="M16 44h32v6c0 1-1 2-2 2H18c-1 0-2-1-2-2v-6z"
        fill={`url(#cr-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      {/* Crown body with 3 peaks */}
      <path
        d="M16 44L10 22l12 10 10-16 10 16 12-10-6 22H16z"
        fill={`url(#cr-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      {/* Shine */}
      <path
        d="M20 30c1-2 3-4 5-3"
        stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-40' : 'opacity-15'}`}
      />
      {/* Gems on crown points */}
      <circle cx="32" cy="18" r="3" fill="white"
        className={`transition-all duration-500 ${active ? 'opacity-50 scale-110' : 'opacity-20 scale-100'}`}
        style={{ transformOrigin: '32px 18px' }}
      />
      <circle cx="22" cy="30" r="2" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-40' : 'opacity-15'}`}
      />
      <circle cx="42" cy="30" r="2" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-40' : 'opacity-15'}`}
      />
      {/* Active sparkles */}
      {active && (
        <>
          <circle cx="12" cy="12" r="1.5" fill="#ffb400"
            className="opacity-60 animate-pulse"
          />
          <circle cx="52" cy="10" r="1" fill="#d97706"
            className="opacity-50 animate-pulse"
            style={{ animationDelay: '0.3s' }}
          />
          <path d="M8 18l1.5-3 1.5 3-3-1.5h3z" fill="#ffb400"
            className="opacity-40 animate-pulse"
            style={{ animationDelay: '0.5s' }}
          />
        </>
      )}
    </svg>
  );
}
```

- [ ] **Step 2: Implement BriefcaseIcon**

Append to the same file. Visual: leather briefcase with clasp, rounded edges.

```tsx
export function BriefcaseIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`br-${id}`} x1="10" y1="10" x2="54" y2="54">
          <stop offset="0%" stopColor="#153b24" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
      </defs>
      {/* Handle */}
      <path
        d="M24 20v-4c0-2 2-4 4-4h8c2 0 4 2 4 4v4"
        stroke={`url(#br-${id})`} strokeWidth="3" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-60'}`}
      />
      {/* Main body */}
      <rect x="10" y="20" width="44" height="28" rx="4" fill={`url(#br-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      {/* Center band */}
      <rect x="10" y="32" width="44" height="4" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-20' : 'opacity-10'}`}
      />
      {/* Clasp */}
      <rect x="28" y="30" width="8" height="8" rx="2" fill="white"
        className={`transition-all duration-500 ${active ? 'opacity-35' : 'opacity-15'}`}
      />
      {/* Shine */}
      <path d="M16 24c2-1 4-1 6 0" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-30' : 'opacity-10'}`}
      />
      {active && (
        <>
          <circle cx="8" cy="16" r="1.5" fill="#0d9488" className="opacity-50 animate-pulse" />
          <circle cx="56" cy="14" r="1" fill="#153b24" className="opacity-40 animate-pulse" style={{ animationDelay: '0.2s' }} />
        </>
      )}
    </svg>
  );
}
```

- [ ] **Step 3: Implement ShieldIcon**

Visual: Shield with checkmark (similar style to features-bento-grid ShieldIcon). Teal gradient.

```tsx
export function ShieldIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`sh-${id}`} x1="16" y1="8" x2="48" y2="52">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
      </defs>
      {/* Shield glow */}
      <path d="M32 6L12 16v14c0 14 8.5 22 20 28 11.5-6 20-14 20-28V16L32 6z"
        fill="#2dd4bf"
        className={`transition-all duration-700 ${active ? 'opacity-10 scale-105' : 'opacity-0 scale-100'}`}
        style={{ transformOrigin: '32px 32px' }}
      />
      {/* Shield body */}
      <path d="M32 8L14 17v13c0 13 7.5 20 18 26 10.5-6 18-13 18-26V17L32 8z"
        fill={`url(#sh-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      {/* Shield inner highlight */}
      <path d="M32 12L18 19v11c0 11 6 17 14 22 8-5 14-11 14-22V19L32 12z"
        fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-15' : 'opacity-5'}`}
      />
      {/* Shine */}
      <path d="M22 18c0 0 4-4 10-6" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-35' : 'opacity-15'}`}
      />
      {/* Checkmark */}
      <path d="M24 32l6 6 12-14"
        stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
        className={`transition-all duration-500 ${active ? 'opacity-90' : 'opacity-50'}`}
        strokeDasharray="40"
        strokeDashoffset={active ? 0 : 40}
        style={{ transition: 'stroke-dashoffset 0.6s ease-out, opacity 0.5s' }}
      />
      {/* Sparkles */}
      {active && (
        <>
          <path d="M12 12l1.5-3 1.5 3-3-1.5h3z" fill="#2dd4bf" className="opacity-50 animate-pulse" />
          <path d="M50 10l1-2 1 2-2-1h2z" fill="#0d9488" className="opacity-40 animate-pulse" style={{ animationDelay: '0.1s' }} />
        </>
      )}
    </svg>
  );
}
```

- [ ] **Step 4: Implement Building2Icon**

Visual: Modern school building with flag on top. Secondary green to emerald gradient.

```tsx
export function Building2Icon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`bd-${id}`} x1="10" y1="8" x2="54" y2="56">
          <stop offset="0%" stopColor="#153b24" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
      </defs>
      {/* Main building */}
      <rect x="14" y="22" width="36" height="30" rx="2" fill={`url(#bd-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      {/* Roof accent */}
      <path d="M12 22h40" stroke={`url(#bd-${id})`} strokeWidth="3" strokeLinecap="round"
        className={`transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-60'}`}
      />
      {/* Flag pole */}
      <line x1="32" y1="8" x2="32" y2="22" stroke={`url(#bd-${id})`} strokeWidth="2" strokeLinecap="round"
        className={`transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-60'}`}
      />
      {/* Flag */}
      <path d="M32 8l10 4-10 4z" fill="#ffb400"
        className={`transition-all duration-500 ${active ? 'opacity-90 scale-105' : 'opacity-60 scale-100'}`}
        style={{ transformOrigin: '32px 12px' }}
      />
      {/* Windows row 1 */}
      <rect x="18" y="26" width="6" height="5" rx="1" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-35' : 'opacity-15'}`}
      />
      <rect x="29" y="26" width="6" height="5" rx="1" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-35' : 'opacity-15'}`}
      />
      <rect x="40" y="26" width="6" height="5" rx="1" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-35' : 'opacity-15'}`}
      />
      {/* Windows row 2 */}
      <rect x="18" y="34" width="6" height="5" rx="1" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-30' : 'opacity-12'}`}
      />
      <rect x="40" y="34" width="6" height="5" rx="1" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-30' : 'opacity-12'}`}
      />
      {/* Door */}
      <rect x="28" y="40" width="8" height="12" rx="1.5" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-40' : 'opacity-20'}`}
      />
      {/* Active: rays from building */}
      {active && (
        <>
          <line x1="8" y1="30" x2="12" y2="30" stroke="#34d399" strokeWidth="2" strokeLinecap="round" className="opacity-40 animate-pulse" />
          <line x1="52" y1="30" x2="56" y2="30" stroke="#34d399" strokeWidth="2" strokeLinecap="round" className="opacity-40 animate-pulse" style={{ animationDelay: '0.15s' }} />
          <line x1="8" y1="38" x2="11" y2="38" stroke="#153b24" strokeWidth="1.5" strokeLinecap="round" className="opacity-30 animate-pulse" style={{ animationDelay: '0.3s' }} />
          <line x1="53" y1="38" x2="56" y2="38" stroke="#153b24" strokeWidth="1.5" strokeLinecap="round" className="opacity-30 animate-pulse" style={{ animationDelay: '0.45s' }} />
        </>
      )}
    </svg>
  );
}
```

- [ ] **Step 5: Implement UsersIcon**

Visual: 2-3 person silhouettes. Emerald gradient. Similar to features-bento-grid UsersIcon.

```tsx
export function UsersIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`us-${id}`} x1="10" y1="10" x2="54" y2="54">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      {/* Center person */}
      <circle cx="32" cy="20" r="6" fill={`url(#us-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      <path d="M22 42c0-6 4-10 10-10s10 4 10 10" fill={`url(#us-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      {/* Left person */}
      <circle cx="14" cy="26" r="4.5" fill="#34d399"
        className={`transition-all duration-500 ${active ? 'opacity-80 -translate-x-1' : 'opacity-40'}`}
      />
      <path d="M6 44c0-5 3-8 8-8s8 3 8 8" fill="#34d399"
        className={`transition-all duration-500 ${active ? 'opacity-60 -translate-x-1' : 'opacity-25'}`}
      />
      {/* Right person */}
      <circle cx="50" cy="26" r="4.5" fill="#059669"
        className={`transition-all duration-500 ${active ? 'opacity-80 translate-x-1' : 'opacity-40'}`}
      />
      <path d="M42 44c0-5 3-8 8-8s8 3 8 8" fill="#059669"
        className={`transition-all duration-500 ${active ? 'opacity-60 translate-x-1' : 'opacity-25'}`}
      />
      {/* Connection dots */}
      <path d="M22 30c-2 0-4-1-5-2" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeDasharray="2 2"
        className={`transition-all duration-700 ${active ? 'opacity-50' : 'opacity-0'}`}
      />
      <path d="M42 30c2 0 4-1 5-2" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeDasharray="2 2"
        className={`transition-all duration-700 ${active ? 'opacity-50' : 'opacity-0'}`}
      />
      {active && (
        <path d="M32 48 C32 48 30 46 30 45 C30 44 31 43.5 32 43.5 C33 43.5 34 44 34 45 C34 46 32 48 32 48Z"
          fill={`url(#us-${id})`} className="opacity-60 animate-pulse"
        />
      )}
    </svg>
  );
}
```

- [ ] **Step 6: Implement SchoolIcon**

Visual: School building with bell on top. Secondary to primary gradient.

```tsx
export function SchoolIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`sc-${id}`} x1="10" y1="6" x2="54" y2="56">
          <stop offset="0%" stopColor="#153b24" />
          <stop offset="100%" stopColor="#ffb400" />
        </linearGradient>
      </defs>
      {/* Roof / pediment */}
      <path d="M8 28L32 12l24 16H8z" fill={`url(#sc-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      {/* Main building */}
      <rect x="14" y="28" width="36" height="24" fill={`url(#sc-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      {/* Columns */}
      <rect x="20" y="28" width="3" height="24" rx="1" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-20' : 'opacity-8'}`}
      />
      <rect x="30.5" y="28" width="3" height="24" rx="1" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-20' : 'opacity-8'}`}
      />
      <rect x="41" y="28" width="3" height="24" rx="1" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-20' : 'opacity-8'}`}
      />
      {/* Door */}
      <path d="M28 52V40c0-2 2-4 4-4s4 2 4 4v12" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-35' : 'opacity-15'}`}
      />
      {/* Bell */}
      <circle cx="32" cy="8" r="3.5" fill="#ffb400"
        className={`transition-all duration-500 ${active ? 'opacity-90 scale-110' : 'opacity-60 scale-100'}`}
        style={{ transformOrigin: '32px 8px' }}
      />
      <line x1="32" y1="11.5" x2="32" y2="12" stroke="#ffb400" strokeWidth="2" strokeLinecap="round"
        className={`transition-opacity duration-500 ${active ? 'opacity-80' : 'opacity-40'}`}
      />
      {/* Bell ring waves on active */}
      {active && (
        <>
          <path d="M26 6c0-1 1-2 2-3" stroke="#ffb400" strokeWidth="1.5" strokeLinecap="round" fill="none" className="opacity-40 animate-pulse" />
          <path d="M38 6c0-1-1-2-2-3" stroke="#ffb400" strokeWidth="1.5" strokeLinecap="round" fill="none" className="opacity-40 animate-pulse" style={{ animationDelay: '0.2s' }} />
        </>
      )}
    </svg>
  );
}
```

- [ ] **Step 7: Implement CoffeeIcon**

Visual: Coffee cup with steam rising. Amber gradient.

```tsx
export function CoffeeIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`cf-${id}`} x1="10" y1="10" x2="54" y2="54">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      {/* Saucer */}
      <ellipse cx="28" cy="52" rx="18" ry="4" fill={`url(#cf-${id})`}
        className={`transition-opacity duration-500 ${active ? 'opacity-60' : 'opacity-35'}`}
      />
      {/* Cup body */}
      <path d="M12 28h32l-3 22H15L12 28z" fill={`url(#cf-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      {/* Cup shine */}
      <path d="M18 30v14" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-30' : 'opacity-10'}`}
      />
      {/* Handle */}
      <path d="M44 32h4c3 0 5 2 5 5v2c0 3-2 5-5 5h-3" stroke={`url(#cf-${id})`} strokeWidth="3" fill="none" strokeLinecap="round"
        className={`transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-50'}`}
      />
      {/* Steam lines */}
      <path d="M22 24c0-3 2-4 0-8" stroke={`url(#cf-${id})`} strokeWidth="2" strokeLinecap="round" fill="none"
        className={`transition-all duration-700 ${active ? 'opacity-60 -translate-y-1' : 'opacity-25'}`}
      />
      <path d="M30 22c0-3 2-5 0-9" stroke={`url(#cf-${id})`} strokeWidth="2" strokeLinecap="round" fill="none"
        className={`transition-all duration-700 ${active ? 'opacity-50 -translate-y-1.5' : 'opacity-20'}`}
        style={{ transitionDelay: '0.1s' }}
      />
      <path d="M38 24c0-3 2-4 0-8" stroke={`url(#cf-${id})`} strokeWidth="2" strokeLinecap="round" fill="none"
        className={`transition-all duration-700 ${active ? 'opacity-40 -translate-y-1' : 'opacity-15'}`}
        style={{ transitionDelay: '0.2s' }}
      />
    </svg>
  );
}
```

- [ ] **Step 8: Verify build**

```bash
npx tsc --noEmit --pretty 2>&1 | head -20
```

Expected: No errors from the icons files. Pre-existing errors from other files are acceptable.

- [ ] **Step 9: Commit**

```bash
git add src/components/icons/organization-icons.tsx
git commit -m "feat: add organization icons — Crown, Briefcase, Shield, Building2, Users, School, Coffee"
```

---

### Task 3: Education Icons (7 icons)

**Files:**
- Modify: `src/components/icons/education-icons.tsx`

**Color palettes:**

| Icon | Gradient Start | Gradient End | Prefix |
|------|---------------|--------------|--------|
| GraduationCapIcon | #153b24 (secondary) | #ffb400 (primary) | `gc` |
| BookOpenIcon | #ffb400 (primary) | #d97706 (amber) | `bo` |
| FlaskConicalIcon | #34d399 (emerald) | #0d9488 (teal) | `fl` |
| BeakerIcon | #34d399 (emerald) | #059669 (emerald-dark) | `bk` |
| SigmaIcon | #fbbf24 (amber) | #ffb400 (primary) | `si` |
| LanguagesIcon | #ffb400 (primary) | #0d9488 (teal) | `la` |
| MicroscopeIcon | #0d9488 (teal) | #153b24 (secondary) | `mi` |

- [ ] **Step 1: Implement GraduationCapIcon**

Replace entire file content:

```tsx
import { IconProps } from './icon-types';

export function GraduationCapIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`gc-${id}`} x1="8" y1="16" x2="56" y2="48">
          <stop offset="0%" stopColor="#153b24" />
          <stop offset="100%" stopColor="#ffb400" />
        </linearGradient>
      </defs>
      {/* Cap top (diamond shape) */}
      <path d="M32 12L4 28l28 16 28-16L32 12z" fill={`url(#gc-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      {/* Cap brim shadow */}
      <path d="M32 44L4 28v6l28 16 28-16v-6L32 44z" fill={`url(#gc-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-80' : 'opacity-50'}`}
      />
      {/* Tassel string */}
      <line x1="56" y1="28" x2="56" y2="44" stroke="#ffb400" strokeWidth="2" strokeLinecap="round"
        className={`transition-opacity duration-500 ${active ? 'opacity-80' : 'opacity-40'}`}
      />
      {/* Tassel end */}
      <circle cx="56" cy="46" r="3" fill="#ffb400"
        className={`transition-all duration-500 ${active ? 'opacity-90 scale-110' : 'opacity-50 scale-100'}`}
        style={{ transformOrigin: '56px 46px' }}
      />
      {/* Shine */}
      <path d="M20 24l8-4" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-30' : 'opacity-10'}`}
      />
      {active && (
        <>
          <circle cx="10" cy="14" r="1.5" fill="#ffb400" className="opacity-50 animate-pulse" />
          <circle cx="50" cy="10" r="1" fill="#153b24" className="opacity-40 animate-pulse" style={{ animationDelay: '0.2s' }} />
        </>
      )}
    </svg>
  );
}
```

- [ ] **Step 2: Implement BookOpenIcon**

Visual: Open book with pages, spine visible. Primary amber gradient.

```tsx
export function BookOpenIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`bo-${id}`} x1="8" y1="12" x2="56" y2="52">
          <stop offset="0%" stopColor="#ffb400" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      {/* Left page */}
      <path d="M32 16c-6-4-14-4-20-2v30c6-2 14-2 20 2V16z" fill={`url(#bo-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      {/* Right page */}
      <path d="M32 16c6-4 14-4 20-2v30c-6-2-14-2-20 2V16z" fill={`url(#bo-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-90' : 'opacity-60'}`}
      />
      {/* Spine */}
      <line x1="32" y1="14" x2="32" y2="46" stroke="white" strokeWidth="2"
        className={`transition-opacity duration-500 ${active ? 'opacity-30' : 'opacity-15'}`}
      />
      {/* Text lines - left page */}
      <line x1="16" y1="24" x2="28" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round"
        className={`transition-opacity duration-500 ${active ? 'opacity-25' : 'opacity-10'}`}
      />
      <line x1="16" y1="30" x2="28" y2="28" stroke="white" strokeWidth="1.5" strokeLinecap="round"
        className={`transition-opacity duration-500 ${active ? 'opacity-20' : 'opacity-8'}`}
      />
      <line x1="16" y1="36" x2="26" y2="34" stroke="white" strokeWidth="1.5" strokeLinecap="round"
        className={`transition-opacity duration-500 ${active ? 'opacity-15' : 'opacity-6'}`}
      />
      {/* Page sparkles on active */}
      {active && (
        <>
          <circle cx="44" cy="12" r="1.5" fill="#ffb400" className="opacity-50 animate-pulse" />
          <path d="M8 10l1-2 1 2-2-1h2z" fill="#d97706" className="opacity-40 animate-pulse" style={{ animationDelay: '0.15s' }} />
          <circle cx="54" cy="8" r="1" fill="#ffb400" className="opacity-35 animate-pulse" style={{ animationDelay: '0.3s' }} />
        </>
      )}
    </svg>
  );
}
```

- [ ] **Step 3: Implement FlaskConicalIcon**

Visual: Conical flask (Erlenmeyer) with bubbles inside. Emerald to teal gradient.

```tsx
export function FlaskConicalIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`fl-${id}`} x1="16" y1="6" x2="48" y2="56">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
      </defs>
      {/* Flask neck */}
      <rect x="26" y="8" width="12" height="16" rx="2" fill={`url(#fl-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      {/* Flask body */}
      <path d="M26 24L10 50c-1 2 0 4 2 4h40c2 0 3-2 2-4L38 24H26z" fill={`url(#fl-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      {/* Liquid level */}
      <path d="M18 40l-6 10c-1 2 0 4 2 4h36c2 0 3-2 2-4l-6-10H18z" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-20' : 'opacity-8'}`}
      />
      {/* Flask rim */}
      <rect x="24" y="6" width="16" height="3" rx="1.5" fill={`url(#fl-${id})`}
        className={`transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-60'}`}
      />
      {/* Shine on flask */}
      <path d="M28 14v6" stroke="white" strokeWidth="2" strokeLinecap="round"
        className={`transition-opacity duration-500 ${active ? 'opacity-30' : 'opacity-10'}`}
      />
      {/* Bubbles */}
      <circle cx="26" cy="44" r="2" fill="white"
        className={`transition-all duration-500 ${active ? 'opacity-40 -translate-y-1' : 'opacity-15'}`}
      />
      <circle cx="34" cy="48" r="1.5" fill="white"
        className={`transition-all duration-700 ${active ? 'opacity-35 -translate-y-2' : 'opacity-10'}`}
        style={{ transitionDelay: '0.1s' }}
      />
      <circle cx="40" cy="46" r="1" fill="white"
        className={`transition-all duration-500 ${active ? 'opacity-30 -translate-y-1.5' : 'opacity-10'}`}
        style={{ transitionDelay: '0.2s' }}
      />
      {active && (
        <>
          <circle cx="22" cy="36" r="1" fill="white" className="opacity-30 animate-pulse" />
          <circle cx="42" cy="38" r="0.8" fill="white" className="opacity-25 animate-pulse" style={{ animationDelay: '0.3s' }} />
        </>
      )}
    </svg>
  );
}
```

- [ ] **Step 4: Implement BeakerIcon**

Visual: Laboratory beaker with measurement lines. Emerald gradient.

```tsx
export function BeakerIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`bk-${id}`} x1="14" y1="8" x2="50" y2="56">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      {/* Beaker body */}
      <path d="M16 10h32v38c0 3-2 6-6 6H22c-4 0-6-3-6-6V10z" fill={`url(#bk-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      {/* Spout */}
      <path d="M16 10h-4l2 6h2z" fill={`url(#bk-${id})`}
        className={`transition-opacity duration-500 ${active ? 'opacity-80' : 'opacity-50'}`}
      />
      {/* Rim */}
      <rect x="14" y="8" width="36" height="3" rx="1.5" fill={`url(#bk-${id})`}
        className={`transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-60'}`}
      />
      {/* Measurement lines */}
      <line x1="18" y1="22" x2="24" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round"
        className={`transition-opacity duration-500 ${active ? 'opacity-30' : 'opacity-12'}`}
      />
      <line x1="18" y1="32" x2="26" y2="32" stroke="white" strokeWidth="1.5" strokeLinecap="round"
        className={`transition-opacity duration-500 ${active ? 'opacity-30' : 'opacity-12'}`}
      />
      <line x1="18" y1="42" x2="24" y2="42" stroke="white" strokeWidth="1.5" strokeLinecap="round"
        className={`transition-opacity duration-500 ${active ? 'opacity-30' : 'opacity-12'}`}
      />
      {/* Liquid fill */}
      <path d="M16 36h32v12c0 3-2 6-6 6H22c-4 0-6-3-6-6V36z" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-20' : 'opacity-8'}`}
      />
      {/* Shine */}
      <path d="M22 14v16" stroke="white" strokeWidth="2" strokeLinecap="round"
        className={`transition-opacity duration-500 ${active ? 'opacity-25' : 'opacity-10'}`}
      />
      {/* Bubbles on active */}
      {active && (
        <>
          <circle cx="30" cy="42" r="1.5" fill="white" className="opacity-35 animate-pulse" />
          <circle cx="38" cy="40" r="1" fill="white" className="opacity-25 animate-pulse" style={{ animationDelay: '0.2s' }} />
        </>
      )}
    </svg>
  );
}
```

- [ ] **Step 5: Implement SigmaIcon**

Visual: Mathematical sigma symbol with small formula elements. Amber gradient.

```tsx
export function SigmaIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`si-${id}`} x1="10" y1="8" x2="54" y2="56">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#ffb400" />
        </linearGradient>
      </defs>
      {/* Sigma symbol */}
      <path
        d="M44 12H18l14 20-14 20h26"
        stroke={`url(#si-${id})`} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      {/* Small formula: x² */}
      <text x="48" y="24" fill={`url(#si-${id})`} fontSize="10" fontFamily="serif" fontStyle="italic"
        className={`transition-opacity duration-500 ${active ? 'opacity-60' : 'opacity-25'}`}
      >x</text>
      <text x="54" y="19" fill={`url(#si-${id})`} fontSize="7" fontFamily="serif"
        className={`transition-opacity duration-500 ${active ? 'opacity-50' : 'opacity-20'}`}
      >2</text>
      {/* Equals sign */}
      <line x1="46" y1="40" x2="56" y2="40" stroke={`url(#si-${id})`} strokeWidth="2" strokeLinecap="round"
        className={`transition-opacity duration-500 ${active ? 'opacity-40' : 'opacity-15'}`}
      />
      <line x1="46" y1="44" x2="56" y2="44" stroke={`url(#si-${id})`} strokeWidth="2" strokeLinecap="round"
        className={`transition-opacity duration-500 ${active ? 'opacity-40' : 'opacity-15'}`}
      />
      {active && (
        <>
          <circle cx="8" cy="10" r="1.5" fill="#fbbf24" className="opacity-50 animate-pulse" />
          <path d="M6 50l1-2 1 2-2-1h2z" fill="#d97706" className="opacity-40 animate-pulse" style={{ animationDelay: '0.2s' }} />
        </>
      )}
    </svg>
  );
}
```

- [ ] **Step 6: Implement LanguagesIcon**

Visual: Letters "A", Chinese character "文", Japanese "あ" arranged together. Primary to teal gradient.

```tsx
export function LanguagesIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`la-${id}`} x1="8" y1="8" x2="56" y2="56">
          <stop offset="0%" stopColor="#ffb400" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
      </defs>
      {/* Large A */}
      <path d="M10 50L24 14l14 36" stroke={`url(#la-${id})`} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      <line x1="16" y1="38" x2="32" y2="38" stroke={`url(#la-${id})`} strokeWidth="3" strokeLinecap="round"
        className={`transition-opacity duration-500 ${active ? 'opacity-80' : 'opacity-50'}`}
      />
      {/* Chinese-like character */}
      <path d="M42 14h14M49 14v16M42 22h14M44 30l5 8 5-8" stroke={`url(#la-${id})`} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
        className={`transition-all duration-500 ${active ? 'opacity-80' : 'opacity-45'}`}
      />
      {/* Curved script character */}
      <path d="M42 44c3-2 6-1 8 2s0 8-4 8-6-4-4-10z" stroke={`url(#la-${id})`} strokeWidth="2.5" strokeLinecap="round" fill="none"
        className={`transition-all duration-500 ${active ? 'opacity-70' : 'opacity-35'}`}
      />
      {active && (
        <>
          <circle cx="6" cy="8" r="1.5" fill="#ffb400" className="opacity-50 animate-pulse" />
          <circle cx="58" cy="48" r="1" fill="#0d9488" className="opacity-40 animate-pulse" style={{ animationDelay: '0.15s' }} />
        </>
      )}
    </svg>
  );
}
```

- [ ] **Step 7: Implement MicroscopeIcon**

Visual: Microscope with eyepiece and stage. Teal to secondary gradient.

```tsx
export function MicroscopeIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`mi-${id}`} x1="16" y1="6" x2="48" y2="58">
          <stop offset="0%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#153b24" />
        </linearGradient>
      </defs>
      {/* Eyepiece */}
      <rect x="28" y="6" width="8" height="6" rx="2" fill={`url(#mi-${id})`}
        className={`transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      {/* Tube */}
      <rect x="30" y="12" width="4" height="20" rx="1" fill={`url(#mi-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      {/* Objective lens */}
      <circle cx="32" cy="36" r="5" fill={`url(#mi-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100 scale-105' : 'opacity-70 scale-100'}`}
        style={{ transformOrigin: '32px 36px' }}
      />
      <circle cx="32" cy="36" r="2.5" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-30' : 'opacity-12'}`}
      />
      {/* Stage */}
      <rect x="18" y="42" width="28" height="4" rx="1" fill={`url(#mi-${id})`}
        className={`transition-opacity duration-500 ${active ? 'opacity-90' : 'opacity-60'}`}
      />
      {/* Arm */}
      <path d="M40 16c4 0 8 4 8 8v18" stroke={`url(#mi-${id})`} strokeWidth="3" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-80' : 'opacity-50'}`}
      />
      {/* Base */}
      <rect x="14" y="52" width="36" height="5" rx="2.5" fill={`url(#mi-${id})`}
        className={`transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      {/* Stand */}
      <rect x="30" y="46" width="4" height="6" rx="1" fill={`url(#mi-${id})`}
        className={`transition-opacity duration-500 ${active ? 'opacity-80' : 'opacity-50'}`}
      />
      {/* Light beam on active */}
      {active && (
        <circle cx="32" cy="42" r="6" fill="#0d9488" className="opacity-15 animate-pulse" />
      )}
    </svg>
  );
}
```

- [ ] **Step 8: Verify build**

```bash
npx tsc --noEmit --pretty 2>&1 | head -20
```

- [ ] **Step 9: Commit**

```bash
git add src/components/icons/education-icons.tsx
git commit -m "feat: add education icons — GraduationCap, BookOpen, FlaskConical, Beaker, Sigma, Languages, Microscope"
```

---

### Task 4: Community Icons (6 icons)

**Files:**
- Modify: `src/components/icons/community-icons.tsx`

**Color palettes:**

| Icon | Gradient Start | Gradient End | Prefix |
|------|---------------|--------------|--------|
| HeartIcon | #ff6b35 (accent) | #e11d48 (coral) | `ht` |
| HomeIcon | #fbbf24 (warm) | #d97706 (amber) | `hm` |
| CameraIcon | #6b7280 (gray) | #153b24 (secondary) | `cm` |
| CompassIcon | #0d9488 (teal) | #34d399 (emerald) | `cp` |
| TargetIcon | #ff6b35 (accent) | #ffb400 (primary) | `tg` |
| PaletteIcon | multiple colors (rainbow) | — | `pl` |

- [ ] **Step 1: Implement HeartIcon**

Replace entire file content:

```tsx
import { IconProps } from './icon-types';

export function HeartIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`ht-${id}`} x1="10" y1="10" x2="54" y2="54">
          <stop offset="0%" stopColor="#ff6b35" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
      </defs>
      {/* Main heart */}
      <path
        d="M32 52 C32 52 12 38 12 24 C12 18 16 14 22 14 C26 14 29 16.5 32 20 C35 16.5 38 14 42 14 C48 14 52 18 52 24 C52 38 32 52 32 52Z"
        fill={`url(#ht-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100 scale-105' : 'opacity-70 scale-100'}`}
        style={{ transformOrigin: '32px 33px' }}
      />
      {/* Shine */}
      <ellipse cx="22" cy="22" rx="4" ry="5" fill="white" opacity={active ? 0.4 : 0.2}
        className="transition-opacity duration-500" transform="rotate(-20 22 22)"
      />
      {/* Pulse rings on active */}
      {active && (
        <>
          <path
            d="M32 52 C32 52 8 36 8 22 C8 15 13 10 20 10 C25 10 28 13 32 18 C36 13 39 10 44 10 C51 10 56 15 56 22 C56 36 32 52 32 52Z"
            stroke="#ff6b35" strokeWidth="1.5" fill="none"
            className="opacity-20 animate-pulse"
          />
          <circle cx="18" cy="10" r="1.5" fill="#ff6b35" className="opacity-40 animate-pulse" />
          <circle cx="46" cy="8" r="1" fill="#e11d48" className="opacity-35 animate-pulse" style={{ animationDelay: '0.2s' }} />
        </>
      )}
    </svg>
  );
}
```

- [ ] **Step 2: Implement HomeIcon**

Visual: House with window and chimney. Warm amber gradient.

```tsx
export function HomeIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`hm-${id}`} x1="10" y1="8" x2="54" y2="56">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      {/* Roof */}
      <path d="M32 10L6 32h8v22h36V32h8L32 10z" fill={`url(#hm-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      {/* Wall line */}
      <rect x="14" y="32" width="36" height="22" fill={`url(#hm-${id})`}
        className={`transition-opacity duration-500 ${active ? 'opacity-90' : 'opacity-60'}`}
      />
      {/* Door */}
      <rect x="26" y="38" width="12" height="16" rx="2" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-35' : 'opacity-15'}`}
      />
      {/* Door handle */}
      <circle cx="35" cy="47" r="1.5" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-50' : 'opacity-20'}`}
      />
      {/* Window */}
      <rect x="18" y="36" width="6" height="6" rx="1" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-35' : 'opacity-15'}`}
      />
      {/* Chimney */}
      <rect x="42" y="16" width="6" height="16" rx="1" fill={`url(#hm-${id})`}
        className={`transition-opacity duration-500 ${active ? 'opacity-80' : 'opacity-50'}`}
      />
      {/* Smoke on active */}
      {active && (
        <>
          <circle cx="45" cy="12" r="2" fill="#d97706" className="opacity-20 animate-pulse" />
          <circle cx="47" cy="8" r="2.5" fill="#d97706" className="opacity-15 animate-pulse" style={{ animationDelay: '0.2s' }} />
        </>
      )}
      {/* Roof shine */}
      <path d="M20 24l8-8" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-25' : 'opacity-8'}`}
      />
    </svg>
  );
}
```

- [ ] **Step 3: Implement CameraIcon**

Visual: Camera body with lens. Gray to secondary gradient.

```tsx
export function CameraIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`cm-${id}`} x1="8" y1="12" x2="56" y2="52">
          <stop offset="0%" stopColor="#6b7280" />
          <stop offset="100%" stopColor="#153b24" />
        </linearGradient>
      </defs>
      {/* Camera body */}
      <rect x="8" y="22" width="48" height="30" rx="4" fill={`url(#cm-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      {/* Lens barrel */}
      <circle cx="32" cy="37" r="12" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-20' : 'opacity-10'}`}
      />
      <circle cx="32" cy="37" r="8" fill={`url(#cm-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      <circle cx="32" cy="37" r="4" fill="white"
        className={`transition-all duration-500 ${active ? 'opacity-30 scale-105' : 'opacity-12 scale-100'}`}
        style={{ transformOrigin: '32px 37px' }}
      />
      {/* Viewfinder bump */}
      <path d="M24 22l4-8h8l4 8" fill={`url(#cm-${id})`}
        className={`transition-opacity duration-500 ${active ? 'opacity-90' : 'opacity-60'}`}
      />
      {/* Flash */}
      <circle cx="48" cy="28" r="2.5" fill="white"
        className={`transition-all duration-500 ${active ? 'opacity-50 scale-110' : 'opacity-20 scale-100'}`}
        style={{ transformOrigin: '48px 28px' }}
      />
      {/* Lens shine */}
      <ellipse cx="29" cy="34" rx="2" ry="3" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-25' : 'opacity-8'}`}
        transform="rotate(-30 29 34)"
      />
      {active && (
        <circle cx="48" cy="28" r="6" fill="white" className="opacity-10 animate-pulse" />
      )}
    </svg>
  );
}
```

- [ ] **Step 4: Implement CompassIcon**

Visual: Compass with N needle. Teal to emerald gradient.

```tsx
export function CompassIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`cp-${id}`} x1="10" y1="10" x2="54" y2="54">
          <stop offset="0%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
      </defs>
      {/* Outer ring */}
      <circle cx="32" cy="32" r="24" stroke={`url(#cp-${id})`} strokeWidth="3" fill="none"
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      {/* Inner ring */}
      <circle cx="32" cy="32" r="18" stroke={`url(#cp-${id})`} strokeWidth="1.5" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-40' : 'opacity-20'}`}
      />
      {/* Cardinal tick marks */}
      <line x1="32" y1="8" x2="32" y2="14" stroke={`url(#cp-${id})`} strokeWidth="2" strokeLinecap="round"
        className={`transition-opacity duration-500 ${active ? 'opacity-80' : 'opacity-40'}`}
      />
      <line x1="56" y1="32" x2="50" y2="32" stroke={`url(#cp-${id})`} strokeWidth="2" strokeLinecap="round"
        className={`transition-opacity duration-500 ${active ? 'opacity-60' : 'opacity-30'}`}
      />
      <line x1="32" y1="56" x2="32" y2="50" stroke={`url(#cp-${id})`} strokeWidth="2" strokeLinecap="round"
        className={`transition-opacity duration-500 ${active ? 'opacity-60' : 'opacity-30'}`}
      />
      <line x1="8" y1="32" x2="14" y2="32" stroke={`url(#cp-${id})`} strokeWidth="2" strokeLinecap="round"
        className={`transition-opacity duration-500 ${active ? 'opacity-60' : 'opacity-30'}`}
      />
      {/* North needle (colored) */}
      <path d="M32 14l-4 18h8L32 14z" fill={`url(#cp-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      {/* South needle (lighter) */}
      <path d="M32 50l-4-18h8L32 50z" fill={`url(#cp-${id})`}
        className={`transition-opacity duration-500 ${active ? 'opacity-40' : 'opacity-25'}`}
      />
      {/* Center dot */}
      <circle cx="32" cy="32" r="3" fill={`url(#cp-${id})`}
        className={`transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-60'}`}
      />
      <circle cx="32" cy="32" r="1.5" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-50' : 'opacity-20'}`}
      />
      {/* N label */}
      <text x="32" y="12" textAnchor="middle" fill={`url(#cp-${id})`} fontSize="6" fontWeight="bold"
        className={`transition-opacity duration-500 ${active ? 'opacity-70' : 'opacity-30'}`}
      >N</text>
      {active && (
        <circle cx="32" cy="32" r="22" stroke="#34d399" strokeWidth="1" fill="none" strokeDasharray="3 3"
          className="opacity-30 animate-spin" style={{ animationDuration: '8s', transformOrigin: '32px 32px' }}
        />
      )}
    </svg>
  );
}
```

- [ ] **Step 5: Implement TargetIcon**

Visual: Bullseye target with arrow. Accent to primary gradient.

```tsx
export function TargetIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`tg-${id}`} x1="10" y1="10" x2="54" y2="54">
          <stop offset="0%" stopColor="#ff6b35" />
          <stop offset="100%" stopColor="#ffb400" />
        </linearGradient>
      </defs>
      {/* Outer ring */}
      <circle cx="32" cy="32" r="24" stroke={`url(#tg-${id})`} strokeWidth="3" fill="none"
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      {/* Middle ring */}
      <circle cx="32" cy="32" r="16" stroke={`url(#tg-${id})`} strokeWidth="2.5" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-80' : 'opacity-50'}`}
      />
      {/* Inner ring */}
      <circle cx="32" cy="32" r="8" fill={`url(#tg-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100 scale-105' : 'opacity-70 scale-100'}`}
        style={{ transformOrigin: '32px 32px' }}
      />
      {/* Bullseye center */}
      <circle cx="32" cy="32" r="3" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-50' : 'opacity-25'}`}
      />
      {/* Arrow */}
      <line x1="44" y1="20" x2="34" y2="30" stroke={`url(#tg-${id})`} strokeWidth="2.5" strokeLinecap="round"
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-50'}`}
      />
      <path d="M44 20l-6 2 4 4z" fill={`url(#tg-${id})`}
        className={`transition-opacity duration-500 ${active ? 'opacity-90' : 'opacity-50'}`}
      />
      {/* Feathers */}
      <line x1="44" y1="20" x2="50" y2="14" stroke={`url(#tg-${id})`} strokeWidth="2" strokeLinecap="round"
        className={`transition-opacity duration-500 ${active ? 'opacity-70' : 'opacity-35'}`}
      />
      <line x1="50" y1="14" x2="48" y2="12" stroke={`url(#tg-${id})`} strokeWidth="1.5" strokeLinecap="round"
        className={`transition-opacity duration-500 ${active ? 'opacity-50' : 'opacity-25'}`}
      />
      <line x1="50" y1="14" x2="52" y2="16" stroke={`url(#tg-${id})`} strokeWidth="1.5" strokeLinecap="round"
        className={`transition-opacity duration-500 ${active ? 'opacity-50' : 'opacity-25'}`}
      />
      {active && (
        <>
          <circle cx="32" cy="32" r="20" stroke="#ff6b35" strokeWidth="1" fill="none" className="opacity-20 animate-pulse" />
          <circle cx="8" cy="12" r="1" fill="#ff6b35" className="opacity-40 animate-pulse" />
        </>
      )}
    </svg>
  );
}
```

- [ ] **Step 6: Implement PaletteIcon**

Visual: Artist palette with colorful paint dots and brush. Rainbow gradient.

```tsx
export function PaletteIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`pl-${id}`} x1="8" y1="8" x2="56" y2="56">
          <stop offset="0%" stopColor="#ff6b35" />
          <stop offset="33%" stopColor="#ffb400" />
          <stop offset="66%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>
      {/* Palette shape */}
      <path
        d="M32 8C18 8 8 18 8 32c0 12 8 22 20 24 2 0 4-2 4-4 0-1 0-2-1-3-1-1-1-2-1-3 0-3 2-5 5-5h6c10 0 18-8 18-18C60 14 48 8 32 8z"
        fill={`url(#pl-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      {/* Paint dots */}
      <circle cx="20" cy="24" r="4" fill="#e11d48"
        className={`transition-all duration-500 ${active ? 'opacity-80 scale-110' : 'opacity-50 scale-100'}`}
        style={{ transformOrigin: '20px 24px' }}
      />
      <circle cx="32" cy="18" r="3.5" fill="#ffb400"
        className={`transition-all duration-500 ${active ? 'opacity-80 scale-110' : 'opacity-50 scale-100'}`}
        style={{ transformOrigin: '32px 18px', transitionDelay: '0.05s' }}
      />
      <circle cx="44" cy="24" r="3" fill="#34d399"
        className={`transition-all duration-500 ${active ? 'opacity-80 scale-110' : 'opacity-50 scale-100'}`}
        style={{ transformOrigin: '44px 24px', transitionDelay: '0.1s' }}
      />
      <circle cx="20" cy="38" r="3.5" fill="#0284c7"
        className={`transition-all duration-500 ${active ? 'opacity-80 scale-110' : 'opacity-50 scale-100'}`}
        style={{ transformOrigin: '20px 38px', transitionDelay: '0.15s' }}
      />
      <circle cx="48" cy="34" r="2.5" fill="#a78bfa"
        className={`transition-all duration-500 ${active ? 'opacity-70 scale-110' : 'opacity-40 scale-100'}`}
        style={{ transformOrigin: '48px 34px', transitionDelay: '0.2s' }}
      />
      {/* Palette hole (thumb) */}
      <circle cx="36" cy="42" r="4" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-30' : 'opacity-15'}`}
      />
      {active && (
        <>
          <circle cx="8" cy="10" r="1.5" fill="#ffb400" className="opacity-50 animate-pulse" />
          <circle cx="56" cy="50" r="1" fill="#34d399" className="opacity-40 animate-pulse" style={{ animationDelay: '0.2s' }} />
        </>
      )}
    </svg>
  );
}
```

- [ ] **Step 7: Verify build**

```bash
npx tsc --noEmit --pretty 2>&1 | head -20
```

- [ ] **Step 8: Commit**

```bash
git add src/components/icons/community-icons.tsx
git commit -m "feat: add community icons — Heart, Home, Camera, Compass, Target, Palette"
```

---

### Task 5: Navigation Icons (3 animated icons)

**Files:**
- Modify: `src/components/icons/navigation-icons.tsx`

These icons are primarily used in the header dropdown and have the most elaborate active-state animations.

**Color palettes:**

| Icon | Gradient Start | Gradient End | Prefix |
|------|---------------|--------------|--------|
| InfoIcon | #ffb400 (primary) | #ff6b35 (accent) | `in` |
| HandshakeIcon | #ff6b35 (warm orange) | #d97706 (amber) | `hs` |
| HeartHandshakeIcon | #ff6b35 (accent) | #e11d48 (coral) | `hh` |

- [ ] **Step 1: Implement InfoIcon**

Replace entire file content:

```tsx
import { IconProps } from './icon-types';

export function InfoIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`in-${id}`} x1="10" y1="10" x2="54" y2="54">
          <stop offset="0%" stopColor="#ffb400" />
          <stop offset="100%" stopColor="#ff6b35" />
        </linearGradient>
      </defs>
      {/* Circle background */}
      <circle cx="32" cy="32" r="22" fill={`url(#in-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      {/* Circle shine */}
      <ellipse cx="24" cy="22" rx="8" ry="10" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-15' : 'opacity-5'}`}
        transform="rotate(-20 24 22)"
      />
      {/* "i" dot */}
      <circle cx="32" cy="22" r="3" fill="white"
        className={`transition-all duration-500 ${active ? 'opacity-80 scale-110' : 'opacity-50 scale-100'}`}
        style={{ transformOrigin: '32px 22px' }}
      />
      {/* "i" body */}
      <rect x="29" y="28" width="6" height="16" rx="2" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-80' : 'opacity-50'}`}
      />
      {/* Pulse ring on active */}
      {active && (
        <>
          <circle cx="32" cy="32" r="26" stroke="#ffb400" strokeWidth="1.5" fill="none" className="opacity-25 animate-pulse" />
          <circle cx="32" cy="32" r="30" stroke="#ff6b35" strokeWidth="1" fill="none" className="opacity-15 animate-pulse" style={{ animationDelay: '0.2s' }} />
        </>
      )}
    </svg>
  );
}
```

- [ ] **Step 2: Implement HandshakeIcon**

Visual: Two hands shaking. Warm orange to amber gradient.

```tsx
export function HandshakeIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`hs-${id}`} x1="4" y1="20" x2="60" y2="44">
          <stop offset="0%" stopColor="#ff6b35" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      {/* Left arm */}
      <path d="M4 28c4-2 8-4 14-4" stroke={`url(#hs-${id})`} strokeWidth="3" strokeLinecap="round" fill="none"
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-60'}`}
      />
      {/* Right arm */}
      <path d="M60 28c-4-2-8-4-14-4" stroke={`url(#hs-${id})`} strokeWidth="3" strokeLinecap="round" fill="none"
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-60'}`}
      />
      {/* Left hand */}
      <path d="M18 24c0 0 6 4 10 6s8 2 10-2" fill={`url(#hs-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      {/* Right hand */}
      <path d="M46 24c0 0-6 4-10 6s-8 2-10-2" fill={`url(#hs-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-90' : 'opacity-60'}`}
      />
      {/* Clasped hands center */}
      <path d="M24 28c2 2 6 6 8 6s6-4 8-6" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-35' : 'opacity-15'}`}
      />
      {/* Cuff - left */}
      <rect x="6" y="26" width="12" height="8" rx="2" fill={`url(#hs-${id})`}
        className={`transition-opacity duration-500 ${active ? 'opacity-80' : 'opacity-50'}`}
      />
      {/* Cuff - right */}
      <rect x="46" y="26" width="12" height="8" rx="2" fill={`url(#hs-${id})`}
        className={`transition-opacity duration-500 ${active ? 'opacity-80' : 'opacity-50'}`}
      />
      {/* Handshake highlight lines */}
      <line x1="28" y1="38" x2="36" y2="38" stroke={`url(#hs-${id})`} strokeWidth="1.5" strokeLinecap="round"
        className={`transition-opacity duration-500 ${active ? 'opacity-50' : 'opacity-20'}`}
      />
      <line x1="30" y1="42" x2="34" y2="42" stroke={`url(#hs-${id})`} strokeWidth="1.5" strokeLinecap="round"
        className={`transition-opacity duration-500 ${active ? 'opacity-35' : 'opacity-12'}`}
      />
      {/* Sparkles on active */}
      {active && (
        <>
          <circle cx="32" cy="16" r="1.5" fill="#ffb400" className="opacity-60 animate-pulse" />
          <path d="M14 16l1-2 1 2-2-1h2z" fill="#ff6b35" className="opacity-40 animate-pulse" style={{ animationDelay: '0.15s' }} />
          <path d="M50 14l1-2 1 2-2-1h2z" fill="#d97706" className="opacity-40 animate-pulse" style={{ animationDelay: '0.3s' }} />
        </>
      )}
    </svg>
  );
}
```

- [ ] **Step 3: Implement HeartHandshakeIcon**

Visual: Heart shape with two hands meeting inside it. Accent to coral gradient.

```tsx
export function HeartHandshakeIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`hh-${id}`} x1="10" y1="8" x2="54" y2="52">
          <stop offset="0%" stopColor="#ff6b35" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
      </defs>
      {/* Heart outline */}
      <path
        d="M32 52 C32 52 12 38 12 24 C12 18 16 14 22 14 C26 14 29 16.5 32 20 C35 16.5 38 14 42 14 C48 14 52 18 52 24 C52 38 32 52 32 52Z"
        fill={`url(#hh-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100 scale-105' : 'opacity-70 scale-100'}`}
        style={{ transformOrigin: '32px 33px' }}
      />
      {/* Shine */}
      <ellipse cx="22" cy="22" rx="4" ry="5" fill="white" opacity={active ? 0.3 : 0.15}
        className="transition-opacity duration-500" transform="rotate(-20 22 22)"
      />
      {/* Hands inside heart — left */}
      <path d="M20 34c2-1 4 0 6 2l2 2" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-70' : 'opacity-35'}`}
      />
      {/* Hands inside heart — right */}
      <path d="M44 34c-2-1-4 0-6 2l-2 2" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-70' : 'opacity-35'}`}
      />
      {/* Clasped point */}
      <circle cx="32" cy="36" r="2" fill="white"
        className={`transition-all duration-500 ${active ? 'opacity-50 scale-110' : 'opacity-20 scale-100'}`}
        style={{ transformOrigin: '32px 36px' }}
      />
      {/* Pulse on active */}
      {active && (
        <>
          <path
            d="M32 54 C32 54 10 38 10 23 C10 16 14 12 21 12 C26 12 28 14.5 32 19 C36 14.5 38 12 43 12 C50 12 54 16 54 23 C54 38 32 54 32 54Z"
            stroke="#ff6b35" strokeWidth="1.5" fill="none" className="opacity-20 animate-pulse"
          />
          <circle cx="14" cy="10" r="1.5" fill="#ff6b35" className="opacity-50 animate-pulse" />
          <circle cx="50" cy="8" r="1" fill="#e11d48" className="opacity-35 animate-pulse" style={{ animationDelay: '0.2s' }} />
        </>
      )}
    </svg>
  );
}
```

- [ ] **Step 4: Verify build**

```bash
npx tsc --noEmit --pretty 2>&1 | head -20
```

- [ ] **Step 5: Commit**

```bash
git add src/components/icons/navigation-icons.tsx
git commit -m "feat: add navigation icons — Info, Handshake, HeartHandshake with active animations"
```

---

### Task 6: SchoolDropdown + Header Integration

**Files:**
- Modify: `src/components/school-dropdown.tsx`
- Modify: `src/components/client-header.tsx`

- [ ] **Step 1: Update SchoolDropdown to support custom icons**

Open `src/components/school-dropdown.tsx` and make these changes:

1. Add imports and update the interface to support both Lucide and custom icons
2. Add hover tracking state
3. Update render logic

Full replacement of `src/components/school-dropdown.tsx`:

```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { IconProps } from '@/components/icons';

export interface DropdownItem {
  name: string;
  href: string;
  icon: LucideIcon | React.ComponentType<IconProps>;
  description: string;
  isCustomIcon?: boolean;
}

interface SchoolDropdownProps {
  title: string;
  items: DropdownItem[];
  icon: LucideIcon;
}

export function SchoolDropdown({ title, items, icon: Icon }: SchoolDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 transition-all duration-200"
        >
          <Icon className="h-4 w-4" />
          <span>{title}</span>
          <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2" align="start">
        <div className="space-y-1">
          {items.map((item) => {
            const isHovered = hoveredItem === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-start space-x-3 px-3 py-3 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors rounded-lg group"
                onClick={() => setIsOpen(false)}
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  {item.isCustomIcon ? (
                    <div className="w-6 h-6">
                      {(() => {
                        const CustomIcon = item.icon as React.ComponentType<IconProps>;
                        return <CustomIcon active={isHovered} id={`nav-${item.href}`} />;
                      })()}
                    </div>
                  ) : (
                    (() => {
                      const LucideIcon = item.icon as LucideIcon;
                      return <LucideIcon className="h-4 w-4 text-primary" />;
                    })()
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

- [ ] **Step 2: Update client-header.tsx — replace Lucide imports with custom icons**

In `src/components/client-header.tsx`:

**Remove** these from the Lucide import: `Users, Info, Handshake, Building2, HeartHandshake, BookOpen`

The Lucide import line becomes (keep `Info` — it's still used for mobile section header on line 221):
```tsx
import { Phone, Menu, X, Info, FileText, MessageCircle, UserPlus, GraduationCap, ShoppingBag, Newspaper } from "lucide-react";
```

**Add** custom icons import:
```tsx
import { InfoIcon, HandshakeIcon, UsersIcon, Building2Icon, HeartHandshakeIcon, BookOpenIcon } from '@/components/icons';
```

**Import DropdownItem type:**
```tsx
import { SchoolDropdown, type DropdownItem } from './school-dropdown';
```

**Update the `aboutNavigation` array** (add `isCustomIcon: true` and replace icon references):

```tsx
  const aboutNavigation: DropdownItem[] = [
    {
      name: translations.navigation.about,
      href: "/about",
      icon: InfoIcon,
      description: translations.header.descriptions.about ?? "",
      isCustomIcon: true,
    },
    {
      name: translations.navigation.partners ?? "Партнеры",
      href: "/partners",
      icon: HandshakeIcon,
      description: translations.header.descriptions.partners ?? "",
      isCustomIcon: true,
    },
    {
      name: translations.navigation.staff,
      href: "/staff",
      icon: UsersIcon,
      description: translations.header.descriptions.staff,
      isCustomIcon: true,
    },
    {
      name: translations.navigation.structure ?? "Структура",
      href: "/structure",
      icon: Building2Icon,
      description: translations.header.descriptions.structure ?? "",
      isCustomIcon: true,
    },
    {
      name: translations.navigation.community ?? "Сообщество",
      href: "/community",
      icon: HeartHandshakeIcon,
      description: translations.header.descriptions.community ?? "",
      isCustomIcon: true,
    },
    {
      name: translations.navigation.programs ?? "Программа",
      href: "/programs",
      icon: BookOpenIcon,
      description: translations.header.descriptions.programs ?? "",
      isCustomIcon: true,
    },
  ];
```

**Update `ClientHeaderProps` interface** — change `icon` in the DropdownItem-like structures to accept custom icons. No change needed since the SchoolDropdown now handles the union type via `DropdownItem`.

**Update mobile menu icon rendering** for aboutNavigation (around line 224-243):

Replace the icon rendering block in the mobile aboutNavigation `map`:

```tsx
{aboutNavigation.map((item, index) => {
  return (
    <Link
      key={item.name}
      href={item.href}
      onClick={closeMobileMenu}
      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-primary hover:bg-primary/5 transition-all duration-200 rounded-lg group"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        {item.isCustomIcon ? (
          <div className="w-5 h-5">
            {(() => {
              const CustomIcon = item.icon as React.ComponentType<{ active: boolean; id: string }>;
              return <CustomIcon active={false} id={`mobile-${item.href}`} />;
            })()}
          </div>
        ) : (
          (() => {
            const IconComponent = item.icon as import('lucide-react').LucideIcon;
            return <IconComponent className="h-4 w-4 text-primary" />;
          })()
        )}
      </div>
      <div className="flex-1">
        <span className="font-medium">{item.name}</span>
        <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
      </div>
    </Link>
  );
})}
```

- [ ] **Step 3: Verify build**

```bash
npx tsc --noEmit --pretty 2>&1 | head -20
```

- [ ] **Step 4: Commit**

```bash
git add src/components/school-dropdown.tsx src/components/client-header.tsx
git commit -m "feat: integrate custom icons into navigation dropdown with hover animations"
```

---

### Task 7: Page Component Integration

**Files:**
- Modify: `src/components/about-page-content.tsx`
- Modify: `src/components/structure-page-content.tsx`
- Modify: `src/components/community-page-content.tsx`
- Modify: `src/components/programs-page-content.tsx`
- Modify: `src/components/partners-page-section.tsx`

All pages are **server components** — icons always have `active={false}`. Each icon gets a unique `id` prop to avoid gradient ID collisions.

- [ ] **Step 1: Update about-page-content.tsx**

**Replace Lucide import line (line 4):**

Before:
```tsx
import { ArrowRight, Target, BookOpen, Compass, Building2, Beaker, Palette, Shield } from 'lucide-react';
```

After:
```tsx
import { ArrowRight } from 'lucide-react';
import { TargetIcon, BookOpenIcon, CompassIcon, Building2Icon, BeakerIcon, PaletteIcon, ShieldIcon } from '@/components/icons';
```

**Replace values array icons (around line 19-39):**

```tsx
  const values = [
    {
      icon: TargetIcon,
      title: { ru: 'Совершенство', en: 'Excellence', kk: 'Жетістік' },
      desc: { ru: 'Стремление к высочайшим стандартам во всём', en: 'Striving for the highest standards in everything', kk: 'Барлығында ең жоғары стандарттарға ұмтылу' },
    },
    {
      icon: CompassIcon,
      title: { ru: 'Глобальное мышление', en: 'Global Mindset', kk: 'Жаһандық ойлау' },
      desc: { ru: 'Подготовка к жизни в многокультурном мире', en: 'Preparation for life in a multicultural world', kk: 'Көпмәдениетті әлемдегі өмірге дайындық' },
    },
    {
      icon: BookOpenIcon,
      title: { ru: 'Любознательность', en: 'Curiosity', kk: 'Қызығушылық' },
      desc: { ru: 'Разжигаем искру познания в каждом ребёнке', en: 'Igniting the spark of discovery in every child', kk: 'Әр баладағы таным ұшқынын тұтатамыз' },
    },
    {
      icon: ShieldIcon,
      title: { ru: 'Уважение', en: 'Respect', kk: 'Құрмет' },
      desc: { ru: 'Ценим каждую личность и её уникальность', en: 'Valuing every individual and their uniqueness', kk: 'Әр тұлға мен оның бірегейлігін бағалаймыз' },
    },
  ];
```

**Replace values icon rendering (around line 198-213):**

Before:
```tsx
const Icon = value.icon;
...
<Icon className="h-5 w-5 text-secondary group-hover:text-primary transition-colors duration-300" />
```

After:
```tsx
const Icon = value.icon;
...
<div className="w-7 h-7">
  <Icon active={false} id={`value-${index}`} />
</div>
```

**Replace facilityItems array icons (around line 41-57):**

```tsx
  const facilityItems = [
    {
      icon: Building2Icon,
      title: { ru: 'Современные классы', en: 'Modern Classrooms', kk: 'Заманауи сыныптар' },
      desc: { ru: 'Оборудованные по международным стандартам', en: 'Equipped to international standards', kk: 'Халықаралық стандарттар бойынша жабдықталған' },
    },
    {
      icon: BeakerIcon,
      title: { ru: 'Лаборатории', en: 'Laboratories', kk: 'Зертханалар' },
      desc: { ru: 'Для естественных наук и STEM-проектов', en: 'For natural sciences and STEM projects', kk: 'Жаратылыстану ғылымдары мен STEM жобалары үшін' },
    },
    {
      icon: PaletteIcon,
      title: { ru: 'Творческие пространства', en: 'Creative Spaces', kk: 'Шығармашылық кеңістіктер' },
      desc: { ru: 'Для искусства, музыки и самовыражения', en: 'For art, music, and self-expression', kk: 'Өнер, музыка және өзін-өзі көрсету үшін' },
    },
  ];
```

**Replace facility icon rendering (around line 372-378):**

Before:
```tsx
const Icon = item.icon;
...
<Icon className="h-7 w-7 text-secondary group-hover:text-secondary transition-colors duration-300" />
```

After:
```tsx
const Icon = item.icon;
...
<div className="w-8 h-8">
  <Icon active={false} id={`facility-${index}`} />
</div>
```

**Replace Structure Teaser icon (around line 410):**

Before:
```tsx
<Building2 className="h-8 w-8 text-secondary/40 mx-auto mb-4" />
```

After:
```tsx
<div className="w-10 h-10 mx-auto mb-4 opacity-60">
  <Building2Icon active={false} id="about-structure-teaser" />
</div>
```

- [ ] **Step 2: Update structure-page-content.tsx**

**Replace Lucide import line (line 3):**

Before:
```tsx
import { ArrowRight, Crown, Briefcase, Shield, Users, School, Coffee, FlaskConical, Microscope } from 'lucide-react';
```

After:
```tsx
import { ArrowRight } from 'lucide-react';
import { CrownIcon, BriefcaseIcon, ShieldIcon, UsersIcon, SchoolIcon, CoffeeIcon, FlaskConicalIcon, MicroscopeIcon } from '@/components/icons';
```

**Replace managementCards icons (around line 14):**

```tsx
  const managementCards = [
    { icon: CrownIcon, title: (t.ceo as Record<string, string>).title, description: (t.ceo as Record<string, string>).description },
    { icon: BriefcaseIcon, title: (t.management as Record<string, string>).title, description: (t.management as Record<string, string>).description },
    { icon: ShieldIcon, title: (t.board as Record<string, string>).title, description: (t.board as Record<string, string>).description },
  ];
```

**Replace management card icon rendering (around line 81-82):**

Before:
```tsx
const Icon = card.icon;
...
<Icon className="h-6 w-6 text-secondary group-hover:text-primary transition-colors duration-300" />
```

After:
```tsx
const Icon = card.icon;
...
<div className="w-7 h-7">
  <Icon active={false} id={`mgmt-${index}`} />
</div>
```

**Replace PTA Users icon (around line 101):**

Before:
```tsx
<Users className="h-6 w-6 text-secondary group-hover:text-secondary transition-colors duration-300" />
```

After:
```tsx
<div className="w-7 h-7">
  <UsersIcon active={false} id="mgmt-pta" />
</div>
```

**Replace infrastructureCards icons (around line 26):**

```tsx
  const infrastructureCards = [
    { icon: SchoolIcon, ...(t.classrooms as Record<string, string>) },
    { icon: CoffeeIcon, ...(t.parentHub as Record<string, string>) },
    { icon: FlaskConicalIcon, ...(t.stemLab as Record<string, string>) },
    { icon: MicroscopeIcon, ...(t.physicsLab as Record<string, string>) },
  ];
```

**Replace infrastructure card icon rendering (around line 162-167):**

Before:
```tsx
const Icon = card.icon;
...
<Icon className="h-6 w-6 text-primary" />
```

After:
```tsx
const Icon = card.icon;
...
<div className="w-7 h-7">
  <Icon active={false} id={`infra-${index}`} />
</div>
```

- [ ] **Step 3: Update community-page-content.tsx**

**Replace Lucide import line (line 4):**

Before:
```tsx
import { GraduationCap, Heart, Home, Camera, ArrowRight } from 'lucide-react';
```

After:
```tsx
import { ArrowRight } from 'lucide-react';
import { GraduationCapIcon, HeartIcon, HomeIcon, CameraIcon } from '@/components/icons';
```

**Replace sides array icons (around line 19-45):**

Replace `icon: GraduationCap` → `icon: GraduationCapIcon`
Replace `icon: Heart` → `icon: HeartIcon`
Replace `icon: Home` → `icon: HomeIcon`

**Replace sides icon rendering (around line 156-157):**

Before:
```tsx
const Icon = side.icon;
...
<Icon className={`h-7 w-7 ${side.iconColor}`} />
```

After:
```tsx
const Icon = side.icon;
...
<div className="w-8 h-8">
  <Icon active={false} id={`side-${index}`} />
</div>
```

**Replace Camera icon in team photo placeholder (around line 198):**

Before:
```tsx
<Camera className="h-12 w-12 text-secondary/30" />
```

After:
```tsx
<div className="w-14 h-14 opacity-40">
  <CameraIcon active={false} id="team-photo-placeholder" />
</div>
```

- [ ] **Step 4: Update programs-page-content.tsx**

**Replace Lucide import (line 3-7):**

Before:
```tsx
import {
  FlaskConical,
  Sigma,
  Palette,
  Languages,
  Building2,
  ArrowRight,
} from 'lucide-react';
```

After:
```tsx
import { ArrowRight } from 'lucide-react';
import { FlaskConicalIcon, SigmaIcon, PaletteIcon, LanguagesIcon, Building2Icon } from '@/components/icons';
```

**Replace subjects array icons (around line 21-53):**

Replace `icon: FlaskConical` → `icon: FlaskConicalIcon`
Replace `icon: Sigma` → `icon: SigmaIcon`
Replace `icon: Palette` → `icon: PaletteIcon`
Replace `icon: Languages` → `icon: LanguagesIcon`

**Replace subject icon rendering (around line 136):**

Before:
```tsx
const Icon = subject.icon;
...
<Icon className="h-20 w-20 md:h-24 md:w-24 text-white/90 relative z-10" />
```

After:
```tsx
const Icon = subject.icon;
...
<div className="h-20 w-20 md:h-24 md:w-24 relative z-10 opacity-90">
  <Icon active={false} id={`subject-${index}`} />
</div>
```

**Replace Building2 in Structure Teaser (around line 189):**

Before:
```tsx
<Building2 className="h-10 w-10 text-secondary/60 mx-auto mb-5" />
```

After:
```tsx
<div className="w-12 h-12 mx-auto mb-5 opacity-70">
  <Building2Icon active={false} id="programs-structure-teaser" />
</div>
```

- [ ] **Step 5: Update partners-page-section.tsx**

**Replace `Handshake` import** — remove `Handshake` from the Lucide import and add custom import:

Before:
```tsx
import { ExternalLink, Instagram, Facebook, Linkedin, Youtube, ArrowRight, Handshake, type LucideIcon } from 'lucide-react';
```

After:
```tsx
import { ExternalLink, Instagram, Facebook, Linkedin, Youtube, ArrowRight, type LucideIcon } from 'lucide-react';
import { HandshakeIcon } from '@/components/icons';
```

**Replace Handshake usage at line 176:**

Before:
```tsx
<Handshake className="h-5 w-5 text-primary" />
```

After:
```tsx
<div className="w-6 h-6">
  <HandshakeIcon active={false} id="partners-count" />
</div>
```

**Replace Handshake usage at line 343:**

Before:
```tsx
<Handshake className="h-10 w-10 text-primary mx-auto mb-5 opacity-80" />
```

After:
```tsx
<div className="w-12 h-12 mx-auto mb-5 opacity-80">
  <HandshakeIcon active={false} id="partners-cta" />
</div>
```

- [ ] **Step 6: Verify build**

```bash
npx tsc --noEmit --pretty 2>&1 | head -20
```

- [ ] **Step 7: Commit**

```bash
git add src/components/about-page-content.tsx src/components/structure-page-content.tsx src/components/community-page-content.tsx src/components/programs-page-content.tsx src/components/partners-page-section.tsx
git commit -m "feat: replace Lucide icons with custom SVG illustrations across all About Us pages"
```

---

### Task 8: Visual Verification

**Files:** None (read-only verification)

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Verify navigation dropdown**

Open `http://localhost:3000` in a browser. Hover over the "О нас" dropdown in the header. Check that:
- All 6 items show custom SVG icons (not Lucide)
- Icons display gradient fills when not hovered
- Icons animate on hover (pulse, sparkles, etc.)
- The "Школа" dropdown still shows Lucide icons (unchanged)

- [ ] **Step 3: Verify each page**

Visit each page and verify icons render correctly with gradient fills:
- `/about` — 4 value cards, 3 facility cards, structure teaser
- `/structure` — 3 management cards, PTA card, 4 infrastructure cards
- `/community` — 3 sides cards, camera placeholder
- `/programs` — 4 subject cards, structure teaser
- `/partners` — partner count badge, CTA section

- [ ] **Step 4: Verify mobile**

Resize browser to mobile width. Check the hamburger menu → About section shows custom icons (static, no animation).

- [ ] **Step 5: Check for gradient ID conflicts**

On the About page, the ShieldIcon and Building2Icon appear multiple times. Verify they all render correctly (no visual glitches from conflicting gradient IDs — each should have a unique `id` prop).

- [ ] **Step 6: Commit verification complete**

```bash
git log --oneline -5
```

Verify all implementation commits are present.
