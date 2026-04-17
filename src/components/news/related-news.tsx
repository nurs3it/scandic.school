'use client';

import type { NewsItem } from '@/types/news';
import { NewsCard } from './news-card';

export function RelatedNews({ items, title }: { items: NewsItem[]; title: string }) {
  if (items.length === 0) return null;
  return (
    <section className="container mx-auto px-4 py-12 border-t">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, i) => <NewsCard key={item.id} item={item} index={i} />)}
      </div>
    </section>
  );
}
