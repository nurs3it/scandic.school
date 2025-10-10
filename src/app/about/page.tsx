import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MissionSection } from "@/components/mission-section";
import { StatsSection } from "@/components/stats-section";
import { getLocale } from '@/lib/server-locale';
import { generateMetadata as genMeta } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return genMeta(locale, 'about');
}

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