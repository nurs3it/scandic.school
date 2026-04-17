import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchNewsList, fetchNewsTags, fetchNewsBySlug } from '@/lib/news-api';

const PAGE_SIZE = 12;

export function useNewsInfinite(tag?: string) {
  return useInfiniteQuery({
    queryKey: ['news', 'list', tag ?? null],
    queryFn: ({ pageParam = 1 }) =>
      fetchNewsList({ page: pageParam, pageSize: PAGE_SIZE, tag }),
    initialPageParam: 1,
    getNextPageParam: last => {
      const loaded = last.page * last.pageSize;
      return loaded < last.total ? last.page + 1 : undefined;
    },
  });
}

export function useNewsTags() {
  return useQuery({ queryKey: ['news', 'tags'], queryFn: fetchNewsTags });
}

export function useNewsBySlug(slug: string) {
  return useQuery({
    queryKey: ['news', 'detail', slug],
    queryFn: () => fetchNewsBySlug(slug),
  });
}
