import type { Locale } from "@/lib/server-locale";

export interface AnchorEntry {
  id: string;
  label: Record<Locale, string>;
}

export const ANCHOR_ENTRIES: readonly AnchorEntry[] = [
  {
    id: "founder",
    label: { ru: "Основатель", en: "Founder", kk: "Құрылтайшы" },
  },
  {
    id: "mission",
    label: { ru: "Миссия", en: "Mission", kk: "Миссия" },
  },
  {
    id: "why-us",
    label: { ru: "Почему мы", en: "Why us", kk: "Біз неге" },
  },
  {
    id: "programs",
    label: { ru: "Программы", en: "Programs", kk: "Бағдарламалар" },
  },
  {
    id: "subjects",
    label: { ru: "Направления", en: "Subjects", kk: "Бағыттар" },
  },
  {
    id: "campus",
    label: { ru: "Кампус", en: "Campus", kk: "Кампус" },
  },
  {
    id: "instagram",
    label: { ru: "Instagram", en: "Instagram", kk: "Instagram" },
  },
] as const;
