import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLocale } from "@/lib/server-locale";
import type { Locale } from "@/lib/server-locale";
import { SectionHeading } from "./shared/section-heading";

interface HomePartner {
  id: string;
  name: Record<Locale, string>;
  logo: string;
}

const PARTNERS: readonly HomePartner[] = [
  {
    id: "ib",
    name: {
      ru: "Colegios del Mundo Unido (IB)",
      en: "Colegios del Mundo Unido (IB)",
      kk: "Colegios del Mundo Unido (IB)",
    },
    logo: "/partners/colegio-del-mundo.png",
  },
  {
    id: "esbjerg",
    name: {
      ru: "Esbjerg International School",
      en: "Esbjerg International School",
      kk: "Esbjerg International School",
    },
    logo: "/partners/esbjerg-int-school.png",
  },
  {
    id: "lab22",
    name: { ru: "The Lab22 (Лондон)", en: "The Lab22 (London)", kk: "The Lab22 (Лондон)" },
    logo: "/partners/lab22.png",
  },
  {
    id: "byteall",
    name: { ru: "Byteall Energy", en: "Byteall Energy", kk: "Byteall Energy" },
    logo: "/partners/byteall-energy.png",
  },
] as const;

const translations = {
  ru: {
    eyebrow: "Партнёры",
    title: "Доверенная сеть международных партнёров",
    subtitle:
      "Мы работаем со школами, исследовательскими лабораториями и индустриальными партнёрами, чтобы давать ученикам практический и международный контекст.",
    cta: "Все партнёры",
  },
  en: {
    eyebrow: "Partners",
    title: "A trusted network of international partners",
    subtitle:
      "We collaborate with schools, research laboratories, and industry partners to give students a hands-on, international context.",
    cta: "All partners",
  },
  kk: {
    eyebrow: "Серіктестер",
    title: "Сенімді халықаралық серіктестер желісі",
    subtitle:
      "Біз оқушыларға практикалық әрі халықаралық тәжірибе беру үшін мектептермен, зертханалармен және индустриялық серіктестермен жұмыс істейміз.",
    cta: "Барлық серіктестер",
  },
} as const;

export async function PartnersV3() {
  const locale = await getLocale();
  const t = translations[locale];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-10 md:mt-14 max-w-5xl mx-auto">
          {PARTNERS.map((partner) => (
            <Link
              key={partner.id}
              href="/partners"
              className="group flex items-center justify-center bg-white rounded-2xl border border-secondary-100 p-6 md:p-7 min-h-[120px] hover:shadow-lg hover:border-secondary-200 transition-all"
              aria-label={partner.name[locale]}
            >
              <Image
                src={partner.logo}
                alt={partner.name[locale]}
                width={180}
                height={80}
                className="max-h-14 md:max-h-16 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            </Link>
          ))}
        </div>
        <div className="mt-10 md:mt-12 text-center">
          <Link
            href="/partners"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-secondary-300 hover:bg-secondary-50 text-secondary-800 font-medium transition-colors"
          >
            {t.cta}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
