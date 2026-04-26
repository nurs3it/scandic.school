'use client';

import { motion, useScroll, useTransform, useMotionValue, useAnimationFrame, MotionValue } from 'framer-motion';
import { useRef } from 'react';

export type ChapterId = 'teachers' | 'children' | 'parents';

export interface StoryChapter {
  id: ChapterId;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
}

export interface StoryFinale {
  label: string;
  title: string;
  subtitle: string;
  teachersLabel: string;
  childrenLabel: string;
  parentsLabel: string;
}

interface Props {
  chapters: StoryChapter[];
  finale: StoryFinale;
  storyTitle: string;
}

interface Palette {
  from: string;
  via: string;
  to: string;
  ghost: string;
  fillFrom: string;
  fillTo: string;
  accent: string;
  accentBg: string;
}

const PALETTES: Record<ChapterId, Palette> = {
  teachers: {
    from: 'from-secondary-900',
    via: 'via-secondary-800',
    to: 'to-secondary',
    ghost: 'rgba(255, 215, 130, 0.10)',
    fillFrom: '#fff8e1',
    fillTo: '#ffd54f',
    accent: 'text-primary',
    accentBg: 'bg-primary',
  },
  children: {
    from: 'from-primary-900',
    via: 'via-primary-700',
    to: 'to-primary',
    ghost: 'rgba(255, 255, 255, 0.10)',
    fillFrom: '#fff',
    fillTo: '#fff8e1',
    accent: 'text-secondary-100',
    accentBg: 'bg-white',
  },
  parents: {
    from: 'from-accent-900',
    via: 'via-accent-700',
    to: 'to-accent',
    ghost: 'rgba(255, 255, 255, 0.10)',
    fillFrom: '#fff',
    fillTo: '#ffe0b2',
    accent: 'text-primary-100',
    accentBg: 'bg-white',
  },
};

export function CommunityStoryScroll({ chapters, finale, storyTitle }: Props) {
  return (
    <>
      <DesktopStory chapters={chapters} finale={finale} storyTitle={storyTitle} />
      <MobileStory chapters={chapters} finale={finale} storyTitle={storyTitle} />
    </>
  );
}

function DesktopStory({ chapters, finale, storyTitle }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const xFinal = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

  const ranges: { start: number; end: number }[] = [
    { start: -0.08, end: 0.18 },
    { start: 0.20, end: 0.48 },
    { start: 0.52, end: 0.80 },
  ];

  return (
    <section ref={ref} aria-label={storyTitle} className="hidden lg:block relative h-[400vh] bg-secondary-900">
      <div className="sticky top-0 h-screen overflow-hidden">
        <ProgressBar progress={scrollYProgress} />
        <ScrollHint progress={scrollYProgress} />
        <motion.div className="flex h-full" style={{ x: xFinal, width: '400vw' }}>
          {chapters.map((ch, i) => (
            <ChapterPanelDesktop
              key={ch.id}
              chapter={ch}
              parentProgress={scrollYProgress}
              start={ranges[i]?.start ?? i * 0.25}
              end={ranges[i]?.end ?? (i + 1) * 0.25}
            />
          ))}
          <FinalePanelDesktop
            finale={finale}
            parentProgress={scrollYProgress}
            start={0.82}
            end={1.0}
          />
        </motion.div>
      </div>
    </section>
  );
}

function MobileStory({ chapters, finale, storyTitle }: Props) {
  return (
    <section className="lg:hidden" aria-label={storyTitle}>
      {chapters.map((ch) => (
        <ChapterPanelMobile key={ch.id} chapter={ch} />
      ))}
      <FinalePanelMobile finale={finale} />
    </section>
  );
}

function ProgressBar({ progress }: { progress: MotionValue<number> }) {
  const f1 = useTransform(progress, [0, 0.25], ['0%', '100%']);
  const f2 = useTransform(progress, [0.25, 0.5], ['0%', '100%']);
  const f3 = useTransform(progress, [0.5, 0.75], ['0%', '100%']);
  const f4 = useTransform(progress, [0.75, 1], ['0%', '100%']);
  const fills = [f1, f2, f3, f4];
  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
      {fills.map((fill, i) => (
        <div key={i} className="relative h-[3px] w-12 rounded-full bg-white/15 overflow-hidden">
          <motion.div className="absolute inset-y-0 left-0 bg-primary" style={{ width: fill }} />
        </div>
      ))}
    </div>
  );
}

function ScrollHint({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.05], [1, 0]);
  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-white/70"
    >
      <span className="text-xs uppercase tracking-[0.3em] font-semibold">scroll</span>
      <motion.svg
        width="14"
        height="22"
        viewBox="0 0 14 22"
        fill="none"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="1" y="1" width="12" height="20" rx="6" stroke="currentColor" strokeWidth="1.5" />
        <motion.rect
          x="6"
          y="5"
          width="2"
          height="4"
          rx="1"
          fill="currentColor"
          animate={{ y: [5, 11, 5], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.svg>
    </motion.div>
  );
}

