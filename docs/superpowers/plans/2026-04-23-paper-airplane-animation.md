# Paper Airplane Animation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Animate a paper airplane flying from "Заявка" button to the header, then continuing from the header to the application form card on page transition.

**Architecture:** A global overlay component in `layout.tsx` renders the airplane SVG. A custom hook manages animation state, coordinates with sessionStorage for cross-page continuity. The overlay uses framer-motion for path animation with CSS transforms for wobble.

**Tech Stack:** React, framer-motion (already installed), Next.js App Router, sessionStorage

---

## File Structure

| Action | Path | Responsibility |
|--------|------|---------------|
| Create | `src/components/paper-airplane-overlay.tsx` | Global overlay: renders animated airplane SVG + trail, fixed z-9999 |
| Create | `src/hooks/use-paper-airplane.ts` | Hook: triggerFlight / triggerLanding logic, position calc, state |
| Create | `src/components/paper-airplane-svg.tsx` | Pure SVG component for the paper airplane |
| Modify | `src/app/layout.tsx` | Add `<PaperAirplaneOverlay />` |
| Modify | `src/components/programs-cards.tsx` | Add onClick to "Заявка" link to trigger phase 1 |
| Modify | `src/components/client-header.tsx` | Add `data-apply-button` to desktop apply button |
| Modify | `src/components/application-form.tsx` | Add `data-application-card` to Card, trigger phase 2 on mount |

---

### Task 1: Create Paper Airplane SVG Component

**Files:**
- Create: `src/components/paper-airplane-svg.tsx`

- [ ] **Step 1: Create the SVG component**

```tsx
// src/components/paper-airplane-svg.tsx
'use client';

interface PaperAirplaneSvgProps {
  size?: number;
  className?: string;
}

export function PaperAirplaneSvg({ size = 32, className = '' }: PaperAirplaneSvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main body */}
      <path
        d="M2 16L28 4L20 28L16 18L2 16Z"
        fill="#2d6a2d"
        stroke="#1a4a24"
        strokeWidth="0.5"
      />
      {/* Inner fold line */}
      <path
        d="M28 4L16 18"
        stroke="#1a4a24"
        strokeWidth="0.8"
      />
      {/* Top wing highlight */}
      <path
        d="M2 16L28 4L16 18Z"
        fill="#4ade80"
        opacity="0.35"
      />
      {/* Bottom wing shadow */}
      <path
        d="M2 16L16 18L20 28Z"
        fill="#1a4a24"
        opacity="0.15"
      />
    </svg>
  );
}
```

- [ ] **Step 2: Verify it renders**

Run: `npm run dev` (already running)
Open browser, temporarily import and render the SVG in any visible component to confirm it looks like a paper airplane. Remove after verification.

- [ ] **Step 3: Commit**

```bash
git add src/components/paper-airplane-svg.tsx
git commit -m "feat: add paper airplane SVG component"
```

---

### Task 2: Create the usePaperAirplane Hook

**Files:**
- Create: `src/hooks/use-paper-airplane.ts`

- [ ] **Step 1: Create the hooks directory if needed and the hook file**

```ts
// src/hooks/use-paper-airplane.ts
'use client';

import { useState, useCallback, useRef } from 'react';

const SESSION_KEY = 'paperAirplane';

export interface FlightPath {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export type FlightPhase = 'idle' | 'phase1' | 'phase2';

export function usePaperAirplane() {
  const [phase, setPhase] = useState<FlightPhase>('idle');
  const [flightPath, setFlightPath] = useState<FlightPath | null>(null);
  const onCompleteRef = useRef<(() => void) | null>(null);

  const triggerFlight = useCallback((startRect: DOMRect, onComplete: () => void) => {
    const headerBtn = document.querySelector('[data-apply-button]');
    if (!headerBtn) {
      // No header button visible (mobile) — skip animation
      onComplete();
      return;
    }

    const endRect = headerBtn.getBoundingClientRect();

    setFlightPath({
      startX: startRect.left + startRect.width / 2,
      startY: startRect.top + startRect.height / 2,
      endX: endRect.left + endRect.width / 2,
      endY: endRect.top + endRect.height / 2,
    });
    onCompleteRef.current = onComplete;
    setPhase('phase1');
  }, []);

  const triggerLanding = useCallback(() => {
    const headerBtn = document.querySelector('[data-apply-button]');
    const formCard = document.querySelector('[data-application-card]');
    if (!headerBtn || !formCard) return;

    const startRect = headerBtn.getBoundingClientRect();
    const endRect = formCard.getBoundingClientRect();

    setFlightPath({
      startX: startRect.left + startRect.width / 2,
      startY: startRect.top + startRect.height / 2,
      endX: endRect.right - 24,
      endY: endRect.top + 24,
    });
    setPhase('phase2');
  }, []);

  const onAnimationComplete = useCallback(() => {
    if (phase === 'phase1') {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setPhase('idle');
      setFlightPath(null);
      onCompleteRef.current?.();
      onCompleteRef.current = null;
    } else if (phase === 'phase2') {
      sessionStorage.removeItem(SESSION_KEY);
      setPhase('idle');
      setFlightPath(null);
    }
  }, [phase]);

  const shouldLand = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(SESSION_KEY) === 'true';
  }, []);

  return {
    phase,
    flightPath,
    triggerFlight,
    triggerLanding,
    onAnimationComplete,
    shouldLand,
  };
}
```

