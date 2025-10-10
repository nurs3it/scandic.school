import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { StaffSection } from "@/components/staff-section";
import { getLocale } from '@/lib/server-locale';
import { generateMetadata as genMeta } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return genMeta(locale, 'staff');
}

export default function StaffPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <StaffSection />
      </main>
      <Footer />
    </div>
  );
}
