# Homepage Figma Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current homepage of `scandic-school` with a Figma-inspired layout on `feat/v3` (already created from `feat/v2`), introduce new `brand-teal/orange/navy/mint-accent` Tailwind tokens scoped via `[data-theme="v3"]`, rewrite the global Header visually while preserving its menu/dropdowns/language switcher, and keep the existing Footer untouched.

**Architecture:** New tokens defined as CSS variables in `globals.css` `:root` (globally available for the new Header) and additionally redefined under `[data-theme="v3"]` (overrides `--primary`/`--accent` only on the homepage root `<div>`). 14 self-contained server-component sections in `src/components/homepage-v3/`, each with inline `translations` object for `ru`/`en`/`kk`, async server component reading `getLocale()` from `@/lib/server-locale`. Shared layout primitives (`SectionHeading`, `FeatureCard`, `StatCard`) live in `src/components/homepage-v3/shared/`. Stock photos downloaded into `public/images/homepage-v3/`.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, shadcn/ui, lucide-react, server-side i18n via `@/lib/server-locale` cookies-based locale + inline translations, vitest for any logic tests.

**Verification strategy:** UI redesign with mostly static JSX — TDD with unit tests does not fit. Each task ends with `pnpm tsc --noEmit` (or `npx tsc --noEmit` if no pnpm), `pnpm lint`, and a visual check at `http://localhost:3000`. Final task runs full QA matrix (3 locales × mobile/desktop × homepage + 2-3 other pages for Header regression).

**Spec:** `docs/superpowers/specs/2026-04-28-homepage-figma-redesign-design.md`

**Branch:** `feat/v3` (already created from `feat/v2`).

**Reference screenshots:** Provided by the user during brainstorming (full-page homepage + footer-detail). Cards, layouts, color values approximated from these screenshots — fine-tune at implementation time. When card content/text is illegible in a screenshot, ask the user before improvising.

---

## File Structure

### Files created

```
src/components/homepage-v3/
├── hero-v3.tsx
├── founder-v3.tsx
├── potential-v3.tsx
├── education-cards-v3.tsx
├── stem-v3.tsx
├── philosophy-v3.tsx
├── campus-v3.tsx
├── extracurriculars-v3.tsx
├── support-programs-v3.tsx
├── admission-steps-v3.tsx
├── cta-orange-v3.tsx
├── testimonials-v3.tsx
├── school-life-v3.tsx
├── ambitions-v3.tsx
└── shared/
    ├── section-heading.tsx
    ├── feature-card.tsx
    └── stat-card.tsx

public/images/homepage-v3/
├── founder-portrait.jpg
├── student-with-book.jpg
├── campus-lab.jpg
├── classroom-1.jpg
├── classroom-2.jpg
├── extracurricular-music.jpg
├── testimonial-1.jpg
├── testimonial-2.jpg
└── testimonial-3.jpg
```

### Files modified

- `src/app/globals.css` — add `:root` brand-* CSS variables and `[data-theme="v3"]` override block
- `tailwind.config.ts` — extend `theme.extend.colors` with `brand-teal`, `brand-orange`, `brand-navy`, `mint-accent`
- `src/app/page.tsx` — completely rewritten to compose v3 sections
- `src/components/client-header.tsx` — rewritten visually (Figma style), but preserves all menu items, dropdowns, language switcher logic from current implementation

### Files NOT touched

- `src/components/header.tsx` (server wrapper — only re-exports `<ClientHeader>`)
- `src/components/footer.tsx`
- `src/components/partners-section.tsx`
- `src/components/instagram-carousel.tsx`
- `src/lib/server-locale.ts`
- `src/components/hero-section.tsx`, `founder-section.tsx`, `features-section.tsx`, `programs-section.tsx`, `achievements-section.tsx`, `cta-section.tsx` (left as dead code, removal in follow-up task)
- All non-homepage pages

---

## Phase 1: Tailwind Theme Foundation

### Task 1: Add `brand-*` and `mint-accent` CSS variables to globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Read current globals.css to find the `:root` block**

Run: open `src/app/globals.css`. Locate the existing `:root { ... }` selector (it should already contain shadcn HSL variables like `--background`, `--foreground`, `--primary`, etc.).

- [ ] **Step 2: Append brand-* variables to the `:root` block**

Add these declarations inside the existing `:root` block (do not create a second `:root`):

```css
  /* Brand teal — primary new color (homepage v3) */
  --brand-teal-50:  246 253 245;
  --brand-teal-100: 209 250 233;
  --brand-teal-200: 167 240 212;
  --brand-teal-300: 110 224 187;
  --brand-teal-400: 61  201 158;
  --brand-teal-500: 30  171 132;
  --brand-teal-600: 15  140 108;
  --brand-teal-700: 10  111 87;
  --brand-teal-800: 13  79  68;
  --brand-teal-900: 12  61  54;
  --brand-teal-950: 10  41  38;

  /* Brand orange — CTA */
  --brand-orange-50:  255 247 237;
  --brand-orange-100: 255 237 213;
  --brand-orange-200: 254 215 170;
  --brand-orange-300: 253 186 116;
  --brand-orange-400: 251 146 60;
  --brand-orange-500: 249 115 22;
  --brand-orange-600: 234 88 12;
  --brand-orange-700: 194 65 12;

  /* Brand navy — dark blocks */
  --brand-navy-50:  248 250 252;
  --brand-navy-100: 241 245 249;
  --brand-navy-700: 51  65  85;
  --brand-navy-800: 30  41  59;
  --brand-navy-900: 15  23  42;
  --brand-navy-950: 10  15  26;

  /* Mint accent — large numbers on dark hero */
  --mint-accent:       168 230 210;
  --mint-accent-light: 197 240 224;
```

- [ ] **Step 3: Append the `[data-theme="v3"]` override block at the end of globals.css**

Add this block after `:root` (and after any existing `.dark` block, if present):

```css
[data-theme="v3"] {
  /* Override shadcn semantic tokens for v3 homepage */
  --primary: 13 79 68;            /* brand-teal-800 */
  --primary-foreground: 255 255 255;
  --accent: 249 115 22;            /* brand-orange-500 */
  --accent-foreground: 255 255 255;
}
```

**Important:** The existing shadcn variables are written using HSL space-separated format (`H S L`). The new brand variables use RGB space-separated format (`R G B`). They coexist without conflict because Tailwind utilities will reference each via the appropriate syntax (`hsl(...)` vs `rgb(...)`).

- [ ] **Step 4: Verify globals.css parses**

