"use client";

import { useMemo } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { computeCartTotals } from "@/lib/pricing";
import { formatCurrency } from "@/lib/format";
import { ShoppingBag, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";

export function OrderSummary() {
  const items = useCartStore((s) => s.items);
  const { subtotal, discountTotal, total } = useMemo(
    () => computeCartTotals(items),
    [items]
  );

  return (
    <div className="rounded-2xl border border-[#e9e0d5] bg-white p-6 shadow-2xs space-y-5">
      <div className="flex items-center justify-between border-b border-[#e9e0d5] pb-4">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-4 w-4 text-[#b91c32]" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#202d3a]">
            Order Summary
          </h3>
        </div>
        <span className="text-xs font-semibold text-[#737373]">
          {items.length} {items.length === 1 ? "item" : "items"}
        </span>
      </div>

      {/* Items list */}
      <div className="max-h-72 overflow-y-auto space-y-3 pr-1 divide-y divide-[#f5eddf] text-xs">
        {items.map((item) => (
          <div key={item.productId} className="pt-3 first:pt-0 flex items-center gap-3">
            <div className="relative size-12 rounded-lg overflow-hidden bg-[#fff9f0] border border-[#e9e0d5] shrink-0">
              <Image
                src={item.image_path || "/images/product-placeholder.webp"}
                alt={item.name_en}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-[#202d3a] truncate">{item.name_en}</p>
              <p className="text-[11px] text-[#737373]">
                {item.quantity} × {formatCurrency(item.unit_price)} ({item.unit})
              </p>
            </div>
            <span className="font-mono font-bold text-[#202d3a] shrink-0">
              {formatCurrency(item.unit_price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-2 pt-4 border-t border-[#e9e0d5] text-xs">
        <div className="flex justify-between text-[#737373]">
          <span>MRP Subtotal</span>
          <span className="font-mono text-[#202d3a]">{formatCurrency(subtotal)}</span>
        </div>
        {discountTotal > 0 && (
          <div className="flex justify-between text-[#b91c32] font-semibold">
            <span>Wholesale Savings</span>
            <span className="font-mono">-{formatCurrency(discountTotal)}</span>
          </div>
        )}
        <div className="flex justify-between items-baseline pt-3 border-t border-[#e9e0d5] text-sm font-bold text-[#202d3a]">
          <span>Total Payable</span>
          <span className="text-xl font-black text-[#b91c32] font-mono">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      <div className="rounded-xl bg-[#fff9f0] border border-[#e9e0d5] p-3 flex items-center gap-2 text-[11px] text-[#737373]">
        <ShieldCheck className="h-4 w-4 text-[#b91c32] shrink-0" />
        <span>
          Direct from {siteConfig.name.en} stall ({siteConfig.address.en}).
        </span>
      </div>
    </div>
  );
}
