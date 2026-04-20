import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { FounderSection } from "@/components/founder-section";
import { ProgramsSection } from "@/components/programs-section";
import { AchievementsSection } from "@/components/achievements-section";
import { InstagramCarousel } from "@/components/instagram-carousel";
import { CTASection } from "@/components/cta-section";
import { PartnersSection } from "@/components/partners-section";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <FounderSection />
        <ProgramsSection />
        <AchievementsSection />
        <PartnersSection />
        <InstagramCarousel />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}