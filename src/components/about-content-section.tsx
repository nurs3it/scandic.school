import Link from 'next/link';
import { getLocale, getTranslations } from '@/lib/server-locale';
import { ArrowRight } from 'lucide-react';

export async function AboutContentSection() {
  const locale = await getLocale();
  const translations = await getTranslations(locale);
  const t = (translations as unknown as Record<string, Record<string, unknown>>).about;
  const aims = t.aims as Record<string, string>;
  const history = t.history as Record<string, string>;
  const facilities = t.facilities as Record<string, string>;

  return (
    <>
      {/* Quote band — yellow bg with large quote marks like GHS */}
      <section className="bg-primary py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Large quote mark SVG */}
            <svg
              className="w-12 h-12 md:w-16 md:h-16 text-secondary/20 mb-4"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <path d="M20 65c0-16.6 13.4-30 30-30V20C27.9 20 10 37.9 10 60v30h40V60H20v5zm50 0c0-16.6 13.4-30 30-30V20C77.9 20 60 37.9 60 60v30h40V60H70v5z" />
            </svg>
            <blockquote>
              <p className="text-secondary text-lg md:text-xl leading-relaxed italic">
                {t.quoteText as string}
              </p>
              <footer className="mt-4">
                <p className="text-secondary/60 text-sm font-medium">
                  — {t.quoteSource as string}
                </p>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Our Aims + Our History — two-column cards like GHS */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Our Aims card */}
            <div className="group">
              {/* Image placeholder — colored block like GHS card tops */}
              <div className="aspect-[16/10] bg-gradient-to-br from-secondary to-secondary-800 rounded-t-lg mb-0 overflow-hidden relative">
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-2xl md:text-3xl font-bold italic text-white">
                    {aims.title}
                  </h2>
                </div>
              </div>
              <div className="border border-t-0 border-gray-200 rounded-b-lg p-6">
                <p className="text-gray-600 leading-relaxed mb-5 text-[15px]">
                  {aims.description}
                </p>
                <Link
                  href="/#features"
                  className="inline-flex items-center gap-2 text-secondary text-sm font-semibold hover:text-primary transition-colors group/link"
                >
                  {aims.link}
                  <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Our History card */}
            <div className="group">
              <div className="aspect-[16/10] bg-gradient-to-br from-primary-600 to-primary-800 rounded-t-lg mb-0 overflow-hidden relative">
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-2xl md:text-3xl font-bold italic text-white">
                    {history.title}
                  </h2>
                </div>
              </div>
              <div className="border border-t-0 border-gray-200 rounded-b-lg p-6">
                <p className="text-gray-600 leading-relaxed mb-5 text-[15px]">
                  {history.description}
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-secondary text-sm font-semibold hover:text-primary transition-colors group/link"
                >
                  {history.link}
                  <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities — full-width with side image area like GHS */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Text side */}
            <div className="py-16 md:py-20 px-6 md:px-12 lg:px-16 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-bold italic text-secondary mb-4">
                {facilities.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6 text-[15px]">
                {facilities.description}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-secondary text-sm font-semibold hover:text-primary transition-colors group"
              >
                {facilities.link}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            {/* Image/color side */}
            <div className="aspect-[4/3] md:aspect-auto bg-gradient-to-br from-secondary via-secondary-800 to-secondary-600 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border border-white/40" />
                <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full border border-white/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-navigation strip like GHS "About Us" breadcrumb */}
      <section className="border-y border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 py-4 overflow-x-auto">
            <span className="text-secondary font-bold italic text-lg whitespace-nowrap">
              {t.heroLabel as string}
            </span>
            <div className="w-px h-6 bg-gray-300" />
            <Link href="/staff" className="text-sm text-gray-500 hover:text-secondary transition-colors whitespace-nowrap">
              {(translations.navigation as unknown as Record<string, string>).staff}
            </Link>
            <Link href="/partners" className="text-sm text-gray-500 hover:text-secondary transition-colors whitespace-nowrap">
              {(translations.navigation as unknown as Record<string, string>).partners ?? 'Partners'}
            </Link>
            <Link href="/documents" className="text-sm text-gray-500 hover:text-secondary transition-colors whitespace-nowrap">
              {(translations.navigation as unknown as Record<string, string>).documents}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA — warm cream background like GHS "Continue your journey" */}
      <section className="bg-primary/15 py-14 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary italic mb-8">
              {t.ctaTitle as string}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/application"
                className="group flex items-center justify-between border border-secondary/20 hover:border-secondary/40 bg-white hover:bg-gray-50 px-6 py-5 transition-all duration-200"
              >
                <span className="text-secondary font-semibold">{t.ctaAdmissions as string}</span>
                <ArrowRight className="h-5 w-5 text-secondary group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="group flex items-center justify-between border border-secondary/20 hover:border-secondary/40 bg-white hover:bg-gray-50 px-6 py-5 transition-all duration-200"
              >
                <span className="text-secondary font-semibold">{t.ctaVisit as string}</span>
                <ArrowRight className="h-5 w-5 text-secondary group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="group flex items-center justify-between border border-secondary/20 hover:border-secondary/40 bg-white hover:bg-gray-50 px-6 py-5 transition-all duration-200"
              >
                <span className="text-secondary font-semibold">{t.ctaContact as string}</span>
                <ArrowRight className="h-5 w-5 text-secondary group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
