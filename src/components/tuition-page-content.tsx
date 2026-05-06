import Link from "next/link";
import { Check, GraduationCap, MessageCircle } from "lucide-react";
import { getLocale } from "@/lib/server-locale";
import { TUITION_LEVELS, formatKzt } from "@/lib/tuition-data";

const translations = {
  ru: {
    eyebrow: "Стоимость обучения",
    title: "Тарифы Scandic International School",
    intro:
      "Тарифы покрывают академическую программу, доступ к лабораториям, питание и продлённый день. Указаны примерные значения за 2026–2027 учебный год; финальные условия согласовываются индивидуально с приёмной комиссией.",
    whatIncluded: "Что входит в стоимость",
    perMonth: "в месяц",
    perYear: "в год",
    questionsTitle: "Остались вопросы по стоимости?",
    questionsSubtitle:
      "Напишите нам — расскажем о доступных льготах, рассрочке и условиях для семей с несколькими детьми.",
    contactCta: "Связаться с приёмной комиссией",
  },
  en: {
    eyebrow: "Tuition",
    title: "Tuition at Scandic International School",
    intro:
      "Tuition covers the academic programme, lab access, meals, and the extended school day. Prices below are illustrative for the 2026–2027 academic year; final terms are agreed individually with the admissions team.",
    whatIncluded: "What's included",
    perMonth: "per month",
    perYear: "per year",
    questionsTitle: "Questions about tuition?",
    questionsSubtitle:
      "Write to us — we'll walk you through available scholarships, payment plans, and family discounts.",
    contactCta: "Contact admissions",
  },
  kk: {
    eyebrow: "Оқу ақысы",
    title: "Scandic International School оқу ақысы",
    intro:
      "Оқу ақысы академиялық бағдарламаны, зертханаларға қолжетімділікті, тамақтану мен ұзартылған күнді қамтиды. Төмендегі бағалар 2026–2027 оқу жылы үшін шамамен берілген; соңғы шарттар қабылдау комиссиясымен жеке талқыланады.",
    whatIncluded: "Бағаға не кіреді",
    perMonth: "айына",
    perYear: "жылына",
    questionsTitle: "Оқу ақысы туралы сұрақтарыңыз бар ма?",
    questionsSubtitle:
      "Бізге жазыңыз — жеңілдіктер, бөліп төлеу және отбасылық жағдайлар туралы айтып береміз.",
    contactCta: "Қабылдау комиссиясымен байланысу",
  },
} as const;

export async function TuitionPageContent() {
  const locale = await getLocale();
  const t = translations[locale];

  return (
    <>
      <section className="py-16 md:py-20 bg-gradient-to-b from-secondary-50/60 to-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-secondary-600 mb-4">
            {t.eyebrow}
          </p>
          <h1 className="font-display font-bold !text-3xl md:!text-5xl text-brand-navy-900 !leading-[1.2] mb-6">
            {t.title}
          </h1>
          <p className="!text-base md:!text-lg text-brand-navy-700 leading-relaxed">{t.intro}</p>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 md:gap-7 max-w-6xl mx-auto">
            {TUITION_LEVELS.map((level) => (
              <article
                key={level.id}
                className="bg-white rounded-2xl border border-secondary-100 shadow-sm p-7 md:p-8 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-mint-accent/30 text-secondary-700 flex items-center justify-center mb-5">
                  <GraduationCap className="w-6 h-6" strokeWidth={1.75} />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-secondary-600 mb-1.5">
                  {level.grades[locale]}
                </div>
                <h2 className="font-display font-bold !text-2xl md:!text-3xl text-brand-navy-900 mb-4">
                  {level.name[locale]}
                </h2>
                <div className="flex items-baseline gap-1.5 pb-5 mb-5 border-b border-secondary-100">
                  <span className="font-display font-bold !text-3xl text-brand-navy-900">
                    {formatKzt(level.monthlyKzt)} ₸
                  </span>
                  <span className="text-sm text-brand-navy-700">{t.perMonth}</span>
                </div>
                <div className="text-sm text-brand-navy-700/70 -mt-3 mb-5">
                  {formatKzt(level.yearlyKzt)} ₸ {t.perYear}
                </div>
                <h3 className="font-display font-semibold !text-sm uppercase tracking-wider text-brand-navy-900/80 mb-3">
                  {t.whatIncluded}
                </h3>
                <ul className="space-y-2.5">
                  {level.highlights[locale].map((h) => (
                    <li key={h} className="flex items-start gap-2.5">
                      <Check
                        className="w-4 h-4 text-secondary-600 flex-shrink-0 mt-1"
                        strokeWidth={2.25}
                      />
                      <span className="!text-sm text-brand-navy-800 leading-snug">{h}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary-700">
        <div className="container mx-auto px-4 max-w-3xl text-center text-white">
          <MessageCircle className="w-10 h-10 mx-auto mb-5 text-mint-accent" strokeWidth={1.5} />
          <h2 className="font-display font-bold !text-2xl md:!text-3xl mb-3">{t.questionsTitle}</h2>
          <p className="!text-base md:!text-lg text-white/90 mb-7 leading-relaxed">
            {t.questionsSubtitle}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-white hover:bg-white/95 text-secondary-700 font-semibold transition-colors"
          >
            {t.contactCta}
          </Link>
        </div>
      </section>
    </>
  );
}
