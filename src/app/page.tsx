import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroV3 } from "@/components/homepage-v3/hero-v3";
import { FounderV3 } from "@/components/homepage-v3/founder-v3";
import { PotentialV3 } from "@/components/homepage-v3/potential-v3";
import { EducationCardsV3 } from "@/components/homepage-v3/education-cards-v3";
import { AcademicProgramV3 } from "@/components/homepage-v3/academic-program-v3";
import { SubjectAreasV3 } from "@/components/homepage-v3/subject-areas-v3";
import { PhilosophyV3 } from "@/components/homepage-v3/philosophy-v3";
import { CampusV3 } from "@/components/homepage-v3/campus-v3";
import { ExtracurricularsV3 } from "@/components/homepage-v3/extracurriculars-v3";
import { SupportProgramsV3 } from "@/components/homepage-v3/support-programs-v3";
import { AdmissionStepsV3 } from "@/components/homepage-v3/admission-steps-v3";
import { CtaOrangeV3 } from "@/components/homepage-v3/cta-orange-v3";
import { TestimonialsV3 } from "@/components/homepage-v3/testimonials-v3";
import { SchoolLifeV3 } from "@/components/homepage-v3/school-life-v3";
import { AmbitionsV3 } from "@/components/homepage-v3/ambitions-v3";
import { InstagramCarousel } from "@/components/instagram-carousel";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroV3 />
        <div id="founder" className="scroll-mt-28 md:scroll-mt-32"><FounderV3 /></div>
        <div id="mission" className="scroll-mt-28 md:scroll-mt-32"><PotentialV3 /></div>
        <div id="why-us" className="scroll-mt-28 md:scroll-mt-32"><EducationCardsV3 /></div>
        <div id="programs" className="scroll-mt-28 md:scroll-mt-32"><AcademicProgramV3 /></div>
        <div id="subjects" className="scroll-mt-28 md:scroll-mt-32"><SubjectAreasV3 /></div>
        <PhilosophyV3 />
        <div id="campus" className="scroll-mt-28 md:scroll-mt-32"><CampusV3 /></div>
        <ExtracurricularsV3 />
        <SupportProgramsV3 />
        <AdmissionStepsV3 />
        <CtaOrangeV3 />
        <TestimonialsV3 />
        <SchoolLifeV3 />
        <AmbitionsV3 />
        <div id="instagram" className="scroll-mt-28 md:scroll-mt-32"><InstagramCarousel /></div>
      </main>
      <Footer />
    </div>
  );
}
