"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { computeCartTotals } from "@/lib/pricing";
import { formatCurrency } from "@/lib/format";
import { NumberTicker } from "@/components/ui/number-ticker";
import { AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";
import type { Settings } from "@/types";

interface CartSummaryProps {
  settings: Settings;
  onCheckoutClick?: () => void;
}

export function CartSummary({ settings, onCheckoutClick }: CartSummaryProps) {
  const items = useCartStore((s) => s.items);
  const { subtotal, discountTotal, total } = useMemo(
    () => computeCartTotals(items),
    [items]
  );

  if (items.length === 0) return null;

  const isBelowMin = total < settings.min_order_amount;
  const isOrdersDisabled = !settings.accepting_orders;

  return (
    <div className="space-y-3 pt-4 border-t border-border/80">
      {/* Subtotal & Discount breakdown */}
      <div className="space-y-1.5 text-xs">
        <div className="flex justify-between text-muted-foreground">
          <span>MRP Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        {discountTotal > 0 && (
          <div className="flex justify-between text-emerald-400 font-semibold">
            <span>Wholesale Discount Savings</span>
            <span>-{formatCurrency(discountTotal)}</span>
          </div>
        )}
        <div className="flex justify-between items-baseline text-base font-bold text-foreground pt-1.5 border-t border-border/50">
          <span>Total Payable Amount</span>
          <span className="text-amber-400 font-heading text-xl">
            ₹<NumberTicker value={total} />
          </span>
        </div>
      </div>

      {/* Warnings */}
      {isOrdersDisabled && (
        <div className="rounded-2xl bg-destructive/15 border border-destructive/30 p-3 text-xs text-destructive flex items-start gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>
            We are temporarily not accepting new online orders. Please call us directly or visit our stall!
          </span>
        </div>
      )}

      {!isOrdersDisabled && isBelowMin && (
        <div className="rounded-2xl bg-amber-500/15 border border-amber-500/30 p-3 text-xs text-amber-300 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>
            Minimum order amount is {formatCurrency(settings.min_order_amount)}. Please add {formatCurrency(settings.min_order_amount - total)} more of firecrackers.
          </span>
        </div>
      )}

      {/* Checkout Button */}
      {!isOrdersDisabled && !isBelowMin ? (
        <Link
          href="/checkout"
          onClick={onCheckoutClick}
          className="w-full min-h-[48px] rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95 active:scale-98 transition-all shadow-xl shadow-orange-500/25 cursor-pointer"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : (
        <button
          type="button"
          disabled
          className="w-full min-h-[48px] rounded-2xl bg-muted text-muted-foreground font-semibold text-sm flex items-center justify-center gap-2 cursor-not-allowed"
        >
          {isOrdersDisabled ? "Orders Paused" : "Reach Minimum Order Amount"}
        </button>
      )}

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground pt-1">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
        <span>Safe ordering • Pay via UPI QR or Cash on Delivery</span>
      </div>
    </div>
  );
}
