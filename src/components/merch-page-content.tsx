'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingBag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MerchItemCard } from '@/components/merch-item-card';
import { MerchDetailModal } from '@/components/merch-detail-modal';
import { merchItems } from '@/lib/merch-data';
import { MerchItem } from '@/types/merch';

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
    [key: string]: unknown;
  };
}

export function MerchPageContent({ translations }: MerchPageContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<MerchItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = useMemo(() => {
    const cats = new Set(
      merchItems
        .map((item) => item.category)
        .filter((cat): cat is string => Boolean(cat))
    );
    return Array.from(cats);
  }, []);

  const filteredItems = useMemo(() => {
    return merchItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleViewDetails = (item: MerchItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              {translations.merch?.title || 'Официальный мерч школы'}
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {translations.merch?.subtitle || 'Поддержите свою школу стильными товарами с логотипом Scandic International School'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder={translations.merch?.searchPlaceholder || 'Поиск товаров...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedCategory === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                {translations.merch?.allCategories || 'Все'}
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <MerchItemCard
                  key={item.id}
                  item={item}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">
                {translations.merch?.noResults || 'Товары не найдены'}
              </h3>
              <p className="text-gray-500">
                {translations.merch?.noResultsDescription || 'Попробуйте изменить параметры поиска'}
              </p>
            </div>
          )}
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

