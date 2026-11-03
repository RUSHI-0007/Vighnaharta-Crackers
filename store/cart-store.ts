import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem, Product } from "@/types";
import { calculateEffectivePrice } from "@/lib/pricing";

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQty: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product, quantity = 1) => {
        const state = get();
        const existing = state.items.find((item) => item.productId === product.id);
        const effectivePrice = calculateEffectivePrice(product.price, product.discount_percent);

        let newItems: CartItem[];
        if (existing) {
          newItems = state.items.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          const newItem: CartItem = {
            productId: product.id,
            name_en: product.name_en,
            name_mr: product.name_mr,
            unit: product.unit,
            mrp: product.price,
            discount_percent: product.discount_percent,
            unit_price: effectivePrice,
            quantity,
            image_path: product.image_path,
          };
          newItems = [...state.items, newItem];
        }

        set({ items: newItems });
      },

      removeItem: (productId: string) => {
        const newItems = get().items.filter((item) => item.productId !== productId);
        set({ items: newItems });
      },

      setQty: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        const newItems = get().items.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        );
        set({ items: newItems });
      },

      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: "vfs-cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
