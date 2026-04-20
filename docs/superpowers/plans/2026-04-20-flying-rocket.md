# Flying Rocket Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Превратить статичную ракету в блоке «Наши достижения» в scroll-driven летающую анимацию с реверсивной криволинейной траекторией и автономными петлями.

**Architecture:** Большая `RocketIllustration` уменьшается и исчезает в первые 18% прогресса секции. Новый компонент `FlyingRocket` появляется и летает по S-образной траектории, привязанной к `scrollYProgress` через `useTransform`, с тремя автономными «бочками» в фиксированных точках. Полная реверсивность достигается за счёт того, что все трансформы — чистые функции от прогресса, а не time-based.

**Tech Stack:** Next.js 15, React 19, framer-motion 12, Tailwind CSS 4, TypeScript.

**Spec:** [docs/superpowers/specs/2026-04-20-flying-rocket-design.md](../specs/2026-04-20-flying-rocket-design.md)

**Testing note:** Проект использует vitest с `environment: 'node'` (без jsdom). Рендер-тесты React-компонентов не поддерживаются без дополнительной инфраструктуры, которую разворачивать под одну анимацию — scope creep. Верификация = TypeScript check (`npx tsc --noEmit`), lint (`npm run lint`), manual browser check через запущенный `npm run dev` на http://localhost:3000. Dev сервер уже работает в фоне (background task `b80ytei57`).

---

### Task 1: Выделить SmallRocketSVG из RocketIllustration

**Files:**
- Create: `src/components/flying-rocket.tsx`
- Read: `src/components/achievements-section.tsx:67-231`

Компонент `SmallRocketSVG` — та же графика, что в `RocketIllustration`, но без внешнего wrapper'а и без `opacity: 0.5`. Параметр `className` для управления размером снаружи.

- [ ] **Step 1: Создать файл `src/components/flying-rocket.tsx` со скелетом**

