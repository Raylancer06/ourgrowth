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

export interface AppliedCoupon {
  id?: number;
  code: string;
  name: string;
  type: 'percentage' | 'flat';
  discount_value: number;
  discount_amount: number;
  max_discount_amount?: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  setQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  coldChainFee: number;
  appliedCoupon: AppliedCoupon | null;
  applyCoupon: (coupon: AppliedCoupon) => void;
  removeCoupon: () => void;
  discountAmount: number;
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
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage if present
  useEffect(() => {
    try {
      const stored = localStorage.getItem("ourgrowth_cart");
      if (stored) {
        setItems(JSON.parse(stored));
      }
      const storedCoupon = localStorage.getItem("ourgrowth_coupon");
      if (storedCoupon) {
        setAppliedCoupon(JSON.parse(storedCoupon));
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

  // Save coupon to localStorage
  useEffect(() => {
    if (isInitialized) {
      try {
        if (appliedCoupon) {
          localStorage.setItem("ourgrowth_coupon", JSON.stringify(appliedCoupon));
        } else {
          localStorage.removeItem("ourgrowth_coupon");
        }
      } catch {
        // ignore storage errors
      }
    }
  }, [appliedCoupon, isInitialized]);

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
            return newQty > 0 ? { ...i, quantity: Math.min(10000, newQty) } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const setQuantity = (id: string, qty: number) => {
    // Wholesale bulk quantity validation: min 1, max 10000
    const validatedQty = Math.max(1, Math.min(10000, Math.floor(isNaN(qty) ? 1 : qty)));
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: validatedQty } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (coupon: AppliedCoupon) => {
    setAppliedCoupon(coupon);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const coldChainFee = subtotal > 2000 ? 0 : 150; // Free cold-chain on orders > 2000

  // Calculate live discount amount based on current subtotal if percentage
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      const disc = (subtotal * appliedCoupon.discount_value) / 100;
      discountAmount = appliedCoupon.max_discount_amount
        ? Math.min(disc, appliedCoupon.max_discount_amount)
        : disc;
    } else {
      discountAmount = Math.min(appliedCoupon.discount_value, subtotal);
    }
    discountAmount = Math.round(discountAmount * 100) / 100;
  }

  const total = Math.max(0, Math.round((subtotal - discountAmount + coldChainFee) * 100) / 100);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        setQuantity,
        clearCart,
        itemCount,
        subtotal,
        coldChainFee,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
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
