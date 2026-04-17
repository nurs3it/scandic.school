'use client';

import { NewsCard } from './news-card';
import type { NewsItem } from '@/types/news';

export function NewsGrid({ items }: { items: NewsItem[] }) {
  if (items.length === 0) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, i) => <NewsCard key={item.id} item={item} index={i} />)}
    </div>
  );
}
