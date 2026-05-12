'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Trophy, Calendar } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchTournaments } from '@/lib/tournaments-api';
import { formatTournamentDateRange } from '@/lib/tournament-utils';
import { useLocale } from './locale-provider';

const t = {
  ru: { register: 'Подать заявку', upcoming: 'Турнир' },
  en: { register: 'Register', upcoming: 'Tournament' },
  kk: { register: 'Өтінім беру', upcoming: 'Турнир' },
};

export function PromoTournamentsBar() {
  const { locale } = useLocale();
  const tt = t[locale as keyof typeof t] ?? t.ru;
  const [index, setIndex] = useState(0);

  const { data } = useQuery({
    queryKey: ['promo-upcoming-tournaments'],
    queryFn: () => fetchTournaments({ status: 'upcoming', pageSize: 5 }),
    staleTime: 5 * 60 * 1000,
  });

  const items = data?.items ?? [];

  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 5000);
    return () => clearInterval(id);
  }, [items.length]);

  if (items.length === 0) return null;
  const current = items[index] ?? items[0];

  const titleNode = (
    <>
      <span className="font-semibold">{current.title}</span>
      <span className="inline-flex items-center gap-1 ml-3 opacity-80">
        <Calendar className="w-3.5 h-3.5" />
        {formatTournamentDateRange(current)}
      </span>
    </>
  );

  return (
    <div className="w-full bg-gradient-to-r from-primary to-primary/80 text-white text-sm">
      <div className="container mx-auto px-4 py-2 flex items-center gap-3 md:gap-5">
        <Trophy className="w-4 h-4 shrink-0" />
        <span className="hidden sm:inline shrink-0 uppercase text-[11px] tracking-wider font-semibold opacity-90">
          {tt.upcoming}
        </span>
        <Link
          href={`/tournaments/${current.slug}`}
          className="flex-1 min-w-0 hover:underline"
          key={current.id}
        >
          <MarqueeOnOverflow trigger={current.id}>{titleNode}</MarqueeOnOverflow>
        </Link>
        <Link
          href={`/tournaments/${current.slug}#register`}
          className="shrink-0 inline-flex items-center gap-1.5 bg-white text-primary font-semibold rounded-full px-3 py-1.5 text-xs md:text-sm hover:bg-white/90 transition"
        >
          {tt.register}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        {items.length > 1 && (
          <div className="hidden md:flex shrink-0 gap-1">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MarqueeOnOverflow({
  children,
  trigger,
}: {
  children: React.ReactNode;
  trigger: unknown;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);
  const [overflow, setOverflow] = useState(false);
  const [duration, setDuration] = useState(18);

  useLayoutEffect(() => {
    setOverflow(false);
  }, [trigger]);

  useLayoutEffect(() => {
    const measure = () => {
      const c = containerRef.current;
      const m = contentRef.current;
      if (!c || !m) return;
      const cw = c.clientWidth;
      const mw = m.scrollWidth;
      const isOverflow = mw > cw + 1;
      if (isOverflow) setDuration(Math.max(8, Math.round(mw / 50)));
      setOverflow(isOverflow);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [trigger, overflow]);

  return (
    <div ref={containerRef} className="overflow-hidden w-full">
      {overflow ? (
        <div
          className="promo-marquee-track"
          style={{ ['--marquee-duration' as string]: `${duration}s` }}
        >
          <span className="inline-flex items-center pr-12 whitespace-nowrap">
            {children}
          </span>
          <span className="inline-flex items-center pr-12 whitespace-nowrap" aria-hidden="true">
            {children}
          </span>
        </div>
      ) : (
        <span ref={contentRef} className="inline-flex items-center whitespace-nowrap">
          {children}
        </span>
      )}
    </div>
  );
}
