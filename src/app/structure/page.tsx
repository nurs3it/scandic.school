import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { StructurePageContent } from "@/components/structure-page-content";
import { getLocale } from '@/lib/server-locale';
import { generateMetadata as genMeta } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return genMeta(locale, 'structure');
}

export default function StructurePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <StructurePageContent />
      </main>
      <Footer />
    </div>
  );
}
