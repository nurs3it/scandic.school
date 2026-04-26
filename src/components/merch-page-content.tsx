'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingBag, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MerchItemCard } from '@/components/merch-item-card';
import { MerchDetailModal } from '@/components/merch-detail-modal';
import { fetchMerchItems } from '@/lib/merch-data';
import { MerchItem } from '@/types/merch';
import { ParticleBackground } from '@/components/particle-background';

interface MerchPageContentProps {
  translations: {
    merch?: {
      title?: string;
      subtitle?: string;
      searchPlaceholder?: string;
      allCategories?: string;
      noResults?: string;
      noResultsDescription?: string;
    };
    navigation?: Record<string, string>;
    [key: string]: unknown;
  };
}

export function MerchPageContent({ translations }: MerchPageContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<MerchItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState<MerchItem[]>([]);

  useEffect(() => {
    fetchMerchItems().then(setItems);
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(
      items
        .map((item) => item.category)
        .filter((cat): cat is string => Boolean(cat))
    );
    return Array.from(cats);
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, selectedCategory]);

  const handleViewDetails = (item: MerchItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const nav = (translations.navigation ?? {}) as Record<string, string>;

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[45vh] md:min-h-[55vh] flex items-end overflow-hidden bg-gradient-to-br from-secondary via-secondary-800 to-secondary-900">
        <ParticleBackground />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent" />

        <div className="absolute top-20 right-[15%] w-24 h-24 bg-primary/15 rounded-full blur-xl animate-float" />
        <div className="absolute top-[40%] left-[10%] w-16 h-16 bg-primary/20 rounded-full blur-lg animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-[30%] right-[8%] w-12 h-12 bg-accent/15 rounded-full blur-lg animate-float" style={{ animationDelay: '2.5s' }} />

        <div className="container mx-auto px-4 md:px-8 pb-12 md:pb-20 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-primary rounded-full" />
              <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Merch</span>
            </span>
            <h1 className="text-[2.5rem] md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08] mb-4">
              {translations.merch?.title || 'Official School Merchandise'}
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
              {translations.merch?.subtitle || 'Support your school with stylish items featuring the Scandic International School logo'}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }}>
            <div className="mt-8 inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-white/90 text-sm font-medium">
                <span className="text-primary font-bold mr-1">{items.length}</span>
                {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      </section>

      {/* ===== FILTERS & SEARCH ===== */}
      <section className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 md:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder={translations.merch?.searchPlaceholder || 'Search products...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedCategory === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="rounded-full"
              >
                {translations.merch?.allCategories || 'All'}
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS GRID ===== */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-white via-gray-50/50 to-secondary/[0.02]">
        <div className="container mx-auto px-4 md:px-8">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <MerchItemCard item={item} onViewDetails={handleViewDetails} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-secondary/[0.08] border border-secondary/10 flex items-center justify-center mb-6">
                <ShoppingBag className="h-10 w-10 text-secondary/40" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {translations.merch?.noResults || 'No products found'}
              </h3>
              <p className="text-gray-500 max-w-md leading-relaxed">
                {translations.merch?.noResultsDescription || 'Try changing your search parameters'}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ===== SUB-NAVIGATION STRIP ===== */}
      <section className="border-y border-gray-200 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center gap-5 md:gap-6 py-4 overflow-x-auto">
            <span className="text-secondary font-bold italic text-lg flex-shrink-0">Merch</span>
            <div className="w-px h-5 bg-gray-300 flex-shrink-0" />
            <Link href="/about" className="text-sm text-gray-500 hover:text-secondary transition-colors flex-shrink-0">{nav.about ?? 'About'}</Link>
            <Link href="/news" className="text-sm text-gray-500 hover:text-secondary transition-colors flex-shrink-0">{nav.news ?? 'News'}</Link>
            <Link href="/contact" className="text-sm text-gray-500 hover:text-secondary transition-colors flex-shrink-0">{nav.contact ?? 'Contact'}</Link>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-white py-16 md:py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/[0.06] rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/application" className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md">
                <span className="text-secondary font-semibold text-[15px]">{nav.application ?? 'Apply'}</span>
                <ArrowRight className="h-4 w-4 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
              <Link href="/contact" className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md">
                <span className="text-secondary font-semibold text-[15px]">{nav.contact ?? 'Contact'}</span>
                <ArrowRight className="h-4 w-4 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      <MerchDetailModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
      />
    </>
  );
}
