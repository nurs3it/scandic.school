import type { Locale } from "@/lib/server-locale";

export interface TuitionLevel {
  id: "primary" | "middle" | "high";
  grades: Record<Locale, string>;
  name: Record<Locale, string>;
  monthlyKzt: number;
  yearlyKzt: number;
  highlights: Record<Locale, readonly string[]>;
}

export const TUITION_LEVELS: readonly TuitionLevel[] = [
  {
    id: "primary",
    grades: { ru: "0–4 классы", en: "Grades 0–4", kk: "0–4 сыныптар" },
    name: { ru: "Начальная школа", en: "Primary school", kk: "Бастауыш мектеп" },
    monthlyKzt: 280000,
    yearlyKzt: 2800000,
    highlights: {
      ru: [
        "Программа IB PYP",
        "Триязычная среда",
        "Полный учебный день с продлёнкой",
        "Питание в концептуальном ресторане",
      ],
      en: [
        "IB PYP programme",
        "Trilingual environment",
        "Full school day with after-school care",
        "Meals in our concept restaurant",
      ],
      kk: [
        "IB PYP бағдарламасы",
        "Үштілді орта",
        "Толық оқу күні және ұзартылған топ",
        "Концептуалды мейрамханадағы тамақтану",
      ],
    },
  },
  {
    id: "middle",
    grades: { ru: "5–9 классы", en: "Grades 5–9", kk: "5–9 сыныптар" },
    name: { ru: "Средняя школа", en: "Middle school", kk: "Орта мектеп" },
    monthlyKzt: 320000,
    yearlyKzt: 3200000,
    highlights: {
      ru: [
        "Программа IB MYP",
        "STEM-фокус и научные лаборатории",
        "Гостевые лекции и проектная работа",
        "Подготовка к международным экзаменам",
      ],
      en: [
        "IB MYP programme",
        "STEM focus with science laboratories",
        "Guest lectures and project work",
        "Preparation for international exams",
      ],
      kk: [
        "IB MYP бағдарламасы",
        "STEM-фокус және ғылыми зертханалар",
        "Қонақ дәрістер және жобалық жұмыс",
        "Халықаралық емтихандарға дайындық",
      ],
    },
  },
  {
    id: "high",
    grades: { ru: "10–11 классы", en: "Grades 10–11", kk: "10–11 сыныптар" },
    name: { ru: "Старшая школа", en: "High school", kk: "Жоғары мектеп" },
    monthlyKzt: 380000,
    yearlyKzt: 3800000,
    highlights: {
      ru: [
        "Программа IB DP",
        "Углублённая подготовка к университету",
        "Индивидуальные академические треки",
        "Поддержка при поступлении в ведущие вузы мира",
      ],
      en: [
        "IB DP programme",
        "Advanced university preparation",
        "Individual academic tracks",
        "Support for admission to leading universities worldwide",
      ],
      kk: [
        "IB DP бағдарламасы",
        "Университетке тереңдетілген дайындық",
        "Жеке академиялық бағыттар",
        "Әлемнің жетекші университеттеріне түсуге қолдау",
      ],
    },
  },
] as const;

export function formatKzt(amount: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(amount);
}
