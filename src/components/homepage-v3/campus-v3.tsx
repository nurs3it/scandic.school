import Image from "next/image";
import {
  FlaskConical,
  Building2,
  BookOpen,
  Utensils,
  Palette,
  Music,
  Coffee,
  Dumbbell,
} from "lucide-react";
import { getLocale } from "@/lib/server-locale";

const translations = {
  ru: {
    eyebrow: "Кампус и инфраструктура",
    title: "Современная образовательная среда в Уральске",
    subtitle:
      "Кампус площадью около 2 200 м² с лабораториями, спортивным блоком, концертным пространством и творческими студиями. Часть объектов проектируется и поэтапно вводится в эксплуатацию.",
    labBadge: "Экспериментальные лаборатории",
    labSubBadge: "Живое, практическое познание науки",
    features: [
      { title: "Лаборатории STEM", description: "Современное оборудование для экспериментов" },
      { title: "Аудитории высшего класса", description: "Светлые и технологичные пространства" },
      { title: "Библиотека", description: "Многоязычная коллекция книг" },
      { title: "Концептуальный ресторан", description: "Здоровое питание для учеников" },
      { title: "Творческие студии", description: "Искусство и дизайн" },
      { title: "Музыкальные классы (планируется)", description: "Инструменты и репетиционные залы" },
      { title: "Родительский хаб", description: "Пространство для встреч и работы родителей" },
      { title: "Спортивный блок", description: "Залы для шахмат, тхэквондо и футбола" },
    ],
    blocksHeading: "Блоки школы",
    blocks: [
      {
        title: "Начальная школа",
        items: ["Программа IB PYP", "Триязычная среда", "Игровые пространства", "Безопасная территория"],
      },
      {
        title: "Средняя и старшая школа",
        items: ["Программа IB MYP & DP", "Научные лаборатории", "Гостевые лекции", "Подготовка к университету"],
      },
      {
        title: "Внеучебное развитие",
        items: [
          "Контроль ДЗ, проекты и защита",
          "Выезды и работа с экспертами",
          "Кружки и секции",
          "Лаборатория физики и экспериментов",
        ],
      },
    ],
    ctaTitle: "Посетите нашу школу",
    ctaSubtitle:
      "Запишитесь на персональную экскурсию и познакомьтесь с нашей командой и образовательной средой",
    ctaButton: "Записаться на экскурсию",
    ctaButton2: "Скачать презентацию",
  },
  en: {
    eyebrow: "Campus & infrastructure",
    title: "A modern educational environment in Uralsk",
    subtitle:
      "A campus of about 2,200 m² with laboratories, sports facilities, a concert space, and creative studios. Some facilities are still in design and are being phased in.",
    labBadge: "Experimental laboratories",
    labSubBadge: "Lively, hands-on exploration of science",
    features: [
      { title: "STEM laboratories", description: "Modern equipment for experiments" },
      { title: "Premium classrooms", description: "Bright, tech-enabled spaces" },
      { title: "Library", description: "A multilingual book collection" },
      { title: "Concept restaurant", description: "Healthy meals for students" },
      { title: "Creative studios", description: "Art and design" },
      { title: "Music rooms (planned)", description: "Instruments and rehearsal halls" },
      { title: "Parent hub", description: "A space for parents to meet and work" },
      { title: "Sports block", description: "Halls for chess, taekwondo, and football" },
    ],
    blocksHeading: "School blocks",
    blocks: [
      {
        title: "Primary school",
        items: ["IB PYP programme", "Trilingual environment", "Play spaces", "Safe territory"],
      },
      {
        title: "Middle and high school",
        items: ["IB MYP & DP programme", "Science laboratories", "Guest lectures", "University preparation"],
      },
      {
        title: "Beyond the curriculum",
        items: [
          "Homework support, projects and defence",
          "Field trips and work with experts",
          "Clubs and sections",
          "Physics and experimentation lab",
        ],
      },
    ],
    ctaTitle: "Visit our school",
    ctaSubtitle:
      "Book a personal tour and meet our team and educational environment",
    ctaButton: "Book a tour",
    ctaButton2: "Download brochure",
  },
  kk: {
    eyebrow: "Кампус және инфрақұрылым",
    title: "Оралдағы заманауи білім беру ортасы",
    subtitle:
      "Зертханалары, спорт блогы, концерт кеңістігі мен шығармашылық студиялары бар шамамен 2 200 м² кампус. Кейбір нысандар әлі жобалану сатысында және кезең-кезеңмен қолданысқа беріледі.",
    labBadge: "Тәжірибелік зертханалар",
    labSubBadge: "Ғылымды жанды әрі практикалық тану",
    features: [
      { title: "STEM зертханалары", description: "Тәжірибелерге арналған заманауи жабдық" },
      { title: "Жоғары деңгейлі аудиториялар", description: "Жарық әрі технологиялық кеңістіктер" },
      { title: "Кітапхана", description: "Көптілді кітап жинағы" },
      { title: "Концептуалды мейрамхана", description: "Оқушыларға арналған дұрыс тамақтану" },
      { title: "Шығармашылық студиялар", description: "Өнер мен дизайн" },
      { title: "Музыка сыныптары (жоспарлануда)", description: "Аспаптар мен жаттығу залдары" },
      { title: "Ата-аналар хабы", description: "Ата-аналарға арналған кездесу мен жұмыс кеңістігі" },
      { title: "Спорт блогы", description: "Шахмат, тхэквондо және футбол залдары" },
    ],
    blocksHeading: "Мектеп блоктары",
    blocks: [
      {
        title: "Бастауыш мектеп",
        items: ["IB PYP бағдарламасы", "Үштілді орта", "Ойын кеңістіктері", "Қауіпсіз аумақ"],
      },
      {
        title: "Орта және жоғары мектеп",
        items: ["IB MYP & DP бағдарламасы", "Ғылыми зертханалар", "Қонақ дәрістері", "Университетке дайындық"],
      },
      {
        title: "Сабақтан тыс даму",
        items: [
          "Үй тапсырмасын бақылау, жобалар мен қорғау",
          "Сапарлар мен сарапшылармен жұмыс",
          "Үйірмелер мен секциялар",
          "Физика және эксперимент зертханасы",
        ],
      },
    ],
    ctaTitle: "Мектебімізге келіңіз",
    ctaSubtitle:
      "Жеке экскурсияға жазылыңыз және біздің командамызбен әрі білім беру ортасымен танысыңыз",
    ctaButton: "Экскурсияға жазылу",
    ctaButton2: "Презентацияны жүктеу",
  },
} as const;

