import { getLocale } from "@/lib/server-locale";

const translations = {
  ru: {
    schoolName: "Scandic International School",
    subname: "\"Scandic Mektebi\"",
    slogan: "Больше чем знания! Больше чем школа!",
    description: "Современное образование мирового уровня в Уральске",
    cta1: "Записаться на экскурсию",
    cta2: "Подать заявку",
    metaIb: "Кандидат школа IB · PYP",
    metaAddress: "Уральск, ул. Жданова 7/1",
    metaEnrollment: "Открыт набор на 2026-2027",
  },
  en: {
    schoolName: "Scandic International School",
    subname: "\"Scandic Mektebi\"",
    slogan: "More than knowledge! More than a school!",
    description: "Modern world-class education in Uralsk",
    cta1: "Book a tour",
    cta2: "Apply now",
    metaIb: "IB Candidate School · PYP",
    metaAddress: "Uralsk, Zhdanov St. 7/1",
    metaEnrollment: "2026-2027 enrollment open",
  },
  kk: {
    schoolName: "Scandic International School",
    subname: "\"Scandic Mektebi\"",
    slogan: "Білімнен де көп! Мектептен де көп!",
    description: "Оралда заманауи әлемдік деңгейдегі білім беру",
    cta1: "Экскурсияға жазылу",
    cta2: "Өтініш беру",
    metaIb: "IB Кандидат мектебі · PYP",
    metaAddress: "Орал, Жданов к-сі 7/1",
    metaEnrollment: "2026-2027 қабылдау ашық",
  },
} as const;

export async function HeroV3() {
  const locale = await getLocale();
  const t = translations[locale];

  return (
    <section className="relative min-h-[80vh] flex items-center bg-gradient-to-b from-brand-teal-800 to-brand-teal-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto w-20 h-20 rounded-full border-2 border-mint-accent flex items-center justify-center mb-6 animate-fade-in">
          <span className="text-mint-accent font-display font-bold text-3xl">S</span>
        </div>
        <h1 className="font-display font-bold text-4xl md:text-6xl mb-2 animate-fade-in-up">
          {t.schoolName}
        </h1>
        <div className="text-mint-accent font-display text-lg md:text-xl mb-6">{t.subname}</div>
        <p className="text-2xl md:text-3xl font-display font-semibold max-w-3xl mx-auto leading-tight mb-3">
          {t.slogan}
        </p>
        <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-10">{t.description}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <a
            href="/application"
            className="inline-flex items-center px-6 py-3 rounded-full bg-brand-orange-500 hover:bg-brand-orange-600 text-white font-medium transition-colors"
          >
            {t.cta1}
          </a>
          <a
            href="/application"
            className="inline-flex items-center px-6 py-3 rounded-full border border-white text-white hover:bg-white/10 font-medium transition-colors"
          >
            {t.cta2}
          </a>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs md:text-sm text-white/70">
          <span>{t.metaIb}</span>
          <span className="hidden md:inline">·</span>
          <span>{t.metaAddress}</span>
          <span className="hidden md:inline">·</span>
          <span>{t.metaEnrollment}</span>
        </div>
      </div>
    </section>
  );
}
