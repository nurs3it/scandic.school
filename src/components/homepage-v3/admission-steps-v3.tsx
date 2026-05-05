import { Calendar, FileText, Users, CheckCircle2, DollarSign } from "lucide-react";
import { getLocale } from "@/lib/server-locale";

const translations = {
  ru: {
    eyebrow: "Поступление",
    title: "Как стать частью Scandic International School",
    subtitle:
      "Мы ищем семьи, которые разделяют наши ценности и верят в силу скандинавского подхода к образованию",
    steps: [
      {
        title: "Запись на экскурсию",
        description:
          "Свяжитесь с нами для персональной экскурсии по школе и встречи с командой",
      },
      {
        title: "Подача заявки",
        description: "Заполните онлайн-заявку и предоставьте необходимые документы",
      },
      {
        title: "Собеседование",
        description:
          "Встреча с директором школы и педагогами для знакомства с семьёй и ребёнком",
      },
      {
        title: "Зачисление",
        description:
          "Получение решения и оформление документов для начала обучения",
      },
    ],
    info: [
      {
        title: "Набор на 2026–2027",
        description: "Открыт прием заявок на новый учебный год для учеников 7–18 лет",
      },
      {
        title: "Малые классы",
        description: "Не более 18 учеников в классе для индивидуального подхода",
      },
      {
        title: "Гибкая оплата",
        description: "Различные варианты оплаты и возможность рассрочки",
      },
    ],
  },
  en: {
    eyebrow: "Admissions",
    title: "How to become part of Scandic International School",
    subtitle:
      "We are looking for families who share our values and believe in the power of the Scandinavian approach to education",
    steps: [
      {
        title: "Book a tour",
        description:
          "Get in touch for a personal tour of the school and a meeting with our team",
      },
      {
        title: "Application",
        description: "Fill out the online application and provide the required documents",
      },
      {
        title: "Interview",
        description:
          "A meeting with the head of school and teachers to get to know the family and child",
      },
      {
        title: "Enrolment",
        description: "Receive your decision and complete documents to begin learning",
      },
    ],
    info: [
      {
        title: "2026–2027 intake",
        description: "Applications open for the new academic year for students aged 7–18",
      },
      {
        title: "Small classes",
        description: "No more than 18 students per class for an individual approach",
      },
      {
        title: "Flexible payment",
        description: "Multiple payment options and instalment plans available",
      },
    ],
  },
  kk: {
    eyebrow: "Қабылдау",
    title: "Scandic International School-дың бір бөлігі болу жолы",
    subtitle:
      "Біз құндылықтарымызды бөлісетін және білім берудегі скандинавиялық тәсілдің күшіне сенетін отбасыларды іздейміз",
    steps: [
      {
        title: "Экскурсияға жазылу",
        description:
          "Мектеп бойынша жеке экскурсия мен командамен кездесу үшін бізбен байланысыңыз",
      },
      {
        title: "Өтінім беру",
        description: "Онлайн өтінімді толтырып, қажетті құжаттарды беріңіз",
      },
      {
        title: "Сұхбат",
        description:
          "Отбасы мен баламен танысу үшін мектеп директоры және мұғалімдермен кездесу",
      },
      {
        title: "Қабылдау",
        description: "Шешім алу және оқуды бастауға арналған құжаттарды рәсімдеу",
      },
    ],
    info: [
      {
        title: "2026–2027 қабылдау",
        description: "7–18 жас аралығындағы оқушыларға жаңа оқу жылына өтінімдер ашық",
      },
      {
        title: "Шағын сыныптар",
        description: "Жеке тәсіл үшін бір сыныпта 18 оқушыдан аспайды",
      },
      {
        title: "Икемді төлем",
        description: "Әртүрлі төлем нұсқалары мен бөліп төлеу мүмкіндігі",
      },
    ],
  },
} as const;

const STEP_ICONS = [
  <Calendar key="cal" className="w-7 h-7" strokeWidth={1.75} />,
  <FileText key="doc" className="w-7 h-7" strokeWidth={1.75} />,
  <Users key="users" className="w-7 h-7" strokeWidth={1.75} />,
  <CheckCircle2 key="check" className="w-7 h-7" strokeWidth={1.75} />,
];

const INFO_ICONS = [
  <Calendar key="cal" className="w-6 h-6 text-white" strokeWidth={1.75} />,
  <Users key="users" className="w-6 h-6 text-white" strokeWidth={1.75} />,
  <DollarSign key="dollar" className="w-6 h-6 text-white" strokeWidth={1.75} />,
];

export async function AdmissionStepsV3() {
  const locale = await getLocale();
  const t = translations[locale];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading — centered */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-secondary-600 mb-4">
            {t.eyebrow}
          </p>
          <h2 className="font-display font-bold !text-3xl md:!text-4xl lg:!text-5xl text-brand-navy-900 !leading-[1.2] mb-5">
            {t.title}
          </h2>
          <p className="!text-base md:!text-lg text-brand-navy-700 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 4 numbered step cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14 md:mt-16">
          {t.steps.map((step, idx) => (
            <div
              key={idx}
              className="relative bg-gradient-to-b from-secondary-50/60 to-white rounded-2xl p-7 md:p-8 pt-9 border border-secondary-100 shadow-sm transition-shadow duration-200 hover:shadow-xl text-center"
            >
              <div className="absolute -top-4 left-6 w-9 h-9 rounded-full bg-secondary-600 text-white font-display font-bold text-base flex items-center justify-center shadow-md">
                {idx + 1}
              </div>
              <div className="w-14 h-14 mx-auto rounded-2xl bg-mint-accent/40 text-secondary-700 flex items-center justify-center mb-5">
                {STEP_ICONS[idx]}
              </div>
              <h3 className="font-display font-bold !text-base md:!text-lg text-brand-navy-900 mb-2 leading-snug">
                {step.title}
              </h3>
              <p className="!text-xs md:!text-sm text-brand-navy-700 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* 3 info cards below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          {t.info.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-7 md:p-8 border border-secondary-300 bg-gradient-to-b from-mint-accent/25 to-white transition-shadow duration-200 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary-600 flex items-center justify-center mb-6">
                {INFO_ICONS[idx]}
              </div>
              <h3 className="font-display font-bold !text-lg md:!text-xl text-brand-navy-900 mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="!text-sm md:!text-base text-brand-navy-700 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
