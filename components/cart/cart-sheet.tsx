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
import { ShoppingBag, Trash2 } from "lucide-react";
import type { Settings } from "@/types";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: Settings;
}

export function CartSheet({ open, onOpenChange, settings }: CartSheetProps) {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col h-full w-full sm:max-w-md bg-[#0e153b] border-l border-border/80">
        <SheetHeader className="flex flex-row items-center justify-between pb-3 border-b border-border/80 text-left">
          <SheetTitle className="flex items-center gap-2 text-base font-heading font-bold text-foreground">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Your Shopping Cart
            {items.length > 0 && (
              <span className="text-xs text-muted-foreground font-normal">
                ({items.length} {items.length === 1 ? "variety" : "varieties"})
              </span>
            )}
          </SheetTitle>
          {items.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors cursor-pointer mr-6"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear Cart
            </button>
          )}
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3">
            <span className="text-6xl select-none">🛒</span>
            <p className="font-heading text-lg font-bold text-foreground">
              Your cart is empty
            </p>
            <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
              Browse our Diwali wholesale collection and add your favorite crackers to get started.
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto pr-1 divide-y divide-border/40">
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
