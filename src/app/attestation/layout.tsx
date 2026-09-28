import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function AttestationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
