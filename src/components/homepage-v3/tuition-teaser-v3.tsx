import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";
import { getLocale } from "@/lib/server-locale";
import { SectionHeading } from "./shared/section-heading";
import { TUITION_LEVELS, formatKzt } from "@/lib/tuition-data";

const translations = {
  ru: {
    eyebrow: "Стоимость обучения",
    title: "Прозрачные тарифы по уровням",
    subtitle:
      "Стоимость указана за 2026–2027 учебный год. Финальные условия согласовываются в приёмной комиссии.",
    perMonth: "в месяц",
    perYear: "в год",
    detailsCta: "Подробнее о тарифах",
  },
  en: {
    eyebrow: "Tuition",
    title: "Transparent fees by level",
    subtitle:
      "Prices are quoted for the 2026–2027 academic year. Final terms are confirmed by the admissions team.",
    perMonth: "per month",
    perYear: "per year",
    detailsCta: "See full tuition details",
  },
  kk: {
    eyebrow: "Оқу ақысы",
    title: "Деңгейлер бойынша ашық тарифтер",
    subtitle:
      "Бағалар 2026–2027 оқу жылы үшін көрсетілген. Соңғы шарттар қабылдау комиссиясымен расталады.",
    perMonth: "айына",
    perYear: "жылына",
    detailsCta: "Тарифтер туралы толығырақ",
  },
} as const;

export async function TuitionTeaserV3() {
  const locale = await getLocale();
  const t = translations[locale];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-secondary-50/40">
      <div className="container mx-auto px-4">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
        <div className="grid md:grid-cols-3 gap-5 md:gap-6 mt-10 md:mt-14 max-w-5xl mx-auto">
          {TUITION_LEVELS.map((level) => (
            <div
              key={level.id}
              className="bg-white rounded-2xl border border-secondary-100 shadow-sm p-6 md:p-7 flex flex-col"
            >
              <div className="w-11 h-11 rounded-xl bg-mint-accent/30 text-secondary-700 flex items-center justify-center mb-4">
                <GraduationCap className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-secondary-600 mb-1.5">
                {level.grades[locale]}
              </div>
              <h3 className="font-display font-bold !text-xl md:!text-2xl text-brand-navy-900 mb-4">
                {level.name[locale]}
              </h3>
              <div className="flex items-baseline gap-1.5 mt-auto pt-4 border-t border-secondary-100">
                <span className="font-display font-bold !text-2xl md:!text-3xl text-brand-navy-900">
                  {formatKzt(level.monthlyKzt)} ₸
                </span>
                <span className="text-sm text-brand-navy-700">{t.perMonth}</span>
              </div>
              <div className="text-xs text-brand-navy-700/70 mt-1">
                {formatKzt(level.yearlyKzt)} ₸ {t.perYear}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 md:mt-12 text-center">
          <Link
            href="/tuition"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary-700 hover:bg-secondary-800 text-white font-medium transition-colors"
          >
            {t.detailsCta}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
