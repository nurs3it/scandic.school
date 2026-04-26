import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, ArrowRight, FolderOpen } from "lucide-react";
import { getLocale, getTranslations } from '@/lib/server-locale';
import { getDocuments } from '@/lib/api/actions';
import { DocumentDownloadButton } from '@/components/document-download-button';
import { Document } from '@/lib/api/types';
import Link from 'next/link';
import { generateMetadata as genMeta } from '@/lib/metadata';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ParticleBackground } from '@/components/particle-background';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return genMeta(locale, 'documents');
}

// Helper function to group documents by category or audience
function groupDocuments(documents: Document[]): Record<string, Document[]> {
  const grouped: Record<string, Document[]> = {};

  documents.forEach(doc => {
    const key = doc.category || doc.audience_label || 'Other';
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(doc);
  });

  return grouped;
}

// Helper function to format file size
function formatFileSize(url: string): string {
  // Extract file extension from URL
  const extension = url.split('.').pop()?.toUpperCase() || 'FILE';
  return extension;
}

const cardAccents = [
  'from-blue-500 to-blue-600',
  'from-emerald-500 to-emerald-600',
  'from-violet-500 to-violet-600',
  'from-amber-500 to-amber-600',
  'from-rose-500 to-rose-600',
  'from-cyan-500 to-cyan-600',
];

export default async function DocumentsPage() {
  const locale = await getLocale();
  const translations = await getTranslations(locale);
  const nav = translations.navigation as unknown as Record<string, string>;

  const result = await getDocuments();
  const allDocuments = result.success && result.data ? result.data : [];

  // Filter only public documents
  const publicDocuments = allDocuments.filter(doc => doc.is_public);

  // Group documents by category
  const groupedDocuments = groupDocuments(publicDocuments);

  const totalDocs = publicDocuments.length;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* ===== HERO ===== */}
        <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-end overflow-hidden bg-gradient-to-br from-secondary via-secondary-800 to-secondary-900">
          <ParticleBackground />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent" />

          {/* Floating orbs */}
          <div className="absolute top-20 right-[15%] w-24 h-24 bg-primary/15 rounded-full blur-xl animate-float" />
          <div className="absolute top-[45%] left-[10%] w-16 h-16 bg-primary/20 rounded-full blur-lg animate-float" style={{ animationDelay: '1.5s' }} />
          <div className="absolute bottom-[30%] right-[8%] w-12 h-12 bg-accent/15 rounded-full blur-lg animate-float" style={{ animationDelay: '2.5s' }} />

          <div className="container mx-auto px-4 md:px-8 pb-12 md:pb-20 relative z-10">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-[2px] bg-primary rounded-full" />
                <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">
                  {nav.documents}
                </span>
              </span>
              <h1 className="text-[2.5rem] md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08] mb-4">
                {translations.documentsPage.title}
              </h1>
              <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
                {translations.documentsPage.subtitle}
              </p>
            </ScrollReveal>

            {/* Stats badge */}
            <ScrollReveal delay={0.3}>
              <div className="mt-8 inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5">
                <FolderOpen className="h-5 w-5 text-primary" />
                <span className="text-white/90 text-sm font-medium">
                  <span className="text-primary font-bold text-lg mr-1">{totalDocs}</span>
                  {locale === 'en' ? 'documents' : locale === 'kk' ? 'құжат' : 'документов'}
                </span>
              </div>
            </ScrollReveal>
          </div>

          {/* Bottom accent */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
        </section>

        {/* ===== DOCUMENTS GRID ===== */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-white via-gray-50/50 to-secondary/[0.02]">
          <div className="container mx-auto px-4 md:px-8">
            <ScrollReveal>
              <div className="text-center mb-14">
                <span className="inline-flex items-center gap-2 mb-4">
                  <span className="w-8 h-[2px] bg-primary rounded-full" />
                  <span className="text-secondary text-sm font-semibold uppercase tracking-widest">
                    {translations.documentsPage.sectionTitle}
                  </span>
                </span>
                <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-secondary to-secondary-800 bg-clip-text text-transparent">
                  {translations.documentsPage.sectionTitle}
                </h2>
                <p className="text-gray-500 mt-4 max-w-3xl mx-auto text-lg">
                  {translations.documentsPage.sectionSubtitle}
                </p>
              </div>
            </ScrollReveal>

            {Object.keys(groupedDocuments).length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">{translations.documentsPage.noDocuments}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(groupedDocuments).map(([categoryName, docs], index) => (
                  <ScrollReveal key={categoryName} delay={index * 0.1}>
                    <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white shadow-md hover:-translate-y-1 overflow-hidden h-full">
                      <div className={`h-1 bg-gradient-to-r ${cardAccents[index % cardAccents.length]}`} />
                      <CardHeader className="pb-4">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${cardAccents[index % cardAccents.length]} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <FileText className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                              {categoryName}
                            </CardTitle>
                          </div>
                        </div>
                        <p className="text-gray-500 text-sm">
                          {docs.length} {locale === 'en' ? 'documents' : locale === 'kk' ? 'құжат' : 'документов'}
                        </p>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          {docs.map((doc) => (
                            <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group-hover:bg-primary/5 transition-colors">
                              <div className="flex items-center space-x-3 flex-1 min-w-0">
                                <FileText className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate" title={doc.title}>
                                    {doc.title}
                                  </p>
                                  {doc.description && (
                                    <p className="text-xs text-gray-500 truncate" title={doc.description}>
                                      {doc.description}
                                    </p>
                                  )}
                                  <p className="text-xs text-gray-400">
                                    {formatFileSize(doc.file_url)}
                                  </p>
                                </div>
                              </div>
                              <DocumentDownloadButton
                                documentId={doc.id}
                                downloadUrl={doc.file_url}
                                fileName={doc.original_name || doc.title}
                                buttonText={translations.documentsPage.download}
                              />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ===== CONTACT CTA ===== */}
        <section className="relative py-16 md:py-20 bg-secondary overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto text-center">
                <Users className="h-10 w-10 mx-auto mb-5 text-white/80" />
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {translations.documentsPage.contactTitle}
                </h2>
                <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8">
                  {translations.documentsPage.contactSubtitle}
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-600 text-primary-foreground font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Users className="h-5 w-5" />
                  {translations.documentsPage.contactButton}
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ===== SUB-NAVIGATION STRIP ===== */}
        <section className="border-y border-gray-200 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex items-center gap-6 py-4 overflow-x-auto">
              <span className="text-secondary font-bold italic text-lg whitespace-nowrap">
                {nav.about}
              </span>
              <div className="w-px h-6 bg-gray-300" />
              <Link href="/about" className="text-sm text-gray-500 hover:text-secondary transition-colors whitespace-nowrap">
                {nav.about}
              </Link>
              <Link href="/contact" className="text-sm text-gray-500 hover:text-secondary transition-colors whitespace-nowrap">
                {nav.contact}
              </Link>
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-white py-16 md:py-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/[0.06] rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <ScrollReveal>
              <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-secondary italic mb-8">
                  {locale === 'en' ? 'Explore More' : locale === 'kk' ? 'Толығырақ' : 'Узнайте больше'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link href="/application" className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md">
                    <span className="text-secondary font-semibold">{nav.application}</span>
                    <ArrowRight className="h-5 w-5 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </Link>
                  <Link href="/about" className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md">
                    <span className="text-secondary font-semibold">{nav.about}</span>
                    <ArrowRight className="h-5 w-5 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </Link>
                  <Link href="/contact" className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md">
                    <span className="text-secondary font-semibold">{nav.contact}</span>
                    <ArrowRight className="h-5 w-5 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
