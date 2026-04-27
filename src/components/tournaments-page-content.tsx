'use client';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { useLocale } from './locale-provider';
import { TournamentsFilterBar } from './tournaments-filter-bar';
import { TournamentCard } from './tournament-card';
import { ParticleBackground } from './particle-background';
import type { Tournament, TournamentStatusFilter } from '@/lib/types/tournaments';

const t = {
  ru: { hero: 'Турниры', lead: 'Расписание турниров и регистрация', empty: 'Нет турниров для выбранных фильтров' },
  en: { hero: 'Tournaments', lead: 'Schedule and registration', empty: 'No tournaments for selected filters' },
  kk: { hero: 'Турнирлер', lead: 'Кесте және тіркелу', empty: 'Таңдалған сүзгілер бойынша турнирлер жоқ' },
};

export function TournamentsPageContent({
  tournaments,
  clubs,
  ageGroups,
  currentFilter,
}: {
  tournaments: Tournament[];
  total: number;
  clubs: { id: number; name: string }[];
  ageGroups: string[];
  currentFilter: { status: TournamentStatusFilter; clubId?: number; ageGroup?: string };
}) {
  const { locale } = useLocale();
  const tt = t[locale as keyof typeof t] ?? t.ru;
  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-secondary-800 to-secondary-900 text-white">
        <ParticleBackground />
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{tt.hero}</h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl">{tt.lead}</p>
          </motion.div>
        </div>
      </section>

      <TournamentsFilterBar clubs={clubs} ageGroups={ageGroups} currentFilter={currentFilter} />

      <section className="container mx-auto px-4 py-12 md:py-16">
        {tournaments.length === 0 ? (
          <div className="text-center py-24">
            <Trophy className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">{tt.empty}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.map((t, i) => <TournamentCard key={t.id} tournament={t} index={i} />)}
          </div>
        )}
      </section>
    </main>
  );
}
