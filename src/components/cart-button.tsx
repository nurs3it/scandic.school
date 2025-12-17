'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/cart-context';
import { motion, AnimatePresence } from 'framer-motion';

export function CartButton() {
  const { openCart, getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Button
        onClick={openCart}
        size="lg"
        className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-2xl relative"
      >
        <ShoppingCart className="h-6 w-6" />
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center shadow-lg"
            >
              {totalItems > 99 ? '99+' : totalItems}
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </motion.div>
  );
}

