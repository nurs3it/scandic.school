'use client';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { Calendar, Users, GraduationCap } from 'lucide-react';
import { useLocale } from '@/components/locale-provider';
import type { Club } from '@/lib/types/clubs';

const t = {
  ru: { tournaments: 'Турниры по этому кружку', noTournaments: 'Турниров пока нет' },
  en: { tournaments: 'Tournaments for this club', noTournaments: 'No tournaments yet' },
  kk: { tournaments: 'Осы үйірменің турнирлері', noTournaments: 'Турнирлер әлі жоқ' },
};

export function ClubDetailContent({ club }: { club: Club }) {
  const { locale } = useLocale();
  const tt = t[locale as keyof typeof t] ?? t.ru;
  return (
    <main>
      <section className="bg-gradient-to-br from-secondary via-secondary-800 to-secondary-900 text-white py-16 md:py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <Image src={club.image} alt={club.name} fill className="object-cover" priority />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{club.name}</h1>
            <p className="text-lg text-white/80 mb-6">{club.shortDescription}</p>
            <div className="flex flex-wrap gap-3">
              {club.ageRange && <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur rounded-full text-sm"><GraduationCap className="w-4 h-4" />{club.ageRange}</span>}
              {club.schedule && <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur rounded-full text-sm"><Calendar className="w-4 h-4" />{club.schedule}</span>}
              {club.teacher && <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur rounded-full text-sm"><Users className="w-4 h-4" />{club.teacher}</span>}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-3xl">
        <article className="prose prose-lg max-w-none">
          <ReactMarkdown>{club.description}</ReactMarkdown>
        </article>
      </section>

      {club.tournaments && club.tournaments.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold mb-6">{tt.tournaments}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {club.tournaments.map((tour) => (
              <a key={tour.id} href={`/tournaments/${tour.slug}`} className="block p-4 bg-white rounded-xl shadow hover:shadow-md transition">
                <h3 className="font-semibold">{tour.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{tour.shortDescription}</p>
              </a>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
