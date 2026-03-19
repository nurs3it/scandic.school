import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThanksAnimation } from "@/components/thanks-animation";
import { Button } from "@/components/ui/button";
import { getLocale, getTranslations } from "@/lib/server-locale";
import { ArrowLeft, Phone, Mail } from "lucide-react";

export default async function ThanksPage() {
  const locale = await getLocale();
  const t = await getTranslations(locale);

  const content = {
    en: {
      badge: "Application Received",
      title: "Thank You!",
      subtitle: "Your enrollment inquiry has been successfully submitted.",
      body: "Our admissions team will review your inquiry and contact you shortly to discuss the next steps.",
      steps: [
        { num: "1", text: "We review your inquiry" },
        { num: "2", text: "Our team calls you back" },
        { num: "3", text: "We schedule a school visit" },
      ],
      backHome: "Back to Home",
      newApp: "Submit Another Inquiry",
      questions: "Have questions?",
    },
    ru: {
      badge: "Заявка принята",
      title: "Спасибо!",
      subtitle: "Ваш запрос на зачисление успешно отправлен.",
      body: "Наш отдел приёма рассмотрит вашу заявку и свяжется с вами в ближайшее время для обсуждения дальнейших шагов.",
      steps: [
        { num: "1", text: "Рассматриваем вашу заявку" },
        { num: "2", text: "Наш менеджер звонит вам" },
        { num: "3", text: "Записываемся на экскурсию в школу" },
      ],
      backHome: "На главную",
      newApp: "Подать ещё одну заявку",
      questions: "Остались вопросы?",
    },
    kk: {
      badge: "Өтініш қабылданды",
      title: "Рахмет!",
      subtitle: "Қабылдауға өтінішіңіз сәтті жіберілді.",
      body: "Қабылдау бөліміміз өтінішіңізді қарастырып, келесі қадамдарды талқылау үшін жақын арада сізбен байланысады.",
      steps: [
        { num: "1", text: "Өтінішіңізді қарастырамыз" },
        { num: "2", text: "Менеджеріміз сізге қоңырау шалады" },
        { num: "3", text: "Мектепке саяхат жоспарлаймыз" },
      ],
      backHome: "Басты бетке",
      newApp: "Тағы бір өтініш беру",
      questions: "Сұрақтарыңыз бар ма?",
    },
  };

  const c = content[locale] ?? content.ru;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-gray-50 via-white to-primary/5 py-16">
        <div className="container mx-auto px-4 max-w-2xl">

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

            {/* Top accent bar */}
            <div className="h-2 bg-gradient-to-r from-primary via-primary/80 to-secondary" />

            <div className="px-8 py-10 text-center">

              {/* Badge */}
              <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-6 border border-green-200">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                {c.badge}
              </span>

              {/* Lottie */}
              <ThanksAnimation />

              {/* Title */}
              <h1 className="text-4xl font-bold text-secondary mt-2 mb-3">
                {c.title}
              </h1>
              <p className="text-lg text-gray-600 mb-2">{c.subtitle}</p>
              <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed mb-10">
                {c.body}
              </p>

              {/* Steps */}
              <div className="flex items-start justify-center gap-0 mb-10">
                {c.steps.map((step, i) => (
                  <div key={i} className="flex items-center">
                    <div className="flex flex-col items-center w-28">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm mb-2 border-2 border-primary/20">
                        {step.num}
                      </div>
                      <p className="text-xs text-gray-600 text-center leading-tight px-1">{step.text}</p>
                    </div>
                    {i < c.steps.length - 1 && (
                      <div className="w-8 h-0.5 bg-primary/20 mb-5 shrink-0" />
                    )}
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
                <Button asChild className="bg-primary hover:bg-primary/90 text-secondary font-semibold px-8">
                  <Link href="/">{c.backHome}</Link>
                </Button>
                <Button asChild variant="outline" className="border-primary/30 text-primary hover:bg-primary/5 px-8">
                  <Link href="/application">{c.newApp}</Link>
                </Button>
              </div>

              {/* Contact strip */}
              <div className="border-t border-gray-100 pt-6">
                <p className="text-xs text-gray-400 mb-3">{c.questions}</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                  <a
                    href={`tel:${t.header.phone}`}
                    className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
                  >
                    <Phone className="h-4 w-4 text-primary" />
                    {t.header.phone}
                  </a>
                  <a
                    href="mailto:info@scandic.school"
                    className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
                  >
                    <Mail className="h-4 w-4 text-primary" />
                    info@scandic.school
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Back link */}
          <div className="text-center mt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {c.backHome}
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
