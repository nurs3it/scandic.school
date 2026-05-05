import { Award, Globe, Laptop, Trophy } from "lucide-react";
import { getLocale } from "@/lib/server-locale";
import { SectionHeading } from "./shared/section-heading";

const TOP_ICONS = [
  <Award key="ib" className="w-6 h-6" strokeWidth={1.75} />,
  <Globe key="lab" className="w-6 h-6" strokeWidth={1.75} />,
  <Laptop key="grade" className="w-6 h-6" strokeWidth={1.75} />,
  <Trophy key="extreme" className="w-6 h-6" strokeWidth={1.75} />,
];

const translations = {
  ru: {
    eyebrow: "почему Scandic International School",
    title: "Образование, которое готовит к будущему",
    subtitle:
      "Мы объединяем скандинавскую философию образования с международными академическими стандартами для создания среды, где дети процветают",
    topItems: [
      {
        title: "Статус школы-кандидата IB PYP",
        description:
          "International Baccalaureate Primary Years Programme — признанная во всём мире программа",
      },
      {
        title: "Сотрудничество с The LAB22",
        description:
          "Международная лаборатория из Лондона в области STEM-образования и проектной деятельности",
      },
      {
        title: "Собственное приложение GradeApp",
        description:
          "Расписание, оценки, посещаемость и связь с учителями в одном приложении",
      },
      {
        title: "Scandic Extreme Challenge",
        description:
          "Масштабное спортивное мероприятие для развития командной работы и стойкости",
      },
    ],
    bottomItems: [
      {
        title: "Малые классы",
        description:
          "До 18 учеников в классе — каждый ребёнок получает индивидуальное внимание",
      },
      {
        title: "Триязычная среда",
        description:
          "Английский как основной язык обучения + второй иностранный язык по выбору",
      },
      {
        title: "STEM-фокус",
        description:
          "Экспериментальные лаборатории, практическое изучение физики, химии, биологии",
      },
      {
        title: "Критическое мышление",
        description:
          "Не зазубривание, а развитие аналитических способностей и творческого подхода",
      },
      {
        title: "Благополучие детей",
        description:
          "Эмоциональный интеллект и психологическое здоровье — приоритет школы",
      },
      {
        title: "Подготовка в топ-100 вузов",
        description:
          "Выпускники готовы поступать в ведущие университеты мира",
      },
    ],
  },
  en: {
    eyebrow: "why Scandic International School",
    title: "Education that prepares for the future",
    subtitle:
      "We combine the Scandinavian philosophy of education with international academic standards to create an environment where children thrive",
    topItems: [
      {
        title: "IB PYP Candidate School status",
        description:
          "International Baccalaureate Primary Years Programme — a globally recognised programme",
      },
      {
        title: "Partnership with The LAB22",
        description:
          "An international laboratory from London focused on STEM education and project-based learning",
      },
      {
        title: "Our own GradeApp app",
        description:
          "Schedule, grades, attendance, and communication with teachers — all in one place",
      },
      {
        title: "Scandic Extreme Challenge",
        description:
          "A large-scale sports event that builds teamwork and resilience",
      },
    ],
    bottomItems: [
      {
        title: "Small classes",
        description:
          "Up to 18 students per class — every child receives individual attention",
      },
      {
        title: "Trilingual environment",
        description:
          "English as the primary language of instruction + a second foreign language of choice",
      },
      {
        title: "STEM focus",
        description:
          "Experimental laboratories and hands-on learning in physics, chemistry, and biology",
      },
      {
        title: "Critical thinking",
        description:
          "Not rote learning — we develop analytical skills and a creative approach",
      },
      {
        title: "Children's well-being",
        description:
          "Emotional intelligence and mental health are a top priority for the school",
      },
      {
        title: "Top-100 university prep",
        description:
          "Graduates are ready to apply to the world's leading universities",
      },
    ],
  },
  kk: {
    eyebrow: "неліктен Scandic International School",
    title: "Болашаққа дайындайтын білім",
    subtitle:
      "Біз скандинавиялық білім беру философиясын халықаралық академиялық стандарттармен біріктіріп, балалар өсіп-өнетін орта жасаймыз",
    topItems: [
      {
        title: "IB PYP кандидат-мектебі мәртебесі",
        description:
          "International Baccalaureate Primary Years Programme — әлемге танымал бағдарлама",
      },
      {
        title: "The LAB22 ынтымақтастығы",
        description:
          "Лондондағы STEM білімі мен жобалық қызмет саласындағы халықаралық зертхана",
      },
      {
        title: "Жеке қосымша GradeApp",
        description:
          "Сабақ кестесі, бағалар, қатысу және мұғалімдермен байланыс — бір қосымшада",
      },
      {
        title: "Scandic Extreme Challenge",
        description:
          "Командалық жұмыс пен төзімділікті дамытатын ірі спорттық іс-шара",
      },
    ],
    bottomItems: [
      {
        title: "Шағын сыныптар",
        description:
          "Сыныпта 18 оқушыға дейін — әр бала жеке назар алады",
      },
      {
        title: "Үш тілді орта",
        description:
          "Ағылшын — оқытудың негізгі тілі + таңдау бойынша екінші шетел тілі",
      },
      {
        title: "STEM фокусы",
        description:
          "Тәжірибелік зертханалар, физика, химия және биологияны практикалық оқыту",
      },
      {
        title: "Сыни ойлау",
        description:
          "Жаттау емес — талдау қабілеттері мен шығармашылық тәсілді дамыту",
      },
      {
        title: "Балалардың әл-ауқаты",
        description:
          "Эмоционалдық интеллект пен психикалық денсаулық — мектептің басты басымдығы",
      },
      {
        title: "Топ-100 ЖОО-ға дайындық",
        description:
          "Түлектер әлемнің жетекші университеттеріне түсуге дайын",
      },
    ],
  },
} as const;

export async function EducationCardsV3() {
  const locale = await getLocale();
  const t = translations[locale];

  return (
    <section className="py-16 md:py-24 bg-secondary-50">
      <div className="container">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          subtitle={t.subtitle}
          align="left"
        />

        {/* Top: 4 cards with mint icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12 md:mt-16">
          {t.topItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 md:p-6 border border-secondary-100/70 shadow-sm transition-shadow duration-200 hover:shadow-xl"
            >
              <div className="w-12 h-12 rounded-xl bg-mint-accent/30 text-secondary-700 flex items-center justify-center mb-4">
                {TOP_ICONS[idx]}
              </div>
              <h3 className="font-display font-bold !text-sm md:!text-base mb-2 text-brand-navy-900 leading-snug">
                {item.title}
              </h3>
              <p className="!text-xs md:!text-sm leading-relaxed text-brand-navy-700">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom: 6 cards with orange left border, no icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {t.bottomItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 md:p-6 border border-secondary-100/70 shadow-sm border-l-4 border-l-primary-500 transition-shadow duration-200 hover:shadow-xl"
            >
              <h3 className="font-display font-bold !text-sm md:!text-base mb-2 text-brand-navy-900 leading-snug">
                {item.title}
              </h3>
              <p className="!text-xs md:!text-sm leading-relaxed text-brand-navy-700">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
