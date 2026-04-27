'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, Sparkles } from 'lucide-react';
import { useLocale } from '@/components/locale-provider';
import { ClubCard } from './club-card';
import { ParticleBackground } from './particle-background';
import type { Club } from '@/lib/types/clubs';

const t = {
  ru: { hero: 'Кружки', lead: 'Найдите занятие по душе — спорт, искусство, наука и многое другое', empty: 'Кружки скоро появятся', contactCta: 'Не нашли нужного? Свяжитесь с нами' },
  en: { hero: 'Clubs', lead: 'Find an activity you love — sports, arts, science, and more', empty: 'Clubs coming soon', contactCta: "Can't find one? Contact us" },
  kk: { hero: 'Үйірмелер', lead: 'Өзіңізге ұнайтын сабақты табыңыз — спорт, өнер, ғылым және басқалар', empty: 'Үйірмелер жақын арада', contactCta: 'Таппадыңыз ба? Бізбен байланысыңыз' },
};

export function ClubsPageContent({ clubs }: { clubs: Club[] }) {
  const { locale } = useLocale();
  const tt = t[locale as keyof typeof t] ?? t.ru;
  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-secondary-800 to-secondary-900 text-white">
        <ParticleBackground />
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{tt.hero}</h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl">{tt.lead}</p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-24">
        {clubs.length === 0 ? (
          <div className="text-center py-24">
            <BookOpen className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">{tt.empty}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((club, i) => <ClubCard key={club.id} club={club} index={i} />)}
          </div>
        )}

        <div className="mt-16 text-center">
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition shadow-lg">
            <Sparkles className="w-4 h-4" />
            {tt.contactCta}
          </Link>
        </div>
      </section>
    </main>
  );
}
