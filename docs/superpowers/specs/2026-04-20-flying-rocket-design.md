# Flying Rocket — Scroll-driven Animation for «Наши достижения» Section

**Дата:** 2026-04-20
**Секция:** `src/components/achievements-section.tsx`

## Цель

Оживить блок «Наши достижения» сюжетной анимацией: существующая статичная ракета в правой части блока сначала «стартует» (уменьшается и исчезает), после чего маленькая версия той же ракеты летает по криволинейной траектории вокруг карточек достижений, связана со скроллом пользователя, при обратном скролле движется назад по тому же пути.

## Поведенческие требования

- **Транcформация**: единая ракета — большая статичная на входе в секцию уменьшается и передаёт эстафету маленькой летающей. Нет дублирования двух ракет.
- **Привязка к скроллу**: гибрид. Вертикальная позиция жёстко связана с `scrollYProgress` секции. Горизонтальная — S-образная волна. Поверх — автономные «бочки» (вращения на 360°) в фиксированных точках прогресса.
- **Реверс**: при обратном скролле вверх ракета движется по траектории назад. Реализуется естественно через `useTransform(scrollYProgress, ...)` — это чистая функция от прогресса, не time-based анимация.
- **Мобильные**: полная версия работает на всех breakpoints, включая `<md`. Без упрощений (по решению заказчика).
- **Начало**: при `scrollYProgress` ≈ 0 маленькая ракета в правом верхнем углу секции (80% от ширины).
- **Конец**: при `scrollYProgress` ≈ 1 ракета уходит вниз за границу секции с плавным `opacity` fade-out на последних 8% прогресса.
- **Доступность**: при `prefers-reduced-motion: reduce` полёт отключается, видна только статичная большая ракета (текущее поведение).

## Архитектура

### Новый компонент `FlyingRocket`

Файл: `src/components/flying-rocket.tsx`

Принимает `sectionRef: React.RefObject<HTMLElement>` и использует `useScroll({ target: sectionRef, offset: ['start end', 'end start'] })` для получения `scrollYProgress`.

Структура:

```
<motion.div> (absolute, pointer-events-none, z-20)
  style={{ x, y, rotate, opacity }}  — всё через useTransform от scrollYProgress
  <motion.div> (continuous barrel rolls at progress 0.3, 0.55, 0.8)
    <SmallRocketSVG />
  <TrailDots /> — 4 точки-хвост с задержкой через useMotionValue
```

### Изменения в `AchievementsSection`

- Передать существующий `ref` в `useScroll` (уже используется для `useInView`, совместимо).
- Обернуть `<RocketIllustration />` в `motion.div` с `style={{ scale, opacity }}`, привязанными к `scrollYProgress`:
  - `scale`: `useTransform(progress, [0, 0.1, 0.2], [1, 0.8, 0])`
  - `opacity`: `useTransform(progress, [0, 0.1, 0.18], [1, 1, 0])`
- Добавить `<FlyingRocket sectionRef={ref} />` сразу после существующего контейнера ракеты.
- `FlyingRocket` появляется (opacity) с `useTransform(progress, [0.15, 0.22], [0, 1])`.

## Траектория

Привязки через `useTransform`:

**Y (вертикаль)**
```
useTransform(progress, [0.15, 0.95], ['5%', '95%'])
```

**X (горизонталь)** — 8 опорных точек создают волну:
```
useTransform(progress,
  [0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.92],
  ['80%', '45%', '65%', '30%', '70%', '40%', '75%', '88%']
)
```

**Rotate (наклон по движению)** — отражает горизонтальную скорость:
```
useTransform(progress, [...], [...])  — дискретные углы от -25° до +25°
```

**Barrel rolls (автономные петли)** — вложенный `motion.div` с `animate={{ rotate: 360 }}` запускается через `useMotionValueEvent('change')` при пересечении точек 0.3 / 0.55 / 0.8, длительность 0.8 с.

**Opacity fade-out**:
```
useTransform(progress, [0, 0.15, 0.92, 1], [0, 1, 1, 0])
```

## Визуал маленькой ракеты

- Переиспользуем SVG из `RocketIllustration`, выделив markup в `SmallRocketSVG` (или экспортируем из нового файла).
- Контейнер: `w-[80px] md:w-[100px]`.
- Убрать/упростить `filter: url(#softGlow)` на мобильных для производительности.
- Пламя и дымок оставить — они уже animated.

## Trail (хвост)

4 `motion.circle` (или `motion.div` с rounded-full) на координатах через `useMotionValue` с постепенной задержкой (0.08с × индекс). Каждая точка следует позади ракеты с уменьшающимися `opacity` (0.5 → 0.1) и `scale` (0.8 → 0.3).

## Производительность

- Контейнер `FlyingRocket`: `pointer-events-none` — не блокирует клики по карточкам.
- `will-change: transform, opacity` на motion-элементах.
- `prefers-reduced-motion`: через hook `useReducedMotion()` из framer-motion — если true, рендерим `null` из `FlyingRocket` и оставляем большую статичную ракету без scale-анимации.
- Все анимации на GPU-композитных свойствах (`transform`, `opacity`), без `top/left/width/height`.

## Файлы

**Создать:**
- `src/components/flying-rocket.tsx` — `FlyingRocket` компонент + `SmallRocketSVG` + `TrailDots`.

**Изменить:**
- `src/components/achievements-section.tsx`:
  - Добавить `useScroll` на секцию.
  - Обернуть `<RocketIllustration />` в `motion.div` с scale/opacity transforms.
  - Добавить `<FlyingRocket sectionRef={ref} />`.

## Нерешённое / из коробки

- Точные значения опорных точек X могут потребовать визуальной подстройки в браузере после первой реализации — это ожидаемо для анимаций.
- На очень высоких viewport (>2000px) траектория может выглядеть растянутой; по умолчанию это приемлемо, но если возникнет проблема — можно ограничить максимальное смещение через `clamp`.