Run: `npx tsc --noEmit` — should not fail (CSS isn't typechecked, but imports of globals.css must still resolve).

Run: `npm run lint` — should pass.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css
git commit -m "feat(theme): add brand-* CSS variables and v3 data-theme override"
```

---

### Task 2: Extend `tailwind.config.ts` with brand color tokens

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Read tailwind.config.ts and locate `theme.extend.colors`**

The existing block at `tailwind.config.ts:11-90` defines `primary`, `secondary`, `destructive`, `muted`, `accent`, `popover`, `card`, `neutral`. Do not modify any existing keys.

- [ ] **Step 2: Add new brand-* color groups inside `extend.colors`**

Insert after the `neutral` group, before the closing `}` of `colors`:

```ts
        "brand-teal": {
          50:  "rgb(var(--brand-teal-50) / <alpha-value>)",
          100: "rgb(var(--brand-teal-100) / <alpha-value>)",
          200: "rgb(var(--brand-teal-200) / <alpha-value>)",
          300: "rgb(var(--brand-teal-300) / <alpha-value>)",
          400: "rgb(var(--brand-teal-400) / <alpha-value>)",
          500: "rgb(var(--brand-teal-500) / <alpha-value>)",
          600: "rgb(var(--brand-teal-600) / <alpha-value>)",
          700: "rgb(var(--brand-teal-700) / <alpha-value>)",
          800: "rgb(var(--brand-teal-800) / <alpha-value>)",
          900: "rgb(var(--brand-teal-900) / <alpha-value>)",
          950: "rgb(var(--brand-teal-950) / <alpha-value>)",
        },
        "brand-orange": {
          50:  "rgb(var(--brand-orange-50) / <alpha-value>)",
          100: "rgb(var(--brand-orange-100) / <alpha-value>)",
          200: "rgb(var(--brand-orange-200) / <alpha-value>)",
          300: "rgb(var(--brand-orange-300) / <alpha-value>)",
          400: "rgb(var(--brand-orange-400) / <alpha-value>)",
          500: "rgb(var(--brand-orange-500) / <alpha-value>)",
          600: "rgb(var(--brand-orange-600) / <alpha-value>)",
          700: "rgb(var(--brand-orange-700) / <alpha-value>)",
        },
        "brand-navy": {
          50:  "rgb(var(--brand-navy-50) / <alpha-value>)",
          100: "rgb(var(--brand-navy-100) / <alpha-value>)",
          700: "rgb(var(--brand-navy-700) / <alpha-value>)",
          800: "rgb(var(--brand-navy-800) / <alpha-value>)",
          900: "rgb(var(--brand-navy-900) / <alpha-value>)",
          950: "rgb(var(--brand-navy-950) / <alpha-value>)",
        },
        "mint-accent": {
          DEFAULT: "rgb(var(--mint-accent) / <alpha-value>)",
          light:   "rgb(var(--mint-accent-light) / <alpha-value>)",
        },
```

- [ ] **Step 3: Verify by starting the dev server and using a brand utility**

Run: `npm run dev`

Open `http://localhost:3000`. Open DevTools → Elements. Temporarily edit `<body>` to add a child like `<div class="bg-brand-teal-700 text-mint-accent p-4">test</div>`. The element should display teal background with mint text.

If utility classes are missing, restart the dev server (Tailwind needs to pick up the new config).

