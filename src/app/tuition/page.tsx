import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TuitionPageContent } from "@/components/tuition-page-content";

export default function TuitionPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">
        <TuitionPageContent />
      </main>
      <Footer />
    </div>
  );
}
