import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PartnersSection } from "@/components/partners-section";
import { InstagramCarousel } from "@/components/instagram-carousel";
import { HeroV3 } from "@/components/homepage-v3/hero-v3";
import { FounderV3 } from "@/components/homepage-v3/founder-v3";
import { PotentialV3 } from "@/components/homepage-v3/potential-v3";
import { EducationCardsV3 } from "@/components/homepage-v3/education-cards-v3";
import { StemV3 } from "@/components/homepage-v3/stem-v3";
import { PhilosophyV3 } from "@/components/homepage-v3/philosophy-v3";
import { CampusV3 } from "@/components/homepage-v3/campus-v3";
import { ExtracurricularsV3 } from "@/components/homepage-v3/extracurriculars-v3";
import { SupportProgramsV3 } from "@/components/homepage-v3/support-programs-v3";
import { AdmissionStepsV3 } from "@/components/homepage-v3/admission-steps-v3";
import { CtaOrangeV3 } from "@/components/homepage-v3/cta-orange-v3";
import { TestimonialsV3 } from "@/components/homepage-v3/testimonials-v3";
import { SchoolLifeV3 } from "@/components/homepage-v3/school-life-v3";
import { AmbitionsV3 } from "@/components/homepage-v3/ambitions-v3";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroV3 />
        <FounderV3 />
        <PotentialV3 />
        <EducationCardsV3 />
        <StemV3 />
        <PhilosophyV3 />
        <CampusV3 />
        <ExtracurricularsV3 />
        <SupportProgramsV3 />
        <AdmissionStepsV3 />
        <CtaOrangeV3 />
        <TestimonialsV3 />
        <SchoolLifeV3 />
        <AmbitionsV3 />
        <InstagramCarousel />
        <PartnersSection />
      </main>
      <Footer />
    </div>
  );
}
