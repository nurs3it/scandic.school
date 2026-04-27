'use client';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { Calendar, MapPin, GraduationCap, Clock } from 'lucide-react';
import { useLocale } from './locale-provider';
import { TournamentStagesTimeline } from './tournament-stages-timeline';
import { TournamentPaymentBlock } from './tournament-payment-block';
import { TournamentRegistrationForm } from './tournament-registration-form';
import type { Tournament } from '@/lib/types/tournaments';
import { formatTournamentDateRange, formatPrice } from '@/lib/tournament-utils';

const t = {
  ru: { stages: 'Программа турнира', terms: 'Условия участия', club: 'Кружок', deadline: 'Заявки до', free: 'Бесплатно', age: 'Возраст' },
  en: { stages: 'Programme', terms: 'Terms', club: 'Club', deadline: 'Apply by', free: 'Free', age: 'Age' },
  kk: { stages: 'Бағдарлама', terms: 'Шарттар', club: 'Үйірме', deadline: 'Өтінімдер', free: 'Тегін', age: 'Жасы' },
};

export function TournamentDetailContent({ tournament }: { tournament: Tournament }) {
  const { locale } = useLocale();
  const tt = t[locale as keyof typeof t] ?? t.ru;
  return (
    <main>
      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <Image src={tournament.bannerUrl} alt={tournament.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-4 pb-12 relative z-10 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-4xl">{tournament.title}</h1>
          <p className="text-lg text-white/80 max-w-2xl">{tournament.shortDescription}</p>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-lg p-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <Stat icon={Calendar} label="Даты" value={formatTournamentDateRange(tournament)} />
          {tournament.location && <Stat icon={MapPin} label="Локация" value={tournament.location} />}
          {tournament.ageGroup && <Stat icon={GraduationCap} label={tt.age} value={tournament.ageGroup} />}
          {tournament.registrationDeadline && <Stat icon={Clock} label={tt.deadline} value={new Date(tournament.registrationDeadline).toLocaleDateString('ru-RU')} />}
          <Stat icon={Calendar} label="Цена" value={tournament.isFree ? tt.free : formatPrice(tournament.price)} />
        </div>
      </section>

      {tournament.stages?.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-6">{tt.stages}</h2>
          <TournamentStagesTimeline stages={tournament.stages} />
        </section>
      )}

      <section className="container mx-auto px-4 py-12 max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-6">{tt.terms}</h2>
        <article className="prose prose-lg max-w-none">
          <ReactMarkdown>{tournament.description}</ReactMarkdown>
        </article>
      </section>

      {tournament.club && (
        <section className="container mx-auto px-4 py-12 max-w-3xl">
          <Link href={`/clubs/${tournament.club.slug}`} className="block bg-gradient-to-r from-secondary to-secondary-800 text-white rounded-2xl p-6 hover:shadow-xl transition">
            <p className="text-xs uppercase tracking-wider text-white/60 mb-1">{tt.club}</p>
            <h3 className="text-2xl font-semibold">{tournament.club.name} →</h3>
          </Link>
        </section>
      )}

      <section className="container mx-auto px-4 py-12 grid lg:grid-cols-2 gap-8 max-w-6xl">
        <TournamentPaymentBlock tournament={tournament} />
        <TournamentRegistrationForm tournament={tournament} />
      </section>
    </main>
  );
}

function Stat({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>, label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="w-5 h-5 text-primary mt-0.5" />
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-semibold text-secondary">{value}</p>
      </div>
    </div>
  );
}