function ChapterPanelDesktop({
  chapter,
  parentProgress,
  start,
  end,
}: {
  chapter: StoryChapter;
  parentProgress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const local = useTransform(parentProgress, [start, end], [0, 1], { clamp: true });
  const palette = PALETTES[chapter.id];

  return (
    <div className={`relative shrink-0 w-screen h-screen overflow-hidden bg-gradient-to-br ${palette.from} ${palette.via} ${palette.to}`}>
      <BackdropDecor progress={local} />
      <BigGhostTitle chapter={chapter} progress={local} palette={palette} />
      <div className="relative z-10 grid grid-cols-12 h-full">
        <div className="col-span-7 flex flex-col justify-end pl-12 xl:pl-20 pb-16 pr-8 max-w-[820px]">
          <ChapterEyebrow chapter={chapter} progress={local} palette={palette} />
          <ChapterDisplayTitle chapter={chapter} progress={local} palette={palette} />
          <ChapterReadingCard chapter={chapter} progress={local} palette={palette} />
        </div>
        <div className="col-span-5 relative">
          <SceneStage>
            <SceneByChapter id={chapter.id} progress={local} />
          </SceneStage>
        </div>
      </div>
    </div>
  );
}

function ChapterPanelMobile({ chapter }: { chapter: StoryChapter }) {
  const ref = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const { scrollYProgress: sceneScroll } = useScroll({ target: sceneRef, offset: ['start 90%', 'center 40%'] });
  const local = useTransform(scrollYProgress, [0.05, 0.45], [0, 1], { clamp: true });
  const sceneLocal = useTransform(sceneScroll, [0, 1], [0, 1], { clamp: true });
  const palette = PALETTES[chapter.id];

  return (
    <div ref={ref} className={`relative w-full overflow-hidden bg-gradient-to-br ${palette.from} ${palette.via} ${palette.to} pt-12 pb-14 px-5`}>
      <BackdropDecor progress={local} />
      <div className="relative z-10 max-w-md mx-auto">
        <ChapterEyebrow chapter={chapter} progress={local} palette={palette} />
        <ChapterDisplayTitle chapter={chapter} progress={local} palette={palette} mobile />
        <div ref={sceneRef} className="w-[88%] mx-auto aspect-square my-4">
          <SceneByChapter id={chapter.id} progress={sceneLocal} />
        </div>
        <ChapterReadingCard chapter={chapter} progress={local} palette={palette} />
      </div>
    </div>
  );
}

function SceneStage({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="relative w-[min(85vh,42vw)] aspect-square">{children}</div>
    </div>
  );
}

/* ============================================================
   TYPOGRAPHY: ghost outline behind + display title in front
   ============================================================ */

function BigGhostTitle({
  chapter,
  progress,
  palette,
}: {
  chapter: StoryChapter;
  progress: MotionValue<number>;
  palette: Palette;
}) {
  const opacity = useTransform(progress, [0, 0.18], [0, 1]);
  const x = useTransform(progress, [0, 0.22], [-80, 0]);

  return (
    <motion.div
      style={{ opacity, x }}
      className="pointer-events-none absolute top-[8%] -left-[1%] z-0 select-none whitespace-nowrap"
    >
      <span
        className="block font-black uppercase leading-[0.85] tracking-tight"
        style={{
          fontSize: 'clamp(8rem, 18vw, 22rem)',
          WebkitTextStroke: `1.5px ${palette.ghost}`,
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
        }}
      >
        {chapter.title}
      </span>
    </motion.div>
  );
}

function ChapterEyebrow({
  chapter,
  progress,
  palette,
}: {
  chapter: StoryChapter;
  progress: MotionValue<number>;
  palette: Palette;
}) {
  const opacity = useTransform(progress, [0, 0.10], [0, 1]);
  const x = useTransform(progress, [0, 0.12], [-30, 0]);
  return (
    <motion.div style={{ opacity, x }} className={`flex items-center gap-3 mb-6 ${palette.accent}`}>
      <span className={`w-12 h-[2px] ${palette.accentBg} rounded-full`} />
      <span className="text-xs font-bold uppercase tracking-[0.35em]">
        {chapter.eyebrow} {chapter.number}
      </span>
    </motion.div>
  );
}

function ChapterDisplayTitle({
  chapter,
  progress,
  palette,
  mobile = false,
}: {
  chapter: StoryChapter;
  progress: MotionValue<number>;
  palette: Palette;
  mobile?: boolean;
}) {
  const words = chapter.title.split(/\s+/);
  return (
    <h2
      className={`relative font-black uppercase leading-[0.92] tracking-[-0.02em] mb-6 break-words ${
        mobile ? 'text-[clamp(2.5rem,11vw,4.5rem)]' : 'text-[clamp(4.5rem,8.5vw,9rem)]'
      }`}
    >
      {words.map((w, i) => (
        <DisplayWord
          key={i}
          word={w}
          progress={progress}
          start={0.02 + i * 0.04}
          end={0.14 + i * 0.04}
          palette={palette}
        />
      ))}
    </h2>
  );
}

function DisplayWord({
  word,
  progress,
  start,
  end,
  palette,
}: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  palette: Palette;
}) {
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [60, 0]);
  return (
    <motion.span
      style={{
        opacity,
        y,
        backgroundImage: `linear-gradient(180deg, ${palette.fillFrom} 0%, ${palette.fillTo} 100%)`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
      }}
      className="inline-block mr-[0.18em] last:mr-0"
    >
      {word}
    </motion.span>
  );
}

function ChapterReadingCard({
  chapter,
  progress,
  palette,
}: {
  chapter: StoryChapter;
  progress: MotionValue<number>;
  palette: Palette;
}) {
  const cardOpacity = useTransform(progress, [0.08, 0.22], [0, 1]);
  const cardY = useTransform(progress, [0.08, 0.22], [40, 0]);

  return (
    <motion.div
      style={{ opacity: cardOpacity, y: cardY }}
      className="relative max-w-2xl rounded-2xl bg-black/45 backdrop-blur-xl border border-white/15 p-8 shadow-2xl"
    >
      <p className="text-white text-2xl md:text-3xl leading-[1.4] font-semibold mb-6">
        {chapter.description}
      </p>
      <ul className="space-y-4">
        {chapter.bullets.map((b, i) => (
          <BulletItem key={i} text={b} progress={progress} index={i} palette={palette} />
        ))}
      </ul>
    </motion.div>
  );
}

function BulletItem({
  text,
  progress,
  index,
  palette,
}: {
  text: string;
  progress: MotionValue<number>;
  index: number;
  palette: Palette;
}) {
  const start = 0.14 + index * 0.04;
  const end = 0.24 + index * 0.04;
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const x = useTransform(progress, [start, end], [-24, 0]);
  return (
    <motion.li style={{ opacity, x }} className="flex items-center gap-4 text-white/95">
      <span className={`w-8 h-8 rounded-full ${palette.accentBg} flex items-center justify-center flex-shrink-0`}>
        <svg width="16" height="16" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 6.5 L5 9 L9.5 3.5" stroke="currentColor" className="text-secondary-900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-lg md:text-xl font-semibold leading-snug">{text}</span>
    </motion.li>
  );
}

/* ============================================================
   BACKDROP: shared decorative layer per panel
   ============================================================ */

