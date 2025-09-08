import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { ProgramsSection } from "@/components/programs-section";
import { CTASection } from "@/components/cta-section";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ProgramsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}