- [ ] **Step 2: Commit**

```bash
mkdir -p src/hooks
git add src/hooks/use-paper-airplane.ts
git commit -m "feat: add usePaperAirplane hook with flight/landing logic"
```

---

### Task 3: Create the PaperAirplaneOverlay Component

**Files:**
- Create: `src/components/paper-airplane-overlay.tsx`

- [ ] **Step 1: Create the overlay component**

```tsx
// src/components/paper-airplane-overlay.tsx
'use client';

import { motion } from 'framer-motion';
import { PaperAirplaneSvg } from './paper-airplane-svg';
import { FlightPath, FlightPhase } from '@/hooks/use-paper-airplane';

interface PaperAirplaneOverlayProps {
  phase: FlightPhase;
  flightPath: FlightPath | null;
  onAnimationComplete: () => void;
}

function getControlPoints(path: FlightPath, phase: FlightPhase) {
  const { startX, startY, endX, endY } = path;
  const dx = endX - startX;
  const dy = endY - startY;

  if (phase === 'phase1') {
    // Loop at start + curve upward to header
    return {
      // Small loop: go down-right then back up
      loop1X: startX + 30,
      loop1Y: startY + 40,
      loop2X: startX - 20,
      loop2Y: startY - 30,
      // Then curve to header button
      cp1X: startX + dx * 0.2,
      cp1Y: startY + dy * 0.6,
      cp2X: startX + dx * 0.7,
      cp2Y: endY - 20,
    };
  }
  // Phase 2: gentle curve down from header to form card
  return {
    loop1X: startX,
    loop1Y: startY,
    loop2X: startX,
    loop2Y: startY,
    cp1X: startX + dx * 0.3,
    cp1Y: startY + 60,
    cp2X: endX + 40,
    cp2Y: endY - 30,
  };
}

export function PaperAirplaneAnimation({ phase, flightPath, onAnimationComplete }: PaperAirplaneOverlayProps) {
  if (phase === 'idle' || !flightPath) return null;

  const cp = getControlPoints(flightPath, phase);
  const { startX, startY, endX, endY } = flightPath;

  // Build keyframes for x, y positions along the path
  const isPhase1 = phase === 'phase1';
  const totalDuration = isPhase1 ? 1.2 : 1.0;

  // For phase1: loop (0-0.2) + flight (0.2-1.0)
  // For phase2: direct flight (0-1.0)
  const xKeyframes = isPhase1
    ? [startX, cp.loop1X, cp.loop2X, cp.cp1X, cp.cp2X, endX]
    : [startX, cp.cp1X, cp.cp2X, endX];

  const yKeyframes = isPhase1
    ? [startY, cp.loop1Y, cp.loop2Y, cp.cp1Y, cp.cp2Y, endY]
    : [startY, cp.cp1Y, cp.cp2Y, endY];

  const timeStops = isPhase1
    ? [0, 0.1, 0.2, 0.5, 0.8, 1]
    : [0, 0.35, 0.7, 1];

  // Rotation: follow path direction + wobble
  const rotateKeyframes = isPhase1
    ? [0, 120, 360, -30, -15, 0]
    : [0, 25, 15, 0];

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    >
      {/* Trail */}
      <motion.div
        className="absolute w-1 h-1 rounded-full bg-[#2d6a2d]"
        initial={{ x: startX, y: startY, opacity: 0 }}
        animate={{
          x: xKeyframes,
          y: yKeyframes,
          opacity: [0, 0.3, 0.3, 0.2, 0.1, 0],
        }}
        transition={{
          duration: totalDuration,
          times: timeStops,
          ease: 'easeInOut',
        }}
      >
        {/* Trail dots */}
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#4ade80]"
            style={{ top: 0, left: 0 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.4, 0], scale: [0, 1, 0.5] }}
            transition={{
              duration: 0.6,
              delay: (i * totalDuration) / 6,
              ease: 'easeOut',
            }}
          />
        ))}
      </motion.div>

      {/* Airplane */}
      <motion.div
        className="absolute"
        style={{ marginLeft: -16, marginTop: -16 }}
        initial={{
          x: startX,
          y: startY,
          rotate: 0,
          scale: 0.5,
          opacity: 0,
        }}
        animate={{
          x: xKeyframes,
          y: yKeyframes,
          rotate: rotateKeyframes,
          scale: [0.5, 1, 1, 1, 1, 0.7],
          opacity: [0, 1, 1, 1, 1, 0],
        }}
        transition={{
          duration: totalDuration,
          times: timeStops,
          ease: 'easeInOut',
        }}
        onAnimationComplete={onAnimationComplete}
      >
        <PaperAirplaneSvg size={32} />
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/paper-airplane-overlay.tsx
git commit -m "feat: add PaperAirplaneAnimation overlay component"
```

