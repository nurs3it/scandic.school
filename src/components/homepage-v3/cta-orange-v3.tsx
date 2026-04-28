import { Phone } from "lucide-react";
import { getLocale } from "@/lib/server-locale";

const translations = {
  ru: {
    title: "Готовы начать?",
    subtitle:
      "Запишитесь на экскурсию или свяжитесь с нашими координаторами — мы расскажем о программе и ответим на ваши вопросы.",
    cta1: "Записаться на экскурсию",
    cta2: "Связаться с нами",
    phone: "+7 706 610 57 81",
  },
  en: {
    title: "Ready to start?",
    subtitle:
      "Book a tour or contact our coordinators — we will tell you about the programme and answer your questions.",
    cta1: "Book a tour",
    cta2: "Contact us",
    phone: "+7 706 610 57 81",
  },
  kk: {
    title: "Бастауға дайынсыз ба?",
    subtitle:
      "Экскурсияға жазылыңыз немесе координаторларымызбен байланысыңыз — біз бағдарлама туралы айтып, сұрақтарыңызға жауап береміз.",
    cta1: "Экскурсияға жазылу",
    cta2: "Бізбен байланысу",
    phone: "+7 706 610 57 81",
  },
} as const;

export async function CtaOrangeV3() {
  const locale = await getLocale();
  const t = translations[locale];

  return (
    <section className="py-16 bg-brand-orange-500 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-3">{t.title}</h2>
        <p className="text-white/90 max-w-xl mx-auto mb-8">{t.subtitle}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
          <a
            href="/application"
            className="inline-flex items-center px-6 py-3 rounded-full bg-white text-brand-orange-600 font-medium hover:bg-white/90 transition-colors"
          >
            {t.cta1}
          </a>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 rounded-full border border-white text-white hover:bg-white/10 font-medium transition-colors"
          >
            {t.cta2}
          </a>
        </div>
        <a
          href="tel:+77066105781"
          className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
        >
          <Phone className="w-4 h-4" />
          {t.phone}
        </a>
      </div>
    </section>
  );
}
