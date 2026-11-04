"use client";

import Image from "next/image";
import type { CartItem as CartItemType } from "@/types";
import { useCartStore } from "@/store/cart-store";
import { QuantityStepper } from "@/components/cart/quantity-stepper";
import { formatCurrency } from "@/lib/format";
import { useTranslation } from "@/lib/translations";
import { Trash2 } from "lucide-react";

export function CartItemRow({ item }: { item: CartItemType }) {
  const { locale } = useTranslation();
  const setQty = useCartStore((s) => s.setQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const lineTotal = item.unit_price * item.quantity;

  return (
    <div className="flex items-center gap-3 py-3.5 border-b border-[#e9e0d5]">
      {/* Thumbnail or placeholder */}
      <div className="relative h-14 w-14 shrink-0 rounded-xl bg-white border border-[#e9e0d5] overflow-hidden">
        <Image
          src={item.image_path || "/images/product-placeholder.webp"}
          alt={item.name_en}
          fill
          className="object-cover"
          sizes="56px"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm text-[#202d3a] leading-snug line-clamp-1">
          {locale === "mr" ? (item.name_mr || item.name_en) : item.name_en}
        </h4>
        <p className="text-[11px] text-[#737373] truncate font-medium">
          {locale === "mr" ? item.name_en : item.name_mr}
        </p>
        <p className="text-xs font-bold text-[#b91c32] mt-0.5">
          {formatCurrency(item.unit_price)}{" "}
          <span className="text-[10px] text-[#737373] font-normal">/ {item.unit}</span>
        </p>
      </div>

      {/* Quantity & Total */}
      <div className="flex flex-col items-end gap-1.5">
        <span className="text-xs font-bold font-mono text-[#202d3a]">
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
            className="p-1 text-[#737373] hover:text-[#b91c32] transition-colors cursor-pointer"
            aria-label="Remove item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
