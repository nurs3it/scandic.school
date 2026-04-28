import Image from "next/image";
import { Quote } from "lucide-react";
import { getLocale } from "@/lib/server-locale";

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
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-brand-teal-600 mb-4">
            {t.eyebrow}
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-brand-navy-900">
            {t.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 max-w-6xl mx-auto items-start">
          {/* Left: portrait with teal duotone + overlapping name card */}
          <div className="relative pb-16 md:pb-24">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-brand-teal-700">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=720&h=900&fit=crop"
                alt={t.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 bg-brand-teal-600/55 mix-blend-multiply" aria-hidden />
            </div>

            <div className="absolute left-6 right-6 md:left-12 md:right-12 -bottom-2 md:bottom-0 bg-white rounded-2xl shadow-xl p-5 md:p-6 ring-1 ring-brand-navy-100/60">
              <div className="font-display font-bold text-lg md:text-xl text-brand-navy-900 mb-1.5">
                {t.name}
              </div>
              <div className="text-sm text-brand-navy-700 leading-snug mb-2">{t.role1}</div>
              <div className="text-sm text-brand-teal-700 font-medium leading-snug">{t.role2}</div>
            </div>
          </div>

          {/* Right: quote icon + body + accented pull-quote */}
          <div>
            <Quote className="w-10 h-10 md:w-12 md:h-12 text-brand-teal-600 mb-6" strokeWidth={1.5} />
            <p className="text-brand-navy-900 text-lg md:text-xl leading-relaxed mb-6">
              {t.paragraph1}
            </p>
            <p className="text-brand-navy-900 text-lg md:text-xl leading-relaxed mb-8">
              {t.paragraph2}
            </p>
            <blockquote className="border-l-2 border-brand-teal-600 pl-5 text-brand-navy-900 text-base md:text-lg leading-relaxed italic">
              {t.pullQuote}
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