---

### Task 4: Create PaperAirplaneProvider Context & Add to Layout

**Files:**
- Create: `src/contexts/paper-airplane-context.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create the context provider**

This wraps the hook + overlay into a single provider so any component can trigger flights.

```tsx
// src/contexts/paper-airplane-context.tsx
'use client';

import { createContext, useContext, ReactNode } from 'react';
import { usePaperAirplane } from '@/hooks/use-paper-airplane';
import { PaperAirplaneAnimation } from '@/components/paper-airplane-overlay';

interface PaperAirplaneContextType {
  triggerFlight: (startRect: DOMRect, onComplete: () => void) => void;
  triggerLanding: () => void;
  shouldLand: () => boolean;
}

const PaperAirplaneContext = createContext<PaperAirplaneContextType | null>(null);

export function PaperAirplaneProvider({ children }: { children: ReactNode }) {
  const { phase, flightPath, triggerFlight, triggerLanding, onAnimationComplete, shouldLand } =
    usePaperAirplane();

  return (
    <PaperAirplaneContext.Provider value={{ triggerFlight, triggerLanding, shouldLand }}>
      {children}
      <PaperAirplaneAnimation
        phase={phase}
        flightPath={flightPath}
        onAnimationComplete={onAnimationComplete}
      />
    </PaperAirplaneContext.Provider>
  );
}

export function usePaperAirplaneContext() {
  const ctx = useContext(PaperAirplaneContext);
  if (!ctx) throw new Error('usePaperAirplaneContext must be used within PaperAirplaneProvider');
  return ctx;
}
```

- [ ] **Step 2: Add PaperAirplaneProvider to layout.tsx**

In `src/app/layout.tsx`, add the import and wrap children:

```tsx
import { PaperAirplaneProvider } from "@/contexts/paper-airplane-context";
```

Inside the `<CartProvider>` block, wrap `{children}` with `<PaperAirplaneProvider>`:

```tsx
<CartProvider>
  <PaperAirplaneProvider>
    {children}
  </PaperAirplaneProvider>
  <CartSidebar />
  <CartButton />
</CartProvider>
```

- [ ] **Step 3: Commit**

```bash
git add src/contexts/paper-airplane-context.tsx src/app/layout.tsx
git commit -m "feat: add PaperAirplaneProvider context and mount in layout"
```

---

### Task 5: Add data-apply-button to Header

**Files:**
- Modify: `src/components/client-header.tsx:156-161`

- [ ] **Step 1: Add data attribute to desktop apply button**

Find the desktop apply button (line ~156):

```tsx
<Button asChild className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200">
  <Link href="/application" className="flex items-center space-x-2">
```

Change to:

```tsx
<Button asChild className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200" data-apply-button>
  <Link href="/application" className="flex items-center space-x-2">
```

Note: `data-apply-button` on `Button` with `asChild` will forward to the underlying `Link`/`a` element via Radix Slot.

- [ ] **Step 2: Commit**

```bash
git add src/components/client-header.tsx
git commit -m "feat: add data-apply-button attribute to header apply button"
```

---

### Task 6: Wire Phase 1 — Program Cards "Заявка" Click

**Files:**
- Modify: `src/components/programs-cards.tsx:172-179`

- [ ] **Step 1: Import context and useRouter**

Add at the top of `programs-cards.tsx`:

```tsx
import { useRouter } from 'next/navigation';
import { usePaperAirplaneContext } from '@/contexts/paper-airplane-context';
```

- [ ] **Step 2: Add hook calls inside ProgramsCards component**

Inside the `ProgramsCards` function body (after line 101), add:

```tsx
const router = useRouter();
const { triggerFlight } = usePaperAirplaneContext();
```

- [ ] **Step 3: Replace the Link CTA with a button that triggers animation**

Replace the current CTA `<Link>` (lines 173-179):

```tsx
<Link
  href={p.applicationUrl}
  className={`inline-flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-base shadow-lg ${c.btn} active:scale-[0.97] transition-all duration-200`}
>
  {p.buttonText}
  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
