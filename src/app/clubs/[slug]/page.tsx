import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchClubBySlug } from '@/lib/clubs-api';
import { ClubDetailContent } from '@/components/club-detail-content';

export const revalidate = 60;

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  try {
    const club = await fetchClubBySlug(slug);
    return { title: `${club.name} | Scandic School`, description: club.shortDescription };
  } catch {
    return { title: 'Кружок не найден' };
  }
}

export default async function ClubDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let club;
  try {
    club = await fetchClubBySlug(slug);
  } catch {
    notFound();
  }
  return <ClubDetailContent club={club!} />;
}
