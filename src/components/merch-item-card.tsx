'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Eye, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MerchItem } from '@/types/merch';
import { useCart } from '@/contexts/cart-context';
import { useState } from 'react';

interface MerchItemCardProps {
  item: MerchItem;
  onViewDetails: (item: MerchItem) => void;
}

export function MerchItemCard({ item, onViewDetails }: MerchItemCardProps) {
  const { addToCart, items } = useCart();
  const [imageError, setImageError] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Проверяем, есть ли товар в корзине
  const isInCart = items.some(
    (cartItem) => cartItem.item.id === item.id
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(item, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card
        className="group cursor-pointer overflow-hidden border-0 bg-white shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col"
        onClick={() => onViewDetails(item)}
      >
        {/* Image Container */}
        <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
          {!imageError ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
              <ShoppingCart className="h-16 w-16 text-primary/30" />
            </div>
          )}
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {!item.inStock && (
              <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                Нет в наличии
              </span>
            )}
            {item.category && (
              <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full shadow-lg">
                {item.category}
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="icon"
              variant="secondary"
              className="h-10 w-10 rounded-full shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(item);
              }}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              className={`h-10 w-10 rounded-full shadow-lg transition-all ${
                isAdded 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-primary hover:bg-primary/90'
              }`}
              onClick={handleAddToCart}
              disabled={!item.inStock}
            >
              <AnimatePresence mode="wait">
                {isAdded ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Check className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="cart"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>

        <CardContent className="p-6 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {item.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
            {item.description}
          </p>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <span className="text-2xl font-bold text-primary">
                {item.price.toLocaleString('ru-RU')} ₸
              </span>
            </div>
            <Button
              size="sm"
              className={`transition-all ${
                isAdded 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-primary hover:bg-primary/90'
              }`}
              onClick={handleAddToCart}
              disabled={!item.inStock}
            >
              <AnimatePresence mode="wait">
                {isAdded ? (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Добавлено
                  </motion.span>
                ) : (
                  <motion.span
                    key="cart"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    В корзину
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