```tsx
'use client';

import { motion } from 'framer-motion';

export function SmallRocketSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: 'drop-shadow(0 8px 16px rgba(45,106,36,0.25))' }}
    >
      <defs>
        <linearGradient id="fr-bodyGrad" x1="60" y1="0" x2="140" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#d4d8e0" />
          <stop offset="40%" stopColor="#f0f2f5" />
          <stop offset="70%" stopColor="#e2e6eb" />
          <stop offset="100%" stopColor="#c8cdd6" />
        </linearGradient>
        <linearGradient id="fr-noseGrad" x1="80" y1="60" x2="120" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#b8bdc6" />
          <stop offset="50%" stopColor="#dde2e8" />
          <stop offset="100%" stopColor="#b0b5be" />
        </linearGradient>
        <linearGradient id="fr-finGrad" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#1a4a24" />
          <stop offset="100%" stopColor="#2d6a2d" />
        </linearGradient>
        <radialGradient id="fr-windowGrad" cx="40%" cy="35%" r="60%" fx="30%" fy="30%" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#166534" />
        </radialGradient>
        <radialGradient id="fr-flameOuter" cx="50%" cy="0%" r="70%">
          <stop offset="0%" stopColor="#ffb400" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#f97316" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="fr-flameInner" cx="50%" cy="0%" r="60%">
          <stop offset="0%" stopColor="#fff7ed" stopOpacity="1" />
          <stop offset="40%" stopColor="#fbbf24" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
        </radialGradient>
      </defs>

      <motion.ellipse
        cx="100" cy="390" rx="28" ry="60"
        fill="url(#fr-flameOuter)"
        animate={{ ry: [60, 75, 52, 70, 58], opacity: [0.7, 1, 0.6, 0.9, 0.7] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.ellipse
        cx="100" cy="385" rx="14" ry="35"
        fill="url(#fr-flameInner)"
        animate={{ ry: [35, 45, 28, 42, 32], opacity: [0.9, 1, 0.8, 1, 0.85] }}
        transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.ellipse
        cx="100" cy="378" rx="6" ry="16"
        fill="white"
        opacity={0.9}
        animate={{ ry: [16, 22, 12, 20, 15] }}
        transition={{ duration: 0.3, repeat: Infinity, ease: 'easeInOut' }}
      />

      <path d="M82 290 L48 360 L82 345 Z" fill="url(#fr-finGrad)" opacity="0.95" />
      <path d="M118 290 L152 360 L118 345 Z" fill="url(#fr-finGrad)" opacity="0.95" />

      <path d="M86 340 Q82 360 82 368 L118 368 Q118 360 114 340 Z" fill="#9ca3af" />
      <path d="M88 368 L112 368 L114 375 L86 375 Z" fill="#6b7280" />

      <rect x="72" y="140" width="56" height="205" rx="6" fill="url(#fr-bodyGrad)" />
      <rect x="76" y="145" width="10" height="195" rx="3" fill="white" opacity="0.25" />
      <rect x="118" y="145" width="8" height="195" rx="3" fill="#9ca3af" opacity="0.3" />

      <rect x="72" y="275" width="56" height="12" rx="2" fill="#ffb400" opacity="0.9" />
      <rect x="72" y="295" width="56" height="5" rx="1" fill="#ffb400" opacity="0.4" />

      <path d="M72 140 Q72 80 100 60 Q128 80 128 140 Z" fill="url(#fr-noseGrad)" />
      <path d="M76 138 Q76 90 98 72" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.3" />

      <circle cx="100" cy="210" r="22" fill="#1a4a24" opacity="0.15" />
      <circle cx="100" cy="210" r="18" stroke="#2d6a2d" strokeWidth="3" fill="none" />
      <circle cx="100" cy="210" r="15" fill="#0f4c1e" />
      <circle cx="100" cy="210" r="15" fill="url(#fr-windowGrad)" opacity="0.8" />
      <ellipse cx="95" cy="204" rx="5" ry="4" fill="white" opacity="0.45" transform="rotate(-20 95 204)" />

      <line x1="100" y1="60" x2="100" y2="42" stroke="#9ca3af" strokeWidth="2" />
      <circle cx="100" cy="40" r="4" fill="#ffb400" />
      <circle cx="100" cy="40" r="2" fill="white" />
    </svg>
  );
}
```

Заметка: используем префикс `fr-` в id градиентов, чтобы не конфликтовать с идентификаторами оригинального `RocketIllustration` на той же странице.

- [ ] **Step 2: Проверить TypeScript компиляцию**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/flying-rocket.tsx
git commit -m "feat: scaffold FlyingRocket with SmallRocketSVG markup"
```

---

### Task 2: Реализовать FlyingRocket со scroll-driven траекторией

**Files:**
- Modify: `src/components/flying-rocket.tsx`

Компонент получает `sectionRef`, использует `useScroll` + `useTransform` для вертикальной/горизонтальной позиции, наклона и opacity.

- [ ] **Step 1: Добавить FlyingRocket в `src/components/flying-rocket.tsx`**

Добавить в конец файла:

```tsx
import { useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { RefObject } from 'react';

interface FlyingRocketProps {
  sectionRef: RefObject<HTMLElement | null>;
}

export function FlyingRocket({ sectionRef }: FlyingRocketProps) {
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0.15, 0.95], ['5%', '95%']);

  const x = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.92],
    ['80%', '45%', '65%', '30%', '70%', '40%', '75%', '88%']
  );

  const rotate = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.92],
    [0, -20, 15, -25, 20, -15, 22, 0]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.92, 1],
    [0, 1, 1, 0]
  );

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-20"
      style={{ willChange: 'transform' }}
    >
      <motion.div
        className="absolute"
        style={{ x, y, rotate, opacity, willChange: 'transform, opacity' }}
      >
        <SmallRocketSVG className="w-[80px] md:w-[100px] -translate-x-1/2 -translate-y-1/2" />
      </motion.div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Проверить TypeScript**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/flying-rocket.tsx
