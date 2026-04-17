import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, User, Calendar } from 'lucide-react';
import type { Metadata } from 'next';
import { fetchNewsBySlug, fetchNewsList } from '@/lib/news-api';
import { MarkdownRenderer } from '@/components/news/markdown-renderer';
import { RelatedNews } from '@/components/news/related-news';

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const first = await fetchNewsList({ page: 1, pageSize: 50 });
    return first.items.map(item => ({ slug: item.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  try {
    const n = await fetchNewsBySlug(slug);
    return {
      title: n.title,
      description: n.description,
      openGraph: {
        title: n.title,
        description: n.description,
        images: [n.bannerUrl],
        type: 'article',
        publishedTime: n.publishedAt,
        authors: [n.author],
      },
    };
  } catch {
    return { title: 'Новость не найдена' };
  }
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });

export default async function NewsDetailPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  let item;
  try { item = await fetchNewsBySlug(slug); }
  catch { notFound(); }

  let related: Awaited<ReturnType<typeof fetchNewsList>>['items'] = [];
  const tag = item.tags[0];
  if (tag) {
    try {
      const list = await fetchNewsList({ page: 1, pageSize: 4, tag });
      related = list.items.filter(i => i.slug !== item.slug).slice(0, 3);
    } catch {}
  }

  return (
    <>
      <article>
        <div className="relative aspect-[21/9] min-h-[320px]">
          <Image src={item.bannerUrl} alt={item.title} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 container mx-auto px-4 py-8 md:py-12 text-white">
            <div className="flex flex-wrap gap-2 mb-3">
              {item.tags.map(t => (
                <Link key={t} href={`/news?tag=${encodeURIComponent(t)}`} className="text-xs px-3 py-1 rounded-full bg-white/15 backdrop-blur hover:bg-white/25">
                  #{t}
                </Link>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">{item.title}</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-8 pb-6 border-b">
            <span className="inline-flex items-center gap-1"><User className="h-4 w-4" />{item.author}</span>
            <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" />{fmtDate(item.publishedAt)}</span>
            <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" />{item.readingMinutes} мин чтения</span>
          </div>

          <p className="text-lg text-gray-700 mb-8 leading-relaxed">{item.description}</p>
          <MarkdownRenderer content={item.content} />

          <div className="mt-12 text-center">
            <Link href="/news" className="inline-block px-5 py-2.5 bg-primary text-white rounded-full hover:bg-primary/90">
              Все новости
            </Link>
          </div>
        </div>
      </article>

      <RelatedNews items={related} title="Читайте также" />
    </>
  );
}
