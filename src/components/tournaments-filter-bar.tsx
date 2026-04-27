'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import type { TournamentStatusFilter } from '@/lib/types/tournaments';

const STATUS_TABS: { value: TournamentStatusFilter; label: string }[] = [
  { value: 'upcoming', label: 'Предстоящие' },
  { value: 'ongoing', label: 'Идут сейчас' },
  { value: 'past', label: 'Прошедшие' },
];

export function TournamentsFilterBar({
  clubs,
  ageGroups,
  currentFilter,
}: {
  clubs: { id: number; name: string }[];
  ageGroups: string[];
  currentFilter: { status: TournamentStatusFilter; clubId?: number; ageGroup?: string };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const setParam = useCallback((key: string, value: string | undefined) => {
    const params = new URLSearchParams(sp.toString());
    if (value && value !== '') params.set(key, value);
    else params.delete(key);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, pathname, sp]);

  return (
    <div className="sticky top-16 z-30 bg-white/95 backdrop-blur border-b border-gray-100 py-3">
      <div className="container mx-auto px-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setParam('status', tab.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${currentFilter.status === tab.value ? 'bg-white shadow text-secondary' : 'text-gray-600 hover:text-secondary'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <select value={currentFilter.clubId ?? ''} onChange={(e) => setParam('clubId', e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
            <option value="">Все кружки</option>
            {clubs.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select value={currentFilter.ageGroup ?? ''} onChange={(e) => setParam('ageGroup', e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
            <option value="">Все возрасты</option>
            {ageGroups.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}
