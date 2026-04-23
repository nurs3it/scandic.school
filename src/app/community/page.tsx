import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CommunityPageContent } from "@/components/community-page-content";
import { getLocale } from '@/lib/server-locale';
import { generateMetadata as genMeta } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return genMeta(locale, 'community');
}

export default function CommunityPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <CommunityPageContent />
      </main>
      <Footer />
    </div>
  );
}
