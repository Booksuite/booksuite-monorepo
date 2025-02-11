"use client";

import React, { createContext, useEffect, useState } from "react";

type CartContextProviderProps = {
  children: React.ReactNode;
};

type CartItem = {
  id: number;
  quantity?: number;
};

type CartContext = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addItem: (item: CartItem) => void;
  updateItem: (item: CartItem) => void;
  removeItem: (id: string | number) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContext | null>(null);

export default function CartContextProvider({ children }: CartContextProviderProps) {
  const [cart, setCart] = useState<Array<CartItem>>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storage = localStorage.getItem("cart");

      if (storage) {
        setCart(JSON.parse(storage));
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addItem(item: CartItem) {
    if (!item.quantity) {
      item.quantity = 1;
    }

    if (!cart.find((el) => el.id === item.id)) {
      setCart((prev) => [...prev, item]);
    }
  }

  function removeItem(id: string | number) {
    setCart((prev) => cart.filter((el) => el.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  function updateItem(item: CartItem) {
    const foundIndex = cart.findIndex((el) => el.id === item.id);

    if (!foundIndex) return;

    let newCart = cart;
    newCart[foundIndex] = item;

    setCart((prev) => [...newCart]);
  }

  return (
    <CartContext.Provider value={{ cart, setCart, addItem, removeItem, clearCart, updateItem }}>
      {children}
    </CartContext.Provider>
  );
}
