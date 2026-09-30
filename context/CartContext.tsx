"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  packSize: string;
  price: number;
  quantity: number;
  image: string;
  badge?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  coldChainFee: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const INITIAL_ITEMS: CartItem[] = [
  {
    id: "item-1",
    productId: "jumbo-table-cloves",
    title: "Grade A Jumbo Peeled Garlic",
    packSize: "5 KG Crate",
    price: 950,
    quantity: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCabO8HJEP-tUgMOtNeoUZSDnNJ3mpuH6huHZAJKJSwPRuNOiBfAAmeFDDNX44uT9koJIC1FX43wl8uzqhumpZRkzDrGLeUCusTLkRNWK5lr55TKVeO3yMBjLvoHZNmb0zse8xK-VD8Tm4JdnlnTOPeRtyb_xMgsf3H79KFNJGXxtXbc67dm2MY6OGbtWRMS7nSeu7n917TV8ADDcpbzpqwfOF2g4yxUiJ65LsnF1CXx2XxwEWpxEH3hbXz98WDN2PKqg",
    badge: "Grade A",
  },
  {
    id: "item-2",
    productId: "biriyani-handi-special",
    title: "Biriyani Handi Special Peeled Garlic",
    packSize: "10 KG Commercial Lot",
    price: 1750,
    quantity: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBX9Lx3_jJmhS-xpnNxWKNyC-pUFFuJ7riy_38w4buXgM6X7LozF5krKZQOEVb2hRoYzPwy4revekR3paqAa996rhkPauIYI5nszp2QNwlv2cZcE6omvR-xkMjYyl-hhTParHn0_9cBLLGoS9KdtXbzSoqsuZ-BPzM6gLw9YjIXCqzgqjth5sFiTHb-L4wBHQwhKGgOTW-dsogFQrFr5U-bRwuCH_zZ5F8Omw3WvyCdTzhcVHMuoVuSzwSS4N4FMkW85g",
    badge: "Commercial Bulk",
  },
];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage if present
  useEffect(() => {
    try {
      const stored = localStorage.getItem("ourgrowth_cart");
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {
      // fallback to INITIAL_ITEMS
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem("ourgrowth_cart", JSON.stringify(items));
      } catch {
        // ignore storage errors
      }
    }
  }, [items, isInitialized]);

  const addToCart = (newItem: Omit<CartItem, "id">) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.productId === newItem.productId && i.packSize === newItem.packSize
      );
      if (existing) {
        return prev.map((i) =>
          i.id === existing.id ? { ...i, quantity: i.quantity + newItem.quantity } : i
        );
      }
      const id = `${newItem.productId}-${newItem.packSize}-${Date.now()}`;
      return [...prev, { ...newItem, id }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setItems([]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const coldChainFee = subtotal > 2000 ? 0 : 150; // Free cold-chain on orders > 2000
  const total = subtotal + coldChainFee;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        coldChainFee,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
