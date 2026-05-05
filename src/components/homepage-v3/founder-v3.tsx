import Image from "next/image";
import { Quote } from "lucide-react";
import { getLocale } from "@/lib/server-locale";
import { ScrollFadeIn } from "./shared/scroll-fade-in";

const translations = {
  ru: {
    eyebrow: "ПРИВЕТСТВИЕ CEO & ОСНОВАТЕЛЯ ШКОЛЫ",
    title: "Слово основателя",
    name: "Амир Бекмуханов",
    role1: "Основатель школы Scandic International School",
    role2: "Владелец датской технологичной компании «BYTEALL ENERGY»",
    paragraph1:
      "В Scandic International School мы создаём среду, где академическая строгость сочетается с творческой свободой. Наше видение — не просто дать знания, но разжечь искру любознательности в каждом ребёнке.",
    paragraph2: "Наши выпускники будут подготовлены учиться в лучших вузах мира.",
    pullQuote:
      "Живя в Дании, я понял что образование такого же качества можно заложить в Казахстане, в родном Уральске",
  },
  en: {
    eyebrow: "GREETING FROM CEO & FOUNDER",
    title: "A Word from the Founder",
    name: "Amir Bekmukhanov",
    role1: "Founder of Scandic International School",
    role2: "Owner of the Danish technology company «BYTEALL ENERGY»",
    paragraph1:
      "At Scandic International School we create an environment where academic rigour meets creative freedom. Our vision is not simply to deliver knowledge, but to spark curiosity in every child.",
    paragraph2: "Our graduates will be prepared to study at the world's leading universities.",
    pullQuote:
      "Living in Denmark, I realised that education of the same quality can be built in Kazakhstan, in my home city of Uralsk.",
  },
  kk: {
    eyebrow: "CEO & МЕКТЕП ҚҰРЫЛТАЙШЫСЫНЫҢ ҚҰТТЫҚТАУЫ",
    title: "Құрылтайшының сөзі",
    name: "Әмір Бекмұханов",
    role1: "Scandic International School мектебінің құрылтайшысы",
    role2: "Дат технологиялық компаниясы «BYTEALL ENERGY» иесі",
    paragraph1:
      "Scandic International School-да біз академиялық қатаңдық пен шығармашылық еркіндік үйлесетін орта құрамыз. Біздің мақсат — тек білім беру ғана емес, әр баланың бойындағы құмарлық ұшқынын тұтату.",
    paragraph2: "Біздің түлектер әлемнің үздік университеттерінде оқуға дайын болады.",
    pullQuote:
      "Данияда тұрып, дәл сондай сапалы білімді Қазақстанда, туған Оралымда қалыптастыруға болатынын түсіндім.",
  },
} as const;

export async function FounderV3() {
  const locale = await getLocale();
  const t = translations[locale];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <ScrollFadeIn>
          <div className="text-center mb-10 md:mb-14">
            <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] text-secondary-600 mb-3">
              {t.eyebrow}
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-brand-navy-900">
              {t.title}
            </h2>
          </div>
        </ScrollFadeIn>

        <ScrollFadeIn delay={0.1}>
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 max-w-6xl mx-auto items-center">
          {/* Left: large square portrait with teal duotone + overlapping name card */}
          <div className="relative">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-secondary-600">
              <Image
                src="/images/founder.jpeg"
                alt={t.name}
                fill
                sizes="(max-width: 768px) 100vw, 560px"
                className="object-cover"
              />
              <div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{ backgroundColor: "rgba(11, 130, 102, 0.55)" }}
                aria-hidden
              />
            </div>

            <div className="md:absolute md:bottom-[-32px] md:right-[-24px] md:max-w-[340px] z-30 mt-5 md:mt-0 bg-white rounded-2xl shadow-xl p-5 md:p-6 ring-1 ring-brand-navy-100/60">
              <div className="font-display font-bold text-lg md:text-xl text-brand-navy-900 mb-1.5">
                {t.name}
              </div>
              <div className="text-sm text-brand-navy-700 leading-snug mb-3">{t.role1}</div>
              <div className="text-sm text-secondary-600 font-medium leading-snug">{t.role2}</div>
            </div>
          </div>

          {/* Right: quote + body + pull-quote */}
          <div className="flex flex-col justify-center">
            <Quote className="w-12 h-12 md:w-14 md:h-14 text-secondary-500 mb-6" strokeWidth={1.5} />
            <p className="text-brand-navy-900 text-xl md:text-2xl leading-relaxed mb-6">
              {t.paragraph1}
            </p>
            <p className="text-brand-navy-900 text-xl md:text-2xl leading-relaxed mb-8">
              {t.paragraph2}
            </p>
            <blockquote className="border-l-2 border-secondary-500 pl-5 text-brand-navy-900 text-lg md:text-xl leading-relaxed">
              {t.pullQuote}
            </blockquote>
          </div>
        </div>
        </ScrollFadeIn>
      </div>
    </section>
  );
}
