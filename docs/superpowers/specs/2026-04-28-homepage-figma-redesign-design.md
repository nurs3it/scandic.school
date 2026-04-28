# Homepage Figma Redesign — Design Spec

**Date:** 2026-04-28
**Branch:** `feat/v3` (created from `feat/v2`)
**Source of truth:** Figma Make file `https://www.figma.com/make/A2CA5uRufojXwfUpqEvVMJ/Private-International-School-Website` (consumed via screenshots due to MCP access limitations)

---

## 1. Goal

Replace the current homepage of `scandic-school` with a redesigned version that mirrors the Figma Make design. Introduce new brand color tokens (teal, orange-CTA, navy) into the Tailwind theme without removing the existing palette, so other pages continue to render unchanged. Replace the Header globally with a new Figma-styled component (preserving menu items, dropdowns, language switcher). Keep the existing Footer untouched.

## 2. Scope

**In scope:**
- New homepage at `src/app/page.tsx` composed of 14 v3 sections
- New shared `<Header>` (Figma visual, existing menu items/links/language switcher)
- Tailwind theme extension: `brand-teal-*`, `brand-orange-*`, `brand-navy-*`, `mint-accent` token families
- `[data-theme="v3"]` CSS scope on the homepage root that overrides shadcn semantic tokens (`--primary`, `--accent`) for homepage-only repainting
- Localization in all three locales: `ru`, `en`, `kk` (translations written by Claude during implementation)
- Reuse of existing `<PartnersSection>` and `<InstagramCarousel>` placed before `<Footer>`
- Stock photography from Unsplash placed in `public/images/homepage-v3/`
- Mobile responsive layouts (designer's discretion, since Figma did not provide mobile mockups)

**Out of scope:**
- Modifying `<Footer>`
- Modifying any other page (`/clubs`, `/tournaments`, `/about`, etc.) — they retain old `primary/secondary/accent` colors
- Removing the old homepage section components from the repo (`hero-section.tsx`, `founder-section.tsx`, `features-section.tsx`, `programs-section.tsx`, `achievements-section.tsx`, `cta-section.tsx`) — they remain as dead code, removal handled in a follow-up task
- Adding new backend endpoints, database tables, or API integrations
- Newsletter form submission backend (the form's submit handler is a stub for v3; wiring is a follow-up)

## 3. Tailwind Theme

### 3.1 New global CSS variables (`src/app/globals.css` `:root` block)

The full `brand-*` and `mint-accent` token families are defined globally, so the new `<Header>` (used on every page) can rely on them regardless of `data-theme`.

```css
:root {
  /* Brand teal — primary new color */
  --brand-teal-50:  246 253 245;   /* #ecfdf6 */
  --brand-teal-100: 209 250 233;
  --brand-teal-200: 167 240 212;
  --brand-teal-300: 110 224 187;
  --brand-teal-400: 61  201 158;
  --brand-teal-500: 30  171 132;
  --brand-teal-600: 15  140 108;
  --brand-teal-700: 10  111 87;
  --brand-teal-800: 13  79  68;    /* hero background */
  --brand-teal-900: 12  61  54;
  --brand-teal-950: 10  41  38;

  /* Brand orange — CTA color */
  --brand-orange-50:  255 247 237;
  --brand-orange-100: 255 237 213;
  --brand-orange-200: 254 215 170;
  --brand-orange-300: 253 186 116;
  --brand-orange-400: 251 146 60;
  --brand-orange-500: 249 115 22;   /* main CTA */
  --brand-orange-600: 234 88 12;
  --brand-orange-700: 194 65 12;

  /* Brand navy — footer / dark blocks */
  --brand-navy-50:  248 250 252;
  --brand-navy-100: 241 245 249;
  --brand-navy-700: 51  65  85;
  --brand-navy-800: 30  41  59;
  --brand-navy-900: 15  23  42;
  --brand-navy-950: 10  15  26;

  /* Mint accent — large statistic numbers on dark hero */
  --mint-accent:       168 230 210;
  --mint-accent-light: 197 240 224;
}
```

Color values are approximations from screenshots — **exact hex/RGB to be confirmed at implementation time** by sampling a high-fidelity screenshot or, if access is restored, via `mcp__claude_ai_Figma__get_variable_defs`. Adjustments do not change the architecture.

### 3.2 Homepage-only overrides

```css
[data-theme="v3"] {
  /* Override shadcn semantic tokens so v3 homepage sections that
     happen to use bg-primary/accent automatically pick the new palette */
  --primary: 13 79 68;            /* brand-teal-800 */
  --primary-foreground: 255 255 255;
  --accent: 249 115 22;           /* brand-orange-500 */
  --accent-foreground: 255 255 255;
}
```

The `data-theme` attribute is applied on the root `<div>` of `src/app/page.tsx` (not on `<body>`/layout). Other pages are unaffected.

### 3.3 `tailwind.config.ts` extension

Add to `extend.colors` alongside existing tokens (do not remove anything):

```ts
"brand-teal":   { 50: "rgb(var(--brand-teal-50)/<alpha-value>)", …, 950: "rgb(var(--brand-teal-950)/<alpha-value>)" },
"brand-orange": { 50: "rgb(var(--brand-orange-50)/<alpha-value>)", …, 700: "rgb(var(--brand-orange-700)/<alpha-value>)" },
"brand-navy":   { 50: "rgb(var(--brand-navy-50)/<alpha-value>)", …, 950: "rgb(var(--brand-navy-950)/<alpha-value>)" },
"mint-accent":  { DEFAULT: "rgb(var(--mint-accent)/<alpha-value>)", light: "rgb(var(--mint-accent-light)/<alpha-value>)" },
```

(RGB-channel format chosen so `bg-brand-teal-700/40` opacity utilities work.)

### 3.4 Typography
Keep existing `Montserrat` for `font-sans` and `font-display`. No font changes.

### 3.5 Spacing / radius / shadow
Reuse existing Tailwind defaults. Cards in Figma use `rounded-2xl` (16 px) and `rounded-3xl` (24 px), already covered.

## 4. File Structure

### 4.1 New files

```
src/
├── app/
│   ├── page.tsx                          # rewritten — composes v3 sections
│   └── globals.css                       # adds :root brand-* and [data-theme="v3"] vars
├── components/
│   ├── header.tsx                        # rewritten — Figma visual, old menu/links preserved
│   └── homepage-v3/
│       ├── hero-v3.tsx
│       ├── founder-v3.tsx
│       ├── potential-v3.tsx
│       ├── education-cards-v3.tsx
│       ├── stem-v3.tsx
│       ├── philosophy-v3.tsx
│       ├── campus-v3.tsx
│       ├── extracurriculars-v3.tsx
│       ├── support-programs-v3.tsx
│       ├── admission-steps-v3.tsx
│       ├── cta-orange-v3.tsx
│       ├── testimonials-v3.tsx
│       ├── school-life-v3.tsx
│       ├── ambitions-v3.tsx
│       └── shared/
│           ├── section-heading.tsx       # eyebrow + title
│           ├── feature-card.tsx          # generic white/teal card
│           └── stat-card.tsx             # for AmbitionsV3
└── public/
    └── images/
        └── homepage-v3/
            ├── founder-portrait.jpg
            ├── student-with-book.jpg
            ├── campus-lab.jpg
            ├── classroom-1.jpg
            ├── classroom-2.jpg
            ├── extracurricular-music.jpg
            ├── testimonial-1.jpg
            ├── testimonial-2.jpg
            └── testimonial-3.jpg
            (Unsplash, license-free)
```

### 4.2 Untouched files (intentionally)
- `src/components/footer.tsx`
- `src/components/partners-section.tsx`
- `src/components/instagram-carousel.tsx`
- All non-homepage pages and their components
- `src/lib/server-locale.ts` (existing i18n infrastructure)

### 4.3 Files left in place but unused after this change
- `src/components/hero-section.tsx`
- `src/components/founder-section.tsx`
- `src/components/features-section.tsx`
- `src/components/programs-section.tsx`
- `src/components/achievements-section.tsx`
- `src/components/cta-section.tsx`

## 5. Page Composition (`src/app/page.tsx`)

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

## 6. Localization

### 6.1 Pattern
Each v3 section is an **async server component** that reads the current locale via `getLocale()` from `@/lib/server-locale` and selects from an inline translations object literal. This matches the most recent feature's pattern (`community-page-content.tsx`).

```tsx
import { getLocale } from "@/lib/server-locale";

const translations = {
  ru: { /* Russian content from Figma */ },
  en: { /* English translation */ },
  kk: { /* Kazakh translation */ },
} as const;

export async function HeroV3() {
  const locale = await getLocale();
  const t = translations[locale];
  return ( /* JSX using t.title, t.subtitle, t.cta1, etc. */ );
}
```

The inline objects are kept inside the component file — no shared content module. Each section is self-contained.

### 6.2 Why not extend `messages/*.json`?
The existing JSON files contain v2-era content (`hero.welcome`, `features.items.respect`, etc.). Mixing v3 keys would couple v2 and v3 lifecycles. v2 components keep using JSON; v3 sections use inline objects.

### 6.3 Translation responsibility
Russian content is taken verbatim from Figma. English and Kazakh translations are produced by Claude during implementation, following the tone of existing translations in `getTranslationsSync()`.

## 7. New Header (component contract)

### 7.1 Visual
- `bg-white border-b border-brand-navy-100 sticky top-0 z-50`
- Height `h-16` desktop / `h-14` mobile
- Left: round logo "S" — `w-10 h-10 rounded-full border-2 border-brand-teal-700 flex items-center justify-center text-brand-teal-800 font-bold`
- Center: navigation (desktop) / hidden behind burger (mobile)
- Right: language switcher + `bg-brand-orange-500 text-white rounded-full px-5 py-2` "Записаться" / "Apply" / "Өтініш беру"

### 7.2 Content (preserved from current Header)
Existing dropdowns, menu items, language switcher behavior, mobile drawer logic. Implementation reads the current Header to extract these and reapplies them inside the new visual shell.

### 7.3 Where it lives
`src/components/header.tsx` is **rewritten in place**. All consumers (`app/page.tsx`, `app/clubs/page.tsx`, etc.) automatically get the new header. No conditional rendering by route.

## 8. Section Contracts

Each section is a server component returning a `<section>` element. Sections take **no props**. Internal layout details below; refer to brainstorming part 3 for the full visual reference. Color references use `brand-*` tokens.

### 8.1 `HeroV3`
- Full-width, `bg-brand-teal-800` with radial gradient toward `brand-teal-900`, `min-h-[80vh]`
- Center content stack: round "S" logo (80×80), `<h1>` "Scandic International School", subtitle "Scandic Mektebi", large slogan "Больше чем знания! Больше чем школа!"
- Two CTAs: filled `bg-brand-orange-500` "Записаться на экскурсию" + outline `border border-white text-white` "Подать заявку"
- Bottom meta strip: "Кандидат школа IB · PYP · Уральск, ул. Жданова 7/1 · Открыт набор на 2026-2027"
- Animations: existing `animate-fade-in-up` on title and CTAs

### 8.2 `FounderV3`
- `bg-white py-20`, centered "Слово основателя" eyebrow + title
- Card `bg-brand-teal-50 rounded-3xl p-8 shadow-sm` two-column
- Left: round photo 200×200 (`/images/homepage-v3/founder-portrait.jpg`), name "Амир Бимухамбетов", role label
- Right: large quote-mark icon, multi-paragraph quote, signature line

### 8.3 `PotentialV3`
- `bg-brand-teal-50 py-20`
- Left half: eyebrow "миссия школы", large multi-line `<h2>` ("Мы раскрываем потенциал каждого ученика, развивая мышление и формируя сильную личность для уверенного будущего")
- Right half: two stacked cards `bg-white rounded-2xl p-6` ("Всестороннее развитие" + "Практическое обучение"), each with a top-left icon

### 8.4 `EducationCardsV3`
- `bg-white py-20`, centered title "Образование, которое готовит к будущему" + subtitle
- Grid `md:grid-cols-3 gap-4`, 6 cards `bg-brand-teal-50 rounded-2xl p-6`
- Card content: top icon, title, description
- Items: статус кандидата IB, сотрудничество с The LINKS, Scandic Extreme Challenge, малые классы, тренинговый центр, STEM-фокус, критическое мышление, благополучие, подготовка в топ-100 вузов (final list extracted exactly from Figma)

### 8.5 `StemV3`
- `bg-brand-teal-50 py-20`
- Eyebrow "академическая программа", large `<h2>` ("Междисциплинарный подход: фокус на STEM и развитие личности")
- Two stage cards: "Начальная школа" + "Средняя и старшая школа" (`bg-white rounded-2xl`, checklist bullets)
- Subheading "Предметные области" + grid `md:grid-cols-2 gap-4` of 4 cards: Естественные науки, Математика, Языковые программы, Искусство и история

### 8.6 `PhilosophyV3`
- `bg-brand-teal-50 py-20`, two columns
- Left: eyebrow "академическое лидерство", `<h2>` "Философия образования, где дети процветают", paragraph, "№1" badge
- Right: photo (`student-with-book.jpg`) + 6 bullets ("Доверие к ученикам", "Обучение на природе", "Сотрудничество с инженерами", "Без домашних заданий до 10 лет", "Радость в обучении", "Учитель — дитя — родитель"), each with `bg-brand-teal-100` icon

### 8.7 `CampusV3`
- `bg-white py-20`
- Title + subtitle "Современная образовательная среда в Уральске"
- Two side-by-side images (`campus-lab.jpg`, `classroom-1.jpg`) with `rounded-2xl`. Caption badge "Экспериментальная лаборатория" overlaid on left image
- 4 inline features row: Лаборатории, Спортзалы, Концертный зал, IT-классы
- "Блоки школы" subheading + 3 cards: Начальная школа / Средняя и старшая школа / Выпускной этап
- Bottom CTA strip `bg-brand-teal-700 rounded-2xl text-white p-6`: "Посетите наш кампус" + button

### 8.8 `ExtracurricularsV3`
- `bg-brand-teal-50 py-20`, two columns
- Left: eyebrow, `<h2>` "Развитие за пределами учебных программ", paragraph, "50+" badge
- Right: photo (`extracurricular-music.jpg`) + grid `md:grid-cols-2 gap-4` of 4 categories: STEM и Технологии, Спорт и Здоровье, Языки и Культура, Творчество и Искусство

### 8.9 `SupportProgramsV3`
- `bg-white py-20`, title "Программы поддержки"
- 3-card row `md:grid-cols-3`: "Поддержка работы одарённых детей", "Выходные занятия", "Родительский клуб"
- Below: highlighted block `bg-brand-teal-700 text-white rounded-2xl p-6` for "Scandic Extreme Challenge"

### 8.10 `AdmissionStepsV3`
- `bg-white py-20`, title "Как стать частью Scandic International School" + subtitle
- 6 step cards in `md:grid-cols-3` grid: Заявка на поступление, Подача заявки, Собеседование, Зачисление, Малые классы, Гибкая оплата
- Card style: `border border-brand-teal-200 rounded-2xl p-6`, step number top-left `bg-brand-teal-100 text-brand-teal-700 rounded-full w-8 h-8`
- Mobile: horizontal scroll-snap

### 8.11 `CtaOrangeV3`
- Full-width `bg-brand-orange-500 py-16`
- Centered `<h2 className="text-white">` "Готовы начать?", subtitle
- Two CTAs: filled `bg-white text-brand-orange-600` "Записаться на экскурсию" + outline white "Связаться с нами"
- Small phone caption "+7 706 610 57 81"

### 8.12 `TestimonialsV3`
- `bg-white py-20`, title "Что говорят семьи о Scandic"
- 3 testimonial cards in `md:grid-cols-3`: 5 stars (`fill-brand-orange-400`), quote, avatar circle (`testimonial-N.jpg`) + name + role ("Родитель ученика 3 класса")

### 8.13 `SchoolLifeV3`
- `bg-brand-teal-50 py-20`, title "Жизнь школы", subtitle
- Two-column layout
- Left: "Предстоящие события" — 3 event cards each with date pill, tag, title, short description
- Right: `bg-brand-orange-500 rounded-2xl text-white p-6` newsletter signup — title, paragraph, email input, submit button
- Newsletter submit handler is a stub (`onSubmit` logs to console; backend wiring is a follow-up task)

### 8.14 `AmbitionsV3`
- `bg-brand-teal-800 py-20 text-white`, title "Наши Амбиции до 2030 года"
- 4 stat cards row `md:grid-cols-4 gap-4` (`bg-brand-teal-700/40 rounded-2xl p-6 backdrop-blur-sm`):
  - "3 уровня" / "Полный цикл IB" / "PYP, MYP, DP"
  - ">200" / "учеников с высокими результатами" / "Качество важнее количества"
  - ">20" / "педагогов международного уровня" / "Лучшие специалисты"
  - "<100" / "Поступление в ведущие 100 вузов мира" / "Топовые университеты"
- Bottom: paragraph "Присоединяйтесь к нашему путешествию к образованию будущего" + `bg-brand-orange-500` button "Стать частью истории"

## 9. Shared Components

### 9.1 `<SectionHeading>`
```tsx
type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  variant?: "light" | "dark";   // adjusts text color for dark backgrounds
};
```
- Eyebrow: `text-sm uppercase tracking-wider text-brand-teal-700` (light) or `text-mint-accent` (dark)
- Title: `text-3xl md:text-4xl font-display font-bold`
- Subtitle: `mt-3 text-brand-navy-700 max-w-2xl`

### 9.2 `<FeatureCard>`
```tsx
type Props = {
  icon?: ReactNode;
  title: string;
  description: string;
  variant?: "white" | "teal-50" | "teal-700";
};
```
- Wraps a card with consistent `rounded-2xl p-6` padding, icon top-left in `bg-brand-teal-100 rounded-lg w-10 h-10` for light variants

### 9.3 `<StatCard>`
```tsx
type Props = {
  value: string;        // "3", ">200", "<100"
  label: string;        // "уровня"
  sublabel?: string;    // "Полный цикл IB"
  meta?: string;        // "PYP, MYP, DP"
};
```
- Used only in `AmbitionsV3`
- Background `bg-brand-teal-700/40 rounded-2xl p-6`
- Value text `text-mint-accent text-5xl font-display font-bold`

## 10. Mobile Strategy

Figma did not provide mobile mockups; mobile layout is the implementer's discretion within these rules:

- All two-column sections collapse to single column at `md` breakpoint, image first, text second (or text first if eyebrow is present)
- Grids `md:grid-cols-3` collapse to `grid-cols-1` on mobile, with horizontal scroll-snap fallback for `AdmissionStepsV3` (6 cards is too many to stack)
- Hero `min-h-[70vh]` on mobile, headline scales `text-4xl md:text-6xl`
- Header collapses to burger drawer (use existing drawer logic from current Header)
- Cards remain `rounded-2xl` (no smaller radii on mobile)
- Padding scales: sections `py-12 md:py-20`, container `px-4 md:px-8`

## 11. Assets

All photos are sourced from Unsplash (free license) and downloaded into `public/images/homepage-v3/`. No remote image domains added. The implementation phase chooses specific photos that match Figma's compositions; placeholder slots in this spec are illustrative.

Suggested search queries for sourcing:
- `founder-portrait.jpg` — middle-aged Kazakh businessman, professional headshot
- `student-with-book.jpg` — child reading, natural light
- `campus-lab.jpg` — modern school science lab
- `classroom-1.jpg`, `classroom-2.jpg` — modern classroom interiors
- `extracurricular-music.jpg` — children with musical instruments
- `testimonial-1/2/3.jpg` — friendly headshots of parents (varied ages)

## 12. Implementation Order (informational — full plan in writing-plans)

1. Branch creation: `git checkout -b feat/v3 feat/v2`
2. Tailwind theme: `globals.css` + `tailwind.config.ts` extension; verify build
3. Header rewrite (visual change applies across the whole site immediately — sanity-check other pages still work)
4. Image assets downloaded to `public/images/homepage-v3/`
5. Shared components (`section-heading`, `feature-card`, `stat-card`)
6. Sections built one-by-one in `app/page.tsx` order, each with all 3 locale strings
7. Mobile responsive pass (each section at `sm`, `md`, `lg` breakpoints)
8. Manual QA in browser: golden path (each section visible, CTAs clickable), language switching, navigation to other pages still works

## 13. Risks and Open Questions

- **Color values are approximations.** When the implementation begins, sample exact hex/RGB from a high-fidelity screenshot or, if Figma MCP access is restored, fetch tokens via `get_variable_defs`. Architecture does not change.
- **Header rewrite affects all pages.** A side-effect QA pass on `/clubs`, `/tournaments`, `/about` is required to verify the new Header renders correctly there.
- **Newsletter form is a stub** in `SchoolLifeV3`. Wiring to a real backend is a follow-up task.
- **Specific Figma content not visible in screenshots** (e.g., exact 6 IB-card titles, exact admission-steps copy) will be transcribed during implementation by reading the screenshots character-by-character; if a card title is illegible, the implementation phase asks the user before improvising.
- **Old homepage section components are left in repo as dead code.** A separate removal task is created after v3 ships and stabilizes.
