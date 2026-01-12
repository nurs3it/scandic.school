import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MerchPageContent } from "@/components/merch-page-content";
import { getLocale, getTranslations } from '@/lib/server-locale';
import { generateMetadata as genMeta } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return genMeta(locale, 'merch');
}

export default async function MerchPage() {
  const locale = await getLocale();
  const translations = await getTranslations(locale);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <MerchPageContent translations={translations} />
      </main>
      <Footer />
    </div>
  );
}

