'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { usePaperAirplaneContext } from '@/contexts/paper-airplane-context';

/* ── card colour presets (full Tailwind literals for scanner) ── */

const presets = [
  {
    bg: 'from-sky-500 to-blue-600',
    blob1: 'bg-white/10',
    blob2: 'bg-sky-400/20',
    pill: 'bg-white/20 text-white',
    btn: 'bg-white text-blue-600 hover:bg-blue-50 shadow-blue-900/20',
    dot: 'bg-white/50',
    badge: 'bg-yellow-300 text-yellow-900',
  },
  {
    bg: 'from-emerald-500 to-teal-700',
    blob1: 'bg-white/10',
    blob2: 'bg-emerald-400/20',
    pill: 'bg-white/20 text-white',
    btn: 'bg-white text-emerald-700 hover:bg-emerald-50 shadow-emerald-900/20',
    dot: 'bg-white/50',
    badge: 'bg-yellow-300 text-yellow-900',
  },
  {
    bg: 'from-violet-500 to-purple-700',
    blob1: 'bg-white/10',
    blob2: 'bg-violet-400/20',
    pill: 'bg-white/20 text-white',
    btn: 'bg-white text-purple-700 hover:bg-purple-50 shadow-purple-900/20',
    dot: 'bg-white/50',
    badge: 'bg-yellow-300 text-yellow-900',
  },
  {
    bg: 'from-amber-400 to-orange-500',
    blob1: 'bg-white/15',
    blob2: 'bg-amber-300/25',
    pill: 'bg-white/25 text-white',
    btn: 'bg-white text-orange-600 hover:bg-orange-50 shadow-orange-900/20',
    dot: 'bg-white/60',
    badge: 'bg-yellow-300 text-yellow-900',
  },
] as const;

/* ── types ── */

export interface ProgramCardData {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  iconName: string;
  colorScheme: string;
  buttonText: string;
  applicationUrl: string;
  badge?: string;
}

interface Props {
  programs: ProgramCardData[];
  ibNote?: string;
}

/* ── decorative blobs (unique per card) ── */

function Blobs({ idx, c }: { idx: number; c: (typeof presets)[number] }) {
  const layouts = [
    // card 0 — playful circles top-right + bottom-left
    <>
      <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full ${c.blob1}`} />
      <div className={`absolute top-12 -right-4 w-20 h-20 rounded-full ${c.blob2}`} />
      <div className={`absolute -bottom-8 -left-8 w-32 h-32 rounded-full ${c.blob1}`} />
    </>,
    // card 1 — large blob bottom-right + small top
    <>
      <div className={`absolute -bottom-16 -right-16 w-52 h-52 rounded-full ${c.blob1}`} />
      <div className={`absolute top-6 right-16 w-14 h-14 rounded-full ${c.blob2}`} />
      <div className={`absolute top-24 -right-6 w-24 h-24 rounded-full ${c.blob2}`} />
    </>,
    // card 2 — ring pattern
    <>
      <div className={`absolute -top-6 -right-6 w-36 h-36 rounded-full border-[6px] border-white/10`} />
      <div className={`absolute -bottom-10 -left-10 w-44 h-44 rounded-full ${c.blob1}`} />
      <div className={`absolute bottom-20 right-8 w-12 h-12 rounded-full ${c.blob2}`} />
    </>,
    // card 3 — diagonal pattern
    <>
      <div className={`absolute -top-12 right-12 w-44 h-44 rounded-full ${c.blob1}`} />
      <div className={`absolute -bottom-6 -right-6 w-28 h-28 rounded-full ${c.blob2}`} />
      <div className={`absolute top-1/2 -left-6 w-16 h-16 rounded-full ${c.blob1}`} />
    </>,
  ];
  return <>{layouts[idx % layouts.length]}</>;
}

/* ── component ── */

export function ProgramsCards({ programs, ibNote }: Props) {
  const router = useRouter();
  const { triggerFlight } = usePaperAirplaneContext();

  return (
    <>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
      >
        {programs.map((p, idx) => {
          const c = presets[idx % presets.length];

          return (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 36, scale: 0.97 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
                },
              }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${c.bg} p-7 lg:p-9 flex flex-col min-h-[420px] shadow-lg`}
            >
              {/* decorative shapes */}
              <Blobs idx={idx} c={c} />

              {/* content — above blobs */}
              <div className="relative z-10 flex flex-col flex-1">
                {/* subtitle pill + badge */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span
                    className={`inline-block px-3.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${c.pill}`}
                  >
                    {p.subtitle}
                  </span>
                  {p.badge && (
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${c.badge}`}
                    >
                      {p.badge}
                    </span>
                  )}
                </div>

                {/* title */}
                <h3 className="text-2xl lg:text-[1.7rem] font-extrabold text-white leading-tight mb-3">
                  {p.title}
                </h3>

                {/* description */}
                <p className="text-white/90 text-[15px] leading-relaxed mb-6">
                  {p.description}
                </p>

                {/* features */}
                <ul className="space-y-2 mb-8 flex-1">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-white/90">
                      <span
                        className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    triggerFlight(rect, () => {
                      router.push(p.applicationUrl);
                    });
                  }}
                  className={`inline-flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-base shadow-lg ${c.btn} active:scale-[0.97] transition-all duration-200`}
                >
                  {p.buttonText}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* IB note */}
      {ibNote && (
        <motion.div
          className="mt-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl">
            <p className="text-sm text-gray-700 leading-relaxed">{ibNote}</p>
          </div>
        </motion.div>
      )}
    </>
  );
}
