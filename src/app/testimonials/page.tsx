import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TestimonialsSection } from "@/components/testimonials-section";
import { getLocale } from '@/lib/server-locale';
import { generateMetadata as genMeta } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return genMeta(locale, 'testimonials');
}

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
