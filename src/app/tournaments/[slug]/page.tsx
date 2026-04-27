import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchTournamentBySlug } from '@/lib/tournaments-api';
import { TournamentDetailContent } from '@/components/tournament-detail-content';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const t = await fetchTournamentBySlug(slug);
    return { title: `${t.title} | Scandic School`, description: t.shortDescription };
  } catch { return { title: 'Турнир не найден' }; }
}

export default async function TournamentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const tournament = await fetchTournamentBySlug(slug);
    return <TournamentDetailContent tournament={tournament} />;
  } catch {
    notFound();
  }
}
