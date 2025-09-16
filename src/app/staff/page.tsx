import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { StaffSection } from "@/components/staff-section";

export const metadata: Metadata = {
  title: "Сотрудники | Scandic International School",
  description: "Познакомьтесь с нашей командой профессиональных педагогов и администраторов",
};

export default function StaffPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <StaffSection />
      </main>
      <Footer />
    </div>
  );
}
