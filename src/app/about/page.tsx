import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MissionSection } from "@/components/mission-section";
import { StatsSection } from "@/components/stats-section";

export const metadata: Metadata = {
  title: "О нас | Scandic International School",
  description: "Узнайте больше о Scandic International School - нашей миссии, ценностях и подходе к образованию",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <MissionSection />
        <StatsSection />
      </main>
      <Footer />
    </div>
  );
}
