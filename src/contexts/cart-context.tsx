'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CartItem, MerchItem } from '@/types/merch';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: MerchItem, quantity?: number, size?: string, color?: string) => void;
  removeFromCart: (itemId: string, size?: string, color?: string) => void;
  updateQuantity: (itemId: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'scandic-cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Загружаем корзину из localStorage при монтировании
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  }, []);

  // Сохраняем корзину в localStorage при изменении
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [items]);

  const addToCart = useCallback((item: MerchItem, quantity = 1, size?: string, color?: string) => {
    setItems((prevItems) => {
      // Проверяем, есть ли уже такой товар с такими же параметрами
      const existingIndex = prevItems.findIndex(
        (cartItem) =>
          cartItem.item.id === item.id &&
          cartItem.selectedSize === size &&
          cartItem.selectedColor === color
      );

      if (existingIndex >= 0) {
        // Увеличиваем количество существующего товара
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        // Добавляем новый товар
        return [
          ...prevItems,
          {
            item,
            quantity,
            selectedSize: size,
            selectedColor: color,
          },
        ];
      }
    });
  }, []);

  const removeFromCart = useCallback((itemId: string, size?: string, color?: string) => {
    setItems((prevItems) =>
      prevItems.filter(
        (cartItem) =>
          !(
            cartItem.item.id === itemId &&
            cartItem.selectedSize === size &&
            cartItem.selectedColor === color
          )
      )
    );
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number, size?: string, color?: string) => {
    if (quantity <= 0) {
      removeFromCart(itemId, size, color);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.item.id === itemId &&
        cartItem.selectedSize === size &&
        cartItem.selectedColor === color
          ? { ...cartItem, quantity }
          : cartItem
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getTotalPrice = useCallback(() => {
    return items.reduce((total, cartItem) => total + cartItem.item.price * cartItem.quantity, 0);
  }, [items]);

  const getTotalItems = useCallback(() => {
    return items.reduce((total, cartItem) => total + cartItem.quantity, 0);
  }, [items]);

  const openCart = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        isOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

