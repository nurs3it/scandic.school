'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Newspaper, SearchX, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNewsInfinite, useNewsTags } from '@/hooks/use-news';
import { NewsGrid } from '@/components/news/news-grid';
import { NewsFeaturedCard } from '@/components/news/news-featured-card';
import { TagFilter } from '@/components/news/tag-filter';
import { useLocale } from '@/components/locale-provider';
import { ParticleBackground } from '@/components/particle-background';

const t = {
  en: {
    heroLabel: 'News',
    title: 'School News',
    subtitle: 'Stay up to date with all events at our school',
    badge: 'Latest updates',
    loading: 'Loading...',
    noNewsTag: (tag: string) => `No news for tag "${tag}"`,
    noNews: 'No news yet',
    noNewsDescTag: 'Try selecting another tag or view all news.',
    noNewsDesc: 'We are preparing interesting content for you. Come back later!',
    allNews: 'All News',
    showMore: 'Show More',
    showMoreLoading: 'Loading...',
    featured: 'Featured',
    latestNews: 'All Articles',
    ctaTitle: 'Want to learn more?',
    ctaAdmissions: 'Submit Application',
    ctaAbout: 'About School',
    ctaContact: 'Contact Us',
    navAbout: 'About Us',
    navTestimonials: 'Testimonials',
    navDocuments: 'Documents',
  },
  ru: {
    heroLabel: 'Новости',
    title: 'Новости школы',
    subtitle: 'Будьте в курсе всех событий нашей школы',
    badge: 'Последние обновления',
    loading: 'Загрузка...',
    noNewsTag: (tag: string) => `Нет новостей по тегу «${tag}»`,
    noNews: 'Новостей пока нет',
    noNewsDescTag: 'Попробуйте выбрать другой тег или посмотрите все новости.',
    noNewsDesc: 'Мы готовим для вас интересные материалы. Загляните позже!',
    allNews: 'Все новости',
    showMore: 'Показать ещё',
    showMoreLoading: 'Загрузка...',
    featured: 'Главное',
    latestNews: 'Все статьи',
    ctaTitle: 'Хотите узнать больше?',
    ctaAdmissions: 'Подать заявку',
    ctaAbout: 'О школе',
    ctaContact: 'Связаться',
    navAbout: 'О нас',
    navTestimonials: 'Отзывы',
    navDocuments: 'Документы',
  },
  kk: {
    heroLabel: 'Жаңалықтар',
    title: 'Мектеп жаңалықтары',
    subtitle: 'Мектебіміздің барлық оқиғаларынан хабардар болыңыз',
    badge: 'Соңғы жаңартулар',
    loading: 'Жүктелуде...',
    noNewsTag: (tag: string) => `«${tag}» тегі бойынша жаңалықтар жоқ`,
    noNews: 'Жаңалықтар әзірше жоқ',
    noNewsDescTag: 'Басқа тегті таңдап көріңіз немесе барлық жаңалықтарды қараңыз.',
    noNewsDesc: 'Біз сіз үшін қызықты материалдар дайындап жатырмыз. Кейінірек кіріңіз!',
    allNews: 'Барлық жаңалықтар',
    showMore: 'Көбірек көрсету',
    showMoreLoading: 'Жүктелуде...',
    featured: 'Басты',
    latestNews: 'Барлық мақалалар',
    ctaTitle: 'Көбірек білгіңіз келе ме?',
    ctaAdmissions: 'Өтініш беру',
    ctaAbout: 'Мектеп туралы',
    ctaContact: 'Байланысу',
    navAbout: 'Біз туралы',
    navTestimonials: 'Пікірлер',
    navDocuments: 'Құжаттар',
  },
};