git commit -m "feat: add FlyingRocket scroll-driven trajectory"
```

---

### Task 3: Добавить автономные «бочки» (barrel rolls)

**Files:**
- Modify: `src/components/flying-rocket.tsx`

При прохождении прогресса через 0.3 / 0.55 / 0.8 ракета делает одиночный поворот на 360° поверх scroll-линкованного наклона. Реализуется через вложенный `motion.div` с imperative `animate()` по `useMotionValueEvent`.

- [ ] **Step 1: Добавить логику barrel rolls в FlyingRocket**

Обновить `src/components/flying-rocket.tsx`: импорты добавить `useAnimation`, `useMotionValueEvent` (уже из framer-motion), `useRef`. Внутри `FlyingRocket` добавить до `if (prefersReducedMotion)`:

```tsx
import { useAnimation, useMotionValueEvent } from 'framer-motion';
import { useRef } from 'react';

// внутри компонента:
const rollControls = useAnimation();
const triggered = useRef<Set<number>>(new Set());
const rollPoints = [0.3, 0.55, 0.8];

useMotionValueEvent(scrollYProgress, 'change', (latest) => {
  for (const p of rollPoints) {
    const key = p;
    const isPast = latest >= p;
    if (isPast && !triggered.current.has(key)) {
      triggered.current.add(key);
      rollControls.start({ rotate: 360, transition: { duration: 0.8, ease: 'easeInOut' } })
        .then(() => rollControls.set({ rotate: 0 }));
    } else if (!isPast && triggered.current.has(key)) {
      // Reset when scrolling backward past the point so the roll re-triggers next forward pass
      triggered.current.delete(key);
    }
  }
});
```

И обновить JSX — обернуть SVG в ещё один `motion.div`:

```tsx
<motion.div
  className="absolute"
  style={{ x, y, rotate, opacity, willChange: 'transform, opacity' }}
>
  <motion.div animate={rollControls}>
    <SmallRocketSVG className="w-[80px] md:w-[100px] -translate-x-1/2 -translate-y-1/2" />
  </motion.div>
</motion.div>
```

- [ ] **Step 2: Проверить TypeScript**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/flying-rocket.tsx
git commit -m "feat: add autonomous barrel rolls at scroll progress points"
```

---

### Task 4: Добавить trail (хвост из точек)

**Files:**
- Modify: `src/components/flying-rocket.tsx`

4 полупрозрачные точки следуют за ракетой с нарастающей задержкой через `motion.div` с собственными трансформами и `transition.delay`.

- [ ] **Step 1: Добавить компонент TrailDots и подключить в FlyingRocket**

Добавить в `src/components/flying-rocket.tsx` перед `FlyingRocket`:

```tsx
import { MotionValue } from 'framer-motion';

interface TrailDotsProps {
  x: MotionValue<string>;
  y: MotionValue<string>;
  opacity: MotionValue<number>;
}

function TrailDots({ x, y, opacity }: TrailDotsProps) {
  const dots = [
    { delay: 0.08, size: 10, alpha: 0.5 },
    { delay: 0.16, size: 8, alpha: 0.35 },
    { delay: 0.24, size: 6, alpha: 0.22 },
    { delay: 0.32, size: 4, alpha: 0.12 },
  ];

  return (
    <>
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#ffb400]"
          style={{
            x,
            y,
            opacity,
            width: dot.size,
            height: dot.size,
            translateX: '-50%',
            translateY: '-50%',
          }}
          transition={{
            x: { delay: dot.delay, type: 'spring', stiffness: 60, damping: 20 },
            y: { delay: dot.delay, type: 'spring', stiffness: 60, damping: 20 },
          }}
          animate={{ opacity: dot.alpha }}
        />
      ))}
    </>
  );
}
```

Подключить внутри `FlyingRocket` перед основной ракетой:

```tsx
return (
  <motion.div className="absolute inset-0 pointer-events-none z-20" style={{ willChange: 'transform' }}>
    <TrailDots x={x} y={y} opacity={opacity} />
    <motion.div
      className="absolute"
      style={{ x, y, rotate, opacity, willChange: 'transform, opacity' }}
    >
      <motion.div animate={rollControls}>
        <SmallRocketSVG className="w-[80px] md:w-[100px] -translate-x-1/2 -translate-y-1/2" />
      </motion.div>
    </motion.div>
  </motion.div>
);
```

