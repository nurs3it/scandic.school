import { Metadata } from 'next';
import { fetchAttestationTree, type AttestationSection } from '@/lib/attestation-api';
import { AttestationPageContent } from '@/components/attestation-page-content';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Аттестация | Scandic School',
  description: 'Документы для государственной аттестации Scandic School',
};

export default async function AttestationPage() {
  let tree: AttestationSection[] = [];
  try {
    tree = await fetchAttestationTree();
  } catch {
    tree = [];
  }
  return <AttestationPageContent tree={tree} path={[]} />;
}
