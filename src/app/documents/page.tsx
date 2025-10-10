import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Users } from "lucide-react";
import { getLocale, getTranslations } from '@/lib/server-locale';
import { getDocuments } from '@/lib/api/actions';
import { DocumentDownloadButton } from '@/components/document-download-button';
import { Document } from '@/lib/api/types';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Документы школы | Scandic International School",
  description: "Официальные документы Scandic International School - политики, руководство, расписание, календарь мероприятий",
};

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

export default async function DocumentsPage() {
  const locale = await getLocale();
  const translations = getTranslations(locale);

  const result = await getDocuments();
  const allDocuments = result.success && result.data ? result.data : [];

  // Filter only public documents
  const publicDocuments = allDocuments.filter(doc => doc.is_public);

  // Group documents by category
  const groupedDocuments = groupDocuments(publicDocuments);

  console.log(groupedDocuments)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {translations.documentsPage.title}
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              {translations.documentsPage.subtitle}
            </p>
          </div>
        </section>

        {/* Documents Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                {translations.documentsPage.sectionTitle}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {translations.documentsPage.sectionSubtitle}
              </p>
            </div>

            {Object.keys(groupedDocuments).length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">{translations.documentsPage.noDocuments}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(groupedDocuments).map(([categoryName, docs]) => (
                  <Card key={categoryName} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white">
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                            {categoryName}
                          </CardTitle>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {docs.length} {locale === 'en' ? 'documents' : locale === 'kk' ? 'құжат' : 'документов'}
                      </p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        {docs.map((doc) => (
                          <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group-hover:bg-primary/5 transition-colors">
                            <div className="flex items-center space-x-3 flex-1 min-w-0">
                              <FileText className="h-4 w-4 text-gray-500 flex-shrink-0" />
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate" title={doc.title}>
                                  {doc.title}
                                </p>
                                {doc.description && (
                                  <p className="text-xs text-gray-500 truncate" title={doc.description}>
                                    {doc.description}
                                  </p>
                                )}
                                <p className="text-xs text-gray-500">
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
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              {translations.documentsPage.contactTitle}
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {translations.documentsPage.contactSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/contact">
                  <Users className="h-5 w-5 mr-2" />
                  {translations.documentsPage.contactButton}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
