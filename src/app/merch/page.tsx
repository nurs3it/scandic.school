import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MerchPageContent } from "@/components/merch-page-content";
import { getLocale, getTranslations } from '@/lib/server-locale';

export const metadata = {
  title: "Мерч | Scandic International School",
  description: "Официальный мерч Scandic International School - футболки, толстовки, рюкзаки и аксессуары с логотипом школы",
};

export default async function MerchPage() {
  const locale = await getLocale();
  const translations = getTranslations(locale);

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

