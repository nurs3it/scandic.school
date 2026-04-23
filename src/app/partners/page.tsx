import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PartnersPageSection } from "@/components/partners-page-section";
import { getLocale } from '@/lib/server-locale';
import { generateMetadata as genMeta } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return genMeta(locale, 'partners');
}

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <PartnersPageSection />
      </main>
      <Footer />
    </div>
  );
}
