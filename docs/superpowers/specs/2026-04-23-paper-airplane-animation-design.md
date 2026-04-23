# Paper Airplane Animation — Design Spec

Cross-page animation connecting the "Заявка" button in program cards to the application form on `/application`.

## Overview

When a user clicks "Заявка" on a program card, an animated paper airplane flies from the button up to the "Подать заявку" button in the sticky header, then after navigation to `/application`, the same airplane emerges from the header button and lands on the "Запрос на зачисление" form card.

## Animation Phases

### Phase 1 — Homepage (`/`)

1. User clicks "Заявка" on any program card
2. Prevent default navigation; capture the button's DOM position
3. Spawn a paper airplane SVG overlay at the button's position
4. Airplane performs a small loop at takeoff (360deg arc, ~200ms)
5. Airplane flies along a smooth cubic bezier curve up to the "Подать заявку" button in the sticky header
6. During flight: gentle rotation wobble (±8deg oscillation), dashed trail fading behind
7. On arrival: header button pulses briefly (scale 1.0 → 1.08 → 1.0, ~300ms)
8. Write `paperAirplane: true` to `sessionStorage`
9. Execute `router.push('/application?...')` with original query params

**Duration:** ~1200ms total (200ms loop + 800ms flight + 200ms pulse before navigation)

### Phase 2 — Application Page (`/application`)

1. On mount, check `sessionStorage` for `paperAirplane` flag
2. If present: locate the header "Подать заявку" button and the form `<Card>` element
3. Spawn airplane at header button position
4. Airplane flies along a smooth curve down to the top-right corner of the form card
5. On arrival: form card glows briefly (box-shadow pulse with brand green, ~400ms)
6. Remove airplane from DOM
7. Delete `paperAirplane` from `sessionStorage`

**Duration:** ~1000ms total (800ms flight + 200ms glow)

**If no flag:** no animation, page loads normally.

## Paper Airplane SVG

- Style: folded paper airplane silhouette
- Colors: body `#2d6a2d`, inner fold accent `#4ade80`
- Size: ~32x32px
- Orientation: rotates to follow the flight path tangent
- Wobble: ±8deg sinusoidal oscillation during flight (3 cycles)

## Trail Effect

- Dashed line following the airplane path
- Color: `#2d6a2d` at 30% opacity
- Fades out from tail (newest segments visible, older segments fade)
- Disappears after airplane arrives

## Architecture

### Components

1. **`PaperAirplaneOverlay`** — global overlay component, rendered in `layout.tsx`
   - Fixed position, `pointer-events: none`, `z-index: 9999`
   - Listens to a trigger (custom event or context)
   - Renders the airplane SVG + trail during animation
   - Uses framer-motion for path animation

2. **`usePaperAirplane` hook** — shared logic
   - `triggerFlight(startRect, endRect, onComplete)` — animate phase 1
   - `triggerLanding(startRect, endRect, onComplete)` — animate phase 2
   - Manages airplane visibility and position state

3. **Modifications to existing components:**
   - `programs-cards.tsx` — wrap "Заявка" `<Link>` with onClick handler that triggers phase 1, then navigates
   - `client-header.tsx` — add `data-apply-button` attribute to "Подать заявку" button for DOM targeting
   - `application-form.tsx` — add `data-application-card` attribute to form Card, trigger phase 2 on mount if flag exists
   - `layout.tsx` — add `<PaperAirplaneOverlay />`

### State Transfer

- `sessionStorage.setItem('paperAirplane', 'true')` — set before navigation
- `sessionStorage.removeItem('paperAirplane')` — clear after phase 2 completes
- No other cross-page state needed

### Position Calculation

- Use `getBoundingClientRect()` on source and target elements
- Header is sticky `top-0`, so its button position is stable
- Calculate bezier control points dynamically based on source/target positions
- Phase 1 control points: curve upward with slight leftward arc
- Phase 2 control points: curve downward toward card top-right

## Edge Cases

- **Mobile:** header button is inside collapsed menu — skip animation on mobile (`< 1024px`), navigate directly
- **Fast navigation:** if page transitions before animation completes, abort gracefully
- **No target found:** if header button or form card not found in DOM, skip animation
- **Repeated clicks:** ignore if animation already in progress

## Dependencies

- `framer-motion` (already installed) — for path animation and spring effects
- No new packages needed
