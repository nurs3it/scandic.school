import Image from "next/image";
import { Cpu, Dumbbell, Globe, Palette } from "lucide-react";
import { getLocale } from "@/lib/server-locale";
import { SectionHeading } from "./shared/section-heading";

const translations = {
  ru: {
    eyebrow: "внеучебные программы",
    title: "Развитие за пределами учебных программ",
    paragraph:
      "Более 50 кружков и секций помогают каждому ребёнку найти своё увлечение, проявить таланты и развить дисциплину через любимые занятия.",
    badge: "50+",
    categories: [
      { title: "STEM и Технологии", description: "Робототехника, программирование, инженерные клубы." },
      { title: "Спорт и Здоровье", description: "Командные виды, плавание, единоборства, гимнастика." },
      { title: "Языки и Культура", description: "Дебатные клубы, литературные кружки, обмен культурами." },
      { title: "Творчество и Искусство", description: "Музыка, театр, живопись, дизайн и кино." },
    ],
  },
  en: {
    eyebrow: "extracurricular programmes",
    title: "Growth beyond the curriculum",
    paragraph:
      "More than 50 clubs and sections help every child discover their passion, reveal talents, and build discipline through what they love.",
    badge: "50+",
    categories: [
      { title: "STEM & Technology", description: "Robotics, programming, engineering clubs." },
      { title: "Sport & Health", description: "Team sports, swimming, martial arts, gymnastics." },
      { title: "Languages & Culture", description: "Debate clubs, literary circles, cultural exchanges." },
      { title: "Creativity & Arts", description: "Music, theatre, painting, design, and film." },
    ],
  },
  kk: {
    eyebrow: "сабақтан тыс бағдарламалар",
    title: "Оқу бағдарламасынан тыс даму",
    paragraph:
      "50-ден астам үйірмелер мен секциялар әрбір балаға өз қызығушылығын табуға, талантын ашуға және сүйікті ісі арқылы тәртіп қалыптастыруға көмектеседі.",
    badge: "50+",
    categories: [
      { title: "STEM және Технология", description: "Робототехника, бағдарламалау, инженерлік клубтар." },
      { title: "Спорт және Денсаулық", description: "Командалық спорт түрлері, жүзу, жекпе-жек, гимнастика." },
      { title: "Тілдер және Мәдениет", description: "Дебат клубтары, әдеби үйірмелер, мәдени алмасу." },
      { title: "Шығармашылық және Өнер", description: "Музыка, театр, кескіндеме, дизайн және кино." },
    ],
  },
} as const;

const CATEGORY_ICONS = [
  <Cpu key="stem" className="w-5 h-5" />,
  <Dumbbell key="sport" className="w-5 h-5" />,
  <Globe key="lang" className="w-5 h-5" />,
  <Palette key="art" className="w-5 h-5" />,
];

export async function ExtracurricularsV3() {
  const locale = await getLocale();
  const t = translations[locale];

  return (
    <section className="py-12 md:py-20 bg-brand-teal-50">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
        <div>
          <SectionHeading eyebrow={t.eyebrow} title={t.title} align="left" />
          <p className="mt-6 text-brand-navy-700 leading-relaxed">{t.paragraph}</p>
          <div className="inline-flex items-center bg-brand-orange-500 text-white rounded-full px-5 py-2 text-xl font-display font-bold mt-6">
            {t.badge}
          </div>
        </div>
        <div>
          <Image
            src="https://picsum.photos/seed/extracurricular-music/800/500"
            alt=""
            width={800}
            height={500}
            className="rounded-2xl object-cover w-full h-56 md:h-72"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {t.categories.map((c, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 flex gap-3">
                <div className="flex-shrink-0 w-9 h-9 bg-brand-teal-100 rounded-lg flex items-center justify-center text-brand-teal-700">
                  {CATEGORY_ICONS[idx]}
                </div>
                <div>
                  <div className="font-display font-semibold text-sm text-brand-navy-900">{c.title}</div>
                  <div className="text-xs text-brand-navy-700 mt-1 leading-relaxed">{c.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
