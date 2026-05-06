import Image from "next/image";
import { Heart, Trees, Users, Clock, Scale, Sparkles, UsersRound } from "lucide-react";
import { getLocale } from "@/lib/server-locale";

const translations = {
  ru: {
    eyebrow: "Скандинавский подход",
    title: "Философия образования, где дети процветают",
    paragraph1:
      "Скандинавские страны стабильно занимают лидирующие позиции по уровню счастья и качеству образования. Мы привносим эту проверенную философию в международное образование.",
    paragraph2:
      "Основатель школы, живя в Дании, убедился в эффективности скандинавского подхода и решил создать школу такого же качества в родном Уральске.",
    paragraph3:
      "Наша формула — академическая строгость в сочетании с творческой свободой. Обучение должно зажигать любопытство и быть осмысленным, а не сводиться к зубрёжке.",
    badge: "№1",
    badgeText: "Скандинавия в рейтинге образования и счастья",
    principles: [
      {
        title: "Доверие и автономия",
        description:
          "Ученикам доверяют принимать решения, брать на себя ответственность и учиться на своих ошибках в поддерживающей среде",
      },
      {
        title: "Обучение на природе",
        description:
          "Регулярные занятия на свежем воздухе укрепляют связь с природой и физическое здоровье",
      },
      {
        title: "Сотрудничество, а не конкуренция",
        description:
          "Ученики учатся вместе, поддерживают друг друга и празднуют коллективный успех",
      },
      {
        title: "Школа полного дня",
        description:
          "Учебный день, выполнение домашних заданий и кружки — всё в одном пространстве, под присмотром педагогов",
      },
      {
        title: "Равенство и инклюзия",
        description:
          "Каждый ребёнок имеет равную ценность и потенциал. Мы адаптируемся под индивидуальные потребности",
      },
      {
        title: "Радость в обучении",
        description:
          "Образование должно зажигать любопытство и страсть, а не гасить их. Мы делаем обучение осмысленным",
      },
    ],
    triangle: {
      title: "Учителя — дети — родители",
      description:
        "Мы строим доверительные отношения между учителями, детьми и родителями, слышим мнение каждого и укрепляем связь между школой и семьёй, понимая, что воспитание ребёнка — это трёхсторонний процесс.",
    },
  },
  en: {
    eyebrow: "Scandinavian approach",
    title: "An educational philosophy where children thrive",
    paragraph1:
      "Scandinavian countries consistently top global rankings for happiness and quality of education. We bring this proven philosophy into international education.",
    paragraph2:
      "Living in Denmark, the school's founder was convinced of the effectiveness of the Scandinavian approach and decided to create a school of the same quality in his home city of Uralsk.",
    paragraph3:
      "Our formula combines academic rigour with creative freedom. Learning should ignite curiosity and be meaningful — not reduce to rote memorisation.",
    badge: "#1",
    badgeText: "Scandinavia in education and happiness rankings",
    principles: [
      {
        title: "Trust and autonomy",
        description:
          "Students are trusted to make decisions, take responsibility, and learn from their mistakes in a supportive environment",
      },
      {
        title: "Outdoor learning",
        description:
          "Regular outdoor lessons strengthen the connection with nature and physical health",
      },
      {
        title: "Collaboration over competition",
        description:
          "Students learn together, support each other, and celebrate collective success",
      },
      {
        title: "Full-day school",
        description:
          "Lessons, homework time and after-school activities all happen on campus, supported by our teachers",
      },
      {
        title: "Equality and inclusion",
        description:
          "Every child has equal value and potential. We adapt to individual needs",
      },
      {
        title: "Joy in learning",
        description:
          "Education should ignite curiosity and passion, not extinguish them. We make learning meaningful",
      },
    ],
    triangle: {
      title: "Teachers — children — parents",
      description:
        "We build trusting relationships between teachers, children, and parents, listen to every voice, and strengthen the bond between school and family — knowing that raising a child is a three-way process.",
    },
  },
  kk: {
    eyebrow: "Скандинавиялық тәсіл",
    title: "Балалар гүлденетін білім беру философиясы",
    paragraph1:
      "Скандинавия елдері бақыт деңгейі мен білім сапасы бойынша әлемдік рейтингтерде үнемі жетекші орындарды иеленеді. Біз осы дәлелденген философияны халықаралық білім беруге енгіземіз.",
    paragraph2:
      "Мектеп құрылтайшысы Данияда тұрып, скандинавиялық тәсілдің тиімділігіне көз жеткізді және туған Оралда дәл сондай сапалы мектеп ашуды шешті.",
    paragraph3:
      "Біздің формуламыз — академиялық қатаңдықты шығармашылық еркіндікпен үйлестіру. Оқу жаттаудан гөрі құмарлықты тұтатып, мағыналы болуы керек.",
    badge: "№1",
    badgeText: "Скандинавия — білім мен бақыт рейтингінде",
    principles: [
      {
        title: "Сенім және автономия",
        description:
          "Оқушыларға шешім қабылдауға, жауапкершілікті өз мойнына алуға және қателіктерінен сабақ алуға қолайлы орта беріледі",
      },
      {
        title: "Табиғатта оқу",
        description:
          "Таза ауада өтетін тұрақты сабақтар табиғатпен байланыс пен дене денсаулығын нығайтады",
      },
      {
        title: "Бәсекеден гөрі ынтымақтастық",
        description:
          "Оқушылар бірге оқиды, бір-бірін қолдайды және ұжымдық жетістікті бірге атап өтеді",
      },
      {
        title: "Толық күндік мектеп",
        description:
          "Сабақ, үй тапсырмасы мен үйірмелер — барлығы бір кеңістікте, мұғалімдердің қадағалауымен",
      },
      {
        title: "Теңдік пен инклюзия",
        description:
          "Әр баланың құндылығы мен әлеуеті тең. Біз жеке қажеттіліктерге бейімделеміз",
      },
      {
        title: "Оқудағы қуаныш",
        description:
          "Білім құмарлық пен құштарлықты сөндірмей, оларды тұтатуы керек. Біз оқуды мағыналы етеміз",
      },
    ],
    triangle: {
      title: "Мұғалімдер — балалар — ата-аналар",
      description:
        "Біз мұғалімдер, балалар мен ата-аналар арасында сенімге негізделген қатынас құрамыз, әркімнің пікірін естиміз және мектеп пен отбасы арасындағы байланысты нығайтамыз — бала тәрбиесі үшжақты үдеріс екенін түсініп.",
    },
  },
} as const;

