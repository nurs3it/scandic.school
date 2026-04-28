import Image from "next/image";
import { Beaker, Dumbbell, Music, MonitorSmartphone } from "lucide-react";
import { getLocale } from "@/lib/server-locale";
import { SectionHeading } from "./shared/section-heading";
import { FeatureCard } from "./shared/feature-card";

const translations = {
  ru: {
    title: "Современная образовательная среда в Уральске",
    subtitle:
      "Кампус площадью более 5 000 м² с лабораториями, спортивными залами, концертным пространством и IT-классами.",
    labBadge: "Экспериментальная лаборатория",
    features: [
      { title: "Лаборатории", description: "Полностью оборудованные кабинеты химии, физики и биологии." },
      { title: "Спортзалы", description: "Универсальные залы для командных игр и индивидуальных тренировок." },
      { title: "Концертный зал", description: "Сцена и акустика для выступлений, постановок и концертов." },
      { title: "IT-классы", description: "Современные ПК, 3D-принтеры и оборудование для робототехники." },
    ],
    blocksHeading: "Блоки школы",
    blocks: [
      { title: "Начальная школа", description: "Уютные классы, игровые зоны и пространства для проектов." },
      { title: "Средняя и старшая школа", description: "Специализированные кабинеты и зоны самостоятельной работы." },
      { title: "Выпускной этап", description: "Подготовка к поступлению и индивидуальные консультации." },
    ],
    ctaTitle: "Посетите наш кампус",
    ctaButton: "Записаться на экскурсию",
  },
  en: {
    title: "A modern educational environment in Uralsk",
    subtitle:
      "A campus of over 5,000 m² with laboratories, sports halls, a concert space, and IT classrooms.",
    labBadge: "Experimental laboratory",
    features: [
      { title: "Laboratories", description: "Fully equipped chemistry, physics, and biology rooms." },
      { title: "Sports halls", description: "Multi-purpose halls for team games and individual training." },
      { title: "Concert hall", description: "Stage and acoustics for performances, productions, and concerts." },
      { title: "IT classrooms", description: "Modern PCs, 3D printers, and robotics equipment." },
    ],
    blocksHeading: "School blocks",
    blocks: [
      { title: "Primary school", description: "Cosy classrooms, play zones, and project spaces." },
      { title: "Middle and high school", description: "Specialised rooms and areas for independent work." },
      { title: "Graduation stage", description: "University admissions preparation and individual consultations." },
    ],
    ctaTitle: "Visit our campus",
    ctaButton: "Book a tour",
  },
  kk: {
    title: "Оралдағы заманауи білім беру ортасы",
    subtitle:
      "Зертханалары, спорт залдары, концерт кеңістігі мен IT-сыныптары бар 5 000 м²-ден астам кампус.",
    labBadge: "Тәжірибелік зертхана",
    features: [
      { title: "Зертханалар", description: "Толық жабдықталған химия, физика және биология кабинеттері." },
      { title: "Спорт залдары", description: "Командалық ойындар мен жеке жаттығуларға арналған әмбебап залдар." },
      { title: "Концерт залы", description: "Қойылымдар, спектакльдер мен концерттерге арналған сахна мен акустика." },
      { title: "IT-сыныптар", description: "Заманауи компьютерлер, 3D-принтерлер мен робототехника жабдықтары." },
    ],
    blocksHeading: "Мектеп блоктары",
    blocks: [
      { title: "Бастауыш мектеп", description: "Жайлы сыныптар, ойын аймақтары және жоба кеңістіктері." },
      { title: "Орта және жоғары мектеп", description: "Мамандандырылған кабинеттер мен өзіндік жұмыс аймақтары." },
      { title: "Бітіру кезеңі", description: "Түсуге дайындық пен жеке консультациялар." },
    ],
    ctaTitle: "Кампусымызға келіңіз",
    ctaButton: "Экскурсияға жазылу",
  },
} as const;

const FEATURE_ICONS = [
  <Beaker key="lab" className="w-5 h-5" />,
  <Dumbbell key="sport" className="w-5 h-5" />,
  <Music key="concert" className="w-5 h-5" />,
  <MonitorSmartphone key="it" className="w-5 h-5" />,
];

export async function CampusV3() {
  const locale = await getLocale();
  const t = translations[locale];

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading title={t.title} subtitle={t.subtitle} />
        <div className="grid md:grid-cols-2 gap-4 mt-12">
          <div className="relative">
            <Image
              src="https://picsum.photos/seed/campus-lab/800/500"
              alt=""
              width={800}
              height={500}
              className="rounded-2xl object-cover w-full h-64 md:h-80"
            />
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-brand-navy-900">
              {t.labBadge}
            </div>
          </div>
          <Image
            src="https://picsum.photos/seed/classroom-1/800/500"
            alt=""
            width={800}
            height={500}
            className="rounded-2xl object-cover w-full h-64 md:h-80"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {t.features.map((f, idx) => (
            <div key={idx} className="bg-brand-teal-50 rounded-2xl p-4">
              <div className="w-9 h-9 rounded-lg bg-brand-teal-100 text-brand-teal-700 flex items-center justify-center mb-3">
                {FEATURE_ICONS[idx]}
              </div>
              <div className="font-display font-semibold text-brand-navy-900 text-sm mb-1">{f.title}</div>
              <div className="text-xs text-brand-navy-700 leading-relaxed">{f.description}</div>
            </div>
          ))}
        </div>
        <h3 className="font-display font-semibold text-xl text-brand-navy-900 mt-12 mb-4">
          {t.blocksHeading}
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {t.blocks.map((b, idx) => (
            <FeatureCard key={idx} variant="teal-50" title={b.title} description={b.description} />
          ))}
        </div>
        <div className="mt-12 bg-brand-teal-700 text-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display font-semibold text-xl">{t.ctaTitle}</div>
          <a
            href="/application"
            className="inline-flex items-center px-5 py-2 rounded-full bg-brand-orange-500 hover:bg-brand-orange-600 text-white font-medium transition-colors"
          >
            {t.ctaButton}
          </a>
        </div>
      </div>
    </section>
  );
}
