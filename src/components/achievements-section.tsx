'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const achievements = [
  {
    number: '01',
    title: 'IB PYP Candidate',
    description:
      'Статус школы-кандидата программы IB PYP — международный стандарт качества начального образования',
    tag: 'Международная аккредитация',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 3" />
        <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="24" r="4" fill="currentColor" />
        <path d="M24 4v6M24 38v6M4 24h6M38 24h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'The LAB22 London',
    description:
      'Партнёрство с международной лабораторией из Лондона в области STEM-образования и инновационных проектов',
    tag: 'Международное партнёрство',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
        <path d="M8 36L16 12h16l8 24H8z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M14 28h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 20h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 12V8M28 12V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="6" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Zerdeli STEM',
    description:
      'Участие в профессиональном STEM-сообществе: обмен опытом, совместные проекты и развитие современных методик',
    tag: 'STEM сообщество',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
        <path d="M24 6L8 16v12l16 14 16-14V16L24 6z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M8 16l16 10 16-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M24 26v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Scandic Extreme Challenge',
    description:
      'Масштабное спортивное событие для развития командного духа, лидерства и характера учеников',
    tag: 'Спортивное мероприятие',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
        <path d="M24 6l4 12h13l-10.5 7.5 4 12L24 30l-10.5 7.5 4-12L7 18h13L24 6z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
        <path d="M16 40h16M18 44h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

function RocketIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 200 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[220px] md:w-[340px] lg:w-[420px]"
        style={{ filter: 'drop-shadow(0 20px 40px rgba(45,106,36,0.12))', opacity: 0.5 }}
      >
        <defs>
          <linearGradient id="bodyGrad" x1="60" y1="0" x2="140" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#d4d8e0" />
            <stop offset="40%" stopColor="#f0f2f5" />
            <stop offset="70%" stopColor="#e2e6eb" />
            <stop offset="100%" stopColor="#c8cdd6" />
          </linearGradient>
          <linearGradient id="noseGrad" x1="80" y1="60" x2="120" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#b8bdc6" />
            <stop offset="50%" stopColor="#dde2e8" />
            <stop offset="100%" stopColor="#b0b5be" />
          </linearGradient>
          <linearGradient id="finGrad" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="#1a4a24" />
            <stop offset="100%" stopColor="#2d6a2d" />
          </linearGradient>
          <radialGradient id="windowGrad" cx="40%" cy="35%" r="60%" fx="30%" fy="30%" gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#166534" />
          </radialGradient>
          <radialGradient id="flameOuter" cx="50%" cy="0%" r="70%">
            <stop offset="0%" stopColor="#ffb400" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#f97316" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="flameInner" cx="50%" cy="0%" r="60%">
            <stop offset="0%" stopColor="#fff7ed" stopOpacity="1" />
            <stop offset="40%" stopColor="#fbbf24" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* === EXHAUST FLAME OUTER === */}
        <motion.ellipse
          cx="100" cy="390" rx="28" ry="60"
          fill="url(#flameOuter)"
          filter="url(#softGlow)"
          animate={{ ry: [60, 75, 52, 70, 58], opacity: [0.7, 1, 0.6, 0.9, 0.7] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* === EXHAUST FLAME INNER === */}
        <motion.ellipse
          cx="100" cy="385" rx="14" ry="35"
          fill="url(#flameInner)"
          filter="url(#glow)"
          animate={{ ry: [35, 45, 28, 42, 32], opacity: [0.9, 1, 0.8, 1, 0.85] }}
          transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* === SMALL CORE FLAME === */}
        <motion.ellipse
          cx="100" cy="378" rx="6" ry="16"
          fill="white"
          opacity={0.9}
          animate={{ ry: [16, 22, 12, 20, 15] }}
          transition={{ duration: 0.3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* === LEFT FIN === */}
        <path d="M82 290 L48 360 L82 345 Z" fill="url(#finGrad)" opacity="0.95" />
        <path d="M82 290 L48 360 L82 345 Z" stroke="#1a4a24" strokeWidth="1" opacity="0.3" />
        {/* === RIGHT FIN === */}
        <path d="M118 290 L152 360 L118 345 Z" fill="url(#finGrad)" opacity="0.95" />
        <path d="M118 290 L152 360 L118 345 Z" stroke="#1a4a24" strokeWidth="1" opacity="0.3" />

        {/* === NOZZLE === */}
        <path d="M86 340 Q82 360 82 368 L118 368 Q118 360 114 340 Z" fill="#9ca3af" />
        <path d="M88 368 L112 368 L114 375 L86 375 Z" fill="#6b7280" />

        {/* === MAIN BODY === */}
        <rect x="72" y="140" width="56" height="205" rx="6" fill="url(#bodyGrad)" />
        {/* Body highlight */}
        <rect x="76" y="145" width="10" height="195" rx="3" fill="white" opacity="0.25" />
        {/* Body shadow */}
        <rect x="118" y="145" width="8" height="195" rx="3" fill="#9ca3af" opacity="0.3" />

        {/* === ACCENT STRIPE (brand yellow) === */}
        <rect x="72" y="275" width="56" height="12" rx="2" fill="#ffb400" opacity="0.9" />
        <rect x="72" y="295" width="56" height="5" rx="1" fill="#ffb400" opacity="0.4" />

        {/* === NOSE CONE === */}
        <path d="M72 140 Q72 80 100 60 Q128 80 128 140 Z" fill="url(#noseGrad)" />
        {/* Nose highlight */}
        <path d="M76 138 Q76 90 98 72" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.3" />

        {/* === WINDOW OUTER RING === */}
        <circle cx="100" cy="210" r="22" fill="#1a4a24" opacity="0.15" />
        <circle cx="100" cy="210" r="18" stroke="#2d6a2d" strokeWidth="3" fill="none" />
        {/* === WINDOW GLASS === */}
        <circle cx="100" cy="210" r="15" fill="#0f4c1e" />
        <circle cx="100" cy="210" r="15" fill="url(#windowGrad)" opacity="0.8" />
        {/* === WINDOW SHINE === */}
        <ellipse cx="95" cy="204" rx="5" ry="4" fill="white" opacity="0.45" transform="rotate(-20 95 204)" />
        <circle cx="90" cy="202" r="2" fill="white" opacity="0.3" />

        {/* === PANEL LINES === */}
        <line x1="72" y1="175" x2="128" y2="175" stroke="#9ca3af" strokeWidth="0.8" opacity="0.5" />
        <line x1="72" y1="250" x2="128" y2="250" stroke="#9ca3af" strokeWidth="0.8" opacity="0.5" />
        <line x1="72" y1="265" x2="128" y2="265" stroke="#9ca3af" strokeWidth="0.8" opacity="0.5" />

        {/* === RIVET DOTS === */}
        {[175, 250, 265].map((y, i) => (
          <g key={i}>
            <circle cx="76" cy={y} r="2" fill="#9ca3af" opacity="0.6" />
            <circle cx="124" cy={y} r="2" fill="#9ca3af" opacity="0.6" />
          </g>
        ))}

        {/* === ANTENNA === */}
        <line x1="100" y1="60" x2="100" y2="42" stroke="#9ca3af" strokeWidth="2" />
        <circle cx="100" cy="40" r="4" fill="#ffb400" filter="url(#glow)" />
        <circle cx="100" cy="40" r="2" fill="white" />

        {/* === SMOKE PUFFS (subtle) === */}
        <motion.circle
          cx="100" cy="400"
          r="18"
          fill="#d1d5db"
          opacity={0}
          animate={{ cy: [400, 430, 460], r: [18, 28, 38], opacity: [0.25, 0.12, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0 }}
        />
        <motion.circle
          cx="88" cy="405"
          r="12"
          fill="#d1d5db"
          opacity={0}
          animate={{ cx: [88, 76, 64], cy: [405, 432, 460], r: [12, 20, 30], opacity: [0.2, 0.1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.6 }}
        />
        <motion.circle
          cx="112" cy="408"
          r="10"
          fill="#d1d5db"
          opacity={0}
          animate={{ cx: [112, 126, 140], cy: [408, 436, 464], r: [10, 18, 28], opacity: [0.2, 0.1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 1.1 }}
        />
      </svg>
    </div>
  );
}

export function AchievementsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden bg-white"
    >
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(#1a4a24 1px, transparent 1px), linear-gradient(90deg, #1a4a24 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#2d6a2d] to-transparent" />

      {/* Rocket — right side, shifted left on desktop */}
      <div className="absolute right-0 top-0 bottom-0 w-[280px] md:w-[480px] lg:w-[580px] lg:right-[220px] xl:right-[320px] pointer-events-none overflow-hidden">
        {/* Gradient fade from white on left edge */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent z-10" />
        <motion.div
          className="w-full h-full"
          initial={{ opacity: 0, x: 80 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          {/* Floating animation wrapper */}
          <motion.div
            className="w-full h-full"
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <RocketIllustration />
          </motion.div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Header */}
          <motion.div
            className="mb-12 md:mb-16"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-[#2d6a2d] text-sm font-semibold uppercase tracking-widest mb-4">
              <span className="w-8 h-[2px] bg-[#ffb400] rounded-full" />
              Наши результаты
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-5">
              Наши{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#2d6a2d]">достижения</span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-3 -z-0"
                  style={{ background: '#ffb400', borderRadius: '2px', opacity: 0.25 }}
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
                />
              </span>
            </h2>
            <p className="text-lg text-gray-500 max-w-lg leading-relaxed">
              Международное признание и партнёрства, которые формируют будущее наших учеников
            </p>
          </motion.div>

          {/* Achievement items */}
          <div className="space-y-4">
            {achievements.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -28 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
              >
                <div className="group relative flex items-start gap-5 p-5 md:p-6 rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-sm hover:border-[#2d6a2d]/30 hover:shadow-lg hover:shadow-[#2d6a2d]/8 hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                  {/* Left accent bar */}
                  <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-[#2d6a2d]/0 group-hover:bg-[#2d6a2d] transition-all duration-300" />

                  {/* Number badge */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#f0f7f0] to-[#e0f0e0] border border-[#2d6a2d]/10 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#2d6a2d] group-hover:to-[#1a4a24] group-hover:border-[#2d6a2d] group-hover:shadow-md group-hover:shadow-[#2d6a2d]/20 transition-all duration-300">
                    <span className="text-xs font-bold text-[#2d6a2d] group-hover:text-white transition-colors duration-300 font-mono">
                      {item.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                      <h3 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-[#2d6a2d] transition-colors duration-300">
                        {item.title}
                      </h3>
                      <span className="inline-block px-2.5 py-0.5 bg-gradient-to-r from-[#fffbeb] to-[#fff7db] border border-[#ffb400]/30 text-[#92680a] text-xs font-semibold rounded-full shadow-sm">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Icon */}
                  <div className="flex-shrink-0 text-gray-200 group-hover:text-[#2d6a2d]/70 transition-colors duration-300 hidden sm:block mt-0.5">
                    {item.icon}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats strip */}
          <motion.div
            className="mt-10 pt-8 border-t border-gray-100 grid grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.65 }}
          >
            {[
              { value: '4+', label: 'международных партнёрства' },
              { value: '150+', label: 'учеников в этом году' },
              { value: '1:8', label: 'учитель / ученик' },
            ].map((stat, i) => (
              <div key={i} className="text-center group/stat">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-br from-[#2d6a2d] to-[#1a4a24] bg-clip-text text-transparent mb-1">{stat.value}</div>
                <div className="text-xs text-gray-400 leading-snug font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
