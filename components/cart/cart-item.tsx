"use client";

import type { CartItem as CartItemType } from "@/types";
import { useCartStore } from "@/store/cart-store";
import { QuantityStepper } from "@/components/cart/quantity-stepper";
import { formatCurrency } from "@/lib/format";
import { Trash2 } from "lucide-react";

export function CartItemRow({ item }: { item: CartItemType }) {
  const setQty = useCartStore((s) => s.setQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const lineTotal = item.unit_price * item.quantity;

  return (
    <div className="flex items-center gap-3 py-3.5 border-b border-border/50">
      {/* Thumbnail or placeholder */}
      <div className="h-14 w-14 shrink-0 rounded-2xl bg-secondary/60 border border-border/60 flex items-center justify-center overflow-hidden">
        {item.image_path ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image_path}
            alt={item.name_en}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-2xl">🎇</span>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h4 className="font-heading text-sm font-bold text-foreground leading-snug line-clamp-1">
          {item.name_en}
        </h4>
        <p className="text-[11px] text-amber-300/80 truncate font-medium">{item.name_mr}</p>
        <p className="text-xs font-bold text-primary mt-0.5">
          {formatCurrency(item.unit_price)}{" "}
          <span className="text-[10px] text-muted-foreground font-normal">/ {item.unit}</span>
        </p>
      </div>

      {/* Quantity & Total */}
      <div className="flex flex-col items-end gap-1.5">
        <span className="text-xs font-bold font-mono text-foreground">
          {formatCurrency(lineTotal)}
        </span>
        <div className="flex items-center gap-1.5">
          <QuantityStepper
            value={item.quantity}
            onChange={(qty) => setQty(item.productId, qty)}
            size="sm"
          />
          <button
            type="button"
            onClick={() => removeItem(item.productId)}
            className="p-1 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
            aria-label="Remove item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
