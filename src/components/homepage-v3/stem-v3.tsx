import { Microscope, Calculator, Languages, Palette } from "lucide-react";
import { getLocale } from "@/lib/server-locale";
import { SectionHeading } from "./shared/section-heading";
import { FeatureCard } from "./shared/feature-card";

const translations = {
  ru: {
    eyebrow: "академическая программа",
    title: "Междисциплинарный подход: фокус на STEM и развитие личности",
    primaryStage: "Начальная школа",
    primaryBullets: [
      "Интегрированное обучение через темы и проекты",
      "Раннее развитие STEM-мышления",
      "Языковое погружение: казахский, русский, английский",
      "Проектная работа и навыки сотрудничества",
    ],
    seniorStage: "Средняя и старшая школа",
    seniorBullets: [
      "Углублённая подготовка по STEM-направлениям",
      "Исследовательские проекты и научные работы",
      "Программы обмена и международные конкурсы",
      "Профессиональная ориентация и подготовка к вузу",
    ],
    subjectsHeading: "Предметные области",
    subjects: [
      { title: "Естественные науки", description: "Биология, химия, физика и интегрированные курсы с лабораторной практикой." },
      { title: "Математика", description: "От арифметики до анализа: развитие логики и критического мышления." },
      { title: "Языковые программы", description: "Казахский, русский, английский на уровне международных стандартов." },
      { title: "Искусство и история", description: "Творческое выражение и понимание контекста цивилизаций." },
    ],
  },
  en: {
    eyebrow: "academic programme",
    title: "Interdisciplinary approach: STEM focus and personal development",
    primaryStage: "Primary School",
    primaryBullets: [
      "Integrated learning through themes and projects",
      "Early development of STEM thinking",
      "Language immersion: Kazakh, Russian, English",
      "Project work and collaboration skills",
    ],
    seniorStage: "Middle and High School",
    seniorBullets: [
      "Advanced STEM preparation",
      "Research projects and scientific work",
      "Exchange programmes and international competitions",
      "Career guidance and university preparation",
    ],
    subjectsHeading: "Subject areas",
    subjects: [
      { title: "Natural sciences", description: "Biology, chemistry, physics and integrated courses with lab practice." },
      { title: "Mathematics", description: "From arithmetic to analysis: developing logic and critical thinking." },
      { title: "Language programmes", description: "Kazakh, Russian, English at international standards." },
      { title: "Art and history", description: "Creative expression and understanding the context of civilisations." },
    ],
  },
  kk: {
    eyebrow: "академиялық бағдарлама",
    title: "Пәнаралық тәсіл: STEM пен тұлғалық дамуға фокус",
    primaryStage: "Бастауыш мектеп",
    primaryBullets: [
      "Тақырыптар мен жобалар арқылы интеграцияланған оқыту",
      "STEM-ойлауды ерте дамыту",
      "Тілдік ену: қазақ, орыс, ағылшын",
      "Жобалық жұмыс және ынтымақтастық дағдылары",
    ],
    seniorStage: "Орта және жоғары мектеп",
    seniorBullets: [
      "STEM бағыттары бойынша тереңдетілген дайындық",
      "Зерттеу жобалары мен ғылыми жұмыстар",
      "Алмасу бағдарламалары мен халықаралық байқаулар",
      "Кәсіби бағдар мен ЖОО-ға дайындық",
    ],
    subjectsHeading: "Пән салалары",
    subjects: [
      { title: "Жаратылыстану ғылымдары", description: "Биология, химия, физика және зертханалық практикасы бар интеграцияланған курстар." },
      { title: "Математика", description: "Арифметикадан анализге дейін: логика мен сыни ойлауды дамыту." },
      { title: "Тілдік бағдарламалар", description: "Қазақ, орыс, ағылшын тілдері халықаралық стандарттар деңгейінде." },
      { title: "Өнер және тарих", description: "Шығармашылық өзін-өзі көрсету және өркениеттер контексін түсіну." },
    ],
  },
} as const;

const SUBJECT_ICONS = [
  <Microscope key="science" className="w-5 h-5" />,
  <Calculator key="math" className="w-5 h-5" />,
  <Languages key="lang" className="w-5 h-5" />,
  <Palette key="art" className="w-5 h-5" />,
];

export async function StemV3() {
  const locale = await getLocale();
  const t = translations[locale];

  return (
    <section className="py-12 md:py-20 bg-secondary-50">
      <div className="container mx-auto px-4">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} align="left" />
        <div className="grid md:grid-cols-2 gap-4 mt-10">
          <FeatureCard variant="white" title={t.primaryStage}>
            <ul className="text-sm text-brand-navy-700 space-y-1.5 mt-2 list-disc list-inside">
              {t.primaryBullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </FeatureCard>
          <FeatureCard variant="white" title={t.seniorStage}>
            <ul className="text-sm text-brand-navy-700 space-y-1.5 mt-2 list-disc list-inside">
              {t.seniorBullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </FeatureCard>
        </div>
        <h3 className="font-display font-semibold text-xl text-brand-navy-900 mt-12 mb-4">
          {t.subjectsHeading}
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {t.subjects.map((s, idx) => (
            <FeatureCard
              key={idx}
              variant="white"
              icon={SUBJECT_ICONS[idx]}
              title={s.title}
              description={s.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
