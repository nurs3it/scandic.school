'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Achievements3DBackground } from './achievements-3d-background';

const achievements = [
  {
    number: '01',
    title: 'IB PYP Candidate',
    description:
      'Статус школы-кандидата программы IB PYP — международный стандарт качества образования',
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

export function AchievementsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden bg-[#060a14]"
    >
      {/* 3D space background */}
      <Achievements3DBackground />

      {/* Subtle nebula glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 75% 30%, rgba(45,106,45,0.18), transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(255,180,0,0.08), transparent 50%)',
        }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#2d6a2d] to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Header */}
          <motion.div
            className="mb-12 md:mb-16"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-[#4ade80] text-sm font-semibold uppercase tracking-widest mb-4">
              <span className="w-8 h-[2px] bg-[#ffb400] rounded-full" />
              Наши результаты
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
              Наши{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#4ade80]">достижения</span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-3 -z-0"
                  style={{ background: '#ffb400', borderRadius: '2px', opacity: 0.35 }}
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
                />
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
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
                <div className="group relative flex items-start gap-5 p-5 md:p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-[#4ade80]/40 hover:bg-white/10 hover:shadow-lg hover:shadow-[#2d6a2d]/20 hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                  {/* Left accent bar */}
                  <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-[#4ade80]/0 group-hover:bg-[#4ade80] transition-all duration-300" />

                  {/* Number badge */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#2d6a2d] group-hover:to-[#1a4a24] group-hover:border-[#4ade80] group-hover:shadow-md group-hover:shadow-[#4ade80]/30 transition-all duration-300">
                    <span className="text-xs font-bold text-[#4ade80] group-hover:text-white transition-colors duration-300 font-mono">
                      {item.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                      <h3 className="text-base md:text-lg font-bold text-white group-hover:text-[#4ade80] transition-colors duration-300">
                        {item.title}
                      </h3>
                      <span className="inline-block px-2.5 py-0.5 bg-[#ffb400]/15 border border-[#ffb400]/40 text-[#fcd34d] text-xs font-semibold rounded-full">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Icon */}
                  <div className="flex-shrink-0 text-white/20 group-hover:text-[#4ade80]/80 transition-colors duration-300 hidden sm:block mt-0.5">
                    {item.icon}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats strip */}
          <motion.div
            className="mt-10 pt-8 border-t border-white/10 grid grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.65 }}
          >
            {[
              { value: '4+', label: 'международных партнёрства' },
              { value: '150+', label: 'учеников в этом году' },
              { value: '1:8', label: 'учитель / ученик' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-br from-[#4ade80] to-[#2d6a2d] bg-clip-text text-transparent mb-1">{stat.value}</div>
                <div className="text-xs text-gray-400 leading-snug font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