export default function NewsPage() {
  const params = useSearchParams();
  const tag = params.get('tag') ?? undefined;
  const { locale } = useLocale();
  const i = t[locale as keyof typeof t] || t.ru;

  const list = useNewsInfinite(tag);
  const tags = useNewsTags();

  const all = useMemo(
    () => list.data?.pages.flatMap(p => p.items) ?? [],
    [list.data?.pages],
  );

  const featured = all[0];
  const rest = all.slice(1);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[45vh] md:min-h-[55vh] flex items-end overflow-hidden bg-gradient-to-br from-secondary via-secondary-800 to-secondary-900">
        <ParticleBackground />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent" />

        <div className="absolute top-20 right-[15%] w-24 h-24 bg-primary/15 rounded-full blur-xl animate-float" />
        <div className="absolute top-[40%] left-[10%] w-16 h-16 bg-primary/20 rounded-full blur-lg animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-[30%] right-[8%] w-12 h-12 bg-accent/15 rounded-full blur-lg animate-float" style={{ animationDelay: '2.5s' }} />

        <div className="container mx-auto px-4 md:px-8 pb-12 md:pb-20 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-primary rounded-full" />
              <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">{i.heroLabel}</span>
            </span>
            <h1 className="text-[2.5rem] md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08] mb-4">
              {i.title}
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
              {i.subtitle}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }}>
            <div className="mt-8 inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-white/90 text-sm font-medium">{i.badge}</span>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      </section>

      {/* ===== TAG FILTER ===== */}
      {tags.data && tags.data.length > 0 && (
        <section className="border-b border-gray-200 bg-white sticky top-0 z-20">
          <div className="container mx-auto px-4 md:px-8 py-4">
            <TagFilter tags={tags.data} active={tag} />
          </div>
        </section>
      )}

      {/* ===== CONTENT ===== */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-white via-gray-50/50 to-secondary/[0.02]">
        <div className="container mx-auto px-4 md:px-8">
          {/* Loading state */}
          {list.isPending && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin mb-4" />
              <p className="text-gray-500 text-sm">{i.loading}</p>
            </div>
          )}

          {/* Empty state */}
          {!list.isPending && all.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-secondary/[0.08] border border-secondary/10 flex items-center justify-center mb-6">
                {tag ? <SearchX className="w-10 h-10 text-secondary/40" /> : <Newspaper className="w-10 h-10 text-secondary/40" />}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {tag ? i.noNewsTag(tag) : i.noNews}
              </h3>
              <p className="text-gray-500 max-w-md mb-6 leading-relaxed">
                {tag ? i.noNewsDescTag : i.noNewsDesc}
              </p>
              {tag && (
                <Link href="/news" className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-800 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-secondary/20">
                  {i.allNews}
                </Link>
              )}
            </motion.div>
          )}

          {/* Featured article */}
          {!list.isPending && featured && (
            <div className="mb-12 md:mb-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[2px] bg-primary rounded-full" />
                <span className="text-secondary text-sm font-semibold uppercase tracking-widest">{i.featured}</span>
              </div>
              <NewsFeaturedCard item={featured} />
            </div>
          )}

          {/* Rest of articles */}
          {!list.isPending && rest.length > 0 && (
            <>
              <div className="flex items-center gap-3 mb-8">
                <span className="w-8 h-[2px] bg-primary rounded-full" />
                <span className="text-secondary text-sm font-semibold uppercase tracking-widest">{i.latestNews}</span>
              </div>
              <NewsGrid items={rest} />
            </>
          )}

          {/* Load more */}
          {list.hasNextPage && (
            <div className="flex justify-center pt-10">
              <button
                onClick={() => list.fetchNextPage()}
                disabled={list.isFetchingNextPage}
                className="group inline-flex items-center gap-2 bg-white border border-secondary/15 hover:border-primary hover:bg-primary/5 px-8 py-4 rounded-xl text-secondary font-semibold text-sm transition-all duration-200 hover:shadow-md disabled:opacity-60"
              >
                {list.isFetchingNextPage ? i.showMoreLoading : i.showMore}
                {!list.isFetchingNextPage && <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ===== SUB-NAVIGATION STRIP ===== */}
      <section className="border-y border-gray-200 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center gap-5 md:gap-6 py-4 overflow-x-auto">
            <span className="text-secondary font-bold italic text-lg flex-shrink-0">{i.heroLabel}</span>
            <div className="w-px h-5 bg-gray-300 flex-shrink-0" />
            <Link href="/about" className="text-sm text-gray-500 hover:text-secondary transition-colors flex-shrink-0">{i.navAbout}</Link>
            <Link href="/testimonials" className="text-sm text-gray-500 hover:text-secondary transition-colors flex-shrink-0">{i.navTestimonials}</Link>
            <Link href="/documents" className="text-sm text-gray-500 hover:text-secondary transition-colors flex-shrink-0">{i.navDocuments}</Link>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-white py-16 md:py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/[0.06] rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary italic mb-8">{i.ctaTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/application" className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md">
                <span className="text-secondary font-semibold text-[15px]">{i.ctaAdmissions}</span>
                <ArrowRight className="h-4 w-4 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
              <Link href="/about" className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md">
                <span className="text-secondary font-semibold text-[15px]">{i.ctaAbout}</span>
                <ArrowRight className="h-4 w-4 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
              <Link href="/contact" className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md">
                <span className="text-secondary font-semibold text-[15px]">{i.ctaContact}</span>
                <ArrowRight className="h-4 w-4 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
