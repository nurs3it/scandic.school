import { Sparkles, Compass } from "lucide-react";
import { getLocale } from "@/lib/server-locale";
import { SectionHeading } from "./shared/section-heading";
import { FeatureCard } from "./shared/feature-card";

const translations = {
  ru: {
    eyebrow: "миссия школы",
    title:
      "Мы раскрываем потенциал каждого ученика, развивая мышление и формируя сильную личность для уверенного будущего",
    card1Title: "Всестороннее развитие",
    card1Desc:
      "Программа охватывает академические знания, эмоциональный интеллект, физическое здоровье и социальные навыки. Каждый ребёнок получает поддержку для роста во всех сферах.",
    card2Title: "Практическое обучение",
    card2Desc:
      "Через эксперименты, проекты и практику ученики учатся применять знания в реальной жизни. Мы делаем образование осязаемым и осмысленным.",
  },
  en: {
    eyebrow: "school mission",
    title:
      "We unlock the potential of every student, developing thinking and shaping a strong personality for a confident future",
    card1Title: "Holistic development",
    card1Desc:
      "Our programme covers academic knowledge, emotional intelligence, physical health, and social skills. Every child receives support to grow in every area.",
    card2Title: "Hands-on learning",
    card2Desc:
      "Through experiments, projects, and practice, students learn to apply knowledge in real life. We make education tangible and meaningful.",
  },
  kk: {
    eyebrow: "мектеп миссиясы",
    title:
      "Біз әрбір оқушының әлеуетін ашамыз, ойлауын дамытамыз және болашаққа сенімді қадам басатын мықты тұлғаны қалыптастырамыз",
    card1Title: "Жан-жақты даму",
    card1Desc:
      "Бағдарлама академиялық білімді, эмоционалдық интеллектіні, дене денсаулығын және әлеуметтік дағдыларды қамтиды. Әрбір бала барлық саладағы өсуге қолдау алады.",
    card2Title: "Практикалық оқыту",
    card2Desc:
      "Тәжірибелер, жобалар және практика арқылы оқушылар білімді нақты өмірде қолдануды үйренеді. Біз білімді қолға ұстатпалы әрі мағыналы етеміз.",
  },
} as const;

export async function PotentialV3() {
  const locale = await getLocale();
  const t = translations[locale];

  return (
    <section className="py-12 md:py-20 bg-brand-teal-50">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} align="left" />
        <div className="space-y-4">
          <FeatureCard
            variant="white"
            icon={<Sparkles className="w-5 h-5" />}
            title={t.card1Title}
            description={t.card1Desc}
          />
          <FeatureCard
            variant="white"
            icon={<Compass className="w-5 h-5" />}
            title={t.card2Title}
            description={t.card2Desc}
          />
        </div>
      </div>
    </section>
  );
}
