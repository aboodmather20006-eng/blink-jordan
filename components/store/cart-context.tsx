'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { CartLine } from '@/data/types';
import { normalizeCart } from '@/lib/catalog';

type CartContextValue = {
  lines: CartLine[];
  ready: boolean;
  open: boolean;
  setOpen: (value: boolean) => void;
  add: (line: CartLine) => void;
  update: (variantId: string, quantity: number) => void;
  remove: (variantId: string) => void;
  clear: () => void;
  count: number;
};

const Context = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      setLines(normalizeCart(JSON.parse(localStorage.getItem('blink-cart-v1') || '[]')));
    } catch {
      setLines([]);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem('blink-cart-v1', JSON.stringify(lines));
    } catch {
      // The bag remains usable when device storage is unavailable.
    }
  }, [lines, ready]);

  const value: CartContextValue = {
    lines,
    ready,
    open,
    setOpen,
    add: (line) => {
      setLines((current) => normalizeCart([...current, line]));
      setOpen(true);
    },
    update: (variantId, quantity) => setLines((current) => normalizeCart(current.map((line) => line.variantId === variantId ? { ...line, quantity } : line))),
    remove: (variantId) => setLines((current) => current.filter((line) => line.variantId !== variantId)),
    clear: () => setLines([]),
    count: lines.reduce((total, line) => total + line.quantity, 0),
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useCart() {
  const cart = useContext(Context);
  if (!cart) throw new Error('Cart provider is required');
  return cart;
}
