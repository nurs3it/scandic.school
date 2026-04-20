'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Newspaper, SearchX } from 'lucide-react';
import { useNewsInfinite, useNewsTags } from '@/hooks/use-news';
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

  return (
    <section className="container mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl font-bold">Новости школы</h1>
      {tags.data && tags.data.length > 0 && <TagFilter tags={tags.data} active={tag} />}

      {list.isPending && <p className="text-center text-gray-500 py-12">Загрузка…</p>}
        {!list.isPending && all.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
              {tag ? (
                <SearchX className="w-10 h-10 text-primary" />
              ) : (
                <Newspaper className="w-10 h-10 text-primary" />
              )}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {tag ? `Нет новостей по тегу «${tag}»` : 'Новостей пока нет'}
            </h3>
            <p className="text-gray-500 max-w-md mb-6">
              {tag
                ? 'Попробуйте выбрать другой тег или посмотрите все новости.'
                : 'Мы готовим для вас интересные материалы. Загляните позже!'}
            </p>
            {tag && (
              <Link
                href="/news"
                className="px-5 py-2.5 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
              >
                Все новости
              </Link>
            )}
          </div>
        )}

      <NewsGrid items={all} />

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
  );
}