- [ ] **Step 2: Проверить TypeScript**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/flying-rocket.tsx
git commit -m "feat: add trail dots behind flying rocket"
```

---

### Task 5: Подключить FlyingRocket в AchievementsSection + scroll-driven fade большой ракеты

**Files:**
- Modify: `src/components/achievements-section.tsx`

`useScroll` на секции, `useTransform` для `scale` + `opacity` существующей `RocketIllustration` в диапазоне 0–0.18 прогресса, подключение `<FlyingRocket sectionRef={ref} />`.

- [ ] **Step 1: Обновить `src/components/achievements-section.tsx`**

Добавить в импорты:

```tsx
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { FlyingRocket } from './flying-rocket';
```

В теле `AchievementsSection` добавить после `const isInView`:

```tsx
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ['start end', 'end start'],
});

const bigRocketScale = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 0.8, 0]);
const bigRocketOpacity = useTransform(scrollYProgress, [0, 0.1, 0.18], [1, 1, 0]);
```

Найти существующий контейнер большой ракеты (начинается с `<div className="absolute right-0 top-0 bottom-0 w-[280px] md:w-[480px] ...">`) и обернуть **внешний плавающий** `motion.div` (тот что с `animate={{ y: [0, -18, 0] }}`) трансформами, либо применить их к родительскому `motion.div`. Проще — применить к самому внешнему `motion.div` с `initial={{ opacity: 0, x: 80 }}`:

```tsx
<motion.div
  className="w-full h-full"
  initial={{ opacity: 0, x: 80 }}
  animate={isInView ? { opacity: 1, x: 0 } : {}}
  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
  style={{ scale: bigRocketScale, opacity: bigRocketOpacity }}
>
```

Заметим: `opacity` будет контролироваться и initial/animate, и style — framer-motion корректно миксит (style перекрывает animate для тех же свойств после окончания initial animation). Чтобы избежать конфликта — убираем `opacity` из `initial`/`animate` и переносим в style:

```tsx
<motion.div
  className="w-full h-full"
  initial={{ x: 80 }}
  animate={isInView ? { x: 0 } : {}}
  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
  style={{ scale: bigRocketScale, opacity: bigRocketOpacity }}
>
```

Добавить `<FlyingRocket sectionRef={ref} />` сразу после закрытия `</div>` контейнера большой ракеты (строка с `</div>` после закрытия вложенного `motion.div`). Чтобы точно не промахнуться, поместим его внутри секции, на том же уровне что и `<div className="container ...">`:

```tsx
<FlyingRocket sectionRef={ref} />

<div className="container mx-auto px-4 relative z-10">
```

- [ ] **Step 2: Проверить TypeScript**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: no new errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/achievements-section.tsx
git commit -m "feat: fade out big rocket and mount FlyingRocket on scroll"
```

---

### Task 6: Визуальная верификация в браузере

**Files:**
- None (manual verification)

Dev server уже запущен в фоне на http://localhost:3000. Если нет — `npm run dev`.

- [ ] **Step 1: Открыть страницу и найти блок «Наши достижения»**

В браузере: http://localhost:3000 → scroll до блока с заголовком «Наши достижения». До входа в секцию большая ракета должна быть на своём месте.

- [ ] **Step 2: Медленный скролл — проверить передачу эстафеты**

В первые 20% высоты секции:
- Большая ракета должна плавно уменьшиться (`scale` 1 → 0.8 → 0) и исчезнуть.
- Маленькая ракета должна появиться в правой верхней части секции (~80% ширины, ~5% высоты).

- [ ] **Step 3: Средний скролл — проверить волнообразную траекторию**

При 20%–90% прогресса:
- Ракета движется вниз.
- X-координата волнит: правый угол → центр → правее → левее → правее → снова уходит вправо.
- При изменении направления движения по X ракета наклоняется в соответствующую сторону.

