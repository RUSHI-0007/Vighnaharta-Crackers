"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCartStore } from "@/store/cart-store";
import { CartItemRow } from "@/components/cart/cart-item";
import { CartSummary } from "@/components/cart/cart-summary";
import { useTranslation } from "@/lib/translations";
import { ShoppingBag, Trash2 } from "lucide-react";
import type { Settings } from "@/types";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: Settings;
}

export function CartSheet({ open, onOpenChange, settings }: CartSheetProps) {
  const { t, locale } = useTranslation();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col h-full w-full sm:max-w-md bg-[#fff9f0] border-l border-[#e9e0d5] p-6">
        <SheetHeader className="flex flex-row items-center justify-between pb-4 border-b border-[#e9e0d5] text-left">
          <SheetTitle className="flex items-center gap-2 text-base font-serif font-bold text-[#202d3a]">
            <ShoppingBag className="h-5 w-5 text-[#b91c32]" />
            {t.cart.heading}
            {items.length > 0 && (
              <span className="text-xs text-[#737373] font-normal font-sans">
                ({items.length} {locale === "mr" ? "प्रकार" : items.length === 1 ? "variety" : "varieties"})
              </span>
            )}
          </SheetTitle>
          {items.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="text-xs text-[#737373] hover:text-[#b91c32] flex items-center gap-1 transition-colors cursor-pointer mr-6 font-semibold"
            >
              <Trash2 className="h-3.5 w-3.5" />
              {t.cart.clearBag}
            </button>
          )}
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3">
            <span className="text-5xl select-none">🛒</span>
            <p className="font-serif text-lg font-bold text-[#202d3a]">
              {t.cart.empty}
            </p>
            <p className="text-xs text-[#737373] max-w-xs leading-relaxed">
              {t.cart.emptyDesc}
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto pr-1 divide-y divide-[#e9e0d5]">
            {items.map((item) => (
              <CartItemRow key={item.productId} item={item} />
            ))}
          </div>
        )}

        <CartSummary
          settings={settings}
          onCheckoutClick={() => onOpenChange(false)}
        />
      </SheetContent>
    </Sheet>
  );
}
