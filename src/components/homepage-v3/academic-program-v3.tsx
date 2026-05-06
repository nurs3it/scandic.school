import { Check, GraduationCap, BookOpen, Sparkles } from "lucide-react";
import { getLocale } from "@/lib/server-locale";
import { SectionHeading } from "./shared/section-heading";

const translations = {
  ru: {
    eyebrow: "академическая программа",
    title: "Междисциплинарный подход: фокус на STEM и развитие личности",
    subtitle:
      "Программа сочетает международные стандарты IB с авторскими методиками. Каждый этап выстроен под возрастные особенности и амбиции учеников.",
    primary: {
      title: "Начальная школа",
      ages: "7–11 лет",
      programme: "IB Primary Years Programme (PYP)",
      bullets: [
        "Исследовательский подход к обучению через 6 трансдисциплинарных тем",
        "Развитие любознательности, эмоционального интеллекта и самостоятельности",
        "Сильная база по математике, языкам и естественным наукам",
        "Ежедневные занятия английским языком — погружение в практическую речь",
        "Творческие мастерские, спорт и обучение на природе",
      ],
    },
    secondary: {
      title: "Средняя и старшая школа",
      ages: "12–18 лет",
      programme: "IB MYP + Diploma Programme (DP)",
      bullets: [
        "Углублённое изучение STEM-дисциплин и индивидуальные траектории",
        "Развитие критического мышления и академического письма",
        "Личный проект (Personal Project) и исследовательская работа Extended Essay",
        "Подготовка к поступлению в топ-100 вузов мира",
        "Профориентация, стажировки и менторская поддержка",
      ],
    },
    extracurricular: {
      title: "Внеучебное развитие",
      ages: "1–11 классы",
      programme: "Школа полного дня",
      bullets: [
        "Выполнение домашних заданий и защита проектов в стенах школы",
        "Выезды и работа с приглашёнными экспертами",
        "Кружки и секции по интересам",
        "Лаборатория физики и экспериментов",
        "Развитие самостоятельности и практических навыков",
      ],
    },
  },
  en: {
    eyebrow: "academic programme",
    title: "An interdisciplinary approach: STEM focus and personal growth",
    subtitle:
      "The programme combines IB international standards with our own methodology. Every stage is designed around students' age and ambitions.",
    primary: {
      title: "Primary school",
      ages: "ages 7–11",
      programme: "IB Primary Years Programme (PYP)",
      bullets: [
        "Inquiry-based learning across six transdisciplinary themes",
        "Curiosity, emotional intelligence, and independence",
        "Strong foundation in maths, languages, and sciences",
        "Daily English lessons — immersion in everyday spoken language",
        "Creative workshops, sport, and outdoor learning",
      ],
    },
    secondary: {
      title: "Middle and high school",
      ages: "ages 12–18",
      programme: "IB MYP + Diploma Programme (DP)",
      bullets: [
        "In-depth STEM studies and individual learning paths",
        "Critical thinking and academic writing",
        "Personal Project and Extended Essay research",
        "Preparation for admission to top-100 world universities",
        "Career guidance, internships, and mentor support",
      ],
    },
    extracurricular: {
      title: "Beyond the curriculum",
      ages: "grades 1–11",
      programme: "Full-day school",
      bullets: [
        "Homework and project defence supervised on campus",
        "Field trips and work with guest experts",
        "Clubs and sections by interest",
        "Physics and experimentation lab",
        "Building independence and hands-on skills",
      ],
    },
  },
  kk: {
    eyebrow: "академиялық бағдарлама",
    title: "Пәнаралық тәсіл: STEM фокусы және тұлғалық даму",
    subtitle:
      "Бағдарлама халықаралық IB стандарттарын авторлық әдістемелермен біріктіреді. Әр кезең оқушылардың жасы мен амбицияларына сай құрылған.",
    primary: {
      title: "Бастауыш мектеп",
      ages: "7–11 жас",
      programme: "IB Primary Years Programme (PYP)",
      bullets: [
        "Алты пәнаралық тақырып бойынша зерттеу негіздегі оқыту",
        "Құмарлық, эмоционалдық интеллект және өзіндік даму",
        "Математика, тіл және жаратылыстану бойынша мықты негіз",
        "Ағылшын тілінен күнделікті сабақтар — практикалық сөйлеу тіліне ену",
        "Шығармашылық шеберханалар, спорт және табиғатта оқыту",
      ],
    },
    secondary: {
      title: "Орта және жоғары мектеп",
      ages: "12–18 жас",
      programme: "IB MYP + Diploma Programme (DP)",
      bullets: [
        "STEM пәндерін тереңдетіп оқыту және жеке траекториялар",
        "Сыни ойлау мен академиялық жазу",
        "Personal Project және Extended Essay зерттеулері",
        "Әлемнің үздік 100 ЖОО-сына түсуге дайындық",
        "Кәсіби бағдар, тағылымдамалар мен ментор қолдауы",
      ],
    },
    extracurricular: {
      title: "Сабақтан тыс даму",
      ages: "1–11 сыныптар",
      programme: "Толық күндік мектеп",
      bullets: [
        "Үй тапсырмасы мен жоба қорғау мектеп қабырғасында",
        "Сапарлар мен шақырылған сарапшылармен жұмыс",
        "Қызығушылық бойынша үйірмелер мен секциялар",
        "Физика және эксперимент зертханасы",
        "Дербестік пен практикалық дағдыларды дамыту",
      ],
    },
  },
} as const;

export async function AcademicProgramV3() {
  const locale = await getLocale();
  const t = translations[locale];

  const cards = [
    {
      data: t.primary,
      icon: <BookOpen className="w-6 h-6" />,
      accent: "border-t-secondary-500",
      iconBg: "bg-secondary-100 text-secondary-700",
      programmeColor: "text-secondary-700",
      checkColor: "text-secondary-600",
    },
    {
      data: t.secondary,
      icon: <GraduationCap className="w-6 h-6" />,
      accent: "border-t-primary-500",
      iconBg: "bg-primary-50 text-primary-600",
      programmeColor: "text-primary-600",
      checkColor: "text-primary-500",
    },
    {
      data: t.extracurricular,
      icon: <Sparkles className="w-6 h-6" />,
      accent: "border-t-mint-accent",
      iconBg: "bg-mint-accent/30 text-secondary-700",
      programmeColor: "text-secondary-700",
      checkColor: "text-secondary-600",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          subtitle={t.subtitle}
          align="center"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12 md:mt-16 max-w-6xl mx-auto">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-2xl p-6 md:p-8 border border-secondary-100 shadow-sm border-t-4 ${card.accent} transition-shadow duration-200 hover:shadow-xl`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-display font-bold !text-xl md:!text-2xl text-brand-navy-900 mb-1">
                    {card.data.title}
                  </h3>
                  <div className="!text-sm text-brand-navy-700">{card.data.ages}</div>
                </div>
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${card.iconBg}`}
                >
                  {card.icon}
                </div>
              </div>
              <hr className="my-5 border-secondary-100" />
              <div className={`!text-sm font-semibold ${card.programmeColor}`}>
                {card.data.programme}
              </div>
              <hr className="my-5 border-secondary-100" />
              <ul className="space-y-2.5">
                {card.data.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="flex gap-2.5 !text-sm text-brand-navy-700 leading-relaxed"
                  >
                    <Check className={`w-4 h-4 mt-1 flex-shrink-0 ${card.checkColor}`} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