- [ ] **Step 4: Проверить три бочки**

Примерно на 30%, 55%, 80% прогресса ракета делает полный оборот на 360° (вдобавок к наклону). Scroll вверх через ту же точку — на следующем прохождении вниз бочка повторится.

- [ ] **Step 5: Проверить выход**

На последних ~8% прогресса секции ракета плавно исчезает (fade-out), не обрезается резко.

- [ ] **Step 6: Реверс**

Прокрутить вверх — ракета должна полностью пройти траекторию назад вплоть до правого верхнего угла и затем вернуться в форму большой статичной ракеты.

- [ ] **Step 7: Trail**

Позади ракеты видны 4 жёлтые точки с уменьшающейся непрозрачностью, повторяющие траекторию с задержкой.

- [ ] **Step 8: Клики по карточкам**

Кликабельны ли карточки достижений при полёте ракеты поверх них? `pointer-events-none` на контейнере должно обеспечивать прохождение кликов. Достижения — `cursor-default`, так что если ссылок нет, проверяем через hover: при наведении на карточку должен срабатывать hover-стиль (border + translate).

- [ ] **Step 9: Reduced motion**

В macOS: System Settings → Accessibility → Display → Reduce motion. Перезагрузить страницу. Маленькая летающая ракета не должна рендериться; большая остаётся статичной без scale-анимации (но scroll-driven scale всё равно применяется — это OK, если смущает, можно отдельно учесть, но spec говорит «текущее поведение», т.е. большая видна как раньше). Если критично — добавить ветвь в `AchievementsSection` (не обязательно).

- [ ] **Step 10: Mobile viewport**

В Chrome DevTools включить iPhone 12 Pro. Прокрутить секцию — ракета размером ~80px летает поверх карточек. Карточки читаются и кликаются. Если ракета перекрывает критичный текст — отметить, но без изменений в коде; задача выполнена согласно спеке (пользователь выбрал «полная версия на мобильных»).

- [ ] **Step 11: Production build**

Run: `npm run build`
Expected: build success, no new errors/warnings.

- [ ] **Step 12: Если всё ок — финальный коммит и push**

Если в ходе верификации были правки — закоммитить их единым коммитом:

```bash
git add -A
git commit -m "fix: tune flying rocket trajectory after visual verification"
git push
```

Если правок не было — просто `git push`.

---

## Self-Review

**1. Spec coverage:**
- Трансформация большой ракеты в маленькую: Task 5 (scale/opacity на большой) + Task 2 (появление маленькой с fade-in через opacity transform) ✓
- Гибрид scroll-linked + автономные петли: Task 2 (scroll-linked x/y/rotate) + Task 3 (barrel rolls) ✓
- Реверсивность: Task 3 явно сбрасывает triggered при обратном скролле; trajectory через useTransform реверсивна by design ✓
- Мобильная полная версия: Task 2 размер `w-[80px] md:w-[100px]`, без упрощений для мобильных ✓
- Начало траектории top-right (80%, 5%): Task 2 опорные точки ✓
- Конец с fade-out внизу: Task 2 opacity transform [0.92, 1] → [1, 0] ✓
- Prefers-reduced-motion: Task 2 `useReducedMotion` возвращает null ✓
- Trail: Task 4 ✓
- Pointer-events-none: Task 2, верификация в Task 6 Step 8 ✓

**2. Placeholder scan:** нет TBD/TODO, нет «add validation», нет «similar to Task N». Все шаги имеют конкретный код или команды. ✓

**3. Type consistency:** `FlyingRocketProps.sectionRef` — `RefObject<HTMLElement | null>`. Использование в Task 5 с `ref = useRef(null)` — совместимо (React 19 useRef<HTMLElement>(null) возвращает RefObject<HTMLElement | null>). `SmallRocketSVG({ className })` — используется в Task 2 и Task 3 одинаково. `TrailDots` принимает `MotionValue<string>` для x/y и `MotionValue<number>` для opacity — согласуется с типами из `useTransform`. ✓

**Выполнены все требования спеки.**
