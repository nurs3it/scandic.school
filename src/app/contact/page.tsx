import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ContactInfo } from "@/components/contact-info";
import { ContactForm } from "@/components/contact-form";
import { getLocale } from '@/lib/server-locale';
import { generateMetadata as genMeta } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return genMeta(locale, 'contact');
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <ContactInfo />
          <div className="mt-16">
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