function BackdropDecor({ progress }: { progress: MotionValue<number> }) {
  const x1 = useTransform(progress, [0, 1], [0, 30]);
  const y1 = useTransform(progress, [0, 1], [0, -20]);
  const x2 = useTransform(progress, [0, 1], [0, -40]);
  const y2 = useTransform(progress, [0, 1], [0, 25]);
  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        style={{ x: x1, y: y1 }}
        className="absolute top-[10%] right-[5%] w-72 h-72 bg-white/[0.04] rounded-full blur-3xl"
      />
      <motion.div
        style={{ x: x2, y: y2 }}
        className="absolute bottom-[12%] left-[6%] w-96 h-96 bg-white/[0.05] rounded-full blur-3xl"
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
}

/* ============================================================
   SCENES — one polished SVG per chapter
   ============================================================ */

function SceneByChapter({ id, progress }: { id: ChapterId; progress: MotionValue<number> }) {
  if (id === 'teachers') return <SceneTeachers progress={progress} />;
  if (id === 'children') return <SceneChildren progress={progress} />;
  return <SceneParents progress={progress} />;
}

/* ---------------- TEACHERS: Lighthouse beacon guiding the way ---------------- */

function SceneTeachers({ progress }: { progress: MotionValue<number> }) {
  const haloOpacity = useTransform(progress, [0, 0.25], [0, 0.85]);
  const haloScale = useTransform(progress, [0, 0.4], [0.5, 1]);
  const towerY = useTransform(progress, [0, 0.35], [60, 0]);
  const towerOpacity = useTransform(progress, [0, 0.30], [0, 1]);
  const lampOpacity = useTransform(progress, [0.20, 0.50], [0, 1]);
  const beamRotate = useTransform(progress, [0, 1], [-12, 12]);
  const beamOpacity = useTransform(progress, [0.30, 0.55], [0, 0.9]);
  const orbsOpacity = useTransform(progress, [0.35, 0.65], [0, 1]);

  return (
    <svg viewBox="0 0 600 600" className="w-full h-full" aria-hidden>
      <defs>
        <radialGradient id="t-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd54f" stopOpacity="0.65" />
          <stop offset="60%" stopColor="#ffb400" stopOpacity="0.20" />
          <stop offset="100%" stopColor="#ffb400" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="t-tower" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f5f5f5" />
          <stop offset="50%" stopColor="#fff" />
          <stop offset="100%" stopColor="#cfcfcf" />
        </linearGradient>
        <linearGradient id="t-stripe" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#bf360c" />
          <stop offset="100%" stopColor="#e64a19" />
        </linearGradient>
        <linearGradient id="t-base" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1b5e20" />
          <stop offset="100%" stopColor="#0c3a14" />
        </linearGradient>
        <linearGradient id="t-beam" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fff8e1" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#ffd54f" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#ffb400" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="t-lamp" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="50%" stopColor="#ffd54f" />
          <stop offset="100%" stopColor="#ff8f00" />
        </radialGradient>
        <radialGradient id="t-orb" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fffbea" />
          <stop offset="60%" stopColor="#ffd54f" />
          <stop offset="100%" stopColor="#ff8f00" />
        </radialGradient>
        <filter id="t-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* sky halo */}
      <motion.circle
        cx="300"
        cy="180"
        r="200"
        fill="url(#t-halo)"
        style={{ opacity: haloOpacity, scale: haloScale, transformOrigin: '300px 180px' }}
      />

      {/* sea/cliff base */}
      <motion.g style={{ opacity: towerOpacity }}>
        <ellipse cx="300" cy="540" rx="220" ry="18" fill="#000" opacity="0.22" filter="url(#t-soft)" />
        <path d="M 130 530 Q 300 500 470 530 L 470 560 L 130 560 Z" fill="url(#t-base)" />
        <path d="M 150 525 Q 200 515 250 522" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.35" />
        <path d="M 320 520 Q 380 514 440 524" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.35" />
      </motion.g>

      {/* rotating beams from lamp (cone-like) */}
      <motion.g
        style={{ opacity: beamOpacity, rotate: beamRotate, transformOrigin: '300px 200px' }}
      >
        <path d="M 300 200 L 600 80 L 600 320 Z" fill="url(#t-beam)" />
        <path d="M 300 200 L 0 80 L 0 320 Z" fill="url(#t-beam)" transform="scale(-1,1) translate(-600,0)" />
        <path d="M 300 200 L 540 110 L 540 290 Z" fill="#fff8e1" opacity="0.45" />
      </motion.g>

      {/* lighthouse tower */}
      <motion.g style={{ y: towerY, opacity: towerOpacity }}>
        {/* base platform */}
        <rect x="240" y="490" width="120" height="32" rx="3" fill="url(#t-base)" />
        <rect x="232" y="486" width="136" height="10" rx="2" fill="#fff" opacity="0.75" />

        {/* tower body (slight taper) */}
        <path
          d="M 258 490 L 270 270 L 330 270 L 342 490 Z"
          fill="url(#t-tower)"
          stroke="#cfcfcf"
          strokeWidth="1"
        />
        {/* red horizontal stripes */}
        <path d="M 264 430 L 336 430 L 339 460 L 261 460 Z" fill="url(#t-stripe)" />
        <path d="M 268 360 L 332 360 L 335 388 L 265 388 Z" fill="url(#t-stripe)" />
        <path d="M 270 290 L 330 290 L 332 318 L 268 318 Z" fill="url(#t-stripe)" />

        {/* tower windows */}
        <circle cx="300" cy="410" r="4" fill="#1b5e20" opacity="0.65" />
        <circle cx="300" cy="340" r="4" fill="#1b5e20" opacity="0.65" />
        <circle cx="300" cy="470" r="4" fill="#1b5e20" opacity="0.65" />

        {/* gallery (platform under lantern room) */}
        <rect x="262" y="258" width="76" height="14" rx="2" fill="url(#t-base)" />
        <rect x="266" y="252" width="68" height="6" rx="1" fill="#fff" opacity="0.85" />

        {/* railing */}
        {[...Array(7)].map((_, i) => (
          <line
            key={i}
            x1={272 + i * 9}
            y1="252"
            x2={272 + i * 9}
            y2="246"
            stroke="#fff"
            strokeWidth="1.4"
            opacity="0.85"
          />
        ))}
      </motion.g>

      {/* lantern room (animated glow) */}
      <motion.g style={{ opacity: lampOpacity }}>
        {/* lantern enclosure */}
        <rect x="276" y="200" width="48" height="46" rx="2" fill="#1b5e20" />
        {/* glow lamp */}
        <motion.circle
          cx="300"
          cy="222"
          r="22"
          fill="url(#t-lamp)"
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* lamp glass frame */}
        <rect x="278" y="202" width="44" height="42" fill="none" stroke="#fff" strokeWidth="1.4" opacity="0.55" />
        <line x1="300" y1="202" x2="300" y2="244" stroke="#fff" strokeWidth="1" opacity="0.5" />
        {/* dome roof */}
        <path d="M 270 200 Q 300 168 330 200 Z" fill="url(#t-base)" />
        <path d="M 300 168 L 300 152" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        <circle cx="300" cy="150" r="3" fill="#ffd54f" />
        {/* aura pulse */}
        <motion.circle
          cx="300"
          cy="222"
          r="22"
          fill="none"
          stroke="#ffd54f"
          strokeWidth="2"
          animate={{ scale: [1, 1.8], opacity: [0.7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
          style={{ transformOrigin: '300px 222px' }}
        />
      </motion.g>

      {/* knowledge orbs floating around */}
      <motion.g style={{ opacity: orbsOpacity }}>
        <KnowledgeOrb cx={120} cy={150} r={22} symbol="A" delay={0} />
        <KnowledgeOrb cx={480} cy={170} r={24} symbol="π" delay={0.3} />
        <KnowledgeOrb cx={90} cy={350} r={18} symbol="∑" delay={0.6} />
        <KnowledgeOrb cx={510} cy={360} r={20} symbol="∞" delay={0.9} />
        <KnowledgeOrb cx={170} cy={80} r={16} symbol="✦" delay={0.4} />
      </motion.g>
    </svg>
  );
}

function KnowledgeOrb({ cx, cy, r, symbol, delay }: { cx: number; cy: number; r: number; symbol: string; delay: number }) {
  return (
    <motion.g
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <circle cx={cx} cy={cy} r={r + 6} fill="#ffb400" opacity="0.18" />
      <circle cx={cx} cy={cy} r={r} fill="url(#t-orb)" />
      <text
        x={cx}
        y={cy + r * 0.3}
        textAnchor="middle"
        fontSize={r * 0.85}
        fontWeight="800"
        fill="#1b5e20"
        fontFamily="Montserrat, sans-serif"
      >
        {symbol}
      </text>
    </motion.g>
  );
}

/* ---------------- CHILDREN: Tree of growth with child silhouette ---------------- */

function SceneChildren({ progress }: { progress: MotionValue<number> }) {
  const sunOpacity = useTransform(progress, [0, 0.3], [0, 1]);
  const sunScale = useTransform(progress, [0, 0.4], [0.4, 1]);
  const trunkScale = useTransform(progress, [0.10, 0.45], [0.2, 1]);
  const leavesOpacity = useTransform(progress, [0.30, 0.65], [0, 1]);
  const childOpacity = useTransform(progress, [0.40, 0.65], [0, 1]);
  const childY = useTransform(progress, [0.40, 0.70], [30, 0]);
  const flightOpacity = useTransform(progress, [0.55, 0.85], [0, 1]);

  return (
    <svg viewBox="0 0 600 600" className="w-full h-full" aria-hidden>
      <defs>
        <radialGradient id="c-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="60%" stopColor="#ffe082" />
          <stop offset="100%" stopColor="#ffb400" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="c-trunk" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5d2a0c" />
          <stop offset="100%" stopColor="#8a4a1f" />
        </linearGradient>
        <radialGradient id="c-leaf" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#fff8e1" />
        </radialGradient>
        <linearGradient id="c-ground" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      {/* ground glow */}
      <ellipse cx="300" cy="510" rx="250" ry="40" fill="url(#c-ground)" />

      {/* sun */}
      <motion.g style={{ opacity: sunOpacity, scale: sunScale, transformOrigin: '460px 130px' }}>
        <circle cx="460" cy="130" r="120" fill="url(#c-sun)" />
        <circle cx="460" cy="130" r="40" fill="#fff" />
        <circle cx="460" cy="130" r="32" fill="#ffd54f" />
      </motion.g>

      {/* trunk */}
      <motion.g style={{ scaleY: trunkScale, transformOrigin: '300px 510px' }}>
        <path d="M 278 510 Q 272 380 290 270 Q 300 220 310 270 Q 328 380 322 510 Z" fill="url(#c-trunk)" stroke="#3e1a05" strokeWidth="1.5" />
        {/* branches */}
        <path d="M 300 320 Q 240 290 200 250" stroke="#3e1a05" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M 300 290 Q 360 270 400 230" stroke="#3e1a05" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M 300 360 Q 245 350 215 320" stroke="#3e1a05" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M 300 340 Q 350 320 385 305" stroke="#3e1a05" strokeWidth="7" strokeLinecap="round" fill="none" />
      </motion.g>

      {/* leaves cluster */}
      <motion.g style={{ opacity: leavesOpacity }}>
        <Leaf cx={200} cy={245} r={50} delay={0} />
        <Leaf cx={400} cy={225} r={55} delay={0.2} />
        <Leaf cx={300} cy={195} r={70} delay={0.1} />
        <Leaf cx={250} cy={205} r={45} delay={0.3} />
        <Leaf cx={355} cy={205} r={45} delay={0.4} />
        <Leaf cx={210} cy={310} r={35} delay={0.5} />
        <Leaf cx={385} cy={300} r={35} delay={0.6} />
      </motion.g>

      {/* child silhouette */}
      <motion.g style={{ opacity: childOpacity, y: childY }}>
        {/* shadow */}
        <ellipse cx="300" cy="510" rx="36" ry="6" fill="#000" opacity="0.28" />
        {/* body */}
        <path
          d="M 300 415 Q 282 420 280 460 L 285 510 L 295 510 L 297 470 L 303 470 L 305 510 L 315 510 L 320 460 Q 318 420 300 415 Z"
          fill="#fff"
        />
        {/* arms */}
        <path d="M 282 425 Q 270 445 268 470 L 273 470 Q 278 450 285 435 Z" fill="#fff" />
        <path d="M 318 425 Q 330 445 332 470 L 327 470 Q 322 450 315 435 Z" fill="#fff" />
        {/* head */}
        <circle cx="300" cy="395" r="20" fill="#fff" />
        {/* hair tuft */}
        <path d="M 285 388 Q 295 372 315 385 Q 312 380 304 376 Q 290 376 285 388 Z" fill="#ffd54f" />
        {/* face accent */}
        <circle cx="294" cy="397" r="1.6" fill="#1b5e20" />
        <circle cx="306" cy="397" r="1.6" fill="#1b5e20" />
        <path d="M 294 405 Q 300 408 306 405" stroke="#1b5e20" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      </motion.g>

      {/* flying things: paper plane, butterfly, balloon */}
      <motion.g style={{ opacity: flightOpacity }}>
        <PaperPlane cx={140} cy={150} />
        <Butterfly cx={500} cy={300} />
        <Balloon cx={130} cy={380} />
        <Star cx={520} cy={400} />
      </motion.g>
    </svg>
  );
}

function Leaf({ cx, cy, r, delay }: { cx: number; cy: number; r: number; delay: number }) {
  return (
    <motion.g
      animate={{ y: [0, -4, 0], rotate: [0, 2, 0] }}
      transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      <circle cx={cx} cy={cy} r={r} fill="url(#c-leaf)" />
      <circle cx={cx - r * 0.35} cy={cy - r * 0.3} r={r * 0.4} fill="#fff" opacity="0.18" />
    </motion.g>
  );
}

function PaperPlane({ cx, cy }: { cx: number; cy: number }) {
  return (
    <motion.g
      animate={{ x: [0, 12, 0], y: [0, -6, 0], rotate: [-8, 4, -8] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      <path d={`M ${cx - 18} ${cy + 8} L ${cx + 18} ${cy - 6} L ${cx - 4} ${cy - 2} Z`} fill="#fff" />
      <path d={`M ${cx - 4} ${cy - 2} L ${cx + 18} ${cy - 6} L ${cx + 2} ${cy + 8} Z`} fill="#fff" opacity="0.6" />
    </motion.g>
  );
}

function Butterfly({ cx, cy }: { cx: number; cy: number }) {
  return (
    <motion.g
      animate={{ x: [0, -10, 0], y: [0, -5, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      <motion.path
        d={`M ${cx} ${cy} Q ${cx - 16} ${cy - 12} ${cx - 24} ${cy - 4} Q ${cx - 16} ${cy + 4} ${cx} ${cy} Z`}
        fill="#fff"
        animate={{ scaleX: [1, 0.7, 1] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
      <motion.path
        d={`M ${cx} ${cy} Q ${cx + 16} ${cy - 12} ${cx + 24} ${cy - 4} Q ${cx + 16} ${cy + 4} ${cx} ${cy} Z`}
        fill="#fff"
        animate={{ scaleX: [1, 0.7, 1] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
      <line x1={cx} y1={cy - 5} x2={cx} y2={cy + 5} stroke="#1b5e20" strokeWidth="1.5" />
    </motion.g>
  );
}

function Balloon({ cx, cy }: { cx: number; cy: number }) {
  return (
    <motion.g
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <ellipse cx={cx} cy={cy} rx="14" ry="18" fill="#fff" />
      <path d={`M ${cx} ${cy + 18} L ${cx - 2} ${cy + 22} L ${cx + 2} ${cy + 22} Z`} fill="#fff" />
      <line x1={cx} y1={cy + 22} x2={cx + 4} y2={cy + 50} stroke="#fff" strokeWidth="1" opacity="0.7" />
      <ellipse cx={cx - 5} cy={cy - 6} rx="3" ry="5" fill="#fff" opacity="0.5" />
    </motion.g>
  );
}

function Star({ cx, cy }: { cx: number; cy: number }) {
  const s = 14;
  const path = `M ${cx} ${cy - s} L ${cx + s * 0.3} ${cy - s * 0.3} L ${cx + s} ${cy} L ${cx + s * 0.3} ${cy + s * 0.3} L ${cx} ${cy + s} L ${cx - s * 0.3} ${cy + s * 0.3} L ${cx - s} ${cy} L ${cx - s * 0.3} ${cy - s * 0.3} Z`;
  return (
    <motion.path
      d={path}
      fill="#fff"
      animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    />
  );
}

/* ---------------- PARENTS: Family under home arch ---------------- */

function SceneParents({ progress }: { progress: MotionValue<number> }) {
  const horizonOpacity = useTransform(progress, [0, 0.2], [0, 1]);
  const archDraw = useTransform(progress, [0.05, 0.45], [0, 1]);
  const figuresOpacity = useTransform(progress, [0.25, 0.55], [0, 1]);
  const figuresY = useTransform(progress, [0.25, 0.55], [30, 0]);
  const heartsOpacity = useTransform(progress, [0.55, 0.85], [0, 1]);
  const haloOpacity = useTransform(progress, [0.65, 0.95], [0, 1]);

  return (
    <svg viewBox="0 0 600 600" className="w-full h-full" aria-hidden>
      <defs>
        <radialGradient id="p-halo" cx="50%" cy="35%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#ffe082" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#ff8f00" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="p-arch" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="p-horizon" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      {/* halo */}
      <motion.circle cx="300" cy="270" r="240" fill="url(#p-halo)" style={{ opacity: haloOpacity }} />

      {/* horizon line */}
      <motion.g style={{ opacity: horizonOpacity }}>
        <rect x="0" y="490" width="600" height="120" fill="url(#p-horizon)" />
        <line x1="50" y1="490" x2="550" y2="490" stroke="#fff" strokeWidth="1.5" opacity="0.5" />
      </motion.g>

      {/* home arch */}
      <motion.g>
        {/* roof line */}
        <motion.path
          d="M 100 360 L 300 180 L 500 360"
          fill="none"
          stroke="url(#p-arch)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength: archDraw }}
        />
        {/* sub-roof line */}
        <motion.path
          d="M 130 360 L 300 207 L 470 360"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.55"
          style={{ pathLength: archDraw }}
        />
        {/* walls (faint) */}
        <motion.path
          d="M 130 360 L 130 490 M 470 360 L 470 490"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.35"
          style={{ pathLength: archDraw }}
        />
        {/* chimney */}
        <motion.path
          d="M 360 220 L 360 175 L 390 175 L 390 250"
          fill="none"
          stroke="url(#p-arch)"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ pathLength: archDraw }}
        />
      </motion.g>

      {/* family group */}
      <motion.g style={{ opacity: figuresOpacity, y: figuresY }}>
        {/* shadows */}
        <ellipse cx="220" cy="488" rx="30" ry="5" fill="#000" opacity="0.3" />
        <ellipse cx="300" cy="488" rx="22" ry="4" fill="#000" opacity="0.3" />
        <ellipse cx="380" cy="488" rx="30" ry="5" fill="#000" opacity="0.3" />

        {/* parent left (taller) */}
        <ParentFigure cx={220} cy={355} hairColor="#5d2a0c" />
        {/* child (smaller, center-front) */}
        <ChildFigure cx={300} cy={395} />
        {/* parent right */}
        <ParentFigure cx={380} cy={355} hairColor="#ffd54f" />

        {/* connecting hands (subtle line) */}
        <path
          d="M 240 428 Q 270 445 285 445 M 315 445 Q 330 445 360 428"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.65"
        />
      </motion.g>

      {/* hearts floating */}
      <motion.g style={{ opacity: heartsOpacity }}>
        <FloatingHeart cx={170} cy={260} size={14} delay={0} />
        <FloatingHeart cx={430} cy={250} size={18} delay={0.6} />
        <FloatingHeart cx={300} cy={150} size={22} delay={0.3} />
        <FloatingHeart cx={120} cy={420} size={12} delay={0.9} />
        <FloatingHeart cx={490} cy={400} size={14} delay={1.2} />
      </motion.g>
    </svg>
  );
}

function ParentFigure({ cx, cy, hairColor }: { cx: number; cy: number; hairColor: string }) {
  return (
    <g>
      {/* body */}
      <path
        d={`M ${cx - 22} ${cy + 25} Q ${cx} ${cy + 5} ${cx + 22} ${cy + 25} L ${cx + 28} ${cy + 130} L ${cx - 28} ${cy + 130} Z`}
        fill="#fff"
      />
      {/* arms */}
      <path d={`M ${cx - 22} ${cy + 30} Q ${cx - 36} ${cy + 60} ${cx - 30} ${cy + 90}`} stroke="#fff" strokeWidth="14" fill="none" strokeLinecap="round" />
      <path d={`M ${cx + 22} ${cy + 30} Q ${cx + 36} ${cy + 60} ${cx + 30} ${cy + 90}`} stroke="#fff" strokeWidth="14" fill="none" strokeLinecap="round" />
      {/* head */}
      <circle cx={cx} cy={cy - 5} r="22" fill="#fff" />
      {/* hair */}
      <path
        d={`M ${cx - 22} ${cy - 12} Q ${cx} ${cy - 32} ${cx + 22} ${cy - 12} Q ${cx + 18} ${cy - 22} ${cx + 6} ${cy - 26} Q ${cx - 8} ${cy - 28} ${cx - 22} ${cy - 12} Z`}
        fill={hairColor}
      />
      {/* face */}
      <circle cx={cx - 7} cy={cy - 4} r="1.6" fill="#1b5e20" />
      <circle cx={cx + 7} cy={cy - 4} r="1.6" fill="#1b5e20" />
      <path d={`M ${cx - 6} ${cy + 6} Q ${cx} ${cy + 9} ${cx + 6} ${cy + 6}`} stroke="#1b5e20" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </g>
  );
}

function ChildFigure({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <path
        d={`M ${cx - 16} ${cy + 18} Q ${cx} ${cy + 4} ${cx + 16} ${cy + 18} L ${cx + 20} ${cy + 90} L ${cx - 20} ${cy + 90} Z`}
        fill="#fff"
      />
      <path d={`M ${cx - 16} ${cy + 22} Q ${cx - 26} ${cy + 45} ${cx - 22} ${cy + 65}`} stroke="#fff" strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d={`M ${cx + 16} ${cy + 22} Q ${cx + 26} ${cy + 45} ${cx + 22} ${cy + 65}`} stroke="#fff" strokeWidth="10" fill="none" strokeLinecap="round" />
      <circle cx={cx} cy={cy - 4} r="16" fill="#fff" />
      <path
        d={`M ${cx - 16} ${cy - 9} Q ${cx} ${cy - 24} ${cx + 16} ${cy - 9} Q ${cx + 12} ${cy - 18} ${cx + 2} ${cy - 20} Q ${cx - 6} ${cy - 21} ${cx - 16} ${cy - 9} Z`}
        fill="#ffd54f"
      />
      <circle cx={cx - 5} cy={cy - 3} r="1.4" fill="#1b5e20" />
      <circle cx={cx + 5} cy={cy - 3} r="1.4" fill="#1b5e20" />
      <path d={`M ${cx - 5} ${cy + 5} Q ${cx} ${cy + 8} ${cx + 5} ${cy + 5}`} stroke="#1b5e20" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </g>
  );
}

function FloatingHeart({ cx, cy, size, delay }: { cx: number; cy: number; size: number; delay: number }) {
  const path = `M ${cx} ${cy + size * 0.6} C ${cx - size * 0.3} ${cy + size * 0.2} ${cx - size} ${cy + size * 0.1} ${cx - size} ${cy - size * 0.2} C ${cx - size} ${cy - size * 0.7} ${cx - size * 0.3} ${cy - size * 0.6} ${cx} ${cy - size * 0.2} C ${cx + size * 0.3} ${cy - size * 0.6} ${cx + size} ${cy - size * 0.7} ${cx + size} ${cy - size * 0.2} C ${cx + size} ${cy + size * 0.1} ${cx + size * 0.3} ${cy + size * 0.2} ${cx} ${cy + size * 0.6} Z`;
  return (
    <motion.path
      d={path}
      fill="#fff"
      animate={{ y: [0, -16, 0], opacity: [0.7, 1, 0.7], scale: [1, 1.08, 1] }}
      transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    />
  );
}

/* ============================================================
   FINALE
   ============================================================ */

function FinalePanelDesktop({
  finale,
  parentProgress,
  start,
  end,
}: {
  finale: StoryFinale;
  parentProgress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const local = useTransform(parentProgress, [start, end], [0, 1], { clamp: true });
  return (
    <div className="relative shrink-0 w-screen h-screen overflow-hidden bg-gradient-to-br from-white via-gray-50 to-primary/10">
      <FinaleDecor progress={local} />
      <div className="relative h-full flex flex-col items-center justify-center px-8 z-10">
        <FinaleEmblem progress={local} finale={finale} large />
        <FinaleText progress={local} finale={finale} large />
      </div>
    </div>
  );
}

function FinalePanelMobile({ finale }: { finale: StoryFinale }) {
  const ref = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const { scrollYProgress: sceneScroll } = useScroll({ target: sceneRef, offset: ['start 90%', 'center 40%'] });
  const local = useTransform(scrollYProgress, [0.05, 0.5], [0, 1], { clamp: true });
  const sceneLocal = useTransform(sceneScroll, [0, 1], [0, 1], { clamp: true });
  return (
    <div ref={ref} className="relative w-full overflow-hidden bg-gradient-to-br from-white via-gray-50 to-primary/10 py-14 px-5">
      <FinaleDecor progress={local} />
      <div className="relative flex flex-col items-center max-w-md mx-auto z-10">
        <div ref={sceneRef} className="w-full aspect-square max-w-[360px] mb-2">
          <FinaleEmblem progress={sceneLocal} finale={finale} large={false} />
        </div>
        <FinaleText progress={local} finale={finale} large={false} />
      </div>
    </div>
  );
}

function FinaleDecor({ progress }: { progress: MotionValue<number> }) {
  const o1 = useTransform(progress, [0, 0.4], [0, 1]);
  const r1 = useTransform(progress, [0, 1], [0, 60]);
  const r2 = useTransform(progress, [0, 1], [0, -50]);
  return (
    <>
      <motion.div
        style={{ opacity: o1, x: r1 }}
        className="absolute top-[12%] right-[10%] w-72 h-72 bg-primary/15 rounded-full blur-3xl"
      />
      <motion.div
        style={{ opacity: o1, x: r2 }}
        className="absolute bottom-[14%] left-[8%] w-96 h-96 bg-secondary/15 rounded-full blur-3xl"
      />
    </>
  );
}

function FinaleEmblem({ progress, finale, large }: { progress: MotionValue<number>; finale: StoryFinale; large: boolean }) {
  const planetOpacity = useTransform(progress, [0, 0.25], [0, 1]);
  const planetScale = useTransform(progress, [0, 0.30], [0.3, 1]);
  const orbitOpacity = useTransform(progress, [0.10, 0.40], [0, 1]);
  const satOpacity = useTransform(progress, [0.18, 0.45], [0, 1]);
  const sizeClass = large ? 'w-[min(62vh,55vw)] h-[min(62vh,55vw)]' : 'w-full h-full';

  const orbitAngle = useMotionValue(0);
  useAnimationFrame((t) => {
    orbitAngle.set((t / 80) % 360);
  });

  const sats = [
    { offsetDeg: 270, label: finale.teachersLabel, fillId: 'f-sat-t', iconKind: 'book' as const, radius: 235, glowFill: '#1b5e20' },
    { offsetDeg: 30, label: finale.childrenLabel, fillId: 'f-sat-c', iconKind: 'child' as const, radius: 235, glowFill: '#ff8f00' },
    { offsetDeg: 150, label: finale.parentsLabel, fillId: 'f-sat-p', iconKind: 'home' as const, radius: 235, glowFill: '#e65100' },
  ];

  return (
    <svg viewBox="0 0 600 600" className={`${sizeClass} mb-6`} aria-hidden>
      <defs>
        <radialGradient id="f-planet-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd54f" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#ffb400" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#ffb400" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="f-planet-core" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#fffbea" />
          <stop offset="35%" stopColor="#ffd54f" />
          <stop offset="80%" stopColor="#ff8f00" />
          <stop offset="100%" stopColor="#bf360c" />
        </radialGradient>
        <linearGradient id="f-sat-t" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#43a047" />
          <stop offset="100%" stopColor="#1b5e20" />
        </linearGradient>
        <linearGradient id="f-sat-c" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffe082" />
          <stop offset="100%" stopColor="#ff8f00" />
        </linearGradient>
        <linearGradient id="f-sat-p" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffb74d" />
          <stop offset="100%" stopColor="#bf360c" />
        </linearGradient>
        <radialGradient id="f-sat-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* outer halo */}
      <circle cx="300" cy="300" r="290" fill="url(#f-planet-glow)" />

      {/* orbit rings */}
      <motion.g style={{ opacity: orbitOpacity }} fill="none">
        <ellipse cx="300" cy="300" rx="235" ry="235" stroke="hsl(var(--secondary))" strokeOpacity="0.35" strokeWidth="1.2" strokeDasharray="3 7" />
        <ellipse cx="300" cy="300" rx="235" ry="118" stroke="hsl(var(--primary))" strokeOpacity="0.20" strokeWidth="1" strokeDasharray="2 6" />
      </motion.g>

      {/* tiny stars sprinkled across the system */}
      <motion.g style={{ opacity: orbitOpacity }} fill="hsl(var(--secondary))">
        {[
          { x: 80, y: 120, r: 1.5, d: 0 },
          { x: 540, y: 90, r: 1.8, d: 0.6 },
          { x: 90, y: 480, r: 1.4, d: 1.2 },
          { x: 520, y: 510, r: 1.6, d: 0.3 },
          { x: 470, y: 70, r: 1.2, d: 0.9 },
          { x: 130, y: 540, r: 1.3, d: 1.5 },
          { x: 560, y: 320, r: 1.5, d: 0.4 },
          { x: 40, y: 320, r: 1.5, d: 1 },
        ].map((s, i) => (
          <motion.circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: s.d }}
          />
        ))}
      </motion.g>

      {/* planet */}
      <motion.g style={{ opacity: planetOpacity, scale: planetScale, transformOrigin: '300px 300px' }}>
        {/* aura pulse */}
        <motion.circle
          cx="300"
          cy="300"
          r="98"
          fill="none"
          stroke="#ffd54f"
          strokeWidth="2"
          animate={{ scale: [1, 1.45], opacity: [0.55, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
          style={{ transformOrigin: '300px 300px' }}
        />
        <circle cx="300" cy="300" r="92" fill="url(#f-planet-core)" />
        <circle cx="300" cy="300" r="92" fill="none" stroke="#fff" strokeOpacity="0.3" strokeWidth="1.5" />
        {/* surface bands */}
        <path d="M 220 285 Q 300 268 380 285" stroke="#bf360c" strokeWidth="2" fill="none" opacity="0.35" strokeLinecap="round" />
        <path d="M 218 312 Q 300 295 382 312" stroke="#bf360c" strokeWidth="1.8" fill="none" opacity="0.30" strokeLinecap="round" />
        <path d="M 230 338 Q 300 322 370 338" stroke="#bf360c" strokeWidth="1.5" fill="none" opacity="0.25" strokeLinecap="round" />
        {/* highlight */}
        <ellipse cx="275" cy="278" rx="26" ry="14" fill="#fff" opacity="0.55" />
        <ellipse cx="262" cy="270" rx="10" ry="5" fill="#fff" opacity="0.85" />
      </motion.g>

      {/* satellites — orbiting around planet */}
      {sats.map((sat) => (
        <Satellite
          key={sat.offsetDeg}
          orbitAngle={orbitAngle}
          offsetDeg={sat.offsetDeg}
          radius={sat.radius}
          label={sat.label}
          fillId={sat.fillId}
          iconKind={sat.iconKind}
          opacity={satOpacity}
        />
      ))}
    </svg>
  );
}

function Satellite({
  orbitAngle,
  offsetDeg,
  radius,
  label,
  fillId,
  iconKind,
  opacity,
}: {
  orbitAngle: MotionValue<number>;
  offsetDeg: number;
  radius: number;
  label: string;
  fillId: string;
  iconKind: 'book' | 'child' | 'home';
  opacity: MotionValue<number>;
}) {
  const cx = useTransform(orbitAngle, (a) => 300 + radius * Math.cos(((a + offsetDeg) * Math.PI) / 180));
  const cy = useTransform(orbitAngle, (a) => 300 + radius * 0.5 * Math.sin(((a + offsetDeg) * Math.PI) / 180));
  const scale = useTransform(orbitAngle, (a) => {
    const sin = Math.sin(((a + offsetDeg) * Math.PI) / 180);
    return 0.85 + 0.18 * (sin + 1) * 0.5;
  });
  const z = useTransform(orbitAngle, (a) => Math.sin(((a + offsetDeg) * Math.PI) / 180));

  return (
    <motion.g style={{ opacity, x: cx, y: cy, scale, transformBox: 'fill-box', transformOrigin: 'center' }}>
      <SatelliteNode r={42} fillId={fillId} iconKind={iconKind} label={label} zMV={z} />
    </motion.g>
  );
}

function SatelliteNode({
  r,
  fillId,
  iconKind,
  label,
  zMV,
}: {
  r: number;
  fillId: string;
  iconKind: 'book' | 'child' | 'home';
  label: string;
  zMV: MotionValue<number>;
}) {
  const labelOpacity = useTransform(zMV, (z) => 0.55 + 0.45 * ((z + 1) / 2));
  return (
    <g>
      {/* outer halo */}
      <circle cx={0} cy={0} r={r + 12} fill="url(#f-sat-glow)" />
      {/* satellite body */}
      <circle cx={0} cy={0} r={r} fill={`url(#${fillId})`} />
      <circle cx={0} cy={0} r={r} fill="none" stroke="#fff" strokeWidth="1.6" opacity="0.65" />
      {/* highlight */}
      <ellipse cx={-r * 0.35} cy={-r * 0.35} rx={r * 0.32} ry={r * 0.18} fill="#fff" opacity="0.45" />
      {/* icon */}
      {iconKind === 'book' && (
        <g fill="#fff">
          <rect x={-17} y={-11} width="15" height="20" rx="1.5" />
          <rect x={2} y={-11} width="15" height="20" rx="1.5" />
          <line x1="0" y1="-13" x2="0" y2="11" stroke="#fff" strokeWidth="1.8" />
          <line x1={-14} y1={-5} x2={-5} y2={-5} stroke={`url(#${fillId})`} strokeWidth="1.4" />
          <line x1={-14} y1={0} x2={-5} y2={0} stroke={`url(#${fillId})`} strokeWidth="1.4" />
          <line x1={5} y1={-5} x2={14} y2={-5} stroke={`url(#${fillId})`} strokeWidth="1.4" />
          <line x1={5} y1={0} x2={14} y2={0} stroke={`url(#${fillId})`} strokeWidth="1.4" />
        </g>
      )}
      {iconKind === 'child' && (
        <g fill="#fff">
          <circle cx={0} cy={-8} r="7" />
          <path d="M -11 14 Q 0 0 11 14 L 11 18 L -11 18 Z" />
          <path d="M -8 -14 Q 0 -22 8 -14 Q 4 -18 0 -18 Q -4 -18 -8 -14 Z" fill="#fff8e1" />
        </g>
      )}
      {iconKind === 'home' && (
        <g fill="#fff">
          <path d="M -16 6 L 0 -10 L 16 6 L 16 18 L -16 18 Z" />
          <rect x={-4} y={4} width="8" height="14" fill={`url(#${fillId})`} />
          <rect x={-13} y={2} width="5" height="5" fill={`url(#${fillId})`} />
          <rect x={8} y={2} width="5" height="5" fill={`url(#${fillId})`} />
        </g>
      )}
      {/* label below */}
      <motion.text
        x={0}
        y={r + 24}
        textAnchor="middle"
        fontSize="20"
        fontWeight="800"
        fill="hsl(var(--secondary))"
        fontFamily="Montserrat, sans-serif"
        style={{ opacity: labelOpacity }}
      >
        {label}
      </motion.text>
    </g>
  );
}

function FinaleText({ progress, finale, large }: { progress: MotionValue<number>; finale: StoryFinale; large: boolean }) {
  const opacity = useTransform(progress, [0.55, 0.85], [0, 1]);
  const y = useTransform(progress, [0.55, 0.85], [30, 0]);
  return (
    <motion.div style={{ opacity, y }} className="text-center max-w-3xl">
      <span className="inline-flex items-center gap-2 mb-3">
        <span className="w-8 h-[2px] bg-primary rounded-full" />
        <span className="text-primary text-xs font-semibold uppercase tracking-[0.25em]">{finale.label}</span>
        <span className="w-8 h-[2px] bg-primary rounded-full" />
      </span>
      <h2 className={`${large ? 'text-4xl md:text-6xl' : 'text-3xl'} font-black gradient-text leading-tight mb-4 tracking-tight`}>
        {finale.title}
      </h2>
      <p className={`${large ? 'text-lg md:text-xl' : 'text-base'} text-secondary/75 leading-relaxed font-medium`}>
        {finale.subtitle}
      </p>
    </motion.div>
  );
}
