import { Metadata } from 'next';
import { fetchTournaments, fetchTournamentAgeGroups } from '@/lib/tournaments-api';
import { fetchClubs } from '@/lib/clubs-api';
import { TournamentsPageContent } from '@/components/tournaments-page-content';
import type { Club } from '@/lib/types/clubs';
import type { Tournament, TournamentStatusFilter } from '@/lib/types/tournaments';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Турниры | Scandic School',
  description: 'Турниры школы — расписание и регистрация',
};

const VALID_STATUS = ['all', 'upcoming', 'ongoing', 'past'] as const;

export default async function TournamentsPage({
  searchParams,
}: { searchParams: Promise<{ status?: string; clubId?: string; ageGroup?: string }> }) {
  const sp = await searchParams;
  const status = (VALID_STATUS as readonly string[]).includes(sp.status ?? '')
    ? (sp.status as TournamentStatusFilter)
    : 'all';
  const clubId = sp.clubId ? parseInt(sp.clubId, 10) || undefined : undefined;
  const ageGroup = sp.ageGroup || undefined;

  let items: Tournament[] = [];
  let total = 0;
  let clubs: Club[] = [];
  let ageGroups: string[] = [];
  try {
    const apiStatus = status === 'all' ? undefined : status;
    const [tres, cres, ares] = await Promise.all([
      fetchTournaments({ status: apiStatus, clubId, ageGroup, pageSize: 48 }),
      fetchClubs(),
      fetchTournamentAgeGroups(),
    ]);
    items = tres.items;
    total = tres.total;
    clubs = cres;
    ageGroups = ares;
  } catch {
    // API недоступен на build-time — graceful empty
  }

  return (
    <TournamentsPageContent
      tournaments={items}
      total={total}
      clubs={clubs.map((c) => ({ id: c.id, name: c.name }))}
      ageGroups={ageGroups}
      currentFilter={{ status, clubId, ageGroup }}
    />
  );
}