Remove the temporary div.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat(theme): extend Tailwind with brand-teal/orange/navy/mint-accent tokens"
```

---

## Phase 2: Image Assets

### Task 3: Download Unsplash photos to `public/images/homepage-v3/`

**Files:**
- Create: `public/images/homepage-v3/founder-portrait.jpg`
- Create: `public/images/homepage-v3/student-with-book.jpg`
- Create: `public/images/homepage-v3/campus-lab.jpg`
- Create: `public/images/homepage-v3/classroom-1.jpg`
- Create: `public/images/homepage-v3/classroom-2.jpg`
- Create: `public/images/homepage-v3/extracurricular-music.jpg`
- Create: `public/images/homepage-v3/testimonial-1.jpg`
- Create: `public/images/homepage-v3/testimonial-2.jpg`
- Create: `public/images/homepage-v3/testimonial-3.jpg`

- [ ] **Step 1: Create the directory**

```bash
mkdir -p public/images/homepage-v3
```

- [ ] **Step 2: Source 9 free photos from Unsplash**

For each filename, search Unsplash for the suggested concept and download the **regular** size (~1080w):

| File | Suggested Unsplash search |
|------|---------------------------|
| `founder-portrait.jpg` | "businessman portrait professional" — middle-aged man, professional headshot |
| `student-with-book.jpg` | "child reading book" — kid sitting with a book, natural light |
| `campus-lab.jpg` | "school science laboratory" — modern lab, students or empty |
| `classroom-1.jpg` | "modern classroom interior" |
| `classroom-2.jpg` | "students classroom learning" |
| `extracurricular-music.jpg` | "kids music instruments" |
| `testimonial-1.jpg` | "woman portrait headshot smiling" |
| `testimonial-2.jpg` | "man portrait professional" |
| `testimonial-3.jpg` | "woman portrait headshot" — different age/look from #1 |

Use the Unsplash website (https://unsplash.com) and download manually, or use `curl` if a direct image URL is identified. Save each file with the exact name listed.

- [ ] **Step 3: Verify all 9 files exist**

```bash
ls -la public/images/homepage-v3/
```

Expected: 9 `.jpg` files. Each file should be > 50KB (a real image, not a placeholder).

- [ ] **Step 4: Commit**

```bash
git add public/images/homepage-v3/
git commit -m "feat(homepage-v3): add Unsplash stock photography for new homepage"
```

---

## Phase 3: Shared Components

### Task 4: Create `<SectionHeading>` shared component

**Files:**
- Create: `src/components/homepage-v3/shared/section-heading.tsx`

- [ ] **Step 1: Write the component**

```tsx
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  variant?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  variant = "light",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "text-sm uppercase tracking-wider font-medium mb-3",
            variant === "dark" ? "text-mint-accent" : "text-brand-teal-700",
          )}
        >
          {eyebrow}
        </div>
      )}
      <h2
        className={cn(
          "font-display font-bold text-3xl md:text-4xl leading-tight",
          variant === "dark" ? "text-white" : "text-brand-navy-900",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base md:text-lg leading-relaxed",
            variant === "dark" ? "text-white/80" : "text-brand-navy-700",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`

Expected: pass with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/homepage-v3/shared/section-heading.tsx
git commit -m "feat(homepage-v3): add SectionHeading shared component"
```

---

### Task 5: Create `<FeatureCard>` shared component

**Files:**
- Create: `src/components/homepage-v3/shared/feature-card.tsx`

- [ ] **Step 1: Write the component**

```tsx
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type FeatureCardProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
  variant?: "white" | "teal-50" | "teal-700";
  className?: string;
  children?: ReactNode;
};

export function FeatureCard({
  icon,
  title,
  description,
  variant = "white",
  className,
  children,
}: FeatureCardProps) {
  const surface = {
    white: "bg-white border border-brand-teal-100",
    "teal-50": "bg-brand-teal-50",
    "teal-700": "bg-brand-teal-700 text-white",
  }[variant];

  const iconBg = variant === "teal-700" ? "bg-white/15" : "bg-brand-teal-100";
  const iconColor = variant === "teal-700" ? "text-white" : "text-brand-teal-700";
  const titleColor = variant === "teal-700" ? "text-white" : "text-brand-navy-900";
  const descColor = variant === "teal-700" ? "text-white/80" : "text-brand-navy-700";

  return (
    <div className={cn("rounded-2xl p-6", surface, className)}>
      {icon && (
        <div
          className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center mb-4",
            iconBg,
            iconColor,
          )}
        >
          {icon}
        </div>
      )}
      <h3 className={cn("font-display font-semibold text-lg mb-2", titleColor)}>
        {title}
      </h3>
      {description && (
        <p className={cn("text-sm leading-relaxed", descColor)}>
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`

Expected: pass.

- [ ] **Step 3: Commit**

```bash
git add src/components/homepage-v3/shared/feature-card.tsx
git commit -m "feat(homepage-v3): add FeatureCard shared component"
```

---

### Task 6: Create `<StatCard>` shared component

**Files:**
- Create: `src/components/homepage-v3/shared/stat-card.tsx`

- [ ] **Step 1: Write the component**

```tsx
import { cn } from "@/lib/utils";

type StatCardProps = {
  value: string;
  label: string;
  sublabel?: string;
  meta?: string;
  className?: string;
};

export function StatCard({ value, label, sublabel, meta, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 bg-brand-teal-700/40 backdrop-blur-sm border border-white/10",
        className,
      )}
    >
      <div className="text-mint-accent font-display font-bold text-5xl md:text-6xl leading-none mb-3">
        {value}
      </div>
      <div className="text-white font-semibold text-lg leading-snug mb-1">{label}</div>
      {sublabel && <div className="text-white/80 text-sm leading-relaxed">{sublabel}</div>}
      {meta && <div className="text-mint-accent/70 text-xs uppercase tracking-wider mt-2">{meta}</div>}
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`

Expected: pass.

- [ ] **Step 3: Commit**

```bash
git add src/components/homepage-v3/shared/stat-card.tsx
git commit -m "feat(homepage-v3): add StatCard shared component"
```

---

## Phase 4: Page Skeleton

### Task 7: Create empty stub files for all 14 v3 sections

**Files:**
- Create: `src/components/homepage-v3/hero-v3.tsx`
- Create: `src/components/homepage-v3/founder-v3.tsx`
- Create: `src/components/homepage-v3/potential-v3.tsx`
- Create: `src/components/homepage-v3/education-cards-v3.tsx`
- Create: `src/components/homepage-v3/stem-v3.tsx`
- Create: `src/components/homepage-v3/philosophy-v3.tsx`
- Create: `src/components/homepage-v3/campus-v3.tsx`
- Create: `src/components/homepage-v3/extracurriculars-v3.tsx`
- Create: `src/components/homepage-v3/support-programs-v3.tsx`
- Create: `src/components/homepage-v3/admission-steps-v3.tsx`
- Create: `src/components/homepage-v3/cta-orange-v3.tsx`
- Create: `src/components/homepage-v3/testimonials-v3.tsx`
- Create: `src/components/homepage-v3/school-life-v3.tsx`
- Create: `src/components/homepage-v3/ambitions-v3.tsx`

- [ ] **Step 1: Create one stub file as a template**

For `src/components/homepage-v3/hero-v3.tsx`:

```tsx
export async function HeroV3() {
  return (
    <section className="py-12 bg-brand-teal-50">
      <div className="container mx-auto px-4">
        <div className="text-brand-teal-900 text-2xl font-bold">HeroV3 (stub)</div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Replicate for the remaining 13 files**

Each file gets the same structure, with the function name and stub label changed:
- `founder-v3.tsx` → `export async function FounderV3()` with label "FounderV3 (stub)"
- `potential-v3.tsx` → `PotentialV3`
- `education-cards-v3.tsx` → `EducationCardsV3`
- `stem-v3.tsx` → `StemV3`
- `philosophy-v3.tsx` → `PhilosophyV3`
- `campus-v3.tsx` → `CampusV3`
- `extracurriculars-v3.tsx` → `ExtracurricularsV3`
- `support-programs-v3.tsx` → `SupportProgramsV3`
- `admission-steps-v3.tsx` → `AdmissionStepsV3`
- `cta-orange-v3.tsx` → `CtaOrangeV3`
- `testimonials-v3.tsx` → `TestimonialsV3`
- `school-life-v3.tsx` → `SchoolLifeV3`
- `ambitions-v3.tsx` → `AmbitionsV3`

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`

Expected: pass.

- [ ] **Step 4: Commit**

```bash
git add src/components/homepage-v3/
git commit -m "feat(homepage-v3): scaffold 14 section stub components"
```

---

### Task 8: Rewrite `src/app/page.tsx` to compose v3 sections

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace contents of `src/app/page.tsx`**

```tsx
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PartnersSection } from "@/components/partners-section";
import { InstagramCarousel } from "@/components/instagram-carousel";
import { HeroV3 } from "@/components/homepage-v3/hero-v3";
import { FounderV3 } from "@/components/homepage-v3/founder-v3";
import { PotentialV3 } from "@/components/homepage-v3/potential-v3";
import { EducationCardsV3 } from "@/components/homepage-v3/education-cards-v3";
import { StemV3 } from "@/components/homepage-v3/stem-v3";
import { PhilosophyV3 } from "@/components/homepage-v3/philosophy-v3";
import { CampusV3 } from "@/components/homepage-v3/campus-v3";
import { ExtracurricularsV3 } from "@/components/homepage-v3/extracurriculars-v3";
import { SupportProgramsV3 } from "@/components/homepage-v3/support-programs-v3";
import { AdmissionStepsV3 } from "@/components/homepage-v3/admission-steps-v3";
import { CtaOrangeV3 } from "@/components/homepage-v3/cta-orange-v3";
import { TestimonialsV3 } from "@/components/homepage-v3/testimonials-v3";
import { SchoolLifeV3 } from "@/components/homepage-v3/school-life-v3";
import { AmbitionsV3 } from "@/components/homepage-v3/ambitions-v3";

export default function Home() {
  return (
    <div data-theme="v3" className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroV3 />
        <FounderV3 />
        <PotentialV3 />
        <EducationCardsV3 />
        <StemV3 />
        <PhilosophyV3 />
        <CampusV3 />
        <ExtracurricularsV3 />
        <SupportProgramsV3 />
        <AdmissionStepsV3 />
        <CtaOrangeV3 />
        <TestimonialsV3 />
        <SchoolLifeV3 />
        <AmbitionsV3 />
        <InstagramCarousel />
        <PartnersSection />
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Verify the build and dev server**

Run: `npm run dev`

Open `http://localhost:3000`. The page should render with the existing Header on top, 14 stub teal-tinted blocks (one per section), then Instagram carousel, partners, and footer.

- [ ] **Step 3: Verify other pages still work**

Open `http://localhost:3000/clubs`, `http://localhost:3000/tournaments`, `http://localhost:3000/about`. Each should render normally with the old Header (unchanged at this point) and old palette.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(homepage-v3): compose v3 sections into homepage skeleton"
```

---

## Phase 5: Header Rewrite

### Task 9: Rewrite `client-header.tsx` with Figma visual (preserve menu/dropdowns/language switcher)

**Files:**
- Modify: `src/components/client-header.tsx`

**Important:** Read the current file fully before rewriting. Preserve every navigation item, dropdown, mobile-drawer state, language switcher, and theme switcher reference. Only the visual presentation (colors, layout, logo, CTA button style) changes.

- [ ] **Step 1: Read the current file in full**

Run: open `src/components/client-header.tsx`. Note:
- The full list of `aboutNavigation`, `educationNavigation` (or similar) DropdownItem arrays
- The `<SchoolDropdown>`, `<LanguageSwitcher>`, `<ThemeSwitcher>` usage
- The mobile menu state (`isMobileMenuOpen`) and toggle logic
- The phone display and `applyButton` text from `translations.header`

- [ ] **Step 2: Rewrite the JSX with Figma visual, preserving the same nav data and helper components**

Replace the rendered `<header>` JSX with this skeleton (keep the existing `useState`, navigation arrays, and prop typing untouched at the top of the function):

```tsx
return (
  <header className="bg-white border-b border-brand-navy-100 sticky top-0 z-50">
    <div className="container mx-auto px-4 h-16 md:h-18 flex items-center justify-between">
      {/* Logo: round S */}
      <Link href="/" className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-brand-teal-700 flex items-center justify-center text-brand-teal-800 font-display font-bold text-lg">
          S
        </div>
        <span className="hidden md:inline-block text-brand-navy-900 font-display font-semibold">
          {translations.header.schoolName}
        </span>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden lg:flex items-center gap-6">
        <SchoolDropdown
          label={translations.navigation.about}
          items={aboutNavigation}
          /* preserve same props as before */
        />
        {/* ...other dropdowns, identical data, just placed in this nav */}
        <Link href="/news" className="text-brand-navy-900 hover:text-brand-teal-700 transition-colors">
          {translations.navigation.news ?? "News"}
        </Link>
        {/* ...keep all existing top-level links */}
      </nav>

      {/* Right cluster */}
      <div className="flex items-center gap-2 md:gap-3">
        <a
          href={`tel:${translations.header.phone.replace(/\s/g, "")}`}
          className="hidden md:flex items-center gap-2 text-brand-navy-700 hover:text-brand-teal-700 text-sm"
        >
          <Phone className="w-4 h-4" />
          {translations.header.phone}
        </a>
        <LanguageSwitcher />
        <ThemeSwitcher />
        <Link
          href="/application"
          className="hidden md:inline-flex items-center px-5 py-2 rounded-full bg-brand-orange-500 text-white font-medium hover:bg-brand-orange-600 transition-colors"
        >
          {translations.header.applyButton}
        </Link>
        <button
          className="lg:hidden p-2 text-brand-navy-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </div>

    {/* Mobile drawer — preserve existing structure but restyle */}
    {isMobileMenuOpen && (
      <div className="lg:hidden bg-white border-t border-brand-navy-100">
        <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
          {/* ...preserve every link/section from the previous mobile menu, with text-brand-navy-900 hover:text-brand-teal-700 colors */}
        </nav>
      </div>
    )}
  </header>
);
```

**Key principle:** Every navigation item that existed before must still exist. Only colors, spacing, the logo, and the apply button styling change. If the previous mobile menu had grouping headers (e.g., "О школе", "Обучение"), keep those exact groupings.

- [ ] **Step 3: Typecheck and lint**

Run: `npx tsc --noEmit`
Run: `npm run lint`

Expected: both pass.

- [ ] **Step 4: Visual QA across pages**

Run: `npm run dev`

Visit each of the following and confirm Header renders without layout breakage:
- `http://localhost:3000/` (homepage — new visual fits the redesign)
- `http://localhost:3000/clubs`
- `http://localhost:3000/tournaments`
- `http://localhost:3000/about`
- Mobile breakpoint (DevTools → Toggle device toolbar → 375 px width)

Switch language via the LanguageSwitcher and verify the apply button text and dropdown labels translate.

If any link or dropdown is missing compared to the old Header, fix it before proceeding.

- [ ] **Step 5: Commit**

```bash
git add src/components/client-header.tsx
git commit -m "feat(header): rewrite client-header with Figma visual, preserve all menu/dropdowns"
```

---

## Phase 6: Section Implementations

Each task in this phase replaces a section stub with the full implementation: layout, content (Russian from screenshots), all 3 locale objects, and mobile responsive classes. The pattern below is a template — apply it consistently across all 14 sections.

**Template per section:**

```tsx
import { getLocale } from "@/lib/server-locale";
import { SectionHeading } from "./shared/section-heading";

const translations = {
  ru: { /* RU content from screenshots */ },
  en: { /* EN translation */ },
  kk: { /* KK translation */ },
} as const;

export async function SomeSectionV3() {
  const locale = await getLocale();
  const t = translations[locale];
  return (
    <section className="py-12 md:py-20 bg-...">
      <div className="container mx-auto px-4">
        {/* layout per spec */}
      </div>
    </section>
  );
}
```

For brevity in this plan, only `HeroV3` (Task 10) shows the full code as a template. Tasks 11–23 list: spec section reference, key Russian content, color/layout cues from spec section 8, and the verification step. The implementer transcribes Russian content from the screenshots and translates to en/kk in the same tone as `getTranslationsSync()` in `src/lib/server-locale.ts`.

---

### Task 10: Implement `HeroV3` (template — full code shown)

**Files:**
- Modify: `src/components/homepage-v3/hero-v3.tsx`

- [ ] **Step 1: Replace stub with full implementation**

```tsx
import { getLocale } from "@/lib/server-locale";

const translations = {
  ru: {
    schoolName: "Scandic International School",
    subname: "\"Scandic Mektebi\"",
    slogan: "Больше чем знания! Больше чем школа!",
    description: "Современное образование мирового уровня в Уральске",
    cta1: "Записаться на экскурсию",
    cta2: "Подать заявку",
    metaIb: "Кандидат школа IB · PYP",
    metaAddress: "Уральск, ул. Жданова 7/1",
    metaEnrollment: "Открыт набор на 2026-2027",
  },
  en: {
    schoolName: "Scandic International School",
    subname: "\"Scandic Mektebi\"",
    slogan: "More than knowledge! More than a school!",
    description: "Modern world-class education in Uralsk",
    cta1: "Book a tour",
    cta2: "Apply now",
    metaIb: "IB Candidate School · PYP",
    metaAddress: "Uralsk, Zhdanov St. 7/1",
    metaEnrollment: "2026-2027 enrollment open",
  },
  kk: {
    schoolName: "Scandic International School",
    subname: "\"Scandic Mektebi\"",
    slogan: "Білімнен де көп! Мектептен де көп!",
    description: "Оралда заманауи әлемдік деңгейдегі білім беру",
    cta1: "Экскурсияға жазылу",
    cta2: "Өтініш беру",
    metaIb: "IB Кандидат мектебі · PYP",
    metaAddress: "Орал, Жданов к-сі 7/1",
    metaEnrollment: "2026-2027 қабылдау ашық",
  },
} as const;

export async function HeroV3() {
  const locale = await getLocale();
  const t = translations[locale];

  return (
    <section className="relative min-h-[80vh] flex items-center bg-gradient-to-b from-brand-teal-800 to-brand-teal-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto w-20 h-20 rounded-full border-2 border-mint-accent flex items-center justify-center mb-6 animate-fade-in">
          <span className="text-mint-accent font-display font-bold text-3xl">S</span>
        </div>
        <h1 className="font-display font-bold text-4xl md:text-6xl mb-2 animate-fade-in-up">
          {t.schoolName}
        </h1>
        <div className="text-mint-accent font-display text-lg md:text-xl mb-6">{t.subname}</div>
        <p className="text-2xl md:text-3xl font-display font-semibold max-w-3xl mx-auto leading-tight mb-3">
          {t.slogan}
        </p>
        <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-10">{t.description}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <a
            href="/application"
            className="inline-flex items-center px-6 py-3 rounded-full bg-brand-orange-500 hover:bg-brand-orange-600 text-white font-medium transition-colors"
          >
            {t.cta1}
          </a>
          <a
            href="/application"
            className="inline-flex items-center px-6 py-3 rounded-full border border-white text-white hover:bg-white/10 font-medium transition-colors"
          >
            {t.cta2}
          </a>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs md:text-sm text-white/70">
          <span>{t.metaIb}</span>
          <span className="hidden md:inline">·</span>
          <span>{t.metaAddress}</span>
          <span className="hidden md:inline">·</span>
          <span>{t.metaEnrollment}</span>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Visual QA**

Run: `npm run dev`
Open `http://localhost:3000/`. Hero should display: dark teal gradient, round "S" logo, large heading, slogan, two CTAs, meta line. Switch locale via header — verify text changes.

Mobile (375 px): single-column, smaller heading, CTAs stack vertically.

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`

Expected: pass.

- [ ] **Step 4: Commit**

```bash
git add src/components/homepage-v3/hero-v3.tsx
git commit -m "feat(homepage-v3): implement HeroV3 section"
```

---

### Task 11: Implement `FounderV3`

**Spec reference:** Section 8.2.

**Russian content (from screenshots):**
- Title: "Слово основателя"
- Founder name: "Амир Бекмуханов" (existing v2 uses "Амир Бекмуханов" — verify against the new screenshot; if it differs, use the new one)
- Founder role: "Основатель школы"
- Founder company: "Владелец датской технологичной компании «BYTEALL ENERGY»"
- Quote (multiple paragraphs from screenshot — transcribe character-by-character; ask the user if illegible)

**Layout:** `bg-white py-20`, centered title above a card `bg-brand-teal-50 rounded-3xl p-8 shadow-sm` with two columns: left = round photo (`/images/homepage-v3/founder-portrait.jpg`, 200×200, `rounded-full`) + name + role + company; right = quote-mark icon (`<Quote>` from lucide-react) + paragraphs.

- [ ] **Step 1: Replace stub with full implementation**

Use the template at the start of Phase 6. Translations object includes: `title`, `name`, `role`, `company`, `quote1`, `quote2`. Imports: `getLocale` from `@/lib/server-locale`, `Image` from `next/image`, `Quote` from `lucide-react`.

Layout JSX:

```tsx
<section className="py-12 md:py-20 bg-white">
  <div className="container mx-auto px-4">
    <h2 className="text-center font-display font-bold text-3xl md:text-4xl text-brand-navy-900 mb-12">
      {t.title}
    </h2>
    <div className="max-w-5xl mx-auto bg-brand-teal-50 rounded-3xl p-6 md:p-10 shadow-sm grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-start">
      <div className="text-center md:text-left">
        <Image
          src="/images/homepage-v3/founder-portrait.jpg"
          alt={t.name}
          width={200}
          height={200}
          className="rounded-full w-32 h-32 md:w-48 md:h-48 object-cover mx-auto md:mx-0"
        />
        <div className="mt-4 font-display font-semibold text-brand-navy-900">{t.name}</div>
        <div className="text-sm text-brand-navy-700">{t.role}</div>
        <div className="text-xs text-brand-navy-700/70 mt-1">{t.company}</div>
      </div>
      <div>
        <Quote className="w-10 h-10 text-brand-teal-700 mb-4" />
        <p className="text-brand-navy-900 leading-relaxed mb-4">{t.quote1}</p>
        <p className="text-brand-navy-900 leading-relaxed">{t.quote2}</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Visual QA + typecheck**

`npm run dev`, verify rendering at all 3 locales and at mobile width. `npx tsc --noEmit` passes.

- [ ] **Step 3: Commit**

```bash
git add src/components/homepage-v3/founder-v3.tsx
git commit -m "feat(homepage-v3): implement FounderV3 section"
```

---

### Task 12: Implement `PotentialV3`

**Spec reference:** Section 8.3.

**Russian content:**
- Eyebrow: "миссия школы"
- Title: "Мы раскрываем потенциал каждого ученика, развивая мышление и формируя сильную личность для уверенного будущего"
- Card 1: title "Всестороннее развитие", description (transcribe from screenshot, ~2 sentences)
- Card 2: title "Практическое обучение", description (~2 sentences)

**Layout:** `bg-brand-teal-50 py-12 md:py-20`, two-column grid (`md:grid-cols-2 gap-10`). Left: `<SectionHeading eyebrow=... title=... align="left" />`. Right: `<FeatureCard variant="white">` × 2 stacked vertically with icons (`Sparkles`, `Compass` from lucide-react).

- [ ] **Step 1: Replace stub with implementation**

Imports: `getLocale`, `SectionHeading` from `./shared/section-heading`, `FeatureCard` from `./shared/feature-card`, `Sparkles`, `Compass` from `lucide-react`.

Translations: `eyebrow`, `title`, `card1Title`, `card1Desc`, `card2Title`, `card2Desc`.

JSX skeleton:

```tsx
<section className="py-12 md:py-20 bg-brand-teal-50">
  <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
    <SectionHeading eyebrow={t.eyebrow} title={t.title} align="left" />
    <div className="space-y-4">
      <FeatureCard variant="white" icon={<Sparkles className="w-5 h-5" />} title={t.card1Title} description={t.card1Desc} />
      <FeatureCard variant="white" icon={<Compass className="w-5 h-5" />} title={t.card2Title} description={t.card2Desc} />
    </div>
  </div>
</section>
```

- [ ] **Step 2: Visual QA + typecheck**

- [ ] **Step 3: Commit**

```bash
git commit -m "feat(homepage-v3): implement PotentialV3 section"
```

---

### Task 13: Implement `EducationCardsV3`

**Spec reference:** Section 8.4.

**Russian content:** Title "Образование, которое готовит к будущему". Subtitle (transcribe). 9 cards (the screenshot shows ~9 — count exactly by visual inspection): each has icon + title + short description. Item names from screenshot include: "Статус кандидата IB PYP", "Сотрудничество с The LINKS", "Собственная программа Challenge", "Scandic Extreme Challenge", "Малые классы", "Тренинговый центр", "STEM фокус", "Критическое мышление", "Благополучие детей", "Подготовка в топ-100 вузов". Verify exact count and titles against the screenshot — if any are illegible, ask the user.

**Layout:** `bg-white py-20`, centered `<SectionHeading>`, then a grid `grid-cols-1 md:grid-cols-3 gap-4 mt-12` of `<FeatureCard variant="teal-50">` items.

- [ ] **Step 1: Replace stub with implementation**

Translations object holds an `items` array with `title` and `description` per card. Use `lucide-react` icons (`Award`, `Users`, `Mountain`, `Beaker`, `Brain`, `HeartHandshake`, etc. — pick by feel).

```tsx
<section className="py-12 md:py-20 bg-white">
  <div className="container mx-auto px-4">
    <SectionHeading title={t.title} subtitle={t.subtitle} />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
      {t.items.map((item, idx) => (
        <FeatureCard key={idx} variant="teal-50" icon={ICONS[idx]} title={item.title} description={item.description} />
      ))}
    </div>
  </div>
</section>
```

Where `ICONS` is a const array of `<Icon className="w-5 h-5" />` JSX elements defined above the component.

- [ ] **Step 2: Visual QA + typecheck**

- [ ] **Step 3: Commit**

```bash
git commit -m "feat(homepage-v3): implement EducationCardsV3 section"
```

---

### Task 14: Implement `StemV3`

**Spec reference:** Section 8.5.

**Russian content:** Eyebrow "академическая программа". Title "Междисциплинарный подход: фокус на STEM и развитие личности". Two stage-cards: "Начальная школа" + "Средняя и старшая школа", each with a checklist of bullets (transcribe ~4-5 bullets each). Subheading "Предметные области". 4 subject cards: "Естественные науки", "Математика", "Языковые программы", "Искусство и история" — each with short description.

**Layout:** `bg-brand-teal-50 py-12 md:py-20`. `<SectionHeading>` left-aligned at top. Below: `grid md:grid-cols-2 gap-4` for stage cards (`<FeatureCard variant="white">` with bulleted list as `children`). Below that: small subheading "Предметные области" then `grid md:grid-cols-2 gap-4` for the 4 subject cards.

- [ ] **Step 1: Replace stub with implementation**

Stage card uses `children` slot for the `<ul className="text-sm text-brand-navy-700 space-y-1.5 mt-2 list-disc list-inside">...</ul>`.

- [ ] **Step 2: Visual QA + typecheck**

- [ ] **Step 3: Commit**

```bash
git commit -m "feat(homepage-v3): implement StemV3 section"
```

---

### Task 15: Implement `PhilosophyV3`

**Spec reference:** Section 8.6.

**Russian content:** Eyebrow "академическое лидерство". Title "Философия образования, где дети процветают". Paragraph (transcribe). Badge text "№1". 6 principles, each with title + 1-line description: "Доверие к ученикам", "Обучение на природе", "Сотрудничество с инженерами", "Без домашних заданий до 10 лет", "Радость в обучении", "Учитель — дитя — родитель".

**Layout:** `bg-brand-teal-50 py-12 md:py-20`, `grid md:grid-cols-2 gap-10`. Left: SectionHeading + paragraph + a `<div>` with `bg-brand-orange-500 text-white rounded-full inline-block px-4 py-2 text-2xl font-display font-bold mt-6` showing "№1". Right: image (`/images/homepage-v3/student-with-book.jpg`, full width, `rounded-2xl`, ~400px tall, object-cover) above a `grid grid-cols-1 sm:grid-cols-2 gap-3` of 6 mini-cards (each: small icon in `bg-brand-teal-100 rounded-lg w-8 h-8` + title + 1-line desc).

- [ ] **Step 1: Replace stub**

- [ ] **Step 2: Visual QA + typecheck**

- [ ] **Step 3: Commit**

```bash
git commit -m "feat(homepage-v3): implement PhilosophyV3 section"
```

---

### Task 16: Implement `CampusV3`

**Spec reference:** Section 8.7.

**Russian content:** Title "Современная образовательная среда в Уральске". Subtitle (transcribe). Image badge "Экспериментальная лаборатория" overlaid on left photo. 4 inline features: "Лаборатории", "Спортзалы", "Концертный зал", "IT-классы" (each + 1-line description). Subheading "Блоки школы" + 3 cards: "Начальная школа" (description), "Средняя и старшая школа" (description), "Выпускной этап" (description). Bottom CTA strip text: "Посетите наш кампус" + button text "Записаться на экскурсию".

**Layout:** `bg-white py-12 md:py-20`. SectionHeading at top. Two photos `grid md:grid-cols-2 gap-4` (campus-lab.jpg + classroom-1.jpg). Below: 4-column inline features (`grid md:grid-cols-4 gap-4 mt-8`). Below: "Блоки школы" subheading + 3 FeatureCards (variant="teal-50"). Below: CTA strip `bg-brand-teal-700 text-white rounded-2xl p-6 mt-12 flex flex-col md:flex-row items-center justify-between gap-4`.

- [ ] **Step 1: Replace stub**

The "Экспериментальная лаборатория" badge: position absolute on the lab image:
```tsx
<div className="relative">
  <Image src="..." alt="..." width={800} height={500} className="rounded-2xl object-cover w-full h-full" />
  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-brand-navy-900">
    {t.labBadge}
  </div>
</div>
```

- [ ] **Step 2: Visual QA + typecheck**

- [ ] **Step 3: Commit**

```bash
git commit -m "feat(homepage-v3): implement CampusV3 section"
```

---

### Task 17: Implement `ExtracurricularsV3`

**Spec reference:** Section 8.8.

**Russian content:** Eyebrow (transcribe). Title "Развитие за пределами учебных программ". Paragraph. Badge "50+". 4 categories: "STEM и Технологии", "Спорт и Здоровье", "Языки и Культура", "Творчество и Искусство" — each with icon + 1-line description.

**Layout:** `bg-brand-teal-50 py-12 md:py-20`, `grid md:grid-cols-2 gap-10`. Left: SectionHeading (left-aligned) + paragraph + orange "50+" badge (`bg-brand-orange-500 text-white rounded-full inline-flex px-4 py-2 text-xl font-display font-bold`). Right: image (`extracurricular-music.jpg`, `rounded-2xl`) on top, 2×2 grid of category mini-cards below.

- [ ] **Step 1: Replace stub**

- [ ] **Step 2: Visual QA + typecheck**

- [ ] **Step 3: Commit**

```bash
git commit -m "feat(homepage-v3): implement ExtracurricularsV3 section"
```

---

### Task 18: Implement `SupportProgramsV3`

**Spec reference:** Section 8.9.

**Russian content:** Title "Программы поддержки". 3 cards: "Поддержка работы одарённых детей" (desc), "Выходные занятия" (desc), "Родительский клуб" (desc). Highlighted block: "Scandic Extreme Challenge" (description ~2 sentences).

**Layout:** `bg-white py-12 md:py-20`. SectionHeading at top. `grid md:grid-cols-3 gap-4` of 3 FeatureCards (variant="teal-50"). Below: highlighted block `<FeatureCard variant="teal-700">` full width with title and longer description.

- [ ] **Step 1: Replace stub**

- [ ] **Step 2: Visual QA + typecheck**

- [ ] **Step 3: Commit**

```bash
git commit -m "feat(homepage-v3): implement SupportProgramsV3 section"
```

---

### Task 19: Implement `AdmissionStepsV3`

**Spec reference:** Section 8.10.

**Russian content:** Title "Как стать частью Scandic International School". Subtitle. 6 steps (count from screenshot — could be 5 or 6): "Заявка на поступление", "Подача заявки", "Собеседование", "Зачисление", "Малые классы" (or "Малыми классами" — verify), "Гибкая оплата" — each with short description.

**Layout:** `bg-white py-12 md:py-20`. SectionHeading. `grid grid-cols-1 md:grid-cols-3 gap-4 mt-12`. Each card: `border border-brand-teal-200 rounded-2xl p-6 bg-white`. Top-left: number badge `bg-brand-teal-100 text-brand-teal-700 rounded-full w-8 h-8 flex items-center justify-center font-display font-bold`. Then title + description.

Mobile note: For 6 cards, single-column stack is fine (no scroll-snap needed at 6 items).

- [ ] **Step 1: Replace stub**

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
  {t.steps.map((step, idx) => (
    <div key={idx} className="border border-brand-teal-200 rounded-2xl p-6">
      <div className="w-8 h-8 rounded-full bg-brand-teal-100 text-brand-teal-700 flex items-center justify-center font-display font-bold mb-3">
        {idx + 1}
      </div>
      <h3 className="font-display font-semibold text-brand-navy-900 mb-2">{step.title}</h3>
      <p className="text-sm text-brand-navy-700 leading-relaxed">{step.description}</p>
    </div>
  ))}
</div>
```

- [ ] **Step 2: Visual QA + typecheck**

- [ ] **Step 3: Commit**

```bash
git commit -m "feat(homepage-v3): implement AdmissionStepsV3 section"
```

---

### Task 20: Implement `CtaOrangeV3`

**Spec reference:** Section 8.11.

**Russian content:** Title "Готовы начать?". Subtitle (transcribe). CTA1 "Записаться на экскурсию". CTA2 "Связаться с нами". Phone caption "+7 706 610 57 81".

**Layout:** Full-width band `bg-brand-orange-500 py-16 text-white text-center`. Centered: `<h2>` + paragraph + 2 CTAs in a row + small phone line.

- [ ] **Step 1: Replace stub**

```tsx
<section className="py-16 bg-brand-orange-500 text-white">
  <div className="container mx-auto px-4 text-center">
    <h2 className="font-display font-bold text-3xl md:text-4xl mb-3">{t.title}</h2>
    <p className="text-white/90 max-w-xl mx-auto mb-8">{t.subtitle}</p>
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
      <a href="/application" className="inline-flex items-center px-6 py-3 rounded-full bg-white text-brand-orange-600 font-medium hover:bg-white/90 transition-colors">
        {t.cta1}
      </a>
      <a href="#contact" className="inline-flex items-center px-6 py-3 rounded-full border border-white text-white hover:bg-white/10 font-medium transition-colors">
        {t.cta2}
      </a>
    </div>
    <a href="tel:+77066105781" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white">
      <Phone className="w-4 h-4" />
      {t.phone}
    </a>
  </div>
</section>
```

- [ ] **Step 2: Visual QA + typecheck**

- [ ] **Step 3: Commit**

```bash
git commit -m "feat(homepage-v3): implement CtaOrangeV3 section"
```

---

### Task 21: Implement `TestimonialsV3`

**Spec reference:** Section 8.12.

**Russian content:** Title "Что говорят семьи о Scandic". 3 testimonials, each with: 5-star rating, quote (transcribe ~3-4 sentences), author name, role ("Родитель ученика 3 класса", etc.).

**Layout:** `bg-white py-12 md:py-20`. SectionHeading. `grid md:grid-cols-3 gap-6 mt-12` of testimonial cards `bg-brand-teal-50 rounded-2xl p-6`. Card structure: stars row (`<Star className="w-4 h-4 fill-brand-orange-400 text-brand-orange-400" />` × 5), quote, then bottom row with `<Image>` avatar (`testimonial-N.jpg`, 48×48, rounded-full) + name + role.

- [ ] **Step 1: Replace stub**

Translations: `title`, `items: { quote, name, role, image }[]` where image is one of `"/images/homepage-v3/testimonial-1.jpg"` etc.

- [ ] **Step 2: Visual QA + typecheck**

- [ ] **Step 3: Commit**

```bash
git commit -m "feat(homepage-v3): implement TestimonialsV3 section"
```

---

### Task 22: Implement `SchoolLifeV3`

**Spec reference:** Section 8.13.

**Russian content:** Title "Жизнь школы". Subtitle. Left column subhead "Предстоящие события" + 3 event cards (date, tag, title, short description — transcribe from screenshot). Right column: newsletter card title "Подпишитесь на наши новости", short paragraph, input placeholder, button label "Подписаться".

**Layout:** `bg-brand-teal-50 py-12 md:py-20`. SectionHeading at top. `grid md:grid-cols-[2fr_1fr] gap-8 mt-12`. Left: heading + 3 event cards `bg-white rounded-2xl p-5` (date pill on top, tag, title, description). Right: orange newsletter card `bg-brand-orange-500 text-white rounded-2xl p-6` with form (input + button).

**Newsletter form:** `<form>` with `<input type="email">` and a button. The submit handler is a stub for v3:

```tsx
"use client";
// Newsletter is a client child component because it has form state
```

Since the section itself is a server component, extract newsletter into a separate client child:

`src/components/homepage-v3/school-life-v3-newsletter.tsx`:

```tsx
"use client";
import { useState } from "react";

type Props = { title: string; description: string; placeholder: string; submitLabel: string };

export function SchoolLifeNewsletter({ title, description, placeholder, submitLabel }: Props) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="bg-brand-orange-500 text-white rounded-2xl p-6">
      <h3 className="font-display font-semibold text-xl mb-2">{title}</h3>
      <p className="text-white/90 text-sm mb-4">{description}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("[v3 newsletter stub] subscribe:", email);
          setSubmitted(true);
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="px-4 py-2 rounded-full bg-white text-brand-navy-900 placeholder:text-brand-navy-700/60 focus:outline-none focus:ring-2 focus:ring-white/40"
        />
        <button type="submit" className="px-4 py-2 rounded-full bg-white text-brand-orange-600 font-medium hover:bg-white/90">
          {submitted ? "✓" : submitLabel}
        </button>
      </form>
    </div>
  );
}
```

In `school-life-v3.tsx`, import and pass props.

- [ ] **Step 1: Create newsletter client child**

Write the file above.

- [ ] **Step 2: Replace `school-life-v3.tsx` stub with full implementation**

```tsx
import { getLocale } from "@/lib/server-locale";
import { SectionHeading } from "./shared/section-heading";
import { SchoolLifeNewsletter } from "./school-life-v3-newsletter";

