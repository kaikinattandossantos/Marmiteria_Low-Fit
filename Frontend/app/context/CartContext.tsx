"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define o formato de um item no carrinho
export type CartItem = {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
  // Propriedades opcionais para o combo
  isCombo?: boolean;
  comboItems?: { id: number; name: string; quantity: number }[];
};

// Define o que o nosso contexto vai fornecer
type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (itemToAdd: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setCartItems(prevItems => {
      // Se for um combo (ID negativo), sempre adicione como um novo item
      if (itemToAdd.id < 0) {
        return [...prevItems, { ...itemToAdd, quantity: 1 }];
      }

      const existingItem = prevItems.find(item => item.id === itemToAdd.id);

      if (existingItem) {
        // Se o item já existe, apenas incrementa a quantidade
        return prevItems.map(item =>
          item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Se é um novo item, adiciona ao carrinho com quantidade 1
      return [...prevItems, { ...itemToAdd, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    }
  };
  
  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = cartItems.reduce((total, item) => {
    const priceString = item.price || 'R$ 0,00';
    const onlyNumbersAndComma = priceString.replace(/[^\d,]/g, '');
    const priceNumber = parseFloat(onlyNumbersAndComma.replace(',', '.'));

    if (!isNaN(priceNumber)) {
      return total + (priceNumber * item.quantity);
    }
    
    return total;
  }, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};