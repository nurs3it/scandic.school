import Image from "next/image";
import { Cpu, Dumbbell, Globe, Palette } from "lucide-react";
import { getLocale } from "@/lib/server-locale";

const translations = {
  ru: {
    eyebrow: "Жизнь школы",
    title: "Развитие за пределами учебных программ",
    paragraph1:
      "Внеучебная жизнь в Scandic — это возможность для каждого ученика раскрыть свои таланты, найти своё призвание и обрести друзей на всю жизнь.",
    paragraph2:
      "От кружков для младших школьников до студенческих инициатив в старших классах — каждый находит своё место, чтобы принадлежать, вносить вклад и сиять.",
    badge: "50+",
    badgeText: "кружков и секций для всестороннего развития",
    categories: [
      {
        title: "STEM и Технологии",
        description:
          "Робототехника, программирование, инженерные клубы и научные эксперименты для будущих изобретателей",
      },
      {
        title: "Спорт и Здоровье",
        description:
          "Командные виды, плавание, единоборства и гимнастика — физическое развитие и командный дух",
      },
      {
        title: "Языки и Культура",
        description:
          "Дебатные клубы, литературные кружки и культурный обмен — навыки коммуникации и широкий кругозор",
      },
      {
        title: "Творчество и Искусство",
        description:
          "Музыка, театр, живопись, дизайн и кино — пространство для самовыражения и творческой свободы",
      },
    ],
  },
  en: {
    eyebrow: "School life",
    title: "Growth beyond the curriculum",
    paragraph1:
      "School life at Scandic is an opportunity for every student to unlock their talents, find their calling, and make friends for life.",
    paragraph2:
      "From clubs for younger students to student-led initiatives in high school — everyone finds their place to belong, contribute, and shine.",
    badge: "50+",
    badgeText: "clubs and sections for all-round growth",
    categories: [
      {
        title: "STEM & Technology",
        description:
          "Robotics, programming, engineering clubs, and science experiments for future inventors",
      },
      {
        title: "Sport & Health",
        description:
          "Team sports, swimming, martial arts, and gymnastics — physical development and team spirit",
      },
      {
        title: "Languages & Culture",
        description:
          "Debate clubs, literary circles, and cultural exchange — communication skills and a broad worldview",
      },
      {
        title: "Creativity & Arts",
        description:
          "Music, theatre, painting, design, and film — a space for self-expression and creative freedom",
      },
    ],
  },
  kk: {
    eyebrow: "Мектеп өмірі",
    title: "Оқу бағдарламасынан тыс даму",
    paragraph1:
      "Scandic-тегі мектеп өмірі — әрбір оқушыға өз талантын ашуға, өз шақыруын табуға және өмірлік достар табуға мүмкіндік.",
    paragraph2:
      "Кіші сыныптарға арналған үйірмелерден бастап жоғары сынып оқушыларының бастамаларына дейін — әркім тиесілі болу, үлес қосу және жарқырау үшін өз орнын табады.",
    badge: "50+",
    badgeText: "жан-жақты даму үшін үйірмелер мен секциялар",
    categories: [
      {
        title: "STEM және Технология",
        description:
          "Робототехника, бағдарламалау, инженерлік клубтар және болашақ ойлап табушылар үшін ғылыми тәжірибелер",
      },
      {
        title: "Спорт және Денсаулық",
        description:
          "Командалық спорт түрлері, жүзу, жекпе-жек және гимнастика — дене дамуы мен команда рухы",
      },
      {
        title: "Тілдер және Мәдениет",
        description:
          "Дебат клубтары, әдеби үйірмелер және мәдени алмасу — қарым-қатынас дағдылары мен кең дүниетаным",
      },
      {
        title: "Шығармашылық және Өнер",
        description:
          "Музыка, театр, кескіндеме, дизайн және кино — өзін-өзі көрсету мен шығармашылық еркіндік кеңістігі",
      },
    ],
  },
} as const;

const CATEGORY_ICONS = [
  <Cpu key="stem" className="w-5 h-5" strokeWidth={1.75} />,
  <Dumbbell key="sport" className="w-5 h-5" strokeWidth={1.75} />,
  <Globe key="lang" className="w-5 h-5" strokeWidth={1.75} />,
  <Palette key="art" className="w-5 h-5" strokeWidth={1.75} />,
];

export async function ExtracurricularsV3() {
  const locale = await getLocale();
  const t = translations[locale];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-secondary-50/60 to-white">
      <div className="container mx-auto px-4">
        {/* Top: 2-col with text left, square photo + badge right */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div>
            <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-secondary-600 mb-4">
              {t.eyebrow}
            </p>
            <h2 className="font-display font-bold !text-3xl md:!text-4xl lg:!text-5xl text-brand-navy-900 !leading-[1.3] mb-6">
              {t.title}
            </h2>
            <p className="!text-base md:!text-lg text-brand-navy-700 leading-relaxed mb-5">
              {t.paragraph1}
            </p>
            <p className="!text-base md:!text-lg text-brand-navy-700 leading-relaxed">
              {t.paragraph2}
            </p>
          </div>

          <div className="relative">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-secondary-100">
              <Image
                src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=900&h=900&fit=crop"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
            </div>
            {/* 50+ overlapping card — bottom left */}
            <div className="absolute bottom-[-24px] right-[-16px] md:bottom-[-32px] md:right-[-32px] max-w-[280px] bg-primary-500 rounded-2xl shadow-xl p-5 md:p-6">
              <div className="font-display font-bold text-3xl md:text-4xl text-white mb-2">
                {t.badge}
              </div>
              <div className="!text-sm text-white/90 leading-snug">
                {t.badgeText}
              </div>
            </div>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-20 md:mt-24">
          {t.categories.map((c, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 md:p-7 border border-secondary-100 shadow-sm transition-shadow duration-200 hover:shadow-xl"
            >
              <div className="w-12 h-12 rounded-xl bg-mint-accent/30 text-secondary-700 flex items-center justify-center mb-5">
                {CATEGORY_ICONS[idx]}
              </div>
              <h3 className="font-display font-bold !text-base md:!text-lg text-brand-navy-900 mb-2 leading-snug">
                {c.title}
              </h3>
              <p className="!text-xs md:!text-sm text-brand-navy-700 leading-relaxed">
                {c.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