</Link>
```

With:

```tsx
<button
  onClick={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Check if desktop (header button visible)
    const headerBtn = document.querySelector('[data-apply-button]');
    if (!headerBtn || window.innerWidth < 1024) {
      router.push(p.applicationUrl);
      return;
    }
    triggerFlight(rect, () => {
      router.push(p.applicationUrl);
    });
  }}
  className={`inline-flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-base shadow-lg ${c.btn} active:scale-[0.97] transition-all duration-200`}
>
  {p.buttonText}
  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
</button>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/programs-cards.tsx
git commit -m "feat: wire paper airplane phase 1 on program card click"
```

---

### Task 7: Wire Phase 2 — Application Form Landing

**Files:**
- Modify: `src/components/application-form.tsx:149`

- [ ] **Step 1: Import context and add useEffect**

Add imports at top of `application-form.tsx`:

```tsx
import { useEffect, useRef } from "react";
import { usePaperAirplaneContext } from '@/contexts/paper-airplane-context';
```

Note: `useState` is already imported. Change the existing `import { useState }` to `import { useState, useEffect, useRef }`.

- [ ] **Step 2: Add hook call and landing trigger in component body**

Inside the component function, after the existing hook calls, add:

```tsx
const { triggerLanding, shouldLand } = usePaperAirplaneContext();
const hasLanded = useRef(false);

useEffect(() => {
  if (hasLanded.current) return;
  if (!shouldLand()) return;
  hasLanded.current = true;
  // Small delay to let the page render and elements settle
  const timer = setTimeout(() => {
    triggerLanding();
  }, 300);
  return () => clearTimeout(timer);
}, [triggerLanding, shouldLand]);
```

- [ ] **Step 3: Add data attribute to Card**

Find the Card element (line ~149):

```tsx
<Card className="w-full max-w-xl mx-auto">
```

Change to:

```tsx
<Card className="w-full max-w-xl mx-auto" data-application-card>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/application-form.tsx
git commit -m "feat: wire paper airplane phase 2 landing on application form"
```

---

### Task 8: Add Header Button Pulse on Phase 1 Arrival

**Files:**
- Modify: `src/components/paper-airplane-overlay.tsx`

- [ ] **Step 1: Add pulse effect when phase 1 completes**

In the `PaperAirplaneAnimation` component, after the `onAnimationComplete` handler fires for phase 1, pulse the header button. Update the `onAnimationComplete` prop passed to the airplane's `motion.div`:

Replace the `onAnimationComplete={onAnimationComplete}` on the airplane motion.div with:

```tsx
onAnimationComplete={() => {
  // Pulse the target element
  const targetSelector = phase === 'phase1' ? '[data-apply-button]' : '[data-application-card]';
  const target = document.querySelector(targetSelector) as HTMLElement | null;
  if (target) {
    target.style.transition = 'transform 0.15s ease-out, box-shadow 0.15s ease-out';
    target.style.transform = 'scale(1.08)';
    target.style.boxShadow = '0 0 20px rgba(45, 106, 45, 0.4)';
    setTimeout(() => {
      target.style.transform = 'scale(1)';
      target.style.boxShadow = '';
      setTimeout(() => {
        target.style.transition = '';
        target.style.transform = '';
        onAnimationComplete();
      }, 200);
    }, 200);
  } else {
    onAnimationComplete();
  }
}}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/paper-airplane-overlay.tsx
git commit -m "feat: add pulse effect on airplane arrival at target"
```

---

### Task 9: Test Full Flow End-to-End

**Files:** none (testing only)

- [ ] **Step 1: Test phase 1 on desktop**

1. Open `http://localhost:3000` in browser (desktop width >= 1024px)
2. Scroll to "Наши программы" section
3. Click "Заявка" on any program card
4. Verify: paper airplane appears, does a small loop, flies up to header "Подать заявку" button
5. Verify: header button pulses briefly
6. Verify: page navigates to `/application` with correct query params

- [ ] **Step 2: Test phase 2 on application page**

1. After phase 1 navigation completes, verify on `/application`:
2. Paper airplane appears from header button area
3. Flies down to form card top-right corner
4. Form card glows/pulses briefly
5. Airplane disappears

- [ ] **Step 3: Test mobile fallback**

1. Resize browser to < 1024px width
2. Click "Заявка" on a program card
3. Verify: no animation, direct navigation to `/application`

- [ ] **Step 4: Test direct navigation**

1. Navigate directly to `/application` via URL bar (no sessionStorage flag)
2. Verify: no airplane animation plays, form loads normally

- [ ] **Step 5: Tune animation timing if needed**

Adjust these values in `paper-airplane-overlay.tsx` based on feel:
- `totalDuration` for phase1 (default 1.2s) and phase2 (default 1.0s)
- Control point offsets in `getControlPoints` for curve shape
- Wobble rotation angles in `rotateKeyframes`
- Scale keyframes for size during flight

- [ ] **Step 6: Commit any tuning changes**

```bash
git add -A
git commit -m "fix: tune paper airplane animation timing and curves"
```
