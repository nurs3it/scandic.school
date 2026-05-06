import { FlaskConical, Calculator, Languages, Palette } from "lucide-react";
import { getLocale } from "@/lib/server-locale";

const translations = {
  ru: {
    title: "Предметные области",
    subtitle:
      "Программа охватывает естественные науки, математику, языки и искусство — все дисциплины подаются с международным фокусом.",
    items: [
      {
        title: "Естественные науки",
        description:
          "Физика, химия и биология через исследования, эксперименты и практическое обучение. Наука не по учебнику, а через реальные опыты.",
        tags: ["Экспериментальная подача", "Экологические проекты", "Лабораторные работы"],
      },
      {
        title: "Математика",
        description:
          "Calculus, арифметика, алгебра, геометрия — развитие логики и аналитического аппарата высокого уровня.",
        tags: ["Логическое мышление", "Аналитическое мышление", "Практическое применение"],
      },
      {
        title: "Языковая программа",
        description:
          "Триязычная среда: русский, казахский и английский. Английский изучается как самостоятельный предмет с глубоким погружением, помимо основной программы.",
        tags: ["Русский язык", "Казахский язык", "English"],
      },
      {
        title: "Искусство и История",
        description:
          "Визуальное искусство, музыка и драма как инструменты самовыражения и культурного развития.",
        tags: ["Музыка", "Драма", "История культуры", "Музыкальный класс (планируется)", "Science cooking"],
      },
    ],
  },
  en: {
    title: "Subject areas",
    subtitle:
      "The curriculum covers sciences, mathematics, languages, and the arts — all delivered with an international focus.",
    items: [
      {
        title: "Sciences",
        description:
          "Physics, chemistry, and biology through inquiry, experiments, and hands-on learning. Science by doing, not by the textbook.",
        tags: ["Experimental approach", "Ecological projects", "Laboratory work"],
      },
      {
        title: "Mathematics",
        description:
          "Calculus, arithmetic, algebra, geometry — developing logic and high-level analytical thinking.",
        tags: ["Logical thinking", "Analytical thinking", "Practical application"],
      },
      {
        title: "Language programme",
        description:
          "Trilingual environment: Russian, Kazakh, and English. English is taught as a stand-alone subject with deep immersion alongside the core programme.",
        tags: ["Russian", "Kazakh", "English"],
      },
      {
        title: "Arts & History",
        description:
          "Visual art, music, and drama as tools for self-expression and cultural development.",
        tags: ["Music", "Drama", "Cultural history", "Music room (planned)", "Science cooking"],
      },
    ],
  },
  kk: {
    title: "Пәндік салалар",
    subtitle:
      "Бағдарлама жаратылыстану, математика, тілдер және өнерді қамтиды — барлық пәндер халықаралық фокуспен жүргізіледі.",
    items: [
      {
        title: "Жаратылыстану",
        description:
          "Физика, химия және биология зерттеулер, тәжірибелер және практикалық оқыту арқылы. Ғылым оқулықпен емес, нақты тәжірибемен.",
        tags: ["Тәжірибелік тәсіл", "Экологиялық жобалар", "Зертханалық жұмыстар"],
      },
      {
        title: "Математика",
        description:
          "Calculus, арифметика, алгебра, геометрия — логиканы және жоғары деңгейлі аналитикалық ойлауды дамыту.",
        tags: ["Логикалық ойлау", "Аналитикалық ойлау", "Практикалық қолдану"],
      },
      {
        title: "Тіл бағдарламасы",
        description:
          "Үштілді орта: орыс, қазақ және ағылшын. Ағылшын — негізгі бағдарламадан бөлек терең енумен оқытылатын пән.",
        tags: ["Орыс тілі", "Қазақ тілі", "English"],
      },
      {
        title: "Өнер және Тарих",
        description:
          "Бейнелеу өнері, музыка және драма — өзін-өзі көрсету мен мәдени дамудың құралы.",
        tags: ["Музыка", "Драма", "Мәдениет тарихы", "Музыка сыныбы (жоспарлануда)", "Science cooking"],
      },
    ],
  },
} as const;

const ICONS = [
  <FlaskConical key="science" className="w-6 h-6" />,
  <Calculator key="math" className="w-6 h-6" />,
  <Languages key="lang" className="w-6 h-6" />,
  <Palette key="art" className="w-6 h-6" />,
];

export async function SubjectAreasV3() {
  const locale = await getLocale();
  const t = translations[locale];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        <h2 className="font-display font-bold !text-2xl md:!text-3xl text-brand-navy-900 text-center">
          {t.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12 md:mt-16 max-w-7xl mx-auto">
          {t.items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 md:p-7 border border-secondary-100 transition-colors duration-200 hover:bg-secondary-100"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-secondary-500 text-white flex items-center justify-center flex-shrink-0">
                  {ICONS[idx]}
                </div>
                <h3 className="font-display font-bold !text-base md:!text-lg text-brand-navy-900 leading-tight">
                  {item.title}
                </h3>
              </div>
              <p className="!text-xs md:!text-sm text-brand-navy-700 leading-relaxed mb-5">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center text-[11px] md:text-xs font-medium rounded-full px-3 py-1 bg-white text-brand-navy-700 border border-secondary-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
