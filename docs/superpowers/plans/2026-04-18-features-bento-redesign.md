# Features Bento Grid Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static 3x2 features grid with an interactive bento grid featuring Lottie animations and auto-cycling card highlights.

**Architecture:** Server component `FeaturesSection` fetches translations and passes serializable data to a new client component `FeaturesBentoGrid` that handles Lottie loading, auto-cycle state, and hover interactions. Follows the existing `ProgramsSection` → `ProgramsCards` pattern.

**Tech Stack:** Next.js, React, lottie-react (already installed), Tailwind CSS, IntersectionObserver API

---

### Task 1: Download Lottie animation JSON files

**Files:**
- Create: `public/lottie/heart.json`
- Create: `public/lottie/target.json`
- Create: `public/lottie/community.json`
- Create: `public/lottie/knowledge.json`
- Create: `public/lottie/globe.json`
- Create: `public/lottie/shield.json`

- [ ] **Step 1: Download 6 Lottie JSON files from LottieFiles**

Download free Lottie animations matching each card theme. Use the LottieFiles public API or website. Save each as a JSON file in `public/lottie/`.

Required animations:
| File | Theme | Search query suggestion |
|------|-------|------------------------|
| `heart.json` | Pulsing heart | "heart beat", "heart pulse" |
| `target.json` | Target/bullseye hit | "target", "bullseye", "goal" |
| `community.json` | People/teamwork | "teamwork", "community", "people together" |
| `knowledge.json` | Book/lightbulb | "book reading", "lightbulb idea", "education" |
| `globe.json` | Spinning globe | "globe spin", "earth rotate", "world" |
| `shield.json` | Shield with checkmark | "shield check", "security shield", "protection" |

Keep files small (under 100KB each). Prefer simple, clean animations — no complex multi-scene ones.

- [ ] **Step 2: Verify all files are valid JSON**

```bash
for f in public/lottie/heart.json public/lottie/target.json public/lottie/community.json public/lottie/knowledge.json public/lottie/globe.json public/lottie/shield.json; do
  echo "$f: $(python3 -c "import json; json.load(open('$f')); print('OK')" 2>&1)"
done
```

Expected: all 6 print "OK"

- [ ] **Step 3: Commit**

```bash
git add public/lottie/heart.json public/lottie/target.json public/lottie/community.json public/lottie/knowledge.json public/lottie/globe.json public/lottie/shield.json
git commit -m "assets: add Lottie animation files for features section"
```

---

### Task 2: Create the FeaturesBentoGrid client component

**Files:**
- Create: `src/components/features-bento-grid.tsx`

**Dependencies:** This task depends on Task 1 (Lottie files must exist).

- [ ] **Step 1: Create the component file with types and props**

Create `src/components/features-bento-grid.tsx`:

```tsx
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

interface FeatureItem {
  title: string;
  description: string;
  lottieFile: string;
}

interface FeaturesBentoGridProps {
  features: FeatureItem[];
  sectionTitle: string;
  sectionSubtitle: string;
}

// Bento grid layout: which cards span 2 columns
// Row 0: [0: span-2] [1: span-1]
// Row 1: [2: span-1] [3: span-2]
// Row 2: [4: span-2] [5: span-1]
const LARGE_INDICES = new Set([0, 3, 4]);
const CYCLE_INTERVAL = 2000;

export function FeaturesBentoGrid({ features, sectionTitle, sectionSubtitle }: FeaturesBentoGridProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [animations, setAnimations] = useState<Record<number, unknown>>({});
  const sectionRef = useRef<HTMLDivElement>(null);
  const lottieRefs = useRef<(LottieRefCurrentProps | null)[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load all Lottie JSON files
  useEffect(() => {
    features.forEach((feature, index) => {
      fetch(feature.lottieFile)
        .then(r => r.json())
        .then(data => {
          setAnimations(prev => ({ ...prev, [index]: data }));
        })
        .catch(() => {});
    });
  }, [features]);

  // IntersectionObserver: start/stop cycle based on viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-cycle logic
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (isInView && !isPaused) {
      intervalRef.current = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % features.length);
      }, CYCLE_INTERVAL);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isInView, isPaused, features.length]);

  // Control Lottie playback based on active index
  useEffect(() => {
    lottieRefs.current.forEach((ref, i) => {
      if (!ref) return;
      if (i === activeIndex) {
        ref.goToAndPlay(0);
      } else {
        ref.goToAndStop(0);
      }
    });
  }, [activeIndex]);

  const handleMouseEnter = useCallback((index: number) => {
    setIsPaused(true);
    setActiveIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
  }, []);

  return (
    <section ref={sectionRef} className="py-14 md:py-20 bg-secondary/[0.02]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            {sectionTitle}
          </h2>
          <p className="text-lg text-secondary/60 max-w-2xl mx-auto">
            {sectionSubtitle}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const isActive = index === activeIndex;
            const isLarge = LARGE_INDICES.has(index);

            return (
              <div
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                className={`
                  relative rounded-2xl p-6 md:p-8 cursor-pointer
                  transition-all duration-500 ease-out
                  ${isLarge ? 'md:col-span-2' : 'md:col-span-1'}
                  ${isActive
                    ? 'bg-white ring-2 ring-primary border-l-4 border-l-primary shadow-lg scale-[1.02]'
                    : 'bg-secondary/5 border-l-4 border-l-transparent shadow-none scale-100'
                  }
                `}
              >
                <div className={`flex ${isLarge ? 'md:flex-row md:items-center md:gap-8' : 'flex-col'} gap-4`}>
                  {/* Lottie Animation */}
                  <div className={`
                    flex-shrink-0
                    ${isLarge ? 'w-20 h-20 md:w-28 md:h-28' : 'w-16 h-16 md:w-20 md:h-20'}
                    transition-all duration-500
                    ${isActive ? 'opacity-100' : 'opacity-40'}
                  `}>
                    {animations[index] ? (
                      <Lottie
                        lottieRef={(ref) => { lottieRefs.current[index] = ref; }}
                        animationData={animations[index]}
                        loop={false}
                        autoplay={false}
                        className="w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full rounded-xl bg-secondary/10 animate-pulse" />
                    )}
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`
                      font-bold mb-2 transition-colors duration-500
                      ${isLarge ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}
                      ${isActive ? 'text-secondary' : 'text-secondary/70'}
                    `}>
                      {feature.title}
                    </h3>
                    <p className={`
                      leading-relaxed transition-colors duration-500
                      ${isLarge ? 'text-base' : 'text-sm md:text-base'}
                      ${isActive ? 'text-secondary/70' : 'text-secondary/40'}
                    `}>
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Active indicator dot */}
                <div className={`
                  absolute top-4 right-4 w-2.5 h-2.5 rounded-full
                  transition-all duration-500
                  ${isActive ? 'bg-primary scale-100' : 'bg-secondary/20 scale-75'}
                `} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify the file compiles**

```bash
cd /Users/sharipnurseit/Documents/Projects/scandic-school && npx tsc --noEmit src/components/features-bento-grid.tsx 2>&1 | head -20
```

Expected: no errors (or only unrelated project-wide errors)

- [ ] **Step 3: Commit**

```bash
git add src/components/features-bento-grid.tsx
git commit -m "feat: add FeaturesBentoGrid client component with auto-cycle and Lottie"
```

---

### Task 3: Refactor FeaturesSection to use FeaturesBentoGrid

**Files:**
- Modify: `src/components/features-section.tsx`

**Dependencies:** This task depends on Task 2.

- [ ] **Step 1: Replace the entire contents of features-section.tsx**

Replace `src/components/features-section.tsx` with:

```tsx
import { getLocale, getTranslations } from '@/lib/server-locale';
import { FeaturesBentoGrid } from './features-bento-grid';