const PRINCIPLE_ICONS = [
  <Heart key="trust" className="w-5 h-5" strokeWidth={1.75} />,
  <Trees key="nature" className="w-5 h-5" strokeWidth={1.75} />,
  <Users key="cooperation" className="w-5 h-5" strokeWidth={1.75} />,
  <Clock key="full-day" className="w-5 h-5" strokeWidth={1.75} />,
  <Scale key="equality" className="w-5 h-5" strokeWidth={1.75} />,
  <Sparkles key="joy" className="w-5 h-5" strokeWidth={1.75} />,
];

export async function PhilosophyV3() {
  const locale = await getLocale();
  const t = translations[locale];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-secondary-50 via-white to-primary-50/50">
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
            <p className="!text-base md:!text-lg text-brand-navy-700 leading-relaxed mb-5">
              {t.paragraph2}
            </p>
            <p className="!text-base md:!text-lg text-brand-navy-700 leading-relaxed">
              {t.paragraph3}
            </p>
          </div>

          <div className="relative">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-secondary-100">
              <Image
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&h=900&fit=crop"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
            </div>
            {/* №1 overlapping card — bottom left */}
            <div className="absolute bottom-[-24px] left-[-16px] md:bottom-[-32px] md:left-[-32px] max-w-[280px] bg-white rounded-2xl shadow-xl p-5 md:p-6 ring-1 ring-secondary-100">
              <div className="font-display font-bold text-3xl md:text-4xl text-secondary-600 mb-2">
                {t.badge}
              </div>
              <div className="!text-sm text-brand-navy-700 leading-snug">
                {t.badgeText}
              </div>
            </div>
          </div>
        </div>

        {/* 6 cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-20 md:mt-24">
          {t.principles.map((p, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 md:p-7 border border-secondary-100 shadow-sm transition-shadow duration-200 hover:shadow-xl"
            >
              <div className="w-12 h-12 rounded-xl bg-mint-accent/30 text-secondary-700 flex items-center justify-center mb-5">
                {PRINCIPLE_ICONS[idx]}
              </div>
              <h3 className="font-display font-bold !text-base md:!text-lg text-brand-navy-900 mb-2 leading-snug">
                {p.title}
              </h3>
              <p className="!text-xs md:!text-sm text-brand-navy-700 leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trinity callout */}
        <div className="mt-10 rounded-2xl border-2 border-secondary-300 bg-white p-6 md:p-8 flex items-start gap-5 md:gap-6">
          <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-secondary-500 text-white flex items-center justify-center">
            <UsersRound className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.75} />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-bold !text-lg md:!text-xl text-brand-navy-900 mb-2">
              {t.triangle.title}
            </h3>
            <p className="!text-sm md:!text-base text-brand-navy-700 leading-relaxed">
              {t.triangle.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
