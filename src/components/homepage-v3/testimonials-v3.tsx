import Image from "next/image";
import { Star } from "lucide-react";
import { getLocale } from "@/lib/server-locale";
import { SectionHeading } from "./shared/section-heading";

const translations = {
  ru: {
    title: "Что говорят семьи о Scandic",
    items: [
      {
        quote:
          "Дочь идёт в школу с радостью. Учителя видят её как личность, а программа сочетает академическую глубину с заботой о ребёнке. Мы видим, как растёт её уверенность.",
        name: "Айгерим Мусина",
        role: "Родитель ученицы 3 класса",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      },
      {
        quote:
          "Сын перешёл из обычной школы и сразу почувствовал разницу: малые классы, проектная работа, сильный английский. За год он прошёл невероятный путь.",
        name: "Данияр Сериков",
        role: "Родитель ученика 7 класса",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      },
      {
        quote:
          "Школа стала для нас настоящим партнёром. Регулярная коммуникация, прозрачные ожидания и общая забота о благополучии — всё, что я искала.",
        name: "Жанар Кенесова",
        role: "Родитель ученика 5 класса",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      },
    ],
  },
  en: {
    title: "What families say about Scandic",
    items: [
      {
        quote:
          "Our daughter goes to school with joy. Teachers see her as a person, and the programme combines academic depth with genuine care. We watch her confidence grow.",
        name: "Aigerim Musina",
        role: "Parent of a 3rd grader",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      },
      {
        quote:
          "Our son moved from a regular school and felt the difference at once: small classes, project work, strong English. He has progressed enormously in one year.",
        name: "Daniyar Serikov",
        role: "Parent of a 7th grader",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      },
      {
        quote:
          "The school has become a true partner for us. Regular communication, clear expectations, and shared care for well-being — everything I was looking for.",
        name: "Zhanar Kenesova",
        role: "Parent of a 5th grader",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      },
    ],
  },
  kk: {
    title: "Отбасылар Scandic туралы не айтады",
    items: [
      {
        quote:
          "Қызым мектепке қуанышпен барады. Мұғалімдер оны жеке тұлға ретінде көреді, бағдарлама академиялық тереңдікті балаға қамқорлықпен ұштастырады. Оның сенімі күн санап өсіп келеді.",
        name: "Айгерім Мусина",
        role: "3-сынып оқушысының ата-анасы",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      },
      {
        quote:
          "Ұлым кәдімгі мектептен ауысты және бірден айырмашылықты сезді: шағын сыныптар, жобалық жұмыс, мықты ағылшын тілі. Бір жылда үлкен жол жүріп өтті.",
        name: "Данияр Сериков",
        role: "7-сынып оқушысының ата-анасы",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      },
      {
        quote:
          "Мектеп біз үшін шынайы серіктеске айналды. Тұрақты қарым-қатынас, ашық күтілім және әл-ауқат жөніндегі ортақ қамқорлық — мен іздеген барлық нәрсе.",
        name: "Жанар Кенесова",
        role: "5-сынып оқушысының ата-анасы",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      },
    ],
  },
} as const;

export async function TestimonialsV3() {
  const locale = await getLocale();
  const t = translations[locale];

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading title={t.title} />
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {t.items.map((item, idx) => (
            <div key={idx} className="bg-secondary-50 rounded-2xl p-6 flex flex-col">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-primary-400 text-primary-400"
                  />
                ))}
              </div>
              <p className="text-brand-navy-900 leading-relaxed flex-1 mb-6">{item.quote}</p>
              <div className="flex items-center gap-3 pt-4 border-t border-secondary-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="rounded-full w-12 h-12 object-cover"
                />
                <div>
                  <div className="font-display font-semibold text-sm text-brand-navy-900">{item.name}</div>
                  <div className="text-xs text-brand-navy-700">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
