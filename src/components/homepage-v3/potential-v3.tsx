import { getLocale } from "@/lib/server-locale";

const translations = {
  ru: {
    eyebrow: "миссия школы",
    title:
      "Мы раскрываем потенциал каждого ученика, развивая мышление и формируя сильную личность для уверенного будущего",
    card1Title: "Всестороннее развитие",
    card1Desc:
      "Мы за всестороннее развитие детей, а не только академическую сторону.",
    card2Title: "Практическое обучение",
    card2Desc:
      "Мы развиваем качества и навыки через живое, практичное обучение, помогая детям учиться и исследовать мир.",
  },
  en: {
    eyebrow: "school mission",
    title:
      "We unlock the potential of every student, developing thinking and shaping a strong personality for a confident future",
    card1Title: "Holistic development",
    card1Desc:
      "We stand for the all-round development of children, not just the academic side.",
    card2Title: "Hands-on learning",
    card2Desc:
      "We build qualities and skills through lively, practical learning that helps children learn and explore the world.",
  },
  kk: {
    eyebrow: "мектеп миссиясы",
    title:
      "Біз әрбір оқушының әлеуетін ашамыз, ойлауын дамытамыз және болашаққа сенімді қадам басатын мықты тұлғаны қалыптастырамыз",
    card1Title: "Жан-жақты даму",
    card1Desc:
      "Біз балалардың тек академиялық жағын ғана емес, жан-жақты дамуын қолдаймыз.",
    card2Title: "Практикалық оқыту",
    card2Desc:
      "Біз балалардың әлемді тануы мен зерттеуіне көмектесетін жанды әрі практикалық оқыту арқылы қасиеттер мен дағдыларды дамытамыз.",
  },
} as const;

export async function PotentialV3() {
  const locale = await getLocale();
  const t = translations[locale];

  return (
    <section className="relative py-16 md:py-24 text-white overflow-hidden bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-700">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 20%, rgba(168,230,210,0.18) 0, transparent 45%), radial-gradient(circle at 82% 78%, rgba(255,255,255,0.06) 0, transparent 50%)",
        }}
        aria-hidden
      />
      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-sm uppercase tracking-wider font-medium mb-4 text-mint-accent">
            {t.eyebrow}
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white leading-[1.35] md:leading-[1.4]">
            {t.title}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5 mt-12 md:mt-16 max-w-4xl mx-auto">
          <div className="rounded-2xl p-6 md:p-8 bg-white/10 backdrop-blur-sm ring-1 ring-white/25 shadow-lg text-center">
            <h3 className="font-display font-semibold text-sm md:text-base text-white mb-2">
              {t.card1Title}
            </h3>
            <p className="text-[11px] md:text-xs leading-relaxed text-white/90">
              {t.card1Desc}
            </p>
          </div>
          <div className="rounded-2xl p-6 md:p-8 bg-white/10 backdrop-blur-sm ring-1 ring-white/25 shadow-lg text-center">
            <h3 className="font-display font-semibold text-sm md:text-base text-white mb-2">
              {t.card2Title}
            </h3>
            <p className="text-[11px] md:text-xs leading-relaxed text-white/90">
              {t.card2Desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
