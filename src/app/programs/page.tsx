import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProgramsPageContent } from "@/components/programs-page-content";
import { getLocale } from '@/lib/server-locale';
import { generateMetadata as genMeta } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return genMeta(locale, 'programs');
}

export default function ProgramsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ProgramsPageContent />
      </main>
      <Footer />
    </div>
  );
}
