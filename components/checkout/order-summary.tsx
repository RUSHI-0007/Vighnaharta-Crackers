"use client";

import { useMemo } from "react";
import { useCartStore } from "@/store/cart-store";
import { computeCartTotals } from "@/lib/pricing";
import { formatCurrency } from "@/lib/format";
import { NumberTicker } from "@/components/ui/number-ticker";
import { ShoppingBag, Sparkles } from "lucide-react";

export function OrderSummary() {
  const items = useCartStore((s) => s.items);
  const { subtotal, discountTotal, total } = useMemo(
    () => computeCartTotals(items),
    [items]
  );

  return (
    <div className="rounded-3xl border border-border/80 bg-[#0e153b] p-5 sm:p-6 space-y-4 shadow-xl">
      <div className="flex items-center gap-2 border-b border-border/60 pb-3.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <ShoppingBag className="h-4 w-4" />
        </div>
        <div>
          <h3 className="font-heading text-base font-bold text-foreground">
            Order Summary
          </h3>
          <span className="text-[11px] text-muted-foreground">
            {items.length} {items.length === 1 ? "variety" : "varieties"} in cart
          </span>
        </div>
      </div>

      {/* Items list */}
      <div className="max-h-64 overflow-y-auto space-y-2.5 pr-1 divide-y divide-border/40">
        {items.map((item) => (
          <div key={item.productId} className="pt-2.5 first:pt-0 flex items-center justify-between text-xs">
            <div className="min-w-0 flex-1 pr-3">
              <p className="font-bold text-foreground truncate">{item.name_en}</p>
              <p className="text-[11px] text-amber-300/80 truncate">{item.name_mr}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {item.quantity} × {formatCurrency(item.unit_price)} / {item.unit}
              </p>
            </div>
            <span className="font-mono font-bold text-foreground text-sm">
              {formatCurrency(item.unit_price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-2 pt-3 border-t border-border/60 text-xs">
        <div className="flex justify-between text-muted-foreground">
          <span>MRP Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        {discountTotal > 0 && (
          <div className="flex justify-between text-emerald-400 font-semibold">
            <span>Wholesale Savings</span>
            <span>-{formatCurrency(discountTotal)}</span>
          </div>
        )}
        <div className="flex justify-between items-baseline pt-2.5 border-t border-border/50 font-bold text-base text-foreground">
          <span>Total Payable</span>
          <span className="font-heading text-2xl text-amber-400">
            ₹<NumberTicker value={total} />
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-[11px] text-amber-300/80 bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl">
        <Sparkles className="h-3.5 w-3.5 shrink-0 text-amber-400" />
        <span>Direct wholesale price applied to all firecracker line items.</span>
      </div>
    </div>
  );
}