const translations = { ru: { ... }, en: { ... }, kk: { ... } } as const;

export async function SchoolLifeV3() {
  const locale = await getLocale();
  const t = translations[locale];
  return (
    <section className="py-12 md:py-20 bg-brand-teal-50">
      <div className="container mx-auto px-4">
        <SectionHeading title={t.title} subtitle={t.subtitle} />
        <div className="grid md:grid-cols-[2fr_1fr] gap-8 mt-12">
          <div>
            <h3 className="font-display font-semibold text-xl text-brand-navy-900 mb-4">{t.eventsHeading}</h3>
            <div className="space-y-4">
              {t.events.map((ev, i) => (
                <div key={i} className="bg-white rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-medium text-brand-teal-700 bg-brand-teal-100 rounded-full px-3 py-1">{ev.date}</span>
                    <span className="text-xs uppercase tracking-wider text-brand-navy-700/70">{ev.tag}</span>
                  </div>
                  <h4 className="font-display font-semibold text-brand-navy-900 mb-1">{ev.title}</h4>
                  <p className="text-sm text-brand-navy-700 leading-relaxed">{ev.description}</p>
                </div>
              ))}
            </div>
          </div>
          <SchoolLifeNewsletter
            title={t.newsletterTitle}
            description={t.newsletterDesc}
            placeholder={t.newsletterPlaceholder}
            submitLabel={t.newsletterSubmit}
          />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Visual QA + typecheck**

Test newsletter: type an email, click submit. Console should log `[v3 newsletter stub] subscribe: <email>`. Button text changes to ✓.

- [ ] **Step 4: Commit**

```bash
git add src/components/homepage-v3/school-life-v3.tsx src/components/homepage-v3/school-life-v3-newsletter.tsx
git commit -m "feat(homepage-v3): implement SchoolLifeV3 section with stub newsletter"
```

---

### Task 23: Implement `AmbitionsV3`

**Spec reference:** Section 8.14.

**Russian content:** Title "Наши Амбиции до 2030 года". 4 stat cards (use the exact data from the footer-detail screenshot):
1. Value "3", label "уровня", sublabel "Полный цикл IB", meta "PYP, MYP, DP"
2. Value ">200", label "учеников с высокими результатами", sublabel "Качество важнее количества"
3. Value ">20", label "педагогов международного уровня", sublabel "Лучшие специалисты"
4. Value "<100", label "Поступление в ведущие 100 вузов мира", sublabel "Топовые университеты"

Bottom paragraph: "Присоединяйтесь к нашему путешествию к образованию будущего". Bottom CTA: "Стать частью истории".

**Layout:** `bg-gradient-to-b from-brand-teal-700 to-brand-teal-800 py-12 md:py-20 text-white`. Centered SectionHeading (variant="dark"). `grid grid-cols-1 md:grid-cols-4 gap-4 mt-12` of `<StatCard>`s. Below: centered paragraph + orange CTA button.

- [ ] **Step 1: Replace stub**

```tsx
import { getLocale } from "@/lib/server-locale";
import { SectionHeading } from "./shared/section-heading";
import { StatCard } from "./shared/stat-card";

const translations = { ru: { ... }, en: { ... }, kk: { ... } } as const;

export async function AmbitionsV3() {
  const locale = await getLocale();
  const t = translations[locale];
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-brand-teal-700 to-brand-teal-800 text-white">
      <div className="container mx-auto px-4">
        <SectionHeading title={t.title} variant="dark" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
          {t.stats.map((s, i) => (
            <StatCard key={i} value={s.value} label={s.label} sublabel={s.sublabel} meta={s.meta} />
          ))}
        </div>
        <div className="mt-16 text-center">
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-6">{t.tagline}</p>
          <a href="/application" className="inline-flex items-center px-6 py-3 rounded-full bg-brand-orange-500 hover:bg-brand-orange-600 text-white font-medium transition-colors">
            {t.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Visual QA + typecheck**

- [ ] **Step 3: Commit**

```bash
git commit -m "feat(homepage-v3): implement AmbitionsV3 section"
```

---

## Phase 7: QA and Polish

### Task 24: Cross-locale, cross-device QA pass

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Desktop QA matrix**

For each locale (`ru`, `en`, `kk`) toggle via the LanguageSwitcher in the header and verify on `http://localhost:3000/`:
- All 14 v3 sections render with translated content (no fallback English where Kazakh should appear, etc.)
- Hero CTAs link correctly to `/application`
- Newsletter stub form submits without page reload
- All images load (no broken-image icons)
- No console errors in DevTools

- [ ] **Step 3: Mobile QA**

DevTools → Toggle device toolbar → 375 px width.
- Hero collapses to single column, CTAs stack
- Header collapses to burger menu, all nav items present in drawer
- All 14 sections stack to 1 column (or scroll-snap for AdmissionSteps if it doesn't fit)
- No horizontal scroll on any section
- Photos respect aspect ratio

- [ ] **Step 4: Header regression on other pages**

Visit each:
- `http://localhost:3000/clubs`
- `http://localhost:3000/tournaments`
- `http://localhost:3000/about`
- `http://localhost:3000/news`

Confirm:
- New Header visual applies (white bg, round logo, orange CTA)
- All page-specific links work
- Old palette (amber/green) still visible in page bodies — `data-theme="v3"` correctly scoped to homepage only

- [ ] **Step 5: Build verification**

```bash
npm run build
```

Expected: build succeeds. Note any warnings about images, dynamic routes, etc. Fix any errors.

- [ ] **Step 6: Document any deferred fixes**

If anything in QA flagged a concern that won't be fixed here, append a note to the bottom of the spec document `docs/superpowers/specs/2026-04-28-homepage-figma-redesign-design.md` under section 13 (Risks).

- [ ] **Step 7: Commit any QA fixes**

```bash
git add -A
git commit -m "fix(homepage-v3): QA pass — translation/responsive fixes"
```

(Skip this commit if no fixes were needed.)

---

### Task 25: Open a draft PR for review

- [ ] **Step 1: Push branch**

```bash
git push -u origin feat/v3
```

- [ ] **Step 2: Open draft PR**

```bash
gh pr create --draft --base main --head feat/v3 --title "feat: redesign homepage from Figma (v3)" --body "$(cat <<'EOF'
## Summary
- Replace homepage with Figma-inspired layout on `feat/v3` (branched from `feat/v2`)
- Add brand-teal/orange/navy/mint-accent Tailwind tokens scoped via `[data-theme="v3"]`
- Rewrite global Header with new visual; preserve all menu items, dropdowns, language switcher
- Keep Footer untouched; old homepage section components left as dead code

## Spec
`docs/superpowers/specs/2026-04-28-homepage-figma-redesign-design.md`

## Plan
`docs/superpowers/plans/2026-04-28-homepage-figma-redesign-plan.md`

## Test plan
- [ ] All 14 sections render at desktop and mobile breakpoints
- [ ] All 3 locales (`ru`, `en`, `kk`) render translated content
- [ ] Header regression: clubs, tournaments, about, news pages still work
- [ ] `npm run build` succeeds
- [ ] Newsletter stub form does not crash on submit

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

---

## Self-Review

**Spec coverage check:**

| Spec section | Plan task(s) |
|--------------|--------------|
| 3.1 Brand CSS variables | Task 1 |
| 3.2 `data-theme="v3"` overrides | Task 1 (step 3) |
| 3.3 Tailwind config extension | Task 2 |
| 3.4 Typography (no change) | (no task — covered by inaction) |
| 4.1 New file structure | Tasks 4-7, 10-23 |
| 4.2 Untouched files | (covered by exclusion) |
| 4.3 Dead code retained | (covered by exclusion; mentioned in plan header) |
| 5 Page composition | Task 8 |
| 6.1 i18n pattern | Task 10 (template), Tasks 11-23 |
| 7 New Header | Task 9 |
| 8.1-8.14 Section contracts | Tasks 10-23 |
| 9 Shared components | Tasks 4, 5, 6 |
| 10 Mobile strategy | Tasks 10-23 (in each), Task 24 |
| 11 Assets | Task 3 |
| 12 Implementation order | Phase order in this plan |
| 13 Risks | Acknowledged in plan header (color values, illegible content escalation) |

All spec sections have corresponding tasks.

**Placeholder scan:**
- Tasks 11-22 say "transcribe from screenshot" for content — this is intentional (the screenshots are the source of truth and this plan can't include character-by-character transcription of every paragraph). The plan tells the implementer **where** to look and **what to ask the user** if illegible. This is not a placeholder — it's a documented escalation procedure.
- Color RGB values in Task 1 are approximate; Task 24 step 6 documents this as an open risk. Acceptable.
- All other steps contain concrete code, exact commands, and exact file paths.

**Type consistency:**
- `<SectionHeading>` props (`eyebrow?`, `title`, `subtitle?`, `align?`, `variant?`) used consistently in Tasks 4, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23.
- `<FeatureCard>` props (`icon?`, `title`, `description?`, `variant?`, `children?`) used consistently in Tasks 5, 12, 13, 14, 17, 18.
- `<StatCard>` props (`value`, `label`, `sublabel?`, `meta?`) used consistently in Tasks 6, 23.
- Translations object shape varies per section but each section's RU/EN/KK keys match within itself.
- `getLocale()` import path `@/lib/server-locale` consistent everywhere.

No type drift detected.

---

**Plan complete and saved to `docs/superpowers/plans/2026-04-28-homepage-figma-redesign-plan.md`. Two execution options:**

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

**Which approach?**
