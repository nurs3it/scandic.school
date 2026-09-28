import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  attestationTitle,
  fetchAttestationTree,
  findAttestationPath,
  type AttestationSection,
} from '@/lib/attestation-api';
import { getLocale } from '@/lib/server-locale';
import { AttestationPageContent } from '@/components/attestation-page-content';

export const revalidate = 60;

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  try {
    const path = findAttestationPath(await fetchAttestationTree(), slug);
    const section = path.at(-1);
    if (!section) return { title: 'Раздел не найден' };
    return { title: `${attestationTitle(section, await getLocale())} | Scandic School` };
  } catch {
    return { title: 'Аттестация | Scandic School' };
  }
}

export default async function AttestationSectionPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  let tree: AttestationSection[];
  try {
    tree = await fetchAttestationTree();
  } catch {
    notFound();
  }
  const path = findAttestationPath(tree, slug);
  if (!path.length) notFound();
  return <AttestationPageContent tree={tree} path={path} />;
}
