'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Plus, Minus, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MerchItem } from '@/types/merch';
import { useCart } from '@/contexts/cart-context';

interface MerchDetailModalProps {
  item: MerchItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MerchDetailModal({ item, isOpen, onClose }: MerchDetailModalProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  // Update selected size and color when item changes
  useEffect(() => {
    if (item) {
      setSelectedSize(item.sizes?.[0]);
      setSelectedColor(item.colors?.[0]);
      setQuantity(1);
      setCurrentImageIndex(0);
      setImageError(false);
      setAddedToCart(false);
    }
  }, [item]);

  if (!item) return null;

  const images = item.images || [item.image];
  const currentImage = images[currentImageIndex] || item.image;

  const handleAddToCart = () => {
    addToCart(item, quantity, selectedSize, selectedColor);
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
      onClose();
    }, 1500);
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 min-h-[400px] md:min-h-[600px]">
            <AnimatePresence mode="wait">
              {!imageError ? (
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={currentImage}
                    alt={item.name}
                    fill
                    className="object-cover"
                    onError={() => setImageError(true)}
                  />
                </motion.div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingCart className="h-24 w-24 text-primary/30" />
                </div>
              )}
            </AnimatePresence>

            {/* Image Navigation */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setImageError(false);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? 'bg-primary w-8'
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Previous/Next Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => {
                    setCurrentImageIndex((prev) =>
                      prev === 0 ? images.length - 1 : prev - 1
                    );
                    setImageError(false);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => {
                    setCurrentImageIndex((prev) =>
                      prev === images.length - 1 ? 0 : prev + 1
                    );
                    setImageError(false);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          {/* Content Section */}
          <div className="p-8 flex flex-col">
            <DialogHeader className="mb-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {item.category && (
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-3">
                      {item.category}
                    </span>
                  )}
                  <DialogTitle className="text-3xl font-bold text-gray-900 mb-4">
                    {item.name}
                  </DialogTitle>
                </div>
              </div>
            </DialogHeader>

            {/* Price */}
            <div className="mb-6">
              <span className="text-4xl font-bold text-primary">
                {item.price.toLocaleString('ru-RU')} ₸
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed">
              {item.description}
            </p>

            {/* Size Selection */}
            {item.sizes && item.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Размер
                </label>
                <div className="flex flex-wrap gap-2">
                  {item.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedSize === size
                          ? 'bg-primary text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {item.colors && item.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Цвет
                </label>
                <div className="flex flex-wrap gap-2">
                  {item.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedColor === color
                          ? 'bg-primary text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Количество
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={decreaseQuantity}
                  className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-2xl font-bold w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={increaseQuantity}
                  className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-auto pt-6 border-t">
              <Button
                onClick={handleAddToCart}
                disabled={!item.inStock || addedToCart}
                className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg"
                size="lg"
              >
                {addedToCart ? (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    Добавлено в корзину!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Добавить в корзину
                  </>
                )}
              </Button>
              {!item.inStock && (
                <p className="text-red-500 text-sm mt-2 text-center">
                  Товар временно отсутствует
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

