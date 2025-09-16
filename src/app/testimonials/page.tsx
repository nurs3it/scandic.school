import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TestimonialsSection } from "@/components/testimonials-section";

export const metadata: Metadata = {
  title: "Отзывы | Scandic International School",
  description: "Отзывы родителей о Scandic International School - узнайте, что говорят о нас семьи наших учеников",
};

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
