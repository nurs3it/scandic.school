'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import confetti from 'canvas-confetti';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Trophy, Sparkles } from 'lucide-react';
import { useLocale } from './locale-provider';
import type { Tournament, TournamentWinner, TournamentGalleryItem } from '@/lib/types/tournaments';

const t = {
  ru: {
    completed: 'Турнир завершён',
    completedSub: 'Спасибо всем участникам! Делимся итогами и яркими моментами.',
    winners: 'Победители',
    summary: 'Как прошёл турнир',
    gallery: 'Галерея',
    place: (p: number) => `${p} место`,
  },
  en: {
    completed: 'Tournament completed',
    completedSub: 'Thanks to all participants! Here are the highlights and recap.',
    winners: 'Winners',
    summary: 'Recap',
    gallery: 'Gallery',
    place: (p: number) => `Place ${p}`,
  },
  kk: {
    completed: 'Турнир аяқталды',
    completedSub: 'Барлық қатысушыларға рахмет! Қорытынды мен жарқын сәттер.',
    winners: 'Жеңімпаздар',
    summary: 'Турнир қалай өтті',
    gallery: 'Галерея',
    place: (p: number) => `${p}-орын`,
  },
};

function groupWinnersByCategory(winners: TournamentWinner[]) {
  const groups = new Map<string, TournamentWinner[]>();
  for (const w of winners) {
    const key = w.category?.trim() || '';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(w);
  }
  for (const arr of groups.values()) arr.sort((a, b) => a.place - b.place);
  return Array.from(groups.entries());
}

