import Image from "next/image";
import { Heart, Leaf, Wrench, Clock, Smile, Users } from "lucide-react";
import { getLocale } from "@/lib/server-locale";
import { SectionHeading } from "./shared/section-heading";

const translations = {
  ru: {
    eyebrow: "академическое лидерство",
    title: "Философия образования, где дети процветают",
    paragraph:
      "Мы верим, что подлинный рост возможен там, где ребёнка ценят за его уникальность. Наша философия объединяет уважение к личности, заботу о благополучии и высокие академические стандарты.",
    badge: "№1",
    principles: [
      { title: "Доверие к ученикам", description: "Создаём пространство, где детям дают свободу принимать решения." },
      { title: "Обучение на природе", description: "Регулярные занятия и проекты вне стен класса." },
      { title: "Сотрудничество с инженерами", description: "Реальные задачи от практиков формируют практические навыки." },
      { title: "Без домашних заданий до 10 лет", description: "Учим эффективно работать в школе, оставляя дом для семьи." },
      { title: "Радость в обучении", description: "Эмоция и интерес — основа долгосрочной мотивации." },
      { title: "Учитель — дитя — родитель", description: "Партнёрство трёх сторон поддерживает развитие ребёнка." },
    ],
  },
  en: {
    eyebrow: "academic leadership",
    title: "An educational philosophy where children thrive",
    paragraph:
      "We believe that genuine growth happens where a child is valued for who they are. Our philosophy combines respect for personality, care for well-being, and high academic standards.",
    badge: "№1",
    principles: [
      { title: "Trust in students", description: "We create a space where children are given the freedom to make decisions." },
      { title: "Learning in nature", description: "Regular lessons and projects outside the classroom walls." },
      { title: "Collaboration with engineers", description: "Real-world challenges from practitioners build practical skills." },
      { title: "No homework before age 10", description: "We teach effective work at school and leave home for family." },
      { title: "Joy in learning", description: "Emotion and interest are the foundation of long-term motivation." },
      { title: "Teacher — child — parent", description: "A partnership of three parties supports the child's development." },
    ],
  },
  kk: {
    eyebrow: "академиялық көшбасшылық",
    title: "Балалар гүлденетін білім беру философиясы",
    paragraph:
      "Біз шынайы өсу баланы өзіндік ерекшелігі үшін бағалайтын жерде ғана мүмкін деп сенеміз. Біздің философиямыз тұлғаны құрметтеу, әл-ауқатқа қамқорлық пен жоғары академиялық стандарттарды біріктіреді.",
    badge: "№1",
    principles: [
      { title: "Оқушыларға сенім", description: "Балаларға шешім қабылдау еркіндігі берілген кеңістік құрамыз." },
      { title: "Табиғатта оқыту", description: "Сынып қабырғасынан тыс үнемі сабақтар мен жобалар." },
      { title: "Инженерлермен серіктестік", description: "Тәжірибешілерден келген нақты есептер практикалық дағдыларды қалыптастырады." },
      { title: "10 жасқа дейін үй тапсырмасы жоқ", description: "Мектепте тиімді жұмыс істеуге үйретеміз, үйді отбасына қалдырамыз." },
      { title: "Оқудан рахат", description: "Эмоция мен қызығушылық — ұзақ мерзімді ынтаның негізі." },
      { title: "Мұғалім — бала — ата-ана", description: "Үш жақтың серіктестігі баланың дамуын қолдайды." },
    ],
  },
} as const;

const PRINCIPLE_ICONS = [
  <Heart key="trust" className="w-4 h-4" />,
  <Leaf key="nature" className="w-4 h-4" />,
  <Wrench key="engineers" className="w-4 h-4" />,
  <Clock key="homework" className="w-4 h-4" />,
  <Smile key="joy" className="w-4 h-4" />,
  <Users key="triangle" className="w-4 h-4" />,
];

export async function PhilosophyV3() {
  const locale = await getLocale();
  const t = translations[locale];

  return (
    <section className="py-12 md:py-20 bg-brand-teal-50">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
        <div>
          <SectionHeading eyebrow={t.eyebrow} title={t.title} align="left" />
          <p className="mt-6 text-brand-navy-700 leading-relaxed">{t.paragraph}</p>
          <div className="inline-block bg-brand-orange-500 text-white rounded-full px-5 py-2 text-2xl font-display font-bold mt-6">
            {t.badge}
          </div>
        </div>
        <div>
          <Image
            src="https://picsum.photos/seed/student-with-book/800/520"
            alt=""
            width={800}
            height={520}
            className="rounded-2xl object-cover w-full h-64 md:h-80"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {t.principles.map((p, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-teal-100 rounded-lg flex items-center justify-center text-brand-teal-700">
                  {PRINCIPLE_ICONS[idx]}
                </div>
                <div>
                  <div className="font-display font-semibold text-sm text-brand-navy-900">{p.title}</div>
                  <div className="text-xs text-brand-navy-700 mt-1 leading-relaxed">{p.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
