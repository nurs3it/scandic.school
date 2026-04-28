import { getLocale } from "@/lib/server-locale";
import { SectionHeading } from "./shared/section-heading";
import { StatCard } from "./shared/stat-card";

type Stat = { value: string; label: string; sublabel: string; meta?: string };

const translations: Record<"ru" | "en" | "kk", { title: string; stats: Stat[]; tagline: string; cta: string }> = {
  ru: {
    title: "Наши Амбиции до 2030 года",
    stats: [
      { value: "3", label: "уровня", sublabel: "Полный цикл IB", meta: "PYP, MYP, DP" },
      { value: ">200", label: "учеников с высокими результатами", sublabel: "Качество важнее количества" },
      { value: ">20", label: "педагогов международного уровня", sublabel: "Лучшие специалисты" },
      { value: "<100", label: "Поступление в ведущие 100 вузов мира", sublabel: "Топовые университеты" },
    ],
    tagline: "Присоединяйтесь к нашему путешествию к образованию будущего",
    cta: "Стать частью истории",
  },
  en: {
    title: "Our Ambitions to 2030",
    stats: [
      { value: "3", label: "levels", sublabel: "Full IB cycle", meta: "PYP, MYP, DP" },
      { value: ">200", label: "high-achieving students", sublabel: "Quality over quantity" },
      { value: ">20", label: "international-level teachers", sublabel: "Top specialists" },
      { value: "<100", label: "Admission to top-100 world universities", sublabel: "Leading universities" },
    ],
    tagline: "Join our journey towards the education of the future",
    cta: "Become part of the story",
  },
  kk: {
    title: "2030 жылға дейінгі амбицияларымыз",
    stats: [
      { value: "3", label: "деңгей", sublabel: "Толық IB циклы", meta: "PYP, MYP, DP" },
      { value: ">200", label: "жоғары нәтижелі оқушылар", sublabel: "Сан емес, сапа маңызды" },
      { value: ">20", label: "халықаралық деңгейдегі мұғалімдер", sublabel: "Үздік мамандар" },
      { value: "<100", label: "Әлемнің үздік 100 ЖОО-сына түсу", sublabel: "Жетекші университеттер" },
    ],
    tagline: "Болашақ біліміне сапарымызға қосылыңыз",
    cta: "Тарихтың бір бөлігі болыңыз",
  },
};

export async function AmbitionsV3() {
  const locale = await getLocale();
  const t = translations[locale];

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-brand-teal-700 to-brand-teal-800 text-white">
      <div className="container mx-auto px-4">
        <SectionHeading title={t.title} variant="dark" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
          {t.stats.map((s, i) => (
            <StatCard key={i} value={s.value} label={s.label} sublabel={s.sublabel} meta={s.meta} />
          ))}
        </div>
        <div className="mt-16 text-center">
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-6">{t.tagline}</p>
          <a
            href="/application"
            className="inline-flex items-center px-6 py-3 rounded-full bg-brand-orange-500 hover:bg-brand-orange-600 text-white font-medium transition-colors"
          >
            {t.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
