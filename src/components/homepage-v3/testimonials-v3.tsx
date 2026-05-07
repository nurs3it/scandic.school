import { Star } from "lucide-react";
import { getLocale } from "@/lib/server-locale";
import type { Locale } from "@/lib/server-locale";
import { SectionHeading } from "./shared/section-heading";
import { getRecentReviews } from "@/lib/api/actions";

const translations = {
  ru: {
    title: "Что говорят семьи о Scandic",
    anonymousName: "Родитель",
    empty: "Скоро здесь появятся отзывы родителей.",
  },
  en: {
    title: "What families say about Scandic",
    anonymousName: "Parent",
    empty: "Family reviews will appear here soon.",
  },
  kk: {
    title: "Отбасылар Scandic туралы не айтады",
    anonymousName: "Ата-ана",
    empty: "Жақын арада ата-аналардың пікірлері пайда болады.",
  },
} as const;

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return "?";
  const first = parts[0][0] ?? "";
  const second = parts[1]?.[0] ?? "";
  return (first + second).toUpperCase();
}

function formatYear(iso: string, locale: Locale): string {
  const map: Record<Locale, string> = { ru: "ru-RU", en: "en-US", kk: "kk-KZ" };
  return new Intl.DateTimeFormat(map[locale], { year: "numeric" }).format(new Date(iso));
}

export async function TestimonialsV3() {
  const locale = await getLocale();
  const t = translations[locale];

  const result = await getRecentReviews(3);
  const reviews = result.success && result.data ? result.data : [];

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading title={t.title} />

        {reviews.length === 0 && (
          <p className="text-center text-brand-navy-700 mt-12">{t.empty}</p>
        )}

        {reviews.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {reviews.map((review) => {
              const displayName = review.name?.trim() || t.anonymousName;
              const initials = getInitials(displayName);
              const stars = review.rating ?? 5;
              return (
                <div
                  key={review.id}
                  className="bg-secondary-50 rounded-2xl p-6 flex flex-col"
                >
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={
                          i < stars
                            ? "w-4 h-4 fill-primary-400 text-primary-400"
                            : "w-4 h-4 text-secondary-300"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-brand-navy-900 leading-relaxed flex-1 mb-6 line-clamp-6">
                    {review.text}
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-secondary-100">
                    <div
                      className="w-12 h-12 rounded-full bg-secondary-700 text-white flex items-center justify-center font-display font-semibold text-sm flex-shrink-0"
                      aria-hidden
                    >
                      {initials}
                    </div>
                    <div>
                      <div className="font-display font-semibold text-sm text-brand-navy-900">
                        {displayName}
                      </div>
                      <div className="text-xs text-brand-navy-700">
                        {formatYear(review.created_at, locale)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
