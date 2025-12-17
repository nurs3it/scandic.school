'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/cart-context';
import { OrderFormDialog } from './order-form-dialog';

export function CartSidebar() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  const handleCheckout = () => {
    if (items.length > 0) {
      setIsOrderFormOpen(true);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCart}
              className="fixed inset-0 bg-black/50 z-50"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-primary/5 to-secondary/5">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Корзина
                  </h2>
                  {totalItems > 0 && (
                    <span className="px-2 py-1 bg-primary text-white text-sm font-semibold rounded-full">
                      {totalItems}
                    </span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeCart}
                  className="rounded-full"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-xl font-bold text-gray-600 mb-2">
                      Корзина пуста
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Добавьте товары из каталога
                    </p>
                    <Button onClick={closeCart} variant="outline">
                      Перейти к товарам
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <AnimatePresence>
                      {items.map((cartItem, index) => {
                        const { item, quantity, selectedSize, selectedColor } = cartItem;
                        return (
                          <motion.div
                            key={`${item.id}-${selectedSize}-${selectedColor}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                          >
                            {/* Image */}
                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                                {item.name}
                              </h3>
                              {(selectedSize || selectedColor) && (
                                <div className="text-sm text-gray-600 mb-2">
                                  {selectedSize && <span>Размер: {selectedSize}</span>}
                                  {selectedSize && selectedColor && <span> • </span>}
                                  {selectedColor && <span>Цвет: {selectedColor}</span>}
                                </div>
                              )}
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-lg font-bold text-primary">
                                  {item.price.toLocaleString('ru-RU')} ₸
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeFromCart(item.id, selectedSize, selectedColor)}
                                  className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex flex-col items-center justify-between">
                              <div className="flex items-center gap-2 border rounded-lg">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, quantity - 1, selectedSize, selectedColor)}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-8 text-center font-semibold">
                                  {quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, quantity + 1, selectedSize, selectedColor)}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="text-sm font-semibold text-gray-600 mt-2">
                                {(item.price * quantity).toLocaleString('ru-RU')} ₸
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t bg-white p-6 space-y-4">
                  <div className="flex items-center justify-between text-lg">
                    <span className="font-semibold text-gray-700">Итого:</span>
                    <span className="text-2xl font-bold text-primary">
                      {totalPrice.toLocaleString('ru-RU')} ₸
                    </span>
                  </div>
                  <Button
                    onClick={handleCheckout}
                    className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg"
                    size="lg"
                  >
                    Оформить заказ
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Order Form Dialog */}
      <OrderFormDialog
        isOpen={isOrderFormOpen}
        onClose={() => setIsOrderFormOpen(false)}
        onSuccess={() => {
          setIsOrderFormOpen(false);
          closeCart();
        }}
      />
    </>
  );
}

