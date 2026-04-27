import type { Tournament } from './types/tournaments';

export type ComputedStatus = 'upcoming' | 'ongoing' | 'past';

export function computeTournamentStatus(t: Pick<Tournament, 'startDate' | 'endDate'>, now = new Date()): ComputedStatus {
  const start = new Date(t.startDate);
  const end = new Date(t.endDate);
  if (now < start) return 'upcoming';
  if (now > end) return 'past';
  return 'ongoing';
}

export function formatTournamentDateRange(t: Pick<Tournament, 'startDate' | 'endDate'>, locale = 'ru-RU'): string {
  const start = new Date(t.startDate);
  const end = new Date(t.endDate);
  const sameDay = start.toDateString() === end.toDateString();
  const opts: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
  if (sameDay) return start.toLocaleDateString(locale, opts);
  return `${start.toLocaleDateString(locale, opts)} — ${end.toLocaleDateString(locale, opts)}`;
}

export function formatPrice(price: number, locale = 'ru-RU'): string {
  return `${price.toLocaleString(locale)} ₸`;
}

export function isRegistrationActive(t: Pick<Tournament, 'isRegistrationOpen' | 'registrationDeadline'>): boolean {
  if (!t.isRegistrationOpen) return false;
  if (t.registrationDeadline && new Date(t.registrationDeadline) < new Date()) return false;
  return true;
}
