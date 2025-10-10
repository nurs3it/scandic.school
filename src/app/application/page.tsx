import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ApplicationForm } from "@/components/application-form";
import { getLocale } from '@/lib/server-locale';
import { generateMetadata as genMeta } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return genMeta(locale, 'application');
}

export default function ApplicationPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <ApplicationForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
