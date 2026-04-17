'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useNewsInfinite, useNewsTags } from '@/hooks/use-news';
import { NewsHero } from '@/components/news/news-hero';
import { NewsFeaturedCard } from '@/components/news/news-featured-card';
import { NewsGrid } from '@/components/news/news-grid';
import { TagFilter } from '@/components/news/tag-filter';

export default function NewsPage() {
  const params = useSearchParams();
  const tag = params.get('tag') ?? undefined;

  const list = useNewsInfinite(tag);
  const tags = useNewsTags();

  const all = useMemo(
    () => list.data?.pages.flatMap(p => p.items) ?? [],
    [list.data?.pages],
  );
  const [featured, ...rest] = all;

  return (
    <>
      <NewsHero title="Новости школы" subtitle="События, анонсы и рассказы из жизни Scandic School" />
      <section className="container mx-auto px-4 py-10 space-y-8">
        {tags.data && tags.data.length > 0 && <TagFilter tags={tags.data} active={tag} />}

        {list.isPending && <p className="text-center text-gray-500 py-12">Загрузка…</p>}
        {!list.isPending && all.length === 0 && (
          <p className="text-center text-gray-500 py-16">Пока новостей нет{tag ? ` по тегу «${tag}»` : ''}.</p>
        )}

        {featured && !tag && <NewsFeaturedCard item={featured} />}
        <NewsGrid items={tag ? all : rest} />

        {list.hasNextPage && (
          <div className="flex justify-center pt-4">
            <button
              onClick={() => list.fetchNextPage()}
              disabled={list.isFetchingNextPage}
              className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 disabled:opacity-60"
            >
              {list.isFetchingNextPage ? 'Загрузка…' : 'Показать ещё'}
            </button>
          </div>
        )}
      </section>
    </>
  );
}
