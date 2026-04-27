'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, MapPin, GraduationCap } from 'lucide-react';
import type { Tournament } from '@/lib/types/tournaments';
import {
  computeTournamentStatus,
  formatTournamentDateRange,
  formatPrice,
} from '@/lib/tournament-utils';

const STATUS_STYLES: Record<string, { label: string; cls: string }> = {
  upcoming: { label: 'Скоро', cls: 'bg-primary/10 text-primary' },
  ongoing: { label: 'Идёт', cls: 'bg-green-100 text-green-700' },
  past: { label: 'Завершён', cls: 'bg-gray-100 text-gray-600' },
};

export function TournamentCard({ tournament, index = 0 }: { tournament: Tournament; index?: number }) {
  const status = computeTournamentStatus(tournament);
  const badge = STATUS_STYLES[status];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
    >
      <Link href={`/tournaments/${tournament.slug}`} className="block">
        <div className="relative aspect-video overflow-hidden bg-gray-100">
          <Image src={tournament.bannerUrl} alt={tournament.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
          <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full ${badge.cls}`}>{badge.label}</span>
          {tournament.isFree && <span className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full bg-green-500 text-white">Бесплатно</span>}
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold text-secondary group-hover:text-primary transition-colors mb-2 line-clamp-2">{tournament.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">{tournament.shortDescription}</p>
          <div className="flex flex-col gap-2 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{formatTournamentDateRange(tournament)}</span>
            {tournament.location && <span className="inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{tournament.location}</span>}
            {tournament.ageGroup && <span className="inline-flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5" />{tournament.ageGroup}</span>}
          </div>
          {!tournament.isFree && (
            <div className="mt-4 pt-4 border-t border-gray-100 text-sm font-semibold text-secondary">
              {formatPrice(tournament.price)}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
