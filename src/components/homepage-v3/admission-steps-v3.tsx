import { getLocale } from "@/lib/server-locale";
import { SectionHeading } from "./shared/section-heading";

const translations = {
  ru: {
    title: "Как стать частью Scandic International School",
    subtitle: "Шесть шагов от первого знакомства до зачисления.",
    steps: [
      { title: "Заявка на поступление", description: "Заполните онлайн-анкету на сайте — это занимает несколько минут." },
      { title: "Подача документов", description: "Загрузите документы об образовании и медицинскую карту." },
      { title: "Собеседование", description: "Встреча с координатором и педагогами для знакомства с ребёнком." },
      { title: "Зачисление", description: "После одобрения заявки вы получите письмо о зачислении и реквизиты." },
      { title: "Распределение в классы", description: "Команда подбирает класс с учётом возраста, уровня и интересов." },
      { title: "Гибкая оплата", description: "Несколько вариантов оплаты обучения: помесячно, по семестрам или за год." },
    ],
  },
  en: {
    title: "How to become part of Scandic International School",
    subtitle: "Six steps from first contact to enrolment.",
    steps: [
      { title: "Application", description: "Fill out the online form on our website — it takes a few minutes." },
      { title: "Submit documents", description: "Upload education records and a medical card." },
      { title: "Interview", description: "A meeting with the coordinator and teachers to get to know the child." },
      { title: "Enrolment", description: "After approval, you receive a confirmation letter and payment details." },
      { title: "Class placement", description: "Our team selects a class based on age, level, and interests." },
      { title: "Flexible payment", description: "Several tuition options: monthly, by semester, or annually." },
    ],
  },
  kk: {
    title: "Scandic International School-дың бір бөлігі болу жолы",
    subtitle: "Бірінші танысудан қабылдауға дейінгі алты қадам.",
    steps: [
      { title: "Қабылдау өтінімі", description: "Сайттағы онлайн-анкетаны толтырыңыз — бірнеше минут уақытыңызды алады." },
      { title: "Құжаттарды тапсыру", description: "Білім туралы құжаттар мен медициналық картаны жүктеңіз." },
      { title: "Сұхбат", description: "Баламен танысу үшін координатор және мұғалімдермен кездесу." },
      { title: "Қабылдау", description: "Өтінім мақұлданғаннан кейін қабылдау туралы хат пен реквизиттерді аласыз." },
      { title: "Сыныптарға бөлу", description: "Команда жасы, деңгейі мен қызығушылықтарына қарай сыныпты таңдайды." },
      { title: "Икемді төлем", description: "Оқу ақысын төлеудің бірнеше нұсқасы: ай сайын, семестрлік немесе жылдық." },
    ],
  },
} as const;

export async function AdmissionStepsV3() {
  const locale = await getLocale();
  const t = translations[locale];

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading title={t.title} subtitle={t.subtitle} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          {t.steps.map((step, idx) => (
            <div key={idx} className="border border-brand-teal-200 rounded-2xl p-6 bg-white">
              <div className="w-8 h-8 rounded-full bg-brand-teal-100 text-brand-teal-700 flex items-center justify-center font-display font-bold mb-3">
                {idx + 1}
              </div>
              <h3 className="font-display font-semibold text-brand-navy-900 mb-2">{step.title}</h3>
              <p className="text-sm text-brand-navy-700 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