const FEATURE_ICONS = [
  <FlaskConical key="lab" className="w-6 h-6" strokeWidth={1.75} />,
  <Building2 key="audit" className="w-6 h-6" strokeWidth={1.75} />,
  <BookOpen key="library" className="w-6 h-6" strokeWidth={1.75} />,
  <Utensils key="restaurant" className="w-6 h-6" strokeWidth={1.75} />,
  <Palette key="art" className="w-6 h-6" strokeWidth={1.75} />,
  <Music key="music" className="w-6 h-6" strokeWidth={1.75} />,
  <Coffee key="parent-hub" className="w-6 h-6" strokeWidth={1.75} />,
  <Dumbbell key="sport" className="w-6 h-6" strokeWidth={1.75} />,
];

export async function CampusV3() {
  const locale = await getLocale();
  const t = translations[locale];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading — left aligned */}
        <div className="max-w-3xl mb-10 md:mb-14">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-secondary-600 mb-4">
            {t.eyebrow}
          </p>
          <h2 className="font-display font-bold !text-3xl md:!text-4xl lg:!text-5xl text-brand-navy-900 !leading-[1.3] mb-5">
            {t.title}
          </h2>
          <p className="!text-base md:!text-lg text-brand-navy-700 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Image grid: 1 big left, 2 stacked right */}
        <div className="grid lg:grid-cols-3 gap-4 md:gap-5">
          <div className="relative lg:col-span-2 aspect-[4/3] lg:aspect-auto lg:min-h-[520px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=900&fit=crop"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 md:p-8">
              <div className="font-display font-bold !text-xl md:!text-2xl lg:!text-3xl text-white !leading-tight mb-1">
                {t.labBadge}
              </div>
              <div className="!text-sm md:!text-base text-white/90">
                {t.labSubBadge}
              </div>
            </div>
          </div>
          <div className="grid grid-rows-2 gap-4 md:gap-5">
            <div className="relative aspect-[16/10] lg:aspect-auto rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&h=600&fit=crop"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[16/10] lg:aspect-auto rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&h=600&fit=crop"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* 7 feature cards in horizontal row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4 mt-8 md:mt-10">
          {t.features.map((f, idx) => (
            <div
              key={idx}
              className="bg-mint-accent/20 rounded-2xl p-4 md:p-5 text-center transition-shadow duration-200 hover:shadow-lg"
            >
              <div className="w-9 h-9 md:w-10 md:h-10 mx-auto rounded-xl bg-white/60 text-secondary-600 flex items-center justify-center mb-2.5">
                {FEATURE_ICONS[idx]}
              </div>
              <div className="font-display font-bold !text-xs md:!text-sm text-brand-navy-900 mb-1 leading-snug">
                {f.title}
              </div>
              <div className="!text-[10px] md:!text-[11px] text-brand-navy-700 leading-snug">
                {f.description}
              </div>
            </div>
          ))}
        </div>

        {/* School blocks */}
        <h3 className="font-display font-bold !text-2xl md:!text-3xl text-brand-navy-900 mt-16 md:mt-20 mb-8">
          {t.blocksHeading}
        </h3>
        <div className="grid md:grid-cols-3 gap-5">
          {t.blocks.map((b, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-b from-secondary-50/60 to-white rounded-2xl p-7 md:p-8 border border-secondary-100 shadow-sm transition-shadow duration-200 hover:shadow-xl"
            >
              <h4 className="font-display font-bold !text-xl md:!text-2xl text-brand-navy-900 leading-snug pb-5 border-b border-secondary-200">
                {b.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {b.items.map((it) => (
                  <li key={it} className="flex items-start gap-3">
                    <span className="mt-2 flex-shrink-0 w-2 h-2 rounded-full bg-primary-500"></span>
                    <span className="!text-sm md:!text-base text-brand-navy-800 leading-snug">
                      {it}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA panel */}
        <div className="mt-14 md:mt-16 bg-secondary-700 text-white rounded-2xl px-6 py-14 md:py-20 text-center">
          <h3 className="font-display font-bold !text-3xl md:!text-4xl lg:!text-5xl !leading-[1.2] mb-5">
            {t.ctaTitle}
          </h3>
          <p className="!text-base md:!text-lg text-white/90 max-w-2xl mx-auto leading-relaxed mb-8">
            {t.ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <a
              href="/application"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white hover:bg-white/95 text-secondary-700 font-semibold transition-colors min-w-[220px]"
            >
              {t.ctaButton}
            </a>
            <a
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-transparent hover:bg-white/10 text-white font-semibold border border-white/70 transition-colors min-w-[220px]"
            >
              {t.ctaButton2}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