function PodiumGroup({ winners, label }: { winners: TournamentWinner[]; label?: string }) {
  const { locale } = useLocale();
  const tt = t[locale as keyof typeof t] ?? t.ru;

  // Order podium visually: 2nd | 1st | 3rd; everything beyond 3rd renders below.
  const top = winners.filter((w) => w.place <= 3);
  const rest = winners.filter((w) => w.place > 3);
  const first = top.find((w) => w.place === 1);
  const second = top.find((w) => w.place === 2);
  const third = top.find((w) => w.place === 3);
  const visualOrder = [second, first, third].filter(Boolean) as TournamentWinner[];

  const heights: Record<number, string> = { 1: 'h-44', 2: 'h-32', 3: 'h-24' };
  const colors: Record<number, string> = {
    1: 'from-yellow-400 to-yellow-500',
    2: 'from-slate-300 to-slate-400',
    3: 'from-amber-700 to-amber-800',
  };
  const medals: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

  // Trigger confetti when this group enters the viewport (first place visible).
  const groupRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = groupRef.current;
    if (!el || !first) return;
    let fired = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !fired) {
            fired = true;
            const rect = el.getBoundingClientRect();
            const x = (rect.left + rect.width / 2) / window.innerWidth;
            const y = (rect.top + rect.height / 3) / window.innerHeight;
            confetti({
              particleCount: 140,
              spread: 80,
              startVelocity: 45,
              origin: { x, y },
              colors: ['#f4a724', '#e8890a', '#fbbf24', '#fde68a', '#ffffff'],
            });
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [first]);

  return (
    <div ref={groupRef} className="mb-12">
      {label && (
        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl font-bold text-secondary mb-6 text-center"
        >
          {label}
        </motion.h3>
      )}

      {visualOrder.length > 0 && (
        <div className="flex items-end justify-center gap-3 md:gap-6 mb-8">
          {visualOrder.map((w) => (
            <motion.div
              key={`${w.place}-${w.name}`}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (4 - w.place) * 0.18, duration: 0.55, ease: 'easeOut' }}
              className="flex flex-col items-center w-28 md:w-44"
            >
              <div className="text-3xl md:text-4xl mb-2">{medals[w.place]}</div>
              {w.photoUrl ? (
                <Image
                  src={w.photoUrl}
                  alt={w.name}
                  width={120}
                  height={120}
                  className="w-16 h-16 md:w-24 md:h-24 rounded-full object-cover border-4 border-white shadow-lg mb-2"
                />
              ) : (
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-2xl md:text-3xl mb-2 shadow-lg border-4 border-white">
                  👤
                </div>
              )}
              <p className="text-xs md:text-sm font-bold text-secondary text-center leading-tight px-1">
                {w.name}
              </p>
              {w.club && (
                <p className="text-[10px] md:text-xs text-gray-500 text-center mt-0.5 line-clamp-2 px-1">
                  {w.club}
                </p>
              )}
              {w.note && (
                <p className="text-[10px] md:text-xs text-primary italic text-center mt-0.5 line-clamp-2 px-1">
                  {w.note}
                </p>
              )}
              <div
                className={`w-full ${heights[w.place]} bg-gradient-to-t ${colors[w.place]} rounded-t-lg mt-3 flex items-start justify-center pt-2 shadow-md`}
              >
                <span className="text-2xl md:text-3xl font-extrabold text-white drop-shadow">
                  {w.place}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
          {rest.map((w, i) => (
            <motion.div
              key={`${w.place}-${w.name}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-3 shadow-sm"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/15 to-primary/5 text-primary font-bold flex items-center justify-center text-sm flex-shrink-0">
                {w.place}
              </div>
              {w.photoUrl ? (
                <Image
                  src={w.photoUrl}
                  alt={w.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
              ) : null}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-secondary truncate">{w.name}</p>
                {(w.club || w.note) && (
                  <p className="text-xs text-gray-500 truncate">{w.club || w.note}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function GalleryMasonry({ items }: { items: TournamentGalleryItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const slides = useMemo(
    () => items.map((g) => ({ src: g.url, description: g.caption })),
    [items],
  );

  return (
    <>
      <div className="columns-2 sm:columns-3 md:columns-4 gap-3 [column-fill:_balance]">
        {items.map((g, i) => (
          <motion.button
            key={`${g.url}-${i}`}
            type="button"
            onClick={() => setOpenIndex(i)}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: Math.min(i * 0.03, 0.6), duration: 0.4 }}
            whileHover={{ scale: 1.02 }}
            className="block mb-3 break-inside-avoid w-full overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-shadow group relative"
          >
            <Image
              src={g.url}
              alt={g.caption ?? ''}
              width={600}
              height={400}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="w-full h-auto object-cover group-hover:brightness-95 transition"
            />
            {g.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent text-white text-xs p-2 opacity-0 group-hover:opacity-100 transition">
                {g.caption}
              </div>
            )}
          </motion.button>
        ))}
      </div>

      <Lightbox
        open={openIndex !== null}
        close={() => setOpenIndex(null)}
        index={openIndex ?? 0}
        slides={slides}
        carousel={{ finite: items.length <= 1 }}
        animation={{ swipe: 250 }}
        styles={{ container: { backgroundColor: 'rgba(15,23,42,0.92)' } }}
      />
    </>
  );
}

export function TournamentRecap({ tournament }: { tournament: Tournament }) {
  const { locale } = useLocale();
  const tt = t[locale as keyof typeof t] ?? t.ru;

  const winners = (tournament.winners ?? []).filter((w) => w && w.name);
  const gallery = (tournament.gallery ?? []).filter((g) => g && g.url);
  const summary = tournament.recapSummary?.trim() ?? '';
  const hasAnyRecap = winners.length > 0 || gallery.length > 0 || summary.length > 0;

  const winnerGroups = useMemo(() => groupWinnersByCategory(winners), [winners]);

  return (
    <section className="bg-gradient-to-b from-primary/5 via-white to-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            {tt.completed}
          </div>
          <p className="text-gray-600 text-base md:text-lg">{tt.completedSub}</p>
        </motion.div>

        {!hasAnyRecap && (
          <p className="text-center text-gray-400 text-sm italic max-w-md mx-auto">
            {locale === 'en'
              ? 'Recap details will appear soon.'
              : locale === 'kk'
                ? 'Қорытынды жақын арада қосылады.'
                : 'Подробности скоро появятся.'}
          </p>
        )}

        {winners.length > 0 && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-8 text-center inline-flex items-center gap-2 justify-center w-full">
                <Trophy className="w-7 h-7 text-primary" />
                {tt.winners}
              </h2>
              {winnerGroups.map(([category, group]) => (
                <PodiumGroup
                  key={category || 'default'}
                  winners={group}
                  label={category || undefined}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {summary && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mb-12 prose prose-slate prose-headings:text-secondary prose-a:text-primary"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-6 not-prose">
              {tt.summary}
            </h2>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{summary}</ReactMarkdown>
          </motion.div>
        )}

        {gallery.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-6 text-center">
              {tt.gallery}
            </h2>
            <GalleryMasonry items={gallery} />
          </motion.div>
        )}
      </div>
    </section>
  );
}
