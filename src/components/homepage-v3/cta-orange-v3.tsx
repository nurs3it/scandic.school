import { getLocale } from "@/lib/server-locale";

const translations = {
  ru: {
    title: "Готовы начать?",
    subtitle:
      "Свяжитесь с нашей приемной комиссией для получения подробной информации и записи на экскурсию",
    cta1: "Записаться на экскурсию",
    cta2: "Подать заявку онлайн",
    emailLabel: "Email",
    email: "admissions@scandic.kz",
    phoneLabel: "Телефон",
    phone: "8 706 610 57 81",
  },
  en: {
    title: "Ready to start?",
    subtitle:
      "Get in touch with our admissions team for detailed information and to book a tour",
    cta1: "Book a tour",
    cta2: "Apply online",
    emailLabel: "Email",
    email: "admissions@scandic.kz",
    phoneLabel: "Phone",
    phone: "8 706 610 57 81",
  },
  kk: {
    title: "Бастауға дайынсыз ба?",
    subtitle:
      "Толық ақпарат алу және экскурсияға жазылу үшін қабылдау комиссиясымен байланысыңыз",
    cta1: "Экскурсияға жазылу",
    cta2: "Онлайн өтінім беру",
    emailLabel: "Email",
    email: "admissions@scandic.kz",
    phoneLabel: "Телефон",
    phone: "8 706 610 57 81",
  },
} as const;

export async function CtaOrangeV3() {
  const locale = await getLocale();
  const t = translations[locale];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-primary-500 text-white rounded-3xl px-6 md:px-10 py-14 md:py-20">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display font-bold !text-3xl md:!text-4xl lg:!text-5xl !leading-[1.2] mb-5">
              {t.title}
            </h2>
            <p className="!text-base md:!text-lg text-white/90 leading-relaxed mb-9">
              {t.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              <a
                href="/application"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white hover:bg-white/95 text-primary-600 font-semibold transition-colors min-w-[240px]"
              >
                {t.cta1}
              </a>
              <a
                href="/application"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-transparent hover:bg-white/10 text-white font-semibold border border-white/80 transition-colors min-w-[240px]"
              >
                {t.cta2}
              </a>
            </div>
          </div>

          <div className="border-t border-white/30 mt-12 md:mt-14 pt-8 md:pt-10 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
              <div>
                <div className="!text-sm text-white/70 mb-1.5">{t.emailLabel}</div>
                <a
                  href={`mailto:${t.email}`}
                  className="!text-base md:!text-lg font-medium text-white hover:text-white/90 transition-colors"
                >
                  {t.email}
                </a>
              </div>
              <div>
                <div className="!text-sm text-white/70 mb-1.5">{t.phoneLabel}</div>
                <a
                  href={`tel:${t.phone.replace(/\s/g, "")}`}
                  className="!text-base md:!text-lg font-medium text-white hover:text-white/90 transition-colors"
                >
                  {t.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
