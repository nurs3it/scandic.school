import { Metadata } from 'next';
import { fetchClubs } from '@/lib/clubs-api';
import { ClubsPageContent } from '@/components/clubs-page-content';
import type { Club } from '@/lib/types/clubs';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Кружки | Scandic School',
  description: 'Все кружки и студии Scandic School',
};

export default async function ClubsPage() {
  let clubs: Club[] = [];
  try {
    clubs = await fetchClubs();
  } catch {
    clubs = [];
  }
  return <ClubsPageContent clubs={clubs} />;
}
