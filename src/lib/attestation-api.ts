import axios from 'axios';
import { cache } from 'react';

const API_BASE = process.env.NESTJS_API_URL || 'https://scandic-school-api.onrender.com';

export interface AttestationFile {
  id: number;
  title: string;
  url: string;
}

export interface AttestationSection {
  id: number;
  slug: string;
  titleKk: string;
  titleRu: string;
  titleEn: string;
  files: AttestationFile[];
  children: AttestationSection[];
}

// cache(): generateMetadata and the page share one request per render
export const fetchAttestationTree = cache(async (): Promise<AttestationSection[]> => {
  const { data } = await axios.get<AttestationSection[]>(`${API_BASE}/attestation`);
  return data;
});

/** Path from a root to the section with `slug` (inclusive), or [] if absent. */
export function findAttestationPath(
  tree: AttestationSection[],
  slug: string,
): AttestationSection[] {
  for (const node of tree) {
    if (node.slug === slug) return [node];
    const sub = findAttestationPath(node.children, slug);
    if (sub.length) return [node, ...sub];
  }
  return [];
}

export function attestationTitle(s: AttestationSection, locale: string) {
  return locale === 'kk' ? s.titleKk : locale === 'en' ? s.titleEn : s.titleRu;
}
