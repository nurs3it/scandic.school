import { Trophy } from "lucide-react";
import { getLocale } from "@/lib/server-locale";

const translations = {
  ru: {
    title: "Программы поддержки",
    cards: [
      {
        title: "Поддержка работы одарённых детей",
        description:
          "Индивидуальные траектории, олимпиадная подготовка и менторство для учеников с высоким потенциалом.",
      },
      {
        title: "Выходные занятия",
        description:
          "Группы по интересам и дополнительные программы по субботам для всех возрастов.",
      },
      {
        title: "Родительский клуб",
        description:
          "Лекции, мастерские и встречи, которые помогают семьям расти вместе со школой.",
      },
    ],
    highlightTitle: "Scandic Extreme Challenge",
    highlightDesc:
      "Ежегодное масштабное спортивное мероприятие, направленное на развитие командной работы, стойкости и лидерских качеств. Ученики участвуют в серии физических и интеллектуальных испытаний, учатся работать в команде и преодолевать трудности.",
  },
  en: {
    title: "Support programmes",
    cards: [
      {
        title: "Gifted students programme",
        description:
          "Individual learning paths, olympiad preparation, and mentorship for high-potential students.",
      },
      {
        title: "Weekend classes",
        description:
          "Interest groups and Saturday programmes for all ages.",
      },
      {
        title: "Parents' club",
        description:
          "Lectures, workshops, and meetings that help families grow with the school.",
      },
    ],
    highlightTitle: "Scandic Extreme Challenge",
    highlightDesc:
      "An annual large-scale sporting event focused on building teamwork, resilience, and leadership. Students take part in a series of physical and intellectual challenges, learning to work as a team and overcome difficulty.",
  },
  kk: {
    title: "Қолдау бағдарламалары",
    cards: [
      {
        title: "Дарынды балаларды қолдау",
        description:
          "Жоғары әлеуеті бар оқушыларға арналған жеке траекториялар, олимпиадаға дайындық және менторлық.",
      },
      {
        title: "Демалыс күндеріндегі сабақтар",
        description:
          "Барлық жасқа арналған қызығушылық топтары мен сенбілік қосымша бағдарламалар.",
      },
      {
        title: "Ата-аналар клубы",
        description:
          "Отбасыларға мектеппен бірге өсуге көмектесетін дәрістер, шеберханалар мен кездесулер.",
      },
    ],
    highlightTitle: "Scandic Extreme Challenge",
    highlightDesc:
      "Командалық жұмыс, төзімділік пен көшбасшылық қасиеттерді дамытуға бағытталған жыл сайынғы ауқымды спорттық іс-шара. Оқушылар физикалық және интеллектуалдық сын-қатерлердің сериясына қатысып, командада жұмыс істеуге және қиындықтарды жеңуге үйренеді.",
  },
} as const;

const CARD_TINTS = [
  "bg-gradient-to-b from-secondary-50/70 to-white",
  "bg-gradient-to-b from-mint-accent/30 to-white",
  "bg-gradient-to-b from-primary-50/60 to-white",
];

export async function SupportProgramsV3() {
  const locale = await getLocale();
  const t = translations[locale];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-display font-bold !text-3xl md:!text-4xl lg:!text-5xl text-brand-navy-900 text-center !leading-[1.3]">
          {t.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12 md:mt-16">
          {t.cards.map((c, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-7 md:p-8 border border-secondary-100 shadow-sm transition-shadow duration-200 hover:shadow-xl ${CARD_TINTS[idx]}`}
            >
              <h3 className="font-display font-bold !text-lg md:!text-xl text-brand-navy-900 mb-3 leading-snug">
                {c.title}
              </h3>
              <p className="!text-sm md:!text-base text-brand-navy-700 leading-relaxed">
                {c.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 md:mt-12 rounded-2xl border-2 border-primary-200 bg-white p-6 md:p-8 flex items-start gap-5 md:gap-6">
          <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary-500 text-white flex items-center justify-center">
            <Trophy className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1.75} />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-bold !text-xl md:!text-2xl text-brand-navy-900 mb-2 leading-snug">
              {t.highlightTitle}
            </h3>
            <p className="!text-sm md:!text-base text-brand-navy-700 leading-relaxed">
              {t.highlightDesc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
