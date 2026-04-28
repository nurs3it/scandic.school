import { Award, Users, Mountain, Beaker, Brain, HeartHandshake, GraduationCap, BookOpen, Microscope } from "lucide-react";
import { getLocale } from "@/lib/server-locale";
import { SectionHeading } from "./shared/section-heading";
import { FeatureCard } from "./shared/feature-card";

const ICONS = [
  <Award key="ib" className="w-5 h-5" />,
  <HeartHandshake key="links" className="w-5 h-5" />,
  <BookOpen key="challenge" className="w-5 h-5" />,
  <Mountain key="extreme" className="w-5 h-5" />,
  <Users key="small" className="w-5 h-5" />,
  <Beaker key="training" className="w-5 h-5" />,
  <Microscope key="stem" className="w-5 h-5" />,
  <Brain key="critical" className="w-5 h-5" />,
  <GraduationCap key="top" className="w-5 h-5" />,
];

const translations = {
  ru: {
    title: "Образование, которое готовит к будущему",
    subtitle:
      "Девять направлений, которые объединяют международные стандарты, авторские методики и заботу о благополучии каждого ученика.",
    items: [
      { title: "Статус кандидата IB PYP", description: "Наша школа официально проходит аккредитацию IB по программе начальной школы (PYP)." },
      { title: "Сотрудничество с The LINKS", description: "Партнёрство с международной образовательной сетью обеспечивает обмен лучшими практиками." },
      { title: "Собственная программа Challenge", description: "Авторская методика развития мышления, лидерства и решения нестандартных задач." },
      { title: "Scandic Extreme Challenge", description: "Выездные программы на природе, которые формируют характер и командный дух." },
      { title: "Малые классы", description: "До 16 учеников в классе — каждый получает максимум внимания учителя." },
      { title: "Тренинговый центр", description: "Современные ресурсы для непрерывного развития педагогов и учеников." },
      { title: "STEM фокус", description: "Углублённое изучение естественных наук, технологий, инженерии и математики." },
      { title: "Критическое мышление", description: "Учим задавать правильные вопросы и принимать осознанные решения." },
      { title: "Поступление в топ-100 вузов", description: "Системная подготовка к ведущим университетам мира с консультантами по поступлению." },
    ],
  },
  en: {
    title: "Education that prepares for the future",
    subtitle:
      "Nine pillars that combine international standards, original methodology, and care for every student's well-being.",
    items: [
      { title: "IB PYP candidate status", description: "Our school is officially undergoing IB accreditation for the Primary Years Programme." },
      { title: "Partnership with The LINKS", description: "A partnership with an international educational network enables the exchange of best practices." },
      { title: "Original Challenge programme", description: "Our methodology for developing thinking, leadership, and unconventional problem-solving." },
      { title: "Scandic Extreme Challenge", description: "Outdoor programmes that build character and team spirit." },
      { title: "Small classes", description: "Up to 16 students per class — every child gets maximum teacher attention." },
      { title: "Training centre", description: "Modern resources for the continuous development of teachers and students." },
      { title: "STEM focus", description: "In-depth study of science, technology, engineering, and mathematics." },
      { title: "Critical thinking", description: "We teach students to ask the right questions and make conscious decisions." },
      { title: "Top-100 university admissions", description: "Systematic preparation for leading world universities with admission consultants." },
    ],
  },
  kk: {
    title: "Болашаққа дайындайтын білім",
    subtitle:
      "Халықаралық стандарттарды, авторлық әдістемелерді және әрбір оқушының әл-ауқатына қамқорлықты біріктіретін тоғыз бағыт.",
    items: [
      { title: "IB PYP кандидаты мәртебесі", description: "Біздің мектеп бастауыш мектеп бағдарламасы (PYP) бойынша IB аккредитациясынан өтуде." },
      { title: "The LINKS-пен серіктестік", description: "Халықаралық білім беру желісімен серіктестік үздік тәжірибелермен алмасуға мүмкіндік береді." },
      { title: "Жеке Challenge бағдарламасы", description: "Ойлауды, көшбасшылықты және стандартты емес есептерді шешуді дамытатын авторлық әдістеме." },
      { title: "Scandic Extreme Challenge", description: "Мінез бен ұжымдық рухты қалыптастыратын далалық бағдарламалар." },
      { title: "Шағын сыныптар", description: "Сыныпта 16 оқушыға дейін — әркім мұғалімнен ең көп көңіл бөлуді алады." },
      { title: "Тренинг орталығы", description: "Мұғалімдер мен оқушылардың үздіксіз дамуы үшін заманауи ресурстар." },
      { title: "STEM фокусы", description: "Жаратылыстану, технология, инженерия және математиканы тереңдетіп оқыту." },
      { title: "Сыни ойлау", description: "Дұрыс сұрақтар қою мен саналы шешімдер қабылдауды үйретеміз." },
      { title: "Үздік 100 университетке түсу", description: "Әлемнің жетекші университеттеріне жүйелі дайындық пен консультанттар." },
    ],
  },
} as const;

export async function EducationCardsV3() {
  const locale = await getLocale();
  const t = translations[locale];

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading title={t.title} subtitle={t.subtitle} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          {t.items.map((item, idx) => (
            <FeatureCard
              key={idx}
              variant="teal-50"
              icon={ICONS[idx]}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
