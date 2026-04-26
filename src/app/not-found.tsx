import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { NotFoundContent } from '@/components/not-found-content';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col">
        <NotFoundContent />
      </main>
      <Footer />
    </div>
  );
}
