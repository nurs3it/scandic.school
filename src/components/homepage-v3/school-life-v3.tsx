import { getLocale } from "@/lib/server-locale";
import { SectionHeading } from "./shared/section-heading";
import { SchoolLifeNewsletter } from "./school-life-v3-newsletter";

const translations = {
  ru: {
    title: "Жизнь школы",
    subtitle: "События, проекты и моменты, которыми мы живём.",
    eventsHeading: "Предстоящие события",
    events: [
      {
        date: "12 мая",
        tag: "Открытый день",
        title: "Знакомство с Scandic",
        description: "Экскурсия по кампусу, встречи с педагогами и презентация программы.",
      },
      {
        date: "20 мая",
        tag: "STEM",
        title: "Фестиваль науки",
        description: "Ученики представят свои проекты в робототехнике, биологии и инженерии.",
      },
      {
        date: "5 июня",
        tag: "Сообщество",
        title: "Семейный пикник",
        description: "Тёплый день для родителей, учеников и педагогов на территории кампуса.",
      },
    ],
    newsletterTitle: "Подпишитесь на наши новости",
    newsletterDesc: "Получайте анонсы событий и истории школы прямо на почту.",
    newsletterPlaceholder: "Ваш e-mail",
    newsletterSubmit: "Подписаться",
  },
  en: {
    title: "School life",
    subtitle: "Events, projects, and moments that define us.",
    eventsHeading: "Upcoming events",
    events: [
      {
        date: "12 May",
        tag: "Open day",
        title: "Meet Scandic",
        description: "Campus tour, meetings with teachers, and a programme overview.",
      },
      {
        date: "20 May",
        tag: "STEM",
        title: "Science Festival",
        description: "Students present projects in robotics, biology, and engineering.",
      },
      {
        date: "5 June",
        tag: "Community",
        title: "Family Picnic",
        description: "A warm day for parents, students, and teachers on campus.",
      },
    ],
    newsletterTitle: "Subscribe to our news",
    newsletterDesc: "Get event announcements and school stories straight to your inbox.",
    newsletterPlaceholder: "Your email",
    newsletterSubmit: "Subscribe",
  },
  kk: {
    title: "Мектеп өмірі",
    subtitle: "Бізді сипаттайтын оқиғалар, жобалар мен сәттер.",
    eventsHeading: "Алдағы оқиғалар",
    events: [
      {
        date: "12 мамыр",
        tag: "Ашық есік",
        title: "Scandic-пен танысу",
        description: "Кампус бойынша экскурсия, мұғалімдермен кездесу және бағдарлама шолуы.",
      },
      {
        date: "20 мамыр",
        tag: "STEM",
        title: "Ғылым фестивалі",
        description: "Оқушылар робототехника, биология және инженерия жобаларын ұсынады.",
      },
      {
        date: "5 маусым",
        tag: "Қауымдастық",
        title: "Отбасылық пикник",
        description: "Кампуста ата-аналар, оқушылар мен мұғалімдерге арналған жылы күн.",
      },
    ],
    newsletterTitle: "Жаңалықтарымызға жазылыңыз",
    newsletterDesc: "Оқиғалар туралы хабарламалар мен мектеп әңгімелерін поштаңыздан алыңыз.",
    newsletterPlaceholder: "Сіздің e-mail",
    newsletterSubmit: "Жазылу",
  },
} as const;

export async function SchoolLifeV3() {
  const locale = await getLocale();
  const t = translations[locale];

  return (
    <section className="py-12 md:py-20 bg-brand-teal-50">
      <div className="container mx-auto px-4">
        <SectionHeading title={t.title} subtitle={t.subtitle} />
        <div className="grid md:grid-cols-[2fr_1fr] gap-8 mt-12">
          <div>
            <h3 className="font-display font-semibold text-xl text-brand-navy-900 mb-4">
              {t.eventsHeading}
            </h3>
            <div className="space-y-4">
              {t.events.map((ev, i) => (
                <div key={i} className="bg-white rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-medium text-brand-teal-700 bg-brand-teal-100 rounded-full px-3 py-1">
                      {ev.date}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-brand-navy-700/70">
                      {ev.tag}
                    </span>
                  </div>
                  <h4 className="font-display font-semibold text-brand-navy-900 mb-1">{ev.title}</h4>
                  <p className="text-sm text-brand-navy-700 leading-relaxed">{ev.description}</p>
                </div>
              ))}
            </div>
          </div>
          <SchoolLifeNewsletter
            title={t.newsletterTitle}
            description={t.newsletterDesc}
            placeholder={t.newsletterPlaceholder}
            submitLabel={t.newsletterSubmit}
          />
        </div>
      </div>
    </section>
  );
}
