import { getLocale } from "@/lib/server-locale";
import { SectionHeading } from "./shared/section-heading";
import { FeatureCard } from "./shared/feature-card";

const translations = {
  ru: {
    title: "Программы поддержки",
    subtitle: "Дополнительные программы для семей и учеников, которые расширяют возможности обучения.",
    cards: [
      { title: "Поддержка работы одарённых детей", description: "Индивидуальные траектории, олимпиадная подготовка и менторство для учеников с высоким потенциалом." },
      { title: "Выходные занятия", description: "Группы по интересам и дополнительные программы по субботам для всех возрастов." },
      { title: "Родительский клуб", description: "Лекции, мастерские и встречи, которые помогают семьям расти вместе со школой." },
    ],
    highlightTitle: "Scandic Extreme Challenge",
    highlightDesc:
      "Многодневные выездные программы на природе: командные испытания, лидерские задачи и проекты, которые формируют характер и устойчивость. Доступно для учеников средней и старшей школы.",
  },
  en: {
    title: "Support programmes",
    subtitle: "Additional programmes for families and students that broaden learning opportunities.",
    cards: [
      { title: "Gifted students programme", description: "Individual learning paths, olympiad preparation, and mentorship for high-potential students." },
      { title: "Weekend classes", description: "Interest groups and Saturday programmes for all ages." },
      { title: "Parents' club", description: "Lectures, workshops, and meetings that help families grow with the school." },
    ],
    highlightTitle: "Scandic Extreme Challenge",
    highlightDesc:
      "Multi-day outdoor programmes: team challenges, leadership tasks, and projects that build character and resilience. Available for middle and high school students.",
  },
  kk: {
    title: "Қолдау бағдарламалары",
    subtitle: "Оқу мүмкіндіктерін кеңейтетін отбасылар мен оқушыларға арналған қосымша бағдарламалар.",
    cards: [
      { title: "Дарынды балаларды қолдау", description: "Жоғары әлеуеті бар оқушыларға арналған жеке траекториялар, олимпиадаға дайындық және менторлық." },
      { title: "Демалыс күндеріндегі сабақтар", description: "Барлық жасқа арналған қызығушылық топтары мен сенбілік қосымша бағдарламалар." },
      { title: "Ата-аналар клубы", description: "Отбасыларға мектеппен бірге өсуге көмектесетін дәрістер, шеберханалар мен кездесулер." },
    ],
    highlightTitle: "Scandic Extreme Challenge",
    highlightDesc:
      "Көп күндік далалық бағдарламалар: командалық сын-қатерлер, көшбасшылық тапсырмалар мен мінез бен төзімділікті қалыптастыратын жобалар. Орта және жоғары мектеп оқушыларына қолжетімді.",
  },
} as const;

export async function SupportProgramsV3() {
  const locale = await getLocale();
  const t = translations[locale];

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading title={t.title} subtitle={t.subtitle} />
        <div className="grid md:grid-cols-3 gap-4 mt-12">
          {t.cards.map((c, idx) => (
            <FeatureCard key={idx} variant="teal-50" title={c.title} description={c.description} />
          ))}
        </div>
        <div className="mt-6">
          <FeatureCard variant="teal-700" title={t.highlightTitle} description={t.highlightDesc} />
        </div>
      </div>
    </section>
  );
}
