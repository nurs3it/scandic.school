import { getLocale } from "@/lib/server-locale";
import { HeroSlideshow } from "./hero-slideshow";

const translations = {
  ru: {
    schoolName: "Scandic International School",
    subname: "\"Scandic Mektebi\"",
    slogan: "Больше чем знания, Больше чем школа.",
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
    slogan: "More than knowledge, More than a school.",
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
    slogan: "Білімнен де көп, Мектептен де көп.",
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
    <section className="relative min-h-screen flex items-center text-white overflow-hidden bg-secondary-800">
      <HeroSlideshow />
      <div
        className="absolute inset-0 z-[1] hero-gradient-anim"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(12,61,54,0.80) 0%, rgba(30,171,132,0.55) 25%, rgba(168,230,210,0.45) 45%, rgba(249,115,22,0.55) 65%, rgba(194,65,12,0.55) 85%, rgba(12,61,54,0.80) 100%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 z-[1] mix-blend-overlay hero-gradient-anim-2"
        style={{
          backgroundImage:
            "linear-gradient(45deg, rgba(249,115,22,0.40) 0%, rgba(12,61,54,0.20) 35%, rgba(30,171,132,0.40) 65%, rgba(168,230,210,0.30) 100%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-black/15 to-black/50"
        aria-hidden
      />
      <div className="container relative z-10 py-20 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.svg"
          alt="Scandic International School"
          width={112}
          height={112}
          className="mx-auto w-24 h-24 md:w-28 md:h-28 object-contain mb-8 animate-fade-in [filter:brightness(0)_invert(1)]"
        />
        <h1 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl mb-4 animate-fade-in-up leading-[1.02]">
          {t.schoolName}
        </h1>
        <div className="text-mint-accent font-display text-2xl md:text-3xl mb-10">{t.subname}</div>
        <p className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold max-w-4xl mx-auto leading-tight mb-4">
          {t.slogan}
        </p>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">{t.description}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <a
            href="/application"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
          >
            {t.cta1}
          </a>
          <a
            href="/application"
            className="inline-flex items-center px-6 py-3 rounded-lg border border-white text-white hover:bg-white/10 font-medium transition-colors"
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
