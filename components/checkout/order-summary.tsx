"use client";

import { useMemo } from "react";
import { useCartStore } from "@/store/cart-store";
import { computeCartTotals } from "@/lib/pricing";
import { formatCurrency } from "@/lib/format";
import { ShoppingBag } from "lucide-react";

export function OrderSummary() {
  const items = useCartStore((s) => s.items);
  const { subtotal, discountTotal, total } = useMemo(
    () => computeCartTotals(items),
    [items]
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <ShoppingBag className="h-4 w-4 text-red-700" />
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
          Order Summary
        </h3>
        <span className="text-xs font-mono text-slate-500 ml-auto">
          {items.length} {items.length === 1 ? "item" : "items"}
        </span>
      </div>

      {/* Items list */}
      <div className="max-h-60 overflow-y-auto space-y-2 pr-1 divide-y divide-slate-100 text-xs">
        {items.map((item) => (
          <div key={item.productId} className="pt-2 first:pt-0 flex items-center justify-between">
            <div className="min-w-0 flex-1 pr-3">
              <p className="font-bold text-slate-900 truncate">{item.name_en}</p>
              <p className="text-[11px] text-slate-500">
                {item.quantity} × {formatCurrency(item.unit_price)} ({item.unit})
              </p>
            </div>
            <span className="font-mono font-bold text-slate-900">
              {formatCurrency(item.unit_price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-1.5 pt-3 border-t border-slate-200 text-xs">
        <div className="flex justify-between text-slate-600">
          <span>MRP Subtotal</span>
          <span className="font-mono">{formatCurrency(subtotal)}</span>
        </div>
        {discountTotal > 0 && (
          <div className="flex justify-between text-emerald-700 font-semibold">
            <span>Wholesale Savings</span>
            <span className="font-mono">-{formatCurrency(discountTotal)}</span>
          </div>
        )}
        <div className="flex justify-between items-baseline pt-2 border-t border-slate-200 text-sm font-bold text-slate-900">
          <span>Total Payable</span>
          <span className="text-lg font-black text-emerald-700 font-mono">
            {formatCurrency(total)}
          </span>
        </div>
      </div>
    </div>
  );
}
