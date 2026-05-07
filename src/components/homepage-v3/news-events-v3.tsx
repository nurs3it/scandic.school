import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Trophy } from "lucide-react";
import { getLocale } from "@/lib/server-locale";
import type { Locale } from "@/lib/server-locale";
import { SectionHeading } from "./shared/section-heading";
import { SchoolLifeNewsletter } from "./school-life-v3-newsletter";
import { fetchNewsList } from "@/lib/news-api";
import { fetchTournaments } from "@/lib/tournaments-api";
import type { NewsItem } from "@/types/news";
import type { Tournament } from "@/lib/types/tournaments";

const translations = {
  ru: {
    title: "Жизнь школы",
    subtitle:
      "Свежие новости, ближайшие события и турниры — что происходит в Scandic прямо сейчас.",
    allNews: "Все новости",
    tournamentBadge: "Ближайший турнир",
    tournamentCta: "Подробнее о турнире",
    readingMin: "мин чтения",
    noContent: "Скоро здесь появятся свежие новости и события.",
    newsletterTitle: "Подпишитесь на наши новости",
    newsletterDesc: "Получайте анонсы событий и истории школы прямо на почту.",
    newsletterPlaceholder: "Ваш e-mail",
    newsletterSubmit: "Подписаться",
  },
  en: {
    title: "School life",
    subtitle:
      "Fresh news, upcoming events, and tournaments — what's happening at Scandic right now.",
    allNews: "All news",
    tournamentBadge: "Upcoming tournament",
    tournamentCta: "Tournament details",
    readingMin: "min read",
    noContent: "Fresh news and events will appear here soon.",
    newsletterTitle: "Subscribe to our news",
    newsletterDesc: "Get event announcements and school stories straight to your inbox.",
    newsletterPlaceholder: "Your email",
    newsletterSubmit: "Subscribe",
  },
  kk: {
    title: "Мектеп өмірі",
    subtitle:
      "Жаңа жаңалықтар, алдағы оқиғалар мен турнирлер — Scandic-та қазір не болып жатыр.",
    allNews: "Барлық жаңалықтар",
    tournamentBadge: "Жақын арадағы турнир",
    tournamentCta: "Турнир туралы толығырақ",
    readingMin: "оқу мин",
    noContent: "Жақын арада мұнда жаңалықтар мен оқиғалар пайда болады.",
    newsletterTitle: "Жаңалықтарымызға жазылыңыз",
    newsletterDesc: "Оқиғалар туралы хабарламалар мен мектеп әңгімелерін поштаңыздан алыңыз.",
    newsletterPlaceholder: "Сіздің e-mail",
    newsletterSubmit: "Жазылу",
  },
} as const;

function formatDate(iso: string, locale: Locale): string {
  const map: Record<Locale, string> = { ru: "ru-RU", en: "en-US", kk: "kk-KZ" };
  return new Intl.DateTimeFormat(map[locale], {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

async function loadData(): Promise<{
  news: NewsItem[];
  tournament: Tournament | null;
}> {
  let news: NewsItem[] = [];
  let tournament: Tournament | null = null;

  try {
    const list = await fetchNewsList({ pageSize: 3 });
    news = list.items ?? [];
  } catch {
    news = [];
  }

  try {
    const list = await fetchTournaments({ status: "upcoming", pageSize: 1 });
    tournament = list.items?.[0] ?? null;
  } catch {
    tournament = null;
  }

  return { news, tournament };
}

export async function NewsEventsV3() {
  const locale = await getLocale();
  const t = translations[locale];
  const { news, tournament } = await loadData();

  return (
    <section className="py-16 md:py-24 bg-secondary-50/40">
      <div className="container mx-auto px-4">
        <SectionHeading title={t.title} subtitle={t.subtitle} />

        {news.length === 0 && !tournament && (
          <p className="text-center text-brand-navy-700 mt-10">{t.noContent}</p>
        )}

        {news.length > 0 && (
          <div className="grid md:grid-cols-3 gap-5 md:gap-6 mt-10 md:mt-14">
            {news.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-secondary-100 hover:shadow-xl transition-shadow flex flex-col"
              >
                <div className="relative aspect-[16/10] bg-secondary-100 overflow-hidden">
                  {item.bannerUrl && (
                    <Image
                      src={item.bannerUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                <div className="p-5 md:p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-xs text-brand-navy-700/70 mb-3">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(item.publishedAt, locale)}
                    </span>
                    {item.readingMinutes > 0 && (
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {item.readingMinutes} {t.readingMin}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-bold !text-lg md:!text-xl text-brand-navy-900 leading-snug mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="!text-sm text-brand-navy-700 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {tournament && (
          <div className="mt-10 md:mt-14">
            <Link
              href={`/tournaments/${tournament.slug}`}
              className="group block bg-white rounded-2xl overflow-hidden border border-secondary-100 hover:shadow-xl transition-shadow"
            >
              <div className="grid md:grid-cols-5">
                <div className="relative md:col-span-2 aspect-[16/10] md:aspect-auto md:min-h-[260px] bg-secondary-100 overflow-hidden">
                  {tournament.bannerUrl && (
                    <Image
                      src={tournament.bannerUrl}
                      alt={tournament.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary-600 mb-3">
                    <Trophy className="w-4 h-4" />
                    {t.tournamentBadge}
                  </div>
                  <h3 className="font-display font-bold !text-2xl md:!text-3xl text-brand-navy-900 leading-snug mb-3">
                    {tournament.title}
                  </h3>
                  <p className="!text-sm md:!text-base text-brand-navy-700 leading-relaxed mb-5 line-clamp-3">
                    {tournament.shortDescription}
                  </p>
                  <div className="flex items-center gap-4 text-xs md:text-sm text-brand-navy-700/80 mb-5">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {formatDate(tournament.startDate, locale)}
                    </span>
                    {tournament.location && <span>· {tournament.location}</span>}
                  </div>
                  <span className="inline-flex items-center gap-2 text-primary-600 font-semibold">
                    {t.tournamentCta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {news.length > 0 && (
          <div className="mt-10 md:mt-12 text-center">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-secondary-300 hover:bg-secondary-50 text-secondary-800 font-medium transition-colors"
            >
              {t.allNews}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        <div className="mt-14 md:mt-20 max-w-3xl mx-auto">
          <SchoolLifeNewsletter
            title={t.newsletterTitle}
            description={t.newsletterDesc}
            placeholder={t.newsletterPlaceholder}
            submitLabel={t.newsletterSubmit}
          />
        </div>
      </div>
    </section>
  );
}
