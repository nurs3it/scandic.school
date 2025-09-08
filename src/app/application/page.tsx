import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ApplicationForm } from "@/components/application-form";

export const metadata: Metadata = {
  title: "Заявка на набор | Scandic International School",
  description: "Подайте заявку на поступление в Scandic International School на 2025-2026 учебный год",
};

export default function ApplicationPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <ApplicationForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
