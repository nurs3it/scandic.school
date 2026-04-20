import { MerchItem } from '@/types/merch';

export async function fetchMerchItems(): Promise<MerchItem[]> {
  try {
    const res = await fetch('/api/merch', { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data.map(item => ({
      ...item,
      id: String(item.id),
    })) : [];
  } catch {
    return [];
  }
}
