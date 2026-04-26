import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, User, Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { fetchNewsBySlug, fetchNewsList } from '@/lib/news-api';
import { MarkdownRenderer } from '@/components/news/markdown-renderer';
import { RelatedNews } from '@/components/news/related-news';
import { ScrollReveal } from '@/components/scroll-reveal';
import { getLocale } from '@/lib/server-locale';

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

const fmtDate = (iso: string, locale: string) =>
  new Date(iso).toLocaleDateString(locale === 'kk' ? 'kk-KZ' : locale === 'en' ? 'en-US' : 'ru-RU', {
    day: '2-digit', month: 'long', year: 'numeric',
  });

const readingLabel = (min: number, locale: string) => {
  if (locale === 'en') return `${min} min read`;
  if (locale === 'kk') return `${min} мин оқу`;
  return `${min} мин чтения`;
};

export default async function NewsDetailPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const locale = await getLocale();

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

  const allNewsLabel = locale === 'en' ? 'All News' : locale === 'kk' ? 'Барлық жаңалықтар' : 'Все новости';
  const relatedLabel = locale === 'en' ? 'Related Articles' : locale === 'kk' ? 'Ұқсас мақалалар' : 'Читайте также';

  return (
    <>
      <article>
        {/* ===== BANNER ===== */}
        <div className="relative aspect-[21/9] min-h-[360px] md:min-h-[420px]">
          <Image src={item.bannerUrl} alt={item.title} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

          {/* Back button */}
          <div className="absolute top-6 left-0 right-0">
            <div className="container mx-auto px-4 md:px-8">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors bg-black/20 backdrop-blur-sm rounded-full px-4 py-2"
              >
                <ArrowLeft className="h-4 w-4" />
                {allNewsLabel}
              </Link>
            </div>
          </div>

          <div className="absolute bottom-0 inset-x-0">
            <div className="container mx-auto px-4 md:px-8 pb-8 md:pb-12 text-white">
              <div className="max-w-4xl">
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map(t => (
                    <Link
                      key={t}
                      href={`/news?tag=${encodeURIComponent(t)}`}
                      className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm hover:bg-white/25 transition-colors"
                    >
                      #{t}
                    </Link>
                  ))}
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                  {item.title}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* ===== META BAR ===== */}
        <div className="border-b border-gray-200 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto flex flex-wrap gap-5 py-5 text-sm text-gray-500">
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4 text-secondary/50" />{item.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-secondary/50" />{fmtDate(item.publishedAt, locale)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-secondary/50" />{readingLabel(item.readingMinutes, locale)}
              </span>
            </div>
          </div>
        </div>

        {/* ===== CONTENT ===== */}
        <div className="py-10 md:py-16 bg-gradient-to-br from-white via-gray-50/30 to-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto">
              <ScrollReveal>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10 font-medium border-l-4 border-primary pl-6">
                  {item.description}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <MarkdownRenderer content={item.content} />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </article>

      {/* ===== RELATED NEWS ===== */}
      {related.length > 0 && <RelatedNews items={related} title={relatedLabel} />}

      {/* ===== BOTTOM NAV ===== */}
      <section className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto flex items-center justify-between py-6">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-secondary hover:text-primary text-sm font-semibold transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              {allNewsLabel}
            </Link>
            <Link
              href="/application"
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-secondary/20 group"
            >
              {locale === 'en' ? 'Apply Now' : locale === 'kk' ? 'Өтініш беру' : 'Подать заявку'}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
