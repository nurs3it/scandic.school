'use client';
import Link from 'next/link';
import { ChevronRight, Download, FileText, FolderOpen, ListTree } from 'lucide-react';
import { useLocale } from '@/components/locale-provider';
import { attestationTitle, type AttestationSection } from '@/lib/attestation-api';

const t = {
  ru: { hero: 'Аттестация', lead: 'Документы и материалы для государственной аттестации школы', sections: 'Разделы', subsections: 'Подразделы', documents: 'Документы', empty: 'Документы скоро появятся', noSections: 'Разделы скоро появятся' },
  en: { hero: 'Attestation', lead: 'Documents and materials for the state attestation of the school', sections: 'Sections', subsections: 'Subsections', documents: 'Documents', empty: 'Documents coming soon', noSections: 'Sections coming soon' },
  kk: { hero: 'Аттестация', lead: 'Мектепті мемлекеттік аттестаттауға арналған құжаттар мен материалдар', sections: 'Бөлімдер', subsections: 'Бөлімшелер', documents: 'Құжаттар', empty: 'Құжаттар жақын арада жарияланады', noSections: 'Бөлімдер жақын арада' },
};

function fileExt(url: string) {
  return (url.split('?')[0].split('.').pop() || 'file').toUpperCase();
}

function TreeNode({ node, activeIds, activeSlug, locale }: {
  node: AttestationSection;
  activeIds: Set<number>;
  activeSlug?: string;
  locale: string;
}) {
  const isActive = node.slug === activeSlug;
  const link = (
    <Link
      href={`/attestation/${node.slug}`}
      aria-current={isActive ? 'page' : undefined}
      className={`block py-1.5 pr-2 text-sm leading-snug rounded-md transition-colors ${
        isActive ? 'text-brand-teal-700 font-semibold' : 'text-brand-navy-900 hover:text-brand-teal-700'
      }`}
    >
      {attestationTitle(node, locale)}
    </Link>
  );
  if (!node.children.length) return <li className="pl-5">{link}</li>;
  // ponytail: native <details> for expand/collapse; ancestors of the current page start open
  return (
    <li>
      <details open={activeIds.has(node.id)} className="group">
        <summary className="flex items-start gap-1 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <ChevronRight className="h-4 w-4 mt-2 shrink-0 text-brand-navy-700/60 transition-transform group-open:rotate-90" />
          {link}
        </summary>
        <ul className="ml-3 border-l border-brand-navy-100 pl-2">
          {node.children.map((c) => (
            <TreeNode key={c.id} node={c} activeIds={activeIds} activeSlug={activeSlug} locale={locale} />
          ))}
        </ul>
      </details>
    </li>
  );
}

export function AttestationPageContent({ tree, path }: {
  tree: AttestationSection[];
  path: AttestationSection[];
}) {
  const { locale } = useLocale();
  const tt = t[locale as keyof typeof t] ?? t.ru;
  const current = path.at(-1);
  const activeIds = new Set(path.map((s) => s.id));
  const children = current ? current.children : tree;

  const sidebar = (
    <ul className="space-y-0.5">
      {tree.map((n) => (
        <TreeNode key={n.id} node={n} activeIds={activeIds} activeSlug={current?.slug} locale={locale} />
      ))}
    </ul>
  );

  return (
    <>
      <section className="bg-gradient-to-br from-secondary via-secondary-800 to-secondary-900 text-white">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <nav aria-label="breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-white/70 mb-4">
            <Link href="/attestation" className="hover:text-white">{tt.hero}</Link>
            {path.slice(0, -1).map((s) => (
              <span key={s.id} className="flex items-center gap-1">
                <ChevronRight className="h-3.5 w-3.5" />
                <Link href={`/attestation/${s.slug}`} className="hover:text-white">{attestationTitle(s, locale)}</Link>
              </span>
            ))}
          </nav>
          <h1 className="!text-3xl md:!text-4xl font-bold max-w-4xl">
            {current ? attestationTitle(current, locale) : tt.hero}
          </h1>
          {!current && <p className="mt-4 text-lg text-white/80 max-w-2xl">{tt.lead}</p>}
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          {/* Sidebar tree: collapsible on mobile, sticky on desktop */}
          <aside className="lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
            <details className="lg:hidden rounded-xl border border-brand-navy-100 bg-white p-4">
              <summary className="flex items-center gap-2 font-semibold cursor-pointer">
                <ListTree className="h-4 w-4 text-brand-teal-700" /> {tt.sections}
              </summary>
              <div className="mt-3">{sidebar}</div>
            </details>
            <div className="hidden lg:block rounded-xl border border-brand-navy-100 bg-white p-4">
              <div className="flex items-center gap-2 font-semibold mb-3">
                <ListTree className="h-4 w-4 text-brand-teal-700" /> {tt.sections}
              </div>
              {sidebar}
            </div>
          </aside>

          <div className="min-w-0 space-y-10">
            {children.length > 0 && (
              <div>
                {current && <h2 className="!text-xl font-semibold mb-4">{tt.subsections}</h2>}
                <div className="grid gap-3 sm:grid-cols-2">
                  {children.map((c) => (
                    <Link
                      key={c.id}
                      href={`/attestation/${c.slug}`}
                      className="flex items-start gap-3 rounded-xl border border-brand-navy-100 bg-white p-4 hover:border-brand-teal-700 hover:bg-brand-teal-50 transition-colors"
                    >
                      <FolderOpen className="h-5 w-5 mt-0.5 shrink-0 text-brand-teal-700" />
                      <span className="font-medium leading-snug">{attestationTitle(c, locale)}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {current && (current.files.length > 0 || current.children.length === 0) && (
              <div>
                <h2 className="!text-xl font-semibold mb-4">{tt.documents}</h2>
                {current.files.length === 0 ? (
                  <p className="text-gray-500">{tt.empty}</p>
                ) : (
                  <ul className="divide-y divide-brand-navy-100 rounded-xl border border-brand-navy-100 bg-white">
                    {current.files.map((f) => (
                      <li key={f.id}>
                        <a
                          href={f.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-4 hover:bg-brand-teal-50 transition-colors"
                        >
                          <FileText className="h-5 w-5 shrink-0 text-brand-teal-700" />
                          <span className="flex-1 min-w-0 break-words">{f.title}</span>
                          <span className="text-xs font-semibold text-brand-navy-700/70">{fileExt(f.url)}</span>
                          <Download className="h-4 w-4 shrink-0 text-brand-navy-700/60" />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {!current && tree.length === 0 && <p className="text-gray-500">{tt.noSections}</p>}
          </div>
        </div>
      </section>
    </>
  );
}