export async function FeaturesSection() {
  const locale = await getLocale();
  const translations = await getTranslations(locale);

  const features = [
    {
      title: translations.features.items.respect.title,
      description: translations.features.items.respect.description,
      lottieFile: '/lottie/heart.json',
    },
    {
      title: translations.features.items.excellence.title,
      description: translations.features.items.excellence.description,
      lottieFile: '/lottie/target.json',
    },
    {
      title: translations.features.items.community.title,
      description: translations.features.items.community.description,
      lottieFile: '/lottie/community.json',
    },
    {
      title: translations.features.items.knowledge.title,
      description: translations.features.items.knowledge.description,
      lottieFile: '/lottie/knowledge.json',
    },
    {
      title: translations.features.items.international.title,
      description: translations.features.items.international.description,
      lottieFile: '/lottie/globe.json',
    },
    {
      title: translations.features.items.safety.title,
      description: translations.features.items.safety.description,
      lottieFile: '/lottie/shield.json',
    },
  ];

  return (
    <FeaturesBentoGrid
      features={features}
      sectionTitle={translations.features.title}
      sectionSubtitle={translations.features.subtitle}
    />
  );
}
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/sharipnurseit/Documents/Projects/scandic-school && npm run build 2>&1 | tail -20
```

Expected: build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/features-section.tsx
git commit -m "refactor: delegate FeaturesSection rendering to FeaturesBentoGrid client component"
```

---

### Task 4: Visual QA and polish

**Files:**
- Modify: `src/components/features-bento-grid.tsx` (if adjustments needed)

**Dependencies:** This task depends on Task 3.

- [ ] **Step 1: Start dev server and visually inspect**

```bash
cd /Users/sharipnurseit/Documents/Projects/scandic-school && npm run dev
```

Open `http://localhost:3000` in browser. Check:
1. Bento grid layout renders correctly (large cards span 2 cols on desktop)
2. Auto-cycle highlights cards every 2 seconds
3. Lottie animations play on active card, pause on inactive
4. Hover pauses cycle and highlights hovered card
5. Mouse leave resumes cycle
6. Mobile layout shows single column
7. Section heading uses secondary color scheme
8. Transitions are smooth (500ms)

- [ ] **Step 2: Fix any visual issues found**

Common adjustments:
- If Lottie animations are too large/small, adjust the `w-` and `h-` classes on the Lottie container
- If cards feel too tight, adjust `gap-4` to `gap-5` or `gap-6`
- If the ring/border looks off, tweak `ring-2` or `border-l-4` thickness
- If inactive cards are too faded, change `opacity-40` to `opacity-50` and `text-secondary/40` to `text-secondary/50`

- [ ] **Step 3: Test all three locales**

Switch locale to Russian, English, and Kazakh. Verify:
- All text renders correctly in all locales
- Long Kazakh text doesn't break card layout
- Card sizing adapts to content length

- [ ] **Step 4: Commit final adjustments**

```bash
git add src/components/features-bento-grid.tsx
git commit -m "fix: polish features bento grid visual adjustments"
```
