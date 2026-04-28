import Image from "next/image";
import { Quote } from "lucide-react";
import { getLocale } from "@/lib/server-locale";

const translations = {
  ru: {
    title: "Слово основателя",
    name: "Амир Бекмуханов",
    role: "Основатель школы",
    company: "Владелец датской технологичной компании «BYTEALL ENERGY»",
    quote1:
      "Мы создаём не просто школу — мы создаём пространство, где каждый ребёнок раскрывает свой потенциал, развивает мышление и формирует характер для уверенного будущего.",
    quote2:
      "Образование Scandic объединяет лучшие международные практики, индивидуальный подход и заботу о благополучии каждого ученика. Это школа, в которой я сам бы хотел учиться.",
  },
  en: {
    title: "A Word from the Founder",
    name: "Amir Bekmukhanov",
    role: "Founder of the school",
    company: "Owner of the Danish technology company «BYTEALL ENERGY»",
    quote1:
      "We are creating more than a school — we are creating a space where every child unlocks their potential, develops thinking, and forms the character needed for a confident future.",
    quote2:
      "A Scandic education combines the best international practices, an individual approach, and care for every student's well-being. This is a school I would have wanted to attend myself.",
  },
  kk: {
    title: "Құрылтайшының сөзі",
    name: "Әмір Бекмұханов",
    role: "Мектептің құрылтайшысы",
    company: "Дат технологиялық компаниясы «BYTEALL ENERGY» иесі",
    quote1:
      "Біз жай мектеп емес — әрбір баланың әлеуетін ашатын, ойлауын дамытып, болашаққа сенімді қадам басатын кеңістік құрып жатырмыз.",
    quote2:
      "Scandic білімі үздік халықаралық тәжірибелерді, жеке көзқарасты және әрбір оқушының әл-ауқатына деген қамқорлықты біріктіреді. Бұл — мен өзім оқығым келетін мектеп.",
  },
} as const;

export async function FounderV3() {
  const locale = await getLocale();
  const t = translations[locale];

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-center font-display font-bold text-3xl md:text-4xl text-brand-navy-900 mb-12">
          {t.title}
        </h2>
        <div className="max-w-5xl mx-auto bg-brand-teal-50 rounded-3xl p-6 md:p-10 shadow-sm grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-start">
          <div className="text-center md:text-left">
            <Image
              src="https://picsum.photos/seed/founder/400/400"
              alt={t.name}
              width={200}
              height={200}
              className="rounded-full w-32 h-32 md:w-48 md:h-48 object-cover mx-auto md:mx-0"
            />
            <div className="mt-4 font-display font-semibold text-brand-navy-900">{t.name}</div>
            <div className="text-sm text-brand-navy-700">{t.role}</div>
            <div className="text-xs text-brand-navy-700/70 mt-1">{t.company}</div>
          </div>
          <div>
            <Quote className="w-10 h-10 text-brand-teal-700 mb-4" />
            <p className="text-brand-navy-900 leading-relaxed mb-4">{t.quote1}</p>
            <p className="text-brand-navy-900 leading-relaxed">{t.quote2}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
